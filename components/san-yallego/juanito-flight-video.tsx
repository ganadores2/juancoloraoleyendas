'use client'

import { Pause, Play, SlidersHorizontal } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'

type Props = {
  src: string
  label: string
  nextLabel: string
  onEnded: () => void
}

/** Pantalla limpia por defecto, controles nativos disponibles a petición. */
export function JuanitoFlightVideo({ src, label, nextLabel, onEnded }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const [showControls, setShowControls] = useState(false)
  const [failed, setFailed] = useState(false)

  const attemptPlay = useCallback(async () => {
    const video = videoRef.current
    if (!video) return
    try {
      await video.play()
      setFailed(false)
    } catch {
      // Si autoplay falla, se conserva un botón manual visible.
      setPlaying(false)
    }
  }, [])

  useEffect(() => {
    void attemptPlay()
  }, [attemptPlay])

  const togglePlayback = () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) void attemptPlay()
    else video.pause()
  }

  return (
    <div className="fixed inset-0 z-30 bg-black">
      <video
        ref={videoRef}
        src={src}
        className="absolute inset-0 size-full bg-black object-contain"
        autoPlay
        muted
        playsInline
        preload="auto"
        controls={showControls}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={onEnded}
        onError={() => { setFailed(true); setPlaying(false) }}
        aria-label={label}
      />
      {!playing && !failed && (
        <button type="button" onClick={togglePlayback}
          className="absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full border border-gold/60 bg-black/75 px-5 py-3 text-sm text-gold shadow-lg backdrop-blur-sm"
          aria-label={`Reproducir: ${label}`}>
          <Play className="size-5" aria-hidden /> Reproducir recorrido
        </button>
      )}
      {failed && (
        <div role="alert" className="absolute inset-x-4 top-1/2 z-10 -translate-y-1/2 rounded-lg bg-black/85 p-5 text-center text-sm text-foreground">
          No se pudo cargar este video.
          <a href={src} target="_blank" rel="noopener noreferrer"
            className="mt-3 block text-gold underline underline-offset-4">Abrir el video directamente</a>
        </div>
      )}
      <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-none md:bottom-6 md:left-6 md:right-6">
        <div className="flex items-center gap-2 pointer-events-auto">
          <button type="button" onClick={togglePlayback}
            aria-label={playing ? 'Pausar recorrido' : 'Reproducir recorrido'}
            className="flex size-9 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white/85 backdrop-blur-sm hover:text-gold">
            {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
          </button>
          <button type="button" onClick={() => setShowControls(v => !v)}
            aria-pressed={showControls}
            className="flex items-center gap-2 rounded-full border border-white/20 bg-black/60 px-3 py-2 text-xs text-white/80 backdrop-blur-sm hover:text-gold">
            <SlidersHorizontal className="size-4" /> {showControls ? 'Ocultar controles' : 'Controles'}
          </button>
        </div>
        <button type="button" onClick={onEnded}
          className="pointer-events-auto rounded-full border border-white/20 bg-black/60 px-4 py-2 text-xs tracking-wide text-white/80 backdrop-blur-sm hover:text-gold">
          {nextLabel}
        </button>
      </div>
    </div>
  )
}
