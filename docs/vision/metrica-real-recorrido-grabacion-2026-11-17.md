# Métrica del recorrido cinematográfico — grabación real del 3 de noviembre de 2026
Fecha de análisis: 17 de noviembre de 2026
Estado: observación de referencia, NO cambio de código, audio ni producción.
Rama de trabajo: preview/libro-1-audio-y-desbloqueo-integrado-20261114 · PR #19 Draft.

## Archivo examinado
Grabación aportada por el creador: `Screen Recording 2026-11-03 221024.mp4`.
Características medidas con ffprobe: H.264 1882 × 780 a 30 fps; audio AAC; duración 105.8333 segundos (1:45.83).
La grabación corresponde a una navegación particular y **no prueba** duraciones automáticas fijas para todos los visitantes. Se observan acciones/avances que afectan los tiempos.

## Hitos observados por muestreo visual
| Momento aprox. | Pantalla / acción reconocible | Pauta para la música |
| --- | --- | --- |
| 0:00 | Portada «Bienvenido a San Yallego» y botón Comenzar la aventura | Introducción leve, misteriosa; respetar restricción de autoplay |
| 0:05–0:15 | Juan Colorao en los saludos y la invitación | Motivo propio muy bajo para no enmascarar su voz |
| 0:20 | Título «Recorrido exprés» | Comienzo de un ascenso emocional |
| 0:25–0:40 | Secuencia visual de sitios y panorámicas: plaza, herrero, sendero / árbol | Abrir cuerdas, textura y pulso; mantener loop flexible ante pausas |
| 0:45 | Pantalla de transición hacia llave | Anticipación y suspensión |
| 0:50 | «Has encontrado la llave de San Yallego» | Pequeña revelación, sin golpe que distraiga de la interacción |
| 0:55–1:05 | Mapa y vuelo hacia la Casa de Juanito | Reaparece motivo principal |
| 1:10–1:16 | Escena del Oráculo / amuleto y acceso a capítulo | Cierre emocional; volumen muy tenue si hay narración |
| ≈1:18 | «Capítulo 1 — El Primer Grito», invitación a tocar para escuchar | Final musical con fundido / silencio de espera |
| ≈1:28–1:30 | Se inicia el reproductor de audiolibro | Música de entrada DETENIDA, no competir con la narración |
| 1:45.83 | Final de la grabación, durante reproducción del capítulo | No incluir estos segundos en la duración del tema de entrada |

**Nota:** esos hitos se tomaron de fotogramas y son aproximados, no una secuencia editada al fotograma. No afirmar que la panorámica duró exactamente 15 segundos en esta grabación; el creador indica que el panorama puede detenerse o adelantarse.

## Comprobación de audio
La pista AAC sí existe. Una inspección técnica de la amplitud global devuelve volumen medio alrededor de -41.8 dBFS y máximo de -15.6 dBFS. Bajo un umbral de -42 dBFS, se detecta un tramo continuo de aproximadamente 9.64 a 84.87 segundos por debajo del umbral. **Esto NO demuestra que los vídeos reales estén sin audio**, pues la captura de escritorio pudo silenciar o no grabar sonido del navegador, y una métrica global de amplitud no identifica diálogos con fiabilidad. Para diseñar el ducking es necesario escuchar los videos originales por separado y comprobar la grabación con audio del sistema.

## Decisión de diseño derivada
- Revisar la meta original de 2:00: para esta navegación de muestra, se llega a capítulo 1 alrededor de 1:18 y el audiolibro se inicia alrededor de 1:28.
- **Master musical sugerido ≈90 segundos**, NO duración exacta obligatoria. Intro y desarrollo, una zona ambiental que pueda repetirse sin cortes, y un cierre musical/fundido activado al alcanzar la lectura o pulsar escuchar.
- Si el visitante contempla el mapa, responde el Oráculo o demora la llave, el loop se extiende. Evitar pistas por vídeo y evitar que el tema termine por un temporizador fijo.
- Un solo reproductor persistente montado en layout para mantener continuidad entre rutas; respetar mute, autoplay y accesibilidad; bajar música durante voz o preguntas.
- Hacer fade-out al capítulo 1 y detener completamente al comenzar el audiolibro; **no reproducir fondo encima de los 33 capítulos**.
- No introducir pausas ni autoplay que bloqueen la navegación; tampoco tocar llaves ni Guardian.

## Próximo requisito
Aportar o producir **una pieza original autorizada** para San Yallego, revisar su licencia para web, confirmar puntos de bucle, cargarla solamente a preview y probar mezcla/volumen reales en PC y Android. No existe todavía una pista aprobada ni implementación musical en el sitio.

## Protección del proyecto
Documentación únicamente; no modificar `main`, producción, videos, audios existentes, 8 lugares sellados, acceso Guardian, gastos ni agentes IA.
