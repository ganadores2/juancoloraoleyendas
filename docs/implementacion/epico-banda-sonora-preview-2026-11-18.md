# ÉPICO — tema elegido para el recorrido (preparación en preview)
Fecha: 18 de noviembre de 2026
Estado: ELECCIÓN APROBADA POR EL AUTOR. Código de reproducción preparado pero **NO habilitado**. No publicado en producción.
Rama: preview/libro-1-audio-y-desbloqueo-integrado-20261114 · PR #19 Draft.

## Decisión creativa
El creador eligió explícitamente **«Épico»** (archivo aportado: `Epico.mp3`) entre cinco candidatos musicales. Épico se reserva para la aventura cinematográfica del visitante, desde «Comenzar la aventura» hasta la llegada al Libro I. El candidato «Aventura» se mantiene en reserva para posible tráiler promocional; esto no concede licencia para usarlo ni lo activa.

## Archivo de audio
- Original: `Epico.mp3`, duración medida por ffprobe: **146.472 s (2:26.47)**.
- Copia web de PRUEBA creada en el entorno de trabajo (no incorporada al repositorio): `san-yallego-epico-preview.mp3`, MP3 estéreo 44.1 kHz y 96 kb/s, duración **146.47 s**, peso aproximado 1.7 MB.
- Esta copia conserva **la composición completa**: no se reordena, remasteriza musicalmente ni acorta.
- Destino reservado en repositorio: `public/assets/audio/ambiente/san-yallego-epico-preview.mp3`. **Todavía no está cargado al repositorio**; el conector de edición empleado escribe texto y no ha transferido el archivo MP3.
- Confirmar en MusicGPT que el material generado permite uso comercial/web y distribución en nuestro sitio antes de publicarlo; preservar atribuciones/licencias que correspondan.

## Implementación preparada
- Nuevo `components/san-yallego/journey-score.tsx`, montado **una sola vez** en `app/layout.tsx` (persiste durante navegación cliente Next.js).
- Está deshabilitado salvo que exista `NEXT_PUBLIC_SAN_YALLEGO_EPICO=enabled`, variable que deberá activarse *solo en preview* una vez cargado el MP3 en ruta exacta y comprobado que responde HTTP 200. Sin flag, el componente devuelve `null`, no crea reproductor ni pide el MP3.
- Se inicia únicamente tras el gesto del visitante sobre «Comenzar la aventura» en portada (no se fuerza autoplay). Si un navegador bloquea reproducción, ofrece control manual si la función está habilitada.
- Música a volumen bajo durante la bienvenida; aún más bajo en pantallas de sitio/oráculo; desvanecer 1.8 s al salir del recorrido hacia Libro I. Mantener control global de silencio.
- En esta **primera versión** el MP3 conserva su duración de 2:26, por tanto su `loop` es del tema completo. Esta no es la versión final de loop ambiental por secciones; para pausas prolongadas conviene una edición con intro, sección realmente loopeable, y outro desacoplado.
- Esta implementación no procesa automáticamente señales de voz en cada clip; los valores de volumen son **estimaciones conservadoras**, no ducking inteligente. La mezcla aún exige prueba auditiva con el metraje real y cortes del Oráculo.

## Pasos para habilitar únicamente en preview
1. Subir la copia MP3 web al path exacto `public/assets/audio/ambiente/san-yallego-epico-preview.mp3` **en la rama preview** (no en main). Revisar SHA y tamaño del asset.
2. Verificar la URL HTTP del MP3 en el preview (200 y MIME audio/mpeg).
3. Tras revisar derechos de uso, configurar `NEXT_PUBLIC_SAN_YALLEGO_EPICO=enabled` en *Preview* del proyecto Vercel correspondiente, nunca en Production. El valor NEXT_PUBLIC se inyecta en compilación; requiere nuevo build.
4. Pasar QA: PC + Android; click Comenzar aventura; cambios entre bienvenida/portal/mapa/vuelos y oráculo sin reinicio; salida a capítulo sin música; ON/OFF; errores de archivo, ausencia de doble playback; probar legibilidad de diálogos.
5. Ajustar escenas/volumen por escucha en cada clip, insertar loop ambiental real si se decide y mantener control de visitante. Solo entonces considerar la función lista para revisión de promoción.

## Limitaciones conocidas antes de aprobar
- La activación requiere el archivo físico y la variable de entorno; ninguno está configurado.
- En navegación directa a /mapa o /bienvenida sin pasar por portada, esta preparación no arranca música automáticamente; se requiere una decisión UX para ofrecer inicio voluntario allí.
- El reproductor global de audio del capítulo puede iniciar en otras rutas; la música debe permanecer detenida cuando el visitante llega al libro. Antes de aprobar se deben escuchar y probar todas las transiciones y silenciar al entrar a la lectura.
- El loop del master completo puede resultar repetitivo si el visitante permanece más de 2:26 sin avanzar.
- Revisar comportamiento con sonido global apagado y al volver a activarlo.
- Ningún archivo de producción, Guardian, llaves, 8 sitios privados o permisos fue modificado.

## Decisión de seguridad
No instalar audio binario ficticio, no usar URL externa sin autorización, no habilitar variable ni desplegar producción. La rama preview prepara la estructura y espera carga del asset y QA.
