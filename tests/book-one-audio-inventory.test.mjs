/**
 * Verifica únicamente el inventario físico y las rutas de los 33 capítulos.
 * No decodifica MP3 ni sustituye pruebas de reproducción en navegador.
 * Ejecutar en la rama que contiene los audios:
 *   node --test tests/book-one-audio-inventory.test.mjs
 */
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const audioDir = join(root, 'public/assets/audio/libro-1')
const chaptersSource = readFileSync(join(root, 'lib/san-yallego/chapters.ts'), 'utf8')
const assetsSource = readFileSync(join(root, 'lib/san-yallego/assets.ts'), 'utf8')

const firstAudio = assetsSource.match(/libro1Capitulo1:\s*['"]([^'"]+\.mp3)['"]/)?.[1]
const sourceChunk = chaptersSource.split('const chapterAudio')[1]?.split('\n  }\n')[0]

test('El capítulo 1 tiene un MP3 declarado en ASSETS', () => {
  assert.ok(firstAudio?.startsWith('/assets/audio/libro-1/'), 'Falta ASSETS.audio.libro1Capitulo1')
})

test('Los capítulos 1–33 tienen entradas de audio, sin referencias inventadas ni sobrantes', () => {
  assert.ok(sourceChunk, 'No se encontró el catálogo chapterAudio')
  const catalog = new Map()
  for (const match of sourceChunk.matchAll(/^\s*(\d{1,2}):\s*\[([\s\S]*?)\]/gm)) {
    const number = Number(match[1])
    assert.ok(!catalog.has(number), `Capítulo repetido: ${number}`)
    const urls = [...match[2].matchAll(/['"](\/assets\/audio\/libro-1\/[^'"]+\.mp3)['"]/g)].map(x => x[1])
    if (number === 1 && match[2].includes('ASSETS.audio.libro1Capitulo1')) {
      assert.ok(firstAudio, 'La referencia del primer capítulo no se pudo resolver')
      urls.push(firstAudio)
    }
    assert.ok(urls.length > 0, `Capítulo ${number} no tiene audios`)
    catalog.set(number, urls)
  }

  assert.equal(catalog.size, 33, 'Deben existir exactamente 33 entradas de capítulo')
  for (let chapter = 1; chapter <= 33; chapter++) {
    assert.ok(catalog.has(chapter), `Falta el capítulo ${chapter}`)
  }
  assert.deepEqual(
    [...catalog.entries()].filter(([, files]) => files.length > 1).map(([n]) => n),
    [4, 29, 32],
    'Verificar qué capítulos están divididos en dos partes',
  )

  const referencedFiles = [...catalog.values()].flat().map(url => url.replace(/^\/assets\//, ''))
  assert.equal(new Set(referencedFiles).size, referencedFiles.length, 'Hay MP3 duplicados en el catálogo')

  const actualFiles = readdirSync(audioDir).filter(name => name.endsWith('.mp3'))
    .map(name => join('audio/libro-1', name)).sort()
  assert.deepEqual(actualFiles, referencedFiles.sort(), 'MP3 ausentes o no enlazados')

  for (const name of actualFiles) {
    const fullPath = join(root, 'public/assets', name)
    assert.ok(statSync(fullPath).size > 128 * 1024, `Archivo demasiado pequeño o marcador Git LFS: ${name}`)
  }
})
