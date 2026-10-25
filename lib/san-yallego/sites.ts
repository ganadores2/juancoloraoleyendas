import type { ItemId } from './items'

export type SiteId =
  | 'entrada'
  | 'casa-de-juanito'
  | 'sitio-03'
  | 'sitio-04'
  | 'sitio-05'
  | 'sitio-06'
  | 'sitio-07'
  | 'sitio-08'
  | 'sitio-09'
  | 'sitio-10'

export type UnlockRule =
  | { kind: 'open' }
  | { kind: 'requires-item'; item: ItemId }
  | { kind: 'sealed' }

export type SiteExperience = 'oraculo-entrada' | 'casa-de-juanito' | 'sellado'

export interface MythicSite {
  id: SiteId
  order: number
  /** null = San Yallego aún no revela el nombre. Escríbelo cuando lo abras. */
  name: string | null
  /** Posición del marcador sobre la imagen del mapa, en porcentaje. */
  map: { x: number; y: number }
  unlock: UnlockRule
  experience: SiteExperience
}

export const LOCKED_PATH_MESSAGE = 'San Yallego todavía no te ha mostrado este camino.'

export const SITES: MythicSite[] = [
  {
    id: 'entrada',
    order: 1,
    name: 'Entrada a San Yallego',
    map: { x: 50, y: 86 },
    unlock: { kind: 'open' },
    experience: 'oraculo-entrada',
  },
  {
    id: 'casa-de-juanito',
    order: 2,
    name: 'Casa donde nació Juanito Colorao',
    map: { x: 34, y: 64 },
    unlock: { kind: 'requires-item', item: 'llave-san-yallego' },
    experience: 'casa-de-juanito',
  },
  { id: 'sitio-03', order: 3, name: null, map: { x: 62, y: 60 }, unlock: { kind: 'sealed' }, experience: 'sellado' },
  { id: 'sitio-04', order: 4, name: null, map: { x: 18, y: 44 }, unlock: { kind: 'sealed' }, experience: 'sellado' },
  { id: 'sitio-05', order: 5, name: null, map: { x: 78, y: 42 }, unlock: { kind: 'sealed' }, experience: 'sellado' },
  { id: 'sitio-06', order: 6, name: null, map: { x: 46, y: 40 }, unlock: { kind: 'sealed' }, experience: 'sellado' },
  { id: 'sitio-07', order: 7, name: null, map: { x: 28, y: 24 }, unlock: { kind: 'sealed' }, experience: 'sellado' },
  { id: 'sitio-08', order: 8, name: null, map: { x: 66, y: 22 }, unlock: { kind: 'sealed' }, experience: 'sellado' },
  { id: 'sitio-09', order: 9, name: null, map: { x: 86, y: 70 }, unlock: { kind: 'sealed' }, experience: 'sellado' },
  { id: 'sitio-10', order: 10, name: null, map: { x: 50, y: 12 }, unlock: { kind: 'sealed' }, experience: 'sellado' },
]

export function getSite(id: string): MythicSite | undefined {
  return SITES.find((site) => site.id === id)
}

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X']

export function siteLabel(site: MythicSite): string {
  return site.name ?? `Lugar ${ROMAN[site.order - 1]}`
}
