import { Lock } from 'lucide-react'
import Link from 'next/link'
import { type MythicSite, siteLabel } from '@/lib/san-yallego/sites'
import { cn } from '@/lib/utils'

interface SiteMarkerProps {
  site: MythicSite
  unlocked: boolean
  visited: boolean
  onLocked: () => void
}

export function SiteMarker({ site, unlocked, visited, onLocked }: SiteMarkerProps) {
  const label = siteLabel(site)
  const className =
    'group absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 p-2 focus-visible:outline-none'
  const style = { left: `${site.map.x}%`, top: `${site.map.y}%` }

  const content = (
    <>
      <span className="relative flex size-5 items-center justify-center" aria-hidden>
        {unlocked ? (
          <>
            <span className="animate-sy-ripple absolute inset-0 rounded-full border border-gold/60" />
            <span
              className={cn(
                'size-3 rounded-full bg-gold shadow-[0_0_16px_4px_var(--gold)] transition-transform group-hover:scale-125',
                visited && 'bg-copper shadow-[0_0_10px_2px_var(--copper)]',
              )}
            />
          </>
        ) : (
          <span className="flex size-5 items-center justify-center rounded-full border border-foreground/25 bg-black/50">
            <Lock className="size-2.5 text-foreground/40" />
          </span>
        )}
      </span>
      <span
        className={cn(
          'whitespace-nowrap font-display text-[10px] tracking-[0.2em] transition-colors md:text-xs',
          unlocked
            ? 'text-foreground text-glow group-hover:text-gold group-focus-visible:text-gold'
            : 'text-foreground/40 group-hover:text-foreground/70',
        )}
      >
        {label}
      </span>
    </>
  )

  if (unlocked) {
    return (
      <Link href={`/sitio/${site.id}`} className={className} style={style}>
        {content}
      </Link>
    )
  }

  return (
    <button
      type="button"
      onClick={onLocked}
      className={className}
      style={style}
      aria-label={`${label} — camino cerrado`}
    >
      {content}
    </button>
  )
}
