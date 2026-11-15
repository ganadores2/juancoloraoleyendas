# Auditoría editorial automática — Libro I, capítulos 2–33
Fecha: 14 de noviembre de 2026

## Alcance y fuentes
- Comparación de los 32 capítulos de `lib/san-yallego/book-one-reading-v1.json` con `EL_GRAN_CAMBIO_EDICION_LITERARIA_V1.md` (fuente de lectura) y la extracción textual `EL_GRAN_CAMBIO_TRANSCRIPCION_INTEGRA_SRT.txt`.
- La comparación normaliza títulos de capítulos, espacios, saltos de línea, acentos y signos de puntuación. Cada uno de los 32 cuerpos narrativos de la web coincide en palabras y orden con su capítulo de la edición V1 **antes de aplicar las pequeñas correcciones ortotipográficas**.
- El SRT añade cabeceras `CAPÍTULO N`, cierres `FIN DEL CAPÍTULO N`, comentarios de producción al acabar los capítulos 12, 17 y 28, y coda en el 33. No volcar esos materiales auxiliares a la web automáticamente.
- La mención «Capítulo 24» en el cuerpo del 31 es una remisión narrativa interna; no se elimina.
- Esta es **auditoría texto↔texto**. NO representa una comparación auditiva o transcripción independiente de los MP3; la fidelidad de la interpretación vocal permanece pendiente.

## Correcciones automáticas autorizadas
- 9 puntos finales duplicados al terminar una cita cerrada con comillas (`.”.` y `...”.”`) en el catálogo de lectura, preservando las palabras. Commit `ad3b475`.
- Prueba de regresión para detectar esos cierres duplicados en capítulos 2–33. Commit `96a0bab`.
- No se han editado los 36 MP3, el SRT archivado, las ediciones maestras ni la producción.

## Excepciones para no marcar errores falsos
- «¡Hijas del maíz!» se conserva con ortografía normal para lectura; la forma alargada «MAaaIz» es apoyo fonético expresivo para ElevenLabs, no una discrepancia narrativa.
- Modismos, sonidos, regionalismos, expresiones de personajes, nombres ficticios y elecciones artísticas NO se modifican por normalización ciega.
- No se elimina contenido narrativo porque el SRT o la edición incluyan notas técnicas.

## Casos que requieren decisión editorial humana (sin modificaciones)
1. Capítulo 4: `—Yo .Si.` — separación y acentuación de diálogo ambiguas; escuchar y reconstruir el contexto.
2. Capítulo 25: `Los dieciséis no estaba...` — posible discordancia; verificar intención de frase completa antes de corregir.
3. Grafía de Doña Chabela/Chavela — uniformar nombre canónico conforme a decisión del autor sin cambiar la interpretación de voz.
4. Capítulo 33: coda final presente en la extracción SRT pero no en la edición V1; mantener reservada, pendiente de decisión explícita del autor.
5. Capítulos 12, 17 y 28: comentarios editoriales que aparecen solo en extracción SRT y no son parte del texto de lectura; comprobar en grabación antes de cualquier corte.

## Próximo control
- Obtener acceso al MP3 real del capítulo 1 y realizar una transcripción independiente con autorización de coste si usa servicio de pago.
- Si valida la metodología, extender el cotejo narración↔lectura a capítulos 2–33, marcando hallazgos según nivel: (a) mecánico inequívoco, autocorregible en Preview; (b) fonético intencional, preservar; (c) narrativo/artístico, consultar al autor.
- Mantener el PR #19 en Draft, sin merge ni despliegue de producción.
