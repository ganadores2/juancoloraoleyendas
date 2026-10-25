import type { ChapterId } from './chapters'
import type { ItemId } from './items'
import { createLocalStore, type Store } from './local-store'
import type { OracleId } from './oracles'
import type { MythicSite, SiteId } from './sites'

/**
 * Forma serializable del progreso del visitante.
 * Es la misma forma que se guardará en Supabase (una fila por visitante),
 * así que migrar solo implica cambiar el `Store` de abajo.
 */
export interface Progress {
  version: 1
  portalCrossed: boolean
  items: ItemId[]
  /** Fecha en que se activó el Pase Temporal de San Yallego. No expira. */
  passIssuedAt: string | null
  unlockedSites: SiteId[]
  visitedSites: SiteId[]
  completedChapters: ChapterId[]
  oracleAnswers: Partial<Record<OracleId, string[]>>
}

export const INITIAL_PROGRESS: Progress = {
  version: 1,
  portalCrossed: false,
  items: [],
  passIssuedAt: null,
  unlockedSites: ['entrada'],
  visitedSites: [],
  completedChapters: [],
  oracleAnswers: {},
}

const addUnique = <T>(list: T[], value: T) => (list.includes(value) ? list : [...list, value])

/** Transiciones puras: reutilizables en cliente hoy y en servidor/Supabase mañana. */
export const transitions = {
  crossPortal: (p: Progress): Progress => ({ ...p, portalCrossed: true }),

  findKey: (p: Progress): Progress => ({
    ...p,
    items: addUnique(p.items, 'llave-san-yallego'),
    passIssuedAt: p.passIssuedAt ?? new Date().toISOString(),
    unlockedSites: addUnique(p.unlockedSites, 'casa-de-juanito'),
  }),

  visitSite: (siteId: SiteId) => (p: Progress): Progress => ({
    ...p,
    visitedSites: addUnique(p.visitedSites, siteId),
  }),

  completeChapter: (chapterId: ChapterId) => (p: Progress): Progress => ({
    ...p,
    completedChapters: addUnique(p.completedChapters, chapterId),
  }),

  answerOracle: (oracleId: OracleId, index: number, answer: string) => (p: Progress): Progress => {
    const answers = [...(p.oracleAnswers[oracleId] ?? [])]
    answers[index] = answer
    return { ...p, oracleAnswers: { ...p.oracleAnswers, [oracleId]: answers } }
  },
}

export function hasItem(p: Progress, item: ItemId) {
  return p.items.includes(item)
}

export function isSiteUnlocked(site: MythicSite, p: Progress): boolean {
  switch (site.unlock.kind) {
    case 'open':
      return true
    case 'requires-item':
      return hasItem(p, site.unlock.item) || p.unlockedSites.includes(site.id)
    case 'sealed':
      return false
  }
}

/** Beta: localStorage. Sustituir por un Store respaldado por Supabase al integrar cuentas. */
export const progressStore: Store<Progress> = createLocalStore(
  'san-yallego:progreso:v1',
  INITIAL_PROGRESS,
)
