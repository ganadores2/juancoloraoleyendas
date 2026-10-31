import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'
import { runInNewContext } from 'node:vm'
import ts from 'typescript'

/**
 * Ejecuta las reglas TypeScript reales, aislando solo el almacenamiento
 * del navegador. Así no duplicamos la lógica de los diez caminos.
 */
function loadRules(path, dependencies = {}) {
  const source = readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')
  const result = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
    fileName: path,
    reportDiagnostics: true,
  })
  const failures = result.diagnostics?.filter(d => d.category === ts.DiagnosticCategory.Error) ?? []
  assert.equal(failures.length, 0, `Error TypeScript en ${path}`)
  const module = { exports: {} }
  function require(specifier) {
    if (Object.hasOwn(dependencies, specifier)) return dependencies[specifier]
    throw new Error(`Import inesperado desde ${path}: ${specifier}`)
  }
  runInNewContext(result.outputText, { module, exports: module.exports, require, Date }, { filename: path })
  return module.exports
}

const sites = loadRules('lib/san-yallego/sites.ts')
const progress = loadRules('lib/san-yallego/progress.ts', {
  './local-store': { createLocalStore: (_key, initial) => ({ getSnapshot: () => initial }) },
})

test('hay diez lugares y exactamente ocho sellados', () => {
  assert.equal(sites.SITES.length, 10)
  assert.equal(new Set(sites.SITES.map(site => site.id)).size, 10)
  assert.equal(sites.SITES.filter(site => site.unlock.kind === 'sealed').length, 8)
  assert.equal(sites.getSite('entrada').experience, 'oraculo-entrada')
  assert.equal(sites.getSite('casa-de-juanito').experience, 'casa-de-juanito')
})

test('progreso falso no abre ninguno de los ocho sitios sellados', () => {
  const forged = {
    ...progress.INITIAL_PROGRESS,
    items: ['llave-san-yallego'],
    unlockedSites: sites.SITES.map(site => site.id),
    visitedSites: sites.SITES.map(site => site.id),
  }
  for (const site of sites.SITES.filter(site => site.unlock.kind === 'sealed')) {
    assert.equal(progress.isSiteUnlocked(site, forged), false, `No abrir ${site.id}`)
    assert.equal(site.experience, 'sellado')
  }
})

test('la llave del visitante abre solo Casa de Juanito', () => {
  const before = progress.INITIAL_PROGRESS
  const after = progress.transitions.findKey(before)
  assert.equal(progress.isSiteUnlocked(sites.getSite('entrada'), before), true)
  assert.equal(progress.isSiteUnlocked(sites.getSite('casa-de-juanito'), before), false)
  assert.equal(progress.isSiteUnlocked(sites.getSite('casa-de-juanito'), after), true)
  for (const site of sites.SITES.filter(site => site.unlock.kind === 'sealed')) {
    assert.equal(progress.isSiteUnlocked(site, after), false)
  }
  assert.equal(before.items.length, 0)
})
