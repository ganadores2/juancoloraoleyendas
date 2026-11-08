# Auditoría previa a la publicación beta — 8 de noviembre de 2026

**Proyecto:** Juan Colorao Leyendas · `juancoloraoleyendas.com`  
**Estado:** diagnóstico de lectura; **NO AUTORIZA merge, despliegue a producción ni cambio de dominio.**  
**Rama candidata:** `feature/recorrido-cinematografico-10-sitios`  
**Rama de producción:** `main`.

## Hallazgos confirmados en GitHub y Vercel

| Área | Evidencia | Interpretación / decisión |
|---|---|---|
| Diferencia con producción | Comparación GitHub `main...feature/recorrido-cinematografico-10-sitios`: **226 commits adelante, 0 atrás, 103 archivos** | Una integración grande requiere revisión previa, no merge directo sin aprobación. |
| Producción actual | Despliegues Vercel objetivo `production`, estado READY, commit `9e4974194544e473c2fe790dd3800eaf4570f47c` de `main` | El sitio público aún no refleja necesariamente el trabajo de la rama beta. |
| Preview candidato | Último READY observado: commit `a109e98855739239abc76961b4f41616c1746522` | La disponibilidad de preview no equivale a aprobación de lanzamiento. |
| Pruebas locales | Autor mostró 27/27 tests aprobados, TypeScript y `next build` correctos, 53 rutas estáticas generadas. | Faltan pruebas de producción sobre el entorno y revisión móvil/accesibilidad. |
| Visita manual | Autor comprobó ambos saludos, oráculo, preguntas, llave, descensos, audio, alternativas, glosario y vuelta al mapa. | Validación funcional de escritorio confirmada por el autor. |
| Error de navegador | Aviso de hidratación por atributos de extensión LINER desapareció al quitarla. | No modificar componentes ni ocultar avisos de React por este problema ya aislado. |
| Índice Libro I | `lib/san-yallego/chapters.ts`: 33 capítulos listados, pero **solo capítulo 1 tiene ruta MP3**. | La beta debe declarar claramente qué capítulos permiten reproducción; no sugerir que 33 audios están disponibles. |
| MP3 existentes | `public/assets/audio/libro-1/` contiene **únicamente** `capitulo-01-el-primer-grito.mp3` y un README. | Faltan por incorporar, cotejar y publicar MP3 2–33 por bloques, incluidas segundas partes. |
| Video | `public/assets/video/`: dos bienvenidas + portal + recorrido, diez descensos y diez transiciones a oráculos (archivos verificados por nombres en el repositorio). | Archivos preparados; no implica que todos los caminos estén autorizados al visitante. |
| Seguridad de la sala | Código de sesión servidor y tests presentes; proyecto Vercel tiene nombres de variables de firma/llave y proveedor KV configurados para preview/production. | **Presencia de variables ≠ validación de su funcionamiento y alcance.** No revelar valores sensibles. |
| Firewall y rate limit | La consulta de configuración activa de Firewall devolvió 404 `Seawall Config not found`. `docs/tecnico/guardian-waf-rate-limit-release.md` describe Redis compartido y protección fail-closed en producción. | No afirmar que hay WAF personalizado activo; efectuar prueba controlada del login y de los fallos del proveedor antes de publicar. |
| Media reservada | `public/assets/video` se sirve como estático, independientemente de la navegación sellada. | No tratar los MP4 de lugares cerrados como secretos. Si contienen información confidencial, migrarlos a almacenamiento privado autenticado. |
| PR existentes | PR #1, #2 y #6 abiertos y en borrador desde **otras ramas**. | Ninguno es el PR de la rama cinematográfica actual; no fusionar el PR equivocado. |
| Riesgos narrativos | `docs/biblia` y `docs/oraculos` incluyen material editorial preparatorio. | Auditar spoilers / exposición de referencias antes de fusionar a un repo público y desplegar; los detalles estratégicos privados de TECH-OZ no deben incorporarse. |

## Pruebas manuales de acceso confirmadas — 8 de noviembre de 2026

**Ambiente:** localhost y Vercel Preview de la rama cinematográfica. **Producción no probada ni modificada.**

1. En Chrome incógnito, `/guardian/mapa` redirigió al formulario de Llave Maestra: **APROBADO — bloqueo de página**.
2. En Chrome incógnito, `/guardian/sitio/sitio-03` redirigió al formulario: **APROBADO — bloqueo de página**.
3. En Chrome incógnito, `/sitio/sitio-03` mostró «San Yallego todavía no te ha mostrado este camino» y «Volver al mapa»: **APROBADO — sitio público sellado**.
4. En Vercel Preview, una llave deliberadamente falsa produjo «La llave no fue reconocida»: **APROBADO — rechazo de credencial incorrecta**.
5. Tras varios intentos consecutivos con la clave falsa, el Preview mostró «La puerta está en pausa. Demasiados intentos...» y pidió esperar aproximadamente un minuto: **APROBADO — bloqueo visible al superar el umbral**. La captura de pantalla del autor demuestra la interfaz; **la condición HTTP 429 y su cabecera Retry-After todavía no se inspeccionaron directamente**.
6. Tras esperar más de un minuto, el autor regresó a la Sala del Creador, introdujo nuevamente la llave falsa y recibió «La llave no fue reconocida», sin la pantalla de pausa: **APROBADO — recuperación del formulario tras el bloqueo temporal**.
7. En Chrome incógnito, la URL directa `/assets/video/oraculo/03-Jardines-Plaza-al-Oraculo.mp4` reprodujo fluidamente el vuelo de aproximación al Oráculo de la Plaza: **CONFIRMADO — MP4 accesible públicamente por URL directa**. Esto es **comportamiento intencional y autorizado**, no una vulnerabilidad por sí misma: `docs/tecnico/politica-medios-san-yallego.md` registra la **Opción A aprobada por el autor**, que permite uso público/promocional de los 20 vuelos, sin autorizar secretos, acceso interactivo a Oráculos ni entrada al Taller. No trasladar esos 20 MP4 a almacenamiento privado por esta comprobación.
8. **Pendiente:** confirmar el HTTP 429 y Retry-After mediante inspección de red, el conteo exacto, fallos reales de Redis, producción tras publicación y revisar cualquier material futuro realmente reservado. No se introdujo una llave real.

Estas comprobaciones no implican aprobación para desplegar, ni prueban que una ruta estática de `public/assets` esté protegida.

---

## Prueba real en Motorola Edge — vertical y horizontal (8 de noviembre de 2026)

**Validación manual comunicada por el autor** en teléfono Motorola Edge, desde la beta. No equivale a una medición de laboratorio ni garantiza el mismo rendimiento en todos los dispositivos.

- **Horizontal:** experiencia visual casi completa (apreciación del autor, «casi 100%»); portada y vuelos se ven especialmente bien.
- **Vertical:** los extremos de bienvenida y portada quedan recortados; el resto de la experiencia se ve en su mayor parte (apreciación del autor, «más del 90%»), y el mapa admite movimiento para explorar detalles.
- **Flujo recorrido en móvil:** bienvenida → Entrada → Oráculo → preguntas → llave → descenso a Casa de Juanito → Oráculo → lectura o escucha del capítulo → opciones de finalización → glosario/Archivo de Palabras → biblioteca e índice de capítulos. Fluidez y funcionamiento confirmados por el autor.
- **Lector:** comprobó cambios de ambiente, color y tamaño; controles visibles y funcionales en la prueba.
- **Detalle de seguimiento no bloqueante por ahora:** confirmar que el recorte vertical no oculte texto esencial, botones, subtítulos o puntos de interacción; valorar encuadre responsive específico más adelante solo si afecta la comprensión. No cambiar cinematografía aprobada por un recorte lateral esperable de un video horizontal.
- **Cobertura pendiente:** varios modelos de Android/iOS, conexiones lentas, accesibilidad (teclado, lector de pantalla, contraste) y pruebas en diferentes anchos de pantalla.

**Decisión operativa:** QA manual de Motorola Edge en ambas orientaciones satisfactoria; sin modificaciones de código por este resultado. Mantener la aprobación final de publicación condicionada a los demás controles.

---

## Capítulo I: fuente literaria del SRT depurado — 8 de noviembre de 2026

**Corrección editorial tras QA real:** el autor confirmó en Motorola/Chrome que el medidor de lectura avanza hasta 100% y que los temas, botones y tres miradas funcionan, pero la lectura proveniente del PDF de 170 páginas no correspondía al texto grabado de ElevenLabs.

- **Fuente recuperada de Biblioteca:** `JUAN_COLORAO_·_LEYENDAS (1).srt` (original), `EL_GRAN_CAMBIO_TRANSCRIPCION_INTEGRA_SRT.txt`, `EL_GRAN_CAMBIO_33_CAPITULOS_TEXTO_PROVISIONAL.md` y `EL_GRAN_CAMBIO_EDICION_LITERARIA_V1.md` (edición depurada para lectura).
- **Cambio:** `lib/san-yallego/chapter-one-text.ts` ahora contiene los **100 párrafos completos** de `CAPÍTULO 01 — EL PRIMER GRITO` de la edición V1 derivada del SRT. Empieza «La noche del 8 de marzo de 1969, San Yallego dejó de respirar por un instante.» y termina «Esperando.»; no incluye Capítulo II ni coda.
- **Integridad:** el ajuste conserva diálogos ensamblados, texto íntegro de esa edición y orden narrativo; `scripts/verify-foundations.mjs` comprueba número de bloques, diálogos, inicio, cierre y exclusión de instrucciones técnicas.
- **Metadatos:** el pie del lector identifica ahora la fuente correcta y advierte explícitamente que **todavía no hay cotejo palabra por palabra con el MP3 definitivo**.
- **Sin cambios:** archivos SRT fuente, audio, Oráculos, bienvenida cinematográfica y permisos.
- **Pendiente:** comprobar con el autor en la nueva beta que se lee ese texto de principio a fin, y hacer cotejo editorial con el MP3 si existieran divergencias.

---

## Integración de lectura de los 33 capítulos — 8 de noviembre de 2026

El autor aprobó continuar con los otros 32 capítulos del Libro I como acompañamiento literario para los visitantes. Se integró la **edición literaria V1 depurada de la transcripción de subtítulos SRT de ElevenLabs**, sin inventar contenido y sin alterar MP3.

- **Fuente**: `EL_GRAN_CAMBIO_EDICION_LITERARIA_V1.md`, recuperado de Biblioteca; SRT íntegro y audios maestros permanecen fuera del repositorio.
- **Texto**: `lib/san-yallego/book-one-reading-v1.json` incorpora los 32 capítulos restantes (2–33) y sus **5.389 párrafos**; Capítulo I sigue desde `chapter-one-text.ts` con 100 párrafos depurados. Verificado inicio y fin de las 33 secciones y que no se incorpora la coda reservada después del capítulo 33.
- **Entrega**: `chapter-text.ts` se ejecuta **solo del lado del servidor**; cada ruta de capítulo entrega al navegador únicamente los párrafos de esa sección, no toda la novela.
- **Experiencia**: mismo lector con 3 ambientes, letra variable y medidor; marcadores separados por número de capítulo; el índice ofrece lectura para los 33. Los capítulos 2–33 abren directamente en lectura y marcan sus audios como pendientes. Al terminar, se puede pasar al capítulo anterior/siguiente, al índice, al Archivo de Palabras o al mapa.
- **Límites**: únicamente el MP3 del Capítulo I está enlazado. **No** se simula reproducción en los otros 32. La edición literaria V1 **todavía no está cotejada palabra por palabra contra los audios finales**; necesita aprobación editorial del autor antes de llamarla edición definitiva.
- **Seguridad editorial**: rutas /libro/1/capitulo/* con `noindex`; política `robots.ts` de preview impide indexación. Publicar los 33 textos gratuitamente en el futuro requerirá una decisión comercial explícita del autor; esto es integración de beta, **no autorización para promocionar o lanzar toda la obra**.
- **No cambia**: Oráculos interactivos, llaves, lugares sellados, vuelos cinematográficos, producción ni la Biblia V3.

**Próxima puerta**: prueba manual en Motorola o escritorio de Capítulos II, XVIII y XXXIII (inicio/fin, marcadores separados, regreso al índice), además de la posterior integración de audios por lotes y cotejo editorial.

---

## Puertas de salida — condición necesaria antes de publicar

- [ ] **Revisión de cambios:** inspeccionar los 103 archivos comparados y separar contenido destinado a `main` de material técnico/editorial no publicable.
- [ ] **Definir alcance de la beta:** confirmar si sale con capítulo 1 disponible y un índice de 33 títulos, o si se esperará a incorporar los restantes 32 MP3. No confundir "rutas generadas" con "audio disponible".
- [ ] **Autorización y login:** validar clave y firma del creador, límites 5/60s/IP y comportamiento cuando KV/Redis no responde; inspeccionar producción sin mostrar secretos.
- [x] **Control de vuelos existentes:** confirmada la política Opción A (20 MP4 de descensos/aproximación pueden estar en `public`) y una URL directa reproduce el vuelo de la Plaza. Esta autorización **no** cubre secretos, contenido nuevo reservado, ni interacción de los ocho Oráculos sellados.
- [ ] **QA móvil y accesibilidad:** **Motorola Edge validado** en vertical y horizontal para recorrido, audio, navegación y lector; **pendiente** cobertura multi-dispositivo, accesibilidad y confirmar que el recorte vertical no oculte elementos esenciales.
- [ ] **Salida a producción:** crear/revisar PR específico desde la rama cinematográfica, validar CI y despliegue preparatorio; solicitar aprobación expresa del titular antes de merge, despliegue o promoción.
- [ ] **Postlanzamiento:** conservar como fase posterior los Oráculos GPT, ES/EN y TECH-OZ, según `docs/biblia/v4-apartado-despues-del-lanzamiento-resumen-publicable.md`; no activarlos por efecto de publicar la beta.

## Estado de cierre

**Sin luz verde todavía para producción.** El recorrido fue probado y compila, pero la verificación de configuración real de acceso, la exposición de media, el alcance de los audios y la auditoría de integración siguen pendientes.

Los nombres de variables se inspeccionaron **sin descifrarlas**. No se modificaron variables, reglas WAF, ramas ni despliegues de producción durante esta auditoría.
