'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { useProgress } from '@/hooks/use-san-yallego'
import { ASSETS, STAGE_ASPECT } from '@/lib/san-yallego/assets'
import { ORACLES } from '@/lib/san-yallego/oracles'
import { hasCompletedEntranceOracle, hasItem } from '@/lib/san-yallego/progress'
import { CinematicImage } from '../cinematic-image'
import { ritualButton } from '../ritual'
import { Stage } from '../stage'
import { HiddenRing } from './hidden-ring'
import { KeyReveal } from './key-reveal'
import { OracleQuestions } from './oracle-questions'

const oracle = ORACLES['oraculo-entrada']
const REVEAL_DURATION_MS = 950

type Phase = 'explorando' | 'despertando' | 'llave'

export function OraculoEntrada() {
  const { progress, hydrated, findKey, visitSite, answerOracle } = useProgress()
  const [phase, setPhase] = useState<Phase>('explorando')
  const [showPass, setShowPass] = useState(false)
  // La fotografía ampliada es opcional en el PR; no romper el sitio si aún falta en public/.
  const [expandedReady, setExpandedReady] = useState(false)
  const [expandedMissing, setExpandedMissing] = useState(false)
  const discoveryStarted = useRef(false)
  const revealTimer = useRef<number | null>(null)
  const alreadyHasKey = hydrated && hasItem(progress, 'llave-san-yallego')
  const questionsComplete = hydrated && hasCompletedEntranceOracle(progress)

  useEffect(() => {
    visitSite('entrada')
  }, [visitSite])

  useEffect(() => () => {
    if (revealTimer.current !== null) window.clearTimeout(revealTimer.current)
  }, [])

  const touchRing = () => {
    if (discoveryStarted.current || alreadyHasKey || !questionsComplete) return
    discoveryStarted.current = true
    setPhase('despertando')
    navigator.vibrate?.([30, 40, 30])
    revealTimer.current = window.setTimeout(() => {
      findKey()
      setPhase('llave')
      revealTimer.current = null
    }, REVEAL_DURATION_MS)
  }

  const ringState = phase === 'despertando' ? 'despertando' : alreadyHasKey || phase === 'llave' ? 'abierta' : 'dormida'

  return (
    <main className="relative min-h-dvh">
      <h1 className="sr-only">Oráculo de la Entrada a San Yallego</h1>
      <Stage aspectRatio={STAGE_ASPECT.oraculo}>
        <CinematicImage src={oracle.image} alt={oracle.imageAlt} />
        {!expandedMissing && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={ASSETS.images.oraculoEntradaLlaveOculta}
            alt=""
            aria-hidden="true"
            draggable={false}
            onLoad={() => setExpandedReady(true)}
            onError={() => {
              setExpandedMissing(true)
              setExpandedReady(false)
            }}
            className={`absolute inset-0 size-full object-cover transition-opacity duration-500 ${expandedReady ? 'opacity-100' : 'opacity-0'}`}
          />
        )}
        {oracle.hiddenRing && hydrated && (questionsComplete || alreadyHasKey) && (
          <HiddenRing
            {...(expandedReady ? (oracle.hiddenRingOnExpandedImage ?? oracle.hiddenRing) : oracle.hiddenRing)}
            state={ringState}
            onTouch={touchRing}
          />
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
          onDiscover={touchRing}
        />
      )}

      {phase === 'despertando' && (
        <div role="status" aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-10 z-30 flex justify-center px-4">
          <p className="rounded-lg border border-gold/50 bg-black/85 px-5 py-3 text-center text-sm text-gold shadow-lg">
            La piedra ha respondido…
          </p>
        </div>
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
