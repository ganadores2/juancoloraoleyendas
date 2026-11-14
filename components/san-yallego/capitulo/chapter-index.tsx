'use client'

import Link from 'next/link'
import { Lock } from 'lucide-react'
import { useProgress } from '@/hooks/use-san-yallego'
import { type Chapter, chapterHref } from '@/lib/san-yallego/chapters'
import { canOpenBookOneChapter, hasCompletedFirstChapter } from '@/lib/san-yallego/chapter-access.mjs'

/**
 * Índice narrativo: permite ver títulos, pero los capítulos 2–33 se ofrecen
 * al visitante solo después de finalizar el primero en este navegador.
 * No es una barrera de seguridad ni una protección contra descargas directas.
 */
export function ChapterIndex({ chapters }: { chapters: Chapter[] }) {
  const { progress, hydrated } = useProgress()
  const started = hydrated && hasCompletedFirstChapter(progress.completedChapters)

  return (
    <section aria-label="Índice de los capítulos del Libro I">
      {hydrated && !started && (
        <p className="mb-5 rounded-xl border border-gold/30 bg-black/45 px-5 py-4 text-center text-sm leading-relaxed text-foreground/85">
          Comienza con «El Primer Grito». Al terminar de leerlo o escucharlo,
          se abrirán los 32 capítulos restantes de tu aventura.
        </p>
      )}
      {!hydrated && (
        <p role="status" className="mb-5 text-center text-xs text-foreground/65">
          Recuperando tu avance por San Yallego…
        </p>
      )}
      <ol className="grid gap-3" aria-label="Capítulos del Libro I">
        {chapters.map((chapter) => {
          const open = hydrated && canOpenBookOneChapter(chapter.number, progress.completedChapters)
          return (
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
              <div className="flex flex-wrap items-center justify-end gap-3">
                {open ? (
                  <Link href={chapterHref(chapter)}
                    className="inline-flex min-h-11 shrink-0 items-center rounded-full border border-gold/60 px-4 py-2 font-display text-[10px] tracking-[0.12em] text-gold hover:bg-gold/10">
                    {chapter.audio ? 'LEER / ESCUCHAR' : 'LEER'}
                  </Link>
                ) : (
                  <span aria-label={chapter.number === 1 ? 'Cargando tu avance' : 'Completa el capítulo 1 para abrirlo'}
                    className="inline-flex min-h-11 items-center gap-2 rounded-full border border-foreground/20 px-4 py-2 font-display text-[10px] tracking-[0.1em] text-foreground/60">
                    <Lock className="size-3.5" aria-hidden />
                    {chapter.number === 1 ? 'CARGANDO' : 'POR DESCUBRIR'}
                  </span>
                )}
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
