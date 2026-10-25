'use client'

import { Map as MapIcon } from 'lucide-react'
import Link from 'next/link'
import { useRef, useState } from 'react'
import { useSound, useWhisper } from '@/hooks/use-san-yallego'
import { ASSETS } from '@/lib/san-yallego/assets'
import { CinematicImage } from '../cinematic-image'
import { ritualButton } from '../ritual'
import { Whisper } from '../whisper'

export function HomeScreen() {
  const { soundOn } = useSound()
  const { message, nonce, whisper } = useWhisper()
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)

  const toggleGrito = async () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      return
    }
    try {
      await audio.play()
    } catch {
      whisper('El primer grito todavía no llega hasta aquí.')
    }
  }

  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6 text-center">
      <div className="absolute inset-0" aria-hidden>
        <CinematicImage src={ASSETS.images.portada} alt="" className="scale-105" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,oklch(0_0_0/0.85)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 to-transparent" />
      </div>

      <Link
        href="/mapa"
        aria-label="Abrir el mapa de San Yallego"
        className="absolute left-4 top-4 z-10 p-2 text-foreground/60 transition-colors hover:text-gold md:left-6 md:top-6"
      >
        <MapIcon className="size-5" aria-hidden />
      </Link>

      <div className="relative z-10 flex flex-col items-center gap-10">
        <header className="animate-sy-fade-in flex flex-col items-center gap-3">
          <p className="font-display text-[11px] tracking-[0.6em] text-gold/80">JUAN COLORAO · LEYENDAS</p>
          <span className="h-px w-16 bg-gold/40" aria-hidden />
        </header>

        <div className="animate-sy-fade-in flex flex-col items-center gap-5 [animation-delay:400ms]">
          <h1 className="text-balance font-display text-4xl leading-tight tracking-[0.12em] text-foreground text-glow md:text-6xl">
            BIENVENIDO A SAN YALLEGO
          </h1>
          <p className="max-w-xl text-balance text-xl italic text-foreground/80 md:text-2xl">
            Aquí las leyendas no se cuentan. Se descubren.
          </p>
        </div>

        <div className="animate-sy-fade-in flex flex-col items-center gap-4 [animation-delay:900ms]">
          <Link href="/bienvenida" className={ritualButton('primary')}>
            Entrar a San Yallego
          </Link>
          <button type="button" onClick={toggleGrito} aria-pressed={playing} className={ritualButton('secondary')}>
            {playing ? 'Silenciar el primer grito' : 'Escuchar el primer grito'}
          </button>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={ASSETS.audio.primerGrito}
        preload="none"
        muted={!soundOn}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
      />
      <Whisper message={message} nonce={nonce} />
    </main>
  )
}
