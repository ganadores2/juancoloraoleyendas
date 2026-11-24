# Libro I — Validación de inventario de audio (14 noviembre 2026)

**Alcance:** rama `preview/audiolibro-libro-1`, sin fusionar ni publicar a producción.

## Inventario cotejado en GitHub

- 33 capítulos representados por 36 archivos MP3 (capítulos 4, 29 y 32 en dos partes).
- Los 35 nombres literales del catálogo `lib/san-yallego/chapters.ts` corresponden a 35 archivos presentes; el capítulo 1 se referencia mediante `ASSETS.audio.libro1Capitulo1`.
- Tamaño agregado aproximado: 573 MiB. Esta revisión de rutas **no certifica** decodificación, ausencia de silencios, sincronización texto-audio ni reproducción final en Preview.
- La rama cinematográfica `feature/recorrido-cinematografico-10-sitios` solo contiene el MP3 del capítulo 1, aunque tiene la experiencia de navegación.
- **Pendiente antes de considerar consolidación:** decidir un ensamblaje seguro y validar rutas, audio por partes, compilación y experiencia móvil sin alterar sesiones de Guardián, Oráculos ni contenidos sellados.

## Prueba automatizada propuesta

```bash
node --test tests/book-one-audio-inventory.test.mjs
```

La prueba comprueba 33 entradas del catálogo, mapeos de 36 archivos, existencia física y tamaño mínimo; avisa si un MP3 falta, sobra, se repite o cambia de nombre.

**Esta propuesta no modifica el reproductor, no fusiona ramas, no publica MP3 adicionales y no cambia producción.** El paso posterior exige QA del autor, decisión explícita de publicación, y verificación de capacidad de distribución de medios (573 MiB).
