# JCL · Biblioteca Gráfica de Personajes — piloto privado V1

**Estado:** propuesta de preproducción; NO equivale a publicación ni aprobación visual.
**Rama:** `feature/biblioteca-grafica-personajes-v1`.
**Ubicación propuesta:** `/guardian/biblioteca-grafica`, enlazada exclusivamente desde la Sala del Creador.

## Objetivo

Construir un inventario visual único para relacionar personajes, transiciones de edad,
libros, capítulos, diez oráculos y futuras series animadas. La biblioteca general de
libros y audios permanece independiente; ningún capítulo se retira ni bloquea por esta etapa.

## Contenido de esta primera versión

- **JUANCO adulto — presentador de bienvenida/portada**: el autor aprobó la identidad de
  la plantilla reciente de siete vistas. Se inventarían **siete ángulos de un mismo
  modelo** (frontal, tres cuartos izquierdo, perfil izquierdo, espalda, perfil
  derecho, tres cuartos derecho, frontal alternativo), no siete edades.
  **Identidad aprobada NO equivale a permiso para publicar la imagen.** Los siete
  archivos siguen sin copiarse al repositorio (`imageSrc: null`), y esta aprobación
  no define el rostro de Juan a los 17 años ni de los libros siguientes.
- **Filtros de estado** en el Taller: todos, identidad aprobada, referencias privadas,
  etapas pendientes; con resumen visible de imágenes efectivamente incorporadas.
- Juan Colorao: rangos de las *láminas visuales conceptuales* 0–2, 3–5, 6–10, 11–15
  y 16–20, sin convertirlos en edades automáticas de un capítulo; ranuras de Libros
  II, III y IV y una visión artística **no canónica** de Juan a los 120 años.
- María de los Ángeles: referencia visual de Libro I y ranuras de futuras etapas.
- XOLO: continuidad gráfica sin asignar edad biológica ni revelar su naturaleza.
- Don Chema: continuidad de San Yallego y propuesta de futura serie cómica.
- Las tarjetas y siete vistas admiten `imageSrc`, pero **todos los valores actuales
  permanecen en `null`**: no se fingen fotos ni se copian originales privados.
  Para aceptar una ruta, la etapa requiere `publicationApproved: true` (con
  autorización expresa) y el archivo debe vivir bajo `/assets/images/personajes/`,
  sin URL externa, datos privados, parámetros ni ascensos de directorio.


## Ampliación de inventario para doce personajes

Se incorporan **ocho fichas adicionales**, sin archivos fotográficos y sin edades
inventadas: Abuelo Pancho, Dolores Colorao, Doña Chavela, Gabriel, Tomás, Lupita,
Geraldo y El Ojón. Junto con Juan Colorao, María de los Ángeles, XOLO y Don Chema,
la galería ofrece **doce entradas de preproducción**.

- Cada personaje referencia su fichero ya existente `docs/personajes/...`, que
  describe su procedencia. La navegación incluye un índice de enlaces internos
  para consultar rápidamente una ficha en teléfono o escritorio.
- **Chavela:** no se inventa una edad a partir del rumor de generaciones, ni una
  imagen individual que no ha sido identificada inequívocamente.
- **Dolores:** no se introduce el error de la lámina que la llama «amiga de Juanito».
- **Tomás:** no se unen homónimos documentales sin identificación narrativa.
- **Gabriel:** no se decide arbitrariamente entre «Vallego» y «Yallego».
- **Lupita y Geraldo:** las láminas conceptuales no autorizan futuros, edades
  ni hechos que las escenas publicadas no confirmen.
- **El Ojón:** su alta de personaje en universo extendido NO equivale a un avatar
  maestro, aparición obligatoria ni episodio de animación terminado.
- **Abuelo Pancho:** identidad y humor distintos de Don Chema.

El verificador de galería impide también IDs repetidos, fuentes editoriales fuera
de `docs/personajes/`, plantillas de vistas incompletas o con vistas repetidas.
Las fotos siguen sin incorporarse. Ningún cambio altera el catálogo cronológico
original ni los archivos de los oráculos.

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

## Pruebas introducidas en esta rama

- `lib/san-yallego/gallery-policy.mjs`: verifica directorio autorizado de imágenes,
  distingue identidad de publicación y rechaza rutas privadas y estados sin permiso.
- `tests/character-gallery.test.mjs`: cubre siete ángulos, recuentos, ausencia de
  publicaciones y bloqueo de URLs no permitidas. Ejecutar `pnpm run test:gallery`.
- La suite también se incorpora a `pnpm run test:security` y al comando `pnpm build`,
  para que CI compruebe el Taller junto a las reglas existentes.

## Lista de validación antes de fusionar

- [ ] `pnpm run test:gallery`, `pnpm typecheck` y `pnpm build` superan las pruebas.
- [ ] Acceso directo sin sesión a `/guardian/biblioteca-grafica` redirige a `/guardian`.
- [ ] Acceso desde la Sala del Creador con sesión autorizada funciona.
- [ ] Ningún retrato privado está en `public/` ni en el código cliente.
- [ ] Las siete vistas de JUANCO no se presentan como siete edades de Juanito.
- [ ] La aprobación facial no permite publicar un archivo sin permiso editorial explícito.
- [ ] Móvil/escritorio, retorno al Taller y lector de pantalla verificados.
- [ ] Autor aprueba expresamente merge; publicación/producción requieren aprobación adicional.

No modifica recorridos, audio, biblioteca de capítulos, sellos, llaves ni Oráculos.
