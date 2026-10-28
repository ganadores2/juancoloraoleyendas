import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { BienvenidaScreen } from '@/components/san-yallego/bienvenida/bienvenida-screen'
import { introAssetsReady } from '@/lib/san-yallego/intro-ready'

export const metadata: Metadata = { title: 'Bienvenida — San Yallego' }

export default function Page() {
  if (!introAssetsReady()) redirect('/mapa')
  return <BienvenidaScreen />
}
