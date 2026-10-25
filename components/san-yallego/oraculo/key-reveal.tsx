'use client'

import { KeyRound } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { ASSETS } from '@/lib/san-yallego/assets'
import { ritualButton } from '../ritual'

interface KeyRevealProps {
  justFound: boolean
}

function KeyArt() {
  const [missing, setMissing] = useState(false)
  if (missing) {
    return (
      <KeyRound
        className="size-28 -rotate-45 text-copper [filter:drop-shadow(0_0_14px_var(--gold))] md:size-36"
        strokeWidth={1.25}
        aria-hidden
      />
    )
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={(img) => {
        if (img?.complete && img.naturalWidth === 0) setMissing(true)
      }}
      src={ASSETS.images.llave}
      alt=""
      onError={() => setMissing(true)}
      className="h-40 w-auto object-contain md:h-56"
      draggable={false}
    />
  )
}

export function KeyReveal({ justFound }: KeyRevealProps) {
  return (
    <div className="fixed inset-0 z-30 flex flex-col items-center justify-center gap-8 bg-black/60 px-6 text-center backdrop-blur-[2px]">
      <div className={justFound ? 'animate-sy-key-rise' : 'animate-sy-fade-in'}>
        <KeyArt />
      </div>

      <div className="animate-sy-fade-in flex flex-col items-center gap-6 [animation-delay:1.6s]">
        <h2 className="text-balance font-display text-2xl tracking-[0.12em] text-gold text-glow md:text-4xl">
          Has encontrado la Llave de San Yallego.
        </h2>

        <div className="flex flex-col items-center gap-1 border-y border-gold/30 px-8 py-4">
          <p className="font-display text-xs tracking-[0.45em] text-foreground md:text-sm">
            PASE TEMPORAL DE SAN YALLEGO
          </p>
          <p className="text-lg italic text-gold/80">No expira.</p>
        </div>

        <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-6">
          <Link href="/sitio/casa-de-juanito" className={ritualButton('primary')}>
            Ir a la Casa de Juanito
          </Link>
          <Link href="/mapa" className={ritualButton('secondary')}>
            Volver al mapa
          </Link>
        </div>
      </div>
    </div>
  )
}
