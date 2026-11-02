import assert from 'node:assert/strict'
import { test } from 'node:test'
import { GUARDIAN_COOKIE_NAME, GUARDIAN_SESSION_SECONDS } from '../lib/san-yallego/guardian-core.mjs'
import { creatorSessionCookie, closedCreatorSessionCookie } from '../lib/san-yallego/guardian-cookie.mjs'

test('el ingreso usa una cookie privada HttpOnly y SameSite Strict', () => {
  assert.deepEqual(creatorSessionCookie('sesion-ficticia-firmada', true), {
    name: GUARDIAN_COOKIE_NAME,
    value: 'sesion-ficticia-firmada',
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/guardian',
    maxAge: GUARDIAN_SESSION_SECONDS,
  })
  assert.throws(() => creatorSessionCookie(''), /sesión firmada/)
})

test('cerrar sesión expira exactamente la MISMA cookie', () => {
  const entering = creatorSessionCookie('sesion-de-prueba', true)
  const exiting = closedCreatorSessionCookie(true)
  assert.equal(exiting.name, entering.name)
  assert.equal(exiting.path, entering.path)
  assert.equal(exiting.httpOnly, true)
  assert.equal(exiting.sameSite, 'strict')
  assert.equal(exiting.secure, true)
  assert.equal(exiting.maxAge, 0)
  assert.equal(exiting.value, '')
})

test('en localhost se admite cookie sin Secure; despliegues la exigen', () => {
  assert.equal(creatorSessionCookie('prueba', false).secure, false)
  assert.equal(closedCreatorSessionCookie(false).secure, false)
  assert.equal(creatorSessionCookie('prueba', true).secure, true)
  assert.equal(closedCreatorSessionCookie(true).secure, true)
})
