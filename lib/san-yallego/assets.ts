/**
 * Manifiesto único de assets definitivos.
 * Coloca tus archivos en /public con estas rutas (o cambia las rutas aquí).
 * Mientras un archivo no exista, la experiencia muestra un placeholder mínimo
 * con la ruta esperada, y los videos permiten continuar el flujo.
 */
export const ASSETS = {
  images: {
    portada: '/assets/images/portada-san-yallego.jpg',
    mapa: '/assets/images/mapa-san-yallego.jpg',
    oraculoEntrada: '/assets/images/oraculo-entrada.jpg',
    oraculoCasaJuanito: '/assets/images/oraculo-casa-juanito.jpg',
    llave: '/assets/images/llave-san-yallego.png',
  },
  video: {
    bienvenida: '/assets/video/bienvenida-juan-colorao.mp4',
    portal: '/assets/video/portal-transicion.mp4',
    recorridoAereo: '/assets/video/recorrido-aereo-san-yallego.mp4',
    descensoCasaJuanito: '/assets/video/descenso-casa-juanito.mp4',
  },
  audio: {
    primerGrito: '/assets/audio/primer-grito.mp3',
    libro1Capitulo1: '/assets/audio/libro-1/capitulo-01-el-primer-grito.mp3',
  },
} as const

/** Relación de aspecto de las imágenes de escenario (ancho / alto). */
export const STAGE_ASPECT = {
  mapa: 16 / 9,
  oraculo: 16 / 9,
} as const
