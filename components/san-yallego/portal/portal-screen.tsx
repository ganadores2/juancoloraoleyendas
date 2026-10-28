'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { useProgress } from '@/hooks/use-san-yallego'
import { ASSETS } from '@/lib/san-yallego/assets'
import { JuanitoFlightVideo } from '../juanito-flight-video'

type Phase = 'portal' | 'anuncio' | 'recorrido'

/** El portal web y el sobrevuelo conducen al Oráculo de la Entrada.
 * Reutiliza el reproductor cinematográfico ya probado en Android.
 */
export function PortalScreen() {
  const router = useRouter()
  const { crossPortal } = useProgress()
  const [phase, setPhase] = useState<Phase>('portal')
  const toAnnouncement = useCallback(() => setPhase('anuncio'), [])

  // Una breve invitación visual; el sobrevuelo comienza solo, sin otro toque.
  useEffect(() => {
    if (phase !== 'anuncio') return
    const timer = window.setTimeout(() => setPhase('recorrido'), 2500)
    return () => window.clearTimeout(timer)
  }, [phase])
  const toEntranceOracle = useCallback(() => {
    crossPortal()
    router.push('/sitio/entrada')
  }, [crossPortal, router])

  return (
    <main className="relative min-h-dvh bg-black">
      <h1 className="sr-only">Portal a San Yallego</h1>
      {phase === 'portal' ? (
        <JuanitoFlightVideo
          key="portal-web"
          src={ASSETS.video.portal}
          label="Juan Colorao Leyendas, portal web"
          nextLabel="Iniciar recorrido exprés"
          onEnded={toAnnouncement}
        />
      ) : phase === 'anuncio' ? (
        <section
          className="fixed inset-0 flex items-center justify-center overflow-hidden bg-black px-6 text-center"
          aria-label="Presentación del recorrido exprés"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={ASSETS.images.mapa}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 size-full scale-105 object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0_0_0/0.3)_0%,oklch(0_0_0/0.88)_100%)]" />
          <div className="animate-sy-fade-in relative z-10 flex flex-col items-center gap-5">
            <span className="h-px w-16 bg-gold/65" aria-hidden="true" />
            <h2 className="text-balance font-display text-3xl tracking-[0.14em] text-gold text-glow sm:text-4xl md:text-6xl">
              RECORRIDO EXPRÉS
            </h2>
            <p className="max-w-lg text-balance text-lg italic text-foreground/90 sm:text-2xl">
              Un vistazo a San Yallego desde el cielo.
            </p>
            <span className="h-px w-16 bg-gold/65" aria-hidden="true" />
          </div>
        </section>
      ) : (
        <JuanitoFlightVideo
          key="sobrevuelo-san-yallego"
          src={ASSETS.video.recorridoAereo}
          label="Recorrido aéreo por San Yallego"
          playbackRate={0.85}
          nextLabel="Ir a la Entrada"
          onEnded={toEntranceOracle}
        />
      )}
    </main>
  )
}
