'use client'

import { useCallback, useState } from 'react'
import { cn } from '@/lib/utils'
import { MediaPlaceholder } from './media-placeholder'

interface CinematicImageProps {
  src: string
  alt: string
  className?: string
}

export function CinematicImage({ src, alt, className }: CinematicImageProps) {
  const [missing, setMissing] = useState(false)

  // El error puede ocurrir antes de la hidratación; se verifica al montar.
  const checkLoaded = useCallback((img: HTMLImageElement | null) => {
    if (img?.complete && img.naturalWidth === 0) setMissing(true)
  }, [])

  if (missing) return <MediaPlaceholder kind="imagen" path={src} />

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={checkLoaded}
      src={src}
      alt={alt}
      onError={() => setMissing(true)}
      className={cn('absolute inset-0 size-full object-cover', className)}
      draggable={false}
    />
  )
}
