import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Film, MapPinned } from 'lucide-react'
import { redirect } from 'next/navigation'
import { ASSETS } from '@/lib/san-yallego/assets'
import { hasGuardianSession } from '@/lib/san-yallego/guardian'
import { SITES, siteLabel } from '@/lib/san-yallego/sites'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Mapa Cinematográfico Privado — San Yallego',
  robots: { index: false, follow: false },
}

/**
 * Mapa privado para el creador, verificado en el servidor.
 * Mantener los marcadores enlazados a los ID estables hasta
 * asignar los nombres definitivos de los ocho sitios reservados.
 */
export default async function GuardianMapaPage() {
  if (!(await hasGuardianSession())) {
    redirect('/guardian')
  }

  return (
    <main className="min-h-dvh bg-black px-3 py-6 text-foreground sm:px-6 sm:py-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="mx-auto max-w-3xl space-y-3 text-center">
          <p className="font-display text-xs tracking-[0.3em] text-gold/75">
            JUAN COLORAO · LEYENDAS
          </p>

          <h1 id="titulo-mapa" className="font-display text-2xl text-gold sm:text-3xl lg:text-4xl">
            Mapa Cinematográfico de San Yallego
          </h1>

          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-foreground/75 md:text-base">
            Diez caminos míticos, dos vuelos por lugar.
            Elige tu destino y deja que el recorrido te lleve hacia su oráculo.
          </p>

          <div
            className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-[11px] tracking-wide text-gold/80"
            aria-label="Resumen del recorrido privado"
          >
            <span className="inline-flex items-center gap-1.5">
              <MapPinned className="size-3.5" aria-hidden="true" />
              10 LUGARES
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Film className="size-3.5" aria-hidden="true" />
              20 VUELOS
            </span>
            <span>ACCESO PRIVADO DEL CREADOR</span>
          </div>
        </header>

        <section
          aria-labelledby="titulo-mapa"
          className="relative aspect-video w-full overflow-hidden rounded-xl border border-gold/40 bg-black shadow-2xl sm:rounded-2xl"
        >
          <Image
            src={ASSETS.images.mapa}
            alt="Mapa fantástico de San Yallego con los diez accesos del creador"
            fill
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-fill"
            priority
          />

          <div
            className="pointer-events-none absolute inset-0 bg-black/15"
            aria-hidden="true"
          />

          {SITES.map((site) => (
            <Link
              key={site.id}
              href={'/guardian/sitio/' + site.id}
              aria-label={'Iniciar los dos vuelos privados de ' + siteLabel(site)}
              title={siteLabel(site)}
              className="group absolute z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 rounded-lg p-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              style={{
                left: site.map.x + '%',
                top: site.map.y + '%',
              }}
            >
              <span className="flex size-9 items-center justify-center rounded-full border-2 border-gold/80 bg-black/90 text-xs font-bold text-gold shadow-[0_0_0_3px_rgba(0,0,0,0.45)] transition-transform duration-200 group-hover:scale-110 group-focus-visible:scale-110 sm:size-10 sm:text-sm">
                {site.order}
              </span>

              <span className="hidden max-w-36 rounded-lg border border-gold/30 bg-black/85 px-2 py-1 text-center font-display text-[10px] leading-snug text-gold shadow-lg backdrop-blur-sm md:block">
                {siteLabel(site)}
              </span>
            </Link>
          ))}
        </section>

        <p className="text-center text-xs text-foreground/70">
          Selecciona un número sobre el mapa o utiliza las tarjetas de abajo.
          Ambos accesos abren los mismos dos vuelos.
        </p>

        <section aria-labelledby="caminos-titulo" className="space-y-4">
          <h2 id="caminos-titulo" className="text-center font-display text-lg text-gold">
            Elige uno de los diez caminos
          </h2>

          <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {SITES.map((site) => (
              <li key={site.id}>
                <Link
                  href={'/guardian/sitio/' + site.id}
                  className="group flex h-full min-h-28 flex-col justify-between gap-3 rounded-xl border border-gold/30 bg-white/5 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-gold/75 hover:bg-gold/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                >
                  <span className="text-xs tracking-[0.18em] text-gold/75">
                    CAMINO {String(site.order).padStart(2, '0')}
                  </span>

                  <span className="font-display text-sm leading-snug text-foreground">
                    {siteLabel(site)}
                  </span>

                  <span className="flex items-center justify-between gap-2 text-[11px] text-foreground/70 transition-colors group-hover:text-gold">
                    {site.name ? 'Descenso y oráculo' : 'Nombre por asignar · 2 vuelos'}
                    <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </section>

        <nav
          aria-label="Navegación del creador"
          className="flex flex-wrap items-center justify-center gap-3 border-t border-gold/20 pt-6 sm:gap-5"
        >
          <Link
            href="/guardian"
            className="inline-flex min-h-11 items-center rounded-lg border border-gold/50 px-4 py-2 text-sm text-gold transition-colors hover:bg-gold/10 focus-visible:outline-2 focus-visible:outline-gold"
          >
            Volver a la Sala del Creador
          </Link>

          <Link
            href="/mapa"
            className="inline-flex min-h-11 items-center px-3 py-2 text-sm text-foreground/75 underline underline-offset-4 transition-colors hover:text-gold"
          >
            Ver mapa público
          </Link>

          <form action="/guardian/logout" method="post">
            <button
              type="submit"
              className="min-h-11 rounded-lg border border-gold/30 px-4 py-2 text-sm text-foreground/75 transition-colors hover:border-gold/70 hover:text-gold focus-visible:outline-2 focus-visible:outline-gold"
            >
              Cerrar acceso privado
            </button>
          </form>
        </nav>

        <p className="text-center text-xs italic text-foreground/55">
          Laboratorio cinematográfico del creador.
          Los ocho lugares reservados permanecen cerrados a los visitantes.
        </p>
      </div>
    </main>
  )
}
