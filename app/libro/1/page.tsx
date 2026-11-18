import type { Metadata } from 'next'
import Link from 'next/link'
import { CHAPTERS } from '@/lib/san-yallego/chapters'
import { ChapterIndex } from '@/components/san-yallego/capitulo/chapter-index'
import { ritualButton } from '@/components/san-yallego/ritual'

export const metadata: Metadata = {
  alternates: { canonical: '/libro/1' },
  title: 'El Gran Cambio — 33 capítulos | Juan Colorao Leyendas',
  description: 'Índice oficial del Libro I de Juan Colorao Leyendas, El Gran Cambio.',
}

export default function LibroUnoPage() {
  const chapters = CHAPTERS.filter((chapter) => chapter.book === 1)

  return (
    <main className="relative min-h-dvh bg-[radial-gradient(ellipse_at_50%_10%,oklch(0.2_0.04_40)_0%,var(--night)_70%)] px-4 py-20 text-foreground sm:px-8">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
        <header className="flex flex-col items-center gap-4 text-center">
          <p className="font-display text-[11px] tracking-[0.3em] text-gold/70">
            JUAN COLORAO · LEYENDAS · LIBRO I
          </p>
          <h1 className="font-display text-3xl tracking-[0.12em] text-gold text-glow sm:text-5xl">
            EL GRAN CAMBIO
          </h1>
          <p className="max-w-xl text-balance text-sm leading-relaxed text-foreground/75">
            El Libro I contiene 33 capítulos para leer y escuchar. Comienza con «El Primer Grito»: al terminarlo, podrás descubrir los 32 restantes, o vivir primero el recorrido cinematográfico de San Yallego.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/bienvenida" className={ritualButton('secondary', 'min-h-11 tracking-[0.14em]')}>
              Vivir el recorrido cinematográfico
            </Link>
            <Link href="/glosario" className={ritualButton('secondary', 'min-h-11 tracking-[0.12em]')}>
              Consultar el Archivo de Palabras
            </Link>
          </div>
        </header>

        <ChapterIndex chapters={chapters} />

        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/mapa" className={ritualButton('secondary', 'min-h-12 tracking-[0.14em]')}>
            Regresar al mapa
          </Link>
          <Link href="/opinion" className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#B5E8BE]/70 bg-black/55 px-5 py-3 text-center text-sm text-[#D8F4DE] transition-colors hover:border-[#B5E8BE] hover:bg-black/75 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B5E8BE]">
            Tu opinión
          </Link>
        </div>
      </div>
    </main>
  )
}
