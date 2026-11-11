import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { CHARACTER_GALLERY_V1 } from '@/lib/san-yallego/character-gallery-v1'
import { hasGuardianSession } from '@/lib/san-yallego/guardian'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = {
  title: 'Biblioteca Gráfica — Sala del Creador',
  robots: { index: false, follow: false },
}

/** Taller de preproducción. No exponer retratos ni biografías futuras al público. */
export default async function BibliotecaGraficaPage() {
  if (!(await hasGuardianSession())) redirect('/guardian')

  const referenceCount = CHARACTER_GALLERY_V1.reduce(
    (total, character) => total + character.stages.filter((stage) => stage.status === 'referencia-privada').length,
    0,
  )

  return (
    <main className="min-h-dvh bg-black px-4 py-12 text-foreground sm:px-7">
      <div className="mx-auto max-w-6xl space-y-10">
        <header className="space-y-4 text-center">
          <p className="font-display text-xs tracking-[0.25em] text-gold/75">JUAN COLORAO · LEYENDAS · ACCESO PRIVADO</p>
          <h1 className="font-display text-3xl text-gold sm:text-4xl">Biblioteca Gráfica de Personajes</h1>
          <p className="mx-auto max-w-3xl text-sm leading-relaxed text-foreground/75 sm:text-base">
            Inventario editorial para construir las transiciones de edades y los retratos que
            acompañarán los libros, los diez oráculos y las series animadas.
            Las láminas originales siguen resguardadas en la Biblioteca del autor.
          </p>
          <p className="text-xs text-gold/75">
            {CHARACTER_GALLERY_V1.length} fichas de arranque · {referenceCount} etapas con referencias privadas identificadas
          </p>
          <nav aria-label="Navegación del Taller">
            <Link href="/guardian" className="inline-flex min-h-11 items-center rounded-full border border-gold/55 px-5 py-2 text-sm text-gold hover:bg-gold/10">
              Volver a la Sala del Creador
            </Link>
          </nav>
        </header>

        <aside className="rounded-xl border border-gold/25 bg-gold/5 px-5 py-4 text-sm leading-relaxed text-foreground/75">
          <strong className="text-gold">Estado: preproducción.</strong> Ninguna imagen se considera aprobada por
          estar mencionada en el inventario. No se publican todavía las láminas, los secretos del relato,
          las edades futuras ni fichas técnicas reservadas.
        </aside>

        {CHARACTER_GALLERY_V1.map((character) => (
          <section key={character.id} aria-labelledby={'personaje-' + character.id} className="space-y-4">
            <div className="space-y-2 border-b border-gold/25 pb-4">
              <h2 id={'personaje-' + character.id} className="font-display text-xl text-gold sm:text-2xl">
                {character.name}
              </h2>
              <p className="max-w-3xl text-sm leading-relaxed text-foreground/70">{character.description}</p>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {character.stages.map((stage) => (
                <li key={stage.id} className="overflow-hidden rounded-xl border border-gold/25 bg-white/5">
                  {stage.imageSrc ? (
                    <Image
                      src={stage.imageSrc}
                      alt={'Retrato visual de ' + character.name + ': ' + stage.label}
                      width={640}
                      height={720}
                      className="aspect-[4/3] w-full object-contain bg-black"
                    />
                  ) : (
                    <div
                      role="img"
                      aria-label={'Retrato de ' + character.name + ' pendiente de incorporación'}
                      className="flex aspect-[4/3] items-center justify-center border-b border-gold/15 bg-[radial-gradient(circle_at_center,#38241a,#0a0907)] p-5 text-center"
                    >
                      <span className="text-sm italic text-gold/60">Imagen por incorporar</span>
                    </div>
                  )}
                  <div className="space-y-2 p-4">
                    <h3 className="font-display text-base text-foreground">{stage.label}</h3>
                    <p className="text-xs leading-relaxed text-foreground/65">{stage.context}</p>
                    <p className="text-[11px] tracking-wide text-gold/75">
                      {stage.status === 'referencia-privada' ? 'Referencia en biblioteca privada' : 'Concepto pendiente'}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}
        <footer className="border-t border-gold/20 pt-6 text-center text-sm text-foreground/60">
          Próximo paso: cotejar las láminas originales, aprobar cada etapa y vincular retratos a capítulos y oráculos autorizados.
        </footer>
      </div>
    </main>
  )
}
