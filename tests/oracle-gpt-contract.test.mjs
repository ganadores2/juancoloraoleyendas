import assert from 'node:assert/strict'
import { test } from 'node:test'
import { readFileSync } from 'node:fs'
import {
  ORACLE_GPT_CONTRACT_VERSION, ORACLE_PUBLIC_RULES,
  prepareOracleN0Blueprint, unavailableOracle, verifyOracleMatrixForBlueprints,
} from '../lib/san-yallego/oracle-gpt-contract.mjs'

const source = (path) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const matrix = JSON.parse(source('lib/san-yallego/oracle-matrix-v1.json'))
const sitesSource = source('lib/san-yallego/sites.ts')
const sites = [...sitesSource.matchAll(/id: '(entrada|casa-de-juanito|sitio-\d{2})',[\s\S]*?order: (\d+),[\s\S]*?unlock: \{ kind: '(open|requires-item|sealed)'/g)]
  .map((match) => ({ id: match[1], order: Number(match[2]), unlock: { kind: match[3] } }))

test('catálogos reales: diez sitios, 33 capítulos y reglas editoriales N0', () => {
  assert.equal(sites.length, 10)
  assert.deepEqual(verifyOracleMatrixForBlueprints(matrix, sites), { sites: 10, chapters: 33 })
  assert.equal(matrix.policy.public, 'N0')
  assert.equal(matrix.editorialApproval.status, 'aprobada')
  assert.equal(sites.filter((site) => site.unlock.kind === 'sealed').length, 8)
})

test('la Entrada tiene solo una previsualización editorial N0, nunca una IA activa', () => {
  const plan = prepareOracleN0Blueprint({ siteId: 'entrada', matrix, sites })
  assert.equal(plan.status, 'editorial-preview')
  assert.equal(plan.version, ORACLE_GPT_CONTRACT_VERSION)
  assert.equal(plan.modelActive, false)
  assert.equal(plan.publishReady, false)
  assert.equal(plan.knowledgeLevel, 'N0')
  assert.equal(plan.sampleQuestion, matrix.sites[0].sampleQuestion)
  assert.equal(plan.exampleResponse, matrix.sites[0].safeResponseExample)
  assert.deepEqual(plan.chapterReferences.map((ref) => ref.chapter), [2, 3, 16])
  assert.equal(plan.rules.length, ORACLE_PUBLIC_RULES.length)
  assert.equal(plan.chapterReferences.every((ref) => ref.book === 1 && !('href' in ref)), true)
  assert.equal(/N5|C100|llave-privada|MASTER_KEY/.test(JSON.stringify(plan)), false)
})

test('el progreso local del visitante NO autoriza el Oráculo de Casa de Juanito', () => {
  const payload = {
    siteId: 'casa-de-juanito', matrix, sites,
    progress: { items: ['llave-san-yallego'], unlockedSites: ['casa-de-juanito'] },
    trusted: true,
  }
  assert.deepEqual(prepareOracleN0Blueprint(payload), unavailableOracle())
  assert.deepEqual(prepareOracleN0Blueprint({ ...payload, permitRestrictedSite: true }), unavailableOracle())
  assert.deepEqual(prepareOracleN0Blueprint({ ...payload, permitRestrictedSite: () => false }), unavailableOracle())

  // Solo simula el futuro resultado de una verificación independiente de servidor.
  const ownerVerified = prepareOracleN0Blueprint({ ...payload, permitRestrictedSite: () => true })
  assert.equal(ownerVerified.status, 'editorial-preview')
  assert.equal(ownerVerified.knowledgeLevel, 'N0')
  assert.deepEqual(ownerVerified.chapterReferences.map((ref) => ref.chapter), [1, 4, 5, 11])
})

test('los ocho lugares sellados NO se abren aunque un callback conceda permiso', () => {
  for (const site of sites.filter((site) => site.unlock.kind === 'sealed')) {
    const plan = prepareOracleN0Blueprint({
      siteId: site.id, matrix, sites, permitRestrictedSite: () => true,
    })
    assert.deepEqual(plan, unavailableOracle(), site.id)
  }
  assert.deepEqual(prepareOracleN0Blueprint({ siteId: 'fantasma', matrix, sites }), unavailableOracle())
  assert.deepEqual(prepareOracleN0Blueprint({ siteId: '../guardian', matrix, sites }), unavailableOracle())
  assert.equal('siteId' in unavailableOracle(), false, 'Ni el nombre del sitio bloqueado debe filtrarse')
})

test('cualquier matriz incompleta o inconsistente detiene el contrato', () => {
  const dup = structuredClone(matrix)
  dup.sites[1].chapterRecommendations[0].chapter = 2
  assert.throws(() => verifyOracleMatrixForBlueprints(dup, sites), /Capítulo sin fuente o duplicado/)

  const wrongCount = structuredClone(matrix)
  wrongCount.sites.pop()
  assert.throws(() => verifyOracleMatrixForBlueprints(wrongCount, sites), /diez Oráculos/)

  const wrongId = structuredClone(sites)
  wrongId[9].id = 'sitio-09'
  assert.throws(() => verifyOracleMatrixForBlueprints(matrix, wrongId), /duplicado/)

  const invalidAccess = structuredClone(sites)
  invalidAccess[3].unlock.kind = 'open-by-client'
  assert.throws(() => verifyOracleMatrixForBlueprints(matrix, invalidAccess), /Regla de apertura/)
})

test('contrato sin endpoint público, secretos ni invocaciones a un proveedor IA', () => {
  const contract = source('lib/san-yallego/oracle-gpt-contract.mjs')
  assert.doesNotMatch(contract, /fetch\(|process\.env\.|localStorage\./)
  assert.match(contract, /modelActive: false/)
  assert.match(contract, /publishReady: false/)
  assert.match(contract, /permitRestrictedSite/)
})
