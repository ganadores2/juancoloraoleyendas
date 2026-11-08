import 'server-only'
import { CHAPTER_ONE_TEXT } from './chapter-one-text'
import bookOneReading from './book-one-reading-v1.json'

/** Material de lectura de la edición literaria V1 depurada del SRT de ElevenLabs.
 * Cargar solamente del lado del servidor para no enviar los 33 capítulos juntos
 * al teléfono; la página transmite exclusivamente los párrafos del capítulo pedido.
 * No confundir disponibilidad de lectura con disponibilidad de audio.
 */
const remainingChapters: Record<string, readonly string[]> = bookOneReading.chapters

export function getChapterText(book: number, chapter: number): readonly string[] | null {
  if (book !== 1 || !Number.isInteger(chapter) || chapter < 1 || chapter > 33) return null
  if (chapter === 1) return CHAPTER_ONE_TEXT
  const paragraphs = remainingChapters[String(chapter)]
  return paragraphs?.length ? paragraphs : null
}
