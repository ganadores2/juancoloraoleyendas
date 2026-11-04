
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
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
 * Mapa cinematográfico exclusivo del creador.
 *
 * La sesión se verifica en el servidor.
 * No modifica el progreso de los visitantes.
 * No desbloquea ninguno de los ocho sitios sellados.
 */
export default async function GuardianMapaPage() {
  if (!(await hasGuardianSession())) {
    redirect('/guardian')
  }

  return (
    <main className="min-h-dvh bg-black px-4 py-8 text-foreground md:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <header className="space-y-4 text-center">
          <p className="font-display text-xs tracking-[0.3em] text-gold/75">
            JUAN COLORAO · LEYENDAS
          </p>

          <h1 className="font-display text-2xl text-gold md:text-4xl">
            Mapa Cinematográfico de San Yallego
          </h1>

          <p className="mx-auto max-w-2xl text-sm italic text-foreground/75 md:text-base">
            Los diez caminos míticos esperan al creador.
            Selecciona un lugar para comenzar su descenso
            y aproximación cinematográfica.
          </p>

          <p className="text-xs tracking-[0.2em] text-gold/70">
            ACCESO PRIVADO · LLAVE MAESTRA
          </p>
        </header>

        <section
          aria-label="Mapa privado de los diez lugares míticos"
          className="relative aspect-video w-full overflow-hidden border border-gold/35 bg-black"
        >
          <Image
            src={ASSETS.images.mapa}
            alt="Mapa fantástico de San Yallego"
            fill
            sizes="(max-width: 1200px) 100vw, 1200px"
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
              href={`/guardian/sitio/${site.id}`}
              aria-label={`Recorrido privado de ${siteLabel(site)}`}
              title={siteLabel(site)}
              className="group absolute z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 p-1 focus-visible:outline-2 focus-visible:outline-gold"
              style={{
                left: `${site.map.x}%`,
                top: `${site.map.y}%`,
              }}
            >
              <span className="flex size-7 items-center justify-center rounded-full border border-gold bg-black/85 text-xs font-bold text-gold shadow-lg transition-transform group-hover:scale-125 md:size-9 md:text-sm">
                {site.order}
              </span>

              <span className="hidden max-w-36 rounded bg-black/85 px-2 py-1 text-center font-display text-[10px] text-gold shadow-lg md:block">
                {siteLabel(site)}
              </span>
            </Link>
          ))}
        </section>

        <section className="space-y-4">
          <h2 className="text-center font-display text-lg text-gold">
            Los diez caminos
          </h2>

          <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {SITES.map((site) => (
              <li key={site.id}>
                <Link
                  href={`/guardian/sitio/${site.id}`}
                  className="flex h-full flex-col justify-center gap-2 border border-gold/30 bg-white/5 p-4 transition-colors hover:border-gold/75 hover:bg-gold/10 focus-visible:outline-2 focus-visible:outline-gold"
                >
                  <span className="text-xs tracking-[0.2em] text-gold/70">
                    CAMINO {String(site.order).padStart(2, '0')}
                  </span>

                  <span className="font-display text-sm text-foreground">
                    {siteLabel(site)}
                  </span>

                  <span className="text-xs text-foreground/60">
                    Ver los dos vuelos
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </section>

        <nav className="flex flex-wrap items-center justify-center gap-6 border-t border-gold/20 pt-6">
          <Link
            href="/guardian"
            className="text-sm text-gold underline underline-offset-4"
          >
            Volver a la Sala del Creador
          </Link>

          <Link
            href="/mapa"
            className="text-sm text-foreground/70 underline underline-offset-4"
          >
            Ver mapa público
          </Link>

          <form action="/guardian/logout" method="post">
            <button
              type="submit"
              className="border border-gold/45 px-5 py-3 text-sm text-foreground/80 hover:text-gold"
            >
              Cerrar acceso privado
            </button>
          </form>
        </nav>

        <p className="text-center text-xs italic text-foreground/50">
          Laboratorio cinematográfico del creador.
          Los lugares sellados permanecen cerrados a los visitantes.
        </p>
      </div>
    </main>
  )
}
