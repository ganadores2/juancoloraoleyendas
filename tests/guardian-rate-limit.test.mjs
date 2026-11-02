import assert from 'node:assert/strict'
import { test } from 'node:test'
import {
  checkGuardianLoginRate, guardianLoginConfig, guardianLoginKey,
  MAX_ATTEMPTS, WINDOW_SECONDS,
} from '../lib/san-yallego/guardian-rate-limit.mjs'

const env = {
  UPSTASH_REDIS_REST_URL: 'https://redis.example.test',
  UPSTASH_REDIS_REST_TOKEN: 'token-privado',
  SAN_YALLEGO_GUARDIAN_SECRET: 'S'.repeat(40),
}
const request = (ip = '203.0.113.5') =>
  new Request('https://example.test/guardian/login', { headers: { 'x-vercel-forwarded-for': ip } })

test('no declara protección sin credenciales y rechaza URLs no HTTPS', async () => {
  assert.equal(guardianLoginConfig({}), null)
  assert.equal(guardianLoginConfig({ ...env, UPSTASH_REDIS_REST_URL: 'http://localhost' }), null)
  assert.deepEqual(await checkGuardianLoginRate(request(), { env: {} }), { status: 'unavailable' })
})

test('la clave nunca contiene IP ni contraseñas y separa IPs', () => {
  const a = guardianLoginKey(request('203.0.113.5'), env.SAN_YALLEGO_GUARDIAN_SECRET)
  const b = guardianLoginKey(request('203.0.113.6'), env.SAN_YALLEGO_GUARDIAN_SECRET)
  assert.ok(a.startsWith('guardian:login:v1:'))
  assert.equal(a.includes('203.0.113.5'), false)
  assert.notEqual(a, b)
  assert.equal(guardianLoginKey(new Request('https://example.test'), env.SAN_YALLEGO_GUARDIAN_SECRET), null)
})

test('el contador se incrementa en Redis mediante EVAL atómico', async () => {
  let seen = null
  const fetcher = async (url, options) => {
    seen = { url, options }
    return { ok: true, json: async () => ({ result: [MAX_ATTEMPTS, WINDOW_SECONDS] }) }
  }
  assert.deepEqual(await checkGuardianLoginRate(request(), { env, fetcher }), { status: 'allowed' })
  const cmd = JSON.parse(seen.options.body)
  assert.equal(cmd[0], 'EVAL')
  assert.match(cmd[1], /redis\.call\('INCR'/)
  assert.match(cmd[1], /redis\.call\('EXPIRE'/)
  assert.equal(cmd[2], '1')
  assert.equal(cmd[4], String(WINDOW_SECONDS))
  assert.equal(seen.url, env.UPSTASH_REDIS_REST_URL)
  assert.equal(seen.options.headers.Authorization, 'Bearer token-privado')
})

test('se bloquea al superar cinco solicitudes y devuelve espera', async () => {
  const fetcher = async () => ({ ok: true, json: async () => ({ result: [6, 37] }) })
  assert.deepEqual(await checkGuardianLoginRate(request(), { env, fetcher }),
    { status: 'limited', retryAfter: 37 })
})

test('errores remotos o datos inválidos nunca se consideran tasa autorizada', async () => {
  const bad = [
    async () => { throw new Error('network failure') },
    async () => ({ ok: false }),
    async () => ({ ok: true, json: async () => ({ error: 'failure' }) }),
    async () => ({ ok: true, json: async () => ({ result: ['NaN', 30] }) }),
  ]
  for (const fetcher of bad) {
    assert.deepEqual(await checkGuardianLoginRate(request(), { env, fetcher }), { status: 'unavailable' })
  }
})

test('reconoce variables KV_REST_API de Vercel sin copiar secretos', async () => {
  const kvEnv = {
    KV_REST_API_URL: 'https://redis.example.test',
    KV_REST_API_TOKEN: 'token-privado',
    SAN_YALLEGO_GUARDIAN_SECRET: 'S'.repeat(40),
  }
  const seen = []
  const fetcher = async (url, options) => {
    seen.push([url, options.headers.Authorization])
    return { ok: true, json: async () => ({ result: [1, 60] }) }
  }
  assert.deepEqual(await checkGuardianLoginRate(request(), { env: kvEnv, fetcher }), { status: 'allowed' })
  assert.deepEqual(seen, [['https://redis.example.test', 'Bearer token-privado']])
})
