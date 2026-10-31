import assert from 'node:assert/strict'
import { test } from 'node:test'
import { advanceJourneyPhase, initialJourneyPhase } from '../lib/san-yallego/journey-phases.mjs'

test('Juanito: descenso → aproximación al oráculo → destino, nunca salto directo', () => {
  let step = initialJourneyPhase('casa-de-juanito')
  assert.equal(step, 'inicio')
  step = advanceJourneyPhase(step)
  assert.equal(step, 'descenso')
  step = advanceJourneyPhase(step)
  assert.equal(step, 'hacia-oraculo')
  step = advanceJourneyPhase(step)
  assert.equal(step, 'destino')
  assert.equal(advanceJourneyPhase(step), 'destino')
})

test('Entrada: descenso y video de aproximación antes del oráculo', () => {
  let step = initialJourneyPhase('entrada')
  assert.equal(step, 'descenso')
  step = advanceJourneyPhase(step)
  assert.equal(step, 'hacia-oraculo')
  step = advanceJourneyPhase(step)
  assert.equal(step, 'destino')
})

test('Cada uno de los ocho sitios reservados conserva la secuencia de dos recorridos', () => {
  for (let n = 3; n <= 10; n++) {
    const id = `sitio-${String(n).padStart(2, '0')}`
    const descent = initialJourneyPhase(id)
    assert.equal(descent, 'descenso')
    assert.equal(advanceJourneyPhase(descent), 'hacia-oraculo')
    assert.equal(advanceJourneyPhase('hacia-oraculo'), 'destino')
  }
})
