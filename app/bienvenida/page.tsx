import type { Metadata } from 'next'
import { BienvenidaScreen } from '@/components/san-yallego/bienvenida/bienvenida-screen'

export const metadata: Metadata = { title: 'Bienvenida — San Yallego' }

export default function Page() {
  return <BienvenidaScreen />
}
