import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'

const source = (path) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const matrix = JSON.parse(source('lib/san-yallego/oracle-matrix-v1.json'))
const originalOracles = source('lib/san-yallego/oracles.ts')
const chapters = source('lib/san-yallego/chapters.ts')
const pilot = source('components/san-yallego/oraculo/entrance-oracle-pilot.tsx')
const page = source('app/guardian/piloto-oraculo-entrada/page.tsx')
const guardian = source('app/guardian/page.tsx')

test('la Entrada conserva las tres preguntas originales y su cierre', () => {
  for (const question of [
    '¿Quién te trajo hasta aquí?',
    '¿Escuchaste algo al cruzar?',
    '¿Vienes a escuchar, o a descubrir?',
  ]) assert.ok(originalOracles.includes(question))
  assert.match(originalOracles, /Entonces mira bien\. La piedra también escucha\./)
  assert.match(page, /questions=\{oracle\.questions\}/)
  assert.match(page, /closingLine=\{oracle\.closingLine\}/)
})

test('orientación editorial N0 toma ejemplos de la matriz autorizada y no inventa respuestas', () => {
  const entrance = matrix.sites.find((site) => site.siteId === 'entrada')
  assert.equal(entrance.sampleQuestion, '¿Por qué un nombre importa?')
  assert.equal(entrance.safeResponseExample, 'Un nombre puede abrir preguntas. Comienza por el Capítulo II; lo demás te toca descubrir.')
  assert.deepEqual(entrance.chapterRecommendations.map((c) => c.chapter), [2, 3, 16])
  assert.match(page, /editorialQuestion=\{editorial\.sampleQuestion\}/)
  assert.match(page, /editorialAnswer=\{editorial\.safeResponseExample\}/)
  assert.match(page, /editorial\.chapterRecommendations\.map/)
  assert.match(page, /chapter\.title !== recommended\.title/)
})

test('los enlaces a capítulos se obtienen de la ruta dinámica existente', () => {
  assert.match(chapters, /export function chapterHref/)
  assert.match(page, /href: chapterHref\(chapter\)/)
  const chapterRoute = source('app/libro/[libro]/capitulo/[capitulo]/page.tsx')
  assert.match(chapterRoute, /getChapter\(Number\(libro\), Number\(capitulo\)\)/)
  assert.doesNotMatch(page, /href=\{['"]\/sitio\//)
})

test('no se guarda la respuesta del visitante ni se envía a red', () => {
  assert.match(pilot, /setDraft\(''\)/)
  assert.match(pilot, /maxLength=\{300\}/)
  assert.match(pilot, /useState\(''\)/)
  assert.doesNotMatch(pilot, /fetch\(|localStorage|sessionStorage|navigator\.sendBeacon|XMLHttpRequest|action=|submit/)
  assert.doesNotMatch(page, /process\.env\.|fetch\(|apiKey|secret/i)
})

test('la simulación no altera las transiciones ni el progreso público', () => {
  assert.doesNotMatch(page + pilot, /progressStore|transitions\.|findKey\(|unlockSite\(|answerOracle\(/)
  assert.match(pilot, /setStep\(\(current\) => Math\.min\(current \+ 1, questions\.length\)\)/)
  assert.match(pilot, /function restart\(\)/)
})

test('el piloto exige sesión privada antes de preparar contenido y no se indexa', () => {
  assert.match(page, /if \(!\(await hasGuardianSession\(\)\)\) redirect\('\/guardian'\)/)
  assert.match(page, /export const dynamic = 'force-dynamic'/)
  assert.match(page, /robots: \{ index: false, follow: false \}/)
  assert.match(guardian, /href="\/guardian\/piloto-oraculo-entrada"/)
})

test('no hay modelo externo, prompt reservado ni vínculo a los ocho sitios sellados', () => {
  assert.doesNotMatch(page + pilot, /openai|anthropic|elevenlabs|sitio-0[3-9]|sitio-10/i)
  assert.match(page, /N4, N5 y C100 permanecen fuera del piloto/)
  assert.match(page, /N0: orientación/)
  const sites = source('lib/san-yallego/sites.ts')
  assert.equal([...sites.matchAll(/unlock: \{ kind: 'sealed' \}/g)].length, 8)
})
