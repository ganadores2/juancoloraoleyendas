/** Políticas de publicación de la Biblioteca Gráfica. Sin rutas a la Biblioteca privada. */
const PUBLIC_PORTRAIT_RE = /^\/assets\/images\/personajes\/(?:[a-z0-9]+(?:-[a-z0-9]+)*\/)*[a-z0-9]+(?:-[a-z0-9]+)*\.(?:png|jpe?g|webp|avif)$/

/** Solo archivos de retratos ya aprobados y alojados en nuestro directorio público. */
export function isSafePublicPortraitPath(value) {
  return typeof value === 'string' && PUBLIC_PORTRAIT_RE.test(value)
}

/** Fallar explícitamente si alguien agrega un enlace privado o externo al inventario. */
export function assertGalleryImageSources(characters) {
  for (const character of characters) {
    for (const stage of character.stages) {
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
