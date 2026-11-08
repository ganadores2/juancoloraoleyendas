'use client'

import Link from 'next/link'
import { BookOpenText, Search, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { GLOSSARY, type GlossaryCategory } from '@/lib/san-yallego/glossary'

type Filter = GlossaryCategory | 'todos'
const GROUPS: ReadonlyArray<{ key: Filter; label: string }> = [
  { key: 'todos', label: 'Todas' },
  { key: 'universo', label: 'Universo' },
  { key: 'habla', label: 'Habla popular' },
  { key: 'lenguas', label: 'Lenguas originarias' },
  { key: 'personajes', label: 'Personajes' },
]
const GROUP_LABELS: Record<GlossaryCategory, string> = {
  universo: 'Universo de San Yallego',
  habla: 'El habla del pueblo',
  lenguas: 'Palabras y nombres de lenguas originarias',
  personajes: 'Gente de San Yallego',
}
function fold(value: string) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('es').trim()
}

export function GlossaryExplorer() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<Filter>('todos')
  const results = useMemo(() => {
    const needle = fold(search)
    return GLOSSARY.filter((entry) => {
      if (filter !== 'todos' && entry.category !== filter) return false
      return !needle || fold(entry.term + ' ' + entry.definition + ' ' + entry.source).includes(needle)
    }).sort((a, b) => a.term.localeCompare(b.term, 'es'))
  }, [search, filter])

  return (
    <main className="min-h-dvh bg-[radial-gradient(ellipse_at_50%_10%,oklch(0.2_0.04_40)_0%,var(--night)_70%)] px-4 py-16 text-foreground sm:px-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-9">
        <nav className="flex flex-wrap items-center justify-between gap-4 text-xs" aria-label="Volver desde el glosario">
          <Link href="/libro/1" className="min-h-11 content-center text-gold underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-gold">
            Volver al índice del Libro I
          </Link>
          <Link href="/mapa" className="min-h-11 content-center text-foreground/75 underline-offset-4 hover:text-gold hover:underline">
            Ir al mapa de San Yallego
          </Link>
        </nav>

        <header className="mx-auto flex max-w-2xl flex-col items-center gap-5 text-center">
          <p className="font-display text-[10px] tracking-[0.27em] text-gold/70">JUAN COLORAO · LEYENDAS · ARCHIVO DEL VIAJERO</p>
          <BookOpenText className="size-8 text-gold/80" aria-hidden="true" />
          <h1 className="font-display text-3xl leading-tight tracking-[0.1em] text-gold text-glow sm:text-4xl">
            ARCHIVO DE PALABRAS
          </h1>
          <p className="text-balance text-sm leading-relaxed text-foreground/80 sm:text-base">
            San Yallego también vive en sus palabras. Descubre los nombres, personajes,
            dichos y expresiones que ayudan a comprender el mundo de Juan Colorao.
          </p>
          <p className="text-xs italic leading-relaxed text-foreground/60">
            Glosario público de acompañamiento: sin revelaciones reservadas. Las expresiones
            populares pueden ser bromas o regaños, dependiendo de quién las diga y a quién.
          </p>
        </header>

        <section className="flex flex-col gap-5 rounded-2xl border border-gold/25 bg-black/40 p-4 sm:p-6"
          aria-label="Buscar y filtrar palabras">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-gold/70" aria-hidden="true"/>
            <label htmlFor="buscar-palabras" className="sr-only">Buscar palabras o definiciones</label>
            <input id="buscar-palabras" type="search" value={search} onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar: burrín, Mictlán, Xolo, Juan..."
              className="min-h-12 w-full rounded-xl border border-gold/35 bg-black/60 py-3 pl-12 pr-4 text-sm text-foreground placeholder:text-foreground/45 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"/>
            {search && <button type="button" onClick={() => setSearch('')} title="Limpiar búsqueda"
              className="absolute right-2 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center text-foreground/80 hover:text-gold"
              aria-label="Limpiar búsqueda"><X className="size-4" aria-hidden="true" /></button>}
          </div>
          <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Tipos de palabras">
            {GROUPS.map((group) => (
              <button key={group.key} type="button" aria-pressed={filter === group.key}
                onClick={() => setFilter(group.key)}
                className={`min-h-11 rounded-full border px-4 py-2 font-display text-[10px] tracking-[0.08em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${filter === group.key
                  ? 'border-gold bg-gold/15 text-gold' : 'border-gold/25 text-foreground/75 hover:border-gold/65 hover:text-gold'}`}>
                {group.label}
              </button>
            ))}
          </div>
          <p role="status" aria-live="polite" className="text-center text-xs text-foreground/65">
            {results.length} {results.length === 1 ? 'entrada encontrada' : 'entradas encontradas'}
          </p>
        </section>

        {results.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2" aria-label="Definiciones de San Yallego">
            {results.map((entry) => (
              <article key={entry.term} className="flex flex-col gap-3 rounded-xl border border-gold/20 bg-black/40 px-5 py-6 text-left sm:px-6">
                <p className="font-display text-[10px] tracking-[0.13em] text-gold/65">
                  {GROUP_LABELS[entry.category]}
                </p>
                <h2 className="font-display text-lg tracking-[0.05em] text-gold">{entry.term}</h2>
                <p className="flex-1 text-sm leading-7 text-foreground/90">{entry.definition}</p>
                <div className="border-t border-gold/15 pt-3 text-[11px] leading-relaxed text-foreground/55">
                  Fuente: {entry.source}
                  {entry.sourceUrl && (
                    <> · <a href={entry.sourceUrl} target="_blank" rel="noopener noreferrer"
                      className="text-gold/80 underline underline-offset-4 hover:text-gold">Consultar referencia</a></>
                  )}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-gold/20 bg-black/40 p-10 text-center">
            <p className="text-base text-foreground/80">Esa expresión todavía no aparece en este archivo.</p>
            <button type="button" onClick={() => { setSearch(''); setFilter('todos') }}
              className="mt-5 min-h-11 rounded-full border border-gold/55 px-5 text-xs text-gold hover:bg-gold/10">
              Ver todas las palabras
            </button>
          </div>
        )}

        <footer className="mx-auto flex max-w-2xl flex-col items-center gap-4 border-t border-gold/20 pt-8 text-center">
          <h2 className="font-display text-sm tracking-[0.14em] text-gold">UNA PALABRA, MUCHAS HISTORIAS</h2>
          <p className="text-sm leading-relaxed text-foreground/75">
            Este archivo reúne definiciones del canon, explicaciones del autor y fuentes
            culturales. Las indicaciones fonéticas del doblaje no alteran la escritura del libro.
            Los términos pendientes de investigación están identificados como tales.
          </p>
          <Link href="/libro/1" className="inline-flex min-h-12 items-center rounded-full border border-gold/60 px-6 py-3 font-display text-[11px] tracking-[0.1em] text-gold hover:bg-gold/10">
            Regresar a los 33 capítulos
          </Link>
        </footer>
      </div>
    </main>
  )
}
