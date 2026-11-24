'use client'

import { useState } from 'react'
import Link from 'next/link'

type ChapterSuggestion = { number: number; title: string; href: string }
type Props = {
  questions: readonly string[]
  closingLine: string
  editorialQuestion: string
  editorialAnswer: string
  chapters: readonly ChapterSuggestion[]
}

/**
 * Laboratorio local y efímero. Nunca envía respuestas, progreso ni datos
 * personales al servidor. Tampoco llama a proveedores de IA.
 */
export function EntranceOraclePilot({
  questions, closingLine, editorialQuestion, editorialAnswer, chapters,
}: Props) {
  const [step, setStep] = useState(0)
  const [draft, setDraft] = useState('')
  const completed = step >= questions.length

  function advance() {
    setDraft('') // descartar la respuesta anterior, no guardarla en memoria de progreso
    setStep((current) => Math.min(current + 1, questions.length))
  }

  function restart() {
    setDraft('')
    setStep(0)
  }

  return (
    <section aria-labelledby="piloto-titulo" className="space-y-6 rounded-xl border border-gold/35 bg-white/5 p-5 sm:p-8">
      <header className="space-y-3">
        <p className="text-xs tracking-[0.18em] text-gold/70">
          {completed ? 'RECORRIDO DE PRUEBA FINALIZADO' : 'PREGUNTA ' + (step + 1) + ' DE ' + questions.length}
        </p>
        <h2 id="piloto-titulo" className="font-display text-xl text-gold">
          {completed ? 'La piedra también escucha' : 'Una pregunta antes de descender'}
        </h2>
      </header>

      {!completed ? (
        <div className="space-y-5">
          <p aria-live="polite" className="text-lg leading-relaxed text-foreground/90">
            {questions[step]}
          </p>
          <div className="space-y-2">
            <label htmlFor="piloto-respuesta" className="block text-sm text-foreground/75">
              Tu respuesta de ensayo (opcional y no guardada)
            </label>
            <textarea
              id="piloto-respuesta"
              rows={3}
              maxLength={300}
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Escribe solo una idea de prueba. Se descartará al avanzar."
              className="w-full rounded-lg border border-gold/30 bg-black/70 p-3 text-sm text-foreground focus-visible:outline-2 focus-visible:outline-gold"
            />
            <p className="text-xs leading-relaxed text-foreground/60">
              Este piloto no interpreta ni conserva lo que escribes. Puedes continuar sin contestar.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button type="button" onClick={advance}
              className="min-h-11 rounded-lg border border-gold/60 bg-gold/10 px-5 py-2 text-sm text-gold hover:bg-gold/20 focus-visible:outline-2 focus-visible:outline-gold">
              {step + 1 < questions.length ? 'Siguiente pregunta' : 'Terminar recorrido'}
            </button>
            <button type="button" onClick={advance}
              className="min-h-11 rounded-lg border border-gold/30 px-4 py-2 text-sm text-foreground/75 hover:text-gold focus-visible:outline-2 focus-visible:outline-gold">
              Guardar silencio y seguir
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <blockquote className="border-l-2 border-gold/50 pl-4 font-display text-lg italic text-gold">
            {closingLine}
          </blockquote>
          <section aria-label="Orientación editorial aprobada" className="space-y-3 rounded-lg border border-gold/20 bg-black/60 p-4">
            <p className="text-xs tracking-wider text-gold/70">EJEMPLO GENERAL DE LA MATRIZ APROBADA</p>
            <p className="text-base italic text-foreground/90">«{editorialQuestion}»</p>
            <p className="text-sm leading-relaxed text-foreground/75">{editorialAnswer}</p>
            <p className="text-xs text-foreground/60">
              Esta pista es fija: no responde a lo que escribiste ni confirma hechos reservados.
            </p>
          </section>
          <section aria-label="Capítulos sugeridos" className="space-y-3">
            <h3 className="font-display text-base text-gold">Tres caminos del Libro I</h3>
            <ul className="grid gap-2">
              {chapters.map((chapter) => (
                <li key={chapter.number}>
                  <Link href={chapter.href}
                    className="flex min-h-11 items-center justify-between gap-3 rounded-lg border border-gold/25 bg-black/40 px-4 py-3 text-sm text-foreground/85 hover:border-gold/70 hover:text-gold focus-visible:outline-2 focus-visible:outline-gold">
                    <span>{chapter.title}</span>
                    <span className="shrink-0 text-gold/70">Cap. {chapter.number}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
          <button type="button" onClick={restart}
            className="min-h-11 rounded-lg border border-gold/50 px-5 py-2 text-sm text-gold hover:bg-gold/10 focus-visible:outline-2 focus-visible:outline-gold">
            Reiniciar simulación
          </button>
        </div>
      )}
    </section>
  )
}
