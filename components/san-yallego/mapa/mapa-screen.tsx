'use client'

import Link from 'next/link'
import { useProgress, useWhisper } from '@/hooks/use-san-yallego'
import { ASSETS, STAGE_ASPECT } from '@/lib/san-yallego/assets'
import { isSiteUnlocked } from '@/lib/san-yallego/progress'
import { LOCKED_PATH_MESSAGE, SITES } from '@/lib/san-yallego/sites'
import { CinematicImage } from '../cinematic-image'
import { Stage } from '../stage'
import { Whisper } from '../whisper'
import { SiteMarker } from './site-marker'

export function MapaScreen() {
  const { progress, hydrated } = useProgress()
  const { message, nonce, whisper } = useWhisper()

  return (
    <main className="relative min-h-dvh">
      <Stage aspectRatio={STAGE_ASPECT.mapa}>
        <CinematicImage src={ASSETS.images.mapa} alt="Mapa Fantástico de San Yallego" />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,oklch(0_0_0/0.7)_100%)]"
          aria-hidden
        />
        {hydrated && (
          <ul aria-label="Lugares míticos de San Yallego">
            {SITES.map((site) => (
              <li key={site.id}>
                <SiteMarker
                  site={site}
                  unlocked={isSiteUnlocked(site, progress)}
                  visited={progress.visitedSites.includes(site.id)}
                  onLocked={() => whisper(LOCKED_PATH_MESSAGE)}
                />
              </li>
            ))}
          </ul>
        )}
      </Stage>

      <header className="pointer-events-none fixed left-4 top-4 z-30 md:left-6 md:top-6">
        <Link
          href="/"
          className="pointer-events-auto font-display text-[10px] tracking-[0.4em] text-foreground/60 transition-colors hover:text-gold"
        >
          JUAN COLORAO · LEYENDAS
        </Link>
        <h1 className="mt-2 font-display text-sm tracking-[0.25em] text-gold text-glow md:text-base">
          Mapa Fantástico de San Yallego
        </h1>
      </header>

      <Whisper message={message} nonce={nonce} />
    </main>
  )
}
