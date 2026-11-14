/**
 * Prueba de humo E2E (Chromium) para la rama candidata del Libro I.
 * Ejecutar contra NEXT `pnpm start` levantado en SY_BASE_URL.
 * Usa Chromium instalado por GitHub Actions: no utiliza llaves del creador.
 */
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { dirname, join } from 'node:path'

const base = (process.env.SY_BASE_URL || 'http://127.0.0.1:3000').replace(/\/$/, '')
const playwrightModule = process.env.SY_PLAYWRIGHT_MODULE
assert.ok(playwrightModule, 'Falta SY_PLAYWRIGHT_MODULE en el entorno de QA')
const { chromium } = await import(pathToFileURL(playwrightModule).href)
const root = join(dirname(fileURLToPath(import.meta.url)), '..')

function source(path) { return readFileSync(join(root, path), 'utf8') }
const chapterSource = source('lib/san-yallego/chapters.ts')
const assetSource = source('lib/san-yallego/assets.ts')
const first = assetSource.match(/libro1Capitulo1:\s*['"]([^'"]+\.mp3)['"]/)?.[1]
const mp3s = [...chapterSource.matchAll(/['"](\/assets\/audio\/libro-1\/[^'"]+\.mp3)['"]/g)].map(m => m[1])
const videos = [...new Set([...assetSource.matchAll(/['"](\/assets\/video\/[^'"]+\.mp4)['"]/g)].map(m => m[1]))]
const audioUrls = [first, ...mp3s]
assert.equal(audioUrls.length, 36)

const results = []
async function run(label, fn) {
  try {
    await fn()
    console.log('OK  ' + label)
    results.push({ label, ok: true })
  } catch (error) {
    console.error('FALLÓ ' + label, error)
    results.push({ label, ok: false, error: String(error) })
  }
}

await run('Entrega HTTP de los 36 MP3 por HEAD', async () => {
  for (const url of audioUrls) {
    const response = await fetch(base + url, { method: 'HEAD', signal: AbortSignal.timeout(20000) })
    assert.equal(response.status, 200, `${url}: HTTP ${response.status}`)
    assert.ok(Number(response.headers.get('content-length')) > 128 * 1024, `${url}: tamaño insuficiente`)
  }
})

await run('Entrega HTTP de los videos cinematográficos', async () => {
  for (const url of videos) {
    const response = await fetch(base + url, { method: 'HEAD', signal: AbortSignal.timeout(20000) })
    assert.equal(response.status, 200, `${url}: HTTP ${response.status}`)
  }
})

const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] })
const context = await browser.newContext({ viewport: { width: 1366, height: 768 }, reducedMotion: 'reduce' })
const page = await context.newPage()
const pageErrors = []
page.on('pageerror', error => pageErrors.push(String(error)))

await run('Primera visita: solo el primer capítulo abierto', async () => {
  await page.goto(base + '/libro/1', { waitUntil: 'domcontentloaded' })
  await page.locator('ol[aria-label="Capítulos del Libro I"]').waitFor()
  await page.locator('a[href="/libro/1/capitulo/1"]').first().waitFor()
  await page.waitForTimeout(400)
  const open = await page.locator('ol[aria-label="Capítulos del Libro I"] a[href^="/libro/1/capitulo/"]').count()
  assert.equal(open, 1, 'Antes del capítulo 1, debe haber un solo enlace')
  const closed = await page.getByText('POR DESCUBRIR', { exact: true }).count()
  assert.equal(closed, 32, 'Deben aparecer 32 capítulos por descubrir')
})

await run('Metadatos de los 36 MP3 decodificables por Chromium', async () => {
  const observations = await page.evaluate(async (urls) => {
    const readOne = (url) => new Promise(resolve => {
      const media = new Audio()
      media.preload = 'metadata'
      const timer = setTimeout(() => finish({ url, error: 'tiempo agotado' }), 20000)
      const finish = result => {
        clearTimeout(timer)
        media.pause()
        media.removeAttribute('src')
        media.load()
        resolve(result)
      }
      media.onloadedmetadata = () => finish({ url, duration: media.duration })
      media.onerror = () => finish({ url, error: 'no se pudieron cargar metadatos' })
      media.src = url
      media.load()
    })
    const result = []
    for (let index = 0; index < urls.length; index += 4) {
      result.push(...await Promise.all(urls.slice(index, index + 4).map(readOne)))
    }
    return result
  }, audioUrls)
  assert.equal(observations.length, 36)
  const failed = observations.filter(item => !Number.isFinite(item.duration) || item.duration <= 0)
  assert.deepEqual(failed, [], 'Hay MP3 que Chromium no pudo reconocer')
})

await run('Enlace directo al capítulo 2: puerta narrativa', async () => {
  await page.goto(base + '/libro/1/capitulo/2', { waitUntil: 'domcontentloaded' })
  await page.getByText(/Este capítulo todavía no se ha abierto en tu recorrido/).waitFor()
  assert.ok(await page.getByRole('link', { name: /Leer o escuchar el Capítulo I/ }).isVisible())
})

await run('Leer el capítulo 1 desbloquea los capítulos 2–33', async () => {
  await page.goto(base + '/libro/1/capitulo/1', { waitUntil: 'domcontentloaded' })
  await page.getByRole('button', { name: 'Leer', exact: true }).click()
  await page.getByRole('button', { name: 'Terminé de leer' }).click()
  await page.waitForFunction(() => JSON.parse(localStorage.getItem('san-yallego:progreso:v1') || '{}')?.completedChapters?.includes('libro-1-capitulo-1'))
  await page.goto(base + '/libro/1', { waitUntil: 'domcontentloaded' })
  await page.locator('ol[aria-label="Capítulos del Libro I"] a[href="/libro/1/capitulo/33"]').waitFor()
  const count = await page.locator('ol[aria-label="Capítulos del Libro I"] a[href^="/libro/1/capitulo/"]').count()
  assert.equal(count, 33)
  await page.reload({ waitUntil: 'domcontentloaded' })
  await page.locator('ol[aria-label="Capítulos del Libro I"] a[href="/libro/1/capitulo/33"]').waitFor()
  assert.equal(await page.locator('ol[aria-label="Capítulos del Libro I"] a[href^="/libro/1/capitulo/"]').count(), 33,
    'El desbloqueo debe sobrevivir a una recarga')
})

await run('Capítulos 4, 29 y 32 muestran reproductor de dos partes', async () => {
  for (const n of [4, 29, 32]) {
    await page.goto(base + '/libro/1/capitulo/' + n, { waitUntil: 'domcontentloaded' })
    await page.getByText('PARTE 1 DE 2', { exact: true }).waitFor()
    const src = await page.locator('audio').getAttribute('src')
    assert.ok(src?.includes('capitulo-' + String(n).padStart(2, '0') + '-'), `Audio inicial erróneo: capítulo ${n} ${src}`)
  }
})

await run('Transición de partes en 4, 29 y 32 sin completar el capítulo anticipadamente', async () => {
  for (const number of [4, 29, 32]) {
    await page.goto(base + '/libro/1/capitulo/' + number, { waitUntil: 'domcontentloaded' })
    await page.getByText('PARTE 1 DE 2', { exact: true }).waitFor()
    await page.locator('audio').evaluate(media => {
      // Simula el evento ended: prueba la lógica, NO el contenido ni la duración real.
      Object.defineProperty(media, 'ended', { configurable: true, get: () => true })
      media.dispatchEvent(new Event('ended', { bubbles: true }))
    })
    await page.getByText('PARTE 2 DE 2', { exact: true }).waitFor({ timeout: 5000 })
    const src = await page.locator('audio').getAttribute('src')
    assert.ok(src?.endsWith('parte-2.mp3'), `Capítulo ${number} no avanzó a parte 2: ${src}`)
    const completed = await page.evaluate(id => (
      JSON.parse(localStorage.getItem('san-yallego:progreso:v1') || '{}')?.completedChapters?.includes(id) ?? false
    ), 'libro-1-capitulo-' + number)
    assert.equal(completed, false, `Capítulo ${number} se marcó completo demasiado pronto`)
  }
})

await run('Los ocho sitios públicos reservados siguen sellados', async () => {
  for (let n = 3; n <= 10; n++) {
    const id = String(n).padStart(2, '0')
    await page.goto(base + '/sitio/sitio-' + id, { waitUntil: 'domcontentloaded' })
    await page.getByText('San Yallego todavía no te ha mostrado este camino.').waitFor()
    assert.equal(await page.getByRole('link', { name: 'Volver al mapa' }).count(), 1)
  }
})

await run('El mapa privado del Guardián redirige sin sesión', async () => {
  await page.goto(base + '/guardian/mapa', { waitUntil: 'domcontentloaded' })
  await page.waitForURL(/\/guardian\/?$/)
  assert.match(new URL(page.url()).pathname, /^\/guardian\/?$/)
})

await run('Chromium sin excepciones JavaScript', async () => {
  assert.deepEqual(pageErrors, [])
})

await context.close()

const mobile = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true })
const mobilePage = await mobile.newPage()
await run('Nueva visita móvil: bloqueo independiente y diseño sin desbordamiento', async () => {
  await mobilePage.goto(base + '/libro/1', { waitUntil: 'domcontentloaded' })
  await mobilePage.getByText('POR DESCUBRIR', { exact: true }).first().waitFor()
  assert.equal(await mobilePage.getByText('POR DESCUBRIR', { exact: true }).count(), 32)
  const size = await mobilePage.evaluate(() => ({ width: innerWidth, scrollWidth: document.documentElement.scrollWidth }))
  assert.ok(size.scrollWidth <= size.width + 6, `Desbordamiento horizontal en móvil: ${JSON.stringify(size)}`)
})
await mobile.close()
await browser.close()

const failed = results.filter(result => !result.ok)
console.log(`RESUMEN E2E: ${results.length - failed.length}/${results.length} verificaciones aprobadas`)
if (failed.length) process.exitCode = 1
