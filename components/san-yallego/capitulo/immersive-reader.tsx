'use client'

import { BookOpen, Bookmark, Check, Minus, Plus } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'

type ThemeName = 'papel' | 'noche' | 'colorao'

const THEMES: Record<ThemeName, { label: string; surface: string; ink: string; muted: string; border: string; accent: string }> = {
  papel: {
    label: 'Papel Vallego',
    surface: 'bg-[#f2ebdb]', ink: 'text-[#29231e]', muted: 'text-[#62574d]',
    border: 'border-[#a79a84]/50', accent: 'text-[#853b27]',
  },
  noche: {
    label: 'Noche de Mictlán',
    surface: 'bg-[#1b1b1a]', ink: 'text-[#e9e2d6]', muted: 'text-[#b5aca0]',
    border: 'border-[#888174]/55', accent: 'text-[#d8b977]',
  },
  colorao: {
    label: 'Colorao',
    surface: 'bg-[#2d1b1a]', ink: 'text-[#f1dfd1]', muted: 'text-[#d6b8aa]',
    border: 'border-[#b58d7c]/60', accent: 'text-[#e7ae8c]',
  },
}

const BOOKMARK_KEY = 'san-yallego:lectura:v1:libro-1-capitulo-1'
const SETTINGS_KEY = 'san-yallego:lectura:preferencias:v1'
const SIZE_MIN = 18
const SIZE_MAX = 26

interface ImmersiveReaderProps {
  paragraphs: readonly string[]
  onListen: () => void
  onFinished: () => void
}

export function ImmersiveReader({ paragraphs, onListen, onFinished }: ImmersiveReaderProps) {
  const [theme, setTheme] = useState<ThemeName>('papel')
  const [fontSize, setFontSize] = useState(20)
  const [resumeIndex, setResumeIndex] = useState<number | null>(null)
  const [progress, setProgress] = useState(0)
  const [bookmarkMessage, setBookmarkMessage] = useState<string | null>(null)
  const [ready, setReady] = useState(false)
  const readerRef = useRef<HTMLElement>(null)
  const articleRef = useRef<HTMLElement>(null)
  const paragraphRefs = useRef<(HTMLParagraphElement | null)[]>([])
  const currentBlockRef = useRef(0)
  const lastSavedBlockRef = useRef(-1)

  useEffect(() => {
    try {
      const settings = JSON.parse(window.localStorage.getItem(SETTINGS_KEY) || '{}') as {
        theme?: ThemeName; fontSize?: number
      }
      if (settings.theme && settings.theme in THEMES) setTheme(settings.theme)
      if (typeof settings.fontSize === 'number' && Number.isFinite(settings.fontSize)) {
        setFontSize(Math.max(SIZE_MIN, Math.min(SIZE_MAX, settings.fontSize)))
      }
      const stored = Number(window.localStorage.getItem(BOOKMARK_KEY))
      if (Number.isInteger(stored) && stored > 0 && stored < paragraphs.length) {
        setResumeIndex(stored)
        lastSavedBlockRef.current = stored
      }
    } catch {
      // La lectura sigue funcionando en navegación privada o sin almacenamiento.
    }
    setReady(true)
  }, [paragraphs.length])

  useEffect(() => {
    if (!ready) return
    try {
      window.localStorage.setItem(SETTINGS_KEY, JSON.stringify({ theme, fontSize }))
    } catch {
      // Las preferencias son opcionales.
    }
  }, [theme, fontSize, ready])

  const saveBlock = useCallback((index: number) => {
    if (index === lastSavedBlockRef.current) return
    lastSavedBlockRef.current = index
    try {
      window.localStorage.setItem(BOOKMARK_KEY, String(index))
    } catch {
      // La memoria de lectura es local y opcional.
    }
  }, [])

  useEffect(() => {
    if (!ready) return
    let scheduled = false
    const trackReading = () => {
      if (scheduled) return
      scheduled = true
      window.requestAnimationFrame(() => {
        scheduled = false
        const article = articleRef.current
        const first = paragraphRefs.current[0]
        if (!article || !first) return
        const documentTop = article.getBoundingClientRect().top + window.scrollY
        const viewportReadingLine = window.scrollY + window.innerHeight * 0.38
        const fraction = (viewportReadingLine - documentTop) / Math.max(1, article.offsetHeight)
        setProgress(Math.round(Math.max(0, Math.min(1, fraction)) * 100))

        // No sobrescribir un marcador recuperado solo por abrir la vista.
        if (window.scrollY < documentTop + 40) return
        let index = 0
        for (let i = 0; i < paragraphRefs.current.length; i++) {
          const paragraph = paragraphRefs.current[i]
          if (paragraph && paragraph.getBoundingClientRect().top <= window.innerHeight * 0.38) {
            index = i
          } else {
            break
          }
        }
        currentBlockRef.current = index
        saveBlock(index)
      })
    }
    window.addEventListener('scroll', trackReading, { passive: true })
    window.addEventListener('resize', trackReading)
    return () => {
      window.removeEventListener('scroll', trackReading)
      window.removeEventListener('resize', trackReading)
    }
  }, [ready, saveBlock])

  const jumpTo = (index: number) => {
    const paragraph = paragraphRefs.current[index]
    if (!paragraph) return
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    paragraph.scrollIntoView({ block: 'start', behavior: reduceMotion ? 'auto' : 'smooth' })
    currentBlockRef.current = index
    setResumeIndex(null)
  }

  const markHere = () => {
    const index = currentBlockRef.current
    lastSavedBlockRef.current = -1
    saveBlock(index)
    setBookmarkMessage(`Lugar guardado · bloque ${index + 1} de ${paragraphs.length}`)
  }

  const restart = () => {
    try { window.localStorage.removeItem(BOOKMARK_KEY) } catch { /* Opcional. */ }
    lastSavedBlockRef.current = -1
    currentBlockRef.current = 0
    setResumeIndex(null)
    setBookmarkMessage(null)
    readerRef.current?.scrollIntoView({ block: 'start', behavior: 'auto' })
  }

  const palette = THEMES[theme]

  return (
    <section ref={readerRef} aria-label="Lectura inmersiva de El Primer Grito"
      className={`relative w-full max-w-3xl overflow-hidden rounded-2xl border shadow-2xl transition-colors duration-200 ${palette.surface} ${palette.ink} ${palette.border}`}>
      <div className="sticky top-0 z-10 h-[3px] w-full bg-black/10" aria-hidden="true">
        <div className="h-full bg-[#a84b36] transition-[width] duration-150" style={{ width: `${progress}%` }} />
      </div>

      <div className={`flex flex-col gap-5 border-b px-5 py-6 sm:px-10 ${palette.border}`}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className={`font-display text-[10px] tracking-[0.16em] ${palette.muted}`}>
            LECTURA · CAPÍTULO I
          </span>
          <span className={`font-display text-[10px] tabular-nums ${palette.muted}`} aria-label={`Progreso aproximado ${progress} por ciento`}>
            {progress}% leído
          </span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2" role="group" aria-label="Ambiente de lectura">
          {(Object.keys(THEMES) as ThemeName[]).map((choice) => (
            <button key={choice} type="button" aria-pressed={choice === theme}
              onClick={() => setTheme(choice)}
              className={`min-h-11 rounded-full border px-4 py-2 text-[12px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current ${choice === theme ? 'border-current font-semibold' : 'border-current/30 opacity-75 hover:opacity-100'}`}>
              {THEMES[choice].label}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2" role="group" aria-label="Tamaño de letra">
          <button type="button" onClick={() => setFontSize((s) => Math.max(SIZE_MIN, s - 2))}
            disabled={fontSize === SIZE_MIN} aria-label="Reducir tamaño de letra"
            className="flex min-h-11 min-w-11 items-center justify-center rounded-full border border-current/30 disabled:opacity-35">
            <Minus size={17} />
          </button>
          <span className={`px-3 text-xs tabular-nums ${palette.muted}`}>{fontSize} px</span>
          <button type="button" onClick={() => setFontSize((s) => Math.min(SIZE_MAX, s + 2))}
            disabled={fontSize === SIZE_MAX} aria-label="Ampliar tamaño de letra"
            className="flex min-h-11 min-w-11 items-center justify-center rounded-full border border-current/30 disabled:opacity-35">
            <Plus size={17} />
          </button>
          <button type="button" onClick={markHere}
            className="flex min-h-11 items-center gap-2 rounded-full border border-current/30 px-4 text-xs hover:border-current">
            <Bookmark size={15} /> Guardar mi lugar
          </button>
        </div>
        {resumeIndex !== null && (
          <button type="button" onClick={() => jumpTo(resumeIndex)}
            className={`min-h-12 rounded-xl border px-4 text-sm font-semibold ${palette.border} ${palette.accent}`}>
            Continuar donde me quedé · bloque {resumeIndex + 1}
          </button>
        )}
        {bookmarkMessage && <p role="status" className={`text-center text-xs ${palette.muted}`}>{bookmarkMessage}</p>}
      </div>

      <header className="mx-auto max-w-[62ch] px-6 pb-8 pt-12 text-center sm:px-12">
        <p className={`font-display text-[10px] tracking-[0.22em] ${palette.muted}`}>JUAN COLORAO · LEYENDAS</p>
        <h1 className="mt-5 font-display text-2xl tracking-[0.08em] sm:text-3xl">EL PRIMER GRITO</h1>
        <span className={`mt-5 block text-lg ${palette.accent}`} aria-hidden>◆</span>
      </header>

      <article ref={articleRef}
        className="mx-auto max-w-[62ch] px-6 pb-16 text-left font-serif sm:px-12"
        aria-label="Texto del Capítulo I"
        style={{ fontSize, lineHeight: 1.7 }}>
        {paragraphs.map((paragraph, index) => (
          <p key={index} ref={(element) => { paragraphRefs.current[index] = element }}
            className={`scroll-mt-24 ${paragraph.startsWith('—')
              ? 'mb-5 border-l-2 border-current/20 pl-4'
              : 'mb-5'}`}>
            {paragraph}
          </p>
        ))}
      </article>

      <footer className={`flex flex-col items-center gap-4 border-t px-5 py-9 text-center sm:px-10 ${palette.border}`}>
        <p className="font-display text-sm tracking-[0.1em]">FIN DEL CAPÍTULO I</p>
        <p className={`max-w-md text-sm ${palette.muted}`}>
          Tu lectura también cuenta como parte del viaje. Elige cómo deseas continuar.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button type="button" onClick={onFinished}
            className="inline-flex min-h-12 items-center gap-2 rounded-full border border-current px-5 py-2 text-sm font-semibold">
            <Check size={17} /> Terminé de leer
          </button>
          <button type="button" onClick={onListen}
            className="inline-flex min-h-12 items-center gap-2 rounded-full border border-current/40 px-5 py-2 text-sm">
            <BookOpen size={16} /> Escuchar narración
          </button>
          <button type="button" onClick={restart}
            className={`min-h-12 px-3 text-sm underline underline-offset-4 ${palette.muted}`}>
            Leer desde el inicio
          </button>
        </div>
        <p className={`max-w-md text-xs leading-relaxed ${palette.muted}`}>
          Texto de la edición de producción del Libro I, páginas 4–8.
          La grabación puede contener revisiones literarias posteriores.
        </p>
      </footer>
    </section>
  )
}
