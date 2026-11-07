import { ASSETS } from './assets'
import type { SiteId } from './sites'
import type { BookNumber } from './universe'

export type ChapterId = `libro-${BookNumber}-capitulo-${number}`

export type ChapterPathKind = 'seguir-la-historia' | 'descubrir-un-misterio' | 'mirar-mas-profundo'

export interface ChapterPath {
  kind: ChapterPathKind
  label: string
  /** Sin href = camino todavía cerrado en la beta. */
  href?: string
}

export interface Chapter {
  id: ChapterId
  book: BookNumber
  number: number
  title: string
  siteId: SiteId
  /** URL del MP3 disponible en esta versión; null significa pendiente de incorporar al sitio. */
  audio: string | null
  /** Reservado para los capítulos grabados en dos partes, sin inventar rutas todavía. */
  audioParts: readonly string[]
  paths: ChapterPath[]
}

/** Índice oficial de «El Gran Cambio»: manuscrito ElevenLabs, 33 capítulos.
 * Los audios 2-33 existen en la biblioteca del autor, pero todavía no se han
 * recibido ni subido aquí. No generar enlaces a MP3 ausentes.
 */
export const BOOK_ONE_TITLES = [
  'El Primer Grito',
  'El Nombre Que Quema',
  'La Cicatriz Que Canta',
  'El Reflejo Que Respira',
  'Las Lágrimas Que Germinan',
  'Los Sueños Plateados',
  'El Nombre En Los Sueños',
  'La Puerta Del Reflejo',
  'El Primer Colorao',
  'La Esencia Del Colorao',
  'La Elección Del Xolo',
  'Los Espejos Niños',
  'El Maestro Desplateado',
  'La Lección De Los Pequeños',
  'El Baile De Los Nombres Verdaderos',
  'La Escuela De Los Cazadores De Nombres',
  'La Tinta De Las Memorias',
  'La Puerta Del Mictlán',
  'La Sombra Y La Savia',
  'El Canto De Las Raíces',
  'El Lamento Del Ahuehuete',
  'El Concilio De Los Árboles',
  'El Don Del Colorao',
  'La Sombra Propia',
  'El Umbral De Los Dieciséis',
  'El Año Del Puente',
  'Los Caminos De Amatlán',
  'El Tejido De Las Verdades',
  'La Búsqueda Del Primer Xolo',
  'Las Dos Mitades Del Cabello',
  'La Cueva De Los Suspiros Plateados',
  'La Flor De La Memoria',
  'El Último Corrido Del Libro Primero',
] as const

export const CHAPTERS: Chapter[] = BOOK_ONE_TITLES.map((title, index) => {
  const number = index + 1
  const firstAudio = number === 1 ? ASSETS.audio.libro1Capitulo1 : null
  return {
    id: `libro-1-capitulo-${number}`,
    book: 1,
    number,
    title,
    // Capítulo XVIII: la Puerta del Mictlán es el sitio VIII del mapa (Entrada al Inframundo).
    // La correspondencia literaria no desbloquea el recorrido cinematográfico.
    siteId: number === 18 ? 'sitio-08' : 'casa-de-juanito',
    audio: firstAudio,
    audioParts: firstAudio ? [firstAudio] : [],
    paths: number === 1 ? [
      { kind: 'seguir-la-historia', label: 'Seguir la historia' },
      { kind: 'descubrir-un-misterio', label: 'Descubrir un misterio' },
      { kind: 'mirar-mas-profundo', label: 'Mirar más profundo' },
    ] : [],
  } satisfies Chapter
})

export function getChapter(book: number, number: number): Chapter | undefined {
  return CHAPTERS.find((chapter) => chapter.book === book && chapter.number === number)
}

export function chapterHref(chapter: Pick<Chapter, 'book' | 'number'>): string {
  return `/libro/${chapter.book}/capitulo/${chapter.number}`
}
