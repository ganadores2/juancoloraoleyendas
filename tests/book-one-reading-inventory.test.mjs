/**
 * Inventario estructural del texto de lectura del Libro I.
 * No corrige prosa ni compara palabras contra los MP3: solo detecta
 * capítulos ausentes, vacíos o roturas accidentales del material servido.
 */
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const readingPath = join(root, 'lib/san-yallego/book-one-reading-v1.json')
const chapterOnePath = join(root, 'lib/san-yallego/chapter-one-text.ts')
const chapterTextPath = join(root, 'lib/san-yallego/chapter-text.ts')

const reading = JSON.parse(readFileSync(readingPath, 'utf8'))
const chapterOneSource = readFileSync(chapterOnePath, 'utf8')
const chapterTextSource = readFileSync(chapterTextPath, 'utf8')

test('La edición de lectura declara su fuente y mantiene capítulos 2–33 exactos', () => {
  assert.equal(typeof reading.source, 'string')
  assert.ok(reading.source.length > 0, 'Falta la fuente editorial')
  assert.equal(typeof reading.edition, 'string')
  assert.ok(reading.edition.length > 0, 'Falta identificar la edición de lectura')

  const keys = Object.keys(reading.chapters ?? {}).map(Number).sort((a, b) => a - b)
  assert.deepEqual(keys, Array.from({ length: 32 }, (_, index) => index + 2),
    'El JSON debe contener exactamente los capítulos 2–33')
})

test('Ningún capítulo 2–33 ni párrafo de lectura está vacío', () => {
  for (let number = 2; number <= 33; number++) {
    const paragraphs = reading.chapters[String(number)]
    assert.ok(Array.isArray(paragraphs), `Capítulo ${number}: no es una lista de párrafos`)
    assert.ok(paragraphs.length > 0, `Capítulo ${number}: sin texto`)
    for (const [index, paragraph] of paragraphs.entries()) {
      assert.equal(typeof paragraph, 'string', `Capítulo ${number}, párrafo ${index + 1}: tipo inválido`)
      assert.ok(paragraph.trim().length > 0, `Capítulo ${number}, párrafo ${index + 1}: vacío`)
    }
  }
})

test('El capítulo 1 conserva su archivo dedicado y material sustancial', () => {
  assert.match(chapterOneSource, /export const CHAPTER_ONE_TEXT/)
  const paragraphLines = chapterOneSource
    .split('\n')
    .filter(line => /^\s{2}"(?:[^"\\]|\\.)*",?\s*$/.test(line))
  assert.ok(paragraphLines.length >= 50,
    `Capítulo 1 parece incompleto: solo ${paragraphLines.length} párrafos detectados`)
})

test('El cargador del servidor une capítulo 1 y capítulos 2–33 sin exponer el libro entero al cliente', () => {
  assert.match(chapterTextSource, /import 'server-only'/)
  assert.match(chapterTextSource, /if \(chapter === 1\) return CHAPTER_ONE_TEXT/)
  assert.match(chapterTextSource, /remainingChapters\[String\(chapter\)\]/)
  assert.match(chapterTextSource, /chapter < 1 \|\| chapter > 33/)
})

test('Los cierres de citas no duplican el punto final en los capítulos 2–33', () => {
  for (let number = 2; number <= 33; number++) {
    const paragraphs = reading.chapters[String(number)]
    for (const [index, paragraph] of paragraphs.entries()) {
      assert.doesNotMatch(paragraph, /[.!?…]”\./,
        `Capítulo ${number}, párrafo ${index + 1}: punto final duplicado tras comillas`)
    }
  }
})


test('La lectura preserva decisiones editoriales confirmadas por el autor', () => {
  const allChapters = Object.values(reading.chapters).flat().join('\n')
  assert.doesNotMatch(chapterOneSource, /Chabela/i, 'Capítulo 1: reapareció la grafía incorrecta Chabela')
  assert.doesNotMatch(allChapters, /Chabela/i, 'Capítulos 2–33: reapareció la grafía incorrecta Chabela')

  const chapterFour = reading.chapters['4']
  const firstReply = chapterFour.indexOf('—No tengo miedo.')
  assert.ok(firstReply >= 0, 'Capítulo 4: falta la declaración de Juan')
  assert.equal(chapterFour[firstReply + 1], '—Yo sí.',
    'Capítulo 4: la réplica de María debe conservar la corrección autoral')

  const chapterTwentyFive = reading.chapters['25'].join(' ')
  assert.match(chapterTwentyFive, /Los dieciséis no estaban resultando tan sagrados como prometían\./,
    'Capítulo 25: preservar la concordancia y el sentido de los dieciséis años')

  const chapterThirtyThree = reading.chapters['33']
  assert.equal(chapterThirtyThree.at(-1), 'Y Siguió… caminando…',
    'Capítulo 33: preservar el cierre narrativo aprobado sin anexar notas editoriales')
  assert.doesNotMatch(chapterThirtyThree.join(' '), /FIN DEL CAPÍTULO 33/i,
    'Capítulo 33: el cierre hablado es una indicación de audio, no texto narrativo')
})
