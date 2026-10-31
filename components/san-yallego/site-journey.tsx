'use client'

import Link from 'next/link'
import { useCallback, useState, type ReactNode } from 'react'
import { useProgress } from '@/hooks/use-san-yallego'
import { ASSETS } from '@/lib/san-yallego/assets'
import { isSiteUnlocked } from '@/lib/san-yallego/progress'
import { advanceJourneyPhase, initialJourneyPhase } from '@/lib/san-yallego/journey-phases.mjs'
import { getSite, siteLabel, type SiteId } from '@/lib/san-yallego/sites'
import { CinematicVideo } from './cinematic-video'
import { JuanitoFlightVideo } from './juanito-flight-video'
import { ritualButton } from './ritual'
import { SealedSite } from './sealed-site'

/** Reproduce los dos tramos antes de entregar el control a la experiencia del sitio.
 * No abre lugares sellados ni modifica el progreso del visitante.
 */
export function SiteJourney({ siteId, children }: { siteId: SiteId; children: ReactNode }) {
  const { progress, hydrated } = useProgress()
  const [phase, setPhase] = useState(() => initialJourneyPhase(siteId))
  const advance = useCallback(() => setPhase((current) => advanceJourneyPhase(current)), [])
  const site = getSite(siteId)

  if (!site) return null
  if (!hydrated) return <main className="min-h-dvh bg-black" />
  if (!isSiteUnlocked(site, progress)) return <SealedSite title={siteLabel(site)} />

  if (phase === 'destino') return <>{children}</>

  // Juanito: el visitante inicia voluntariamente el primer vuelo.
  if (phase === 'inicio') return (
    <main className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-black">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={ASSETS.images.mapa} alt="Mapa de San Yallego" className="absolute inset-0 size-full object-cover opacity-75" />
      <div className="absolute inset-0 bg-black/35" />
      <div className="relative z-10 flex flex-col items-center gap-6 px-6 text-center">
        <h1 className="font-display text-2xl tracking-[0.12em] text-foreground text-glow md:text-4xl">
          La casa de Juanito Colorao
        </h1>
        <button type="button" onClick={advance} className={ritualButton('primary')}>
          Iniciar descenso a la casa
        </button>
        <Link href="/mapa" className={ritualButton('quiet')}>Volver al mapa</Link>
      </div>
    </main>
  )

  // En la Casa los DOS vuelos usan el mismo reproductor fiable y las fases
  // aparecen claramente identificadas. Nunca se salta al Oráculo tras el primer MP4.
  if (siteId === 'casa-de-juanito' && (phase === 'descenso' || phase === 'hacia-oraculo')) {
    const approaching = phase === 'hacia-oraculo'
    return (
      <main className="relative min-h-dvh bg-black">
        <JuanitoFlightVideo
          key={phase}
          src={approaching
            ? ASSETS.video.oraculos['casa-de-juanito']
            : ASSETS.video.descensos['casa-de-juanito']}
          label={approaching
            ? 'Vuelo 2 de 2: camino hacia el Oráculo de Juanito'
            : 'Vuelo 1 de 2: descenso a la Casa de Juanito'}
          nextLabel={approaching ? 'Saltar al Oráculo' : 'Saltar al vuelo 2 de 2'}
          onEnded={advance}
        />
        <div className="pointer-events-none fixed inset-x-0 top-16 z-40 flex justify-center px-4 md:top-6">
          <div className="rounded-lg border border-gold/40 bg-black/80 px-4 py-3 text-center shadow-xl backdrop-blur-md">
            <p className="font-display text-[10px] tracking-[0.18em] text-gold/85">
              CASA DE JUANITO · VUELO {approaching ? '2 DE 2' : '1 DE 2'}
            </p>
            <p className="mt-1 text-sm italic text-foreground/90">
              {approaching ? 'Camino hacia el Oráculo' : 'Descenso hacia la casa'}
            </p>
          </div>
        </div>
        <nav className="fixed left-4 top-4 z-40 md:left-6 md:top-6">
          <Link href="/mapa" className={ritualButton('quiet', 'px-0')}>Volver al mapa</Link>
        </nav>
      </main>
    )
  }

  const isDescent = phase === 'descenso'
  const src = isDescent ? ASSETS.video.descensos[siteId] : ASSETS.video.oraculos[siteId]

  return (
    <main className="relative min-h-dvh bg-black">
      <h1 className="sr-only">{siteLabel(site)}</h1>
      <CinematicVideo
        key={phase}
        src={src}
        label={isDescent ? `Descenso a ${siteLabel(site)}` : `Camino al Oráculo de ${siteLabel(site)}`}
        onEnded={advance}
      />
      <nav className="fixed left-4 top-4 z-40 md:left-6 md:top-6">
        <Link href="/mapa" className={ritualButton('quiet', 'px-0')}>
          Volver al mapa
        </Link>
      </nav>
    </main>
  )
}
