import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { ASSETS } from '@/lib/san-yallego/assets'
import { hasGuardianSession } from '@/lib/san-yallego/guardian'
import { getSite, siteLabel } from '@/lib/san-yallego/sites'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = {
  title: 'Vista privada de los Caminos — San Yallego',
  robots: { index: false, follow: false },
}

type Props = { params: Promise<{ slug: string }> }

/**
 * Laboratorio privado para visualizar los dos MP4 de cualquier lugar.
 * No reutiliza la ruta publica ni elimina la condición "sellado".
 * Un oráculo completo SOLO se muestra cuando su experiencia ya está construida.
 */
export default async function GuardianSitePage({ params }: Props) {
  if (!(await hasGuardianSession())) redirect('/guardian')
  const { slug } = await params
  const site = getSite(slug)
  if (!site) notFound()

  const clips = [
    { label: '01 · Descenso desde el mapa', src: ASSETS.video.descensos[site.id] },
    { label: '02 · Camino hacia su Oráculo', src: ASSETS.video.oraculos[site.id] },
  ]

  return (
    <main className="min-h-dvh bg-black px-5 py-10 text-foreground">
      <div className="mx-auto max-w-5xl space-y-8">
        <nav className="flex flex-wrap justify-between gap-4 text-sm">
          <Link href="/guardian" className="text-gold underline underline-offset-4">Volver a los diez caminos</Link>
          <Link href="/mapa" className="text-foreground/60 underline underline-offset-4">Mapa público</Link>
        </nav>
        <header className="space-y-3 text-center">
          <p className="text-xs tracking-[0.3em] text-gold/70">VISTA PRIVADA DEL CREADOR</p>
          <h1 className="font-display text-2xl text-gold md:text-4xl">{siteLabel(site)}</h1>
          <p className="mx-auto max-w-2xl text-base italic text-foreground/75">
            {site.experience === 'sellado'
              ? 'Este sitio aún no está abierto al visitante. Puedes revisar sus vuelos sin alterar el canon ni el recorrido público.'
              : 'Revisión de los dos vuelos que preceden a la experiencia pública.'}
          </p>
        </header>
        <div className="grid gap-8 md:grid-cols-2">
          {clips.map((clip) => (
            <section key={clip.src} className="space-y-3 border border-gold/25 p-3">
              <h2 className="font-display text-sm text-gold">{clip.label}</h2>
              <video
                controls
                playsInline
                preload="metadata"
                className="aspect-video w-full bg-black object-contain"
                aria-label={clip.label}
                src={clip.src}
              />
              <p className="text-xs text-foreground/55">Reproducción manual; no modifica progreso, llave ni escenas publicadas.</p>
            </section>
          ))}
        </div>
        {site.experience === 'sellado' && (
          <p className="border border-gold/20 p-5 text-center text-sm text-foreground/70">
            Los interiores interactivos de este lugar siguen pendientes de construcción.
            La Llave Maestra permite revisar los materiales existentes; no inventa experiencias todavía no producidas.
          </p>
        )}
        <form action="/guardian/logout" method="post" className="text-center">
          <button type="submit" className="border border-gold/40 px-5 py-2 text-sm text-foreground/70">Cerrar acceso privado</button>
        </form>
      </div>
    </main>
  )
}
