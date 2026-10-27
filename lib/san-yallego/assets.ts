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
    descensoCasaJuanito: '/assets/video/descenso/2-descenso-casa-juanito.mp4',
    /** Mapa -> sitio mítico; cada ruta apunta a un MP4 verificado en GitHub. */
    descensos: {
      'entrada': '/assets/video/descenso/01-Entrada-San-Yallego-menos-10MB.mp4',
      'casa-de-juanito': '/assets/video/descenso/2-descenso-casa-juanito.mp4',
      'sitio-03': '/assets/video/descenso/03-Jardines-Plaza-menos-10MB (1).mp4',
      'sitio-04': '/assets/video/descenso/04-Iglesia-menos-10MB (1).mp4',
      'sitio-05': '/assets/video/descenso/05-Casa-Herrero-menos-10MB (1).mp4',
      'sitio-06': '/assets/video/descenso/06-Rio-Suenos-menos-10MB (1).mp4',
      'sitio-07': '/assets/video/descenso/07-Camino-Dificultad-menos-10MB (1).mp4',
      'sitio-08': '/assets/video/descenso/08-Entrada-Inframundo-menos-10MB (1).mp4',
      'sitio-09': '/assets/video/descenso/09-Lago-MItico-menos-10MB (1).mp4',
      'sitio-10': '/assets/video/descenso/10-Arbol-Ceiba-menos-10MB (1).mp4',
    },
    /** Sitio mítico -> oráculo. Los sitios sellados siguen cerrados. */
    oraculos: {
      'entrada': '/assets/video/oraculo/01-Entrada-San-Yallego-al-Oraculo.mp4',
      'casa-de-juanito': '/assets/video/oraculo/02-Casa-Juanito-al-Oraculo.mp4',
      'sitio-03': '/assets/video/oraculo/03-Jardines-Plaza-al-Oraculo.mp4',
      'sitio-04': '/assets/video/oraculo/04-Iglesia-Pueblo-al-Oraculo.mp4',
      'sitio-05': '/assets/video/oraculo/05-Casa-Herrero-al-Oraculo.mp4',
      'sitio-06': '/assets/video/oraculo/06-Rio-Suenos-al-Oraculo.mp4',
      'sitio-07': '/assets/video/oraculo/07-Camino-Dificultad-al-Oraculo.mp4',
      'sitio-08': '/assets/video/oraculo/08-Puerta-Inframundo-al-Oraculo.mp4',
      'sitio-09': '/assets/video/oraculo/09-Lago-MItico-al-Oraculo.mp4',
      'sitio-10': '/assets/video/oraculo/10-Arbol-Ceiba-al-Oraculo.mp4',
    },
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
