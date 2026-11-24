import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import matrix from '@/lib/san-yallego/oracle-matrix-v1.json'
import proposals from '@/lib/san-yallego/oracle-voice-proposals-v1.json'
import { assertOracleVoiceProposals } from '@/lib/san-yallego/oracle-voice-review.mjs'
import { hasGuardianSession } from '@/lib/san-yallego/guardian'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = {
  title: 'Voces de los Diez Oráculos — Taller del Creador',
  robots: { index: false, follow: false },
}

/** Sala de revisión editorial: NO activa modelos ni añade voces a los recorridos. */
export default async function VocesOraculosPage() {
  if (!(await hasGuardianSession())) redirect('/guardian')

  assertOracleVoiceProposals(proposals, matrix)
  const entries = matrix.sites.map((site) => {
    const profile = proposals.profiles.find((item) => item.siteId === site.siteId)
    if (!profile) throw new Error('Falta dirección vocal para ' + site.siteId)
    return { site, profile }
  })

  return (
    <main className="min-h-dvh bg-black px-4 py-10 text-foreground sm:px-7">
      <div className="mx-auto max-w-6xl space-y-9">
        <header className="space-y-4 text-center">
          <p className="font-display text-xs tracking-[0.25em] text-gold/70">SAN YALLEGO · PREPRODUCCIÓN PRIVADA</p>
          <h1 className="font-display text-2xl text-gold sm:text-4xl">Las Diez Voces de los Oráculos</h1>
          <p className="mx-auto max-w-3xl text-sm leading-relaxed text-foreground/75 sm:text-base">
            Un solo futuro motor de conversación y diez direcciones vocales distintas.
            Todas las propuestas de personalidad requieren aprobación del Creador antes de producir audio.
          </p>
          <nav aria-label="Volver al Taller" className="flex flex-wrap justify-center gap-3">
            <Link href="/guardian" className="inline-flex min-h-11 items-center rounded-lg border border-gold/55 px-5 py-2 text-sm text-gold hover:bg-gold/10 focus-visible:outline-2 focus-visible:outline-gold">
              Regresar a la Sala del Creador
            </Link>
            <Link href="/guardian/mapa" className="inline-flex min-h-11 items-center rounded-lg border border-gold/30 px-5 py-2 text-sm text-gold/80 hover:bg-gold/10 focus-visible:outline-2 focus-visible:outline-gold">
              Mapa privado
            </Link>
          </nav>
        </header>

        <aside className="rounded-xl border border-gold/25 bg-gold/5 p-5 text-sm leading-relaxed text-foreground/80">
          <strong className="text-gold">Propuesta no canónica.</strong> Las preguntas y respuestas de ejemplo
          proceden de la matriz editorial ya aprobada; el timbre, ritmo y vocabulario
          son opciones de dirección artística todavía sin aprobar. No se han generado
          audios, contratado proveedores ni activado un Oráculo-GPT. Los lugares sellados siguen cerrados.
        </aside>

        <nav aria-label="Ir a una propuesta vocal" className="flex flex-wrap justify-center gap-2">
          {entries.map(({ site }) => (
            <a key={site.siteId} href={'#voz-' + site.siteId}
              className="inline-flex min-h-11 items-center rounded-full border border-gold/25 px-3 py-2 text-xs text-gold hover:bg-gold/10 focus-visible:outline-2 focus-visible:outline-gold">
              {String(site.order).padStart(2, '0')} · {site.siteName}
            </a>
          ))}
        </nav>

        <ol className="grid gap-4 md:grid-cols-2">
          {entries.map(({ site, profile }) => (
            <li key={site.siteId} id={'voz-' + site.siteId}
              className="scroll-mt-8 space-y-4 rounded-xl border border-gold/25 bg-white/5 p-5">
              <header className="space-y-2">
                <p className="text-xs tracking-[0.15em] text-gold/75">ORÁCULO {String(site.order).padStart(2, '0')} · VOZ POR APROBAR</p>
                <h2 className="font-display text-xl text-gold">{profile.workingName}</h2>
                <p className="text-sm text-foreground/75">{site.siteName} · {site.domainProposal}</p>
              </header>
              <dl className="space-y-3 text-sm">
                <div>
                  <dt className="font-medium text-gold/85">Carácter propuesto</dt>
                  <dd className="leading-relaxed text-foreground/75">{profile.timbre}</dd>
                </div>
                <div>
                  <dt className="font-medium text-gold/85">Ritmo y pausas</dt>
                  <dd className="leading-relaxed text-foreground/75">{profile.rhythm}</dd>
                </div>
                <div>
                  <dt className="font-medium text-gold/85">Vocabulario y propósito</dt>
                  <dd className="leading-relaxed text-foreground/75">{profile.lexicon} {profile.guide}</dd>
                </div>
                <div>
                  <dt className="font-medium text-gold/85">Lo que debe evitar</dt>
                  <dd className="leading-relaxed text-foreground/75">{profile.avoid}</dd>
                </div>
              </dl>

              <section aria-label={'Ejemplo aprobado para ' + site.siteName}
                className="space-y-3 rounded-lg border border-gold/20 bg-black/40 p-4">
                <h3 className="text-xs font-medium tracking-wide text-gold">EJEMPLO DE LA MATRIZ APROBADA</h3>
                <p className="text-sm italic leading-relaxed text-foreground/90">«{site.sampleQuestion}»</p>
                <p className="text-sm leading-relaxed text-foreground/75">{site.safeResponseExample}</p>
                <p className="text-xs leading-relaxed text-foreground/60">
                  Nota de continuidad: {site.continuityCaution}
                </p>
              </section>
              <p className="text-xs text-foreground/55">Sin audio ni síntesis de voz incorporados.</p>
            </li>
          ))}
        </ol>

        <footer className="border-t border-gold/20 pt-6 text-center text-xs leading-relaxed text-foreground/65">
          Esta página es un laboratorio editorial privado. Ninguna propuesta altera el canon,
          los 33 capítulos, los diez sitios, las llaves, los accesos ni los recorridos.
        </footer>
      </div>
    </main>
  )
}
