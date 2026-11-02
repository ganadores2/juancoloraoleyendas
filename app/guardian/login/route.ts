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
    // Mantener HTTP 429 real, pero presentar una página accesible y coherente
    // con el Taller en lugar del texto sobre fondo blanco del navegador.
    return new Response(`<!doctype html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow">
<title>Acceso en pausa — Sala del Creador</title>
<style>html{color-scheme:dark}body{background:#050505;color:#e5d6b8;min-height:100vh;margin:0;display:grid;place-items:center;font-family:Georgia,serif}main{width:min(88vw,560px);border:1px solid #8d7133;padding:clamp(24px,5vw,56px);text-align:center;box-sizing:border-box}h1{color:#d8ab4d;font-size:clamp(24px,4vw,36px);font-weight:400;letter-spacing:.06em}p{line-height:1.65;font-size:18px}a{display:inline-block;margin-top:18px;padding:14px 24px;color:#eac671;border:1px solid #a58444;text-decoration:none}a:focus-visible{outline:2px solid #fff;outline-offset:4px}</style></head><body><main><p style="color:#d8ab4d;letter-spacing:.2em;font-size:13px">SAN YALLEGO · ACCESO PRIVADO</p><h1>La puerta está en pausa</h1><p>Demasiados intentos. Por seguridad, espera aproximadamente un minuto antes de volver a intentarlo.</p><a href="/guardian">Volver a la Sala del Creador</a></main></body></html>`, {
      status: 429,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-store',
        'Retry-After': String(rate.retryAfter ?? 60),
        'X-Robots-Tag': 'noindex, nofollow',
      },
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
