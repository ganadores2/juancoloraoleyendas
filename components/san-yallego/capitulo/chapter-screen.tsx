'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useProgress, useWhisper } from '@/hooks/use-san-yallego'
import { type Chapter } from '@/lib/san-yallego/chapters'
import { isSiteUnlocked } from '@/lib/san-yallego/progress'
import { getSite, LOCKED_PATH_MESSAGE, siteLabel } from '@/lib/san-yallego/sites'
import { ritualButton } from '../ritual'
import { SealedSite } from '../sealed-site'
import { Whisper } from '../whisper'
import { AudioPlayer } from './audio-player'

export function ChapterScreen({ chapter }: { chapter: Chapter }) {
  const { progress, hydrated, completeChapter } = useProgress()
  const { message, nonce, whisper } = useWhisper()
  const [justFinished, setJustFinished] = useState(false)
  const site = getSite(chapter.siteId)!

  if (!hydrated) return <main className="min-h-dvh bg-black" />
  if (!isSiteUnlocked(site, progress)) return <SealedSite title={siteLabel(site)} />

  const completed = justFinished || progress.completedChapters.includes(chapter.id)
  const heading = `CAPÍTULO ${chapter.number} — ${chapter.title.toUpperCase()}`

  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center gap-14 bg-[radial-gradient(ellipse_at_50%_40%,oklch(0.2_0.04_40)_0%,var(--night)_65%)] px-6 py-24 text-center">
      <header className="animate-sy-fade-in flex flex-col items-center gap-4">
        <p className="font-display text-[10px] tracking-[0.5em] text-foreground/50">{siteLabel(site).toUpperCase()}</p>
        <h1 className="text-balance font-display text-3xl leading-tight tracking-[0.12em] text-gold text-glow md:text-5xl">
          {heading}
        </h1>
      </header>

      <AudioPlayer
        src={chapter.audio}
        title={heading}
        onEnded={() => {
          completeChapter(chapter.id)
          setJustFinished(true)
        }}
      />

      {completed && (
        <nav aria-label="Caminos" className="animate-sy-fade-in flex flex-col items-center gap-3">
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
      )}

      <Link href="/mapa" className={ritualButton('quiet', 'absolute left-4 top-4 px-0 md:left-6 md:top-6')}>
        Volver al mapa
      </Link>

      <Whisper message={message} nonce={nonce} />
    </main>
  )
}
