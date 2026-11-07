'use client'

import Link from 'next/link'
import { ArrowLeft, ArrowRight, CheckCircle2, Map, RotateCcw } from 'lucide-react'
import { useCallback, useState } from 'react'
import { ASSETS } from '@/lib/san-yallego/assets'
import { SITES, siteLabel, type SiteId } from '@/lib/san-yallego/sites'
import { CinematicVideo } from './cinematic-video'

type Phase = 'descenso' | 'oraculo' | 'terminado'

interface GuardianCinematicJourneyProps {
  siteId: SiteId
  siteName: string
}

/**
 * Dos vuelos por lugar. Solo se avanza al siguiente lugar por elección del creador.
 * Los nombres pendientes se obtienen del manifiesto sin inventar denominaciones.
 */
export function GuardianCinematicJourney({
  siteId,
  siteName,
}: GuardianCinematicJourneyProps) {
  const [phase, setPhase] = useState<Phase>('descenso')

  const handleEnded = useCallback(() => {
    setPhase((current) => {
      if (current === 'descenso') return 'oraculo'
      if (current === 'oraculo') return 'terminado'
      return current
    })
  }, [])

  const currentIndex = SITES.findIndex((site) => site.id === siteId)
  const currentNumber = String(currentIndex + 1).padStart(2, '0')
  const nextSite = SITES[currentIndex + 1]

  if (phase === 'terminado') {
    return (
      <main className="fixed inset-0 z-10 flex min-h-dvh items-center justify-center overflow-y-auto bg-black px-4 py-8 text-foreground">
        <div
          className="pointer-events-none fixed inset-0 bg-gradient-to-b from-gold/10 via-transparent to-black"
          aria-hidden="true"
        />

        <section className="relative w-full max-w-2xl space-y-6 rounded-2xl border border-gold/35 bg-black/90 p-6 text-center shadow-2xl sm:p-10">
          <CheckCircle2 className="mx-auto size-9 text-gold" aria-hidden="true" />

          <p className="font-display text-xs tracking-[0.22em] text-gold/75">
            SAN YALLEGO · CAMINO {currentNumber} DE 10
          </p>

          <h1 className="font-display text-3xl text-gold md:text-5xl">
            {siteName}
          </h1>

          <p className="mx-auto max-w-lg text-base leading-relaxed text-foreground/80">
            Las dos etapas del recorrido han terminado.
            Puedes seguir explorando, repetir los vuelos o regresar al mapa.
          </p>

          <div className="grid gap-3 sm:grid-cols-2">
            <Link
              href="/guardian/mapa"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-gold px-5 py-3 font-display text-xs tracking-wide text-black transition-opacity hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              <Map className="size-4" aria-hidden="true" />
              VOLVER AL MAPA
            </Link>

            {nextSite ? (
              <Link
                href={'/guardian/sitio/' + nextSite.id}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-gold/60 px-5 py-3 font-display text-xs tracking-wide text-gold transition-colors hover:bg-gold/10 focus-visible:outline-2 focus-visible:outline-gold"
              >
                SIGUIENTE: {siteLabel(nextSite)}
                <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
              </Link>
            ) : (
              <Link
                href="/guardian"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-gold/60 px-5 py-3 font-display text-xs tracking-wide text-gold transition-colors hover:bg-gold/10 focus-visible:outline-2 focus-visible:outline-gold"
              >
                FINALIZAR LOS DIEZ CAMINOS
                <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
              </Link>
            )}
          </div>

          <button
            type="button"
            onClick={() => setPhase('descenso')}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm text-foreground/80 underline-offset-4 transition-colors hover:text-gold hover:underline focus-visible:outline-2 focus-visible:outline-gold"
          >
            <RotateCcw className="size-4" aria-hidden="true" />
            Repetir los dos vuelos
          </button>

          <div className="border-t border-gold/20 pt-5">
            <Link
              href="/guardian"
              className="text-xs text-foreground/65 underline underline-offset-4 transition-colors hover:text-gold"
            >
              Volver al Taller del Creador
            </Link>
          </div>
        </section>
      </main>
    )
  }

  const firstFlight = phase === 'descenso'
  const videoSrc = firstFlight
    ? ASSETS.video.descensos[siteId]
    : ASSETS.video.oraculos[siteId]

  const videoLabel = firstFlight
    ? 'Descenso hacia ' + siteName
    : 'Aproximación al oráculo de ' + siteName

  return (
    <main className="fixed inset-0 overflow-hidden bg-black">
      <CinematicVideo
        key={siteId + '-' + phase}
        src={videoSrc}
        label={videoLabel}
        onEnded={handleEnded}
        showSkip
      />

      <div className="pointer-events-none fixed left-3 right-3 top-3 z-30 flex items-start justify-between gap-3 sm:left-6 sm:right-6 sm:top-6">
        <div className="max-w-[66%] rounded-lg border border-gold/30 bg-black/70 px-3 py-2 text-gold shadow-lg backdrop-blur-sm sm:max-w-sm sm:px-4 sm:py-3">
          <p className="text-[10px] tracking-[0.15em] text-gold/75">
            CAMINO {currentNumber} / 10
          </p>

          <p className="mt-1 font-display text-sm leading-snug sm:text-base">
            {siteName}
          </p>

          <p className="mt-1 text-[10px] tracking-wide text-foreground/80" aria-live="polite">
            {firstFlight ? 'VUELO 01 · DESCENSO' : 'VUELO 02 · HACIA EL ORÁCULO'}
          </p>

          <div className="mt-2 flex gap-1.5" aria-hidden="true">
            <span className="h-1 w-9 rounded-full bg-gold" />
            <span
              className={
                firstFlight
                  ? 'h-1 w-9 rounded-full bg-gold/25'
                  : 'h-1 w-9 rounded-full bg-gold'
              }
            />
          </div>
        </div>

        <Link
          href="/guardian/mapa"
          className="pointer-events-auto inline-flex min-h-11 shrink-0 items-center gap-2 rounded-lg border border-gold/50 bg-black/75 px-3 py-2 text-[11px] text-gold backdrop-blur-sm transition-colors hover:bg-gold/15 focus-visible:outline-2 focus-visible:outline-gold sm:px-4 sm:text-xs"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          MAPA
        </Link>
      </div>
    </main>
  )
}
