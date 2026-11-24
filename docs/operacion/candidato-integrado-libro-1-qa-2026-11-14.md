# Libro I — Candidato integrado de QA (14 noviembre 2026)

**Estado:** borrador de prueba. No hacer merge ni publicar sin aprobación explícita del creador.  
**Rama base:** `main`.  
**Rama candidata:** `preview/libro-1-audio-y-desbloqueo-integrado-20261114`.  
**PR:** #19.

## Estado confirmado

### Audiolibro y catálogo

- `main` contiene **33 capítulos en 36 archivos MP3**.
- Los capítulos **4, 29 y 32** tienen dos partes.
- Las 36 rutas declaradas coinciden con archivos presentes y Chromium reconoce sus metadatos.
- Duración total real medida por Chromium: **6.97 horas**.
- Diagnóstico texto/duración: los 33 capítulos quedan entre **78 y 102 palabras por minuto**; no se detectan asociaciones groseramente anómalas entre texto y MP3.
- Este diagnóstico **no** equivale a cotejo palabra por palabra.

### Puerta narrativa del Libro I

- En una visita nueva solo el Capítulo 1, «El Primer Grito», está abierto.
- Los capítulos 2–33 aparecen como **POR DESCUBRIR**.
- Terminar el capítulo 1 leyendo abre los otros 32.
- Terminar el MP3 del capítulo 1 también abre los otros 32.
- El estado persiste tras recargar.
- La puerta es narrativa y vive en el navegador; no es DRM ni protección de descarga.

### Capítulos multipartes

Comprobación automática y manual:

- Capítulo 4: parte 1 → parte 2, correcto.
- Capítulo 29: parte 1 → parte 2, correcto.
- Capítulo 32: correcto; el autor percibe una pausa aproximada de 2 s. Se conserva sin cambios mientras no aparezca evidencia de fallo, porque funciona también como respiración narrativa.

### Bienvenida cinematográfica

- Secuencia funcional: saludo 1 → saludo 2 → invitación → portal.
- El micrófono es parte del gesto cinematográfico, **no** un control obligatorio.
- Ambos videos permanecen montados durante la transición.
- Se conserva el último fotograma válido del saludo 1 antes de `ended`.
- Fondo de seguridad de la bienvenida: **turquesa nocturno** y capa opaca sobre cualquier mapa subyacente.
- Última observación humana antes del fondo turquesa: aún se alcanzaba a percibir por una fracción una ranura del mapa.
- **Pendiente:** volver a observar la transición con el fondo turquesa y confirmar si desapareció o quedó imperceptible.

### Móvil

Automatizado en Chromium:

- Vertical **390×844**: sin desbordamiento horizontal.
- Horizontal **844×390**: bienvenida, controles y Pase de San Yallego sin recortes.
- Los botones «Continuar a la Casa de Juanito» y «Volver al mapa» permanecen visibles en horizontal.

**Pendiente:** prueba en teléfonos físicos reales, vertical y horizontal.

### Guardián

Comprobado por código y pruebas:

- sesión firmada y con vencimiento;
- cookie `HttpOnly`, `SameSite=Strict`, `Secure` en producción y limitada a `/guardian`;
- alteraciones de sesión o cambio de secreto invalidan el acceso;
- formularios rechazan origen externo y solicitudes anómalas;
- rate limit distribuido;
- si la protección de tasa no está disponible, el acceso se cierra en vez de abrirse;
- `/guardian/mapa` redirige sin sesión;
- la sesión del creador está separada del progreso del visitante;
- los ocho lugares reservados siguen sellados públicamente.

**Pendiente:** comprobación humana de login/logout en el entorno publicado sin registrar ni exponer la Llave Maestra.

### Texto de lectura

- Capítulo 1: `chapter-one-text.ts`.
- Capítulos 2–33: `book-one-reading-v1.json`.
- El servidor entrega únicamente el capítulo solicitado.
- Existe una prueba de inventario que exige los 33 capítulos y rechaza capítulos o párrafos vacíos.
- La fuente sigue identificada como edición literaria V1 depurada del material SRT de ElevenLabs.

**Pendiente:** cotejo palabra por palabra contra los MP3.

## QA automático actual

Último ciclo completamente confirmado antes de esta actualización documental:

- TypeScript: aprobado.
- ESLint: 0 errores; advertencias preexistentes no bloqueantes.
- Seguridad/Guardián: aprobado.
- Build Next.js: aprobado.
- Vercel Preview: aprobado.
- Chromium E2E: **16/16**.

La batería cubre, entre otros:

1. 36 MP3 por HTTP.
2. videos cinematográficos por HTTP.
3. puerta inicial del Capítulo 1.
4. metadatos de los 36 MP3.
5. coherencia texto/duración.
6. enlace directo al capítulo 2 bloqueado narrativamente.
7. desbloqueo por lectura.
8. multipartes 4/29/32.
9. transición parte 1→2 sin completar antes de tiempo.
10. ocho lugares públicos sellados.
11. Guardián sin sesión.
12. ausencia de excepciones JavaScript.
13. móvil vertical.
14. móvil horizontal y Pase.
15. desbloqueo por audio.
16. bienvenida sin obligación de pulsar el micrófono.

## Próxima secuencia de trabajo

1. Reprobar visualmente saludo 1 → saludo 2 con el nuevo fondo turquesa.
2. Probar la experiencia en teléfono físico, vertical y horizontal.
3. Comprobar login/logout real del Guardián sin revelar credenciales.
4. Hacer un **piloto de transcripción del Capítulo 1** y comparar narración real con el texto de lectura.
5. Si el piloto funciona, definir tolerancias editoriales y escalar el cotejo a los 33 capítulos.
6. Solo después valorar merge y publicación del candidato.

## Límites deliberados

- No modificar el contenido literario durante QA técnico.
- No exponer secretos, llaves ni valores de variables de entorno.
- No abrir los ocho lugares sellados.
- No confundir una prueba automática con una escucha artística humana.
- No confundir coherencia de duración con coincidencia palabra por palabra.
- **No ejecutar merge, publicación, promoción ni activación de producción sin aprobación explícita del creador.**
