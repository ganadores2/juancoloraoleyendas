/**
 * Taller de Oráculos · resumen de preproducción, sin secretos ni permisos.
 * Usa los catálogos existentes y no los modifica.
 * Los vínculos temáticos NO representan necesariamente escenas en el lugar.
 */
export function buildOracleWorkbench({ matrix, timeline, sites, chapters }) {
  if (!Array.isArray(matrix?.sites) || !Array.isArray(timeline?.oracleCollections) ||
      !Array.isArray(sites) || !Array.isArray(chapters)) {
    throw new Error('Faltan catálogos editoriales del Taller de Oráculos')
  }
  if (matrix.sites.length !== 10 || timeline.oracleCollections.length !== 10 || sites.length !== 10) {
    throw new Error('El Taller requiere exactamente diez lugares y diez Oráculos')
  }

  const usedChapters = new Set()
  const seenSites = new Set()

  const oracles = [...sites].sort((a, b) => a.order - b.order).map((site) => {
    if (seenSites.has(site.id)) throw new Error('Sitio duplicado: ' + site.id)
    seenSites.add(site.id)
    const editorial = matrix.sites.find((entry) => entry.siteId === site.id)
    const temporal = timeline.oracleCollections.find((entry) => entry.siteId === site.id)
    if (!editorial || !temporal || editorial.order !== site.order) {
      throw new Error('Mapa y Oráculos sin correspondencia: ' + site.id)
    }
    const assigned = editorial.chapterRecommendations.map((ref) => {
      if (!Number.isInteger(ref.chapter) || ref.chapter < 1 || ref.chapter > 33 ||
          usedChapters.has(ref.chapter)) {
        throw new Error('Capítulo del Libro I duplicado o inválido: ' + ref.chapter)
      }
      usedChapters.add(ref.chapter)
      const chapter = chapters.find((candidate) => candidate.book === 1 && candidate.number === ref.chapter)
      if (!chapter) throw new Error('Capítulo del Libro I sin catálogo real: ' + ref.chapter)
      if (chapter.title !== ref.title) {
        throw new Error('Título del capítulo incompatible con el catálogo: ' + ref.chapter)
      }
      const parts = Array.isArray(chapter.audioParts) ? chapter.audioParts : []
      return {
        number: chapter.number,
        title: chapter.title,
        href: '/libro/1/capitulo/' + chapter.number,
        audioParts: parts.length,
        hasCatalogAudio: typeof chapter.audio === 'string' && chapter.audio.length > 0 &&
          parts.length > 0 && parts.every((part) => typeof part === 'string' && part.startsWith('/assets/audio/libro-1/')),
      }
    })

    const temporalNumbers = temporal.bookChapters?.['1']?.map((ref) => ref.chapter) ?? []
    if (assigned.map((item) => item.number).join(',') !== temporalNumbers.join(',')) {
      throw new Error('Matriz y línea temporal en desacuerdo: ' + site.id)
    }
    if (assigned.length < 3 || assigned.length > 4) {
      throw new Error('Cada Oráculo requiere tres o cuatro capítulos del Libro I: ' + site.id)
    }

    const futureIndexed = ['2', '3', '4'].reduce((count, book) =>
      count + (temporal.bookChapters?.[book]?.length ?? 0), 0)

    return {
      id: site.id,
      order: site.order,
      name: site.name ?? editorial.siteName,
      domain: editorial.domainProposal,
      relationCaution: editorial.continuityCaution,
      access: site.unlock.kind,
      chapters: assigned,
      futureIndexed,
    }
  })

  if (usedChapters.size !== 33 || !Array.from({ length: 33 }, (_, i) => i + 1).every((n) => usedChapters.has(n))) {
    throw new Error('Los 33 capítulos no están distribuidos exactamente una vez')
  }

  return {
    oracles,
    summary: {
      sites: oracles.length,
      chapters: usedChapters.size,
      withCatalogAudio: oracles.flatMap((oracle) => oracle.chapters).filter((chapter) => chapter.hasCatalogAudio).length,
      totalAudioParts: oracles.flatMap((oracle) => oracle.chapters).reduce((n, chapter) => n + chapter.audioParts, 0),
      sealedSites: oracles.filter((oracle) => oracle.access === 'sealed').length,
      futureIndexed: oracles.reduce((n, oracle) => n + oracle.futureIndexed, 0),
    },
  }
}
