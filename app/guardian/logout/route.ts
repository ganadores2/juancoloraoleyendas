import { NextResponse } from 'next/server'
import { GUARDIAN_COOKIE_NAME } from '@/lib/san-yallego/guardian'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function POST(request: Request) {
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
