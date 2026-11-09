/**
 * Archivo de Palabras de San Yallego — primera versión pública sin spoilers.
 * Fuentes: Biblia Maestra V3.0, Biblia visual, archivo de Don Chema y Doña Chavela,
 * definiciones aportadas por el autor, PLS para ElevenLabs, UNAM e INAH.
 * El PLS contiene alias para voces; NO es una fuente de significados y
 * NO debe modificar la ortografía narrativa. Ningún dato N4/N5/C100.
 */
export type GlossaryCategory = 'universo' | 'habla' | 'lenguas' | 'personajes'
export interface GlossaryEntry {
  term: string
  category: GlossaryCategory
  definition: string
  source: string
  sourceUrl?: string
}
export const GLOSSARY: readonly GlossaryEntry[] = [
  { term: "COLORAO", category: "universo", definition: "Capacidad de sentir, recordar, amar, sanar, elegir y actuar. No equivale a ser «bueno» para siempre.", source: "Biblia Maestra V3.0" },
  { term: "Plateado", category: "universo", definition: "Coraza emocional ligada al miedo, el olvido, la frialdad o la pérdida de identidad. No es una condena definitiva.", source: "Biblia Maestra V3.0" },
  { term: "San Yallego", category: "universo", definition: "Pueblo mítico y personaje vivo: sus lugares, silencios y memorias forman parte activa de la historia.", source: "Biblia Maestra V3.0" },
  { term: "Memoria", category: "universo", definition: "Puede permanecer en personas, objetos, lugares, sueños, voces y generaciones. Uno de los hilos centrales de la saga.", source: "Biblia Maestra V3.0" },
  { term: "La Ceiba", category: "universo", definition: "Árbol emblemático vinculado a las raíces y a la memoria de San Yallego. Su importancia se descubre dentro de la historia.", source: "Biblia Maestra V3.0" },
  { term: "XOLO", category: "universo", definition: "Perro guardián y guía de Juan Colorao. Su identidad tiene dimensiones simbólicas que no deben anticiparse.", source: "Biblia Maestra V3.0" },
  { term: "Lago Mítico del Tiempo", category: "universo", definition: "Lugar de San Yallego relacionado con el tiempo, las ruinas y las preguntas que aún no tienen respuesta.", source: "Biblia Maestra V3.0" },
  { term: "Puerta del Mictlán", category: "universo", definition: "También llamada «Puerta hacia el Inframundo» en el mapa. Es un umbral misterioso; el Capítulo XVIII lleva su nombre.", source: "Biblia Maestra V3.0; correspondencia aprobada por el autor" },
  { term: "Llave de San Yallego", category: "universo", definition: "Símbolo que invita a participar en la exploración. Tener una llave no equivale a conocer los secretos.", source: "Biblia Maestra V3.0" },
  { term: "Oráculo", category: "universo", definition: "Voz o interfaz vinculada a un lugar, una pregunta y la experiencia del Viajero. Orienta sin sustituir la historia.", source: "Biblia Maestra V3.0" },
  { term: "Viajero", category: "universo", definition: "Quien acepta entrar y explorar San Yallego.", source: "Biblia Maestra V3.0" },
  { term: "Observador", category: "universo", definition: "Viajero que comienza a reconocer detalles, símbolos y conexiones antes inadvertidos.", source: "Biblia Maestra V3.0" },
  { term: "Testigo", category: "universo", definition: "Persona que reconoce que algunas costumbres y lugares de San Yallego esconden más de lo aparente.", source: "Biblia Maestra V3.0" },
  { term: "Pelado", category: "habla", definition: "Según el contexto puede indicar ignorancia, carencia, vulgaridad o presunción. Entre personas de confianza también sirve para una reprimenda juguetona, sin intención ofensiva.", source: "Definición aportada por el autor" },
  { term: "Pelao", category: "habla", definition: "Variante coloquial de «pelado». El sentido y la intensidad cambian con la relación entre las personas, la situación y el tono.", source: "Definición aportada por el autor" },
  { term: "Burrín", category: "habla", definition: "Alguien sonso, atarantado, ignorante o presuntuoso. En confianza puede funcionar como broma amistosa que provoca risas, no necesariamente como insulto.", source: "Definición aportada por el autor" },
  { term: "Hijas del maíz", category: "habla", definition: "Exclamación burlona para regañar a personas metiches o entrometidas. En la novela se escribe «maíz» normalmente; las grafías exageradas se reservaron para dirigir la actuación en ElevenLabs.", source: "Definición aportada por el autor" },
  { term: "Arguende", category: "habla", definition: "Alboroto, chisme o enredo innecesario; en boca de Doña Chavela suele reprender a quienes se inmiscuyen en asuntos ajenos.", source: "Uso contextual del relato · definición editorial" },
  { term: "¡No sé!", category: "habla", definition: "Respuesta característica de Don Chema, que puede expresar evasiva, picardía, filosofía improvisada o ganas de no levantarse de la hamaca.", source: "Archivo creativo de Don Chema y Doña Chavela" },
  { term: "Eso a mí no me toca saberlo", category: "habla", definition: "Remate habitual atribuido a Doña Chavela: marca límites, esquiva explicaciones o desarma a alguien con humor.", source: "Archivo creativo de Doña Chavela · uso narrativo" },
  { term: "Xoloitzcuintle", category: "lenguas", definition: "Raza tradicional de perro originaria de México. En la tradición mexica se relaciona con el viaje al Mictlán; también es el origen de la denominación abreviada «xolo».", source: "INAH · diccionario de producción de voces", sourceUrl: "https://www.inah.gob.mx/images/interactivos/dia-de-muertos/mictlan/" },
  { term: "Xolos", category: "lenguas", definition: "Plural coloquial de «xolo». En el archivo de voces se incluye para mantener una pronunciación coherente con «Xolo» y «xoloitzcuintle».", source: "Diccionario de producción de voces" },
  { term: "Xóchitl", category: "lenguas", definition: "«Flor» en náhuatl. Se conserva su grafía en el texto; la ayuda fonética de ElevenLabs no debe reemplazarla.", source: "Gran Diccionario Náhuatl (UNAM)", sourceUrl: "https://gdn.iib.unam.mx/diccionario/xochitl/279859" },
  { term: "Xochicalco", category: "lenguas", definition: "Topónimo de origen náhuatl interpretado como «en el lugar de la casa de las flores».", source: "INAH", sourceUrl: "https://www.inah.gob.mx/zonas/zona-arqueologica-de-xochicalco" },
  { term: "Mixcoatl", category: "lenguas", definition: "Mixcóatl, «serpiente de nube», nombre asociado con una deidad de la caza en tradiciones mesoamericanas.", source: "Gran Diccionario Náhuatl (UNAM)", sourceUrl: "https://gdn.iib.unam.mx/diccionario/mixcoatl" },
  { term: "Citlalli", category: "lenguas", definition: "«Estrella» en náhuatl; también se emplea como nombre propio.", source: "Gran Diccionario Náhuatl (UNAM)", sourceUrl: "https://gdn.iib.unam.mx/diccionario/citlalli" },
  { term: "Tonatiuh", category: "lenguas", definition: "«Sol» en náhuatl; también aparece como nombre propio.", source: "Gran Diccionario Náhuatl (UNAM)", sourceUrl: "https://gdn.iib.unam.mx/diccionario/tonatiuh" },
  { term: "Meztli", category: "lenguas", definition: "Forma utilizada en el archivo de voces. Se relaciona con «metztli», palabra náhuatl para «luna»; la ortografía usada en el relato queda pendiente de cotejo.", source: "Gran Diccionario Náhuatl (UNAM) · diccionario de voces", sourceUrl: "https://gdn.iib.unam.mx/diccionario/metztli" },
  { term: "Mazatl", category: "lenguas", definition: "«Venado» o «ciervo» en náhuatl.", source: "Gran Diccionario Náhuatl (UNAM)", sourceUrl: "https://gdn.iib.unam.mx/diccionario/mazatl" },
  { term: "Tzinzunzan", category: "lenguas", definition: "Topónimo de origen purépecha, no náhuatl, asociado con «lugar de los colibríes». Figura en el diccionario de pronunciación.", source: "Gobierno municipal de Tzintzuntzan · diccionario de voces", sourceUrl: "https://tzintzuntzan.gob.mx/tu-municipio-y-sus-32-comunidades/nomenclatura" },
  { term: "Zeltzin", category: "lenguas", definition: "Nombre incluido en la lista de pronunciación de ElevenLabs. Su origen y significado exacto aún requieren cotejo; no se le asigna una etimología inventada.", source: "Diccionario de producción de voces · por verificar" },
  { term: "Tlazohtlaloni", category: "lenguas", definition: "Término incluido en la lista de pronunciación. Está pendiente confirmar su significado y su grafía con una fuente lingüística antes de publicar una traducción.", source: "Diccionario de producción de voces · por verificar" },
  { term: "Juan Colorao", category: "personajes", definition: "Protagonista de la saga. Crece entre las memorias, los afectos y las decisiones difíciles de San Yallego.", source: "Biblia Maestra V3.0" },
  { term: "María de los Ángeles", category: "personajes", definition: "Personaje con voluntad y trayectoria propias, vinculada con la sanación y el crecimiento.", source: "Biblia Maestra V3.0" },
  { term: "Gabriel Vallego / Yallego", category: "personajes", definition: "Figura paternal relacionada con la investigación y los misterios del pueblo. La grafía de su apellido está pendiente de fijación definitiva.", source: "Biblia Maestra V3.0 · nombre por auditar" },
  { term: "Abuelo Pancho", category: "personajes", definition: "Representa tradición, prudencia, memoria familiar y un humor propio.", source: "Biblia Maestra V3.0 · Biblia visual" },
  { term: "Dolores", category: "personajes", definition: "Figura central del afecto y la fortaleza familiar de Juan Colorao.", source: "Biblia Maestra V3.0 · Biblia visual" },
  { term: "Tomás", category: "personajes", definition: "Compañero cercano de Juan, asociado a la amistad y la lealtad.", source: "Biblia visual de personajes" },
  { term: "Lupita", category: "personajes", definition: "Compañera de aventuras vinculada con la inteligencia, la curiosidad y la valentía.", source: "Biblia visual de personajes" },
  { term: "Doña Chavela", category: "personajes", definition: "Mujer de ingenio rápido, carácter y cariño. Su humor nace del contexto, las relaciones y la forma de decir las cosas; no se reduce a insultos.", source: "Archivo creativo · referencia aportada por el autor" },
  { term: "Don Chema", category: "personajes", definition: "Habitante de San Yallego, amigo de la hamaca y de las explicaciones improbables. Su célebre «¡No sé!» suele decir mucho más de lo que parece.", source: "Archivo creativo de Don Chema y Doña Chavela" },
  { term: "Esperanza", category: "personajes", definition: "Figura que da la bienvenida en algunos recorridos del universo. Su presencia funciona como puente entre el Viajero y la experiencia.", source: "Concepto del proyecto aprobado por el autor" },
]
