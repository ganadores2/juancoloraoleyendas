import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'
import { assertOracleVoiceProposals, buildOracleVoicePreview } from '../lib/san-yallego/oracle-voice-review.mjs'

const source = (path) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const matrix = JSON.parse(source('lib/san-yallego/oracle-matrix-v1.json'))
const proposals = JSON.parse(source('lib/san-yallego/oracle-voice-proposals-v1.json'))

test('diez personalidades propuestas, correspondencia exacta con la matriz y sin audio', () => {
  assert.deepEqual(assertOracleVoiceProposals(proposals, matrix), {
    oracles: 10, status: 'propuestas-no-aprobadas',
  })
  assert.equal(proposals.audioGenerated, false)
  assert.equal(proposals.modelActive, false)
  assert.equal(proposals.profiles.filter((profile) => profile.voiceAsset !== null).length, 0)
  assert.equal(new Set(proposals.profiles.map((profile) => profile.workingName)).size, 10)
})

test('preguntas y respuestas de ejemplo coinciden literalmente con la matriz aprobada', () => {
  const previews = buildOracleVoicePreview(proposals, matrix)
  assert.equal(previews.length, 10)
  assert.deepEqual(previews.map((preview) => preview.siteId), matrix.sites.map((site) => site.siteId))
  for (const preview of previews) {
    const base = matrix.sites.find((site) => site.siteId === preview.siteId)
    assert.equal(preview.questionFromApprovedMatrix, base.sampleQuestion)
    assert.equal(preview.responseFromApprovedMatrix, base.safeResponseExample)
    assert.equal(preview.continuityCaution, base.continuityCaution)
    assert.equal(preview.canPublish, false)
    assert.equal(preview.aiActive, false)
  }
})

test('sigue vigente la asignación de 33 capítulos únicos en diez Oráculos', () => {
  const chapterNumbers = matrix.sites.flatMap((site) =>
    site.chapterRecommendations.map((ref) => ref.chapter))
  assert.equal(chapterNumbers.length, 33)
  assert.deepEqual([...chapterNumbers].sort((a, b) => a - b), Array.from({ length: 33 }, (_, i) => i + 1))
})

test('no se aceptan IDs duplicados ni fuera de los diez sitios', () => {
  const duplicate = structuredClone(proposals)
  duplicate.profiles[3].siteId = duplicate.profiles[2].siteId
  assert.throws(() => assertOracleVoiceProposals(duplicate, matrix), /duplicado/)

  const unknown = structuredClone(proposals)
  unknown.profiles[0].siteId = 'sendero-xolo'
  assert.throws(() => assertOracleVoiceProposals(unknown, matrix), /ajeno/)
})

test('propuestas no autorizan grabaciones ni declaraciones canónicas', () => {
  const approved = structuredClone(proposals)
  approved.profiles[1].editorialStatus = 'aprobado'
  assert.throws(() => assertOracleVoiceProposals(approved, matrix), /No se permite/)

  const recording = structuredClone(proposals)
  recording.profiles[1].voiceAsset = '/assets/audio/oraculo-casa.mp3'
  assert.throws(() => assertOracleVoiceProposals(recording, matrix), /No se permite/)

  const active = structuredClone(proposals)
  active.modelActive = true
  assert.throws(() => assertOracleVoiceProposals(active, matrix), /inválido/)
})

test('todas las descripciones vocales tienen indicación editorial completa', () => {
  for (const profile of proposals.profiles) {
    for (const key of ['workingName', 'timbre', 'rhythm', 'lexicon', 'guide', 'avoid']) {
      assert.equal(typeof profile[key], 'string')
      assert.ok(profile[key].length >= 10, profile.siteId + '/' + key)
    }
    assert.equal(profile.editorialStatus, 'propuesta-por-aprobar')
  }
  const blank = structuredClone(proposals)
  blank.profiles[0].avoid = ''
  assert.throws(() => assertOracleVoiceProposals(blank, matrix), /incompleto/)
})

test('la sala es privada, dinámica y no activa endpoints ni reproduce audio', () => {
  const page = source('app/guardian/voces-oraculos/page.tsx')
  assert.match(page, /if \(!\(await hasGuardianSession\(\)\)\) redirect\('\/guardian'\)/)
  assert.match(page, /export const dynamic = 'force-dynamic'/)
  assert.match(page, /robots: \{ index: false, follow: false \}/)
  assert.match(page, /assertOracleVoiceProposals\(proposals, matrix\)/)
  assert.doesNotMatch(page, /<audio|<video|<form|fetch\(/)
  assert.doesNotMatch(page, /href=\{'\/sitio\/'/)
})
