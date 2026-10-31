import 'server-only'
import { cookies } from 'next/headers'
import {
  GUARDIAN_COOKIE_NAME,
  validateGuardianSession,
} from './guardian-core.mjs'

export {
  GUARDIAN_COOKIE_NAME,
  GUARDIAN_SESSION_SECONDS,
  isGuardianConfigured,
  verifyGuardianPassword,
  issueGuardianSession,
  isGuardianPostAllowed,
} from './guardian-core.mjs'

/** Guardia exclusivamente del servidor: no exponer credenciales al cliente. */
export async function hasGuardianSession(): Promise<boolean> {
  const jar = await cookies()
  return validateGuardianSession(jar.get(GUARDIAN_COOKIE_NAME)?.value)
}
