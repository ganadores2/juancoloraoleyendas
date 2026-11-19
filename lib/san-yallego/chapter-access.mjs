/**
 * Puerta narrativa del Libro I (experiencia de visitante, no autenticación).
 * Los MP3 y el texto público NO quedan protegidos por esta condición de navegador.
 */

/** @param {readonly string[]} completedChapters */
export function hasCompletedFirstChapter(completedChapters) {
  return completedChapters.includes('libro-1-capitulo-1')
}

/**
 * @param {number} chapterNumber
 * @param {readonly string[]} completedChapters
 */
export function canOpenBookOneChapter(chapterNumber, completedChapters) {
  return Number.isInteger(chapterNumber) &&
    chapterNumber >= 1 &&
    chapterNumber <= 33 &&
    (chapterNumber === 1 || hasCompletedFirstChapter(completedChapters))
}
