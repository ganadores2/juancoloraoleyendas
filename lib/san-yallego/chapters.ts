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
  const chapterAudio: Partial<Record<number, readonly string[]>> = {
    1: [ASSETS.audio.libro1Capitulo1],
    2: ['/assets/audio/libro-1/capitulo-02-el-nombre-que-quema.mp3'],
    3: ['/assets/audio/libro-1/capitulo-03-la-cicatriz-que-canta.mp3'],
    4: [
      '/assets/audio/libro-1/capitulo-04-el-reflejo-que-respira-parte-1.mp3',
      '/assets/audio/libro-1/capitulo-04-el-reflejo-que-respira-parte-2.mp3',
    ],
    5: ['/assets/audio/libro-1/capitulo-05-las-lagrimas-que-germinan.mp3'],
    6: ['/assets/audio/libro-1/capitulo-06-los-suenos-plateados.mp3'],    
    7: ['/assets/audio/libro-1/capitulo-07-el-nombre-en-los-suenos.mp3'],  
    8: ['/assets/audio/libro-1/capitulo-08-la-puerta-del-reflejo.mp3'],    
    9: ['/assets/audio/libro-1/capitulo-09-el-primer-colorao.mp3'],
   10: ['/assets/audio/libro-1/capitulo-10-la-esencia-del-colorao.mp3'],
   11: ['/assets/audio/libro-1/capitulo-11-la-eleccion-del-xolo.mp3'],
   12: ['/assets/audio/libro-1/capitulo-12-los-espejos-ninos.mp3'], 
   13: ['/assets/audio/libro-1/capitulo-13-el-maestro-desplateado.mp3'],
   14: ['/assets/audio/libro-1/capitulo-14-la-leccion-de-los-pequenos.mp3'], 
   15: ['/assets/audio/libro-1/capitulo-15-el-baile-de-los-nombres-verdaderos.mp3'],
   16: ['/assets/audio/libro-1/capitulo-16-la-escuela-de-los-cazadores-de-nombres.mp3'],
   17: ['/assets/audio/libro-1/capitulo-17-la-tinta-de-las-memorias.mp3'],
   18: ['/assets/audio/libro-1/capitulo-18-la-puerta-del-mictlan.mp3'],
   19: ['/assets/audio/libro-1/capitulo-19-la-sombra-y-la-savia.mp3'],
   20: ['/assets/audio/libro-1/capitulo-20-el-canto-de-las-raices.mp3'],
   21: ['/assets/audio/libro-1/capitulo-21-el-lamento-del-ahuehuete.mp3'],
   22: ['/assets/audio/libro-1/capitulo-22-el-concilio-de-los-arboles.mp3'],
   23: ['/assets/audio/libro-1/capitulo-23-el-don-del-colorao.mp3'],
   24: ['/assets/audio/libro-1/capitulo-24-la-sombra-propia.mp3'],
   25: ['/assets/audio/libro-1/capitulo-25-el-umbral-de-los-dieciseis.mp3'],
   26: ['/assets/audio/libro-1/capitulo-26-el-ano-del-puente.mp3'],
   27: ['/assets/audio/libro-1/capitulo-27-los-caminos-de-amatlan.mp3'],
   28: ['/assets/audio/libro-1/capitulo-28-el-tejido-de-las-verdades.mp3'],
   29: [
  '/assets/audio/libro-1/capitulo-29-la-busqueda-del-primer-xolo.mp3',
  '/assets/audio/libro-1/capitulo-29-la-busqueda-del-primer-xolo-parte-2.mp3',
], 
   30: ['/assets/audio/libro-1/capitulo-30-las-dos-mitades-del-cabello.mp3'],
   31: ['/assets/audio/libro-1/capitulo-31-la-cueva-de-los-suspiros-plateados.mp3'],
   32: [
  '/assets/audio/libro-1/capitulo-32-la-flor-de-la-memoria.mp3',
  '/assets/audio/libro-1/capitulo-32-la-flor-de-la-memoria-parte-2.mp3',
],
33: ['/assets/audio/libro-1/capitulo-33-el-ultimo-corrido-del-libro-primero.mp3'],

  }
const audioParts = chapterAudio[number] ?? []
const firstAudio = audioParts[0] ?? null
return {
    id: `libro-1-capitulo-${number}`,
    book: 1,
    number,
    title,
    // Capítulo XVIII: la Puerta del Mictlán es el sitio VIII del mapa (Entrada al Inframundo).
    // La correspondencia literaria no desbloquea el recorrido cinematográfico.
    siteId: number === 18 ? 'sitio-08' : 'casa-de-juanito',
    audio: firstAudio,audioParts,
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
