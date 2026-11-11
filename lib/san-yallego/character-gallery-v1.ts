/**
 * Inventario para el taller visual del Creador. No es canon definitivo.
 * Nunca guardar aquí revelaciones N4/N5/C100, llaves ni URLs privadas.
 * Las láminas del autor siguen en su Biblioteca personal hasta aprobarlas.
 */
export type GalleryStage = {
  id: string
  label: string
  context: string
  /** Ruta pública solamente cuando el autor autorice expresamente la imagen. */
  imageSrc: string | null
  status: 'referencia-privada' | 'por-definir'
}

export type GalleryCharacter = {
  id: string
  name: string
  description: string
  stages: readonly GalleryStage[]
}

export const CHARACTER_GALLERY_V1: readonly GalleryCharacter[] = [
  {
    id: 'juan-colorao',
    name: 'Juan Colorao',
    description: 'Evolución de Juanito a Juan: las edades de las láminas son referencias de producción, no fechas automáticas del relato.',
    stages: [
      { id: 'juan-0-2', label: 'Primera infancia', context: 'Lámina visual · 0–2 años (concepto)', imageSrc: null, status: 'referencia-privada' },
      { id: 'juan-3-5', label: 'Niñez temprana', context: 'Lámina visual · 3–5 años (concepto)', imageSrc: null, status: 'referencia-privada' },
      { id: 'juan-6-10', label: 'Niñez', context: 'Lámina visual · 6–10 años (concepto)', imageSrc: null, status: 'referencia-privada' },
      { id: 'juan-11-15', label: 'Adolescencia', context: 'Lámina visual · 11–15 años (concepto)', imageSrc: null, status: 'referencia-privada' },
      { id: 'juan-16-20', label: 'Juventud', context: 'Lámina visual · 16–20 años (concepto); cotejar con capítulos del Libro I', imageSrc: null, status: 'referencia-privada' },
      { id: 'juan-libro-ii', label: 'Libro II', context: 'Etapa y vestuario por aprobar cuando exista fuente definitiva', imageSrc: null, status: 'por-definir' },
      { id: 'juan-libro-iii', label: 'Libro III', context: 'Etapa visual futura; no inventar edad ni escenas', imageSrc: null, status: 'por-definir' },
      { id: 'juan-libro-iv', label: 'Libro IV', context: 'Continuidad por definir; sin adelantar acontecimientos', imageSrc: null, status: 'por-definir' },
      { id: 'juan-120', label: 'Juan a los 120 años', context: 'Visión artística humorística; NO es edad canónica ni compromiso de un libro', imageSrc: null, status: 'por-definir' },
    ],
  },
  {
    id: 'maria',
    name: 'María de los Ángeles',
    description: 'Evolución visual propia, con etapas y decisiones independientes de las de Juan.',
    stages: [
      { id: 'maria-libro-i', label: 'Libro I', context: 'Lámina de evolución ya conservada en Biblioteca; cotejar edades y rostro', imageSrc: null, status: 'referencia-privada' },
      { id: 'maria-libro-ii', label: 'Libro II', context: 'Apariencia futura por confirmar con el relato', imageSrc: null, status: 'por-definir' },
      { id: 'maria-libro-iii', label: 'Libro III', context: 'Apariencia futura por confirmar con el relato', imageSrc: null, status: 'por-definir' },
      { id: 'maria-libro-iv', label: 'Libro IV', context: 'Apariencia futura por confirmar con el relato', imageSrc: null, status: 'por-definir' },
    ],
  },
  {
    id: 'xolo',
    name: 'XOLO',
    description: 'Guardián y compañero; conservar el misterio y no inferir edad biológica de las ilustraciones.',
    stages: [
      { id: 'xolo-libro-i', label: 'Libro I', context: 'Revisar ficha visual y referencias sin atribuir edades no confirmadas', imageSrc: null, status: 'referencia-privada' },
      { id: 'xolo-libros-futuros', label: 'Libros posteriores', context: 'Continuidad visual en estudio; sin revelar naturaleza u origen', imageSrc: null, status: 'por-definir' },
    ],
  },
  {
    id: 'don-chema',
    name: 'Don Chema',
    description: 'Personaje del pueblo y posible protagonista de Las Andanzas de Don Chema.',
    stages: [
      { id: 'chema-san-yallego', label: 'San Yallego', context: 'Retratos y vestuario por seleccionar de las fichas existentes', imageSrc: null, status: 'referencia-privada' },
      { id: 'chema-serie', label: 'Serie animada', context: 'Diseño de producción pendiente de aprobación', imageSrc: null, status: 'por-definir' },
    ],
  },
]
