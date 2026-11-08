import type { MetadataRoute } from 'next'

const ORIGIN = 'https://www.juancoloraoleyendas.com'

/** Únicamente rutas públicas y con destino estable.
 * No incluir portales, capítulos protegidos, sitios sellados ni el Taller del Creador.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: ORIGIN + '/', changeFrequency: 'monthly', priority: 1 },
    { url: ORIGIN + '/mapa', changeFrequency: 'monthly', priority: 0.9 },
    { url: ORIGIN + '/libro/1', changeFrequency: 'monthly', priority: 0.8 },
    { url: ORIGIN + '/glosario', changeFrequency: 'monthly', priority: 0.7 },
  ]
}
