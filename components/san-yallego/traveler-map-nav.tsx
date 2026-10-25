'use client'

import { Map, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { useProgress } from '@/hooks/use-san-yallego'
import { hasItem, isSiteUnlocked } from '@/lib/san-yallego/progress'
import { SITES, siteLabel } from '@/lib/san-yallego/sites'

const HIDDEN_ROUTES = new Set(['/', '/bienvenida', '/portal'])

export function TravelerMapNav() {
  const pathname = usePathname()
  const { progress, hydrated } = useProgress()
  const [open, setOpen] = useState(false)

  if (!hydrated || HIDDEN_ROUTES.has(pathname) || !hasItem(progress, 'llave-san-yallego')) return null

  return (
    <div className="fixed left-4 top-4 z-50 md:left-6 md:top-6">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={open ? 'Ocultar los caminos de San Yallego' : 'Revelar los caminos de San Yallego'}
        className="flex size-11 items-center justify-center rounded-full border border-copper/45 bg-black/45 text-copper backdrop-blur-md transition-all duration-500 hover:border-gold/70 hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
      >
        {open ? <X className="size-4" aria-hidden /> : <Map className="size-4" aria-hidden />}
      </button>

      {open && (
        <nav
          aria-label="Caminos de San Yallego"
          className="animate-sy-fade-in mt-3 w-[min(20rem,calc(100vw-2rem))] border border-gold/20 bg-black/80 p-4 backdrop-blur-md"
        >
          <p className="mb-3 font-display text-[9px] tracking-[0.42em] text-gold/65">CAMINOS REVELADOS</p>
          <ul className="space-y-1">
            {SITES.map((site) => {
              const unlocked = isSiteUnlocked(site, progress)
              const label = siteLabel(site)
              return (
                <li key={site.id}>
                  {unlocked ? (
                    <Link
                      href={site.id === 'entrada' ? '/sitio/entrada' : `/sitio/${site.id}`}
                      onClick={() => setOpen(false)}
                      className="block py-2 font-display text-[10px] tracking-[0.16em] text-foreground/75 transition-colors hover:text-gold"
                    >
                      {String(site.order).padStart(2, '0')} · {label}
                    </Link>
                  ) : (
                    <span
                      title="San Yallego todavía no te ha mostrado este camino."
                      className="block py-2 font-display text-[10px] tracking-[0.16em] text-foreground/25"
                    >
                      {String(site.order).padStart(2, '0')} · {label}
                    </span>
                  )}
                </li>
              )
            })}
          </ul>
          <Link
            href="/mapa"
            onClick={() => setOpen(false)}
            className="mt-3 block border-t border-gold/15 pt-3 font-display text-[9px] tracking-[0.35em] text-copper transition-colors hover:text-gold"
          >
            ABRIR MAPA COMPLETO
          </Link>
        </nav>
      )}
    </div>
  )
}
