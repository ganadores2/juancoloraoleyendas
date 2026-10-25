import Link from 'next/link'
import { LOCKED_PATH_MESSAGE } from '@/lib/san-yallego/sites'
import { ritualButton } from './ritual'

export function SealedSite({ title }: { title: string }) {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-8 bg-[radial-gradient(ellipse_at_center,oklch(0.18_0.02_50)_0%,var(--night)_70%)] px-6 text-center">
      <h1 className="font-display text-xs tracking-[0.5em] text-foreground/50">{title.toUpperCase()}</h1>
      <p className="animate-sy-fade-in max-w-md text-balance text-2xl italic text-foreground/90 text-glow md:text-3xl">
        {LOCKED_PATH_MESSAGE}
      </p>
      <Link href="/mapa" className={ritualButton('secondary')}>
        Volver al mapa
      </Link>
    </main>
  )
}
