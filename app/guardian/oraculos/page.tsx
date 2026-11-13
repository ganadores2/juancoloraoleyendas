import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import matrix from '@/lib/san-yallego/oracle-matrix-v1.json'
import timeline from '@/lib/san-yallego/oracle-timeline-v2.json'
import { buildOracleWorkbench } from '@/lib/san-yallego/oracle-workbench.mjs'
import { CHAPTERS } from '@/lib/san-yallego/chapters'
import { hasGuardianSession } from '@/lib/san-yallego/guardian'
import { SITES } from '@/lib/san-yallego/sites'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = {
  title: 'Tablero Editorial de los Diez Oráculos — Sala del Creador',
  robots: { index: false, follow: false },
}

/** Taller editorial privado, sin desbloquear ninguno de los sitios del recorrido público. */
export default async function GuardianOracleWorkbenchPage() {
  if (!(await hasGuardianSession())) redirect('/guardian')
  const { oracles, summary } = buildOracleWorkbench({
    matrix, timeline, sites: SITES, chapters: CHAPTERS,
  })

  return (
    <main className="min-h-dvh bg-black px-4 py-10 text-foreground sm:px-7">
      <div className="mx-auto max-w-6xl space-y-9">
        <header className="space-y-4 text-center">
          <p className="font-display text-xs tracking-[0.25em] text-gold/75">SAN YALLEGO · SALA DEL CREADOR</p>
          <h1 className="font-display text-2xl text-gold sm:text-4xl">Tablero Editorial de los Diez Oráculos</h1>
          <p className="mx-auto max-w-3xl text-sm leading-relaxed text-foreground/75 sm:text-base">
            Distribución temática aprobada del Libro I. Este tablero es una herramienta de revisión,
            no un nuevo acceso para visitantes ni un Oráculo-GPT en funcionamiento.
          </p>
          <nav aria-label="Navegación del Taller" className="flex flex-wrap justify-center gap-3">
            <Link href="/guardian" className="inline-flex min-h-11 items-center rounded-lg border border-gold/60 px-4 py-2 text-sm text-gold hover:bg-gold/10 focus-visible:outline-2 focus-visible:outline-gold">
              Sala del Creador
            </Link>
            <Link href="/guardian/mapa" className="inline-flex min-h-11 items-center rounded-lg border border-gold/30 px-4 py-2 text-sm text-gold/85 hover:bg-gold/10 focus-visible:outline-2 focus-visible:outline-gold">
              Mapa cinematográfico privado
            </Link>
          </nav>
        </header>

        <aside className="rounded-xl border border-gold/25 bg-gold/5 p-4 text-sm leading-relaxed text-foreground/80">
          <strong className="text-gold">Reglas de continuidad:</strong> las asociaciones con lugares son editoriales y pueden ser simbólicas.
          No significan que cada capítulo transcurra allí. Los ocho sitios sellados siguen sellados
          para los visitantes. Los Libros II–IV no tienen capítulos indexados en este catálogo.
          El índice general de 33 capítulos permanece accesible de forma independiente.
        </aside>

        <section aria-label="Resumen del catálogo" className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { number: summary.sites, label: 'Oráculos inventariados' },
            { number: summary.chapters, label: 'Capítulos distribuidos' },
            { number: summary.withCatalogAudio, label: 'Capítulos con MP3 referenciado' },
            { number: summary.sealedSites, label: 'Lugares públicos sellados' },
          ].map((item) => (
            <div key={item.label} className="rounded-xl border border-gold/25 bg-white/5 p-4 text-center">
              <p className="font-display text-2xl text-gold">{item.number}</p>
              <p className="mt-1 text-xs leading-relaxed text-foreground/70">{item.label}</p>
            </div>
          ))}
        </section>

        <nav aria-label="Ir a un Oráculo" className="flex flex-wrap justify-center gap-2">
          {oracles.map((oracle) => (
            <a key={oracle.id} href={'#oraculo-' + oracle.order}
              className="inline-flex min-h-11 items-center rounded-full border border-gold/30 px-4 py-2 text-xs text-gold/90 hover:bg-gold/10 focus-visible:outline-2 focus-visible:outline-gold">
              {String(oracle.order).padStart(2, '0')} · {oracle.name}
            </a>
          ))}
        </nav>

        <ol className="grid gap-4 md:grid-cols-2">
          {oracles.map((oracle) => (
            <li key={oracle.id} id={'oraculo-' + oracle.order}
              className="scroll-mt-8 space-y-4 rounded-xl border border-gold/30 bg-white/5 p-5">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div className="space-y-1">
                  <p className="text-xs tracking-[0.2em] text-gold/65">ORÁCULO {String(oracle.order).padStart(2, '0')}</p>
                  <h2 className="font-display text-lg text-gold">{oracle.name}</h2>
                </div>
                <span className="rounded-full border border-gold/35 px-3 py-1 text-xs text-foreground/75">
                  {oracle.access === 'sealed' ? 'Sellado al público' : oracle.access === 'requires-item' ? 'Acceso con llave' : 'Entrada pública'}
                </span>
              </div>

              <p className="text-sm text-foreground/80"><strong className="text-gold/90">Dominio:</strong> {oracle.domain}</p>

              <section aria-label={'Capítulos de ' + oracle.name} className="space-y-2">
                <h3 className="text-xs tracking-widest text-gold/75">LIBRO I · ASIGNACIÓN EDITORIAL</h3>
                <ol className="space-y-2">
                  {oracle.chapters.map((chapter) => (
                    <li key={chapter.number} className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-gold/15 bg-black/40 px-3 py-3">
                      <div className="flex min-w-0 flex-1 items-start gap-3">
                        <span className="shrink-0 text-xs tabular-nums text-gold/75">{String(chapter.number).padStart(2, '0')}</span>
                        <div className="space-y-1">
                          <p className="text-sm leading-snug text-foreground/90">{chapter.title}</p>
                          <p className="text-[11px] text-foreground/60">
                            {chapter.hasCatalogAudio ? 'MP3 referenciado' : 'MP3 por verificar'}
                            {' · '}{chapter.audioParts} {chapter.audioParts === 1 ? 'parte' : 'partes'}
                          </p>
                        </div>
                      </div>
                      <Link href={chapter.href}
                        className="inline-flex min-h-10 shrink-0 items-center rounded-lg border border-gold/35 px-3 py-1 text-xs text-gold hover:bg-gold/10 focus-visible:outline-2 focus-visible:outline-gold">
                        Ver capítulo
                      </Link>
                    </li>
                  ))}
                </ol>
              </section>

              <p className="border-l-2 border-gold/30 pl-3 text-xs leading-relaxed text-foreground/65">
                <strong>Nota editorial:</strong> {oracle.relationCaution}
              </p>
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gold/20 pt-3">
                <span className="text-xs text-foreground/60">
                  Libros II–IV: {oracle.futureIndexed === 0 ? 'sin capítulos indexados' : 'referencias por revisar'}
                </span>
                <Link href={'/guardian/sitio/' + oracle.id}
                  className="inline-flex min-h-11 items-center rounded-lg border border-gold/50 px-4 py-2 text-xs text-gold hover:bg-gold/10 focus-visible:outline-2 focus-visible:outline-gold">
                  Revisar vuelo privado
                </Link>
              </div>
            </li>
          ))}
        </ol>

        <footer className="border-t border-gold/20 pt-6 text-center text-xs leading-relaxed text-foreground/65">
          Archivo de preproducción. No modifica sellos, llaves, rutas, audios ni autorización de publicación.
          Los futuros enlaces intertemporales permanecerán vacíos hasta que exista contenido verificado.
        </footer>
      </div>
    </main>
  )
}
