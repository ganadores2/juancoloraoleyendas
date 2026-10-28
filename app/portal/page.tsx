import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { PortalScreen } from '@/components/san-yallego/portal/portal-screen'
import { introAssetsReady } from '@/lib/san-yallego/intro-ready'

export const metadata: Metadata = { title: 'Portal — San Yallego' }

export default function Page() {
  if (!introAssetsReady()) redirect('/mapa')
  return <PortalScreen />
}
