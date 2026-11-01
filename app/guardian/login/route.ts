import { NextResponse } from 'next/server'
import { GuardianFormError, readGuardianForm } from '@/lib/san-yallego/guardian-form.mjs'
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
    const response = NextResponse.redirect(new URL('/guardian?error=1', request.url), 303)
    response.headers.set('Cache-Control', 'no-store')
    return response
  }

  const response = NextResponse.redirect(new URL('/guardian', request.url), 303)
  response.cookies.set(creatorSessionCookie(issueGuardianSession(), process.env.NODE_ENV === 'production'))
  response.headers.set('Cache-Control', 'no-store')
  return response
}
