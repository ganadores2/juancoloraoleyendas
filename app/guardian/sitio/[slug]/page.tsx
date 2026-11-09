
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { GuardianCinematicJourney } from '@/components/san-yallego/guardian-cinematic-journey'
import { hasGuardianSession } from '@/lib/san-yallego/guardian'
import { getSite, siteLabel } from '@/lib/san-yallego/sites'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Recorrido Cinematográfico Privado — San Yallego',
  robots: { index: false, follow: false },
}

type Props = {
  params: Promise<{ slug: string }>
}

/**
 * Recorrido cinematográfico exclusivo del creador.
 *
 * La autorización se verifica en el servidor.
 * No modifica el progreso ni las llaves de visitantes.
 * Los ocho sitios sellados permanecen cerrados al público.
 */
export default async function GuardianSitePage({
  params,
}: Props) {
  // La sesión privada es obligatoria.
  if (!(await hasGuardianSession())) {
    redirect('/guardian')
  }

  // Identificar el lugar solicitado.
  const { slug } = await params
  const site = getSite(slug)

  if (!site) {
    notFound()
  }

  const siteName = siteLabel(site)

  return (
    <main className="min-h-dvh bg-black text-foreground">
      <GuardianCinematicJourney
        key={site.id}
        siteId={site.id}
        siteName={siteName}
      />

      {site.id === 'casa-de-juanito' && (
        <div className="fixed bottom-16 left-4 z-50">
          <Link
            href="/sitio/casa-de-juanito"
            className="inline-flex min-h-11 items-center border border-gold/60 bg-black/85 px-4 py-3 text-xs text-gold"
          >
            PROBAR RECORRIDO PÚBLICO DE JUANITO
          </Link>
        </div>
      )}

      <noscript>
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black p-8 text-center">
          <div className="space-y-4">
            <h1 className="font-display text-2xl text-gold">
              San Yallego
            </h1>
            <p>
              Activa JavaScript para reproducir
              el recorrido cinematográfico.
            </p>
            <Link
              href="/guardian"
              className="inline-block text-gold underline"
            >
              Volver al Taller del Creador
            </Link>
          </div>
        </div>
      </noscript>
    </main>
  )
}
