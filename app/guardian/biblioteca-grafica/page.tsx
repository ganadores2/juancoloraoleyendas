import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { CHARACTER_GALLERY_V1, type GalleryStage } from '@/lib/san-yallego/character-gallery-v1'
import { assertGalleryImageSources, galleryCounts } from '@/lib/san-yallego/gallery-policy.mjs'
import { hasGuardianSession } from '@/lib/san-yallego/guardian'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = {
  title: 'Biblioteca Gráfica — Sala del Creador',
  robots: { index: false, follow: false },
}

type Filter = 'todos' | 'identidad' | 'referencias' | 'pendientes'
type PageProps = { searchParams: Promise<{ estado?: string }> }

const filters: readonly { id: Filter; label: string }[] = [
  { id: 'todos', label: 'Todas las etapas' },
  { id: 'identidad', label: 'Identidad aprobada' },
  { id: 'referencias', label: 'Referencias privadas' },
  { id: 'pendientes', label: 'Por definir' },
]

function filterStage(stage: GalleryStage, filter: Filter) {
  if (filter === 'todos') return true
  if (filter === 'identidad') return stage.status === 'identidad-aprobada'
  if (filter === 'referencias') return stage.status === 'referencia-privada'
  return stage.status === 'por-definir'
}

function statusText(stage: GalleryStage) {
  if (stage.status === 'identidad-aprobada') return 'Identidad aprobada · archivos no publicados'
  if (stage.status === 'referencia-privada') return 'Referencias visuales resguardadas'
  return 'Etapa conceptual por definir'
}

/** Taller de preproducción: siempre autenticar antes de mostrar el inventario. */
export default async function BibliotecaGraficaPage({ searchParams }: PageProps) {
  if (!(await hasGuardianSession())) redirect('/guardian')
  const requested = (await searchParams).estado
  const filter: Filter = requested === 'identidad' || requested === 'referencias' || requested === 'pendientes'
    ? requested : 'todos'

  // El inventario puede contener nombres y conceptos, pero jamás URL privada o material sin aprobar.
  assertGalleryImageSources(CHARACTER_GALLERY_V1)
  const counts = galleryCounts(CHARACTER_GALLERY_V1)
  const visibleCharacters = CHARACTER_GALLERY_V1
    .map((character) => ({ ...character, stages: character.stages.filter((stage) => filterStage(stage, filter)) }))
    .filter((character) => character.stages.length > 0)

  return (
    <main className="min-h-dvh bg-black px-4 py-12 text-foreground sm:px-7">
      <div className="mx-auto max-w-6xl space-y-9">
        <header className="space-y-4 text-center">
          <p className="font-display text-xs tracking-[0.25em] text-gold/75">JUAN COLORAO · LEYENDAS · ACCESO PRIVADO</p>
          <h1 className="font-display text-3xl text-gold sm:text-4xl">Biblioteca Gráfica de Personajes</h1>
          <p className="mx-auto max-w-3xl text-sm leading-relaxed text-foreground/75 sm:text-base">
            Taller de continuidad visual de los personajes, sus edades y sus futuras apariciones.
            Las láminas originales permanecen en la Biblioteca privada del autor.
          </p>
          <nav aria-label="Navegación del Taller">
            <Link href="/guardian"
              className="inline-flex min-h-11 items-center rounded-full border border-gold/55 px-5 py-2 text-sm text-gold hover:bg-gold/10 focus-visible:outline-2 focus-visible:outline-gold">
              Volver a la Sala del Creador
            </Link>
          </nav>
        </header>

        <aside className="space-y-2 rounded-xl border border-gold/30 bg-gold/5 px-5 py-4 text-sm leading-relaxed text-foreground/80">
          <p><strong className="text-gold">Estado: taller privado.</strong> Una identidad aprobada no implica autorización para publicar imágenes.</p>
          <p>JUANCO adulto —el presentador de la bienvenida y la portada— se registra por separado de las edades del Libro I.
            La aprobación facial nunca se extiende automáticamente al joven Juan de 17 años ni a libros futuros.</p>
        </aside>

        <section aria-label="Resumen de la biblioteca" className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { value: counts.characters, label: 'Personajes' },
            { value: counts.approvedIdentity, label: 'Identidades aprobadas' },
            { value: counts.privateReferences, label: 'Referencias privadas' },
            { value: counts.publishedImages, label: 'Imágenes incorporadas' },
          ].map((item) => (
            <div key={item.label} className="rounded-xl border border-gold/20 bg-white/5 p-4 text-center">
              <p className="font-display text-2xl text-gold">{item.value}</p>
              <p className="mt-1 text-xs leading-relaxed text-foreground/65">{item.label}</p>
            </div>
          ))}
        </section>

        <nav aria-label="Filtrar etapas de la biblioteca" className="flex flex-wrap justify-center gap-2">
          {filters.map((option) => (
            <Link key={option.id}
              href={option.id === 'todos' ? '/guardian/biblioteca-grafica' : '/guardian/biblioteca-grafica?estado=' + option.id}
              aria-current={filter === option.id ? 'page' : undefined}
              className={'inline-flex min-h-11 items-center rounded-full border px-4 py-2 text-xs font-medium focus-visible:outline-2 focus-visible:outline-gold ' +
                (filter === option.id ? 'border-gold bg-gold/15 text-gold' : 'border-gold/25 text-foreground/75 hover:border-gold/60')}>
              {option.label}
            </Link>
          ))}
        </nav>

        {visibleCharacters.length === 0 && (
          <p role="status" className="rounded-lg border border-gold/20 p-6 text-center text-sm text-foreground/75">
            No hay etapas en esta categoría. Puedes regresar a “Todas las etapas”.
          </p>
        )}

        {visibleCharacters.map((character) => (
          <section key={character.id} aria-labelledby={'personaje-' + character.id} className="space-y-4">
            <div className="space-y-2 border-b border-gold/25 pb-4">
              <h2 id={'personaje-' + character.id} className="font-display text-xl text-gold sm:text-2xl">{character.name}</h2>
              <p className="max-w-3xl text-sm leading-relaxed text-foreground/70">{character.description}</p>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {character.stages.map((stage) => (
                <li key={stage.id} className="overflow-hidden rounded-xl border border-gold/25 bg-white/5">
                  {stage.imageSrc ? (
                    <Image
                      src={stage.imageSrc}
                      alt={'Retrato de ' + character.name + ' — ' + stage.label}
                      width={640} height={720}
                      className="aspect-[4/3] w-full object-contain bg-black"
                    />
                  ) : (
                    <div aria-hidden="true"
                      className="flex aspect-[4/3] items-center justify-center border-b border-gold/15 bg-[radial-gradient(circle_at_center,#38241a,#0a0907)] p-5 text-center">
                      <span className="text-sm italic text-gold/60">Imagen aún no incorporada</span>
                    </div>
                  )}
                  <div className="space-y-3 p-4">
                    <h3 className="font-display text-base text-foreground">{stage.label}</h3>
                    <p className="text-xs leading-relaxed text-foreground/70">{stage.context}</p>
                    <p className="text-xs font-medium text-gold/80">{statusText(stage)}</p>
                    {stage.views && (
                      <div className="space-y-2 border-t border-gold/20 pt-3">
                        <p className="text-xs text-foreground/75">Plantilla del mismo personaje · {stage.views.length} ángulos</p>
                        <ol className="grid grid-cols-2 gap-2">
                          {stage.views.map((view) => (
                            <li key={view.id} className="rounded-lg border border-gold/20 bg-black/40 p-2">
                              {view.imageSrc ? (
                                <Image src={view.imageSrc}
                                  alt={character.name + ' — ' + view.label}
                                  width={320} height={400} className="aspect-[3/4] w-full object-contain" />
                              ) : (
                                <div aria-hidden="true" className="flex aspect-[3/4] items-center justify-center bg-white/5 text-center text-[10px] text-foreground/55">
                                  Vista reservada
                                </div>
                              )}
                              <p className="mt-2 text-[11px] leading-snug text-gold/80">{view.label}</p>
                            </li>
                          ))}
                        </ol>
                        <p className="text-[11px] leading-relaxed text-foreground/60">
                          Los siete ángulos pertenecen a una sola etapa. La plantilla aprobada sigue en el archivo privado.
                        </p>
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <footer className="border-t border-gold/20 pt-6 text-center text-sm text-foreground/65">
          Preparación editorial: validar cada referencia y obtener autorización independiente antes de subir retratos.
          Los capítulos, Oráculos y sitios sellados no se alteran.
        </footer>
      </div>
    </main>
  )
}
