'use client'

import { Volume2, VolumeX } from 'lucide-react'
import { useHydrated, useSound } from '@/hooks/use-san-yallego'

export function SoundToggle() {
  const { soundOn, toggle } = useSound()
  const hydrated = useHydrated()
  if (!hydrated) return null

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={soundOn}
      aria-label={soundOn ? 'Silenciar sonido' : 'Activar sonido'}
      className="fixed right-4 top-4 z-50 flex items-center gap-2 rounded-full px-3 py-2 font-display text-[10px] tracking-[0.3em] text-foreground/60 transition-colors hover:text-gold focus-visible:text-gold md:right-6 md:top-6"
    >
      {soundOn ? <Volume2 className="size-4" aria-hidden /> : <VolumeX className="size-4" aria-hidden />}
      <span aria-hidden>{soundOn ? 'ON' : 'OFF'}</span>
    </button>
  )
}
