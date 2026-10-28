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
        className="sy-key-symbol size-20 -rotate-45 text-copper [filter:drop-shadow(0_0_14px_var(--gold))] md:size-32"
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
      className="sy-key-image h-28 w-auto max-w-full object-contain md:h-48"
      draggable={false}
    />
  )
}

export function KeyReveal({ justFound }: KeyRevealProps) {
  return (
    <div className="sy-key-overlay fixed inset-0 z-30 overflow-y-auto overscroll-contain bg-black/70 px-4 py-4 text-center backdrop-blur-[2px]">
      <div className="sy-key-layout mx-auto flex min-h-full w-full max-w-4xl flex-col items-center justify-center gap-5 py-3">
        <div className={`sy-key-art ${justFound ? 'animate-sy-key-rise' : 'animate-sy-fade-in'}`}>
          <KeyArt />
        </div>

        <div className="sy-key-content animate-sy-fade-in flex min-w-0 flex-col items-center gap-4 [animation-delay:1.6s]">
        <h2 className="sy-key-title text-balance font-display text-xl tracking-[0.08em] text-gold text-glow md:text-3xl">
          Has encontrado la Llave de San Yallego.
        </h2>

        <div className="sy-key-pass flex flex-col items-center gap-1 border-y border-gold/30 px-3 py-3 sm:px-8">
          <p className="font-display text-[11px] tracking-[0.2em] text-foreground md:text-sm md:tracking-[0.35em]">
            PASE TEMPORAL DE SAN YALLEGO
          </p>
          <p className="text-lg italic text-gold/80">No expira.</p>
        </div>

        <div className="sy-key-actions flex flex-wrap items-center justify-center gap-2 sm:gap-4">
          <Link href="/sitio/casa-de-juanito" className={ritualButton('primary', 'max-w-full px-4 py-3 text-[11px] tracking-[0.15em] sm:px-6')}>
            Ir a la Casa de Juanito
          </Link>
          <Link href="/mapa" className={ritualButton('secondary', 'px-4 py-3 tracking-[0.16em]')}>
            Volver al mapa
          </Link>
        </div>
        </div>
      </div>
    </div>
  )
}
