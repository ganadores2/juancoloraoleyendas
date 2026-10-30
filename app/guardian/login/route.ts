import { NextResponse } from 'next/server'
import {
  GUARDIAN_COOKIE_NAME,
  GUARDIAN_SESSION_SECONDS,
  issueGuardianSession,
  verifyGuardianPassword,
} from '@/lib/san-yallego/guardian'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function POST(request: Request) {
  const origin = request.headers.get('origin')
  const host = request.headers.get('x-forwarded-host') ?? request.headers.get('host')
  if (origin && (!host || new URL(origin).host !== host)) {
    return new Response('Solicitud no válida.', { status: 403 })
  }

  const data = await request.formData()
  const clave = data.get('clave')
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
