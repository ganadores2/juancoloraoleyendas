import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()
// Git may check out files with CRLF on Windows and LF on Linux/Vercel.
// Normalize line endings only for source-inspection assertions (never edit application files).
const normalizeLineEndings = (value) => value.replace(/\r\n?/g, '\n')
const source = (path) => normalizeLineEndings(readFileSync(join(root, path), 'utf8'))

assert.equal(normalizeLineEndings('a\r\nb\rc'), 'a\nb\nc',
  'Las pruebas deben reconocer LF y CRLF de Windows por igual')

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
const robotsSeo = source('app/robots.ts')
const sitemapSeo = source('app/sitemap.ts')
const rootSeo = source('app/layout.tsx')
const publicLandingSeo = source('app/page.tsx')
const publicIndexSeo = source('app/libro/1/page.tsx')
const publicMapSeo = source('app/mapa/page.tsx')
const publicGlossarySeo = source('app/glosario/page.tsx')
const sealedSiteSeo = source('app/sitio/[slug]/page.tsx')
const chapterPageSeo = source('app/libro/[libro]/capitulo/[capitulo]/page.tsx')
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
const characterChronology = JSON.parse(source('lib/san-yallego/character-chronology-v1.json'))
const characterChronologyServer = source('lib/san-yallego/character-chronology.ts')
const characterChronologyDesign = source('docs/oraculos/biblioteca-cronologica-personajes-v1.md')
const juanVisual = JSON.parse(source('lib/san-yallego/juan-visual-master-v1.json'))
const juanVisualDoc = source('docs/personajes/juan-colorao-ficha-visual-maestra-v1.md')
const mariaVisual = JSON.parse(source('lib/san-yallego/maria-visual-master-v1.json'))
const mariaVisualDoc = source('docs/personajes/maria-de-los-angeles-ficha-visual-maestra-v1.md')
const gabrielVisual = JSON.parse(source('lib/san-yallego/gabriel-visual-master-v1.json'))
const gabrielVisualDoc = source('docs/personajes/gabriel-ficha-visual-maestra-v1.md')
const transmediaContinuity = JSON.parse(source('lib/san-yallego/transmedia-continuity-v1.json'))
const transmediaContinuityDoc = source('docs/personajes/biblia-continuidad-transmedia-v1.md')
const elOjon = JSON.parse(source('lib/san-yallego/el-ojon-character-v1.json'))
const elOjonDoc = source('docs/personajes/el-ojon-ficha-maestra-oficial-v1.md')
const pendingV4 = source('docs/biblia/registro-cambios-candidatos-v4.md')
const warriorRoadmap = JSON.parse(source('lib/san-yallego/camino-del-guerrero-roadmap-v1.json'))
const warriorRoadmapDoc = source('docs/saga/camino-del-guerrero-y-escuelas-miticas-libros-1-4-v1.md')
const characterVisualIndex = JSON.parse(source('lib/san-yallego/character-visual-index-v1.json'))
const panchoVisual = JSON.parse(source('lib/san-yallego/pancho-visual-master-v1.json'))
const panchoVisualDoc = source('docs/personajes/abuelo-pancho-ficha-visual-maestra-v1.md')
const doloresVisual = JSON.parse(source('lib/san-yallego/dolores-visual-master-v1.json'))
const doloresVisualDoc = source('docs/personajes/dolores-ficha-visual-maestra-v1.md')
const xoloVisual = JSON.parse(source('lib/san-yallego/xolo-visual-master-v1.json'))
const xoloVisualDoc = source('docs/personajes/xolo-ficha-visual-maestra-v1.md')
const chemaVisual = JSON.parse(source('lib/san-yallego/don-chema-visual-master-v1.json'))
const chemaVisualDoc = source('docs/personajes/don-chema-ficha-visual-maestra-v1.md')
const chavelaVisual = JSON.parse(source('lib/san-yallego/dona-chavela-visual-master-v1.json'))
const chavelaVisualDoc = source('docs/personajes/dona-chavela-ficha-visual-maestra-v1.md')
const tomasVisual = JSON.parse(source('lib/san-yallego/tomas-visual-master-v1.json'))
const tomasVisualDoc = source('docs/personajes/tomas-ficha-visual-maestra-v1.md')
const lupitaVisual = JSON.parse(source('lib/san-yallego/lupita-visual-master-v1.json'))
const lupitaVisualDoc = source('docs/personajes/lupita-ficha-visual-maestra-v1.md')
const geraldoVisual = JSON.parse(source('lib/san-yallego/geraldo-visual-master-v1.json'))
const geraldoVisualDoc = source('docs/personajes/geraldo-ficha-visual-maestra-v1.md')
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
assert.equal(readingBlocks.length, 100,
  'El Capítulo I depurado del SRT de ElevenLabs debe contener 100 párrafos de lectura')
assert.equal(readingBlocks[0], 'La noche del 8 de marzo de 1969, San Yallego dejó de respirar por un instante.',
  'El inicio debe corresponder a la edición literaria derivada de los subtítulos SRT')
assert.equal(readingBlocks[readingBlocks.length - 1], 'Esperando.',
  'Conservar el final SRT depurado del capítulo I, antes del Capítulo II')
assert.equal(readingBlocks.filter((p) => p.startsWith('—')).length, 34,
  'Conservar los 34 párrafos de diálogo del Capítulo I depurado')
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
  reader.includes('Lectura {progress.toFixed(1)}%') &&
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
assert.ok(reader.includes('Lectura {progress.toFixed(1)}% · bloque {visibleBlock || 1}/{paragraphs.length}') &&
  reader.includes('setVisibleBlock(index + 1)'),
  'El lector debe mostrar un avance observable por porcentaje y por bloques')
assert.ok(reader.includes('const firstTop = first.getBoundingClientRect().top') &&
  reader.includes('const lastBottom = last.getBoundingClientRect().bottom') &&
  reader.includes('setProgress(Math.round(clamped * 1000) / 10)') &&
  reader.includes("window.addEventListener('touchmove', trackReading") &&
  reader.includes('new ResizeObserver(trackReading'),
  'El avance debe medir el texto real y responder al tacto y cambios de maquetación')
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


assert.equal(characterChronology.schemaVersion, 1,
  'La biblioteca cronológica debe tener esquema versionado')
assert.equal(characterChronology.characters.length, 17,
  'El catálogo debe conservar los 16 personajes originales y El Ojón')
assert.equal(new Set(characterChronology.characters.map((person) => person.id)).size, 17,
  'Cada personaje debe tener identidad estable para avatar y oráculos')
const juan = characterChronology.characters.find((person) => person.id === 'juan-colorao')
assert.ok(juan, 'Juan debe tener ficha cronológica')
const juanReal = juan.ageEvents.filter((event) => event.temporalContext !== 'sueno')
const juanDreams = juan.ageEvents.filter((event) => event.temporalContext === 'sueno')
assert.deepEqual(juanReal.map((event) => event.ageYears),
  [0, 3, 5, 7, 9, 10, 11, 14, 15, 16, 17, 17],
  'Registrar solo las edades de Juan sustentadas por capítulos, sin inventar etapas futuras')
assert.deepEqual(juanDreams.map((event) => event.ageYears), [5, 7, 15],
  'Las edades soñadas del capítulo XXIX NO pueden sustituir edades reales')
assert.ok(juanDreams.every((event) => event.chapter === 29),
  'El sueño es parte de la cronología de descubrimiento, no de la escena presente')
const maria = characterChronology.characters.find((person) => person.id === 'maria-de-los-angeles')
assert.ok(maria && maria.ageEvents[0].ageYears === 5 &&
  maria.ageEvents[0].chapter === 2,
  'Conservar el dato de cinco años en el capítulo II sin tratar la diferencia con Juan como error')
const gabriel = characterChronology.characters.find((person) => person.id === 'gabriel-vallego')
assert.ok(gabriel && gabriel.ageEvents[0].ageYears === 9 &&
  gabriel.ageEvents[0].chapter === 31 &&
  gabriel.ageEvents[0].temporalContext === 'recuerdo',
  'No presentar la edad de Gabriel en un recuerdo como si fuera la actual')
assert.ok(characterChronology.characters.find((person) => person.id === 'xolo')
  ?.ageEvents.length === 0,
  'No inventar la edad biológica ni los secretos del XOLO')
assert.equal(characterChronology.visualPlan.viewsPerApprovedStage, 7,
  'Cada etapa visual aprobada debe admitir siete vistas')
assert.equal(characterChronology.visualPlan.referenceArtIsNotApprovedCharacterMaster, true,
  'El arte conceptual no debe elevarse automáticamente a canon visual')
assert.ok(characterChronology.futureVolumes.every((volume) =>
  [2, 3, 4].includes(volume.book) && volume.status.includes('sin')),
  'Los Libros II–IV deben permanecer sin cronologías inventadas')
for (const person of characterChronology.characters) {
  for (const event of person.ageEvents) {
    assert.ok(event.book === 1 && event.chapter >= 1 && event.chapter <= 33,
      'Una edad textual nueva debe citar capítulo real; libros futuros no pueden inventarse')
    assert.ok(event.review === 'cotejo-MP3-pendiente',
      'Ninguna edad del SRT debe declararse definitiva sin cotejo con MP3')
  }
}
assert.ok(characterChronologyServer.includes("import 'server-only'") &&
  characterChronologyServer.includes('findCharacterMoments(') &&
  characterChronologyServer.includes('findPublishedCharacterMoments(') &&
  characterChronologyServer.includes("moment.temporalContext !== 'sueno'") &&
  characterChronologyServer.includes('audio.published') &&
  characterChronologyServer.includes('canAccess(audio)'),
  'El catálogo de edades debe ser consultable solo en servidor y con enlaces autorizados')
assert.ok(characterChronologyDesign.includes('cronología real') &&
  characterChronologyDesign.includes('cronología de descubrimiento') &&
  characterChronologyDesign.includes('capítulo II') &&
  characterChronologyDesign.includes('siete vistas'),
  'Documentar doble cronología, hallazgos y continuidad visual')
assert.doesNotMatch(JSON.stringify(characterChronology), /N5.*?:.*?fecha futura exacta|C100.*?:.*?secreto/,
  'No incluir revelaciones de núcleo en la biblioteca de personajes')


assert.equal(juanVisual.identity, 'juan-colorao', 'La ficha visual maestra debe corresponder a Juan Colorao')
assert.equal(juanVisual.stageSystem.stages.length, 4, 'Las cuatro etapas narrativas del Libro I deben estar presentes')
assert.deepEqual(juanVisual.stageSystem.stages.map((stage) => stage.stageId),
  ['J01','J02','J03','J04'],
  'Los IDs de la ficha visual deben ser estables de la infancia a los 17 años')
assert.deepEqual(juanVisual.stageSystem.stages.map((stage) => stage.anchorAgeYears),
  [5, 9, 14, 16],
  'Cada juego de vistas debe tener una edad visual ancla, no confundir un bebé con un niño de cinco')
assert.equal(juanVisual.stageSystem.stages.reduce((n,stage) => n+stage.views.length,0), 28,
  'Deben reservarse 7 vistas para cada una de las 4 edades ancla')
for(const stage of juanVisual.stageSystem.stages){
  assert.equal(new Set(stage.views.map(view => view.code)).size, 7,
    'Cada etapa debe registrar 7 ángulos distintos')
  assert.ok(stage.views.every(view => view.asset === null && view.approval === 'pendiente'),
    'No presentar imágenes inexistentes o conceptuales como canon visual aprobado')
  assert.ok(stage.evidence.every(event => characterChronology.characters
    .find(person => person.id === 'juan-colorao')?.ageEvents.some(age =>
      age.ageYears === event.age && age.chapter === event.chapter && age.temporalContext === 'escena')),
    'Cada etapa debe enlazar solamente a edades verificables por capítulo y escena')
}
assert.ok(juanVisual.visualPlan.sameSevenViewsCannotRepresentWholeAgeRange &&
  juanVisual.visualPlan.stageApprovalRequired &&
  juanVisual.visualPlan.referenceArtIsNotApprovedCharacterMaster,
  'No declarar aprobadas las siete vistas antes de elegir una edad y una imagen maestra')
assert.ok(juanVisualDoc.includes('ESTADO DE LA FICHA: PRECANON') &&
  juanVisualDoc.includes('no lo ha completado') &&
  juanVisualDoc.includes('cicatriz') &&
  juanVisualDoc.includes('Siete vistas'),
  'La ficha debe documentar el canon provisional y no completar antes de tiempo el camino de Juan')


// Approved 7 Nov 2026: preserve every Juan artwork reference and apply per-medium continuity.
assert.equal(juanVisual.crossBookContinuity?.retainAllExistingReferenceArt, true,
  'No descartar ninguna de las referencias visuales de Juan')
assert.deepEqual(juanVisual.crossBookContinuity.books, [1, 2, 3, 4],
  'La coherencia de apariencia debe extenderse a todos los libros')
assert.ok(juanVisual.references.filter((ref) =>
  ref.type === 'concepto-visual' || ref.type === 'concepto-de-vestuario-adulto').length >= 4,
  'Mantener todas las láminas de referencia previas, sin escoger solo una')
for(const medium of ['lectura','audio','serie_animada']) {
  assert.ok(juanVisual.crossBookContinuity.modes[medium]?.requirement &&
    juanVisual.crossBookContinuity.modes[medium].check?.length > 0,
    'La continuidad debe tener criterios específicos para: ' + medium)
}
assert.equal(juanVisual.crossBookContinuity.modes.lectura.requireSevenViews, false,
  'La novela no necesita siete vistas ni descripciones repetidas')
assert.equal(juanVisual.crossBookContinuity.modes.audio.requireSevenViews, false,
  'El audiolibro no requiere hojas visuales completas')
assert.equal(juanVisual.crossBookContinuity.modes.serie_animada.requireSevenViews, true,
  'La futura serie animada sí requiere modelos visuales y ángulos aprobados')
assert.deepEqual(juanVisual.crossBookContinuity.futureStages, [],
  'No inventar apariencia de Juan en Libros II, III y IV')
assert.ok(juanVisualDoc.includes('Todas las láminas') === false ||
  juanVisualDoc.includes('se conservan todas'),
  'La guía debe preservar todas las referencias como material de exploración')
assert.ok(temporalDesign.includes('Continuidad de apariencia entre libros y medios') &&
  temporalDesign.includes('Serie animada'),
  'La matriz intertemporal también debe respetar la continuidad visual de Juan')


// Maria keeps her own narrative agency and requires no invented ages.
assert.equal(mariaVisual.identity, 'maria-de-los-angeles',
  'La ficha visual de María debe conservar identidad única')
assert.ok(mariaVisual.narrativeIdentity.role.includes('independientes de Juan'),
  'María debe tener desarrollo propio, no ser solo un apéndice de Juan')
assert.deepEqual(mariaVisual.sourceText.explicitAges.map(item => [item.ageYears, item.chapter]), [[5, 2]],
  'La edad explicitada de María es cinco años en el capítulo II; no inferir otras edades')
assert.ok(mariaVisual.sourceText.relatedScenes.some(scene =>
  scene.chapter === 4 && scene.referenceCharacter === 'juan-colorao' &&
  scene.referenceAge === 5),
  'El capítulo IV fija la edad de Juan, no una edad numérica propia de María')
assert.equal(mariaVisual.stageSystem.stages.length, 4,
  'La ficha M01-M04 debe conservar cuatro grupos narrativos, no cuatro edades confirmadas')
assert.deepEqual(mariaVisual.stageSystem.stages.map(stage => stage.stageId), ['M01','M02','M03','M04'],
  'Las identidades de etapas deben permanecer estables')
assert.deepEqual(mariaVisual.stageSystem.stages.map(stage => stage.visualAnchorAgeYears),
  [5, null, null, null],
  'No inventar edades ancla para futuras etapas visuales')
assert.equal(mariaVisual.stageSystem.stages.reduce((n, stage) => n + stage.views.length, 0), 28,
  'Reservar 7 vistas por cada uno de los cuatro grupos')
assert.ok(mariaVisual.stageSystem.stages.every(stage =>
  stage.views.every(view => view.asset === null && view.approval === 'pendiente')),
  'Ninguna de las 28 vistas se declara creada ni aprobada')
assert.equal(mariaVisual.sourceArt.retainAll, true,
  'Conservar íntegramente las referencias de María')
assert.ok(mariaVisual.sourceArt.referenceTitles.length >= 5,
  'No borrar láminas visuales de María')
assert.deepEqual(mariaVisual.crossBookContinuity.books, [1,2,3,4],
  'La continuidad visual también se extiende a futuros libros')
assert.deepEqual(mariaVisual.crossBookContinuity.futureStages, [],
  'No inventar edades ni escenas del Libro II, III y IV')
assert.ok(mariaVisual.crossBookContinuity.serieAnimada.length > 20 &&
  mariaVisual.crossBookContinuity.lectura.length > 20 &&
  mariaVisual.crossBookContinuity.audio.length > 20,
  'Cada medio tiene exigencias específicas de continuidad')
assert.ok(mariaVisualDoc.includes('PRECANON') &&
  mariaVisualDoc.includes('conservar') &&
  mariaVisualDoc.includes('Capítulo II') &&
  mariaVisualDoc.includes('Capítulo IV'),
  'La ficha humana debe explicar las fuentes y las discrepancias cronológicas')


assert.equal(mariaVisual.narrativeIdentity.authorConfirmedCanon?.ageRelation
  ?.includes('María es mayor que Juan'), true,
  'María debe ser mayor que Juan por decisión del autor; NO es un error por corregir')
assert.deepEqual(mariaVisual.narrativeIdentity.authorConfirmedCanon.knowledge,
  ['plantas','sanación y remedios tradicionales','intuición extraordinaria','experiencia y sabiduría inusuales'],
  'El canon de María debe incluir plantas, sanación, intuición y sabiduría')
assert.ok(mariaVisual.narrativeIdentity.authorConfirmedCanon.rolesTowardsJuan
  .some(role => role.includes('mentora durante una etapa')) &&
  mariaVisual.narrativeIdentity.authorConfirmedCanon.boundaries
  .some(rule => rule.includes('No actúa como mentora')),
  'La mentoría de María debe ser temporal y no retirar a Juan su agencia')
assert.equal(mariaVisual.sourceText.explicitAges.length, 1,
  'No inferir edades exactas a partir de que María sea mayor')
assert.equal(characterChronology.characters.find(c => c.id === 'maria-de-los-angeles')
  ?.authorConfirmedRelationship?.intentional, true,
  'La cronología debe indicar expresamente que la diferencia de edad es intencional')
assert.ok(mariaVisualDoc.includes('La mentoría es temporal') &&
  mariaVisualDoc.includes('conocimientos y experiencia inusuales') &&
  characterChronologyDesign.includes('María es deliberadamente mayor que Juan'),
  'Ambas biblias deben conservar la explicación canónica del autor')


assert.equal(gabrielVisual.identity, 'gabriel-vallego',
  'Gabriel debe conservar identidad técnica estable aunque su apellido editorial no esté fijado')
assert.deepEqual(gabrielVisual.naming.variants, ['Gabriel Vallego','Gabriel Yallego'],
  'No corregir automáticamente ninguna de las dos grafías de Gabriel')
assert.equal(gabrielVisual.naming.canonicalSpelling, null,
  'La grafía canónica requiere aprobación expresa del autor')
assert.equal(gabrielVisual.ageEvidence.length, 1,
  'No inventar edades del Libro I de Gabriel a partir de ilustraciones')
assert.ok(gabrielVisual.ageEvidence[0].ageYears === 9 &&
  gabrielVisual.ageEvidence[0].chapter === 31 &&
  gabrielVisual.ageEvidence[0].temporalContext === 'recuerdo',
  'La edad nueve de Gabriel en XXXI corresponde a un recuerdo')
assert.deepEqual(gabrielVisual.stageSystem.stages.map(x => x.anchorAgeYears),
  [9, null, null, null],
  'No inferir edades visuales de Gabriel para juventud o madurez')
assert.equal(gabrielVisual.stageSystem.stages.reduce((n,x) => n+x.views.length,0),28,
  'Se necesitan siete ranuras por cada una de cuatro etapas preliminares de Gabriel')
assert.ok(gabrielVisual.stageSystem.stages.every(x=>x.views.every(v =>
  v.asset === null && v.approval === 'pendiente')),
  'Las vistas de Gabriel son conceptos y no avatares aprobados')
assert.ok(gabrielVisual.sourceArt.retainAll &&
  gabrielVisual.sourceArt.references.length === 5,
  'Conservar todas las láminas de Gabriel, incluidas las variantes de apellido')
assert.ok(gabrielVisualDoc.includes('NO') &&
  gabrielVisualDoc.includes('nueve años') &&
  gabrielVisualDoc.includes('Vallego') &&
  gabrielVisualDoc.includes('Yallego'),
  'La ficha de Gabriel debe aclarar edad recordada y dos grafías')
assert.equal(transmediaContinuity.schemaVersion,1,
  'La continuidad transmedia debe tener esquema versionado')
assert.deepEqual(transmediaContinuity.series.map(s => s.seriesId),
  ['don-chema-humor','xolo-propia','maria-propia'],
  'Conservar las tres futuras series propuestas por el autor')
const chronologyIds = new Set(characterChronology.characters.map(c => c.id))
for(const show of transmediaContinuity.series) {
  assert.ok(show.characterIds.every(id=>chronologyIds.has(id)),
    'Una serie derivada debe referenciar personajes reales del catálogo')
  assert.ok(show.status.includes('sin-guiones'),
    'No declarar producidas series futuras sin guiones aprobados')
  assert.ok(show.dontInvent.length > 0 && show.preserve.length > 0,
    'Las series deben conservar voz y continuidad y prohibir detalles inventados')
}
assert.ok(transmediaContinuityDoc.includes('Don Chema') &&
  transmediaContinuityDoc.includes('XOLO') &&
  transmediaContinuityDoc.includes('María de los Ángeles'),
  'La Biblia Transmedia debe incluir las tres series futuras')
assert.ok(transmediaContinuity.coreRules.some(rule => rule.includes('siete vistas')) &&
  transmediaContinuity.changeProtocol.some(rule => rule.includes('aprobación del autor')),
  'Las series animadas y los cambios al canon requieren control editorial')


// Anti-olvido de El Ojón: alta canónica de reserva y archivo persistente.
assert.equal(elOjon.characterId, 'el-ojon',
  'La ficha oficial debe declarar la identidad estable de El Ojón')
assert.ok(elOjon.registrationStatus.includes('CANON DORADO DE RESERVA') &&
  elOjon.legacyV4.status.includes('PENDIENTE'),
  'El Ojón pertenece al Canon Dorado y la Biblia V4 todavía no está publicada')
assert.equal(elOjon.identity.confirmedCostumeSymbol.letters, 'SCH',
  'Conservar las letras SCH de la camiseta ilustrada')
assert.equal(elOjon.identity.confirmedCostumeSymbol.meaning, 'SUPER CHISMOSO',
  'SCH debe significar SUPER CHISMOSO')
assert.ok(elOjon.visualIdentity.references.length === 3 &&
  elOjon.visualIdentity.references.every(ref =>
    ref.libraryPath.startsWith('/Juan Colorao Leyendas/Personajes/El Ojón/')),
  'Las tres imágenes originales deben figurar en la Biblioteca y la ficha del personaje')
assert.equal(elOjon.narrativeReservations.confirmedBookAppearances.length, 0,
  'No inventar capítulos donde aparezca El Ojón')
assert.deepEqual(elOjon.narrativeReservations.books, [1,2,3,4],
  'El personaje puede aparecer circunstancialmente en cualquiera de los cuatro libros')
assert.ok(elOjon.narrativeReservations.futureSeries.some(s=>s.id==='xolo-propia') &&
  elOjon.narrativeReservations.futureSeries.some(s=>s.id==='don-chema-humor'),
  'La reserva de El Ojón debe vincularse a las series de XOLO y Don Chema')
const elOjonChronology = characterChronology.characters.find(x=>x.id==='el-ojon')
assert.ok(elOjonChronology &&
  elOjonChronology.ageEvents.length === 0 &&
  elOjonChronology.authorConfirmedReservation?.emblemMeaning === 'SUPER CHISMOSO',
  'El Ojón nunca debe perderse del catálogo ni recibir edades inventadas')
for (const id of ['xolo-propia','don-chema-humor']) {
  const show = transmediaContinuity.series.find(s=>s.seriesId === id)
  assert.ok(show?.characterIds.includes('el-ojon'),
    'El Ojón debe mantenerse en el reparto reservado de ' + id)
}
assert.equal(transmediaContinuity.sharedContinuityData.elOjon,
  'lib/san-yallego/el-ojon-character-v1.json',
  'La arquitectura transmedia debe enlazar la ficha formal de El Ojón')
assert.ok(elOjonDoc.includes('SUPER CHISMOSO') &&
  elOjonDoc.includes('CANON DORADO DE RESERVA') &&
  elOjonDoc.includes('NO implica') &&
  pendingV4.includes('V4-001') &&
  pendingV4.includes('no sustituye la V3'),
  'La ficha oficial y el registro V4 deben preservar estado y procedencia')


// Mantener el catálogo cronológico estable mientras se amplían las fichas visuales.
assert.equal(characterVisualIndex.primaryChronology,
  'lib/san-yallego/character-chronology-v1.json',
  'El índice visual no puede sustituir el catálogo cronológico aprobado')
const masters = [panchoVisual, doloresVisual, xoloVisual, chemaVisual,
  chavelaVisual, tomasVisual, lupitaVisual, geraldoVisual]
assert.deepEqual(characterVisualIndex.characterVisualMappings.map(x=>x.characterId),
  masters.map(x=>x.id),
  'Las cuatro fichas deben estar indexadas por los mismos IDs de los personajes')
assert.ok(masters.every(x=>x.visualStages.length>0 &&
  x.visualStages.every(s=>s.views.length===7 && s.views.every(v=>v.asset===null))),
  'No declarar siete vistas de animación generadas o aprobadas antes de tiempo')
assert.ok(characterVisualIndex.characterVisualMappings.every(x=>
  characterChronology.characters.some(c=>c.id===x.characterId) &&
  x.ageEvidence.length===0),
  'No duplicar personajes ni inventar edades de fichas conceptuales')
assert.ok(doloresVisual.identity.nonLiteral.some(x=>x.includes('amiga de Juanito')) &&
  xoloVisual.identity.nonLiteral.some(x=>x.includes('ojos')) &&
  chemaVisual.referenceArt.length===0,
  'Preservar parentesco de Dolores, misterio de XOLO y rostro pendiente de Chema')
assert.ok(pendingV4.includes('V4-012') && pendingV4.includes('V4-013') &&
  pendingV4.includes('V4-014') && pendingV4.includes('V4-015'),
  'La futura Biblia V4 debe incorporar las cuatro fichas sin reemplazar la V3')


// Nueva fase del canon: Chavela, Tomás, Lupita y Geraldo.
assert.deepEqual(chavelaVisual.generationLegend.countsMentioned, [5,6,7],
  'La leyenda de las cinco/seis/siete generaciones debe conservar las tres versiones')
assert.equal(chavelaVisual.generationLegend.countCanonical, null,
  'El autor confirma que Chavela nunca aclara el número: no fijar uno como canon')
assert.equal(chavelaVisual.generationLegend.ageYears, null,
  'No calcular una edad a partir del rumor de las generaciones')
assert.equal(chavelaVisual.generationLegend.authorApprovedAmbiguity, true,
  'La ambigüedad de Chavela es intencional, no un fallo que corregir')
assert.ok(chavelaVisualDoc.includes('seis generaciones') &&
  chavelaVisualDoc.includes('Tal vez cinco') &&
  chavelaVisualDoc.includes('Tal vez siete'),
  'La ficha humana debe conservar el humor del pasaje original')
assert.ok(chavelaVisual.preferredName === 'Doña Chavela' &&
  chavelaVisual.manuscriptVariant === 'Doña Chabela',
  'Respetar las grafías de conversación y SRT sin forzar una corrección')
assert.ok(tomasVisual.identity.nameCaveat.includes('Tomás Villaseñor') &&
  tomasVisual.sceneAnchors.length === 0 &&
  tomasVisualDoc.includes('Homónimos'),
  'No fusionar personajes distintos llamados Tomás sin cotejo')
assert.ok(lupitaVisual.sceneAnchors.some(x=>x.book===1&&x.chapter===12) &&
  lupitaVisual.sourceArt.unapproved.some(x=>x.includes('sentimentales')) &&
  lupitaVisualDoc.includes('Los Espejos Niños'),
  'Lupita debe preservar su agencia sin inventar romance o edades')
assert.ok(geraldoVisual.sceneAnchors.some(x=>x.chapter===31) &&
  geraldoVisual.identity.sceneEvidence[0].scene.includes('Gabriel') &&
  geraldoVisual.timeline === undefined &&
  geraldoVisualDoc.includes('no fija la edad de Geraldo'),
  'El recuerdo de Gabriel a los nueve años no es una edad de Geraldo')
assert.ok(['donaChavela','tomas','lupita','geraldo']
  .every(k=>transmediaContinuity.sharedContinuityData[k]),
  'El registro transmedia debe enlazar las cuatro nuevas fichas')
assert.ok(['V4-016','V4-017','V4-018','V4-019']
  .every(v=>pendingV4.includes(v)),
  'El registro editorial V4 debe conservar las cuatro altas nuevas')


// Libro II confirmado por el autor: escuelas míticas, nuevos personajes y camino prolongado.
assert.equal(warriorRoadmap.schemaVersion, 1,
  'La arquitectura del Camino del Guerrero debe tener versión propia')
assert.deepEqual(warriorRoadmap.phases.map(p=>p.phaseId),
  ['LIBRO-I','LIBRO-II-A','LIBRO-II-B','LIBRO-II-C',
    'LIBRO-III-A','LIBRO-III-B','LIBRO-III-C','CONVERGENCIA-100','CICLO-101+'],
  'La formación debe recorrer los libros sin inventar episodios ni resolver todo en el II')
assert.ok(warriorRoadmap.phases.find(p=>p.phaseId==='LIBRO-I')
  .ending.juanTravelers.includes('gabriel-vallego') &&
  warriorRoadmap.phases.find(p=>p.phaseId==='LIBRO-I')
  .ending.juanTravelers.includes('xolo'),
  'El capítulo 33 termina con Juan acompañado de Gabriel y XOLO')
assert.equal(warriorRoadmap.phases.find(p=>p.phaseId==='LIBRO-I')
  .ending.mariaPath.startsWith('Tzinzunzan'), true,
  'María conserva su camino independiente al acabar Libro I')
assert.equal(warriorRoadmap.schoolsPolicy.schoolRecords.length, 0,
  'No fabricar nombres, maestros o capítulos de escuelas míticas aún no aprobadas')
assert.deepEqual(warriorRoadmap.schoolsPolicy.schoolNamesApproved, [],
  'No bautizar escuelas sin decisión del autor')
assert.deepEqual(warriorRoadmap.schoolsPolicy.newCharactersApproved, [],
  'Reservar personajes nuevos sin inventarlos')
assert.ok(warriorRoadmap.phases.filter(p=>p.book===2).every(p=>
  p.evidenceStatus.includes('propuesta')) &&
  warriorRoadmap.phases.filter(p=>p.book===3&&p.phaseId!=='CONVERGENCIA-100')
    .every(p=>p.evidenceStatus.includes('propuesta')),
  'La distribución detallada de II–III NO debe declararse canon ya escrito')
assert.equal(warriorRoadmap.phases.find(p=>p.phaseId==='CONVERGENCIA-100').chapterRange.first, 100,
  'El capítulo 100 conserva su función de convergencia de la trilogía')
assert.equal(warriorRoadmap.phases.find(p=>p.phaseId==='CICLO-101+').chapterRange.first,101,
  'El Bélico mantiene su puente al ciclo 101+ sin inventar edades de Juan')
assert.ok(warriorRoadmap.castPolicy.fromBookOne.homeTownCameos.includes('Cameos') &&
  warriorRoadmap.castPolicy.maria.includes('Camino propio'),
  'La población de San Yallego conserva vida propia y solo cameos pertinentes')
assert.ok(warriorRoadmapDoc.includes('escuelas míticas') &&
  warriorRoadmapDoc.includes('capítulo XXXIII') &&
  pendingV4.includes('V4-020') &&
  temporalDesign.includes('Camino del Guerrero y escuelas míticas'),
  'La ruta de escuelas debe figurar en la Biblia V4 y la arquitectura temporal')


// Lanzamiento público: indexación sólo de rutas seguras y canónicas.
assert.ok(robotsSeo.includes("process.env.VERCEL_ENV !== 'production'") &&
  robotsSeo.includes("disallow: '/'"),
  'Las previews deben impedir indexación pública')
for (const denied of ['/guardian','/sitio/','/libro/1/capitulo/','/bienvenida','/portal']) {
  assert.ok(robotsSeo.includes("'" + denied + "'"),
    'El rastreador no debe entrar por rutas inmersivas o privadas: ' + denied)
}
assert.ok(sitemapSeo.includes('https://www.juancoloraoleyendas.com') &&
  rootSeo.includes('https://www.juancoloraoleyendas.com') &&
  robotsSeo.includes('https://www.juancoloraoleyendas.com'),
  'Sitemap, robots y metadatos deben compartir el dominio canónico verificado')
for (const allowed of ['/', '/mapa', '/libro/1', '/glosario']) {
  assert.ok(sitemapSeo.includes("ORIGIN + '" + allowed + "'"),
    'El sitemap sólo incluye rutas públicas estables: ' + allowed)
}
assert.doesNotMatch(sitemapSeo, /guardian|\bsitio\b|capitulo|\bbienvenida\b|\bportal\b/,
  'El sitemap jamás debe anunciar puertas, capítulos privados o experiencias condicionadas')
assert.ok(rootSeo.includes('metadataBase:') &&
  rootSeo.includes("locale: 'es_MX'") &&
  rootSeo.includes('noarchive: true') &&
  !rootSeo.includes("generator: 'v0.app'"),
  'Los metadatos deben ser de Juan Colorao y previews no indexables')
assert.ok(publicLandingSeo.includes("canonical: '/'") &&
  publicMapSeo.includes("canonical: '/mapa'") &&
  publicIndexSeo.includes("canonical: '/libro/1'") &&
  publicGlossarySeo.includes("canonical: '/glosario'"),
  'Cada ruta pública debe identificar correctamente su URL canónica')
assert.ok(sealedSiteSeo.includes('robots: { index: false, follow: false }') &&
  chapterPageSeo.includes('robots: { index: false, follow: false }'),
  'Páginas de oráculos y capítulos no deben indexarse sin contexto')

const workshop = source('app/guardian/sitio/[slug]/page.tsx')
assert.ok(workshop.includes('href="/sitio/casa-de-juanito"'),
  'El Taller debe tener un enlace al recorrido público dentro de la misma preview')

console.log(`✓ Cimientos verificados: ${videos.length} MP4, capítulo 1, ocho sitios sellados y sala privada protegida.`)
