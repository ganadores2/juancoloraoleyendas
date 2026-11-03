import { createHash, createHmac, randomBytes, timingSafeEqual } from 'node:crypto'

/**
 * Núcleo de seguridad comprobable sin Next.js.
 * Solo se debe importar desde código de servidor; no usar variables NEXT_PUBLIC_*.
 */
export const GUARDIAN_COOKIE_NAME = 'sy_guardian_access'
export const GUARDIAN_SESSION_SECONDS = 8 * 60 * 60

function credentials() {
  const accessKey = process.env.SAN_YALLEGO_MASTER_KEY
  const signingSecret = process.env.SAN_YALLEGO_GUARDIAN_SECRET
  if (!accessKey || accessKey.length < 24 || !signingSecret || signingSecret.length < 32) {
    return null
  }
  return { accessKey, signingSecret }
}

export function isGuardianConfigured() {
  return credentials() !== null
}

function equalBytes(a, b) {
  return a.length === b.length && timingSafeEqual(a, b)
}

export function verifyGuardianPassword(password) {
  const config = credentials()
  if (!config || typeof password !== 'string' || password.length < 24 || password.length > 256) {
    return false
  }
  const expected = createHash('sha256').update(config.accessKey, 'utf8').digest()
  const actual = createHash('sha256').update(password, 'utf8').digest()
  return equalBytes(expected, actual)
}

function signature(payload, secret) {
  return createHmac('sha256', secret)
    .update('san-yallego-guardian:v1:')
    .update(payload)
    .digest('base64url')
}

export function issueGuardianSession() {
  const config = credentials()
  if (!config) throw new Error('Guardian access is not configured')
  const expires = Date.now() + GUARDIAN_SESSION_SECONDS * 1000
  const payload = `${expires}.${randomBytes(18).toString('base64url')}`
  return `${payload}.${signature(payload, config.signingSecret)}`
}

/**
 * La firma se comprueba en cada request. Borrar la cookie es cerrar sesión
 * en el navegador actual; rotar el secreto de firma invalida todas las sesiones.
 */
export function validateGuardianSession(ticket, now = Date.now()) {
  const config = credentials()
  if (!config || typeof ticket !== 'string' || ticket.length > 256) return false
  const parts = ticket.split('.')
  if (parts.length !== 3) return false
  const [expiresString, nonce, receivedSignature] = parts
  if (!/^\d{13}$/.test(expiresString) || !/^[A-Za-z0-9_-]{24}$/.test(nonce)) return false
  if (!/^[A-Za-z0-9_-]{43}$/.test(receivedSignature)) return false

  const expires = Number(expiresString)
  if (!Number.isSafeInteger(expires) || expires <= now) return false
  if (expires > now + GUARDIAN_SESSION_SECONDS * 1000 + 60_000) return false

  const payload = `${expiresString}.${nonce}`
  const expectedSignature = signature(payload, config.signingSecret)
  return equalBytes(Buffer.from(expectedSignature), Buffer.from(receivedSignature))
}

/**
 * Los POST de ingreso/salida solo se aceptan desde el mismo origen.
 * En navegadores modernos, los formularios POST proporcionan Origin;
 * Sec-Fetch-Site agrega una defensa complementaria.
 */
export function isGuardianPostAllowed(request) {
  try {
    const target = new URL(request.url)
    if (!['https:', 'http:'].includes(target.protocol)) return false
    const origin = request.headers.get('origin')
    const fetchSite = request.headers.get('sec-fetch-site')
    if (fetchSite === 'cross-site') return false
    // Las solicitudes sin Origin no deben modificar autenticación.
    if (!origin || origin === 'null') return false
    const source = new URL(origin)
    if (source.origin !== target.origin) return false
    return true
  } catch {
    return false
  }
}
