'use client'

import { Pause, Play, Scan } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useSound } from '@/hooks/use-san-yallego'
import { ASSETS } from '@/lib/san-yallego/assets'

type Phase = 'saludo' | 'invitacion' | 'microfono' | 'saliendo'
type Playback = 'idle' | 'playing' | 'paused' | 'error'

/** Dos saludos cinematográficos, seguidos de una invitación clara al recorrido.
 * El micrófono pertenece al gesto artístico del video, no es un control obligatorio.
 * La bienvenida continúa automáticamente; también permite avanzar de inmediato.
 */
export function BienvenidaScreen() {
  const router = useRouter()
  const { soundOn } = useSound()
  const firstVideoRef = useRef<HTMLVideoElement>(null)
  const secondVideoRef = useRef<HTMLVideoElement>(null)
  const freezeCanvasRef = useRef<HTMLCanvasElement>(null)
  // Una copia del último fotograma del saludo 1 cubre el instante en que
  // el navegador deja de dibujar el video terminado.
  const [secondVisible, setSecondVisible] = useState(false)
  const [phase, setPhase] = useState<Phase>('saludo')
  const [playback, setPlayback] = useState<Playback>('idle')
  const [fillScreen, setFillScreen] = useState(true)

  const captureFirstFrame = useCallback(() => {
    const video = firstVideoRef.current
    const canvas = freezeCanvasRef.current
    if (!video || !canvas || video.readyState < 2 || !video.videoWidth || !video.videoHeight) return
    // Conservamos nitidez Full HD con un límite razonable de memoria.
    const width = Math.min(video.videoWidth, 1920)
    const height = Math.round(width * video.videoHeight / video.videoWidth)
    const context = canvas.getContext('2d')
    if (!context) return
    try {
      if (canvas.width !== width) canvas.width = width
      if (canvas.height !== height) canvas.height = height
      context.drawImage(video, 0, 0, width, height)
    } catch {
      // Si el navegador no permite capturar el fotograma, mantiene el video debajo.
    }
  }, [])

  const play = useCallback(async () => {
    const video = phase === 'saludo' ? firstVideoRef.current : secondVideoRef.current
    if (!video || (phase !== 'saludo' && phase !== 'invitacion')) return
    try {
      await video.play()
      setPlayback('playing')
    } catch {
      setPlayback(video.error ? 'error' : 'paused')
    }
  }, [phase])

  const next = useCallback(() => {
    if (phase === 'saludo') {
      // Actualizamos siempre la imagen justo al terminar el video: una captura
      // anterior (onTimeUpdate) puede tener varias décimas de segundo de atraso.
      captureFirstFrame()
      firstVideoRef.current?.pause()
      setPlayback('idle')
      setPhase('invitacion')
    } else if (phase === 'invitacion') {
      secondVideoRef.current?.pause()
      setPlayback('idle')
      setPhase('microfono')
    }
  }, [phase, captureFirstFrame])

  // Intento de reproducción sin imponer un segundo clic. El navegador puede
  // exigir interacción para habilitar audio: el botón manual sigue disponible.
  useEffect(() => {
    if (phase !== 'saludo' && phase !== 'invitacion') return
    const video = phase === 'saludo' ? firstVideoRef.current : secondVideoRef.current
    if (!video) return
    if (video.error) {
      setPlayback('error')
      return
    }
    void video.play().catch(() => {
      // Si el navegador bloquea el video, queda disponible el botón manual.
    })
  }, [phase])

  // El micrófono forma parte de la escena filmada: la página no exige tocarlo.
  // El visitante puede contemplar el plano o comenzar el recorrido inmediatamente.
  useEffect(() => {
    if (phase !== 'microfono') return
    const id = window.setTimeout(() => setPhase('saliendo'), 3500)
    return () => window.clearTimeout(id)
  }, [phase])

  useEffect(() => {
    if (phase !== 'saliendo') return
    const id = window.setTimeout(() => router.push('/portal'), 700)
    return () => window.clearTimeout(id)
  }, [phase, router])

  const beginJourney = () => {
    if (phase === 'saliendo') return
    setPhase('saliendo')
  }

  const isSaludo = phase === 'saludo'
  const src = isSaludo ? ASSETS.video.bienvenida : ASSETS.video.bienvenidaMicrofono

  const revealSecondVideo = () => {
    if (phase !== 'invitacion' || secondVisible) return
    const video = secondVideoRef.current
    if (!video) return
    // Esperamos al primer fotograma REAL, no solo al evento play.
    if (typeof video.requestVideoFrameCallback === 'function') {
      video.requestVideoFrameCallback(() => setSecondVisible(true))
    } else {
      // Compatibilidad: navegadores sin requestVideoFrameCallback.
      setSecondVisible(true)
    }
  }

  return (
    <main className="fixed inset-0 overflow-hidden bg-black">
      <h1 className="sr-only">Bienvenida de Juan Colorao a San Yallego</h1>

      <video
        ref={firstVideoRef}
        src={ASSETS.video.bienvenida}
        className={`absolute inset-0 size-full bg-black ${fillScreen ? 'object-cover' : 'object-contain'}`}
        playsInline
        preload="auto"
        muted={!soundOn}
        onPlay={() => { if (phase === 'saludo') setPlayback('playing') }}
        onPause={() => { if (phase === 'saludo') setPlayback((state) => state === 'error' ? state : 'paused') }}
        onEnded={next}
        onTimeUpdate={() => {
          const video = firstVideoRef.current
          if (video && Number.isFinite(video.duration) && video.duration - video.currentTime <= 0.55) {
            captureFirstFrame()
          }
        }}
        onError={() => { if (phase === 'saludo') setPlayback('error') }}
        aria-hidden={!isSaludo}
        aria-label="Juan Colorao te da la bienvenida"
      />
      <canvas
        ref={freezeCanvasRef}
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 z-0 size-full bg-transparent ${fillScreen ? 'object-cover' : 'object-contain'} ${isSaludo ? 'opacity-0' : 'opacity-100'}`}
      />
      <video
        ref={secondVideoRef}
        src={ASSETS.video.bienvenidaMicrofono}
        className={`absolute inset-0 z-10 size-full bg-black transition-opacity duration-300 ease-in-out ${fillScreen ? 'object-cover' : 'object-contain'} ${secondVisible ? 'opacity-100' : 'opacity-0'}`}
        playsInline
        preload="auto"
        muted={!soundOn}
        onPlay={() => { if (phase === 'invitacion') setPlayback('playing') }}
        onPlaying={revealSecondVideo}
        onTimeUpdate={revealSecondVideo}
        onPause={() => { if (phase === 'invitacion') setPlayback((state) => state === 'error' ? state : 'paused') }}
        onEnded={next}
        onError={() => { if (phase === 'invitacion') setPlayback('error') }}
        aria-hidden={isSaludo}
        aria-label="Juan Colorao te invita a conocer San Yallego"
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
        <div className="animate-sy-fade-in absolute inset-0 z-20 flex flex-col items-center justify-center gap-5 bg-gradient-to-t from-black/80 via-transparent to-black/35 px-5 text-center">
          <p className="font-display text-[10px] tracking-[0.27em] text-gold/90">
            JUAN COLORAO TE INVITA
          </p>
          <p className="max-w-md text-balance text-xl italic text-foreground text-glow md:text-2xl">
            Ven y explora mi mundo. Tu aventura en San Yallego está por comenzar.
          </p>
          <button
            type="button"
            onClick={beginJourney}
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-gold/75 bg-black/75 px-7 py-3 font-display text-xs tracking-[0.16em] text-gold shadow-[0_0_24px_oklch(0.8_0.12_82/0.2)] transition-colors hover:bg-gold/15 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
          >
            COMENZAR EL RECORRIDO
          </button>
          <p className="max-w-xs text-balance text-xs text-foreground/75">
            O simplemente contempla: el viaje continúa automáticamente.
          </p>
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
                const activeVideo = isSaludo ? firstVideoRef.current : secondVideoRef.current
                if (activeVideo?.paused) void play()
                else activeVideo?.pause()
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
          <div className="pointer-events-auto flex flex-wrap items-center justify-end gap-2">
            <button
              type="button"
              onClick={next}
              className="min-h-10 rounded-full border border-white/25 bg-black/65 px-4 text-xs text-white/85 backdrop-blur-sm"
            >
              {isSaludo ? 'Ver siguiente saludo' : 'Continuar la bienvenida'}
            </button>
            <button
              type="button"
              onClick={beginJourney}
              className="min-h-10 rounded-full border border-gold/75 bg-black/75 px-4 font-display text-[10px] tracking-[0.12em] text-gold backdrop-blur-sm transition-colors hover:bg-gold/15"
            >
              COMENZAR EL RECORRIDO
            </button>
          </div>
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
