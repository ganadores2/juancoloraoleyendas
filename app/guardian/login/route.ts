import { NextResponse } from 'next/server'
import { GuardianFormError, readGuardianForm } from '@/lib/san-yallego/guardian-form.mjs'
import { checkGuardianLoginRate } from '@/lib/san-yallego/guardian-rate-limit.mjs'
import {
  creatorSessionCookie,
  isGuardianPostAllowed,
  issueGuardianSession,
  verifyGuardianPassword,
} from '@/lib/san-yallego/guardian'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function POST(request: Request) {
  if (!isGuardianPostAllowed(request)) {
    return new Response('Solicitud no válida.', { status: 403, headers: { 'Cache-Control': 'no-store' } })
  }

  const rate = await checkGuardianLoginRate(request)
  if (rate.status === 'limited') {
    return new Response('Demasiados intentos. Intenta de nuevo más tarde.', {
      status: 429,
      headers: { 'Cache-Control': 'no-store', 'Retry-After': String(rate.retryAfter ?? 60) },
    })
  }
  // Nunca aceptar un login sin protección distribuida, tampoco en Preview.
  // En Preview el código de diagnóstico distingue configuración/IP/proveedor/red
  // sin mostrar claves, tokens, IPs ni URLs de Redis.
  if (rate.status === 'unavailable') {
    const diagnostic = process.env.VERCEL_ENV === 'preview'
      ? ` (diagnóstico: ${rate.reason ?? 'desconocido'})` : ''
    return new Response(`Protección temporalmente no disponible${diagnostic}. Intenta más tarde.`, {
      status: 503,
      headers: { 'Cache-Control': 'no-store', 'Retry-After': '60' },
    })
  }

  let clave: string | null
  try {
    clave = await readGuardianForm(request)
  } catch (error) {
    const status = error instanceof GuardianFormError ? error.status : 400
    return new Response(status === 413 ? 'Solicitud demasiado grande.' : 'Formulario no válido.', {
      status,
      headers: { 'Cache-Control': 'no-store' },
    })
  }

  if (!verifyGuardianPassword(clave)) {
    const destination = new URL('/guardian?error=1', request.url)
    if (process.env.VERCEL_ENV === 'preview' && rate.attempts !== undefined) {
      destination.searchParams.set('attempt', String(rate.attempts))
    }
    const response = NextResponse.redirect(destination, 303)
    response.headers.set('Cache-Control', 'no-store')
    return response
  }

  const response = NextResponse.redirect(new URL('/guardian', request.url), 303)
  response.cookies.set(creatorSessionCookie(issueGuardianSession(), process.env.NODE_ENV === 'production'))
  response.headers.set('Cache-Control', 'no-store')
  return response
}
