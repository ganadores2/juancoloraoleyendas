'use client'

import { Play } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useSound } from '@/hooks/use-san-yallego'
import { MediaPlaceholder } from './media-placeholder'

interface CinematicVideoProps {
  src: string
  onEnded: () => void
  label: string
  showSkip?: boolean
}

type Status = 'loading' | 'playing' | 'blocked' | 'missing'

export function CinematicVideo({ src, onEnded, label, showSkip = true }: CinematicVideoProps) {
  const { soundOn } = useSound()
  const [status, setStatus] = useState<Status>('loading')
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const endedRef = useRef(false)

  const finish = useCallback(() => {
    if (endedRef.current) return
    endedRef.current = true
    onEnded()
  }, [onEnded])

  const attach = useCallback((video: HTMLVideoElement | null) => {
    videoRef.current = video
    if (video && (video.error || video.networkState === HTMLMediaElement.NETWORK_NO_SOURCE)) {
      setStatus('missing')
    }
  }, [])

  const play = useCallback(async () => {
    const video = videoRef.current
    if (!video) return
    try {
      await video.play()
      setStatus('playing')
    } catch {
      setStatus((s) => (s === 'missing' ? s : 'blocked'))
    }
  }, [])

  useEffect(() => {
    play()
  }, [play])

  return (
    <div className="fixed inset-0 bg-black">
      {status === 'missing' ? (
        <MediaPlaceholder kind="video" path={src} />
      ) : (
        <video
          ref={attach}
          src={src}
          className="size-full object-cover"
          playsInline
          preload="auto"
          muted={!soundOn}
          onPlaying={() => setStatus('playing')}
          onEnded={finish}
          onError={() => setStatus('missing')}
          aria-label={label}
        />
      )}

      {status === 'blocked' && (
        <button
          type="button"
          onClick={play}
          className="absolute inset-0 m-auto flex size-20 items-center justify-center rounded-full border border-gold/50 text-gold transition-colors hover:bg-gold/10"
          aria-label={`Reproducir: ${label}`}
        >
          <Play className="size-7 translate-x-0.5" aria-hidden />
        </button>
      )}

      {status === 'missing' && (
        <button
          type="button"
          onClick={finish}
          className="absolute inset-x-0 bottom-16 mx-auto w-fit font-display text-xs tracking-[0.35em] text-gold/80 transition-colors hover:text-gold"
        >
          CONTINUAR
        </button>
      )}

      {showSkip && status !== 'missing' && (
        <button
          type="button"
          onClick={finish}
          className="absolute bottom-5 right-5 font-display text-[10px] tracking-[0.35em] text-foreground/40 transition-colors hover:text-foreground/80 md:bottom-8 md:right-8"
        >
          SALTAR
        </button>
      )}
    </div>
  )
}
