import 'server-only'

import characters from './character-chronology-v1.json'
import timeline from './oracle-timeline-v2.json'
import type { OracleBook, PublishedChapterAudio } from './oracle-audio-catalog'
import type { SiteId } from './sites'

/**
 * Consulta editorial de cronología basada en evidencias; no calcula edades
 * de forma automática ni convierte ilustraciones en hechos canónicos.
 *
 * El catálogo y la validación de permisos son responsabilidad del servidor.
 * No entregar datos N4/N5/C100 ni enlaces a audios no publicados.
 */
export type MomentKind = 'escena' | 'recuerdo' | 'sueno'
export type TimelineRoute = 'cronologia-real' | 'cronologia-de-descubrimiento'

export interface CharacterAgeMoment {
  characterId: string
  characterName: string
  stageId: string
  ageYears: number
  book: OracleBook
  chapter: number
  temporalContext: MomentKind
  sourceEvidence: string
  review: string
  oracleId: SiteId | null
  isPublishedAudio: boolean
  href: string | null
}

export interface CharacterChronologySummary {
  id: string
  name: string
  role: string
  recordedMoments: number
  /** Referencias visuales provisionales, NO edades aprobadas por la narración. */
  visualRanges: readonly string[]
  notes: readonly string[]
}

/** Fichas existentes incluso cuando un personaje aún no tiene edad verificable. */
export function listCharacterChronology(): CharacterChronologySummary[] {
  return characters.characters.map((character) => ({
    id: character.id,
    name: character.name,
    role: character.role,
    recordedMoments: character.ageEvents.length,
    visualRanges: character.visualRanges,
    notes: character.notes,
  }))
}

/** La correspondencia con sitio es editorial: NO implica que la escena ocurra allí. */
export function findEditorialOracle(book: OracleBook, chapter: number): SiteId | null {
  const oracle = timeline.oracleCollections.find((entry) =>
    entry.bookChapters[String(book) as '1' | '2' | '3' | '4']
      .some((item) => item.chapter === chapter))
  return (oracle?.siteId ?? null) as SiteId | null
}

type AudioAccess = (audio: PublishedChapterAudio) => boolean
function publishedAudio(
  book: OracleBook,
  chapter: number,
  catalog: readonly PublishedChapterAudio[],
  canAccess: AudioAccess,
): PublishedChapterAudio | undefined {
  return catalog.find((audio) =>
    audio.book === book &&
    audio.chapter === chapter &&
    audio.published &&
    audio.audioParts.length > 0 &&
    audio.audioParts.every((part) => part.trim().length > 0) &&
    audio.href === `/libro/${book}/capitulo/${chapter}` &&
    canAccess(audio),
  )
}

/**
 * Los momentos de edad existen como metadatos incluso sin audio publicado.
 * La URL sólo aparece si el servidor acredita archivo, publicación y acceso.
 */
export function findCharacterMoments(
  characterId: string,
  catalog: readonly PublishedChapterAudio[],
  canAccess: AudioAccess,
  route: TimelineRoute = 'cronologia-real',
): CharacterAgeMoment[] {
  const character = characters.characters.find((item) => item.id === characterId)
  if (!character) return []

  const moments = character.ageEvents.map((event) => {
    const book = event.book as OracleBook
    const audio = publishedAudio(book, event.chapter, catalog, canAccess)
    return {
      characterId: character.id,
      characterName: character.name,
      stageId: event.stageId,
      ageYears: event.ageYears,
      book,
      chapter: event.chapter,
      temporalContext: event.temporalContext as MomentKind,
      sourceEvidence: event.evidence,
      review: event.review,
      oracleId: findEditorialOracle(book, event.chapter),
      isPublishedAudio: Boolean(audio),
      href: audio?.href ?? null,
    }
  })

  // Los sueños son parte del orden de descubrimiento, NO de la cronología real.
  const eligible = route === 'cronologia-real'
    ? moments.filter((moment) => moment.temporalContext !== 'sueno')
    : moments
  return eligible.sort((a, b) =>
    route === 'cronologia-real'
      ? a.ageYears - b.ageYears || a.chapter - b.chapter
      : a.book - b.book || a.chapter - b.chapter)
}

/**
 * Solo destinos audiovisuales con enlaces REALES: no infiere Libros II–IV.
 * La interfaz puede ofrecer una pista en vez de un enlace no habilitado.
 */
export function findPublishedCharacterMoments(
  characterId: string,
  catalog: readonly PublishedChapterAudio[],
  canAccess: AudioAccess,
): CharacterAgeMoment[] {
  return findCharacterMoments(characterId, catalog, canAccess).filter((moment) =>
    moment.isPublishedAudio && moment.href !== null)
}
