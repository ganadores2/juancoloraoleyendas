import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'
import { runInNewContext } from 'node:vm'
import ts from 'typescript'

const source = (path) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')

function loadRules(path, dependencies = {}) {
  const result = ts.transpileModule(source(path), {
    fileName: path,
    reportDiagnostics: true,
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  })
  const failures = result.diagnostics?.filter((d) => d.category === ts.DiagnosticCategory.Error) ?? []
  assert.equal(failures.length, 0, 'Sintaxis TypeScript en ' + path)
  const mod = { exports: {} }
  const require = (name) => {
    if (Object.hasOwn(dependencies, name)) return dependencies[name]
    throw new Error('Import inesperado: ' + name)
  }
  runInNewContext(result.outputText, {
    module: mod, exports: mod.exports, require, Date,
  }, { filename: path })
  return mod.exports
}

const oracles = source('lib/san-yallego/oracles.ts')
const assets = source('lib/san-yallego/assets.ts')
const entrance = source('components/san-yallego/oraculo/oraculo-entrada.tsx')
const ring = source('components/san-yallego/oraculo/hidden-ring.tsx')
const questions = source('components/san-yallego/oraculo/oracle-questions.tsx')
const reveal = source('components/san-yallego/oraculo/key-reveal.tsx')
const journey = source('components/san-yallego/site-journey.tsx')
const sitePage = source('app/sitio/[slug]/page.tsx')

const siteRules = loadRules('lib/san-yallego/sites.ts')
const progress = loadRules('lib/san-yallego/progress.ts', {
  './local-store': { createLocalStore: (_key, initial) => ({ getSnapshot: () => initial }) },
})

test('la imagen del autor es opcional hasta su entrega: existe fallback sobre el fondo original', () => {
  assert.match(assets, /oraculoEntradaLlaveOculta: '\/assets\/images\/oraculo-entrada-llave-oculta\.png'/)
  assert.match(entrance, /CinematicImage src=\{oracle\.image\}/)
  assert.match(entrance, /src=\{ASSETS\.images\.oraculoEntradaLlaveOculta\}/)
  assert.match(entrance, /onLoad=\{\(\) => setExpandedReady\(true\)\}/)
  assert.match(entrance, /onError=\{\(\) => \{/)
  assert.match(entrance, /setExpandedMissing\(true\)/)
})

test('coordenadas del aro real: 49,3 % / 78 % solo con fotografía ampliada', () => {
  assert.match(oracles, /hiddenRing: \{ x: 71, y: 78, sizePx: 30 \}/)
  assert.match(oracles, /hiddenRingOnExpandedImage: \{ x: 49\.3, y: 78, sizePx: 64 \}/)
  assert.match(entrance, /expandedReady \? \(oracle\.hiddenRingOnExpandedImage \?\? oracle\.hiddenRing\) : oracle\.hiddenRing/)
  assert.match(ring, /Math\.max\(sizePx, 56\)/)
  assert.match(ring, /aria-label="Tocar la argolla antigua para extraer la llave"/)
  assert.match(ring, /disabled=\{state !== 'dormida'\}/)
})

test('tres preguntas antes del hallazgo, admitiendo silencio', () => {
  assert.match(entrance, /questionsComplete \|\| alreadyHasKey/)
  assert.match(entrance, /alreadyHasKey \|\| !questionsComplete\) return/)
  assert.match(entrance, /findKey\(\)/)
  assert.match(questions, /advance\(''\)/)
  assert.match(questions, /top-20 z-20/) // libera la argolla al terminar
  const initial = progress.INITIAL_PROGRESS
  assert.equal(progress.transitions.findKey(initial).items.length, 0)
  let p = initial
  for (let i = 0; i < 3; i++) p = progress.transitions.answerOracle('oraculo-entrada', i, '')(p)
  assert.equal(progress.hasCompletedEntranceOracle(p), true)
  const unlocked = progress.transitions.findKey(p)
  assert.equal(unlocked.items.includes('llave-san-yallego'), true)
  assert.equal(progress.isSiteUnlocked(siteRules.getSite('casa-de-juanito'), unlocked), true)
  for (const site of siteRules.SITES.filter((s) => s.unlock.kind === 'sealed')) {
    assert.equal(progress.isSiteUnlocked(site, unlocked), false)
  }
})

test('el botón del pase arranca el primer vuelo sin desbloquear nada por URL', () => {
  assert.match(reveal, /casa-de-juanito\?desde-llave=1/)
  assert.match(reveal, /Comenzar vuelo a la Casa de Juanito/)
  assert.match(sitePage, /\(await searchParams\)\['desde-llave'\] === '1'/)
  assert.match(sitePage, /fromNewKey=\{comingFromKey\}/)
  assert.match(journey, /siteId === 'casa-de-juanito' && fromNewKey \? 'descenso'/)
  assert.match(journey, /if \(!isSiteUnlocked\(site, progress\)\)/)
  assert.equal(progress.isSiteUnlocked(siteRules.getSite('casa-de-juanito'), progress.INITIAL_PROGRESS), false)
  assert.equal(siteRules.SITES.filter((site) => site.unlock.kind === 'sealed').length, 8)
})

test('sin cambios de llave maestra ni acceso a lugares reservados', () => {
  const combined = [entrance,ring,questions,reveal,journey,sitePage].join('\n')
  assert.doesNotMatch(combined, /mcp__|\bopenai\b|anthropic|fetch\(|sessionStorage/)
  assert.doesNotMatch(combined, /'sitio-0[3-9]'\s*\)|'sitio-10'\s*\)/)
  assert.match(entrance, /REVEAL_DURATION_MS = 950/)
})
