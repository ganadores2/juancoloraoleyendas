'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useProgress } from '@/hooks/use-san-yallego'
import { STAGE_ASPECT } from '@/lib/san-yallego/assets'
import { ORACLES } from '@/lib/san-yallego/oracles'
import { hasItem } from '@/lib/san-yallego/progress'
import { CinematicImage } from '../cinematic-image'
import { ritualButton } from '../ritual'
import { Stage } from '../stage'
import { HiddenRing } from './hidden-ring'
import { KeyReveal } from './key-reveal'
import { OracleQuestions } from './oracle-questions'

const oracle = ORACLES['oraculo-entrada']
const REVEAL_DURATION_MS = 1800

type Phase = 'explorando' | 'despertando' | 'llave'

export function OraculoEntrada() {
  const { progress, hydrated, findKey, visitSite, answerOracle } = useProgress()
  const [phase, setPhase] = useState<Phase>('explorando')
  const [showPass, setShowPass] = useState(false)
  const alreadyHasKey = hydrated && hasItem(progress, 'llave-san-yallego')

  useEffect(() => {
    visitSite('entrada')
  }, [visitSite])

  const touchRing = () => {
    setPhase('despertando')
    navigator.vibrate?.([30, 40, 30])
    window.setTimeout(() => {
      findKey()
      setPhase('llave')
    }, REVEAL_DURATION_MS)
  }

  const ringState = phase === 'despertando' ? 'despertando' : alreadyHasKey || phase === 'llave' ? 'abierta' : 'dormida'

  return (
    <main className="relative min-h-dvh">
      <h1 className="sr-only">Oráculo de la Entrada a San Yallego</h1>
      <Stage aspectRatio={STAGE_ASPECT.oraculo}>
        <CinematicImage src={oracle.image} alt={oracle.imageAlt} />
        {oracle.hiddenRing && hydrated && (
          <HiddenRing {...oracle.hiddenRing} state={ringState} onTouch={touchRing} />
        )}
      </Stage>

      <nav className="fixed left-4 top-4 z-40 md:left-6 md:top-6">
        <Link href="/mapa" className={ritualButton('quiet', 'px-0')}>
          Volver al mapa
        </Link>
      </nav>

      {hydrated && phase === 'explorando' && !alreadyHasKey && (
        <OracleQuestions
          questions={oracle.questions}
          closingLine={oracle.closingLine}
          onAnswer={(index, answer) => answerOracle(oracle.id, index, answer)}
        />
      )}

      {phase === 'llave' && <KeyReveal justFound />}

      {alreadyHasKey && phase === 'explorando' && (
        <div className="fixed inset-x-0 bottom-10 z-20 flex justify-center">
          {showPass ? (
            <KeyReveal justFound={false} />
          ) : (
            <button type="button" onClick={() => setShowPass(true)} className={ritualButton('secondary')}>
              Ver tu Pase de San Yallego
            </button>
          )}
        </div>
      )}
    </main>
  )
}
