'use client'

import Link from 'next/link'
import { useCallback, useEffect, useState, type ReactNode } from 'react'
import { useProgress } from '@/hooks/use-san-yallego'
import { ASSETS } from '@/lib/san-yallego/assets'
import { isSiteUnlocked } from '@/lib/san-yallego/progress'
import { advanceJourneyPhase, initialJourneyPhase } from '@/lib/san-yallego/journey-phases.mjs'
import { getSite, siteLabel, type SiteId } from '@/lib/san-yallego/sites'
import { CinematicVideo } from './cinematic-video'
import { JuanitoFlightVideo } from './juanito-flight-video'
import { ritualButton } from './ritual'
import { SealedSite } from './sealed-site'

/** El mirador se presenta brevemente sin cubrir el paisaje durante los 15 s.
 * Solo el vuelo panorámico de la Entrada oculta su cartel tras 3 s.
 */
function FlightHeading({ place, approaching, panorama }: { place: string; approaching: boolean; panorama: boolean }) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 3000)
    return () => window.clearTimeout(timer)
  }, [panorama])

  return (
    <div
      className={`pointer-events-none fixed inset-x-0 top-16 z-40 flex justify-center px-4 transition-opacity duration-1000 md:top-6 ${visible ? 'opacity-100' : 'opacity-0'}`}
      aria-hidden={!visible}
    >
      <div className="rounded-lg border border-gold/40 bg-black/80 px-4 py-3 text-center shadow-xl backdrop-blur-md">
        <p className="font-display text-[10px] tracking-[0.18em] text-gold/85">
          {place} · VUELO {approaching ? '2 DE 2' : '1 DE 2'}
        </p>
        <p className="mt-1 text-sm italic text-foreground/90">
          {panorama ? 'Contempla San Yallego. Cada rincón guarda una historia.' : approaching ? 'Camino hacia el Oráculo' : 'Descenso hacia el lugar'}
        </p>
      </div>
    </div>
  )
}

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
  if (!isSiteUnlocked(site, progress)) {
    if (siteId === 'casa-de-juanito') {
      return (
        <SealedSite
          title={siteLabel(site)}
          message="Para llegar a la Casa de Juanito, comienza por la Entrada, pasa por las tres preguntas (puedes guardar silencio) y descubre tu Llave de San Yallego."
          nextHref="/sitio/entrada"
          nextLabel="Comenzar por la Entrada"
        />
      )
    }
    return <SealedSite title={siteLabel(site)} />
  }

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

  // Entrada y Casa: dos vuelos claramente identificados con el reproductor
  // ya validado para Juanito. La Entrada no puede saltar directamente al
  // Oráculo sin terminar (o saltar explícitamente) ambos segmentos.
  if ((siteId === 'entrada' || siteId === 'casa-de-juanito') &&
    (phase === 'descenso' || phase === 'hacia-oraculo')) {
    const approaching = phase === 'hacia-oraculo'
    const isEntrance = siteId === 'entrada'
    const place = isEntrance ? 'ENTRADA A SAN YALLEGO' : 'CASA DE JUANITO'
    const destination = isEntrance ? 'Entrada a San Yallego' : 'Casa de Juanito'
    const src = approaching ? ASSETS.video.oraculos[siteId] : ASSETS.video.descensos[siteId]

    return (
      <main className="relative min-h-dvh bg-black">
        <JuanitoFlightVideo
          key={`${siteId}-${phase}`}
          src={src}
          label={approaching
            ? `Vuelo 2 de 2: camino hacia el Oráculo de ${destination}`
            : `Vuelo 1 de 2: descenso hacia ${destination}`}
          nextLabel={approaching ? 'Saltar al Oráculo' : isEntrance ? 'Seguir el descenso' : 'Saltar al vuelo 2 de 2'}
          onEnded={advance}
        />
<FlightHeading key={`heading-${siteId}-${phase}`} place={place} approaching={approaching} panorama={isEntrance && !approaching} />

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
