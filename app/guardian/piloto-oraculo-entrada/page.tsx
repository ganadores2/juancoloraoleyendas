import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { EntranceOraclePilot } from '@/components/san-yallego/oraculo/entrance-oracle-pilot'
import { CHAPTERS, chapterHref } from '@/lib/san-yallego/chapters'
import { hasGuardianSession } from '@/lib/san-yallego/guardian'
import { ORACLES } from '@/lib/san-yallego/oracles'
import matrix from '@/lib/san-yallego/oracle-matrix-v1.json'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = {
  title: 'Piloto guiado del Oráculo de la Entrada — Sala del Creador',
  robots: { index: false, follow: false },
}

/** Prototipo privado: no altera llaves, sellos, progreso ni conversaciones públicas. */
export default async function GuardianEntrancePilotPage() {
  if (!(await hasGuardianSession())) redirect('/guardian')

  const oracle = ORACLES['oraculo-entrada']
  const editorial = matrix.sites.find((site) => site.siteId === 'entrada')
  if (!editorial || oracle.questions.length !== 3 || !oracle.closingLine ||
      editorial.chapterRecommendations.length !== 3) {
    throw new Error('El piloto de Entrada requiere la matriz editorial y las tres preguntas originales')
  }

  const chapters = editorial.chapterRecommendations.map((recommended) => {
    const chapter = CHAPTERS.find((candidate) =>
      candidate.book === 1 && candidate.number === recommended.chapter)
    if (!chapter || chapter.title !== recommended.title) {
      throw new Error('Sugerencia de capítulo sin correspondencia en Libro I')
    }
    return { number: chapter.number, title: chapter.title, href: chapterHref(chapter) }
  })

  return (
    <main className="min-h-dvh bg-black px-4 py-10 text-foreground sm:px-7">
      <div className="mx-auto max-w-3xl space-y-8">
        <header className="space-y-4 text-center">
          <p className="font-display text-xs tracking-[0.2em] text-gold/75">
            SAN YALLEGO · SALA PRIVADA DEL CREADOR
          </p>
          <h1 className="font-display text-3xl text-gold sm:text-4xl">
            Piloto del Oráculo de la Entrada
          </h1>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-foreground/75">
            Recorrido guiado de tres preguntas originales. No es una conversación
            con IA: ensaya el ritmo, la cortesía y la transición hacia la lectura.
          </p>
          <nav aria-label="Volver al Taller" className="flex flex-wrap justify-center gap-3">
            <Link href="/guardian" className="inline-flex min-h-11 items-center rounded-lg border border-gold/50 px-4 py-2 text-sm text-gold hover:bg-gold/10 focus-visible:outline-2 focus-visible:outline-gold">
              Sala del Creador
            </Link>
            <Link href="/guardian/mapa" className="inline-flex min-h-11 items-center rounded-lg border border-gold/30 px-4 py-2 text-sm text-gold/80 hover:bg-gold/10 focus-visible:outline-2 focus-visible:outline-gold">
              Mapa privado
            </Link>
          </nav>
        </header>

        <aside role="note" className="rounded-xl border border-gold/25 bg-gold/5 p-4 text-xs leading-relaxed text-foreground/70">
          Experimento aislado: lo escrito se borra al continuar y no se guarda,
          analiza ni envía a ningún proveedor. Las pistas son ejemplos ya aprobados
          y no representan respuestas personalizadas. No se modifica el Oráculo público.
        </aside>

        <EntranceOraclePilot
          questions={oracle.questions}
          closingLine={oracle.closingLine}
          editorialQuestion={editorial.sampleQuestion}
          editorialAnswer={editorial.safeResponseExample}
          chapters={chapters}
        />

        <p className="text-center text-xs text-foreground/60">
          N0: orientación, escucha y preguntas. N4, N5 y C100 permanecen fuera del piloto.
        </p>
      </div>
    </main>
  )
}
