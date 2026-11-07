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
assert.ok(welcome.includes("onClick={() => void play()}"),
  'Debe quedar una opción manual si el navegador bloquea el video')

const workshop = source('app/guardian/sitio/[slug]/page.tsx')
assert.ok(workshop.includes('href="/sitio/casa-de-juanito"'),
  'El Taller debe tener un enlace al recorrido público dentro de la misma preview')

console.log(`✓ Cimientos verificados: ${videos.length} MP4, capítulo 1, ocho sitios sellados y sala privada protegida.`)
