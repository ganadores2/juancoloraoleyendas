'use client'

import { FormEvent, useState } from 'react'
import Link from 'next/link'

type Message = { role: 'user' | 'assistant'; content: string }

const STARTERS = [
  '¿Qué puedo explorar en San Yallego?',
  '¿Qué tienen de extraño los espejos?',
  '¿Puedo escuchar el Libro I sin conversar contigo?',
]

export function OraculoGptChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [question, setQuestion] = useState('')
  const [busy, setBusy] = useState(false)
  const [notice, setNotice] = useState('')

  async function ask(text: string) {
    const content = text.trim()
    if (!content || busy || content.length > 800) return
    const next: Message[] = [...messages, { role: 'user', content }].slice(-12)
    setMessages(next)
    setQuestion('')
    setBusy(true)
    setNotice('')
    try {
      const response = await fetch('/api/oraculo-gpt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next }),
        cache: 'no-store',
      })
      const data: { answer?: string; error?: string } = await response.json()
      if (!response.ok || !data.answer) {
        setNotice(data.error ?? 'El Oráculo no está disponible.')
        return
      }
      setMessages([...next, { role: 'assistant', content: data.answer }])
    } catch {
      setNotice('No fue posible conectar con el Oráculo.')
    } finally {
      setBusy(false)
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    void ask(question)
  }

  return (
    <section aria-label="Conversación con el Oráculo" className="mx-auto w-full max-w-2xl space-y-6 border border-amber-500/35 bg-black/75 p-5 text-amber-50 sm:p-8">
      <header className="space-y-3 text-center">
        <p className="text-xs uppercase tracking-[0.25em] text-amber-300">Prueba privada de desarrollo</p>
        <h1 className="font-display text-3xl text-amber-200">Oráculo de la Entrada</h1>
        <p className="text-base text-amber-50/80">
          Haz una pregunta sobre San Yallego. No necesitas hablar conmigo para leer o escuchar la historia.
        </p>
      </header>

      <div aria-live="polite" className="max-h-[50vh] min-h-40 space-y-4 overflow-y-auto border border-amber-500/20 bg-stone-950/65 p-4">
        {messages.length === 0 && (
          <p className="text-center italic text-amber-100/70">«Algunas puertas se abren con preguntas. Otras, simplemente siguiendo el camino».</p>
        )}
        {messages.map((message, index) => (
          <div key={index} className={message.role === 'user' ? 'ml-6 text-right' : 'mr-6 text-left'}>
            <p className="mb-1 text-[11px] uppercase tracking-wider text-amber-300/75">
              {message.role === 'user' ? 'Viajero' : 'Oráculo'}
            </p>
            <p className="whitespace-pre-wrap text-base leading-relaxed">{message.content}</p>
          </div>
        ))}
        {busy && <p role="status" className="italic text-amber-200/70">El Oráculo medita tu pregunta…</p>}
      </div>

      {notice && <p role="alert" className="border border-amber-500/40 p-3 text-sm text-amber-100">{notice}</p>}
      {messages.length === 0 && (
        <div className="flex flex-wrap gap-2">
          {STARTERS.map((starter) => (
            <button key={starter} type="button" disabled={busy} onClick={() => void ask(starter)}
              className="rounded-full border border-amber-500/50 px-3 py-2 text-sm text-amber-100 hover:bg-amber-500/10">
              {starter}
            </button>
          ))}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-3">
        <label htmlFor="oraculo-pregunta" className="block text-sm text-amber-100">Tu pregunta</label>
        <textarea id="oraculo-pregunta" value={question} onChange={(event) => setQuestion(event.target.value)}
          maxLength={800} rows={3} required disabled={busy}
          placeholder="¿Qué misterio quieres explorar?"
          className="w-full resize-y border border-amber-500/50 bg-stone-950 p-3 text-base text-amber-50 focus-visible:outline-2 focus-visible:outline-amber-300"/>
        <button type="submit" disabled={busy || !question.trim()}
          className="min-h-11 w-full border border-amber-400/70 bg-amber-500/10 px-5 py-3 font-display text-sm tracking-wider text-amber-100 disabled:opacity-50">
          {busy ? 'CONSULTANDO…' : 'PREGUNTAR AL ORÁCULO'}
        </button>
      </form>
      <p className="text-xs leading-relaxed text-amber-100/65">
        Piloto de IA: sus respuestas pueden equivocarse. No compartas datos personales ni llaves. La conversación no se guarda en este sitio;
        las preguntas se envían al proveedor de IA para generar respuestas.
      </p>
      <div className="flex flex-wrap justify-center gap-5 text-sm">
        <Link className="text-amber-200 underline underline-offset-4" href="/mapa">Volver al mapa</Link>
        <Link className="text-amber-200 underline underline-offset-4" href="/libro/1/capitulo/1">Leer o escuchar el Libro I</Link>
      </div>
    </section>
  )
}
