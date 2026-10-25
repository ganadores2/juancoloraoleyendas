import { cn } from '@/lib/utils'

export function ritualButton(variant: 'primary' | 'secondary' | 'quiet' = 'primary', className?: string) {
  return cn(
    'inline-flex items-center justify-center gap-3 font-display uppercase transition-all duration-500 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold disabled:pointer-events-none disabled:opacity-40',
    variant === 'primary' &&
      'border border-gold/60 bg-black/30 px-8 py-4 text-sm tracking-[0.35em] text-gold backdrop-blur-sm hover:border-gold hover:bg-gold/10 hover:shadow-[0_0_30px_-6px_var(--gold)]',
    variant === 'secondary' &&
      'px-6 py-3 text-xs tracking-[0.35em] text-foreground/75 hover:text-gold',
    variant === 'quiet' &&
      'px-3 py-2 text-[10px] tracking-[0.35em] text-foreground/50 hover:text-foreground/90',
    className,
  )
}
