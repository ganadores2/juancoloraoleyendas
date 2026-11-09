import type { MetadataRoute } from 'next'

const ORIGIN = 'https://www.juancoloraoleyendas.com'

/** Los recorridos en preview y la Sala del Creador no son páginas para buscadores.
 * La política robots es indicativa: las puertas reales siguen protegidas por servidor.
 */
export default function robots(): MetadataRoute.Robots {
  if (process.env.VERCEL_ENV !== 'production') {
    return { rules: { userAgent: '*', disallow: '/' } }
  }

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/guardian',
        '/guardian/',
        '/sitio/',
        '/libro/1/capitulo/',
        '/bienvenida',
        '/portal',
      ],
    },
    sitemap: `${ORIGIN}/sitemap.xml`,
    host: ORIGIN,
  }
}
