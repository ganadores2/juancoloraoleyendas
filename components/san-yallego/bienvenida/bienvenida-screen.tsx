'use client'

import { Mic, Pause, Play, Scan } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useSound } from '@/hooks/use-san-yallego'
import { ASSETS } from '@/lib/san-yallego/assets'

type Phase = 'saludo' | 'invitacion' | 'microfono' | 'saliendo'
type Playback = 'idle' | 'playing' | 'paused' | 'error'

/** Dos saludos de Juan Colorao, seguidos del micrófono como llave del portal.
 * El primer video se inicia con un toque para garantizar que se escuche su voz.
 */
export function BienvenidaScreen() {
  const router = useRouter()
  const { soundOn } = useSound()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [phase, setPhase] = useState<Phase>('saludo')
  const [playback, setPlayback] = useState<Playback>('idle')
  const [fillScreen, setFillScreen] = useState(true)

  const play = useCallback(async () => {
    const video = videoRef.current
    if (!video) return
    try {
      await video.play()
      setPlayback('playing')
    } catch {
      setPlayback('paused')
    }
  }, [])

  const next = useCallback(() => {
    setPlayback('idle')
    setPhase((current) => current === 'saludo' ? 'invitacion' : 'microfono')
  }, [])

  // Al terminar el saludo se intenta reproducir la invitación con voz.
  // Los navegadores que bloqueen ese intento ofrecen el botón manual.
  useEffect(() => {
    if (phase === 'invitacion') void play()
  }, [phase, play])

  useEffect(() => {
    if (phase !== 'saliendo') return
    const id = window.setTimeout(() => router.push('/portal'), 700)
    return () => window.clearTimeout(id)
  }, [phase, router])

  const touchMic = () => {
    navigator.vibrate?.(40)
    setPhase('saliendo')
  }

  const isSaludo = phase === 'saludo'
  const src = isSaludo ? ASSETS.video.bienvenida : ASSETS.video.bienvenidaMicrofono

  return (
    <main className="fixed inset-0 overflow-hidden bg-black">
      <h1 className="sr-only">Bienvenida de Juan Colorao a San Yallego</h1>

      <video
        key={isSaludo ? 'saludo' : 'invitacion'}
        ref={videoRef}
        src={src}
        poster={ASSETS.images.mapa}
        className={`absolute inset-0 size-full bg-black ${fillScreen ? 'object-cover' : 'object-contain'}`}
        playsInline
        preload="auto"
        muted={!soundOn}
        onPlay={() => setPlayback('playing')}
        onPause={() => setPlayback((state) => state === 'error' ? state : 'paused')}
        onEnded={next}
        onError={() => setPlayback('error')}
        aria-label={isSaludo ? 'Juan Colorao te da la bienvenida' : 'Juan Colorao te invita a tocar el micrófono'}
      />

      {(phase === 'saludo' || phase === 'invitacion') && playback !== 'playing' && playback !== 'error' && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/25 px-4">
          <button
            type="button"
            onClick={() => void play()}
            className="flex min-h-14 items-center gap-3 rounded-full border border-gold/70 bg-black/75 px-6 py-4 font-display text-xs tracking-[0.15em] text-gold backdrop-blur-md hover:bg-black/90"
          >
            <Play className="size-6 shrink-0" aria-hidden />
            {isSaludo ? 'ESCUCHAR LA BIENVENIDA' : 'CONTINUAR LA INVITACIÓN'}
          </button>
        </div>
      )}

      {playback === 'error' && phase !== 'saliendo' && (
        <div role="alert" className="absolute inset-x-4 top-1/2 z-20 -translate-y-1/2 border border-gold/40 bg-black/90 p-5 text-center text-sm text-foreground">
          No se pudo cargar este video.
          <a href={src} target="_blank" rel="noopener noreferrer" className="mt-3 block text-gold underline underline-offset-4">
            Abrir archivo directamente
          </a>
          <button type="button" onClick={next} className="mt-4 block w-full text-xs text-gold">
            Continuar la aventura
          </button>
        </div>
      )}

      {phase === 'microfono' && (
        <div className="animate-sy-fade-in absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 bg-gradient-to-t from-black/75 via-transparent to-black/30 px-5 text-center">
          <p className="font-display text-[10px] tracking-[0.27em] text-gold/90">
            JUAN COLORAO TE INVITA
          </p>
          <p className="max-w-sm text-balance text-xl italic text-foreground text-glow md:text-2xl">
            Toca el micrófono para cruzar el portal.
          </p>
          <button
            type="button"
            onClick={touchMic}
            aria-label="Tocar el micrófono para entrar a San Yallego"
            className="relative flex size-20 items-center justify-center rounded-full border border-gold/70 bg-black/65 text-gold shadow-[0_0_28px_oklch(0.8_0.12_82/0.25)] transition-transform hover:scale-105 md:size-24"
          >
            <span className="animate-sy-ripple absolute inset-0 rounded-full border border-gold/45" aria-hidden />
            <Mic className="size-9" aria-hidden />
          </button>
          <span className="font-display text-[10px] tracking-[0.25em] text-gold/75">ENTRAR A LA LEYENDA</span>
        </div>
      )}

      {phase === 'saliendo' && (
        <div className="animate-sy-fade-in absolute inset-0 z-30 bg-black" aria-hidden />
      )}

      {(phase === 'saludo' || phase === 'invitacion') && (
        <div className="pointer-events-none absolute bottom-4 left-4 right-4 z-30 flex flex-wrap items-center justify-between gap-3 md:bottom-6 md:left-6 md:right-6">
          <div className="pointer-events-auto flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                if (videoRef.current?.paused) void play()
                else videoRef.current?.pause()
              }}
              aria-label={playback === 'playing' ? 'Pausar bienvenida' : 'Reproducir bienvenida'}
              className="flex size-10 items-center justify-center rounded-full border border-white/25 bg-black/65 text-white/90 backdrop-blur-sm"
            >
              {playback === 'playing' ? <Pause className="size-4" /> : <Play className="size-4" />}
            </button>
            <button
              type="button"
              onClick={() => setFillScreen((value) => !value)}
              aria-label={fillScreen ? 'Ver encuadre original' : 'Llenar pantalla'}
              className="flex min-h-10 items-center gap-2 rounded-full border border-white/25 bg-black/65 px-3 text-xs text-white/85 backdrop-blur-sm"
            >
              <Scan className="size-4" aria-hidden />
              {fillScreen ? 'Ver original' : 'Pantalla completa'}
            </button>
          </div>
          <button
            type="button"
            onClick={next}
            className="pointer-events-auto min-h-10 rounded-full border border-white/25 bg-black/65 px-4 text-xs text-white/85 backdrop-blur-sm"
          >
            {isSaludo ? 'Siguiente saludo' : 'Ir al micrófono'}
          </button>
        </div>
      )}

      <Link
        href="/mapa"
        className="absolute left-4 top-4 z-40 rounded-full bg-black/45 px-3 py-2 font-display text-[10px] tracking-[0.15em] text-foreground/75 hover:text-gold md:left-6 md:top-6"
      >
        Ir al mapa
      </Link>
    </main>
  )
}
