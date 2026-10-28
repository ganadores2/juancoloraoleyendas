'use client'

import Link from 'next/link'
import { useCallback, useState, type ReactNode } from 'react'
import { useProgress } from '@/hooks/use-san-yallego'
import { ASSETS } from '@/lib/san-yallego/assets'
import { isSiteUnlocked } from '@/lib/san-yallego/progress'
import { getSite, siteLabel, type SiteId } from '@/lib/san-yallego/sites'
import { CinematicVideo } from './cinematic-video'
import { ritualButton } from './ritual'
import { SealedSite } from './sealed-site'

type Phase = 'inicio' | 'descenso' | 'hacia-oraculo' | 'destino'

/** Reproduce los dos tramos antes de entregar el control a la experiencia del sitio.
 * No abre lugares sellados ni modifica el progreso del visitante.
 */
export function SiteJourney({ siteId, children }: { siteId: SiteId; children: ReactNode }) {
  const { progress, hydrated } = useProgress()
  const [phase, setPhase] = useState<Phase>(siteId === 'casa-de-juanito' ? 'inicio' : 'descenso')
  const [descentError, setDescentError] = useState(false)
  const toOracle = useCallback(() => setPhase(siteId === 'casa-de-juanito' ? 'destino' : 'hacia-oraculo'), [siteId])
  const arrive = useCallback(() => setPhase('destino'), [])
  const site = getSite(siteId)

  if (!site) return null
  if (!hydrated) return <main className="min-h-dvh bg-black" />
  if (!isSiteUnlocked(site, progress)) return <SealedSite title={siteLabel(site)} />

  if (phase === 'destino') return <>{children}</>

  // Juanito: el visitante inicia voluntariamente el primer vuelo.
  if (phase === 'inicio') return (
    <main className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-black">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={ASSETS.images.mapa} alt="Mapa de San Yallego" className="absolute inset-0 size-full object-cover opacity-75" />
      <div className="absolute inset-0 bg-black/35" />
      <div className="relative z-10 flex flex-col items-center gap-6 px-6 text-center">
        <h1 className="font-display text-2xl tracking-[0.12em] text-foreground text-glow md:text-4xl">
          La casa de Juanito Colorao
        </h1>
        <button type="button" onClick={() => setPhase('descenso')} className={ritualButton('primary')}>
          Iniciar descenso a la casa
        </button>
        <Link href="/mapa" className={ritualButton('quiet')}>Volver al mapa</Link>
      </div>
    </main>
  )

  // Para Juanito usamos el mismo reproductor nativo que ya funciona en su segundo video.
  // No avanzamos al oráculo hasta que este primer descenso termine o el visitante pulse continuar.
  if (siteId === 'casa-de-juanito' && phase === 'descenso') return (
    <main className="fixed inset-0 flex flex-col items-center justify-center bg-black">
      <h1 className="sr-only">Descenso a la Casa de Juanito Colorao</h1>
      <video
        key="descenso-casa-juanito"
        src={ASSETS.video.descensos['casa-de-juanito']}
        className="min-h-0 w-full flex-1 object-contain"
        autoPlay
        muted
        playsInline
        controls
        preload="auto"
        onEnded={toOracle}
        onError={() => setDescentError(true)}
        onPlaying={() => setDescentError(false)}
        aria-label="Vuelo desde el mapa hasta la Casa de Juanito"
      />
      {descentError && (
        <p role="alert" className="px-4 pt-3 text-center text-sm text-amber-200">
          El navegador no pudo reproducir el descenso. Abre el archivo directamente para comprobar si carga o si necesita un formato compatible.
        </p>
      )}
      <div className="flex flex-wrap items-center justify-center gap-4 bg-black px-4 py-3 text-center">
        <a
          href={ASSETS.video.descensos['casa-de-juanito']}
          target="_blank"
          rel="noopener noreferrer"
          className={ritualButton('secondary')}
        >
          Abrir descenso directamente
        </a>
        <button type="button" onClick={toOracle} className={ritualButton('quiet')}>
          Continuar después del vuelo
        </button>
      </div>
    </main>
  )

  const isDescent = phase === 'descenso'
  const src = isDescent ? ASSETS.video.descensos[siteId] : ASSETS.video.oraculos[siteId]

  return (
    <main className="relative min-h-dvh bg-black">
      <h1 className="sr-only">{siteLabel(site)}</h1>
      <CinematicVideo
        key={phase}
        src={src}
        label={isDescent ? `Descenso a ${siteLabel(site)}` : `Camino al Oráculo de ${siteLabel(site)}`}
        onEnded={isDescent ? toOracle : arrive}
      />
      <nav className="fixed left-4 top-4 z-40 md:left-6 md:top-6">
        <Link href="/mapa" className={ritualButton('quiet', 'px-0')}>
          Volver al mapa
        </Link>
      </nav>
    </main>
  )
}
