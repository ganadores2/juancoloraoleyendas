'use client'

import Link from 'next/link'
import { useState } from 'react'

const QUESTIONS = [
  '¿Te gustó la bienvenida?',
  '¿Entendiste cómo comenzar?',
  '¿Encontraste fácilmente el mapa?',
  '¿Comprendiste para qué era el micrófono?',
  '¿Te gustaría regresar?',
] as const

export function QuickFeedback() {
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [comment, setComment] = useState('')
  const [status, setStatus] = useState<'idle' | 'copied' | 'error'>('idle')

  function selectAnswer(index: number, value: string) {
    setAnswers((previous) => ({ ...previous, [index]: value }))
    setStatus('idle')
  }

  async function copyFeedback() {
    const response = [
      'OPINIÓN DE VISITANTE — SAN YALLEGO',
      ...QUESTIONS.map((question, index) => question + ' ' + (answers[index] ?? 'Sin responder')),
      '¿Qué mejorarías? ' + (comment.trim() || 'Sin comentario'),
      '',
      'Enviado manualmente por el visitante (no desde el sitio).',
    ].join('\n')

    try {
      if (!navigator.clipboard?.writeText) throw new Error('Portapapeles no disponible')
      await navigator.clipboard.writeText(response)
      setStatus('copied')
    } catch {
      setStatus('error')
    }
  }

  const answered = Object.keys(answers).length

  return (
    <main className="min-h-dvh bg-[#DDD0B5] px-4 py-10 text-[#372B24] sm:px-6">
      <section className="mx-auto flex w-full max-w-xl flex-col gap-5 rounded-xl border border-[#B5E8BE] bg-[#F8EBD5] p-5 shadow-[inset_0_0_10px_rgba(172,232,185,0.42),0_0_12px_rgba(172,232,185,0.22)] sm:p-8">
        <header className="space-y-2 text-center">
          <p className="font-display text-[11px] tracking-[0.25em] text-[#7B4436]">JUAN COLORAO · LEYENDAS</p>
          <h1 className="font-display text-2xl tracking-[0.13em] text-[#873D32] sm:text-3xl">TU OPINIÓN</h1>
          <p className="text-sm leading-relaxed text-[#4B3A2E]">
            Cinco preguntas rápidas. Tu respuesta es voluntaria y puedes dejar alguna sin contestar.
          </p>
        </header>

        <div className="space-y-2 rounded-lg border border-[#BC9474] bg-[#F0DDC0] p-3 text-sm text-[#4B3A2E]">
          <p className="font-semibold text-[#873D32]">Versión de prueba: aún no envía opiniones automáticamente.</p>
          <p>Al terminar puedes copiar tus respuestas y enviarlas personalmente por Messenger u otro medio a quien te invitó. No se almacenan aquí.</p>
        </div>

        <div className="space-y-4">
          {QUESTIONS.map((question, index) => (
            <fieldset key={question} className="space-y-2 border-b border-[#D5BFA3] pb-4">
              <legend className="mb-2 text-sm leading-relaxed">{index + 1}. {question}</legend>
              <div className="flex flex-wrap gap-2">
                {([
                  { value: 'Sí', label: '✓ Sí' },
                  { value: 'No', label: '✕ No' },
                  ...(index === 3 ? [{ value: 'No lo vi', label: 'No lo vi' }] : []),
                ]).map((option) => (
                  <label
                    key={option.value}
                    className={`inline-flex min-h-11 cursor-pointer items-center justify-center rounded-md border px-4 py-2 text-sm transition-colors focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[#873D32] ${answers[index] === option.value ? (option.value === 'No' ? 'border-[#A24F42] bg-[#F3D9D2] text-[#7A2E27]' : 'border-[#347551] bg-[#DCEAD8] text-[#205737]') : 'border-[#BFA98D] bg-[#FFFAF1] text-[#3E3026] hover:border-[#873D32]'}`}
                  >
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={option.value}
                      checked={answers[index] === option.value}
                      onChange={() => selectAnswer(index, option.value)}
                      className="sr-only"
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            </fieldset>
          ))}
        </div>

        <label className="flex flex-col gap-2 text-sm">
          ¿Qué mejorarías? <span className="text-[#69594C]">(opcional)</span>
          <textarea
            value={comment}
            maxLength={1000}
            onChange={(event) => { setComment(event.target.value); setStatus('idle') }}
            rows={3}
            placeholder="Una sugerencia breve..."
            className="w-full rounded-md border border-[#BFA98D] bg-[#FFFAF1] p-3 text-base text-[#372B24] placeholder:text-[#786A5D] focus-visible:outline-2 focus-visible:outline-[#873D32]"
          />
        </label>

        <p className="text-xs text-[#69594C]">{answered} de 5 preguntas respondidas</p>
        <button
          type="button"
          onClick={copyFeedback}
          className="min-h-12 rounded-md border border-[#873D32] bg-[#873D32] px-4 py-3 text-sm font-semibold text-[#FFF4E6] hover:bg-[#6F3129] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#873D32]"
        >
          Copiar mis respuestas
        </button>
        {status === 'copied' && (
          <p role="status" className="text-sm text-[#285E41]">
            Respuestas copiadas. Pégalas en Messenger y envíalas a quien te invitó. Todavía no las hemos recibido.
          </p>
        )}
        {status === 'error' && (
          <p role="alert" className="text-sm text-[#873D32]">
            Tu navegador no permitió copiar automáticamente. Prueba en otra ventana o selecciona el texto manualmente cuando esté disponible. No se ha enviado nada.
          </p>
        )}
        <div className="flex flex-wrap justify-center gap-5 border-t border-[#D5BFA3] pt-4 text-sm">
          <Link href="/mapa" className="min-h-11 py-3 text-[#873D32] underline-offset-4 hover:underline">Volver al mapa</Link>
          <Link href="/libro/1" className="min-h-11 py-3 text-[#873D32] underline-offset-4 hover:underline">Ir al Libro I</Link>
        </div>
      </section>
    </main>
  )
}
