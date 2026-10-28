import { HomeScreen } from '@/components/san-yallego/home/home-screen'
import { introAssetsReady } from '@/lib/san-yallego/intro-ready'

export default function Page() {
  return <HomeScreen introReady={introAssetsReady()} />
}
