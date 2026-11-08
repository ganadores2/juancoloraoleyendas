# Libro I — El Gran Cambio: integración de los 33 capítulos MP3

## Estado confirmado

- Fuente literaria: PDF oficial «Juan Colorao Leyendas — Libro 1 — El Gran Cambio», edición para audiolibro multivoz (170 páginas, 33 capítulos).
- El Capítulo 1 «El Primer Grito» ya está publicado y probado en la beta, con pausa, reanudación y limpieza del marcador al terminar.
- El autor confirmó que tiene listos los MP3 de los otros 32 capítulos. Algunos están divididos en dos partes.
- **Pendiente:** recibir los MP3 y verificar nombres, tamaños, duración, y qué capítulos tienen dos partes. Ningún MP3 2–33 ha sido incorporado al repositorio o a la web.
- El sitio ahora incluye el índice oficial y señala «MP3 por incorporar» cuando falta el archivo en el servidor.

## Capítulo II recibido — 8 de noviembre de 2026

- **Archivo proporcionado por el autor en el chat:** `01_CAPÍTULO_2_EL_NOMBRE_QUE_QUEMA(2).mp3`.
- **Etiquetas internas:** título `CAPÍTULO 2: EL NOMBRE QUE QUEMA`, álbum `JUAN COLORAO · LEYENDAS`.
- **Validación técnica:** MP3 de 636.34 segundos (10:36), 44.1 kHz, mono, 192 kb/s, 15.326.684 bytes. Decodificación FFmpeg sin errores. Se detectó una pausa de 2.2 segundos al comienzo, no un defecto de integridad.
- **Huella SHA-256:** `a51fc1ffd5171e129b3a7345616335056239b797e3206102a51f963541c3321f`.
- **Nombre web planificado:** `public/assets/audio/libro-1/capitulo-02-el-nombre-que-quema.mp3`.
- **Pendiente de confirmar:** el sufijo `(2)` del archivo recibido no identifica necesariamente una parte 2. No afirmar todavía que el MP3 cubre la narración completa ni que coincida palabra por palabra con el SRT; contrastar inicio, desenlace y partes si existieran.
- **Estado de subida:** recibido y verificado en el entorno de conversación, **todavía no incorporado al repositorio**, ya que la conexión GitHub no admite tomar directamente el archivo binario local. Se preparó paquete de instalación local verificable para la rama beta, que requiere la acción del autor en su Windows; después conectar el manifiesto `ASSETS` y el catálogo `CHAPTERS` y comprobar su reproducción en Vercel Preview.
- **Control de calidad:** nunca enlazar un MP3 hasta que el archivo exista en la rama y el build lo verifique; no modificar producción para esta entrega.

## Organización de archivos y secuencia

Identificar siempre **número de capítulo** y, si corresponde, **número de parte**. Preferir nombres estables como:

```text
libro-1/capitulo-02-parte-01.mp3
libro-1/capitulo-03-parte-01.mp3
libro-1/capitulo-03-parte-02.mp3
```

Los ejemplos son convenciones, **no archivos que existan**. Mantener el orden original del libro. Registrar la cantidad real de partes antes de crear los enlaces.

## Reglas para implementar reproducción

1. Un capítulo dividido en varias partes debe reproducir **todas sus partes en orden** y permitir continuar al siguiente archivo.
2. Marcar un capítulo como completado **solo cuando termine la última parte**.
3. Reanudar la escucha desde el capítulo, parte y segundo guardados; una recarga no debe volver al inicio de la parte anterior.
4. Mantener un botón para volver a escuchar desde cero.
5. No activar reproducción de audio sin gesto voluntario del visitante en la primera parte.
6. No exponer rutas supuestas o archivos faltantes. Validar que todas las URLs respondan con audio reproducible antes de abrir un capítulo al público.
7. No alterar la bienvenida, los descensos, los oráculos ni el capítulo 1 ya verificados.

## Publicación de archivos grandes

El catálogo en GitHub contiene solo metadatos. Antes de subir cientos de megabytes de audio, seleccionar una solución de almacenamiento/entrega de medios adecuada y comprobar límites, costos de transferencia y compatibilidad con seek de HTML5 audio. Conservar copias maestras fuera de la web.
