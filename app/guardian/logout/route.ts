import { NextResponse } from 'next/server'
import { closedCreatorSessionCookie, isGuardianPostAllowed } from '@/lib/san-yallego/guardian'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function POST(request: Request) {
  if (!isGuardianPostAllowed(request)) {
    return new Response('Solicitud no válida.', { status: 403, headers: { 'Cache-Control': 'no-store' } })
  }

  const response = NextResponse.redirect(new URL('/guardian?salida=1', request.url), 303)
  response.cookies.set(closedCreatorSessionCookie(process.env.NODE_ENV === 'production'))
  response.headers.set('Cache-Control', 'no-store')
  return response
}
