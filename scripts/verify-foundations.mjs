import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()
const source = (path) => readFileSync(join(root, path), 'utf8')

const assets = source('lib/san-yallego/assets.ts')
const siteConfig = source('lib/san-yallego/sites.ts')
const progress = source('lib/san-yallego/progress.ts')
const page = source('app/sitio/[slug]/page.tsx')
const guardian = source('lib/san-yallego/guardian.ts')
const guardianCore = source('lib/san-yallego/guardian-core.mjs')
const loginRoute = source('app/guardian/login/route.ts')
const rateLimiter = source('lib/san-yallego/guardian-rate-limit.mjs')
const logoutRoute = source('app/guardian/logout/route.ts')
const guardianIndex = source('app/guardian/page.tsx')
const nextConfig = source('next.config.mjs')
const guardianPage = source('app/guardian/sitio/[slug]/page.tsx')
const mapScreen = source('components/san-yallego/mapa/mapa-screen.tsx')
const navMenu = source('components/san-yallego/traveler-map-nav.tsx')
const journey = source('components/san-yallego/site-journey.tsx')
const welcome = source('components/san-yallego/bienvenida/bienvenida-screen.tsx')
const portal = source('components/san-yallego/portal/portal-screen.tsx')
const casaJuanito = source('components/san-yallego/casa/casa-juanito-screen.tsx')
const audioPlayer = source('components/san-yallego/capitulo/audio-player.tsx')
const chapterScreen = source('components/san-yallego/capitulo/chapter-screen.tsx')
const chapterPaths = source('components/san-yallego/capitulo/chapter-paths.tsx')
const chaptersData = source('lib/san-yallego/chapters.ts')
const oracleMatrix = JSON.parse(source('lib/san-yallego/oracle-matrix-v1.json'))
const oracleTimeline = JSON.parse(source('lib/san-yallego/oracle-timeline-v2.json'))
const oracleAudioCatalog = source('lib/san-yallego/oracle-audio-catalog.ts')
const temporalDesign = source('docs/oraculos/arquitectura-temporal-libros-1-4.md')
const bookOneCatalog = source('app/libro/1/page.tsx')
const reader = source('components/san-yallego/capitulo/immersive-reader.tsx')
const chapterOneText = source('lib/san-yallego/chapter-one-text.ts')
const glossary = source('lib/san-yallego/glossary.ts')
const glossaryPage = source('app/glosario/page.tsx')
const glossaryExplorer = source('components/san-yallego/glossary-explorer.tsx')

const videos = [...assets.matchAll(/['"](\/assets\/video\/[^'"]+\.mp4)['"]/g)].map((match) => match[1])
assert.ok(videos.length >= 24, `Se esperaban 24 videos de bienvenida y recorridos; encontrados ${videos.length}`)
for (const video of videos) {
  assert.ok(existsSync(join(root, 'public', video.slice(1))), `Falta un video: ${video}`)
}
assert.ok(existsSync(join(root, 'public/assets/audio/libro-1/capitulo-01-el-primer-grito.mp3')),
  'Falta el capítulo 1 en MP3')

for (let n = 3; n <= 10; n++) {
  const id = String(n).padStart(2, '0')
  const rule = new RegExp(`id: 'sitio-${id}'[^\\n]*unlock: \\{ kind: 'sealed' \\}`)
  assert.match(siteConfig, rule, `El sitio ${id} ya no está sellado en el mapa público`)
}
assert.match(progress, /case 'sealed':\s*return false/, 'El guardián de progreso debe bloquear lugares sellados')
assert.match(page, /case 'sellado':\s*return <SealedSite/, 'Las rutas públicas selladas deben permanecer cerradas')
assert.match(guardianCore, /SAN_YALLEGO_MASTER_KEY/, 'La llave debe provenir del entorno del servidor')
assert.match(guardian, /server-only/, 'El núcleo privado debe bloquear importaciones desde el navegador')
assert.match(guardianCore, /timingSafeEqual/, 'La comparación de credenciales debe evitar diferencias de tiempo')
assert.match(loginRoute, /isGuardianPostAllowed/, 'El login debe validar el origen de la solicitud')
assert.match(loginRoute, /checkGuardianLoginRate\(request\)/, 'El login debe comprobar intentos distribuidos')
assert.match(loginRoute, /rate.status === 'limited'/, 'El login debe detener solicitudes con tasa excedida')
assert.match(loginRoute, /if \(rate.status === 'unavailable'\)/, 'Preview y Production deben rechazar login sin contador compartido')
assert.match(rateLimiter, /'EVAL'/, 'El contador compartido debe ejecutarse como operación atómica')
assert.match(logoutRoute, /isGuardianPostAllowed/, 'El logout debe validar el origen de la solicitud')
assert.ok(logoutRoute.includes('closedCreatorSessionCookie('), 'Logout debe expirar la cookie compartida')
assert.ok(loginRoute.includes('creatorSessionCookie('), 'Login debe usar la misma política de cookie')
assert.ok(guardianIndex.includes("salida === '1'"), 'La Sala debe mostrar el cierre de sesión')
assert.ok(guardianIndex.includes('href="/guardian/sitio/casa-de-juanito"'),
  'Tras el cierre debe existir enlace para probar el bloqueo de una ruta privada')
assert.match(nextConfig, /ignoreBuildErrors:\s*false/, 'El build no debe ignorar errores de TypeScript')
assert.match(nextConfig, /X-Robots-Tag/, 'Las páginas privadas deben excluirse de indexación')
assert.match(nextConfig, /no-store/, 'Las páginas privadas no deben cachearse')
assert.match(guardianPage, /hasGuardianSession/, 'La sala privada debe verificar una sesión antes de mostrar los recorridos')

assert.match(mapScreen, /href="\/guardian"/, 'El Taller del Creador debe enlazarse desde el mapa')
assert.match(mapScreen, /El Taller del Creador/, 'La entrada del creador debe identificarse en el mapa')
assert.match(navMenu, /pathname\.startsWith\('\/guardian'\)/,
  'El menú global no debe tapar el ingreso privado')
assert.doesNotMatch(mapScreen, /SAN_YALLEGO_MASTER_KEY|SAN_YALLEGO_GUARDIAN_SECRET/,
  'El mapa público no debe contener ni referenciar las credenciales privadas')

assert.ok(journey.includes('advanceJourneyPhase'), 'El recorrido debe usar la máquina de fases comprobada')
assert.ok(journey.includes("siteId === 'entrada' || siteId === 'casa-de-juanito'"),
  'Entrada y Casa deben usar la misma secuencia de dos vuelos comprobada')
assert.ok(journey.includes("ASSETS.video.oraculos[siteId]"),
  'La Entrada debe reproducir su segundo MP4 antes del Oráculo')
assert.ok(journey.includes("ASSETS.video.descensos[siteId]"),
  'La Entrada debe reproducir el MP4 de descenso')
assert.ok(journey.includes('ENTRADA A SAN YALLEGO'),
  'La Entrada debe mostrar la etiqueta visible VUELO 1/2 y 2/2')
assert.ok(journey.includes('window.setTimeout(() => setVisible(false), 3000)'),
  'El cartel panorámico debe desaparecer tras 3 segundos, sin cambiar el video')
assert.ok(journey.includes("'Seguir el descenso'"),
  'La Entrada debe ofrecer continuar voluntariamente al segundo vuelo')
assert.ok(journey.includes('onEnded={advance}'),
  'Los vuelos deben avanzar automáticamente al terminar el MP4')


assert.ok(journey.includes('key={') && journey.includes('siteId}-${phase}'), 'Cada vuelo debe reiniciar su reproductor al cambiar de fase')
assert.ok(journey.includes("ASSETS.video.oraculos[siteId]"),
  'El segundo vuelo debe apuntar al MP4 real de aproximación')
assert.ok(journey.includes("VUELO {approaching ? '2 DE 2' : '1 DE 2'}"),
  'Los dos vuelos de Juanito deben identificarse claramente')
assert.ok(casaJuanito.includes("skipDescenso ? 'oraculo' : 'descenso'"),
  'El Oráculo debe aparecer tras completar ambos vuelos')

assert.ok(welcome.includes("phase === 'saludo' || phase === 'invitacion'"),
  'Ambos saludos deben intentar iniciar reproducción automática')
assert.ok(welcome.includes("phase !== 'microfono'"),
  'El micrófono debe conservar una transición controlada')
assert.ok(welcome.includes("window.setTimeout(() => setPhase('saliendo'), 3500)"),
  'La pausa ante el micrófono debe continuar sola después de 3.5 segundos')
assert.ok(welcome.includes("if (phase === 'saliendo') return"),
  'Pulsar varias veces Comenzar el recorrido no debe repetir la salida')
assert.ok(welcome.includes('COMENZAR EL RECORRIDO') && welcome.includes('onClick={beginJourney}'),
  'El visitante debe encontrar un botón claro para comenzar sin pulsar el micrófono')
assert.doesNotMatch(welcome, /Toca el micrófono para cruzar el portal/,
  'La bienvenida no debe exigir comprender el micrófono para poder avanzar')
assert.ok(portal.includes("onEnded={toEntranceOracle}"),
  'El recorrido aéreo debe conducir automáticamente a la Entrada')
assert.ok(welcome.includes("onEnded={next}"),
  'Los saludos deben avanzar cuando termina cada video')
assert.doesNotMatch(welcome, /poster={ASSETS.images.mapa}/,
  'La transición no debe mostrar el mapa como poster entre los saludos')
assert.ok(welcome.includes('firstVideoRef') && welcome.includes('secondVideoRef'),
  'Los dos videos deben permanecer montados para conservar el último fotograma')
assert.ok(welcome.includes('requestVideoFrameCallback') && welcome.includes('duration-300'),
  'El segundo video debe aparecer al tener fotograma con fundido de 300 ms')
assert.ok(welcome.includes('freezeCanvasRef') && welcome.includes('captureFirstFrame()'),
  'Debe congelarse un fotograma real del saludo 1 para evitar un destello entre videos')
assert.ok(welcome.includes('captureFirstFrame()\n      firstVideoRef.current?.pause()'),
  'Al terminar el primer saludo debe actualizarse el fotograma final antes de pausar')
assert.doesNotMatch(welcome, /if \(!frameCapturedRef\.current\)/,
  'No debe reutilizarse una captura antigua al comenzar el segundo saludo')
assert.ok(welcome.includes('Math.min(video.videoWidth, 1920)'),
  'El fotograma congelado debe conservar nitidez Full HD para evitar cambio visual de resolución')
assert.ok(welcome.includes("z-0 size-full bg-transparent") && welcome.includes('z-10 size-full bg-black'),
  'La imagen congelada debe quedar entre el primer y segundo video')
assert.ok(welcome.includes("onClick={() => void play()}"),
  'Debe quedar una opción manual si el navegador bloquea el video')

assert.match(audioPlayer, /if \(!soundOn\) \{\s*audio\.muted = false\s*toggleSound\(\)/,
  'Tocar Reproducir debe activar el sonido cuando el visitante lo había silenciado')
const missingAudioUI = audioPlayer.match(/\{missing && \([\s\S]*?\n      \)\}/)?.[0] ?? ''
assert.ok(missingAudioUI && !missingAudioUI.includes('onEnded'),
  'Un MP3 que no se puede cargar nunca debe marcar el capítulo como escuchado')
assert.ok(audioPlayer.includes('san-yallego:audio:posicion:') &&
  audioPlayer.includes('window.localStorage.setItem(storageKey') &&
  audioPlayer.includes('onLoadedMetadata={(event) => restorePosition(event.currentTarget)}'),
  'El reproductor debe guardar y recuperar el segundo exacto donde quedó la escucha')
assert.ok(audioPlayer.includes('SAVE_INTERVAL_SECONDS = 5') &&
  audioPlayer.includes('lastSavedCheckpointRef.current'),
  'No escribir al almacenamiento local en cada actualización del audio')
assert.ok(audioPlayer.includes('restartFromBeginning') &&
  audioPlayer.includes('Escuchar desde el inicio') &&
  audioPlayer.includes('clearSavedPosition()\n          onEnded()'),
  'Debe poderse reiniciar la escucha y limpiar la posición al completar el capítulo')
assert.doesNotMatch(audioPlayer, /autoPlay\s*(?:=|\/>)/,
  'La escucha del capítulo debe comenzar únicamente por decisión del visitante')

assert.ok(chapterScreen.includes('parts={chapter.audioParts}'),
  'La pantalla del capítulo debe entregar todas las partes del MP3 al reproductor')
assert.ok(audioPlayer.includes('nextPart < playlist.length') &&
  audioPlayer.includes('audio.src = playlist[nextPart]') &&
  audioPlayer.includes('void audio.play().catch('),
  'Las partes deben reproducirse secuencialmente con el mismo elemento de audio')
assert.ok(audioPlayer.includes('JSON.stringify({ part, seconds })') &&
  audioPlayer.includes('pendingSeekRef.current') &&
  audioPlayer.includes('PARTE {partIndex + 1} DE {playlist.length}'),
  'El reproductor debe mostrar la parte actual y reanudar por parte y segundo')
assert.ok(audioPlayer.includes('window.localStorage.setItem(storageKey, JSON.stringify({ part: nextPart, seconds: 0 }))'),
  'La transición entre partes debe registrar el avance antes de cargar la siguiente')
const playlistEnd = audioPlayer.match(/onEnded=\{\(\) => \{([\s\S]*?)\n        \}\}/)?.[1] ?? ''
assert.ok(playlistEnd.includes('if (audio && nextPart < playlist.length)') &&
  playlistEnd.includes('return') &&
  playlistEnd.includes('clearSavedPosition()\n          onEnded()'),
  'Solo al completar la última parte debe marcarse el capítulo como terminado')



assert.ok(chapterScreen.includes('completed && (chapter.book === 1 && chapter.number === 1 ?') &&
  chapterScreen.includes('<ChapterPaths paths={chapter.paths} />'),
  'Los caminos interactivos solo deben abrirse después de completar el Capítulo I')
assert.doesNotMatch(chapterScreen, /isSiteUnlocked|visitedSites\.includes|<SealedSite/,
  'El audiolibro debe poder escucharse directamente desde el índice, sin repetir los oráculos')
assert.ok(chapterScreen.includes('href="/libro/1"'),
  'La página de escucha debe permitir regresar al índice del Libro I')
assert.ok(bookOneCatalog.includes('href="/bienvenida"') &&
  bookOneCatalog.includes('Vivir el recorrido cinematográfico'),
  'El índice debe conservar el recorrido cinematográfico como una opción voluntaria')
for (const kind of ['seguir-la-historia', 'descubrir-un-misterio', 'mirar-mas-profundo']) {
  assert.ok(chapterPaths.includes("selected === '" + kind + "'"),
    'Falta el contenido interactivo para el camino ' + kind)
}
assert.ok(chapterPaths.includes('setSelected(kind)') &&
  chapterPaths.includes('setSelected(null)') &&
  chapterPaths.includes('href="/mapa"'),
  'El visitante debe poder elegir, cambiar de camino y volver al mapa')
assert.ok(chapterPaths.includes('Este interludio no reemplaza al Capítulo II'),
  'La continuación literaria no puede presentarse como un capítulo aún no publicado')
assert.ok(chapterPaths.includes('No hay una respuesta correcta.'),
  'Las reflexiones no deben imponer una respuesta como correcta')
assert.ok(!chapterPaths.includes('localStorage') && !chapterPaths.includes('sessionStorage'),
  'Las respuestas interpretativas de los visitantes no deben guardarse')

assert.ok(chaptersData.includes("siteId: number === 18 ? 'sitio-08' : 'casa-de-juanito'"),
  'El capítulo XVIII La Puerta del Mictlán debe corresponder al sitio VIII: Entrada al Inframundo')
assert.ok(siteConfig.includes("name: 'La Puerta hacia el Inframundo'") &&
  siteConfig.includes("id: 'sitio-08'") &&
  siteConfig.includes("order: 8"),
  'La Puerta del Mictlán debe conservar el sitio VIII en el mapa')

const readingBlocksRaw = chapterOneText.match(/export const CHAPTER_ONE_TEXT: readonly string\[\] = (\[[\s\S]*?\]) as const/)?.[1] ?? '[]'
const readingBlocks = JSON.parse(readingBlocksRaw)
assert.equal(readingBlocks.length, 137,
  'La edición digital del capítulo I debe contener sus 137 bloques narrativos completos (PDF pp. 4-8)')
assert.equal(readingBlocks[0], 'La noche del 8 de marzo de 1969, San Yallego olía a tierra mojada aunque no había llovido en semanas.',
  'La primera frase debe coincidir con el manuscrito')
assert.equal(readingBlocks[readingBlocks.length - 1], 'Y luego silencio.',
  'No incorporar material de producción ni perder el cierre del capítulo')
assert.equal(readingBlocks.filter((p) => p.startsWith('—')).length, 34,
  'Conservar los 34 bloques de diálogo del Capítulo I')
assert.doesNotMatch(chapterOneText, /MAPA DE BLOQUES PARA ELEVENLABS|FIN DEL LIBRO PRIMERO/,
  'La versión de lectura debe excluir instrucciones técnicas y texto de capítulos posteriores')
assert.ok(chapterScreen.includes("setMode(next)") &&
  chapterScreen.includes("<ImmersiveReader paragraphs={CHAPTER_ONE_TEXT}") &&
  chapterScreen.includes('onListen={() => chooseMode(\'escuchar\')}') &&
  chapterScreen.includes('onFinished={markRead}'),
  'El Capítulo I debe ofrecer lectura y escucha como opciones en la misma página')
assert.ok(reader.includes("Papel Vallego") && reader.includes("Noche de Mictlán") &&
  reader.includes("Colorao") && reader.includes('setFontSize'),
  'La lectura inmersiva debe respetar los tres ambientes y el control de tamaño')
assert.ok(reader.includes('BOOKMARK_KEY') && reader.includes('window.localStorage.setItem(BOOKMARK_KEY') &&
  reader.includes('Continuar donde me quedé'),
  'Guardar y recuperar el punto de lectura, sin crear una cuenta')
assert.ok(reader.includes("paragraph.startsWith('—')") &&
  reader.includes('max-w-[62ch]') && reader.includes('lineHeight: 1.7'),
  'Mantener diálogos aislados y columna de lectura con espaciado legible')
assert.ok(reader.includes('pointer-events-none fixed inset-x-0 top-0') &&
  reader.includes('Lectura {progress}%') &&
  reader.includes('setReadingVisible(readerRect.top < window.innerHeight && readerRect.bottom > 0)') &&
  reader.includes('window.addEventListener(\'scroll\', trackReading'),
  'La barra de avance debe permanecer visible y actualizarse al desplazarse por la lectura')
assert.ok(reader.includes('Ver final del texto') &&
  reader.includes('paragraphRefs.current[last]') &&
  reader.includes('No es una transcripción verificada del MP3'),
  'El lector debe permitir comprobar el cierre y distinguir edición PDF de la grabación posterior')

assert.ok(reader.includes("document.addEventListener('scroll', trackReading, true)") &&
  reader.includes('new IntersectionObserver(trackReading') &&
  reader.includes('observer?.disconnect()') &&
  reader.includes('article.getBoundingClientRect()'),
  'El porcentaje de lectura debe detectar tanto scroll de la página como de paneles interiores')
assert.ok(reader.includes('Lectura {progress}% · bloque {visibleBlock || 1}/{paragraphs.length}') &&
  reader.includes('setVisibleBlock(index + 1)'),
  'El lector debe mostrar un avance observable por porcentaje y por bloques')
assert.doesNotMatch(reader, /window\.scrollY < documentTop/,
  'El marcador de lectura no debe depender del scrollY de la ventana')



assert.ok(bookOneCatalog.includes("LEER / ESCUCHAR"),
  'El menú debe mostrar que el Capítulo I admite lectura y escucha')
assert.ok(chapterPaths.includes('Has terminado el primer capítulo.'),
  'El mensaje de cierre debe servir a lectores y oyentes')

const chapterList = chaptersData.match(/export const BOOK_ONE_TITLES = \[([\s\S]*?)\] as const/)?.[1] ?? ''
const chapterTitleLines = chapterList.match(/^\s*'[^']+',?$/gm) ?? []
assert.equal(chapterTitleLines.length, 33,
  'El catálogo del Libro I debe conservar exactamente los 33 títulos del manuscrito')
assert.ok(chapterList.includes("'El Nombre Que Quema'") &&
  chapterList.includes("'El Último Corrido Del Libro Primero'"),
  'Los títulos del índice deben corresponder al manuscrito oficial')
assert.ok(chaptersData.includes('firstAudio = number === 1 ? ASSETS.audio.libro1Capitulo1 : null') &&
  chaptersData.includes('audioParts: firstAudio ? [firstAudio] : []'),
  'No deben publicarse rutas de MP3 para capítulos que todavía no se han incorporado')
assert.ok(bookOneCatalog.includes('CHAPTERS.filter((chapter) => chapter.book === 1)') &&
  bookOneCatalog.includes('MP3 por incorporar') &&
  bookOneCatalog.includes('chapterHref(chapter)'),
  'El catálogo debe mostrar 33 capítulos y distinguir audio disponible de audio pendiente')
assert.ok(chapterScreen.includes(": chapter.audio ? (") &&
  chapterScreen.includes('AUDIO PENDIENTE DE INCORPORAR'),
  'El modo lectura no debe intentar reproducir archivos MP3 que aún no están en el servidor')
assert.ok(chapterPaths.includes('href="/libro/1"'),
  'Al terminar el interludio debe poderse abrir el índice oficial del libro')


const glossaryEntries = [...glossary.matchAll(/\{ term: "([^"]+)", category: "(universo|habla|lenguas|personajes)", definition: "([^"]+)", source:/g)]
assert.equal(glossaryEntries.length, 42,
  'El Archivo de Palabras debe conservar las 42 entradas culturales y sus definiciones')
for (const category of ['universo','habla','lenguas','personajes']) {
  assert.ok(glossaryEntries.some((entry) => entry[2] === category),
    'Falta una categoría del Archivo de Palabras: ' + category)
}
for (const term of ['Pelado', 'Pelao', 'Burrín', 'Hijas del maíz', 'Tzinzunzan', 'Xoloitzcuintle']) {
  assert.ok(glossary.includes('term: "' + term + '"'),
    'No debe faltar la palabra cultural ' + term)
}
assert.ok(glossary.includes('Definición aportada por el autor') &&
  glossary.includes('Biblia Maestra V3.0') &&
  glossary.includes('Gran Diccionario Náhuatl (UNAM)'),
  'El glosario debe distinguir definiciones del autor, canon y fuentes lingüísticas')
assert.ok(glossary.includes('aún requieren cotejo') && glossary.includes('pendiente confirmar'),
  'No se deben inventar significados donde las fuentes de pronunciación no los definen')
assert.doesNotMatch(glossary, /Sholoitscuíntle|SHÓLO|N5_Revelacion|Secreto_del_Narrador/,
  'El glosario público no debe confundir alias fonéticos con ortografía ni publicar secretos')
assert.ok(glossaryPage.includes('<GlossaryExplorer />') &&
  glossaryExplorer.includes('aria-label="Buscar y filtrar palabras"') &&
  glossaryExplorer.includes('fold(entry.term') &&
  glossaryExplorer.includes("filter !== 'todos'"),
  'Debe existir la página /glosario con buscador y filtros funcionales')
assert.ok(bookOneCatalog.includes('href="/glosario"') &&
  mapScreen.includes('href="/glosario"') &&
  chapterPaths.includes('href="/glosario"'),
  'El Archivo de Palabras debe encontrarse desde el libro, el mapa y tras el Capítulo I')


// Matrix is a safe design draft, not an unlock rule or a secret knowledge store.
assert.equal(oracleMatrix.sites.length, 10, 'Se requieren exactamente 10 Oráculos propuestos')
assert.equal(oracleMatrix.editorialApproval?.status, 'aprobada',
  'La Matriz Maestra del Libro I debe registrar la aprobación explícita del autor')
assert.ok(oracleMatrix.editorialApproval.scope.includes('sin autorización de publicación'),
  'Aprobación editorial no significa abrir archivos, llaves ni Oráculos')
const chapterRecommendations = oracleMatrix.sites.flatMap((oracle) =>
  oracle.chapterRecommendations.map((chapter) => chapter.chapter))
assert.equal(chapterRecommendations.length, 33,
  'Los 10 Oráculos deben repartir los 33 capítulos en grupos de 3 o 4')
assert.equal(new Set(chapterRecommendations).size, 33,
  'No se debe duplicar ningún capítulo en la asignación primaria')
const chapterTitles = [...chapterList.matchAll(/^\s*'([^']+)'/gm)].map((item) => item[1])
for (const oracle of oracleMatrix.sites) {
  assert.ok(oracle.chapterRecommendations.length >= 3 &&
    oracle.chapterRecommendations.length <= 4,
    'Cada Oráculo debe ofrecer 3 o 4 capítulos')
  assert.ok(siteConfig.includes("id: '" + oracle.siteId + "'"),
    'Un Oráculo propuesto no debe inventar nuevos IDs del mapa: ' + oracle.siteId)
  for (const recommendation of oracle.chapterRecommendations) {
    assert.equal(recommendation.title, chapterTitles[recommendation.chapter - 1],
      'El título recomendado debe coincidir con el índice oficial')
  }
}
assert.ok(oracleMatrix.unresolved.some((item) => item.includes('Sendero del XOLO')) &&
  oracleMatrix.unresolved.some((item) => item.includes('Convergencia')),
  'No resolver silenciosamente la divergencia entre Biblia y mapa')
assert.ok(oracleMatrix.policy.neverDisclose.includes('N5') &&
  oracleMatrix.policy.neverDisclose.includes('C100') &&
  oracleMatrix.policy.future.includes('sin enlaces'),
  'La matriz debe conservar secretos y evitar links prematuros a libros futuros')


assert.equal(oracleTimeline.schemaVersion, 2,
  'La extensión temporal debe usar un esquema versionado separado del Libro I')
assert.equal(oracleTimeline.editorialStatus, 'aprobada-estructura-temporal; solo-libro-1-curado',
  'La estructura de cuatro libros debe registrar aprobación sin afirmar contenido de futuros libros')
assert.deepEqual(oracleTimeline.volumes.map((volume) => volume.book), [1, 2, 3, 4],
  'El mismo motor de los diez Oráculos debe admitir los Libros I–IV')
assert.equal(oracleTimeline.oracleCollections.length, oracleMatrix.sites.length,
  'El catálogo temporal debe conservar los diez Oráculos sin añadir otros')
const pendingChapters = []
for (const [index, collection] of oracleTimeline.oracleCollections.entries()) {
  assert.equal(collection.siteId, oracleMatrix.sites[index].siteId,
    'La expansión no debe cambiar el orden ni los IDs de los lugares aprobados')
  assert.deepEqual(collection.bookChapters['1'].map((ref) => ref.chapter),
    oracleMatrix.sites[index].chapterRecommendations.map((ref) => ref.chapter),
    'Los 33 capítulos aprobados del Libro I deben conservar sus asignaciones')
  for (const book of ['2', '3', '4']) {
    assert.deepEqual(collection.bookChapters[book], [],
      'No inventar episodios para libros que aún no están registrados: Libro ' + book)
  }
  pendingChapters.push(...collection.bookChapters['1'].map((ref) => ref.chapter))
}
assert.equal(new Set(pendingChapters).size, 33,
  'El esquema temporal debe preservar los 33 capítulos sin duplicados principales')
assert.ok(oracleTimeline.temporalEdges.some((e) => e.kind === 'regresar-al-origen') &&
  oracleTimeline.temporalEdges.some((e) => e.kind === 'brincar-al-futuro') &&
  oracleTimeline.temporalEdges.some((e) => e.kind === 'seguir-secuencia'),
  'Los Oráculos deben disponer de las tres clases de conexión temporal')
for (const edge of oracleTimeline.temporalEdges) {
  for (const ref of [edge.from, edge.to]) {
    assert.equal(ref.book, 1, 'No inventar enlaces a Libros II, III o IV')
    assert.ok(Number.isInteger(ref.chapter) && ref.chapter >= 1 && ref.chapter <= 33,
      'Todo vínculo temporal de prueba debe referirse a un capítulo real del Libro I')
  }
}
assert.ok(oracleAudioCatalog.includes("import 'server-only'") &&
  oracleAudioCatalog.includes('record.published') &&
  oracleAudioCatalog.includes('!mayAccess(record)') &&
  oracleAudioCatalog.includes('record.audioParts.length === 0') &&
  oracleAudioCatalog.includes('record.href !=='),
  'Una sugerencia de audio no es escuchable sin publicación, autorización, partes MP3 y ruta real')
assert.ok(oracleAudioCatalog.includes('getPublishedOracleAudio(') &&
  oracleAudioCatalog.includes('getPublishedTemporalLinks('),
  'Debe poderse consultar audio por Oráculo y enlaces al origen/futuro')
assert.ok(temporalDesign.includes('LIBROS I, II, III Y IV') &&
  temporalDesign.includes('Matriz Maestra V1') &&
  temporalDesign.includes('Convergencia') &&
  temporalDesign.includes('La Biblia Maestra V3.0'),
  'El contrato documental debe identificar los cuatro libros, la continuidad y el canon')
assert.ok(!('apiKey' in oracleTimeline) && !('secretPrompt' in oracleTimeline),
  'El catálogo no debe transportar credenciales o material reservado')

const workshop = source('app/guardian/sitio/[slug]/page.tsx')
assert.ok(workshop.includes('href="/sitio/casa-de-juanito"'),
  'El Taller debe tener un enlace al recorrido público dentro de la misma preview')

console.log(`✓ Cimientos verificados: ${videos.length} MP4, capítulo 1, ocho sitios sellados y sala privada protegida.`)
