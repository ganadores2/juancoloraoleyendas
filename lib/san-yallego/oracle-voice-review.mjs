/**
 * Validador editorial del laboratorio de voces. NO es un modelo de IA,
 * ni un sistema de autorización, ni publica audios o diálogos nuevos.
 */
const ID_PATTERN = /^(?:entrada|casa-de-juanito|sitio-0[3-9]|sitio-10)$/
const REQUIRED_FIELDS = ['workingName', 'timbre', 'rhythm', 'lexicon', 'guide', 'avoid']

/** Un solo motor conceptual, diez perfiles distintos y sin medios adjuntos. */
export function assertOracleVoiceProposals(proposals, matrix) {
  if (proposals?.schemaVersion !== 1 ||
      proposals?.status !== 'preproduccion-voces-por-aprobar' ||
      proposals?.modelActive !== false || proposals?.audioGenerated !== false ||
      !Array.isArray(proposals.profiles) || proposals.profiles.length !== 10 ||
      !Array.isArray(matrix?.sites) || matrix.sites.length !== 10) {
    throw new Error('Catálogo de preproducción vocal inválido o incompleto')
  }

  const expected = new Set(matrix.sites.map((site) => site.siteId))
  if (expected.size !== 10) throw new Error('Matriz editorial con sitios repetidos')
  const seen = new Set()
  for (const profile of proposals.profiles) {
    if (!ID_PATTERN.test(profile.siteId) || !expected.has(profile.siteId) ||
        seen.has(profile.siteId)) {
      throw new Error('Perfil vocal duplicado o ajeno a los diez Oráculos')
    }
    seen.add(profile.siteId)
    if (profile.editorialStatus !== 'propuesta-por-aprobar' || profile.voiceAsset !== null) {
      throw new Error('No se permite marcar voces aprobadas ni incorporar audios al prototipo')
    }
    for (const field of REQUIRED_FIELDS) {
      if (typeof profile[field] !== 'string' || profile[field].trim().length < 10 ||
          profile[field].length > 600) {
        throw new Error('Campo de dirección vocal incompleto: ' + profile.siteId + '/' + field)
      }
    }
  }
  return { oracles: seen.size, status: 'propuestas-no-aprobadas' }
}

/** Vista solo editorial; las respuestas de ejemplo proceden literalmente de la matriz aprobada. */
export function buildOracleVoicePreview(proposals, matrix) {
  assertOracleVoiceProposals(proposals, matrix)
  return matrix.sites.map((site) => {
    const profile = proposals.profiles.find((candidate) => candidate.siteId === site.siteId)
    return {
      siteId: site.siteId,
      order: site.order,
      name: site.siteName,
      domain: site.domainProposal,
      questionFromApprovedMatrix: site.sampleQuestion,
      responseFromApprovedMatrix: site.safeResponseExample,
      continuityCaution: site.continuityCaution,
      suggestedChapterNumbers: site.chapterRecommendations.map((item) => item.chapter),
      voice: { ...profile },
      canPublish: false,
      aiActive: false,
    }
  })
}
