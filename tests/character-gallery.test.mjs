import assert from 'node:assert/strict'
import { test } from 'node:test'
import { readFileSync } from 'node:fs'
import { isSafePublicPortraitPath, assertGalleryImageSources, galleryCounts } from '../lib/san-yallego/gallery-policy.mjs'

const juanco = {
  id: 'juan-colorao',
  stages: [
    {
      id: 'juanco-presentador-adulto',
      status: 'identidad-aprobada',
      imageSrc: null,
      views: [
        { id: 'frente', imageSrc: null },
        { id: 'tres-cuartos-izq', imageSrc: null },
        { id: 'perfil-izq', imageSrc: null },
        { id: 'espalda', imageSrc: null },
        { id: 'perfil-der', imageSrc: null },
        { id: 'tres-cuartos-der', imageSrc: null },
        { id: 'frente-alternativa', imageSrc: null },
      ],
    },
    { id: 'juan-nino', status: 'referencia-privada', imageSrc: null },
    { id: 'juan-libro-ii', status: 'por-definir', imageSrc: null },
  ],
}

test('siete vistas de JUANCO son siete ángulos del mismo modelo, no siete edades', () => {
  const views = juanco.stages[0].views
  assert.equal(views.length, 7)
  assert.equal(new Set(views.map((view) => view.id)).size, 7)
  assert.equal(assertGalleryImageSources([juanco]), true)
})

test('identidad facial aprobada no equivale a imagen publicada', () => {
  assert.deepEqual(galleryCounts([juanco]), {
    characters: 1, approvedIdentity: 1, privateReferences: 1, pending: 1, publishedImages: 0,
  })
})

test('solo rutas locales del directorio autorizado pueden publicarse', () => {
  assert.equal(isSafePublicPortraitPath('/assets/images/personajes/juan-colorao/frente.webp'), true)
  assert.equal(isSafePublicPortraitPath('/assets/images/personajes/juanco.png'), true)
  for (const bad of [
    'https://example.com/privada.png',
    '//example.com/privada.png',
    'data:image/png;base64,1234',
    '/assets/images/personajes/../privada.png',
    '/assets/images/personajes/juan%2e%2e.png',
    '/assets/images/personajes/juan.png?token=secreto',
    '/assets/images/personajes/juan.svg',
    '/assets/audio/libro-1/capitulo-01.mp3',
    null,
  ]) {
    assert.equal(isSafePublicPortraitPath(bad), false, String(bad))
  }
})

test('inventario rechaza enlaces privados incluso si el estado dice aprobado', () => {
  const wrong = structuredClone(juanco)
  wrong.stages[0].publicationApproved = true
  wrong.stages[0].views[3].imageSrc = 'https://private.example.com/juanco.png'
  assert.throws(() => assertGalleryImageSources([wrong]), /Ruta de vista no autorizada/)
  const wrongPortrait = structuredClone(juanco)
  wrongPortrait.stages[0].publicationApproved = true
  wrongPortrait.stages[0].imageSrc = '/images/privada.png'
  assert.throws(() => assertGalleryImageSources([wrongPortrait]), /Ruta de retrato no autorizada/)
  const withoutPermission = structuredClone(juanco)
  withoutPermission.stages[0].imageSrc = '/assets/images/personajes/juanco.webp'
  assert.throws(() => assertGalleryImageSources([withoutPermission]), /Publicación de imagen no aprobada/)
})

test('el inventario real de JUANCO contiene los siete ángulos y ninguna imagen publicada', () => {
  const source = readFileSync(new URL('../lib/san-yallego/character-gallery-v1.ts', import.meta.url), 'utf8')
  const model = source.split("id: 'juanco-presentador-adulto'")[1]?.split("id: 'juan-0-2'")[0]
  assert.ok(model, 'Debe existir la etapa de JUANCO adulto')
  assert.match(model, /status: 'identidad-aprobada'/)
  const views = [...model.matchAll(/\{ id: '([^']+)', label: '[^']+', imageSrc: null \}/g)]
  assert.equal(views.length, 7, 'Deben quedar exactamente siete vistas privadas')
  assert.equal(new Set(views.map((view) => view[1])).size, 7)
  assert.doesNotMatch(model, /publicationApproved: true/, 'La aprobación facial no publica imágenes')
})

test('la página privada conserva autenticación del lado servidor y validación de rutas', () => {
  const page = readFileSync(new URL('../app/guardian/biblioteca-grafica/page.tsx', import.meta.url), 'utf8')
  assert.match(page, /if \(!\(await hasGuardianSession\(\)\)\) redirect\('\/guardian'\)/)
  assert.match(page, /assertGalleryImageSources\(CHARACTER_GALLERY_V1\)/)
  assert.match(page, /robots: \{ index: false, follow: false \}/)
})
