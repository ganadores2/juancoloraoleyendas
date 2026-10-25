import type { Metadata } from 'next'
import { PortalScreen } from '@/components/san-yallego/portal/portal-screen'

export const metadata: Metadata = { title: 'Portal — San Yallego' }

export default function Page() {
  return <PortalScreen />
}
