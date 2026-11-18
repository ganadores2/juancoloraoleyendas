# Banda sonora continua de entrada — Concepto y arquitectura
Fecha: 17 de noviembre de 2026
Estado: PROPUESTA EDITORIAL Y ESPECIFICACIÓN TÉCNICA · no se ha añadido pista real, no se ha activado audio nuevo.
Rama: preview/libro-1-audio-y-desbloqueo-integrado-20261114 · PR #19 Draft
Petición del creador: «un solo track desde la bienvenida hasta el oráculo para leer el libro como un track de fondo, como el tráiler de una película; falta emoción y misterio».

## Visión creativa
Una única banda sonora original, cinematográfica, con identidad San Yallego: misteriosa, melancólica y progresivamente heroica, **sin música distinta por cada vídeo**. La banda sonora no reemplaza voces, sonidos ambientales ni el audiolibro de 33 capítulos. Las imágenes se convierten en un recorrido con unidad emocional.

### Guion musical por fases — NO duraciones absolutas
| Paso | Emoción | Música |
| --- | --- | --- |
| Saludo de Juan Colorao | Invitación, curiosidad | Grave suave, aire y textura musical; espacio para la voz |
| Invitación / micrófono | Misterio y expectativa | Aparece motivo de tres o cuatro notas; nada de golpe fuerte sobre diálogo |
| Portal / anuncio | Umbral mágico | Pad y cuerdas, pulso lento en ascenso |
| Sobrevuelo / mapa | Descubrimiento | Apertura armónica, resonancia ancestral, ritmo sutil |
| Descenso y Oráculo de Entrada | Asombro y tensión | Crescendo contenido y suspensión; bajar volumen ante preguntas |
| Llave / Casa de Juanito / acceso al capítulo 1 | Revelación y calma | Resolución del motivo musical y fundido gradual |
| Inicio de lectura o audio del Libro I | Prioridad absoluta al relato | **Parar/fundido de la banda sonora de entrada**; la narración no compite con música |

La duración real depende del usuario (pausas, lectura del mapa, Oráculo y búsqueda de llave). Por tanto no sincronizar el final de la pista a una duración fija del recorrido: diseñar **una pieza original con sección central loopeable sin chasquidos ni silencio y cierre musical activado por eventos**, o un master continuo con loop instrumental entre dos puntos. Aunque musicalmente se produce como *una sola obra/track*, la experiencia puede manejar introducción, bucle y cierre sin reproducir canciones distintas. El compositor decidirá puntos y metadatos de bucle.

## Verificaciones del repositorio
- `app/layout.tsx` contiene componentes globales `TravelerMapNav` y `SoundToggle`. El reproductor musical deberá montarse una sola vez aquí **dentro del layout persistente**, NO en cada pantalla.
- `hooks/use-san-yallego.ts` provee `useSound`; `lib/san-yallego/sound.ts` guarda una preferencia global `san-yallego:sonido`. Respetarla, sin reactivar sonido si el usuario silenció.
- `components/san-yallego/bienvenida/bienvenida-screen.tsx` reproduce dos clips con `muted={!soundOn}` y transiciones internas; el gesto del micrófono no exige otro clic.
- `components/san-yallego/portal/portal-screen.tsx` alterna `portal → anuncio → recorrido` y luego envía a `/sitio/entrada`. No depender únicamente del pathname para el volumen *dentro* de esas transiciones.
- `components/san-yallego/cinematic-video.tsx` y el reproductor de vuelos tienen audio propio, que puede contener voces y ambiente. No reemplazar ni silenciar indiscriminadamente los vídeos hasta oír su contenido.
- `components/san-yallego/capitulo/audio-player.tsx` reproduce la narración y puede habilitar audio desde gesto del usuario; al iniciar esta narración la banda sonora debe bajar a cero / detenerse. `ImmersiveReader` permite lectura silenciosa con controles de tipografía.
- `lib/san-yallego/assets.ts` actualmente define MP3 de narrativa y vídeos; **no se ha constatado un archivo master de banda sonora continua aprobado**. No inventar una URL de archivo existente.

## Arquitectura propuesta para implementación futura
1. Un componente cliente `JourneyScore` persistente en `app/layout.tsx`, con **un solo elemento HTMLAudioElement** montado mientras navega por pantallas de viaje. No re-crear `new Audio` por cada ruta.
2. Archivo master **original, propio y autorizado para web**, por ejemplo `/public/assets/audio/ambiente/san-yallego-entrada-original.mp3` (RUTA RESERVADA, EL ARCHIVO NO EXISTE AÚN).
3. Semántica de «reproducir» desde el primer gesto de usuario (clic en Comenzar aventura o play habilitado por navegador); políticas de autoplay en Chrome/Android/iOS pueden bloquear audio sin interacción. Jamás presentar reproducción como garantizada automáticamente.
4. Un store mínimo de estado temporal (no de permisos) con fases `welcome/portal/map/entrance/oracle/key/juanito/chapter`; cuando convenga, eventos de fase explícitos desde las pantallas para modular volumen, sin acoplar el bucle a rutas ambiguas. La URL puede servir de fallback.
5. **Duck automático**: cuando un vídeo presenta habla, bajar el master musical aproximadamente 12–18 dB con ataque rápido y recuperación suave; para preguntas del Oráculo, favorecer un descenso más pronunciado y no tapar silencios. Los valores finales se fijarán en escucha real, no como hechos.
6. **Final de viaje**: al entrar a capítulo 1 o pulsar play del audiolibro, llevar volumen a cero en 1.5–3 s y detener el audio persistente. Si el usuario retrocede al mapa, no reiniciar de manera sorpresiva en un volumen alto.
7. **Controles**: respetar el toggle actual (silencio global) y proponer una opción adicional «Música ambiental» independiente de narración, solo si en pruebas se necesita; no obligar a escuchar música para navegar.
8. **Accesibilidad**: permitir apagar la música y mantener inteligibles voces del Oráculo y audio narrado; cambios de volumen sin picos; no interferir con lector de pantalla ni controles de teclado. Considerar la preferencia de movimiento reducido y sensibilidad a audio.
9. **Entrega técnica**: optimizar MP3 y duración, carga progresiva; no precargar un master grande en todas las visitas. Probar loop sin corte en Android/PC y Safari iOS si está disponible; comprobar autoplay, suspensión de pestaña, navegación SPA, cambiar de dispositivo, restaurar tras mute, volumen del vídeo y audiolibro.
10. **Seguridad**: música no altera `Progress`, no desbloquea capítulos o sitios, no toca Guardian, no consume llaves de API y no cambia rutas protegidas.

## Sugerencias musicales al compositor / generador autorizado
- Sin letra ni voces: cuerdas cálidas, cello discreto, percusión de pulso profundo, viento/aire, una textura orgánica y un motivo propio memorable; evitar sonidos estridentes o estereotipos folclóricos superficiales.
- Apertura de misterio, sensación de un pueblo vivo, culminación esperanzadora y cierre para «El primer grito».
- Prioridad de mezcla: diálogo de Juan, preguntas del Oráculo y narración de ElevenLabs.
- Entregables necesarios: MP3 master con licencia clara + WAV de mezcla para ajuste si disponible + confirmación del contenido de voz/SFX ya incluidos en vídeos + puntos de loop para adaptarse a recorrido variable.
- No utilizar banda sonora comercial ni imitar pistas protegidas de películas; obra original con derecho de uso web.

## Plan de prueba de escucha
1. Pista sola y luego sobre bienvenida.
2. Comprobar cortes de vídeo 1→2 sin cortes musicales.
3. Portal→anuncio→vuelo→mapa; permanecer en el mapa 1–3 minutos sin acabar abruptamente música.
4. Descenso y preguntas: voces entendibles; bajar música de manera notable.
5. Acceso a capítulo 1: silencio de música de entrada y claridad de narración.
6. Toggle OFF silencia todas las capas con consistencia. Reingresar a ruta fuera del viaje no mantiene audio oculto.
7. Android / PC en modo normal y con volumen bajo; navegador que prohíba autoplay tiene control visible para iniciar si se desea.
8. Nada de 404, pistas fantasma, cargas repetidas, o reproducción simultánea en dos componentes.

## Decisión de implementación
**Arquitectura revisada; no activar todavía** porque no se ha seleccionado, generado ni entregado un master original, y no se ha validado la mezcla con las voces existentes. Siguiente paso: obtener un track master autorizado, decidir si la entrada comienza al pulsar «Comenzar la aventura», mezclar en preview, y escuchar el resultado antes de promoverlo. Ningún gasto ni publicación sin aprobación expresa.
