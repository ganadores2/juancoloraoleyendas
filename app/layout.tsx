import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Cinzel, Cormorant_Garamond } from 'next/font/google'
import { SoundToggle } from '@/components/san-yallego/sound-toggle'
import { TravelerMapNav } from '@/components/san-yallego/traveler-map-nav'
import './globals.css'

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Juan Colorao · Leyendas — San Yallego',
  description:
    'Bienvenido a San Yallego. Aquí las leyendas no se cuentan. Se descubren.',
  metadataBase: new URL('https://www.juancoloraoleyendas.com'),
  applicationName: 'Juan Colorao Leyendas',
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    siteName: 'Juan Colorao Leyendas',
    title: 'Juan Colorao Leyendas — Descubre San Yallego',
    description: 'Explora San Yallego: sus leyendas, su mapa fantástico y el primer libro El Gran Cambio.',
  },
  twitter: {
    card: 'summary',
    title: 'Juan Colorao Leyendas — San Yallego',
    description: 'Un pueblo por descubrir. Leyendas, personajes y caminos que te invitan a explorar.',
  },
  robots: process.env.VERCEL_ENV === 'production'
    ? { index: true, follow: true }
    : { index: false, follow: false, noarchive: true },
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0f0b08',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${cinzel.variable} ${cormorant.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        {children}
        <TravelerMapNav />
        <SoundToggle />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
