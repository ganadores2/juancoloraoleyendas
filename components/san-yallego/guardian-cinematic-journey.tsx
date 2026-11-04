
'use client'

import { useCallback, useState } from 'react'
import Link from 'next/link'
import { ASSETS } from '@/lib/san-yallego/assets'
import { SITES, type SiteId } from '@/lib/san-yallego/sites'
import { CinematicVideo } from './cinematic-video'

type Phase = 'descenso' | 'oraculo' | 'terminado'

interface GuardianCinematicJourneyProps {
  siteId: SiteId
  siteName: string
}

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

  const currentIndex = SITES.findIndex(
    (site) => site.id === siteId,
  )

  const nextSite = SITES[currentIndex + 1]

  const videoSrc =
    phase === 'descenso'
      ? ASSETS.video.descensos[siteId]
      : ASSETS.video.oraculos[siteId]

  const videoLabel =
    phase === 'descenso'
      ? `Descenso hacia ${siteName}`
      : `Camino hacia el oráculo de ${siteName}`

  if (phase === 'terminado') {
    return (
      <main className="fixed inset-0 flex min-h-dvh items-center justify-center bg-black px-6 text-center text-foreground">
        <section className="w-full max-w-xl space-y-8">
          <p className="font-display text-xs tracking-[0.3em] text-gold/70">
            SAN YALLEGO · RECORRIDO CINEMATOGRÁFICO
          </p>

          <h1 className="font-display text-3xl text-gold md:text-5xl">
            {siteName}
          </h1>

          <p className="text-lg italic text-foreground/75">
            Has completado el descenso y la aproximación
            hacia este lugar mítico.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              type="button"
              onClick={() => setPhase('descenso')}
              className="min-h-11 border border-gold/60 px-6 py-3 text-sm text-gold"
            >
              REPETIR RECORRIDO
            </button>

            {nextSite ? (
              <Link
                href={`/guardian/sitio/${nextSite.id}`}
                className="inline-flex min-h-11 items-center justify-center border border-gold/60 px-6 py-3 text-sm text-gold"
              >
                SIGUIENTE LUGAR
              </Link>
            ) : (
              <Link
                href="/guardian"
                className="inline-flex min-h-11 items-center justify-center border border-gold/60 px-6 py-3 text-sm text-gold"
              >
                FINALIZAR LOS DIEZ CAMINOS
              </Link>
            )}

            <Link
              href="/guardian"
              className="text-sm text-foreground/70 underline underline-offset-4"
            >
              VOLVER AL TALLER
            </Link>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="fixed inset-0 bg-black">
      <CinematicVideo
        key={`${siteId}-${phase}`}
        src={videoSrc}
        label={videoLabel}
        onEnded={handleEnded}
        showSkip
      />

      <div className="pointer-events-none fixed left-4 top-4 z-30 right-4 flex items-start justify-between gap-4">
        <div className="max-w-[65%] bg-black/65 p-3 text-gold backdrop-blur-sm">
          <p className="text-[10px] tracking-[0.2em]">
            {phase === 'descenso'
              ? 'VUELO 01 · DESCENSO'
              : 'VUELO 02 · HACIA EL ORÁCULO'}
          </p>

          <p className="mt-1 font-display text-sm">
            {siteName}
          </p>
        </div>

        <Link
          href="/guardian"
          className="pointer-events-auto border border-gold/45 bg-black/75 px-4 py-3 text-xs text-gold"
        >
          SALIR AL TALLER
        </Link>
      </div>
    </main>
  )
}
