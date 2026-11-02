import { createHmac } from 'node:crypto'

/**
 * Contador compartido por IP para el login privado. Toda decisión se registra
 * en Redis mediante una única operación Lua atómica; nunca almacena la IP
 * directamente ni recibe la contraseña.
 *
 * Estado sin proveedor: unavailable. El endpoint decide la política:
 * - Preview y Production sin Redis: cerrar el login con 503; nunca continuar sin tasa.
 */
export const WINDOW_SECONDS = 60
export const MAX_ATTEMPTS = 5

const SCRIPT = `
local count = redis.call('INCR', KEYS[1])
if count == 1 then redis.call('EXPIRE', KEYS[1], tonumber(ARGV[1])) end
local ttl = redis.call('TTL', KEYS[1])
return {count, ttl}
`

export function guardianLoginConfig(env = process.env) {
  const rawUrl = env.KV_REST_API_URL ?? env.UPSTASH_REDIS_REST_URL
  const token = env.KV_REST_API_TOKEN ?? env.UPSTASH_REDIS_REST_TOKEN
  const secret = env.SAN_YALLEGO_GUARDIAN_SECRET
  if (!rawUrl || !token || !secret || secret.length < 32) return null
  try {
    const url = new URL(rawUrl)
    if (url.protocol !== 'https:' || url.username || url.password || url.search || url.hash) return null
    return { url: url.origin, token, secret }
  } catch {
    return null
  }
}

export function guardianLoginKey(request, secret) {
  // Vercel documenta que sobreescribe X-Forwarded-For al recibir una
  // solicitud, evitando que el cliente falsifique la IP al llegar directo.
  const ip = request.headers.get('x-vercel-forwarded-for') ||
    request.headers.get('x-forwarded-for')
  if (!ip || !ip.trim()) return null
  const digest = createHmac('sha256', secret).update(ip.trim()).digest('hex')
  return `guardian:login:v1:${digest}`
}

/** @returns {Promise<{status:'allowed'|'limited'|'unavailable', retryAfter?:number}>} */
export async function checkGuardianLoginRate(request, { env = process.env, fetcher = fetch } = {}) {
  const config = guardianLoginConfig(env)
  if (!config) return { status: 'unavailable', reason: 'config' }

  const key = guardianLoginKey(request, config.secret)
  if (!key) return { status: 'unavailable', reason: 'ip' }

  try {
    const response = await fetcher(config.url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${config.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(['EVAL', SCRIPT, '1', key, String(WINDOW_SECONDS)]),
      cache: 'no-store',
      signal: AbortSignal.timeout(2500),
    })
    if (!response.ok) return { status: 'unavailable', reason: 'upstream' }
    const data = await response.json()
    if (data.error || !Array.isArray(data.result) || data.result.length !== 2) {
      return { status: 'unavailable', reason: 'upstream' }
    }
    const [count, ttl] = data.result.map(Number)
    if (!Number.isSafeInteger(count) || count < 1 || !Number.isFinite(ttl)) {
      return { status: 'unavailable', reason: 'upstream' }
    }
    if (count > MAX_ATTEMPTS) {
      return { status: 'limited', retryAfter: Math.max(1, Math.min(WINDOW_SECONDS, Math.ceil(ttl))) }
    }
    return { status: 'allowed' }
  } catch {
    return { status: 'unavailable', reason: 'network' }
  }
}
