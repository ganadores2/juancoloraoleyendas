import assert from 'node:assert/strict'
import { test } from 'node:test'
import { GuardianFormError, readGuardianForm } from '../lib/san-yallego/guardian-form.mjs'

function form(body, extraHeaders = {}) {
  return new Request('https://example.test/guardian/login', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded', ...extraHeaders },
    body,
  })
}

async function fails(request, status) {
  await assert.rejects(
    () => readGuardianForm(request),
    error => error instanceof GuardianFormError && error.status === status,
  )
}

test('acepta una llave codificada y conserva caracteres especiales', async () => {
  const key = 'un símbolo + otra & prueba con Ñ'
  assert.equal(await readGuardianForm(form(new URLSearchParams({ clave: key }).toString())), key)
})

test('rechaza formularios ausentes, extraños, duplicados y multipart', async () => {
  await fails(form('foo=1'), 400)
  await fails(form('clave=a&clave=b'), 400)
  await fails(form('clave=una&otro=valor'), 400)
  await fails(new Request('https://example.test/guardian/login', { method: 'POST' }), 400)
  await fails(form('clave=uno', { 'content-type': 'multipart/form-data; boundary=abc' }), 400)
})

test('rechaza tamaño declarado excesivo', async () => {
  await fails(form('clave=abc', { 'content-length': '99999' }), 413)
})

test('rechaza cuerpo demasiado grande aun sin Content-Length fiable', async () => {
  await fails(form('clave=' + 'x'.repeat(4096)), 413)
  await fails(form('clave=' + 'x'.repeat(4096), { 'content-length': '10' }), 413)
})
