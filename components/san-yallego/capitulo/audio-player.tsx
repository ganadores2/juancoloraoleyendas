'use client'

import { Pause, Play, RotateCcw, RotateCw, Volume2, VolumeX } from 'lucide-react'
import { useRef, useState } from 'react'
import { useSound } from '@/hooks/use-san-yallego'

interface AudioPlayerProps {
  src: string
  title: string
  onEnded: () => void
}

const SPEEDS = [1, 1.25, 1.5] as const
const SAVE_INTERVAL_SECONDS = 5
const MIN_RESUME_SECONDS = 4
const END_MARGIN_SECONDS = 5

const formatTime = (seconds: number) => {
  if (!Number.isFinite(seconds)) return '0:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

export function AudioPlayer({ src, title, onEnded }: AudioPlayerProps) {
  const { soundOn, toggle: toggleSound } = useSound()
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [current, setCurrent] = useState(0)
  const [duration, setDuration] = useState(0)
  const [missing, setMissing] = useState(false)
  const [playError, setPlayError] = useState(false)
  const [speed, setSpeed] = useState<number>(1)
  const [resumeAt, setResumeAt] = useState<number | null>(null)
  const lastSavedCheckpointRef = useRef(-1)
  // La posición se guarda solo en este navegador, separada por archivo MP3.
  const storageKey = `san-yallego:audio:posicion:${src}`

  const clearSavedPosition = () => {
    lastSavedCheckpointRef.current = -1
    setResumeAt(null)
    try {
      window.localStorage.removeItem(storageKey)
    } catch {
      // Navegación privada o almacenamiento bloqueado: se escucha normalmente.
    }
  }

  const rememberPosition = (audio: HTMLAudioElement, force = false) => {
    const seconds = audio.currentTime
    if (!Number.isFinite(seconds)) return
    const checkpoint = Math.floor(seconds / SAVE_INTERVAL_SECONDS)
    if (!force && checkpoint === lastSavedCheckpointRef.current) return
    lastSavedCheckpointRef.current = checkpoint
    try {
      if (seconds < MIN_RESUME_SECONDS || audio.ended ||
          (Number.isFinite(audio.duration) && seconds >= audio.duration - END_MARGIN_SECONDS)) {
        window.localStorage.removeItem(storageKey)
      } else {
        window.localStorage.setItem(storageKey, String(seconds))
      }
    } catch {
      // El audio funciona aun cuando no se permiten datos locales.
    }
  }

  const restorePosition = (audio: HTMLAudioElement) => {
    const total = Number.isFinite(audio.duration) ? audio.duration : 0
    setDuration(total)
    lastSavedCheckpointRef.current = -1
    setResumeAt(null)
    if (!total) return
    try {
      const saved = Number(window.localStorage.getItem(storageKey))
      if (Number.isFinite(saved) && saved >= MIN_RESUME_SECONDS && saved < total - END_MARGIN_SECONDS) {
        audio.currentTime = saved
        setCurrent(saved)
        setResumeAt(saved)
        lastSavedCheckpointRef.current = Math.floor(saved / SAVE_INTERVAL_SECONDS)
      }
    } catch {
      // Algunos navegadores restringen localStorage o la búsqueda en el MP3.
    }
  }

  const restartFromBeginning = () => {
    const audio = audioRef.current
    if (!audio) return
    clearSavedPosition()
    audio.currentTime = 0
    setCurrent(0)
  }

  const toggle = async () => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) {
      // El visitante ha elegido escuchar: evitamos iniciar el capítulo en silencio.
      if (!soundOn) {
        audio.muted = false
        toggleSound()
      }
      try {
        await audio.play()
        setResumeAt(null)
        setPlayError(false)
      } catch {
        // Reproducción denegada no equivale a un archivo inexistente.
        setPlayError(true)
      }
    } else {
      audio.pause()
    }
  }

  const jump = (seconds: number) => {
    const audio = audioRef.current
    if (!audio) return
    const end = Number.isFinite(audio.duration) ? audio.duration : Infinity
    audio.currentTime = Math.max(0, Math.min(audio.currentTime + seconds, end))
    setCurrent(audio.currentTime)
    setResumeAt(null)
    rememberPosition(audio, true)
  }

  const changeSpeed = () => {
    const next = SPEEDS[(SPEEDS.indexOf(speed as (typeof SPEEDS)[number]) + 1) % SPEEDS.length]
    setSpeed(next)
    if (audioRef.current) audioRef.current.playbackRate = next
  }

  const progress = duration ? (current / duration) * 100 : 0

  return (
    <div className="flex w-full max-w-md flex-col items-center gap-5">
      <p className="font-display text-[10px] tracking-[0.2em] text-foreground/60">
        {!playing && resumeAt !== null
          ? `LISTO PARA RETOMAR DESDE ${formatTime(resumeAt)}`
          : 'TOCA PARA ESCUCHAR LA HISTORIA'}
      </p>
      {!playing && resumeAt !== null && (
        <button type="button" onClick={restartFromBeginning}
          className="min-h-10 rounded-full border border-gold/40 px-4 text-xs text-gold hover:bg-gold/10">
          Escuchar desde el inicio
        </button>
      )}
      <button
        type="button"
        onClick={toggle}
        disabled={missing}
        aria-label={playing ? `Pausar ${title}` : `Reproducir ${title}`}
        className="relative flex size-20 items-center justify-center rounded-full border border-gold/60 text-gold transition-all hover:bg-gold/10 hover:shadow-[0_0_30px_-6px_var(--gold)] disabled:opacity-40 md:size-24"
      >
        {playing && <span className="animate-sy-ripple absolute inset-0 rounded-full border border-gold/40" aria-hidden />}
        {playing ? <Pause className="size-8" aria-hidden /> : <Play className="size-8 translate-x-0.5" aria-hidden />}
      </button>

      <div className="flex w-full items-center gap-3">
        <span className="w-10 text-right font-display text-[10px] tracking-widest text-foreground/60 tabular-nums">
          {formatTime(current)}
        </span>
        <div className="relative h-9 flex-1">
          <div className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-foreground/15" aria-hidden />
          <div
            className="absolute left-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-gold shadow-[0_0_8px_var(--gold)]"
            style={{ width: `${progress}%` }}
            aria-hidden
          />
          <input
            type="range"
            min={0}
            max={duration || 0}
            step={0.1}
            value={Math.min(current, duration || 0)}
            disabled={!duration}
            onChange={(event) => {
              const audio = audioRef.current
              if (audio) {
                audio.currentTime = Number(event.target.value)
                setCurrent(audio.currentTime)
                setResumeAt(null)
                rememberPosition(audio, true)
              }
            }}
            aria-label="Avanzar o retroceder en el capítulo"
            className="absolute inset-0 w-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
          />
        </div>
        <span className="w-10 font-display text-[10px] tracking-widest text-foreground/60 tabular-nums">
          {formatTime(duration)}
        </span>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <button type="button" onClick={() => jump(-15)} disabled={!duration || missing}
          aria-label="Retroceder 15 segundos"
          className="flex min-h-11 items-center gap-2 rounded-full border border-foreground/20 px-4 text-xs text-foreground/80 transition-colors hover:border-gold/60 hover:text-gold disabled:opacity-40">
          <RotateCcw className="size-4" aria-hidden /> 15 s
        </button>
        <button type="button" onClick={() => jump(15)} disabled={!duration || missing}
          aria-label="Adelantar 15 segundos"
          className="flex min-h-11 items-center gap-2 rounded-full border border-foreground/20 px-4 text-xs text-foreground/80 transition-colors hover:border-gold/60 hover:text-gold disabled:opacity-40">
          <RotateCw className="size-4" aria-hidden /> 15 s
        </button>
        <button type="button" onClick={changeSpeed}
          aria-label={`Velocidad de reproducción: ${speed} veces. Toca para cambiar.`}
          className="min-h-11 rounded-full border border-foreground/20 px-4 text-xs text-foreground/80 transition-colors hover:border-gold/60 hover:text-gold">
          {speed}× velocidad
        </button>
      </div>

      {!soundOn && (
        <button type="button" onClick={toggleSound}
          className="flex items-center gap-2 rounded-full border border-gold/40 px-4 py-3 text-xs text-gold">
          <VolumeX className="size-4" aria-hidden /> Activar sonido para escuchar
        </button>
      )}
      {soundOn && (
        <span className="flex items-center gap-2 text-xs text-foreground/40">
          <Volume2 className="size-3" aria-hidden /> Sonido activado
        </span>
      )}
      {playError && !missing && (
        <p role="alert" className="text-center text-xs text-amber-200">
          No se pudo iniciar la reproducción. Vuelve a tocar el botón de escuchar.
        </p>
      )}
      {missing && (
        <div className="flex flex-col items-center gap-3">
          <p role="alert" className="text-center text-xs text-amber-200">
            No se pudo cargar el archivo de audio.
          </p>
          <a href={src} target="_blank" rel="noopener noreferrer"
            className="text-xs text-gold underline underline-offset-4">
            Abrir audio directamente
          </a>
          <p className="max-w-sm text-center text-xs text-foreground/60">
            Puedes regresar al mapa y reintentar la escucha cuando esté disponible.
          </p>
        </div>
      )}

      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
        muted={!soundOn}
        onPlay={() => setPlaying(true)}
        onPause={(event) => {
          setPlaying(false)
          if (!event.currentTarget.ended) rememberPosition(event.currentTarget, true)
        }}
        onTimeUpdate={(event) => {
          setCurrent(event.currentTarget.currentTime)
          rememberPosition(event.currentTarget)
        }}
        onLoadedMetadata={(event) => restorePosition(event.currentTarget)}
        onError={() => setMissing(true)}
        onEnded={() => {
          setPlaying(false)
          clearSavedPosition()
          onEnded()
        }}
      />
    </div>
  )
}
