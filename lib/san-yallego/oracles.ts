import { ASSETS } from './assets'
import type { SiteId } from './sites'

export type OracleId = 'oraculo-entrada' | 'oraculo-casa-de-juanito'

export interface Oracle {
  id: OracleId
  siteId: SiteId
  image: string
  imageAlt: string
  questions: string[]
  closingLine?: string
  /** Posición de la argolla oculta sobre la imagen del Oráculo, en porcentaje. */
  hiddenRing?: { x: number; y: number; sizePx: number }
}

export const ORACLES: Record<OracleId, Oracle> = {
  'oraculo-entrada': {
    id: 'oraculo-entrada',
    siteId: 'entrada',
    image: ASSETS.images.oraculoEntrada,
    imageAlt: 'El Oráculo de la Entrada a San Yallego',
    questions: [
      '¿Quién te trajo hasta aquí?',
      '¿Escuchaste algo al cruzar?',
      '¿Vienes a escuchar, o a descubrir?',
    ],
    closingLine: 'Entonces mira bien. La piedra también escucha.',
    hiddenRing: { x: 71, y: 78, sizePx: 30 },
  },
  'oraculo-casa-de-juanito': {
    id: 'oraculo-casa-de-juanito',
    siteId: 'casa-de-juanito',
    image: ASSETS.images.oraculoCasaJuanito,
    imageAlt: 'El Oráculo de la Casa donde nació Juanito Colorao',
    questions: [],
  },
}
