import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { OraculoGptChat } from '@/components/san-yallego/oraculo-gpt-chat'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = {
  title: 'Oráculo-GPT · Laboratorio de San Yallego',
  robots: { index: false, follow: false, noarchive: true },
}

export default function OraculoGptPilotPage() {
  // Incluso si alguien fusionara accidentalmente el piloto, no aparece en producción.
  if (process.env.VERCEL_ENV === 'production') notFound()
  return (
    <main className="min-h-dvh bg-[#100c09] px-4 py-10 sm:py-16">
      <OraculoGptChat />
    </main>
  )
}
