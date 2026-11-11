# JCL · Biblioteca Gráfica de Personajes — piloto privado V1

**Estado:** propuesta de preproducción; NO equivale a publicación ni aprobación visual.
**Rama:** `feature/biblioteca-grafica-personajes-v1`.
**Ubicación propuesta:** `/guardian/biblioteca-grafica`, enlazada exclusivamente desde la Sala del Creador.

## Objetivo

Construir un inventario visual único para relacionar personajes, transiciones de edad,
libros, capítulos, diez oráculos y futuras series animadas. La biblioteca general de
libros y audios permanece independiente; ningún capítulo se retira ni bloquea por esta etapa.

## Contenido de esta primera versión

- Juan Colorao: rangos de las *láminas visuales conceptuales* 0–2, 3–5, 6–10, 11–15
  y 16–20, sin convertirlos en edades automáticas de un capítulo; ranuras de Libros
  II, III y IV y una visión artística **no canónica** de Juan a los 120 años.
- María de los Ángeles: referencia visual de Libro I y ranuras de futuras etapas.
- XOLO: continuidad gráfica sin asignar edad biológica ni revelar su naturaleza.
- Don Chema: continuidad de San Yallego y propuesta de futura serie cómica.
- Cada tarjeta admite `imageSrc`, pero todos los valores están a `null`: no se
  fingen fotos, no se publican originales de Biblioteca privada y no se reutilizan
  dibujos de otra edad para simular una etapa.

## Protección

La página verifica `hasGuardianSession()` del lado del servidor antes de renderizar.
Sin sesión redirige a `/guardian`. La página es dinámica y `noindex`.
**Advertencia:** el repositorio GitHub es público. No añadir secretos, llaves,
biografías N4/N5/C100, manuscritos reservados ni URLs de imágenes privadas a
`lib/san-yallego/character-gallery-v1.ts`, aunque la página use autenticación.

## Antes de autorizar imágenes

1. Revisar los originales en Biblioteca personal y seleccionar la imagen exacta de
   cada etapa; verificar derechos y autorización de publicación.
2. Cotejar con la Biblia V3, ficha visual y capítulo/audio relevante.
3. Marcar expresamente cuáles son concepto, aprobación de identidad o canon visual maestro.
4. Revisar consistencia de rostro, lateralidad de marcas, proporciones, vestuario y
   siete vistas por etapa cuando corresponda; una lámina compuesta NO equivale a
   siete vistas ni a siete edades.
5. Incorporar **solo las imágenes aprobadas** al almacenamiento autorizado; entonces
   enlazar rutas reales en el manifiesto.
6. Auditar versión móvil, texto alternativo, tiempos de carga y sesión cerrada.
7. Integrar a los Oráculos GPT únicamente datos y fotos publicables filtrados por
   nivel de acceso, capítulo publicado y progreso del visitante.

## Lista de validación antes de fusionar

- [ ] `pnpm typecheck` y `pnpm build` superan las pruebas.
- [ ] Acceso directo sin sesión a `/guardian/biblioteca-grafica` redirige a `/guardian`.
- [ ] Acceso desde la Sala del Creador con sesión autorizada funciona.
- [ ] Ningún retrato privado está en `public/` ni en el código cliente.
- [ ] Móvil/escritorio, retorno al Taller y lector de pantalla verificados.
- [ ] Autor aprueba expresamente merge; publicación/producción requieren aprobación adicional.

No modifica recorridos, audio, biblioteca de capítulos, sellos, llaves ni Oráculos.
