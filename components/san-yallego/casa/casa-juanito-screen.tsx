'use client'

import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import { useProgress } from '@/hooks/use-san-yallego'
import { ASSETS, STAGE_ASPECT } from '@/lib/san-yallego/assets'
import { CHAPTERS, chapterHref } from '@/lib/san-yallego/chapters'
import { ORACLES } from '@/lib/san-yallego/oracles'
import { isSiteUnlocked } from '@/lib/san-yallego/progress'
import { getSite, siteLabel } from '@/lib/san-yallego/sites'
import { CinematicImage } from '../cinematic-image'
import { CinematicVideo } from '../cinematic-video'
import { JuanitoFlightVideo } from '../juanito-flight-video'
import { ritualButton } from '../ritual'
import { SealedSite } from '../sealed-site'
import { Stage } from '../stage'

const site = getSite('casa-de-juanito')!
const oracle = ORACLES['oraculo-casa-de-juanito']
const firstChapter = CHAPTERS.find((chapter) => chapter.siteId === site.id)!

type Phase = 'descenso' | 'llegada' | 'hacia-oraculo' | 'oraculo'

export function CasaJuanitoScreen({ skipDescenso = false }: { skipDescenso?: boolean } = {}) {
  const { progress, hydrated, visitSite } = useProgress()
  const [phase, setPhase] = useState<Phase>(skipDescenso ? 'llegada' : 'descenso')
  const unlocked = hydrated && isSiteUnlocked(site, progress)

  useEffect(() => {
    if (unlocked) visitSite(site.id)
  }, [unlocked, visitSite])

  const arrive = useCallback(() => setPhase('llegada'), [])

  if (!hydrated) return <main className="min-h-dvh bg-black" />
  if (!unlocked) return <SealedSite title={siteLabel(site)} />

  return (
    <main className="relative min-h-dvh">
      <h1 className="sr-only">{siteLabel(site)}</h1>

      {phase === 'hacia-oraculo' ? (
        <JuanitoFlightVideo
          src={ASSETS.video.oraculos['casa-de-juanito']}
          label="Camino hacia el Oráculo de Juanito"
          nextLabel="Continuar al capítulo 1"
          onEnded={() => setPhase('oraculo')}
        />
      ) : phase === 'descenso' ? (
        <CinematicVideo
          src={ASSETS.video.descensoCasaJuanito}
          label="Descenso a la Casa donde nació Juanito Colorao"
          onEnded={arrive}
        />
      ) : (
        <Stage aspectRatio={STAGE_ASPECT.oraculo}>
          <CinematicImage
            src={oracle.image}
            alt={oracle.imageAlt}
            className="transition-all duration-[1600ms]"
          />
        </Stage>
      )}

      {phase === 'llegada' && (
        <div className="animate-sy-fade-in fixed inset-0 z-20 flex flex-col items-center justify-center gap-6 bg-gradient-to-t from-black/55 via-transparent to-black/20 px-6 text-center">
          <p className="font-display text-[10px] tracking-[0.5em] text-gold/80">HAS LLEGADO A</p>
          <h2 className="text-balance font-display text-3xl tracking-[0.1em] text-foreground text-glow md:text-5xl">
            {siteLabel(site)}
          </h2>
          <button type="button" onClick={() => setPhase('hacia-oraculo')} className={ritualButton('primary', 'mt-4')}>
            Avanzar hacia el Oráculo
          </button>
        </div>
      )}

      {phase === 'oraculo' && (
        <div className="animate-sy-fade-in fixed inset-x-0 bottom-0 z-20 flex flex-col items-center gap-4 bg-gradient-to-t from-black via-black/70 to-transparent px-6 pb-10 pt-24 [animation-delay:1.2s]">
          <p className="text-center text-xs tracking-[0.15em] text-foreground/70">La historia continúa con la voz de Juan Colorao.</p>
          <Link href={chapterHref(firstChapter)} className={ritualButton('secondary')}>
            Escuchar Capítulo {firstChapter.number} — {firstChapter.title}
          </Link>
        </div>
      )}

      {phase !== 'descenso' && phase !== 'hacia-oraculo' && (
        <nav className="fixed left-4 top-4 z-40 md:left-6 md:top-6">
          <Link href="/mapa" className={ritualButton('quiet', 'px-0')}>
            Volver al mapa
          </Link>
        </nav>
      )}
    </main>
  )
}
