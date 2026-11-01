/**
 * Lector acotado del formulario de acceso. El tamaño se controla sobre los
 * bytes realmente recibidos, no sobre Content-Length (que puede faltar).
 * No almacenar, registrar ni devolver la Llave Maestra.
 */
export class GuardianFormError extends Error {
  constructor(status = 400) {
    super(status === 413 ? 'Solicitud demasiado grande.' : 'Formulario no válido.')
    this.name = 'GuardianFormError'
    this.status = status
  }
}

export async function readGuardianForm(request, maxBytes = 4096) {
  const type = request.headers.get('content-type') ?? ''
  if (!/^application\/x-www-form-urlencoded(?:\s*;\s*charset=UTF-8)?\s*$/i.test(type)) {
    throw new GuardianFormError(400)
  }
  const declared = request.headers.get('content-length')
  if (declared !== null && (!/^\d+$/.test(declared) || Number(declared) > maxBytes)) {
    throw new GuardianFormError(413)
  }
  if (!request.body) throw new GuardianFormError(400)

  const reader = request.body.getReader()
  const chunks = []
  let count = 0
  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      count += value.byteLength
      if (count > maxBytes) throw new GuardianFormError(413)
      chunks.push(value)
    }
  } catch (error) {
    await reader.cancel().catch(() => {})
    if (error instanceof GuardianFormError) throw error
    throw new GuardianFormError(400)
  } finally {
    reader.releaseLock()
  }

  const bytes = new Uint8Array(count)
  let offset = 0
  for (const part of chunks) {
    bytes.set(part, offset)
    offset += part.byteLength
  }
  const params = new URLSearchParams(new TextDecoder().decode(bytes))
  if (Array.from(params.keys()).some(key => key !== 'clave') || params.getAll('clave').length !== 1) {
    throw new GuardianFormError(400)
  }
  return params.get('clave')
}
