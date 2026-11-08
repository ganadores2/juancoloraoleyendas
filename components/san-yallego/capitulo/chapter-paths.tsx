'use client'

import Link from 'next/link'
import { useState } from 'react'
import type { ChapterPath, ChapterPathKind } from '@/lib/san-yallego/chapters'
import { ritualButton } from '../ritual'

const INTERLUDIO = [
  {
    title: 'El eco del primer grito',
    text: 'Hay comienzos que se escuchan una sola vez y continúan resonando en quienes los recuerdan. En San Yallego, ninguna historia nace completamente sola.',
  },
  {
    title: 'Las voces que esperan',
    text: 'Detrás de una voz hay un pueblo entero: sus caminos, sus casas y las preguntas de quienes aún no conoces. Escuchar también es una manera de entrar.',
  },
  {
    title: 'El siguiente umbral',
    text: 'Este interludio no reemplaza al Capítulo II, «El Nombre Que Quema». Los 33 capítulos de «El Gran Cambio» ya existen. Puedes descubrir sus títulos en el índice oficial mientras incorporamos los demás audiolibros.',
  },
] as const

const MYSTERY_CLUES = {
  mapa: 'El mapa te mostró lugares. Pero antes de abrir un camino, necesitaste detenerte ante las preguntas del Oráculo.',
  pregunta: 'Una pregunta puede abrir algo que ninguna cerradura guarda: la curiosidad. Esa es una de las pistas que deja tu recorrido.',
  respuesta: 'Las respuestas son parte del viaje, pero no siempre son su final. A veces lo importante es atreverse a preguntar otra vez.',
} as const

const REFLECTIONS = {
  fe: 'La fe invita a dar el primer paso aun cuando el camino completo todavía no se ve.',
  esperanza: 'La esperanza mantiene una luz encendida: lo que hoy es un comienzo puede convertirse en un camino.',
  caridad: 'La caridad recuerda que una historia vale también por lo que somos capaces de compartir con otros.',
} as const

type MysteryChoice = keyof typeof MYSTERY_CLUES
type ReflectionChoice = keyof typeof REFLECTIONS

/** Tres interludios tras escuchar el primer capítulo.
 * No adelantan capítulos inéditos ni alteran las llaves o los sitios sellados.
 */
export function ChapterPaths({ paths }: { paths: ChapterPath[] }) {
  const [selected, setSelected] = useState<ChapterPathKind | null>(null)
  const [fragment, setFragment] = useState(0)
  const [mystery, setMystery] = useState<MysteryChoice | null>(null)
  const [reflection, setReflection] = useState<ReflectionChoice | null>(null)

  const choose = (kind: ChapterPathKind) => {
    setSelected(kind)
    setFragment(0)
    setMystery(null)
    setReflection(null)
  }

  return (
    <section aria-label="Caminos después del primer capítulo"
      className="animate-sy-fade-in flex w-full max-w-2xl flex-col items-center gap-6">
      <div className="flex flex-col items-center gap-3 text-center">
        <p className="max-w-lg text-balance text-sm italic text-foreground/80">
          Has terminado el primer capítulo. Tu aventura en San Yallego apenas comienza.
        </p>
        <p className="font-display text-[10px] tracking-[0.22em] text-gold/75">
          ELIGE TU SIGUIENTE MIRADA
        </p>
      </div>

      <div className="grid w-full gap-3 sm:grid-cols-3" role="group" aria-label="Tres caminos narrativos">
        {paths.map((path) => (
          <button key={path.kind} type="button" onClick={() => choose(path.kind)}
            aria-pressed={selected === path.kind}
            className={`min-h-20 rounded-xl border px-4 py-4 font-display text-xs tracking-[0.12em] transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${selected === path.kind
              ? 'border-gold bg-gold/15 text-gold shadow-[0_0_24px_-12px_var(--gold)]'
              : 'border-gold/35 bg-black/30 text-foreground/85 hover:border-gold/70 hover:text-gold'}`}>
            {path.label}
          </button>
        ))}
      </div>

      {selected && (
        <article key={selected} aria-live="polite"
          className="animate-sy-fade-in flex w-full flex-col items-center gap-5 rounded-2xl border border-gold/30 bg-black/55 px-5 py-8 text-center shadow-xl sm:px-9">
          {selected === 'seguir-la-historia' && (
            <>
              <p className="font-display text-[10px] tracking-[0.24em] text-gold/65">
                INTERLUDIO LITERARIO · {fragment + 1} DE {INTERLUDIO.length}
              </p>
              <h2 className="font-display text-xl tracking-[0.08em] text-gold sm:text-2xl">
                {INTERLUDIO[fragment].title}
              </h2>
              <p className="max-w-lg text-balance text-base leading-relaxed italic text-foreground/85">
                {INTERLUDIO[fragment].text}
              </p>
              {fragment < INTERLUDIO.length - 1 ? (
                <button type="button" onClick={() => setFragment((value) => value + 1)}
                  className={ritualButton('primary', 'min-h-12 text-xs tracking-[0.15em]')}>
                  Continuar el interludio
                </button>
              ) : (
                <Link href="/libro/1" className={ritualButton('primary', 'min-h-12 text-xs tracking-[0.15em]')}>
                  Ver los 33 capítulos del Libro I
                </Link>
              )}
            </>
          )}

          {selected === 'descubrir-un-misterio' && (
            <>
              <p className="font-display text-[10px] tracking-[0.24em] text-gold/65">
                UNA PISTA PARA EL CAMINANTE
              </p>
              <h2 className="font-display text-xl tracking-[0.08em] text-gold sm:text-2xl">
                ¿Qué llevabas antes de recibir la llave?
              </h2>
              <p className="max-w-lg text-balance text-sm italic text-foreground/75">
                Recuerda las preguntas del Oráculo de la Entrada. Elige una interpretación.
              </p>
              <div className="flex w-full flex-wrap justify-center gap-3">
                {([
                  ['mapa', 'Un mapa'],
                  ['pregunta', 'Una pregunta'],
                  ['respuesta', 'Una respuesta'],
                ] as const).map(([key, label]) => (
                  <button key={key} type="button" onClick={() => setMystery(key)}
                    aria-pressed={mystery === key}
                    className={`min-h-11 rounded-full border px-4 py-2 text-xs transition-colors ${mystery === key
                      ? 'border-gold bg-gold/15 text-gold'
                      : 'border-foreground/25 text-foreground/85 hover:border-gold/60'}`}>
                    {label}
                  </button>
                ))}
              </div>
              {mystery && (
                <p className="max-w-lg rounded-xl border border-gold/20 bg-gold/5 p-5 text-balance text-sm leading-relaxed text-foreground/90">
                  {MYSTERY_CLUES[mystery]}
                </p>
              )}
              <p className="text-xs italic text-foreground/55">
                Es una pista simbólica, no una nueva llave ni la revelación de un secreto de la saga.
              </p>
            </>
          )}

          {selected === 'mirar-mas-profundo' && (
            <>
              <p className="font-display text-[10px] tracking-[0.24em] text-gold/65">
                UNA PREGUNTA PARA LLEVAR CONTIGO
              </p>
              <h2 className="font-display text-xl tracking-[0.08em] text-gold sm:text-2xl">
                ¿Qué fuerza eliges para tu camino?
              </h2>
              <p className="max-w-lg text-balance text-sm italic text-foreground/75">
                No hay una respuesta correcta. Cada viajero descubre algo distinto en una misma historia.
              </p>
              <div className="flex w-full flex-wrap justify-center gap-3">
                {([
                  ['fe', 'Fe'],
                  ['esperanza', 'Esperanza'],
                  ['caridad', 'Caridad'],
                ] as const).map(([key, label]) => (
                  <button key={key} type="button" onClick={() => setReflection(key)}
                    aria-pressed={reflection === key}
                    className={`min-h-11 rounded-full border px-5 py-2 text-xs transition-colors ${reflection === key
                      ? 'border-gold bg-gold/15 text-gold'
                      : 'border-foreground/25 text-foreground/85 hover:border-gold/60'}`}>
                    {label}
                  </button>
                ))}
              </div>
              {reflection && (
                <p className="max-w-lg rounded-xl border border-gold/20 bg-gold/5 p-5 text-balance text-sm leading-relaxed text-foreground/90">
                  {REFLECTIONS[reflection]}
                </p>
              )}
            </>
          )}

          <button type="button" onClick={() => setSelected(null)}
            className={ritualButton('secondary', 'min-h-11 text-[10px] tracking-[0.17em]')}>
            Volver a elegir un camino
          </button>
        </article>
      )}

      <div className="flex flex-wrap justify-center gap-3">
        <Link href="/glosario" className={ritualButton('secondary', 'min-h-11 text-[10px] tracking-[0.13em]')}>
          Consultar palabras y personajes
        </Link>
        <Link href="/mapa" className={ritualButton('secondary', 'min-h-11 text-[10px] tracking-[0.17em]')}>
          Regresar al mapa de San Yallego
        </Link>
      </div>
    </section>
  )
}
