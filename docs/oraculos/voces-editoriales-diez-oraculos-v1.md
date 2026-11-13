# JCL — Dirección editorial de las Diez Voces de los Oráculos V1

**Estado:** laboratorio privado de preproducción, **propuestas no aprobadas**. La matriz de 33 capítulos distribuida entre los diez sitios **sí está aprobada**; las personalidades de voz de este documento **todavía no**.

## Propósito

Transformar el acuerdo editorial «**un solo motor, diez personalidades**» en diez fichas de dirección artística con timbre interpretativo, ritmo, léxico y prohibiciones. Sin copiar voces de intérpretes reales ni añadir personajes nuevos al canon. La edición aprobada de la matriz se consulta desde:

- `lib/san-yallego/oracle-matrix-v1.json`
- `docs/oraculos/matriz-maestra-10-oraculos-v1.md`

Este módulo tiene ruta protegida `/guardian/voces-oraculos`. **La ruta usa sesión del Guardian comprobada en el servidor**, `force-dynamic` y `noindex`. No hay audio, motor IA, formulario público ni acceso para visitantes. La ruta es independiente del PR #9 (tablero de oráculos) y del PR #10 (contrato N0).

## Diez propuestas para revisión del autor

| Oráculo | Nombre de trabajo de su voz (NO canon) | Propósito |
|---|---|---|
| Entrada | El Umbral que Pregunta | Dar bienvenida con curiosidad |
| Casa de Juanito | La Memoria del Hogar | Invitar al nacimiento y la familia sin imitar a Dolores |
| Plaza | El Eco de la Plaza | Construir sentido de comunidad con humor mesurado |
| Iglesia | La Conciencia que Escucha | Abrir reflexión, no imponer interpretaciones |
| Herrero | La Forja de Preguntas | Pensar el oficio y la transformación |
| Río | El Murmullo del Río | Distinguir posibilidad onírica y hecho narrado |
| Bifurcación | La Voz de los Caminos | Elegir, partir y regresar sin adelantar futuros |
| Puerta al Inframundo | La Prudencia del Umbral | Respetar el misterio sin inventar cosmologías |
| Lago | El Tiempo que Pregunta | Orientar hacia la memoria y los orígenes sin revelar el núcleo |
| Ceiba | La Raíz que Escucha | Evocar raíces y cuidado, sin confundir árboles |

Cada nombre es solo una **etiqueta de dirección vocal**, no un nuevo personaje que existe literalmente en la trama ni una voz de ElevenLabs ya elegida.

## Separación entre contenido aprobado y propuesta creativa

- **Aprobado previamente:** sitios, temas, asignación de capítulos, preguntas de ejemplo y respuestas orientadoras en la matriz. La página toma estos ejemplos **literalmente del archivo aprobado**, sin crear respuestas nuevas.
- **Por aprobar:** nombre artístico de cada voz, timbre, ritmo, léxico y prohibiciones de interpretación.
- **No incorporado:** identidades de los actores, audios, prompts del proveedor, modelos, claves, licencias, servicios de pago, respuestas IA dinámicas y material reservado.

## Reglas para un futuro Oráculo-GPT

1. Un motor central, diez perfiles; cada uno orienta sin resolver los misterios.
2. Antes de citar un capítulo o ofrecer enlaces de audio, verificar **publicación real** y permiso del lado del servidor; el progreso local nunca autoriza secretos.
3. El formato esperado de respuesta, cuando se implemente, será **explicación breve, pista prudente e invitación a una experiencia disponible**. No inventar citas, edades, sucesos, nombres o apariciones.
4. No equiparar Bifurcación con Sendero del XOLO, la Cueva de los Suspiros con el Mictlán ni el ahuehuete con la Ceiba.
5. Las preguntas del visitante y la información recuperada se consideran entrada no confiable; deben existir filtros de contexto y auditoría de salida antes de conectar cualquier IA.
6. El Ojón tiene su propia ficha de universo extendido. **No se le asigna automáticamente la voz de ningún Oráculo, ni acceso a secretos.** La sigla SEDLQNLI forma parte de una posible ampliación de su ficha, independiente de este módulo.

## QA y alcance

- `lib/san-yallego/oracle-voice-proposals-v1.json` contiene diez perfiles, todos en `propuesta-por-aprobar` y `voiceAsset: null`.
- `lib/san-yallego/oracle-voice-review.mjs` valida unicidad, orden por la matriz y que no haya grabaciones ni voces declaradas aprobadas.
- `tests/oracle-voices.test.mjs` cubre matriz, unicidad, protección contra modificación de estatus, ausencia de audio e invariantes de la página protegida.
- `pnpm run test:oracle-voices` ejecuta la batería; también se incorpora a `test:security` y al `build`.
- Pendiente de QA manual: pantalla y accesibilidad móvil/escritorio con sesión autorizada; solo tras ello y decisión autoral podremos preparar las primeras pruebas de voz.

**Sin modificaciones** de rutas públicas, estados sellados, audios, progresos, llaves, firewall o producción. No fusionar este PR sin aprobación del autor.
