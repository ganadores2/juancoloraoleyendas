'use client'

import { useCallback } from 'react'

interface StageProps {
  aspectRatio: number
  children: React.ReactNode
}

/**
 * Escenario que cubre la pantalla conservando la proporción de la imagen,
 * para que marcadores y objetos ocultos se posicionen en % sobre la imagen.
 * En pantallas verticales se puede deslizar horizontalmente para explorar.
 */
export function Stage({ aspectRatio, children }: StageProps) {
  const centerScroll = useCallback((el: HTMLDivElement | null) => {
    if (el) el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2
  }, [])

  return (
    <div
      ref={centerScroll}
      className="no-scrollbar fixed inset-0 flex items-center overflow-x-auto overflow-y-hidden overscroll-x-contain bg-black"
    >
      <div
        className="relative shrink-0"
        style={{
          width: `max(100vw, calc(100dvh * ${aspectRatio}))`,
          height: `max(100dvh, calc(100vw / ${aspectRatio}))`,
        }}
      >
        {children}
      </div>
    </div>
  )
}
