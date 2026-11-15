# Auditoría nocturna Libro I — 15 de noviembre de 2026

**Ámbito:** rama `preview/libro-1-audio-y-desbloqueo-integrado-20261114`, PR #19 (Draft). **Sin merge ni publicación de producción.**

## Evidencia nueva verificada (lectura de GitHub, no ejecución local)
- El PR #19 está **open / draft / merged=false**; cabeza examinada: `ea42e138db3b579eaaf09fbc02646794081b6fba`.
- Workflow **San Yallego - Quality Checks #91**, run `43684205803`, finalizó con **success** sobre esa cabeza. El job **TypeScript and Security Tests** registra exitosos ESLint, TypeScript, pruebas de seguridad, build, instalación de Chromium y **Browser E2E - 33 chapters, media and 8 sealed sites**. No se adjudican aquí recuentos de aserciones que el job no detalla.
- El estado combinado de **Vercel = success** para la misma cabeza. Es confirmación del estado de integración, **no** inspección visual/manual de Preview.
- Árbol Git del commit: **36 MP3 físicos**, **601.089.745 bytes** sumados (aprox. 601 MB decimales), con capítulos numerados **1–33 sin huecos** y exactamente tres divididos: **4, 29 y 32**. La segunda parte del capítulo 29 mide **268.260 bytes**; es un segmento breve, no evidencia de corrupción. La prueba de inventario existente exige >128 KiB por archivo, y el CI aprobó. La presencia y el tamaño no prueban decodificación ni fidelidad de voz.
- Se examinó `chapters.ts`: 33 entradas de catálogo, 36 rutas de audio, con secuencias de dos partes para 4/29/32. La prueba `tests/book-one-audio-inventory.test.mjs` comprueba correspondencia exacta catálogo↔archivos y duplicados. CI aprobó.
- Se examinó `chapter-access.mjs` y `tests/chapter-access.test.mjs`: capítulo 1 abierto, capítulos 2–33 bloqueados hasta que conste `libro-1-capitulo-1` completado; números fuera de 1–33 se rechazan. **Puerta narrativa del navegador, no autenticación ni protección de MP3.**
- Se leyó directamente `book-one-reading-v1.json`: capítulos **2–33** presentes, **5.389 párrafos** sumados; el capítulo 1 reside en `chapter-one-text.ts`. La prueba de inventario de lectura verifica capítulos y párrafos no vacíos y el cargador `server-only`. El CI aprobó.
- Revisión mecánica puntual del texto: **0** apariciones de «Chabela» en los capítulos 2–33 y **0** en el código fuente del capítulo 1; **0** patrones `[.!?…]”.` en 2–33. El capítulo 1 contiene **14** apariciones de «Chavela»; los capítulos 2–33 contienen **10**. La frase del capítulo 25 «Los dieciséis no estaban resultando tan sagrados como prometían» está presente; también «Yo sí» en el 4. El texto visible del 33 termina en «Y Siguió… caminando…» (sin agregar coda editorial del SRT).
- Se respetan las decisiones autorales sobre Chavela, el diálogo del 4, el sentido de «Los dieciséis», el cierre auditivo del 33 y las instrucciones no narradas de 12/17/28. **Ninguna edición literaria ni de audio realizada en esta corrida.**

## Límites importantes
- La edición `EL_GRAN_CAMBIO_EDICION_LITERARIA_V1.md` y la extracción `EL_GRAN_CAMBIO_TRANSCRIPCION_INTEGRA_SRT.txt` se citan en el informe previo pero **no están en el árbol de esta rama**. El informe del 14 de noviembre documenta cotejo texto↔texto de 2–33 con esas fuentes; esta corrida **no lo reprodujo de manera independiente**.
- No se descargaron ni decodificaron los 601 MB de MP3. No hubo escucha real, reconocimiento de voz ni cotejo narración↔lectura palabra por palabra; no se usó ningún servicio de pago.
- No se ejecutó prueba física de Safari/iPhone, inspección visual del destello saludo 1→2 ni login/logout con credenciales reales. No afirmar que estén resueltos.
- CI y Vercel están en verde para la cabeza previa a este commit **documental**. Comprobar de nuevo sus resultados tras incorporar el informe.

## Pendientes para revisión del autor
1. **Piloto auditivo capítulo 1:** obtener acceso efectivo al MP3 y una transcripción fiable sin coste, o aprobación explícita del coste antes de cualquier servicio de pago; después cotejar contra lectura.
2. **Validación humana:** transición de videos de bienvenida, Safari/iPhone real y login/logout real del Guardián sin revelar credenciales.
3. **Cotejo editorial independiente:** aportar/recuperar los dos documentos maestros para repetir la comparación completa y diferenciar normalizaciones deliberadas de divergencias.
4. **Decisión de publicación:** solo cuando el autor apruebe expresamente el merge y la publicación del candidato.

**Cambios de esta corrida:** únicamente este informe de auditoría, sin modificación de código, audio, llaves, Guardian, lugares privados, main o producción.
