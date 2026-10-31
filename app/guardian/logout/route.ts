import { NextResponse } from 'next/server'
import { GUARDIAN_COOKIE_NAME, isGuardianPostAllowed } from '@/lib/san-yallego/guardian'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function POST(request: Request) {
  if (!isGuardianPostAllowed(request)) {
    return new Response('Solicitud no válida.', { status: 403, headers: { 'Cache-Control': 'no-store' } })
  }

  const response = NextResponse.redirect(new URL('/guardian', request.url), 303)
  response.cookies.set({
    name: GUARDIAN_COOKIE_NAME,
    value: '',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/guardian',
    maxAge: 0,
  })
  response.headers.set('Cache-Control', 'no-store')
  return response
}
