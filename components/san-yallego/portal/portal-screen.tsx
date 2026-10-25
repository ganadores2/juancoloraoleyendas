'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import { useProgress } from '@/hooks/use-san-yallego'
import { ASSETS } from '@/lib/san-yallego/assets'
import { CinematicVideo } from '../cinematic-video'

type Phase = 'transicion' | 'recorrido'

export function PortalScreen() {
  const router = useRouter()
  const { crossPortal } = useProgress()
  const [phase, setPhase] = useState<Phase>('transicion')

  const toAerial = useCallback(() => setPhase('recorrido'), [])
  const toMap = useCallback(() => {
    crossPortal()
    router.push('/mapa')
  }, [crossPortal, router])

  return (
    <main className="relative min-h-dvh">
      <h1 className="sr-only">Portal a San Yallego</h1>
      {phase === 'transicion' ? (
        <CinematicVideo
          key="transicion"
          src={ASSETS.video.portal}
          label="Transición al mundo de San Yallego"
          onEnded={toAerial}
        />
      ) : (
        <CinematicVideo
          key="recorrido"
          src={ASSETS.video.recorridoAereo}
          label="Recorrido aéreo por San Yallego"
          onEnded={toMap}
        />
      )}
    </main>
  )
}
