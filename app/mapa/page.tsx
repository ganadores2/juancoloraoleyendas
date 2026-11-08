import type { Metadata } from 'next'
import { MapaScreen } from '@/components/san-yallego/mapa/mapa-screen'

export const metadata: Metadata = {
  alternates: { canonical: '/mapa' }, title: 'Mapa Fantástico — San Yallego' }

export default function Page() {
  return <MapaScreen />
}
