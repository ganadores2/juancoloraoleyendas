import { ASSETS } from './assets'
import type { SiteId } from './sites'
import type { BookNumber } from './universe'

export type ChapterId = `libro-${BookNumber}-capitulo-${number}`

export type ChapterPathKind = 'seguir-la-historia' | 'descubrir-un-misterio' | 'mirar-mas-profundo'

export interface ChapterPath {
  kind: ChapterPathKind
  label: string
  /** Sin href = camino aún cerrado en la beta. */
  href?: string
}

export interface Chapter {
  id: ChapterId
  book: BookNumber
  number: number
  title: string
  siteId: SiteId
  audio: string
  paths: ChapterPath[]
}

export const CHAPTERS: Chapter[] = [
  {
    id: 'libro-1-capitulo-1',
    book: 1,
    number: 1,
    title: 'El Primer Grito',
    siteId: 'casa-de-juanito',
    audio: ASSETS.audio.libro1Capitulo1,
    paths: [
      { kind: 'seguir-la-historia', label: 'Seguir la historia' },
      { kind: 'descubrir-un-misterio', label: 'Descubrir un misterio' },
      { kind: 'mirar-mas-profundo', label: 'Mirar más profundo' },
    ],
  },
]

export function getChapter(book: number, number: number): Chapter | undefined {
  return CHAPTERS.find((chapter) => chapter.book === book && chapter.number === number)
}

export function chapterHref(chapter: Pick<Chapter, 'book' | 'number'>): string {
  return `/libro/${chapter.book}/capitulo/${chapter.number}`
}
