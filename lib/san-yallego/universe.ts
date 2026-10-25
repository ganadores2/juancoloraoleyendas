import type { SiteId } from './sites'

export type BookNumber = 1 | 2 | 3

export interface Book {
  number: BookNumber
  title: string
  /** Capa del mundo en la que vive el libro. */
  layer: 'visible' | 'oculta' | 'profunda'
  firstChapter: number
  lastChapter: number
}

/** 99 capítulos en tres libros de 33. */
export const BOOKS: Book[] = [
  { number: 1, title: 'Libro I', layer: 'visible', firstChapter: 1, lastChapter: 33 },
  { number: 2, title: 'Libro II', layer: 'oculta', firstChapter: 34, lastChapter: 66 },
  { number: 3, title: 'Libro III', layer: 'profunda', firstChapter: 67, lastChapter: 99 },
]

export const TOTAL_CHAPTERS = 99

/** El Capítulo 100 regresa al Oráculo de la Entrada y abre el Universo Extendido. */
export const FINAL_CHAPTER: { number: 100; returnsTo: SiteId; opens: 'universo-extendido' } = {
  number: 100,
  returnsTo: 'entrada',
  opens: 'universo-extendido',
}

export function getBookForChapter(chapterNumber: number): Book | undefined {
  return BOOKS.find(
    (book) => chapterNumber >= book.firstChapter && chapterNumber <= book.lastChapter,
  )
}
