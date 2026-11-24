# JCL · Tablero privado de los Diez Oráculos V1

**Estado:** taller editorial de preproducción, PR en borrador. **No fusionar ni publicar sin aprobación.**

## Propósito

Permitir al creador comprobar la distribución de **33 capítulos del Libro I** en los
**diez Oráculos**, utilizando la matriz ya aprobada y la cronología editorial vigente,
sin abrir los ocho sitios sellados. La vista se encuentra en
`/guardian/oraculos` y se alcanza desde el mapa privado
`/guardian/mapa`. Ambas rutas exigen sesión del Guardian en el servidor.

El tablero **no implementa aún el Oráculo-GPT**, no desbloquea capítulos ni modifica
el índice general `/libro/1`, que sigue disponible. Los vínculos del Libro I son
recomendaciones temáticas: no equivalen necesariamente a escenas ocurridas físicamente
en los lugares asignados.

## Fuentes de autoridad (solo lectura)

- `lib/san-yallego/sites.ts`: orden real de los diez lugares y estados de acceso.
- `lib/san-yallego/oracle-matrix-v1.json`: distribución editorial aprobada.
- `lib/san-yallego/oracle-timeline-v2.json`: correspondencia de referencias por libro.
- `lib/san-yallego/chapters.ts`: títulos, URL y partes reales del Libro I.
- `lib/san-yallego/oracle-audio-catalog.ts`: control previo de recomendaciones
  publicables; no se modifica ni se reemplaza por el tablero.

## Qué contiene

- Diez tarjetas con dominio temático, capítulos asignados y notas de continuidad.
- Enlaces del creador a `/guardian/sitio/<id>` (rutas existentes y autenticadas).
- Enlaces a los 33 capítulos públicos ya publicados desde el índice del Libro I.
- Indicadores de archivos referenciados, incluidas las dos partes de los capítulos
  IV, XXIX y XXXII.
- Estado real de sellos desde `sites.ts`; **ocho permanecen sellados al público**.
- Libros II–IV sin enlaces añadidos mientras no haya contenido verificado ni permisos.
- Navegación mediante anclas y semántica accesible para móvil y escritorio.

## Salvaguardas

1. La ruta llama a `hasGuardianSession()` **antes** de generar el tablero.
2. `force-dynamic` y metadatos `noindex, nofollow` evitan indexación accidental;
   la autorización real la da la sesión, no los metadatos.
3. La función `buildOracleWorkbench` comprueba diez sitios, 33 capítulos únicos,
   tres o cuatro por Oráculo, coincidencia de títulos, sitios y cronología.
4. Una discrepancia **detiene** la generación del tablero en lugar de inventar
   una asignación, un capítulo futuro o una URL de audio.
5. El enlace de vuelo siempre apunta al **Guardian** y nunca abre un sitio público sellado.
6. Se conservan las cautelas del canon: Bifurcación no equivale al Sendero del XOLO;
   la Cueva de los Suspiros no es automáticamente la Puerta del Mictlán.
7. **No se incorporan secretos, llaves, multimedia, gastos ni datos de visitantes.**

## Verificación

- `pnpm run test:oracles`: comprueba la matriz con los datos reales, títulos, partes,
  duplicados, estados sellados y autenticación en el código de la ruta.
- `pnpm run test:security`: incluye la suite anterior junto a las existentes.
- `pnpm run build`: incluye la suite antes de la compilación de Next.js.
- `pnpm exec eslint .`, `pnpm run typecheck` y CI en GitHub Actions.
- Revisar presentación en móvil y escritorio con una sesión de prueba autorizada;
  las pruebas de código no sustituyen las pruebas visuales.

## Pendiente para otro módulo

Implementar el **motor de conversación del Oráculo-GPT por sitio**, con permisos
servidor y acceso filtrado a capítulos publicados. No desarrollar sus respuestas
con N4/N5/C100 o claves en el repositorio público.
