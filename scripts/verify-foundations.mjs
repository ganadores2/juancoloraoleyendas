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
const bookOneCatalog = source('app/libro/1/page.tsx')

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
assert.ok(chapterScreen.includes('{chapter.audio ? (') &&
  chapterScreen.includes('AUDIO PENDIENTE DE INCORPORAR'),
  'No intentar reproducir archivos MP3 que no se han incorporado al servidor')
assert.ok(chapterPaths.includes('href="/libro/1"'),
  'Al terminar el interludio debe poderse abrir el índice oficial del libro')

const workshop = source('app/guardian/sitio/[slug]/page.tsx')
assert.ok(workshop.includes('href="/sitio/casa-de-juanito"'),
  'El Taller debe tener un enlace al recorrido público dentro de la misma preview')

console.log(`✓ Cimientos verificados: ${videos.length} MP4, capítulo 1, ocho sitios sellados y sala privada protegida.`)
