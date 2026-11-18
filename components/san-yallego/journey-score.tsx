'use client'

import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useSound } from '@/hooks/use-san-yallego'

/**
 * BSO Épico: una única capa que sobrevive a las transiciones de Next.js.
 * Desactivada hasta publicar el archivo original autorizado en public/assets/audio/ambiente
 * y activar NEXT_PUBLIC_SAN_YALLEGO_EPICO=enabled SOLO en preview.
 */
const ENABLED = process.env.NEXT_PUBLIC_SAN_YALLEGO_EPICO === 'enabled'
const SRC = '/assets/audio/ambiente/san-yallego-epico-preview.mp3'
const MAX_VOLUME = 0.12 // Bajo las voces; afinar con pruebas reales de mezcla
const FADE_MS = 1800

const isJourney = (path: string) =>
  path === '/' || path === '/bienvenida' || path === '/portal' || path === '/mapa' ||
  path.startsWith('/sitio/') || path.startsWith('/oraculo/')

function targetVolume(path: string) {
  if (path.startsWith('/oraculo/') || path.includes('oraculo')) return 0.035
  if (path.startsWith('/sitio/')) return 0.065
  if (path === '/bienvenida') return 0.045
  return MAX_VOLUME
}

export function JourneyScore() {
  const pathname = usePathname()
  const { soundOn } = useSound()
  const audioRef = useRef<HTMLAudioElement>(null)
  const rafRef = useRef<number | null>(null)
  const [started, setStarted] = useState(false)
  const [blocked, setBlocked] = useState(false)
  const startedRef = useRef(false)

  const fadeTo = useCallback((end: number, pauseAtEnd = false) => {
    const audio = audioRef.current
    if (!audio) return
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    const beginning = audio.volume
    const startAt = performance.now()
    const duration = end === 0 ? FADE_MS : 650
    const step = (now: number) => {
      const fraction = Math.min(1, (now - startAt) / duration)
      audio.volume = Math.max(0, Math.min(1, beginning + (end - beginning) * fraction))
      if (fraction < 1) rafRef.current = requestAnimationFrame(step)
      else {
        rafRef.current = null
        if (pauseAtEnd) audio.pause()
      }
    }
    rafRef.current = requestAnimationFrame(step)
  }, [])

  // El primer gesto en «Comenzar la aventura» habilita la pista sin exigir
  // un toque extra. No reintentar automáticamente si el navegador la bloquea.
  useEffect(() => {
    if (!ENABLED) return
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.('a[href]')
      if (!link || startedRef.current || !soundOn) return
      const href = link.getAttribute('href')
      if (pathname !== '/' || (href !== '/bienvenida' && href !== '/mapa')) return
      const audio = audioRef.current
      if (!audio) return
      audio.volume = 0.04
      void audio.play().then(() => {
        startedRef.current = true
        setStarted(true)
        setBlocked(false)
      }).catch(() => setBlocked(true))
    }
    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [pathname, soundOn])

  // Las rutas de lectura, encuesta y zona privada NO tienen música.
  useEffect(() => {
    if (!ENABLED) return
    const audio = audioRef.current
    if (!audio) return
    if (!isJourney(pathname) || !soundOn) {
      if (!soundOn) {
        if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
        audio.pause()
        audio.volume = 0
      } else fadeTo(0, true)
    } else if (startedRef.current && !audio.paused) {
      fadeTo(targetVolume(pathname))
    }
  }, [pathname, soundOn, fadeTo])

  useEffect(() => () => {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
  }, [])

  if (!ENABLED) return null
  const canControl = isJourney(pathname)
  return (
    <>
      <audio
        ref={audioRef}
        src={SRC}
        preload="none"
        loop
        aria-hidden="true"
        onError={() => setBlocked(true)}
      />
      {canControl && (blocked || started) && (
        <button
          type="button"
          aria-label={blocked ? 'Iniciar música de San Yallego' : 'Pausar o reanudar música de San Yallego'}
          onClick={() => {
            const audio = audioRef.current
            if (!audio) return
            if (!audio.paused) {
              audio.pause()
              setStarted(false)
              return
            }
            if (!soundOn) return
            audio.volume = targetVolume(pathname)
            void audio.play().then(() => {
              startedRef.current = true
              setStarted(true)
              setBlocked(false)
            }).catch(() => setBlocked(true))
          }}
          className="fixed bottom-[calc(8rem+env(safe-area-inset-bottom))] right-4 z-40 rounded-full border border-gold/35 bg-black/80 px-3 py-2 text-[11px] text-gold shadow-lg backdrop-blur-md md:bottom-20 md:right-6"
        >
          {blocked ? '♫ Activar música' : '♫ Música ambiental'}
        </button>
      )}
    </>
  )
}
