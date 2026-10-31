/**
 * Máquina de fases para los caminos de San Yallego.
 * Cada ruta visitable debe mostrar DESCENSO y APROXIMACIÓN
 * antes de permitir la llegada al Oráculo.
 *
 * @typedef {'inicio' | 'descenso' | 'hacia-oraculo' | 'destino'} JourneyPhase
 */

/** @param {string} siteId @returns {JourneyPhase} */
export function initialJourneyPhase(siteId) {
  return siteId === 'casa-de-juanito' ? 'inicio' : 'descenso'
}

/** @param {JourneyPhase} phase @returns {JourneyPhase} */
export function advanceJourneyPhase(phase) {
  switch (phase) {
    case 'inicio':
      return 'descenso'
    case 'descenso':
      return 'hacia-oraculo'
    case 'hacia-oraculo':
      return 'destino'
    case 'destino':
      return 'destino'
  }
}
