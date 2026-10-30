import type { Metadata } from 'next'
import Link from 'next/link'
import { hasGuardianSession, isGuardianConfigured } from '@/lib/san-yallego/guardian'
import { SITES, siteLabel } from '@/lib/san-yallego/sites'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = {
  title: 'Sala del Creador — San Yallego',
  robots: { index: false, follow: false },
}

type Props = { searchParams: Promise<{ error?: string }> }

/** Entrada privada: nunca cambia el progreso ni las llaves de los visitantes. */
export default async function GuardianPage({ searchParams }: Props) {
  const authorized = await hasGuardianSession()
  const { error } = await searchParams

  if (!authorized) {
    const configured = isGuardianConfigured()
    return (
      <main className="flex min-h-dvh items-center justify-center bg-black px-6 py-12">
        <section className="w-full max-w-md space-y-6 border border-gold/30 bg-black/80 p-8 text-center">
          <p className="font-display text-[11px] tracking-[0.3em] text-gold/75">JUAN COLORAO · LEYENDAS</p>
          <h1 className="font-display text-2xl tracking-[0.11em] text-gold">Sala del Creador</h1>
          <p className="text-base italic text-foreground/75">
            Una puerta especial para revisar los caminos sin revelar sus secretos a los viajeros.
          </p>
          {!configured ? (
            <p role="status" className="border border-gold/30 p-4 text-sm text-foreground/80">
              La Llave Maestra todavía no ha sido activada en el servidor.
            </p>
          ) : (
            <form action="/guardian/login" method="post" className="space-y-5">
              <label htmlFor="clave-maestra" className="block text-left text-sm text-foreground/90">
                Llave Maestra
              </label>
              <input
                id="clave-maestra"
                name="clave"
                type="password"
                required
                minLength={24}
                maxLength={256}
                autoComplete="current-password"
                className="w-full border border-gold/35 bg-black px-4 py-3 text-foreground outline-offset-4 focus:outline-gold"
              />
              {error === '1' && <p role="alert" className="text-sm text-red-300">La llave no fue reconocida.</p>}
              <button type="submit" className="w-full border border-gold/60 px-6 py-3 font-display text-xs tracking-[0.2em] text-gold">
                Abrir la Sala del Creador
              </button>
            </form>
          )}
          <Link href="/" className="inline-block py-2 text-xs text-foreground/65 underline underline-offset-4">
            Volver a San Yallego
          </Link>
        </section>
      </main>
    )
  }

  return (
    <main className="min-h-dvh bg-black px-5 py-12 text-foreground">
      <div className="mx-auto max-w-5xl space-y-8">
        <header className="space-y-3 text-center">
          <p className="font-display text-xs tracking-[0.3em] text-gold/75">ACCESO PRIVADO</p>
          <h1 className="font-display text-3xl text-gold">Los diez caminos de San Yallego</h1>
          <p className="mx-auto max-w-2xl text-base italic text-foreground/75">
            Esta sala permite revisar los recorridos filmados sin modificar la aventura de los visitantes.
            Los lugares todavía sellados siguen siendo un trabajo en construcción.
          </p>
        </header>
        <ol className="grid gap-4 sm:grid-cols-2">
          {SITES.map((site) => (
            <li key={site.id}>
              <Link
                href={`/guardian/sitio/${site.id}`}
                className="block h-full space-y-2 border border-gold/25 bg-white/5 p-5 transition-colors hover:border-gold/70 focus-visible:outline-2 focus-visible:outline-gold"
              >
                <span className="text-xs tracking-[0.2em] text-gold/75">{String(site.order).padStart(2, '0')}</span>
                <h2 className="font-display text-lg text-foreground">{siteLabel(site)}</h2>
                <p className="text-sm text-foreground/60">
                  {site.experience === 'sellado' ? 'Vista del creador · lugar aún sellado' : 'Recorrido y experiencia disponible'}
                </p>
              </Link>
            </li>
          ))}
        </ol>
        <div className="flex flex-wrap items-center justify-center gap-6 border-t border-gold/20 pt-6">
          <Link href="/mapa" className="text-sm text-gold underline underline-offset-4">Ver mapa público</Link>
          <form action="/guardian/logout" method="post">
            <button type="submit" className="border border-gold/45 px-5 py-2 text-sm text-foreground/75 hover:text-gold">Cerrar Sala del Creador</button>
          </form>
        </div>
      </div>
    </main>
  )
}
