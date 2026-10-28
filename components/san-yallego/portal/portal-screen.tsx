'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import { useProgress } from '@/hooks/use-san-yallego'
import { ASSETS } from '@/lib/san-yallego/assets'
import { JuanitoFlightVideo } from '../juanito-flight-video'

type Phase = 'portal' | 'recorrido'

/** El portal web y el sobrevuelo conducen al Oráculo de la Entrada.
 * Reutiliza el reproductor cinematográfico ya probado en Android.
 */
export function PortalScreen() {
  const router = useRouter()
  const { crossPortal } = useProgress()
  const [phase, setPhase] = useState<Phase>('portal')
  const toAerial = useCallback(() => setPhase('recorrido'), [])
  const toEntranceOracle = useCallback(() => {
    crossPortal()
    router.push('/sitio/entrada')
  }, [crossPortal, router])

  return (
    <main className="relative min-h-dvh bg-black">
      <h1 className="sr-only">Portal a San Yallego</h1>
      {phase === 'portal' ? (
        <JuanitoFlightVideo
          key="portal-web"
          src={ASSETS.video.portal}
          label="Juan Colorao Leyendas, portal web"
          nextLabel="Continuar al sobrevuelo"
          onEnded={toAerial}
        />
      ) : (
        <JuanitoFlightVideo
          key="sobrevuelo-san-yallego"
          src={ASSETS.video.recorridoAereo}
          label="Recorrido aéreo por San Yallego"
          playbackRate={0.85}
          nextLabel="Ir a la Entrada"
          onEnded={toEntranceOracle}
        />
      )}
    </main>
  )
}
