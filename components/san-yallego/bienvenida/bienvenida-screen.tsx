'use client'

import { Mic } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import { ASSETS } from '@/lib/san-yallego/assets'
import { cn } from '@/lib/utils'
import { CinematicVideo } from '../cinematic-video'

type Phase = 'video' | 'microfono' | 'saliendo'

export function BienvenidaScreen() {
  const router = useRouter()
  const [phase, setPhase] = useState<Phase>('video')

  const showMic = useCallback(() => setPhase('microfono'), [])

  const touchMic = () => {
    setPhase('saliendo')
    navigator.vibrate?.(40)
    window.setTimeout(() => router.push('/portal'), 1400)
  }

  return (
    <main className="relative min-h-dvh">
      <h1 className="sr-only">Bienvenida de Juan Colorao</h1>
      <CinematicVideo
        src={ASSETS.video.bienvenida}
        label="Juan Colorao da la bienvenida a San Yallego"
        onEnded={showMic}
        showSkip={phase === 'video'}
      />

      {phase !== 'video' && (
        <div
          className={cn(
            'fixed inset-0 z-20 flex flex-col items-center justify-center gap-8 transition-colors duration-[1400ms]',
            phase === 'saliendo' ? 'bg-black' : 'bg-black/50',
          )}
        >
          <div
            className={cn(
              'flex flex-col items-center gap-8 transition-all duration-1000',
              phase === 'saliendo' ? 'scale-95 opacity-0 blur-sm' : 'animate-sy-fade-in',
            )}
          >
            <p className="font-display text-xs tracking-[0.5em] text-gold/80">TOCA EL MICRÓFONO</p>
            <button
              type="button"
              onClick={touchMic}
              disabled={phase === 'saliendo'}
              aria-label="Tocar el micrófono y entrar a San Yallego"
              className="relative flex size-24 items-center justify-center rounded-full border border-gold/60 text-gold transition-colors hover:bg-gold/10 md:size-28"
            >
              <span className="animate-sy-ripple absolute inset-0 rounded-full border border-gold/40" aria-hidden />
              <span
                className="animate-sy-ripple absolute inset-0 rounded-full border border-gold/30 [animation-delay:1.2s]"
                aria-hidden
              />
              <Mic className="size-9" aria-hidden />
            </button>
          </div>
        </div>
      )}
    </main>
  )
}
