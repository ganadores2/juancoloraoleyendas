import { createHash, createHmac, randomBytes, timingSafeEqual } from 'node:crypto'
import { cookies } from 'next/headers'

/**
 * Acceso privado del creador, separado de las llaves del visitante.
 * No importar este módulo desde componentes cliente.
 *
 * No incluir claves en NEXT_PUBLIC_*, archivos versionados ni parámetros URL.
 */
export const GUARDIAN_COOKIE_NAME = 'sy_guardian_access'
export const GUARDIAN_SESSION_SECONDS = 8 * 60 * 60

function credentials() {
  const accessKey = process.env.SAN_YALLEGO_MASTER_KEY
  const signingSecret = process.env.SAN_YALLEGO_GUARDIAN_SECRET
  if (!accessKey || accessKey.length < 24 || !signingSecret || signingSecret.length < 32) {
    return null
  }
  return { accessKey, signingSecret }
}

export function isGuardianConfigured(): boolean {
  return credentials() !== null
}

function equalBuffers(a: Buffer, b: Buffer): boolean {
  return a.length === b.length && timingSafeEqual(a, b)
}

export function verifyGuardianPassword(password: unknown): boolean {
  const config = credentials()
  if (!config || typeof password !== 'string' || password.length < 24 || password.length > 256) {
    return false
  }
  const expected = createHash('sha256').update(config.accessKey, 'utf8').digest()
  const actual = createHash('sha256').update(password, 'utf8').digest()
  return equalBuffers(expected, actual)
}

function signature(payload: string, secret: string) {
  return createHmac('sha256', secret)
    .update('san-yallego-guardian:v1:')
    .update(payload)
    .digest('base64url')
}

export function issueGuardianSession(): string {
  const config = credentials()
  if (!config) throw new Error('Guardian access is not configured')
  const expires = Date.now() + GUARDIAN_SESSION_SECONDS * 1000
  const payload = `${expires}.${randomBytes(18).toString('base64url')}`
  return `${payload}.${signature(payload, config.signingSecret)}`
}

function validGuardianSession(ticket: string | undefined): boolean {
  const config = credentials()
  if (!config || !ticket) return false
  const parts = ticket.split('.')
  if (parts.length !== 3) return false
  const [expiresString, nonce, receivedSignature] = parts
  if (!/^\d{13}$/.test(expiresString) || !/^[A-Za-z0-9_-]{24}$/.test(nonce)) return false
  if (!/^[A-Za-z0-9_-]{43}$/.test(receivedSignature)) return false

  const expires = Number(expiresString)
  if (!Number.isSafeInteger(expires) || expires <= Date.now()) return false
  // Impide aceptar sesiones con vencimiento inventado más allá de la duración prevista.
  if (expires > Date.now() + GUARDIAN_SESSION_SECONDS * 1000 + 60_000) return false

  const payload = `${expiresString}.${nonce}`
  const expectedSignature = signature(payload, config.signingSecret)
  return equalBuffers(Buffer.from(expectedSignature), Buffer.from(receivedSignature))
}

export async function hasGuardianSession(): Promise<boolean> {
  const jar = await cookies()
  return validGuardianSession(jar.get(GUARDIAN_COOKIE_NAME)?.value)
}
