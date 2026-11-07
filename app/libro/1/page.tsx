import type { Metadata } from 'next'
import Link from 'next/link'
import { CHAPTERS, chapterHref } from '@/lib/san-yallego/chapters'
import { ritualButton } from '@/components/san-yallego/ritual'

export const metadata: Metadata = {
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
            Índice oficial de los 33 capítulos. Las grabaciones se irán incorporando
            al sitio sin alterar el texto ni el orden original del libro.
          </p>
        </header>

        <ol className="grid gap-3" aria-label="Capítulos del Libro I">
          {chapters.map((chapter) => (
            <li key={chapter.id}
              className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-gold/20 bg-black/50 px-5 py-4">
              <div className="flex min-w-0 flex-1 items-center gap-4">
                <span className="w-9 shrink-0 font-display text-xs tabular-nums text-gold/75">
                  {String(chapter.number).padStart(2, '0')}
                </span>
                <span className="font-display text-sm leading-relaxed text-foreground/90 sm:text-base">
                  {chapter.title}
                </span>
              </div>
              {chapter.audio ? (
                <Link href={chapterHref(chapter)}
                  className="inline-flex min-h-11 shrink-0 items-center rounded-full border border-gold/60 px-4 py-2 font-display text-[10px] tracking-[0.12em] text-gold hover:bg-gold/10">
                  ESCUCHAR
                </Link>
              ) : (
                <span className="text-right text-[11px] leading-relaxed text-foreground/55">
                  MP3 por incorporar
                </span>
              )}
            </li>
          ))}
        </ol>

        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/mapa" className={ritualButton('secondary', 'min-h-12 tracking-[0.14em]')}>
            Regresar al mapa
          </Link>
        </div>
      </div>
    </main>
  )
}
