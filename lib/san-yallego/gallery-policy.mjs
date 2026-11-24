/** Políticas de publicación de la Biblioteca Gráfica. Sin rutas a la Biblioteca privada. */
const PUBLIC_PORTRAIT_RE = /^\/assets\/images\/personajes\/(?:[a-z0-9]+(?:-[a-z0-9]+)*\/)*[a-z0-9]+(?:-[a-z0-9]+)*\.(?:png|jpe?g|webp|avif)$/

/** Solo archivos de retratos ya aprobados y alojados en nuestro directorio público. */
export function isSafePublicPortraitPath(value) {
  return typeof value === 'string' && PUBLIC_PORTRAIT_RE.test(value)
}

/** Fallar explícitamente si alguien agrega un enlace privado o externo al inventario. */
export function assertGalleryImageSources(characters) {
  const charactersSeen = new Set()
  for (const character of characters) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(character.id) || charactersSeen.has(character.id)) {
      throw new Error('Identificador de personaje inválido o repetido: ' + character.id)
    }
    charactersSeen.add(character.id)
    if (character.sourceDoc && !/^docs\/personajes\/[a-z0-9]+(?:-[a-z0-9]+)*\.md$/.test(character.sourceDoc)) {
      throw new Error('Fuente editorial fuera de carpeta permitida: ' + character.id)
    }
    const stagesSeen = new Set()
    for (const stage of character.stages) {
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(stage.id) || stagesSeen.has(stage.id)) {
        throw new Error('Etapa repetida o inválida: ' + stage.id)
      }
      stagesSeen.add(stage.id)
      if (stage.views) {
        if (stage.views.length !== 7 || new Set(stage.views.map((view) => view.id)).size !== 7) {
          throw new Error('Plantilla incompleta o con vistas duplicadas: ' + stage.id)
        }
      }
      const containsImages = stage.imageSrc !== null || (stage.views ?? []).some((view) => view.imageSrc !== null)
      if (containsImages && stage.publicationApproved !== true) {
        throw new Error('Publicación de imagen no aprobada en Biblioteca Gráfica: ' + stage.id)
      }
      if (stage.imageSrc !== null && !isSafePublicPortraitPath(stage.imageSrc)) {
        throw new Error('Ruta de retrato no autorizada en Biblioteca Gráfica: ' + stage.id)
      }
      for (const view of stage.views ?? []) {
        if (view.imageSrc !== null && !isSafePublicPortraitPath(view.imageSrc)) {
          throw new Error('Ruta de vista no autorizada en Biblioteca Gráfica: ' + stage.id + '/' + view.id)
        }
      }
    }
  }
  return true
}

/** Diferenciar aprobación de identidad de publicación de imágenes. */
export function galleryCounts(characters) {
  const counts = { characters: characters.length, approvedIdentity: 0, privateReferences: 0, pending: 0, publishedImages: 0 }
  for (const character of characters) {
    for (const stage of character.stages) {
      if (stage.status === 'identidad-aprobada') counts.approvedIdentity++
      else if (stage.status === 'referencia-privada') counts.privateReferences++
      else if (stage.status === 'por-definir') counts.pending++
      if (stage.imageSrc !== null) counts.publishedImages++
      counts.publishedImages += (stage.views ?? []).filter((view) => view.imageSrc !== null).length
    }
  }
  return counts
}
