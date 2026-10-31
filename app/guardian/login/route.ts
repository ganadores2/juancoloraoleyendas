import { NextResponse } from 'next/server'
import {
  GUARDIAN_COOKIE_NAME,
  GUARDIAN_SESSION_SECONDS,
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

  // Un formulario válido es pequeño; no procesar cuerpos declarados como gigantes.
  const length = request.headers.get('content-length')
  if (length && (Number.isNaN(Number(length)) || Number(length) > 4096)) {
    return new Response('Solicitud demasiado grande.', { status: 413, headers: { 'Cache-Control': 'no-store' } })
  }

  let clave: FormDataEntryValue | null = null
  try {
    const data = await request.formData()
    clave = data.get('clave')
  } catch {
    return new Response('Formulario no válido.', { status: 400, headers: { 'Cache-Control': 'no-store' } })
  }

  if (!verifyGuardianPassword(clave)) {
    const response = NextResponse.redirect(new URL('/guardian?error=1', request.url), 303)
    response.headers.set('Cache-Control', 'no-store')
    return response
  }

  const response = NextResponse.redirect(new URL('/guardian', request.url), 303)
  response.cookies.set({
    name: GUARDIAN_COOKIE_NAME,
    value: issueGuardianSession(),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/guardian',
    maxAge: GUARDIAN_SESSION_SECONDS,
  })
  response.headers.set('Cache-Control', 'no-store')
  return response
}
