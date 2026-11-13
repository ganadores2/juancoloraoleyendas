import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'
import { buildOracleWorkbench } from '../lib/san-yallego/oracle-workbench.mjs'

const source = (path) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const matrix = JSON.parse(source('lib/san-yallego/oracle-matrix-v1.json'))
const timeline = JSON.parse(source('lib/san-yallego/oracle-timeline-v2.json'))
const siteSource = source('lib/san-yallego/sites.ts')
const chapterSource = source('lib/san-yallego/chapters.ts')

const titlesBlock = chapterSource.split('export const BOOK_ONE_TITLES = [')[1]?.split('] as const')[0]
assert.ok(titlesBlock, 'Se requiere el índice editorial real del Libro I')
const titles = [...titlesBlock.matchAll(/^\s*'([^']+)'\s*,?\s*$/gm)].map((item) => item[1])

const audioBlock = chapterSource.split('const chapterAudio:')[1]?.split('const audioParts =')[0]
assert.ok(audioBlock, 'Se requiere el catálogo real de partes del audio')
const parts = new Map([...audioBlock.matchAll(/^\s*(\d+):\s*\[([\s\S]*?)\]\s*,?/gm)].map((match) => [
  Number(match[1]), [...match[2].matchAll(/\.mp3|ASSETS\.audio\./g)].length,
]))

const chapters = titles.map((title, index) => {
  const number = index + 1
  const count = parts.get(number) ?? 0
  return {
    book: 1, number, title,
    audio: count > 0 ? '/assets/audio/libro-1/test-capitulo.mp3' : null,
    audioParts: Array.from({ length: count }, (_, part) => '/assets/audio/libro-1/test-' + number + '-' + part + '.mp3'),
  }
})

const sites = matrix.sites.map((site) => ({
  id: site.siteId,
  order: site.order,
  name: site.siteName,
  unlock: { kind: site.order === 1 ? 'open' : site.order === 2 ? 'requires-item' : 'sealed' },
}))

const render = (overrides = {}) => buildOracleWorkbench({
  matrix, timeline, sites, chapters, ...overrides,
})

test('el Libro I agrupa 33 capítulos reales en diez Oráculos sin duplicados', () => {
  assert.equal(titles.length, 33)
  assert.equal(parts.size, 33)
  assert.equal(parts.get(4), 2)
  assert.equal(parts.get(29), 2)
  assert.equal(parts.get(32), 2)

  const result = render()
  assert.deepEqual(result.summary, {
    sites: 10,
    chapters: 33,
    withCatalogAudio: 33,
    totalAudioParts: 36,
    sealedSites: 8,
    futureIndexed: 0,
  })
  assert.deepEqual(result.oracles.map((oracle) => oracle.chapters.map((chapter) => chapter.number)), [
    [2, 3, 16], [1, 4, 5, 11], [9, 12, 14, 15], [10, 23, 24],
    [13, 17, 28], [6, 7, 8], [25, 26, 27], [18, 30, 31],
    [29, 32, 33], [19, 20, 21, 22],
  ])
})

test('las etiquetas de los lugares sellados siguen en el catálogo real de sitios', () => {
  for (let n = 3; n <= 10; n++) {
    const id = 'sitio-' + String(n).padStart(2, '0')
    assert.match(siteSource, new RegExp('id: \''
      + id + '\'[^\\n]*unlock: \\{ kind: \'sealed\' \\}'),
      'El sitio público debe seguir sellado: ' + id)
  }
  assert.equal(sites.filter((site) => site.unlock.kind === 'sealed').length, 8)
})

test('si una matriz duplica capítulos o pierde referencias falla de manera segura', () => {
  const duplicated = structuredClone(matrix)
  duplicated.sites[1].chapterRecommendations[0].chapter = 2
  assert.throws(() => render({ matrix: duplicated }), /Capítulo del Libro I duplicado/)

  const missing = chapters.filter((item) => item.number !== 1)
  assert.throws(() => render({ chapters: missing }), /sin catálogo real/)

  const wrongTitle = structuredClone(matrix)
  wrongTitle.sites[0].chapterRecommendations[0].title = 'Título no cotejado'
  assert.throws(() => render({ matrix: wrongTitle }), /Título del capítulo incompatible/)
})

test('la matriz y la línea temporal deben conservar la misma distribución', () => {
  const future = structuredClone(timeline)
  future.oracleCollections[0].bookChapters['2'].push({ book: 2, chapter: 34 })
  const result = render({ timeline: future })
  assert.equal(result.summary.futureIndexed, 1)
  assert.equal(result.oracles[0].futureIndexed, 1)
  assert.equal(result.oracles[0].chapters.every((chapter) => chapter.href.startsWith('/libro/1/capitulo/')), true)

  const mismatched = structuredClone(timeline)
  mismatched.oracleCollections[0].bookChapters['1'][0].chapter = 1
  assert.throws(() => render({ timeline: mismatched }), /Matriz y línea temporal/)
})

test('tablero y acceso desde mapa existen solo en el taller autenticado', () => {
  const page = source('app/guardian/oraculos/page.tsx')
  const mapPage = source('app/guardian/mapa/page.tsx')
  assert.match(page, /if \(!\(await hasGuardianSession\(\)\)\) redirect\('\/guardian'\)/)
  assert.match(page, /export const dynamic = 'force-dynamic'/)
  assert.match(page, /robots: \{ index: false, follow: false \}/)
  assert.match(page, /buildOracleWorkbench\(/)
  assert.match(page, /href=\{'\/guardian\/sitio\/' \+ oracle\.id\}/)
  assert.match(mapPage, /href="\/guardian\/oraculos"/)
  assert.doesNotMatch(page, /href=\{'\/sitio\/' \+ oracle\.id\}/)
})
