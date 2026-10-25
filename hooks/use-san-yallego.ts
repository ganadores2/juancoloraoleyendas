'use client'

import { useCallback, useMemo, useRef, useState, useSyncExternalStore } from 'react'
import { progressStore, transitions } from '@/lib/san-yallego/progress'
import { soundStore } from '@/lib/san-yallego/sound'

const noopSubscribe = () => () => {}

export function useHydrated() {
  return useSyncExternalStore(noopSubscribe, () => true, () => false)
}

export function useProgress() {
  const progress = useSyncExternalStore(
    progressStore.subscribe,
    progressStore.getSnapshot,
    progressStore.getServerSnapshot,
  )
  const hydrated = useHydrated()

  const actions = useMemo(
    () => ({
      crossPortal: () => progressStore.update(transitions.crossPortal),
      findKey: () => progressStore.update(transitions.findKey),
      visitSite: (...args: Parameters<typeof transitions.visitSite>) =>
        progressStore.update(transitions.visitSite(...args)),
      completeChapter: (...args: Parameters<typeof transitions.completeChapter>) =>
        progressStore.update(transitions.completeChapter(...args)),
      answerOracle: (...args: Parameters<typeof transitions.answerOracle>) =>
        progressStore.update(transitions.answerOracle(...args)),
      reset: () => progressStore.reset(),
    }),
    [],
  )

  return { progress, hydrated, ...actions }
}

export function useSound() {
  const { on } = useSyncExternalStore(
    soundStore.subscribe,
    soundStore.getSnapshot,
    soundStore.getServerSnapshot,
  )
  const toggle = useCallback(() => soundStore.update((s) => ({ on: !s.on })), [])
  return { soundOn: on, toggle }
}

export function useWhisper(durationMs = 3800) {
  const [message, setMessage] = useState<string | null>(null)
  const [nonce, setNonce] = useState(0)
  const timer = useRef<number | undefined>(undefined)

  const whisper = useCallback(
    (text: string) => {
      window.clearTimeout(timer.current)
      setMessage(text)
      setNonce((n) => n + 1)
      timer.current = window.setTimeout(() => setMessage(null), durationMs)
    },
    [durationMs],
  )

  return { message, nonce, whisper }
}
