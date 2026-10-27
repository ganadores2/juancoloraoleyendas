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

type Phase = 'descenso' | 'hacia-oraculo' | 'destino'

/** Reproduce los dos tramos antes de entregar el control a la experiencia del sitio.
 * No abre lugares sellados ni modifica el progreso del visitante.
 */
export function SiteJourney({ siteId, children }: { siteId: SiteId; children: ReactNode }) {
  const { progress, hydrated } = useProgress()
  const [phase, setPhase] = useState<Phase>('descenso')
  const toOracle = useCallback(() => setPhase(siteId === 'casa-de-juanito' ? 'destino' : 'hacia-oraculo'), [siteId])
  const arrive = useCallback(() => setPhase('destino'), [])
  const site = getSite(siteId)

  if (!site) return null
  if (!hydrated) return <main className="min-h-dvh bg-black" />
  if (!isSiteUnlocked(site, progress)) return <SealedSite title={siteLabel(site)} />

  if (phase === 'destino') return <>{children}</>

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
