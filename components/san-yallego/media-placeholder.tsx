import { cn } from '@/lib/utils'

interface MediaPlaceholderProps {
  kind: 'imagen' | 'video' | 'audio'
  path: string
  className?: string
}

/** Fondo mínimo mientras el asset definitivo no está en /public. */
export function MediaPlaceholder({ kind, path, className }: MediaPlaceholderProps) {
  return (
    <div
      className={cn(
        'absolute inset-0 bg-[radial-gradient(ellipse_at_50%_70%,oklch(0.26_0.05_45)_0%,oklch(0.14_0.02_50)_45%,oklch(0.08_0.01_50)_100%)]',
        className,
      )}
      role="img"
      aria-label={`${kind} pendiente`}
    >
      <p className="absolute bottom-4 left-4 max-w-[80%] truncate font-display text-[9px] uppercase tracking-[0.25em] text-foreground/30">
        {kind} pendiente · {path}
      </p>
    </div>
  )
}
