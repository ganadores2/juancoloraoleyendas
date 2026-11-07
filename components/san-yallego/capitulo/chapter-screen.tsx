'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useProgress, useWhisper } from '@/hooks/use-san-yallego'
import { type Chapter } from '@/lib/san-yallego/chapters'
import { CHAPTER_ONE_TEXT } from '@/lib/san-yallego/chapter-one-text'
import { getSite, LOCKED_PATH_MESSAGE, siteLabel } from '@/lib/san-yallego/sites'
import { ritualButton } from '../ritual'
import { Whisper } from '../whisper'
import { AudioPlayer } from './audio-player'
import { ChapterPaths } from './chapter-paths'
import { ImmersiveReader } from './immersive-reader'

export function ChapterScreen({ chapter }: { chapter: Chapter }) {
  const { progress, hydrated, completeChapter } = useProgress()
  const { message, nonce, whisper } = useWhisper()
  const [justFinished, setJustFinished] = useState(false)
  const [mode, setMode] = useState<'escuchar' | 'leer'>('escuchar')
  const canRead = chapter.book === 1 && chapter.number === 1

  const chooseMode = (next: 'escuchar' | 'leer') => {
    setMode(next)
    window.scrollTo({ top: 0, behavior: 'auto' })
  }

  const markRead = () => {
    completeChapter(chapter.id)
    setJustFinished(true)
    window.requestAnimationFrame(() => {
      document.getElementById('caminos-tras-capitulo')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }
  const site = getSite(chapter.siteId)!

  if (!hydrated) return <main className="min-h-dvh bg-black" />
  // Las rutas del audiolibro son públicas desde el índice oficial.
  // Los oráculos y el acceso a los sitios siguen protegidos en sus propias rutas.
  // Así no se obliga a repetir los vuelos al cambiar de vista previa de Vercel.
  const completed = justFinished || progress.completedChapters.includes(chapter.id)
  const heading = `CAPÍTULO ${chapter.number} — ${chapter.title.toUpperCase()}`

  return (
    <main className={`relative flex min-h-dvh flex-col items-center ${mode === 'leer' && canRead ? 'justify-start gap-8' : 'justify-center gap-14'} bg-[radial-gradient(ellipse_at_50%_40%,oklch(0.2_0.04_40)_0%,var(--night)_65%)] px-4 py-24 text-center sm:px-6`}>
      <header className="animate-sy-fade-in flex flex-col items-center gap-4">
        <p className="font-display text-[10px] tracking-[0.5em] text-foreground/50">{siteLabel(site).toUpperCase()}</p>
        {!(mode === 'leer' && canRead) && (
          <h1 className="text-balance font-display text-3xl leading-tight tracking-[0.12em] text-gold text-glow md:text-5xl">
            {heading}
          </h1>
        )}
      </header>

      {canRead && (
        <div className="flex flex-wrap justify-center gap-3" role="group" aria-label="Cómo disfrutar el capítulo">
          <button type="button" onClick={() => chooseMode('escuchar')} aria-pressed={mode === 'escuchar'}
            className={`min-h-12 rounded-full border px-6 py-3 font-display text-xs tracking-[0.12em] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold ${mode === 'escuchar' ? 'border-gold bg-gold/15 text-gold' : 'border-foreground/30 text-foreground/70 hover:border-gold/60'}`}>
            Escuchar
          </button>
          <button type="button" onClick={() => chooseMode('leer')} aria-pressed={mode === 'leer'}
            className={`min-h-12 rounded-full border px-6 py-3 font-display text-xs tracking-[0.12em] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold ${mode === 'leer' ? 'border-gold bg-gold/15 text-gold' : 'border-foreground/30 text-foreground/70 hover:border-gold/60'}`}>
            Leer
          </button>
        </div>
      )}

      {canRead && mode === 'leer' ? (
        <ImmersiveReader paragraphs={CHAPTER_ONE_TEXT} onListen={() => chooseMode('escuchar')} onFinished={markRead} />
      ) : chapter.audio ? (
        <AudioPlayer
          src={chapter.audio}
          parts={chapter.audioParts}
          title={heading}
          onEnded={() => {
            completeChapter(chapter.id)
            setJustFinished(true)
          }}
        />
      ) : (
        <section className="flex max-w-lg flex-col items-center gap-5 rounded-2xl border border-gold/30 bg-black/50 px-6 py-9 text-center">
          <p className="font-display text-xs tracking-[0.2em] text-gold">
            AUDIO PENDIENTE DE INCORPORAR
          </p>
          <p className="text-balance text-sm leading-relaxed text-foreground/80">
            Este capítulo forma parte del manuscrito oficial de «El Gran Cambio».
            Su grabación todavía no se ha incorporado a esta versión del sitio.
          </p>
          <Link href="/libro/1" className={ritualButton('secondary', 'min-h-11 tracking-[0.15em]')}>
            Ver los 33 capítulos
          </Link>
        </section>
      )}

      {completed && (chapter.book === 1 && chapter.number === 1 ? (
        <div id="caminos-tras-capitulo" className="w-full max-w-2xl scroll-mt-8">
          <ChapterPaths paths={chapter.paths} />
        </div>
      ) : (
        <nav aria-label="Caminos" className="animate-sy-fade-in flex flex-col items-center gap-3">
          <p className="mb-1 max-w-md text-balance text-sm italic text-foreground/75">
            Has escuchado el capítulo. Tu aventura en San Yallego continúa.
          </p>
          <Link href="/mapa" className={ritualButton('secondary', 'w-72')}>
            Regresar al mapa de San Yallego
          </Link>
          {chapter.paths.map((path) =>
            path.href ? (
              <Link key={path.kind} href={path.href} className={ritualButton('primary', 'w-72')}>
                {path.label}
              </Link>
            ) : (
              <button
                key={path.kind}
                type="button"
                onClick={() => whisper(LOCKED_PATH_MESSAGE)}
                className={ritualButton('primary', 'w-72')}
              >
                {path.label}
              </button>
            ),
          )}
        </nav>
      ))}

      <Link href="/libro/1" className={ritualButton('quiet', 'absolute left-4 top-4 px-0 md:left-6 md:top-6')}>
        Volver al índice del Libro I
      </Link>

      <Whisper message={message} nonce={nonce} />
    </main>
  )
}
