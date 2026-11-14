'use client'

import { useState } from 'react'
import { ritualButton } from '../ritual'

interface OracleQuestionsProps {
  questions: string[]
  closingLine?: string
  onAnswer: (index: number, answer: string) => void
  onDiscover?: () => void
}

export function OracleQuestions({ questions, closingLine, onAnswer, onDiscover }: OracleQuestionsProps) {
  const [index, setIndex] = useState(0)
  const [draft, setDraft] = useState('')
  const finished = index >= questions.length

  const advance = (answer: string) => {
    onAnswer(index, answer)
    setDraft('')
    setIndex((i) => i + 1)
  }

  return (
    <section
      aria-label="El Oráculo pregunta"
      className={finished
        ? 'pointer-events-none fixed inset-x-0 top-20 z-20 bg-gradient-to-b from-black/85 via-black/65 to-transparent px-4 pb-12 pt-6'
        : 'pointer-events-none fixed inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black via-black/80 to-transparent px-6 pb-10 pt-24'
      }
    >
      <div className="pointer-events-auto mx-auto flex max-w-xl flex-col items-center gap-5 text-center">
        {finished ? (
          <div className="flex flex-col items-center gap-6">
            {closingLine && (
              <p key="cierre" className="animate-sy-fade-in text-balance text-2xl italic text-foreground/90 text-glow md:text-3xl">
                {closingLine}
              </p>
            )}
            {onDiscover && (
              <button type="button" onClick={onDiscover} className={ritualButton('primary')}>
                Tocar la argolla del pedestal
              </button>
            )}
          </div>
        ) : (
          <form
            key={index}
            className="animate-sy-fade-in flex w-full flex-col items-center gap-5"
            onSubmit={(event) => {
              event.preventDefault()
              advance(draft.trim())
            }}
          >
            <p className="font-display text-[10px] tracking-[0.4em] text-gold/70">EL ORÁCULO PREGUNTA · {index + 1} DE {questions.length}</p>
            <label htmlFor="oracle-answer" className="text-balance text-2xl italic text-foreground text-glow md:text-3xl">
              {questions[index]}
            </label>
            <input
              id="oracle-answer"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              maxLength={240}
              autoComplete="off"
              placeholder="Responde, si quieres…"
              className="w-full max-w-sm border-b border-gold/30 bg-transparent py-2 text-center text-lg text-foreground placeholder:italic placeholder:text-foreground/35 focus:border-gold focus:outline-none"
            />
            <div className="flex items-center gap-2">
              <button type="submit" disabled={!draft.trim()} className={ritualButton('secondary')}>
                Responder
              </button>
              <button type="button" onClick={() => advance('')} className={ritualButton('quiet')}>
                Guardar silencio
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  )
}
