import { cn } from '@/lib/utils'

interface HiddenRingProps {
  x: number
  y: number
  sizePx: number
  state: 'dormida' | 'despertando' | 'abierta'
  onTouch: () => void
}

/**
 * Área táctil centrada en la argolla REAL de la fotografía.
 * No reemplaza ni tapa el herraje original con otro dibujo.
 * El tamaño mínimo facilita su descubrimiento en móvil y teclado.
 */
export function HiddenRing({ x, y, sizePx, state, onTouch }: HiddenRingProps) {
  const target = Math.max(sizePx, 56)

  return (
    <button
      type="button"
      onClick={onTouch}
      disabled={state !== 'dormida'}
      aria-label="Tocar la argolla antigua para extraer la llave"
      title="La piedra también escucha"
      className={cn(
        'absolute z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full',
        'touch-manipulation bg-transparent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold',
        state === 'dormida' && 'cursor-pointer',
      )}
      style={{ left: `${x}%`, top: `${y}%`, width: target, height: target }}
    >
      <span
        aria-hidden
        className={cn(
          'pointer-events-none block size-8 rounded-full border-2 border-gold/20',
          'shadow-[0_0_18px_3px_oklch(0.78_0.14_75/0.12)] transition-[border-color,box-shadow,opacity] duration-500',
          state === 'dormida' && 'animate-sy-ring-reveal hover:border-gold/65',
          state === 'despertando' && 'border-gold shadow-[0_0_35px_10px_oklch(0.88_0.13_80/0.45)]',
          state === 'abierta' && 'border-gold/30 opacity-45',
        )}
      />
    </button>
  )
}
