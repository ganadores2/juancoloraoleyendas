'use client'

import { Compass, KeyRound, X } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { useProgress, useWhisper } from '@/hooks/use-san-yallego'
import { ASSETS, STAGE_ASPECT } from '@/lib/san-yallego/assets'
import { hasItem, isSiteUnlocked } from '@/lib/san-yallego/progress'
import { LOCKED_PATH_MESSAGE, SITES } from '@/lib/san-yallego/sites'
import { CinematicImage } from '../cinematic-image'
import { Stage } from '../stage'
import { Whisper } from '../whisper'
import { SiteMarker } from './site-marker'

export function MapaScreen() {
  const { progress, hydrated } = useProgress()
  const { message, nonce, whisper } = useWhisper()
  const [guideDismissed, setGuideDismissed] = useState(false)
  const hasKey = hydrated && hasItem(progress, 'llave-san-yallego')
  const needsFirstPath = hydrated && !hasKey
  const needsJuanitoPath = hydrated && hasKey && !progress.visitedSites.includes('casa-de-juanito')

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

      {!guideDismissed && (needsFirstPath || needsJuanitoPath) && (
        <aside
          aria-label="Una señal para comenzar el viaje"
          className="animate-sy-fade-in fixed right-4 top-20 z-40 w-[min(18rem,calc(100vw-2rem))] max-h-[calc(100dvh-6rem)] overflow-y-auto border border-gold/35 bg-black/85 px-4 pb-4 pt-4 text-left shadow-[0_8px_40px_oklch(0_0_0/0.6)] backdrop-blur-md md:right-6 md:top-24"
        >
          <button
            type="button"
            onClick={() => setGuideDismissed(true)}
            aria-label="Ocultar señal del mapa"
            className="absolute right-2 top-2 flex size-9 items-center justify-center rounded-full text-foreground/60 hover:text-gold focus-visible:outline-2 focus-visible:outline-gold"
          >
            <X className="size-4" aria-hidden />
          </button>
          <div className="mb-3 flex items-center gap-2 pr-8 text-gold/90">
            <Compass className="size-4 shrink-0" aria-hidden />
            <p className="font-display text-[10px] tracking-[0.19em]">
              {needsFirstPath ? 'EL PRIMER CAMINO' : 'UN CAMINO REVELADO'}
            </p>
          </div>
          <p className="mb-4 text-pretty text-base leading-snug italic text-foreground/90">
            {needsFirstPath
              ? 'Todo viaje comienza en una entrada. Sigue las luces doradas y escucha lo que el pueblo quiera contarte.'
              : 'La llave ha abierto un nuevo camino. Una pequeña casa guarda el comienzo de una gran historia.'}
          </p>
          <Link
            href={needsFirstPath ? '/sitio/entrada' : '/sitio/casa-de-juanito'}
            className="inline-flex min-h-11 w-full items-center justify-center border border-gold/60 px-3 py-2 text-center font-display text-[10px] tracking-[0.13em] text-gold transition-colors hover:bg-gold/10"
          >
            {needsFirstPath ? 'Caminar hacia la Entrada' : 'Visitar la Casa de Juanito'}
          </Link>
          <p className="mt-3 text-center text-[11px] italic text-foreground/55">
            También puedes tocar los lugares iluminados del mapa.
          </p>
        </aside>
      )}

      {/*
        Entrada visible pero discreta; la autorización se verifica en el servidor
        dentro de /guardian. Esta ruta NO modifica progreso ni desbloquea sitios.
      */}
      <nav
        aria-label="Acceso privado del creador"
        className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-4 z-30 md:bottom-6 md:right-6"
      >
        <Link
          href="/guardian"
          title="Entrada privada · requiere Llave Maestra"
          className="inline-flex min-h-11 max-w-[calc(100vw-2rem)] items-center gap-2 rounded-full border border-copper/35 bg-black/75 px-4 py-2 text-[11px] tracking-[0.09em] text-foreground/75 shadow-lg backdrop-blur-md transition-colors hover:border-gold/60 hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
        >
          <KeyRound className="size-4 shrink-0 text-copper" aria-hidden="true" />
          <span>El Taller del Creador</span>
        </Link>
      </nav>

      <Whisper message={message} nonce={nonce} />
    </main>
  )
}
