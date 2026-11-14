# Libro I — Candidato integrado de QA (14 noviembre 2026)

**Estado:** borrador de prueba. No hacer merge ni publicar sin aprobación explícita del creador.
**Rama base:** `main` (ya contiene los 33 audios).
**Rama candidata:** `preview/libro-1-audio-y-desbloqueo-integrado-20261114`.

## Hechos comprobados en GitHub

- `main` incluye 36 archivos MP3, correspondientes a los 33 capítulos del Libro I; los capítulos 4, 29 y 32 tienen dos partes.
- Las rutas declaradas del catálogo coinciden con los MP3 presentes en `main`. Esto no demuestra reproducción o coincidencia palabra a palabra con el texto.
- El catálogo de `main` permitía abrir los 33 capítulos directamente; el flujo narrativo acordado requiere completar el primero antes de abrir el resto.
- Las ramas anteriores `feature/recorrido-cinematografico-10-sitios` y `preview/audiolibro-libro-1` son antecedentes de `main`, no versiones que haya que fusionar de nuevo.

## Cambios propuestos en este candidato

1. Índice público con los 33 títulos; capítulos 2–33 como «Por descubrir» hasta terminar el primero.
2. El enlace directo a un capítulo 2–33 antes de terminar el primero muestra una invitación a leer o escuchar el capítulo inicial.
3. El evento existente `completeChapter` conserva la progresión tras escuchar o leer y el avance en el navegador.
4. Prueba de 33 entradas / 36 rutas de MP3, con partes dobles para 4, 29 y 32.
5. Prueba de desbloqueo y de rechazo de capítulos inexistentes.
6. La compilación ejecuta ambas pruebas, la verificación estructural, las pruebas de Guardián y el build Next.js.

## Plan manual de prueba pendiente (sin afirmar ejecución)

1. Abrir la Preview correspondiente en Chrome incógnito. Entrar a `/libro/1`; el capítulo 1 debe estar habilitado y los 2–33 deben mostrar «Por descubrir».
2. Abrir directamente `/libro/1/capitulo/2`; debe aparecer el mensaje que conduce al capítulo 1, sin reproducir el capítulo 2.
3. En el capítulo 1, terminar la lectura y pulsar «Terminé de leer»; volver al índice. Ahora se deben ofrecer los 33.
4. Repetir en otro navegador después de escuchar el MP3 del capítulo 1 hasta el final. Verificar que las tres miradas continúan funcionando.
5. Abrir 4, 29 y 32: comprobar parte 1 → pausa de 1 s → parte 2, posición guardada, fin solo después de la parte final.
6. Regresar al mapa, recorrer las pantallas y comprobar que los ocho sitios sellados permanecen cerrados. Probar `/guardian` sin usar ni revelar una llave real.
7. Comprobar en teléfono vertical y horizontal, con audio desactivado y con banda ancha limitada; revisar foco, botones y recorte.
8. Registrar que la edición literaria SRT no está todavía cotejada palabra por palabra con todos los MP3.

## Límites deliberados

- El desbloqueo es **narrativo**, persistido en `localStorage`; no es DRM, autorización de pago ni control servidor de descarga. Los MP3 y HTML públicos pueden ser accesibles por rutas externas.
- No modifica el contenido de los libros, audiovisuales, datos de Oráculos, llaves, sesiones del Guardián ni autorización de los ocho sitios cerrados.
- El resultado automático no reemplaza una prueba real de reproducción o de interacción humana.
- **No ejecutar merge, publicación, promoción ni activación de producción por este documento.**
