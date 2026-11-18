import type { Metadata } from 'next'
import { QuickFeedback } from '@/components/san-yallego/quick-feedback'

export const metadata: Metadata = {
  title: 'Tu opinión — San Yallego',
  description: 'Cuéntanos qué te pareció tu primera visita a San Yallego.',
  robots: { index: false, follow: false, noarchive: true },
}

export default function OpinionPage() {
  return <QuickFeedback />
}
