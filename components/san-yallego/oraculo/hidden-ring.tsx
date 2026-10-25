import { cn } from '@/lib/utils'

interface HiddenRingProps {
  x: number
  y: number
  sizePx: number
  state: 'dormida' | 'despertando' | 'abierta'
  onTouch: () => void
}

/** Argolla antigua incrustada en la piedra: parece herraje, adorno o desagüe. */
export function HiddenRing({ x, y, sizePx, state, onTouch }: HiddenRingProps) {
  return (
    <button
      type="button"
      onClick={onTouch}
      disabled={state !== 'dormida'}
      aria-label="Argolla antigua en la piedra"
      className="absolute -translate-x-1/2 -translate-y-1/2 p-3 focus-visible:outline-none [&:focus-visible>span]:ring-2 [&:focus-visible>span]:ring-gold/60"
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      <span
        className={cn(
          'block rounded-full border-[3px] transition-[border-color,opacity] duration-700',
          'border-[oklch(0.42_0.04_55)] bg-[radial-gradient(circle,oklch(0.1_0.01_50)_45%,oklch(0.22_0.03_55)_60%,transparent_62%)] opacity-80 shadow-[inset_0_1px_2px_oklch(0_0_0/0.8),0_1px_0_oklch(1_0_0/0.08)]',
          state === 'despertando' && 'animate-sy-ring-reveal border-gold opacity-100',
          state === 'abierta' && 'border-gold/70 opacity-100 shadow-[0_0_14px_2px_oklch(0.8_0.12_82/0.35)]',
        )}
        style={{ width: sizePx, height: sizePx }}
        aria-hidden
      />
    </button>
  )
}
