import Link from 'next/link'
import { ASSETS } from '@/lib/san-yallego/assets'
import { CinematicImage } from '../cinematic-image'
import { ritualButton } from '../ritual'

/** La puerta principal conduce a contenido ya publicado:
 * el mapa, los vuelos y el Oráculo de la Entrada.
 * Las películas de bienvenida preliminares esperan sus archivos definitivos.
 */
export function HomeScreen() {
  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6 py-12 text-center">
      <div className="absolute inset-0" aria-hidden>
        <CinematicImage src={ASSETS.images.mapa} alt="" className="scale-105" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0_0_0/0.45)_0%,oklch(0_0_0/0.85)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 to-transparent" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-8">
        <header className="animate-sy-fade-in flex flex-col items-center gap-3">
          <p className="font-display text-[11px] tracking-[0.4em] text-gold/85 sm:tracking-[0.6em]">
            JUAN COLORAO · LEYENDAS
          </p>
          <span className="h-px w-16 bg-gold/40" aria-hidden />
        </header>

        <div className="animate-sy-fade-in flex flex-col items-center gap-5 [animation-delay:400ms]">
          <h1 className="text-balance font-display text-3xl leading-tight tracking-[0.1em] text-foreground text-glow sm:text-4xl md:text-6xl">
            BIENVENIDO A SAN YALLEGO
          </h1>
          <p className="max-w-xl text-balance text-xl italic text-foreground/90 md:text-2xl">
            Aquí las leyendas no se cuentan. Se descubren.
          </p>
        </div>

        <div className="animate-sy-fade-in flex flex-col items-center gap-4 [animation-delay:900ms]">
          <Link href="/mapa" className={ritualButton('primary', 'max-w-full px-6 py-4 text-xs tracking-[0.2em] sm:px-8 sm:text-sm')}>
            Comenzar la aventura
          </Link>
          <p className="max-w-sm text-balance text-sm italic text-foreground/70">
            Tu primer camino comienza en el mapa. Mira con atención: San Yallego tiene sus propias señales.
          </p>
        </div>
      </div>
    </main>
  )
}
