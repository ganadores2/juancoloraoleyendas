import test from 'node:test'
import assert from 'node:assert/strict'
import { canOpenBookOneChapter, hasCompletedFirstChapter } from '../lib/san-yallego/chapter-access.mjs'

const first = 'libro-1-capitulo-1'

test('El Capítulo 1 está abierto desde el principio', () => {
  assert.equal(canOpenBookOneChapter(1, []), true)
  assert.equal(hasCompletedFirstChapter([]), false)
})

test('Antes de terminar el primero, los capítulos 2–33 no se abren', () => {
  for (let number = 2; number <= 33; number++) {
    assert.equal(canOpenBookOneChapter(number, []), false, `Capítulo ${number}`)
  }
})

test('Completar el capítulo 1 abre todos los demás, pero no altera rutas inexistentes', () => {
  assert.equal(hasCompletedFirstChapter([first]), true)
  for (let number = 1; number <= 33; number++) {
    assert.equal(canOpenBookOneChapter(number, [first]), true, `Capítulo ${number}`)
  }
  for (const number of [-1, 0, 34, 1.5, NaN]) {
    assert.equal(canOpenBookOneChapter(number, [first]), false)
  }
})

test('Completar otro capítulo sin el primero no equivale a la llave narrativa', () => {
  assert.equal(canOpenBookOneChapter(2, ['libro-1-capitulo-3']), false)
})
