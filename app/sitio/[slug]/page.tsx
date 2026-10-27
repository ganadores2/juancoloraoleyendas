import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CasaJuanitoScreen } from '@/components/san-yallego/casa/casa-juanito-screen'
import { OraculoEntrada } from '@/components/san-yallego/oraculo/oraculo-entrada'
import { SiteJourney } from '@/components/san-yallego/site-journey'
import { SealedSite } from '@/components/san-yallego/sealed-site'
import { getSite, siteLabel, SITES } from '@/lib/san-yallego/sites'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return SITES.map((site) => ({ slug: site.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const site = getSite((await params).slug)
  return { title: site ? `${siteLabel(site)} — San Yallego` : 'San Yallego' }
}

export default async function Page({ params }: Props) {
  const site = getSite((await params).slug)
  if (!site) notFound()

  switch (site.experience) {
    case 'oraculo-entrada':
      return <SiteJourney siteId={site.id}><OraculoEntrada /></SiteJourney>
    case 'casa-de-juanito':
      return <SiteJourney siteId={site.id}><CasaJuanitoScreen skipDescenso /></SiteJourney>
    case 'sellado':
      return <SealedSite title={siteLabel(site)} />
  }
}
