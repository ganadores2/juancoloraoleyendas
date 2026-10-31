import { GUARDIAN_COOKIE_NAME, GUARDIAN_SESSION_SECONDS } from './guardian-core.mjs'

/** Política única de cookies de la Sala, usada por login y logout. */
/**
 * @param {boolean} production
 * @returns {{name: string, httpOnly: true, secure: boolean, sameSite: 'strict', path: '/guardian'}}
 */
function baseCookieOptions(production) {
  return {
    name: GUARDIAN_COOKIE_NAME,
    httpOnly: true,
    secure: Boolean(production),
    sameSite: 'strict',
    path: '/guardian',
  }
}

export function creatorSessionCookie(ticket, production = true) {
  if (typeof ticket !== 'string' || ticket.length === 0) {
    throw new Error('Se necesita una sesión firmada para ingresar.')
  }
  return {
    ...baseCookieOptions(production),
    value: ticket,
    maxAge: GUARDIAN_SESSION_SECONDS,
  }
}

/**
 * El cierre borra la cookie en el navegador; no revoca tickets robados
 * que sigan vigentes. Para invalidarlos globalmente, rotar secreto de firma.
 */
export function closedCreatorSessionCookie(production = true) {
  return {
    ...baseCookieOptions(production),
    value: '',
    maxAge: 0,
  }
}
