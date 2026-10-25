'use client'

import { Pause, Play } from 'lucide-react'
import { useRef, useState } from 'react'
import { useSound } from '@/hooks/use-san-yallego'

interface AudioPlayerProps {
  src: string
  title: string
  onEnded: () => void
}

const formatTime = (seconds: number) => {
  if (!Number.isFinite(seconds)) return '0:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

export function AudioPlayer({ src, title, onEnded }: AudioPlayerProps) {
  const { soundOn } = useSound()
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [current, setCurrent] = useState(0)
  const [duration, setDuration] = useState(0)
  const [missing, setMissing] = useState(false)
  const [skipped, setSkipped] = useState(false)

  const toggle = async () => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) {
      try {
        await audio.play()
      } catch {
        setMissing(true)
      }
    } else {
      audio.pause()
    }
  }

  const progress = duration ? (current / duration) * 100 : 0

  return (
    <div className="flex w-full max-w-md flex-col items-center gap-6">
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

      <div className="flex w-full items-center gap-4">
        <span className="w-10 text-right font-display text-[10px] tracking-widest text-foreground/50 tabular-nums">
          {formatTime(current)}
        </span>
        <div className="relative h-6 flex-1">
          <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-foreground/15" aria-hidden />
          <div
            className="absolute left-0 top-1/2 h-px -translate-y-1/2 bg-gold shadow-[0_0_8px_var(--gold)]"
            style={{ width: `${progress}%` }}
            aria-hidden
          />
          <input
            type="range"
            min={0}
            max={duration || 0}
            step={0.1}
            value={current}
            disabled={!duration}
            onChange={(event) => {
              const audio = audioRef.current
              if (audio) audio.currentTime = Number(event.target.value)
            }}
            aria-label="Posición en el capítulo"
            className="absolute inset-0 w-full cursor-pointer opacity-0"
          />
        </div>
        <span className="w-10 font-display text-[10px] tracking-widest text-foreground/50 tabular-nums">
          {formatTime(duration)}
        </span>
      </div>

      {missing && (
        <div className="flex flex-col items-center gap-3">
          <p className="font-display text-[9px] tracking-[0.25em] text-foreground/35">AUDIO PENDIENTE · {src}</p>
          <button
            type="button"
            onClick={() => {
              setSkipped(true)
              onEnded()
            }}
            hidden={skipped}
            className="font-display text-[10px] tracking-[0.35em] text-gold/70 hover:text-gold"
          >
            CONTINUAR
          </button>
        </div>
      )}

      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
        muted={!soundOn}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={(event) => setCurrent(event.currentTarget.currentTime)}
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
        onError={() => setMissing(true)}
        onEnded={() => {
          setPlaying(false)
          onEnded()
        }}
      />
    </div>
  )
}
