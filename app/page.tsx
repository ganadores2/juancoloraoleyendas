import type { Metadata } from 'next'
import { HomeScreen } from '@/components/san-yallego/home/home-screen'
import { introAssetsReady } from '@/lib/san-yallego/intro-ready'

export const metadata: Metadata = { alternates: { canonical: '/' } }

export default function Page() {
  return <HomeScreen introReady={introAssetsReady()} />
}
