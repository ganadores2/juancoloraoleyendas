# JCL · Contrato N0 de preproducción para Oráculo-GPT (V1)

**Estado:** experimento de arquitectura en rama, sin GPT conectado, sin API pública, sin cambio de llaves, sin costos. Requiere aprobación separada antes de integrar a producción.

## Alcance de este ladrillo

El siguiente nivel de los diez Oráculos necesita primero una **frontera editorial y de acceso**. Esta rama incluye una función pura `prepareOracleN0Blueprint` que construye una ficha de previsualización usando solamente la matriz editorial aprobada del Libro I.

Conserva:
- diez lugares existentes, asignación de **33 capítulos del Libro I** y sus dominios temáticos;
- preguntas de ejemplo y respuestas orientadoras ya aprobadas en `oracle-matrix-v1.json`;
- cautelas: asociación temática no equivale a una escena física; las siete vistas de un personaje no son siete edades;
- N0 como **único** nivel disponible para el boceto; **sin lectura de documentos reservados**;
- sin datos, títulos, audio o enlaces nuevos a Libros II–IV.

Este contrato NO genera respuestas ni conecta con un proveedor de modelos. `modelActive: false` y `publishReady: false` se reportan explícitamente.

## Tabla de permisos de preproducción

| Sitio | Estado del contrato para visitantes | Motivo |
|---|---|---|
| `entrada` | Boceto editorial N0 | Abierto en el mapa actual |
| `casa-de-juanito` | Denegado por defecto | Solo contemplar futura comprobación real en servidor |
| `sitio-03` a `sitio-10` | Denegado siempre | Son ocho sitios sellados al público |

El callback `permitRestrictedSite` **no autentica ni verifica por sí mismo**:
sirve para representar el resultado de una comprobación **ya realizada en servidor**.
No pasar un valor suministrado por el navegador ni derivarlo de un estado local.
Mientras ese mecanismo no exista, no integrar un endpoint para Casa de Juanito.

Una URL, nombre de visitante, `localStorage`, marcadores de progreso o un parámetro `trusted: true` **no prueban autorización**. El contrato no lee ninguno.

Los sitios desconocidos, sellados y sin permiso devuelven **el mismo mensaje genérico sin nombre de lugar ni datos de contenido**.

## Niveles narrativos

- **N0:** único nivel para prototipos con ejemplos editoriales explícitos ya aprobados.
- **N1–N3:** diferidos hasta verificar sesiones y permisos reales en backend.
- **N4:** insinuación narrativa limitada según la futura política, nunca documentación cruda.
- **N5 / C100:** no incorporar al contexto del proveedor ni revelar bajo ninguna circunstancia.

No incluir manuscritos, claves, prompts reservados, secretos de trama o material privado en un repositorio público aunque una ruta use autenticación.

## Para activar un Oráculo-GPT real más adelante

1. Obtener del autor una aprobación independiente de guiones, identidad de voz y tono de cada Oráculo.
2. Implementar verificación **servidor** de visitante, permisos y materiales realmente publicados; no reutilizar el `progressStore` del navegador como autorización.
3. Crear un índice de contenido editorial N0 estrictamente aprobado y separado de las fuentes reservadas.
4. Preparar recuperación de documentos con filtro por nivel y capítulo autorizado **antes** de entregar contexto al modelo; todo contenido recuperado y toda pregunta es entrada no confiable.
5. Validar **la salida del modelo** (filtraciones de secretos, alucinaciones, spoilers y enlaces), registrar fallos de forma prudente y probar ataques con solicitudes adversarias. Un prompt instructivo **no garantiza** evitar revelaciones.
6. Acordar el proveedor, costos, cuota, privacidad, retención y logs **antes de cualquier conexión real**.
7. QA visual y accesibilidad, y solo después una revisión explícita del Creador para publicación.

## El Ojón

El Ojón tiene ficha maestra aprobada como **personaje del universo extendido**, pero aún **no se incorpora como voz activa de ningún Oráculo ni como informante de secretos**.
Su intervención cómica o auditiva futura requerirá decisión autoral; los chistes sobre sus grandes orejas no equivalen a un cambio del canon.

## Archivos y pruebas

- `lib/san-yallego/oracle-gpt-contract.mjs`: genera el boceto N0 y deniega sitios restringidos.
- `tests/oracle-gpt-contract.test.mjs`: coteja la matriz original, 33 capítulos únicos, diez sitios, ocho sellos, ausencia de progreso del cliente como autorización y no activación del modelo.
- `pnpm run test:oracle-gpt` para las pruebas específicas.
- `pnpm run test:security` y `pnpm run build` incluyen la suite anterior.

**No modifica** `app/guardian/`, `app/sitio/`, `lib/san-yallego/sites.ts`, `progress.ts`, MP3, claves ni reglas de Vercel.

Este módulo es independiente de los PR #8 (Biblioteca Gráfica) y #9 (Tablero privado), para poder revisarlos y fusionarlos solo cuando el autor lo autorice.
