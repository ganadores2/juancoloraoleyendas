# Auditoría editorial automática — Libro I, capítulos 2–33
Fecha: 14 de noviembre de 2026

## Alcance y fuentes
- Comparación de los 32 capítulos de `lib/san-yallego/book-one-reading-v1.json` con `EL_GRAN_CAMBIO_EDICION_LITERARIA_V1.md` (fuente de lectura) y la extracción textual `EL_GRAN_CAMBIO_TRANSCRIPCION_INTEGRA_SRT.txt`.
- La comparación normaliza títulos de capítulos, espacios, saltos de línea, acentos y signos de puntuación. Cada uno de los 32 cuerpos narrativos de la web coincidía en palabras y orden con su capítulo de la edición V1 **antes de aplicar la limpieza de puntuación y la grafía Chavela**. Estas correcciones quedan registradas para no interpretarlas como diferencias de narración.
- El SRT añade cabeceras `CAPÍTULO N`, cierres `FIN DEL CAPÍTULO N`, instrucciones editoriales no narradas al acabar los capítulos 12, 17 y 28 (confirmación del autor), y texto editorial adicional tras el cierre del 33. No volcar esos materiales auxiliares a la web automáticamente.
- **Decisión autoral confirmada:** en el audio del capítulo 33 la última frase es «FIN DEL CAPÍTULO 33». Todo lo que aparezca después de ese cierre en el texto SRT es material editorial extra, no contenido narrativo necesario ni coda para publicación. Se conserva exclusivamente en la fuente de respaldo y queda fuera del libro visible. El lector web ya termina su cuerpo narrativo en «Y Siguió… caminando…»; no requiere recortar ni alterar el MP3.
- La mención «Capítulo 24» en el cuerpo del 31 es una remisión narrativa interna; no se elimina.
- Esta es **auditoría texto↔texto**. NO representa una comparación auditiva o transcripción independiente de los MP3; la fidelidad de la interpretación vocal permanece pendiente.

## Correcciones automáticas autorizadas
- 9 puntos finales duplicados al terminar una cita cerrada con comillas (`.”.` y `...”.”`) en el catálogo de lectura, preservando las palabras. Commit `ad3b475`.
- Prueba de regresión para detectar esos cierres duplicados en capítulos 2–33. Commit `96a0bab`.
- Grafía del personaje normalizada en el texto web: **Chabela → Chavela** (14 apariciones en el capítulo 1 y 11 en capítulos 2–33), según la aclaración del autor de que se trata de errores de escritura. No se alteran el SRT ni las grabaciones.
- No se han editado los 36 MP3, el SRT archivado, las ediciones maestras ni la producción.

## Excepciones para no marcar errores falsos
- «¡Hijas del maíz!» se conserva con ortografía normal para lectura; la forma alargada «MAaaIz» es apoyo fonético expresivo para ElevenLabs, no una discrepancia narrativa.
- Modismos, sonidos, regionalismos, expresiones de personajes, nombres ficticios y elecciones artísticas NO se modifican por normalización ciega.
- No se elimina contenido narrativo porque el SRT o la edición incluyan notas técnicas.

## Casos que requieren decisión editorial humana (sin modificaciones)
1. Capítulo 4: **RESUELTO por el autor**: Juan dice «—No tengo miedo.» y María responde «—Yo sí.». Corregida la grafía en el texto web, sin cambiar el audio.
2. Capítulo 25: **RESUELTO por el autor**. «Los dieciséis» alude a los dieciséis años de Juan y al umbral de decisiones (irse, quedarse, su relación con María). La lectura web ya contiene correctamente «Los dieciséis no estaban resultando tan sagrados como prometían». No se cambió el texto por estar correcta la concordancia.
3. Grafía de Doña Chabela/Chavela — **resuelta en lector web** como Chavela por aclaración del autor. Verificar únicamente que otros documentos editoriales se actualicen al preparar una nueva edición definitiva.
4. Capítulo 33: **RESUELTO por el autor**. El audio cierra con «FIN DEL CAPÍTULO 33»; lo posterior en el SRT es extra editorial no necesario y no se incorpora al libro. Mantener el archivo original como respaldo; sin cortes de audio.
5. Capítulos 12, 17 y 28: **RESUELTO por declaración expresa del autor**. Los textos extra son instrucciones editoriales para ElevenLabs que el sistema interpretó, pero NO convirtió en audio. No forman parte de la narración ni del texto de lectura; se conservan solamente en el SRT/respaldo original. No se requiere corte de MP3 ni modificación de los capítulos. La exclusión está validada por el autor, sin presentarla como una verificación auditiva independiente.


## Repetición independiente del cotejo textual completo — 16 de noviembre de 2026

**Resultado: 33 de 33 capítulos coinciden en palabras y orden** entre la fuente `EL_GRAN_CAMBIO_EDICION_LITERARIA_V1.md` localizada en la biblioteca del proyecto (11.122 líneas, sección de cada capítulo) y los textos de la rama candidata.

**Método:** se recuperaron los 33 cuerpos completos de la edición V1, capítulo por capítulo, desde la biblioteca; se obtuvieron de GitHub `lib/san-yallego/chapter-one-text.ts` (cap. 1, 100 párrafos) y `lib/san-yallego/book-one-reading-v1.json` (caps. 2–33). Se compararon los cuerpos completos como secuencia de palabras con normalización de mayúsculas, diacríticos, puntuación, espacios y la sustitución autoral **Chabela → Chavela**. Para el capítulo 1 coincidieron **1.212 palabras**. Para el conjunto completo, **0 discrepancias de palabras** según esa normalización, sin capítulos faltantes.

**Alcance de la evidencia:** este método detecta diferencias de palabras y orden; NO valida coincidencia exacta de tildes, signos, párrafos o pausas, ni demuestra que los MP3 digan lo mismo. La fuente V1 proviene del SRT y no sustituye una transcripción auditiva independiente. El archivo fuente antiguo sigue escribiendo Chabela; solo el lector web adopta la grafía Chavela acordada. Las instrucciones editoriales de capítulos 12, 17, 28 y el material posterior al cierre 33 se excluyen de la lectura por decisión del autor.

**Resultado operativo:** no se requieren cambios en los textos por divergencia léxica respecto a la edición V1. El siguiente pendiente de mayor valor es cotejo con **audio real**, comenzando por el cap. 1, cuando se disponga de un acceso y una herramienta fiable sin costo o se autorice explícitamente otro método. No se descargó, transcribió ni modificó ningún MP3 en esta corrida. El entorno actual no pudo resolver por red la URL pública del MP3 y no cuenta con un motor de reconocimiento de voz instalado.

## Próximo control
- Obtener acceso al MP3 real del capítulo 1 y realizar una transcripción independiente con autorización de coste si usa servicio de pago.
- Si valida la metodología, extender el cotejo narración↔lectura a capítulos 2–33, marcando hallazgos según nivel: (a) mecánico inequívoco, autocorregible en Preview; (b) fonético intencional, preservar; (c) narrativo/artístico, consultar al autor.
- Mantener el PR #19 en Draft, sin merge ni despliegue de producción.
