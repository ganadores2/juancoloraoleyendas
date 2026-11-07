# «El Gran Cambio» — primer bloque recibido (12 MP3)

**Fecha:** 7 de noviembre de 2026
**Origen:** archivos originales de ElevenLabs aportados por el autor en la conversación.
**Estado:** inventariados y analizados en el entorno de trabajo. **No están subidos al hosting del sitio**.
**Capítulos representados:** 1 al 11 (11 capítulos, 12 MP3 porque el capítulo 4 tiene 2 partes).
**Peso conjunto:** aprox. 188,4 MB. **Tiempo total:** aprox. 130,4 minutos.
**Formato común:** MP3, 44,1 kHz, mono, tasa aproximada de 193 kb/s.

| Capítulo | Parte | Archivo recibido | Duración aprox. | Tamaño |
|---|---|---|---:|---:|
| 1 | 1 | `00_CAPÍTULO_1_EL_PRIMER_GRITO(2).mp3` | 12:25 | 17,9 MB |
| 2 | 1 | `01_CAPÍTULO_2_EL_NOMBRE_QUE_QUEMA(1).mp3` | 10:36 | 15,3 MB |
| 3 | 1 | `02_CAPÍTULO_3_LA_CICATRIZ_QUE_CANTA.mp3` | 11:32 | 16,7 MB |
| 4 | 1 | `03_CAPÍTULO_4_EL_REFLEJO_QUE_RESPIRA_Part_1.mp3` | 19:07 | 27,6 MB |
| 4 | 2 | `04_CAPÍTULO_4_EL_REFLEJO_QUE_RESPIRA_Part_2.mp3` | 02:59 | 4,4 MB |
| 5 | 1 | `05_CAPÍTULO_5_LAS_LÁGRIMAS_QUE_GERMINAN.mp3` | 12:29 | 18,0 MB |
| 6 | 1 | `06_CAPÍTULO_6_LOS_SUEÑOS_PLATEADOS.mp3` | 09:56 | 14,3 MB |
| 7 | 1 | `07_CAPÍTULO_7_EL_NOMBRE_EN_LOS_SUEÑOS.mp3` | 09:16 | 13,4 MB |
| 8 | 1 | `08_CAPÍTULO_8_LA_PUERTA_DEL_REFLEJO.mp3` | 11:17 | 16,3 MB |
| 9 | 1 | `09_CAPÍTULO_9_EL_PRIMER_COLORAO.mp3` | 10:40 | 15,4 MB |
| 10 | 1 | `10_CAPÍTULO_10_LA_ESENCIA_DEL_COLORAO.mp3` | 12:59 | 18,7 MB |
| 11 | 1 | `11_CAPÍTULO_11_LA_ELECCIÓN_DEL_XOLO.mp3` | 07:08 | 10,3 MB |

## Control técnico preliminar

Todos los archivos se abrieron y se decodificaron para medir volumen mediante ffmpeg/ffprobe. Picos digitales aproximados entre −2,1 dBFS y −0,8 dBFS. Media global por archivo entre −25,3 dBFS y −23,5 dBFS. Esto **no** confirma que el volumen de cada personaje esté perfectamente equilibrado, ni sustituye una escucha editorial completa. No se aplicó normalización ni remasterización.

## Notas antes de publicar

1. **Capítulo 1:** conservar la versión que el autor remasterizó en Mixcraft y ya aprobó en el sitio; el archivo adjunto es una copia adicional y no debe reemplazar automáticamente la versión en producción.
2. **Capítulo 4:** conservar el orden Parte 1 → Parte 2 y marcar el capítulo como completo solo al terminar la Parte 2. Se ha preparado código de reproducción multipartes, pero se debe probar en navegador cuando estén alojados ambos MP3.
3. **Capítulo 11 — cotejo editorial pendiente:** la narración adjunta comienza con «La primavera encontró a San Yallego distinto» y el título se oye como «La elección del cholo», mientras el PDF oficial («El Gran Cambio», capítulo 11, página impresa 42) comienza con «Durante días el XOLO parecía distraído» y titula «La Elección Del Xolo». Podría ser una revisión literaria distinta o una pronunciación de la voz. **No declararlo coincidente con el PDF** hasta que el autor confirme qué versión es definitiva.
4. **Hosting:** estos 12 MP3 (188 MB en total) todavía no están en almacenamiento web. El índice debe seguir señalando «MP3 por incorporar» hasta que existan URLs reales y comprobadas. El navegador de GitHub tiene un límite práctico de 25 MB por archivo; una parte del capítulo 4 supera ese umbral. Usar almacenamiento de medios apropiado en lugar de confiar en arrastrar estos archivos al editor web de GitHub.
5. Verificar continuidad de empalme entre las dos partes del capítulo 4 y comprobar que el resto de los capítulos sigue el manuscrito que el autor decida declarar oficial.

### Correspondencia con el código

- Índice oficial: `/libro/1`
- Datos de capítulos: `lib/san-yallego/chapters.ts`
- Reproductor: `components/san-yallego/capitulo/audio-player.tsx`
- Navegación de capítulos: `components/san-yallego/capitulo/chapter-screen.tsx`

No se han alterado los MP3 originales ni la bienvenida cinematográfica.
