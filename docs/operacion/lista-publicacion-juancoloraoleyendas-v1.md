# JUAN COLORAO LEYENDAS — PREPARACIÓN PARA PUBLICACIÓN V1

**7 de noviembre de 2026 · Lista operativa del proyecto.**
**Este documento NO autoriza una promoción a producción.**
**Proyecto Vercel:** `juancoloraoleyendas-bsrp` · **GitHub:** `ganadores2/juancoloraoleyendas`.
**Rama trabajada:** `feature/recorrido-cinematografico-10-sitios`.

## 1. Diferencia de producción y versión probada

A fecha de la inspección, el dominio `juancoloraoleyendas.com` está **verificado** y en Vercel redirige mediante 308 a **`www.juancoloraoleyendas.com`**. La última producción listada procede de la rama `main`, commit `9e497419`, mientras que la rama cinematográfica contiene revisiones posteriores.

**No confundir READY con publicación:** los deployments READY de la rama `feature/...` son **previews**, no prueban que el código haya llegado a la web principal. Confirmar explícitamente commit, objetivo, rutas y permisos antes de plantear merge o promoción. Las previews protegidas por SSO no se pudieron verificar automáticamente por navegador en esta revisión; solicitar comprobación manual del propietario.

## 2. Puerta pública vs universo protegido

| Tipo | Rutas y controles | Política de lanzamiento |
|---|---|---|
| Portada | `/` | Indexable solo en producción. Entrada clara: «Comenzar la aventura». |
| Mapa principal | `/mapa` | Indexable en producción; no confundir mostrar mapa con desbloquear sitios sellados. |
| Libro I | `/libro/1` | Índice público; enlaces audio solo a capítulos realmente disponibles; señalar MP3 pendientes con precisión. |
| Archivo de Palabras | `/glosario` | Público; no revelar hechos reservados de los Libros II–IV. |
| Saludo y portal | `/bienvenida`, `/portal` | No indexable; su secuencia depende de que estén los MP4 completos. |
| Oráculos y capítulos inmersivos | `/sitio/...`, `/libro/1/capitulo/...` | No indexables para evitar el descubrimiento descontextualizado; esto NO es una barrera de acceso. |
| Creador | `/guardian/...` | No indexable y separado por controles reales de sesión/servidor. |
| Libros futuros y spoilers | Material de El Bélico, Capítulo 100, V4 reservada | NO publicar en repo público archivos reveladores o letras completas. Evitar textos promocionales que expliquen el misterio. |

## 3. Indexación técnica preparada en rama de prueba

- `app/robots.ts`: previews y no-producción con `Disallow: /`; producción permite rastreo general salvo rutas inmersivas/privadas.
- `app/sitemap.ts`: anuncia **solo** `/`, `/mapa`, `/libro/1` y `/glosario`, siempre con host `www`.
- `app/layout.tsx`: `metadataBase`, descripción social en español de México, nombre del proyecto y bandera de robots por ambiente.
- Páginas públicas: canonical propio. Capítulos, sitios, bienvenida y portal: `noindex`.
- El archivo `scripts/verify-foundations.mjs` comprueba las reglas anteriores; **robots.txt no protege información**: mantener todos los bloqueos de servidor que existían.

No se añade `lastModified: new Date()` inventado al sitemap. Cuando haya fechas reales de publicación, incorporarlas con evidencia.

## 4. QA previo al lanzamiento

**Experiencia de primera visita**
- [ ] Abrir dominio `www` en ventana privada desde móvil y escritorio, sin progreso almacenado.
- [ ] Pulsar «Comenzar la aventura», ver saludo 1 y 2 sin destellos ni salto de marco.
- [ ] Validar comportamiento si falta video: entrar al mapa sin pantalla rota.
- [ ] Llegar a la Entrada, responder al Oráculo, recibir la llave temporal, llegar a Casa de Juanito.
- [ ] Probar audio: iniciar, pausa, buscar y refrescar; conservar el segundo de reproducción donde corresponda.
- [ ] Completar Capítulo I, revisar interludios y los tres caminos sin reabrir sitios sellados.
- [ ] Confirmar en otro navegador que el avance y la sesión de creador no se heredan accidentalmente.

**Seguridad / permisos**
- [ ] `/guardian` exige autenticación y bloquea accesos directos a sus subrutas.
- [ ] Verificar límites de intentos, salida de sesión y cabeceras noindex/no-store privadas.
- [ ] Ningún contenido N4/N5/C100, llaves, secretos o letras del Álbum El Bélico aparece en JavaScript público, `robots.txt`, `sitemap.xml` o datos del cliente.
- [ ] Distinguir contenido editorial de libros futuros, respaldado pero sin exposición pública.

**SEO básico**
- [ ] En **producción**, revisar `/robots.txt` y `/sitemap.xml` en el navegador.
- [ ] Verificar que canonical apunte a `https://www.juancoloraoleyendas.com` y no a URL temporal de Vercel.
- [ ] Verificar `noindex` para sitios, capítulos y Sala del Creador.
- [ ] Confirmar que Google ve texto legible del home, el índice del Libro I y el Glosario.
- [ ] Elegir después una imagen social oficial sin spoilers y comprobar las tarjetas al compartir.

**Revisión comercial y accesibilidad**
- [ ] Lectura clara de botones de entrada y pistas para usuarios que no conocen la saga.
- [ ] Teclado, foco, contraste, tamaño móvil, audio silenciado y alternativa accesible.
- [ ] Confirmar destinos reales de YouTube, tienda y libros antes de insertar enlaces (no simular sitios publicados).
- [ ] Comprobar que todos los enlaces activos responden en producción.

## 5. Antes de mover main o producción

1. Confirmar que la rama de prueba supera `verify-foundations`, pruebas de oráculos, `tsc` y `next build` mediante Vercel READY.
2. Revisar diferencias entre `feature/recorrido-cinematografico-10-sitios` y `main` para evitar una fusión de documentos reservados en repo público.
3. Decidir con el autor la estrategia de despliegue y la versión exacta, no promover previews de forma automática.
4. Probar un despliegue de producción preparado, sus redirecciones, permisos y videos en dominio real.
5. Obtener aprobación expresa de publicación antes de asignar o sustituir dominios.
6. Mantener la Biblia V3 intacta; la V4 sigue en registro de cambios y El Bélico conserva sus secretos.

**Esta etapa ejecutó preparación de indexación y diagnóstico, no una liberación pública ni una revisión visual final en navegador.**
