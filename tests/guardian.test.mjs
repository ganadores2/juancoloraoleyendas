import assert from 'node:assert/strict'
import { after, before, test } from 'node:test'
import {
  GUARDIAN_COOKIE_NAME,
  GUARDIAN_SESSION_SECONDS,
  isGuardianConfigured,
  isGuardianPostAllowed,
  issueGuardianSession,
  validateGuardianSession,
  verifyGuardianPassword,
} from '../lib/san-yallego/guardian-core.mjs'

// Estas son credenciales ficticias para pruebas; no pertenecen a Vercel.
const TEST_KEY = 'testing-only-master-key-abcdefghijklmnopqrstuvwxyz'
const TEST_SIGNING = 'testing-only-signing-secret-abcdefghijklmnopqrstuvwxyz'
const oldMaster = process.env.SAN_YALLEGO_MASTER_KEY
const oldSecret = process.env.SAN_YALLEGO_GUARDIAN_SECRET

before(() => {
  process.env.SAN_YALLEGO_MASTER_KEY = TEST_KEY
  process.env.SAN_YALLEGO_GUARDIAN_SECRET = TEST_SIGNING
})

after(() => {
  if (oldMaster === undefined) delete process.env.SAN_YALLEGO_MASTER_KEY
  else process.env.SAN_YALLEGO_MASTER_KEY = oldMaster
  if (oldSecret === undefined) delete process.env.SAN_YALLEGO_GUARDIAN_SECRET
  else process.env.SAN_YALLEGO_GUARDIAN_SECRET = oldSecret
})

test('la llave correcta funciona, la incorrecta no', () => {
  assert.equal(isGuardianConfigured(), true)
  assert.equal(verifyGuardianPassword(TEST_KEY), true)
  assert.equal(verifyGuardianPassword('not-the-master-key-123456789999999'), false)
  assert.equal(verifyGuardianPassword(null), false)
  assert.equal(verifyGuardianPassword(''), false)
  assert.equal(verifyGuardianPassword('x'.repeat(257)), false)
  assert.equal(GUARDIAN_COOKIE_NAME, 'sy_guardian_access')
})

test('una sesión firmada vence y rechaza alteraciones', () => {
  const ticket = issueGuardianSession()
  const [expires, nonce, mac] = ticket.split('.')
  assert.equal(validateGuardianSession(ticket), true)
  assert.equal(validateGuardianSession(ticket, Number(expires) + 1), false)
  assert.equal(validateGuardianSession(ticket, Number(expires) - GUARDIAN_SESSION_SECONDS * 1000 - 120_000), false)
  assert.equal(validateGuardianSession([expires, nonce, (mac[0] === 'A' ? 'B' : 'A') + mac.slice(1)].join('.')), false)
  assert.equal(validateGuardianSession([expires, nonce + 'X', mac].join('.')), false)
  assert.equal(validateGuardianSession('invalid'), false)
  assert.equal(validateGuardianSession('x'.repeat(300)), false)
})

test('cambiar el secreto de firma revoca las sesiones anteriores', () => {
  const token = issueGuardianSession()
  const previous = process.env.SAN_YALLEGO_GUARDIAN_SECRET
  process.env.SAN_YALLEGO_GUARDIAN_SECRET = 'new-testing-only-signing-secret-abcdefghijklmnopqrstuvwxyz'
  assert.equal(validateGuardianSession(token), false)
  process.env.SAN_YALLEGO_GUARDIAN_SECRET = previous
})

test('si faltan secretos, el acceso se cierra', () => {
  const token = issueGuardianSession()
  delete process.env.SAN_YALLEGO_MASTER_KEY
  assert.equal(isGuardianConfigured(), false)
  assert.equal(verifyGuardianPassword(TEST_KEY), false)
  assert.equal(validateGuardianSession(token), false)
  assert.throws(() => issueGuardianSession(), /not configured/)
  process.env.SAN_YALLEGO_MASTER_KEY = TEST_KEY
})

test('la sesión no modifica rutas ni permisos de visitantes', () => {
  // La sesión se limita al nombre de cookie del Taller y no al localStorage del visitante.
  assert.notEqual(GUARDIAN_COOKIE_NAME, 'san-yallego:progreso:v1')
})

function request(url, origin, fetchSite = 'same-origin') {
  const headers = new Headers()
  if (origin !== null) headers.set('origin', origin)
  if (fetchSite !== null) headers.set('sec-fetch-site', fetchSite)
  return new Request(url, { method: 'POST', headers })
}

test('formularios del mismo origen aceptados', () => {
  assert.equal(isGuardianPostAllowed(request('https://example.vercel.app/guardian/login', 'https://example.vercel.app')), true)
  assert.equal(isGuardianPostAllowed(request('https://example.vercel.app/guardian/logout', 'https://example.vercel.app')), true)
})

test('orígenes externos, vacíos o malformados rechazados', () => {
  assert.equal(isGuardianPostAllowed(request('https://example.vercel.app/guardian/login', 'https://attacker.test')), false)
  assert.equal(isGuardianPostAllowed(request('https://example.vercel.app/guardian/login', 'https://example.vercel.app.evil.test')), false)
  assert.equal(isGuardianPostAllowed(request('https://example.vercel.app/guardian/login', 'null')), false)
  assert.equal(isGuardianPostAllowed(request('https://example.vercel.app/guardian/login', null)), false)
  assert.equal(isGuardianPostAllowed(request('https://example.vercel.app/guardian/login', '%%not-an-origin%%')), false)
  assert.equal(isGuardianPostAllowed(request('https://example.vercel.app/guardian/login', 'https://example.vercel.app', 'cross-site')), false)
})
