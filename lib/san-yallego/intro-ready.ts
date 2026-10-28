import { existsSync } from 'node:fs'
import { join } from 'node:path'

/** Detecta los cuatro MP4 en el despliegue; nunca se enseña una secuencia incompleta.
 * La comprobación ocurre en el servidor al generar la página en Vercel.
 */
const INTRO_FILES = [
  'bienvenida-juan-colorao.mp4',
  'bienvenida-microfono-juan-colorao.mp4',
  'portal-transicion.mp4',
  'recorrido-aereo-san-yallego.mp4',
] as const

export function introAssetsReady() {
  return INTRO_FILES.every((filename) =>
    existsSync(join(process.cwd(), 'public', 'assets', 'video', filename)),
  )
}
