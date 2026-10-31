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
const logoutRoute = source('app/guardian/logout/route.ts')
const guardianIndex = source('app/guardian/page.tsx')
const nextConfig = source('next.config.mjs')
const guardianPage = source('app/guardian/sitio/[slug]/page.tsx')
const mapScreen = source('components/san-yallego/mapa/mapa-screen.tsx')
const navMenu = source('components/san-yallego/traveler-map-nav.tsx')
const journey = source('components/san-yallego/site-journey.tsx')
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
assert.ok(journey.includes('key={phase}'), 'Cada vuelo de Juanito debe reiniciar su reproductor')
assert.ok(journey.includes("ASSETS.video.oraculos['casa-de-juanito']"),
  'El segundo vuelo de Juanito debe apuntar al MP4 real de aproximación')
assert.ok(journey.includes("VUELO {approaching ? '2 DE 2' : '1 DE 2'}"),
  'Los dos vuelos de Juanito deben identificarse claramente')
assert.ok(casaJuanito.includes("skipDescenso ? 'oraculo' : 'descenso'"),
  'El Oráculo debe aparecer tras completar ambos vuelos')

const workshop = source('app/guardian/sitio/[slug]/page.tsx')
assert.ok(workshop.includes('href="/sitio/casa-de-juanito"'),
  'El Taller debe tener un enlace al recorrido público dentro de la misma preview')

console.log(`✓ Cimientos verificados: ${videos.length} MP4, capítulo 1, ocho sitios sellados y sala privada protegida.`)
