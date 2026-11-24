import { NextRequest, NextResponse } from 'next/server'
import { ORACULO_SYSTEM_PROMPT } from '@/lib/san-yallego/oraculo-gpt-public'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

type Turn = { role: 'user' | 'assistant'; content: string }
const limits = new Map<string, { count: number; until: number }>()
const WINDOW_MS = 60_000
const MAX_PER_WINDOW = 6

function isTurn(value: unknown): value is Turn {
  if (typeof value !== 'object' || value === null) return false
  const item = value as Record<string, unknown>
  return (item.role === 'user' || item.role === 'assistant')
    && typeof item.content === 'string'
    && item.content.trim().length > 0
    && item.content.length <= 800
}

function error(message: string, status: number) {
  return NextResponse.json({ error: message }, { status, headers: { 'Cache-Control': 'no-store' } })
}

export async function POST(request: NextRequest) {
  if (process.env.VERCEL_ENV === 'production') {
    return error('El Oráculo piloto no está disponible.', 404)
  }

  // Reduce solicitudes desde páginas de otros orígenes.
  const origin = request.headers.get('origin')
  if (origin && origin !== request.nextUrl.origin) {
    return error('Origen no autorizado.', 403)
  }

  const key = process.env.OPENAI_API_KEY
  const model = process.env.ORACULO_OPENAI_MODEL
  if (!key || !model) {
    return error('El Oráculo piloto está preparado, pero aún no tiene configurado su modelo de IA.', 503)
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'local'
  const now = Date.now()
  const prior = limits.get(ip)
  const next = prior && prior.until > now
    ? { count: prior.count + 1, until: prior.until }
    : { count: 1, until: now + WINDOW_MS }
  limits.set(ip, next)
  if (limits.size > 5000) {
    for (const [id, state] of limits) if (state.until <= now) limits.delete(id)
  }
  if (next.count > MAX_PER_WINDOW) {
    return error('El Oráculo necesita una pausa. Intenta de nuevo en un minuto.', 429)
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return error('Solicitud no válida.', 400)
  }
  const messages = (body as { messages?: unknown } | null)?.messages
  if (!Array.isArray(messages) || messages.length < 1
      || messages.length > 12 || !messages.every(isTurn)
      || messages[messages.length - 1].role !== 'user') {
    return error('La conversación no tiene un formato válido.', 400)
  }

  // No guardamos mensajes ni perfiles. Se envían solo al proveedor configurado.
  const input = messages.map((turn: Turn) => ({
    role: turn.role,
    content: turn.content.trim(),
  }))

  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 20_000)
    let response: Response
    try {
      response = await fetch('https://api.openai.com/v1/responses', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${key}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model,
          instructions: ORACULO_SYSTEM_PROMPT,
          input,
          max_output_tokens: 350,
          store: false,
        }),
        signal: controller.signal,
        cache: 'no-store',
      })
    } finally {
      clearTimeout(timeout)
    }

    if (!response.ok) {
      // Nunca devolver el cuerpo del proveedor: podría contener detalles internos.
      return error('El Oráculo no puede responder en este momento.', 502)
    }
    const data: unknown = await response.json()
    const output = (data as { output?: unknown }).output
    const answer = Array.isArray(output)
      ? output.flatMap((item: unknown) => {
          const contents = (item as { content?: unknown })?.content
          return Array.isArray(contents)
            ? contents.filter((part: unknown) => (part as { type?: string })?.type === 'output_text')
                .map((part: unknown) => (part as { text?: string }).text ?? '')
            : []
        }).join('\n').trim()
      : ''
    if (!answer) return error('El Oráculo no encontró palabras para responder.', 502)
    return NextResponse.json({ answer }, { headers: { 'Cache-Control': 'no-store' } })
  } catch {
    return error('El Oráculo no puede responder en este momento.', 502)
  }
}
