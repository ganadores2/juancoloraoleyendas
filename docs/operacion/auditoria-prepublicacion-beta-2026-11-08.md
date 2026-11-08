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
7. **Pendiente:** confirmar el HTTP 429 y Retry-After mediante inspección de red, el conteo exacto, fallos reales de Redis, producción tras publicación y el alcance público de archivos MP4 estáticos. No se introdujo una llave real.

Estas comprobaciones no implican aprobación para desplegar, ni prueban que una ruta estática de `public/assets` esté protegida.

---

## Puertas de salida — condición necesaria antes de publicar

- [ ] **Revisión de cambios:** inspeccionar los 103 archivos comparados y separar contenido destinado a `main` de material técnico/editorial no publicable.
- [ ] **Definir alcance de la beta:** confirmar si sale con capítulo 1 disponible y un índice de 33 títulos, o si se esperará a incorporar los restantes 32 MP3. No confundir "rutas generadas" con "audio disponible".
- [ ] **Autorización y login:** validar clave y firma del creador, límites 5/60s/IP y comportamiento cuando KV/Redis no responde; inspeccionar producción sin mostrar secretos.
- [ ] **Control de activos:** decidir qué videos/imágenes pueden residir en `public` y qué debe quedar tras autorización real.
- [ ] **QA móvil y accesibilidad:** recorrido completo en móvil real, texto/contraste, audio, sin saltos de transición y enlaces funcionales.
- [ ] **Salida a producción:** crear/revisar PR específico desde la rama cinematográfica, validar CI y despliegue preparatorio; solicitar aprobación expresa del titular antes de merge, despliegue o promoción.
- [ ] **Postlanzamiento:** conservar como fase posterior los Oráculos GPT, ES/EN y TECH-OZ, según `docs/biblia/v4-apartado-despues-del-lanzamiento-resumen-publicable.md`; no activarlos por efecto de publicar la beta.

## Estado de cierre

**Sin luz verde todavía para producción.** El recorrido fue probado y compila, pero la verificación de configuración real de acceso, la exposición de media, el alcance de los audios y la auditoría de integración siguen pendientes.

Los nombres de variables se inspeccionaron **sin descifrarlas**. No se modificaron variables, reglas WAF, ramas ni despliegues de producción durante esta auditoría.
