# Libro I — El Gran Cambio: integración de los 33 capítulos MP3

## Estado confirmado

- Fuente literaria: PDF oficial «Juan Colorao Leyendas — Libro 1 — El Gran Cambio», edición para audiolibro multivoz (170 páginas, 33 capítulos).
- El Capítulo 1 «El Primer Grito» ya está publicado y probado en la beta, con pausa, reanudación y limpieza del marcador al terminar.
- El autor confirmó que tiene listos los MP3 de los otros 32 capítulos. Algunos están divididos en dos partes.
- **Pendiente:** recibir los MP3 y verificar nombres, tamaños, duración, y qué capítulos tienen dos partes. Ningún MP3 2–33 ha sido incorporado al repositorio o a la web.
- El sitio ahora incluye el índice oficial y señala «MP3 por incorporar» cuando falta el archivo en el servidor.

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
