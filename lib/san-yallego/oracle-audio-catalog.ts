import 'server-only'

import type { SiteId } from './sites'
import timeline from './oracle-timeline-v2.json'

/**
 * Catálogo editorial de audio intertemporal para los 10 Oráculos.
 *
 * El manifiesto solo contiene referencias PUBLICABLES, no textos reservados.
 * Todos los enlaces se resuelven desde un catálogo autenticado del servidor.
 * La matriz no habilita capítulos, no aloja MP3 ni autoriza llaves.
 */
export type OracleBook = 1 | 2 | 3 | 4
export type TemporalLinkKind =
  | 'seguir-secuencia'
  | 'regresar-al-origen'
  | 'brincar-al-futuro'

export interface ChapterRef {
  book: OracleBook
  chapter: number
}

export interface PublishedChapterAudio extends ChapterRef {
  title: string
  /** Enlace real, publicado y verificado a la pantalla del capítulo. */
  href: string
  /** Todas las partes del audio, en su orden de reproducción validado. */
  audioParts: readonly string[]
  /** Confirmación desde el catálogo de publicación, no del estado local del visitante. */
  published: boolean
}

export interface AudioRecommendation extends ChapterRef {
  title: string
  href: string
  audioParts: readonly string[]
  relation: 'principal' | TemporalLinkKind
  theme?: string
}

type AudioAccessGuard = (record: PublishedChapterAudio) => boolean

const key = (chapter: ChapterRef) => `${chapter.book}:${chapter.chapter}`
const volumes: readonly OracleBook[] = [1, 2, 3, 4]

function resolvePublished(
  chapter: ChapterRef,
  catalog: readonly PublishedChapterAudio[],
  mayAccess: AudioAccessGuard,
): PublishedChapterAudio | null {
  const record = catalog.find((candidate) =>
    candidate.book === chapter.book && candidate.chapter === chapter.chapter,
  )
  if (!record || !record.published || !mayAccess(record)) return null
  if (record.audioParts.length === 0 || record.audioParts.some((part) => !part.trim())) return null
  // Nunca inventar rutas de capítulos ni devolver enlaces externos de una fuente no validada.
  if (record.href !== `/libro/${record.book}/capitulo/${record.chapter}`) return null
  return record
}

/** Referencias editoriales del sitio: el Libro I aprobado, el II–IV vacíos hasta verificarse. */
export function getOracleChapterReferences(siteId: SiteId): readonly ChapterRef[] {
  const oracle = timeline.oracleCollections.find((item) => item.siteId === siteId)
  if (!oracle) return []
  return volumes.flatMap((book) =>
    oracle.bookChapters[String(book) as '1' | '2' | '3' | '4']
      .map((ref) => ({ book: book as OracleBook, chapter: ref.chapter })),
  )
}

/**
 * Uso reservado al servidor. Un capítulo sólo se recomienda como audio si
 * el catálogo acredita publicación, archivo(s), URL real y permiso.
 */
export function getPublishedOracleAudio(
  siteId: SiteId,
  catalog: readonly PublishedChapterAudio[],
  mayAccess: AudioAccessGuard,
): AudioRecommendation[] {
  const known = new Set<string>()
  return getOracleChapterReferences(siteId).flatMap((ref) => {
    const id = key(ref)
    if (known.has(id)) return []
    known.add(id)
    const chapter = resolvePublished(ref, catalog, mayAccess)
    if (!chapter) return []
    return [{
      book: chapter.book,
      chapter: chapter.chapter,
      title: chapter.title,
      href: chapter.href,
      audioParts: chapter.audioParts,
      relation: 'principal' as const,
    }]
  })
}

/**
 * Rutas al pasado/presente/futuro: no se crean botones ni enlaces
 * hacia capítulos que aún no tienen audio disponible y autorización.
 */
export function getPublishedTemporalLinks(
  from: ChapterRef,
  catalog: readonly PublishedChapterAudio[],
  mayAccess: AudioAccessGuard,
): AudioRecommendation[] {
  const known = new Set<string>()
  return timeline.temporalEdges.flatMap((edge) => {
    if (edge.from.book !== from.book || edge.from.chapter !== from.chapter) return []
    const id = key(edge.to)
    if (known.has(id)) return []
    known.add(id)
    const chapter = resolvePublished(edge.to as ChapterRef, catalog, mayAccess)
    if (!chapter) return []
    return [{
      book: chapter.book,
      chapter: chapter.chapter,
      title: chapter.title,
      href: chapter.href,
      audioParts: chapter.audioParts,
      relation: edge.kind as TemporalLinkKind,
      theme: edge.theme,
    }]
  })
}
