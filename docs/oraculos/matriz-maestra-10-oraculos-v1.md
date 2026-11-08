# MATRIZ MAESTRA DE LOS DIEZ ORÁCULOS DE SAN YALLEGO

**Versión V1 — diseño editorial fechado 7 de noviembre de 2026.**

**ESTADO: PROPUESTA.** Se crea el diseño y la matriz de datos, **no** se desbloquean lugares, no se publican nuevos MP3, no se crea un Oráculo GPT operativo y no se modifica la bienvenida aprobada.

> **REGLA DE EXPERIENCIA:** El Oráculo orienta, sugiere una obra o un lugar y despierta nuevas preguntas. La revelación se descubre al escuchar, leer, observar y volver a explorar. El Oráculo nunca reemplaza la experiencia ni impone una sola interpretación.

## 1. Autoridad y trazabilidad

- **Canon de límites y naturaleza del mundo:** `BIBLIA_MAESTRA_UNIVERSO_JUAN_COLORAO_V3_0.pdf` (3 octubre 2026), particularmente oráculos N0–N5, personajes, glosario y filosofía del Corazón Oculto.
- **Orden real del mapa:** `lib/san-yallego/sites.ts` de la rama `feature/recorrido-cinematografico-10-sitios`. Sus IDs actuales se mantienen sin reinterpretarlos.
- **Capítulos y títulos:** `lib/san-yallego/chapters.ts`, Libro I, 33 capítulos.
- **Asociaciones argumentales:** lectura del manuscrito `EL_GRAN_CAMBIO_EDICION_LITERARIA_V1.md`, reconstruido desde SRT de ElevenLabs. Es texto editorial **provisional**, no transcripción perfeccionada y cotejada con todos los MP3.
- **Archivo intercambiable para una implementación futura:** `lib/san-yallego/oracle-matrix-v1.json`.

### Conflicto entre Biblia y mapa: pendiente de decisión

La sección de diez lugares de la Biblia V3.0 inicia en Ceiba, Río, Lago, Cueva/Puerta, Casa, Herrero, Sendero del XOLO, Iglesia, Plaza y Convergencia. El mapa de esta beta, por su parte, empieza en **Entrada**, **Casa de Juanito**, **Plaza**, **Iglesia**, **Herrero**, **Río**, **Bifurcación**, **Puerta del Inframundo**, **Lago** y **Ceiba**.

**NO se deben fusionar automáticamente Sendero del XOLO con Bifurcación ni convertir Convergencia en un lugar del mapa.** Esta matriz trabaja con los IDs reales ya desplegados, pero conserva en el registro la diferencia canónica.

## 2. Distribución completa de 33 capítulos

| Sitio y orden web | Capítulos recomendados (Libro I) | Dominio narrativo |
|---|---|---|
| 01 Entrada a San Yallego (`entrada`) | II, III, XVI | Identidad, nombres, preguntas |
| 02 Casa de Juanito Colorao (`casa-de-juanito`) | I, IV, V, XI | Infancia, familia y compañía |
| 03 Plaza y Jardines del Pueblo (`sitio-03`) | IX, XII, XIV, XV | Fiestas, infancia, memoria colectiva |
| 04 Iglesia del Pueblo (`sitio-04`) | X, XXIII, XXIV | Conciencia, fe, elección y responsabilidad |
| 05 La Casa del Herrero (`sitio-05`) | XIII, XVII, XXVIII | Transformación, oficio y memoria |
| 06 El Río de los Sueños (`sitio-06`) | VI, VII, VIII | Sueños, nombre y reflejo |
| 07 La Bifurcación y Salida del Pueblo (`sitio-07`) | XXV, XXVI, XXVII | Decidir, partir, regresar |
| 08 La Puerta hacia el Inframundo (`sitio-08`) | XVIII, XXX, XXXI | Umbral, límites y memoria |
| 09 El Lago Mítico del Tiempo (`sitio-09`) | XXIX, XXXII, XXXIII | Tiempo, memoria y orígenes |
| 10 El Árbol de la Ceiba (`sitio-10`) | XIX, XX, XXI, XXII | Raíces, memoria, cuidado |

**Validación:** diez sitios; 33 capítulos asignados exactamente una vez a un grupo de entrada; tres o cuatro capítulos por sitio. Esto es una **distribución editorial inicial**, no una afirmación sobre dónde sucede físicamente cada episodio ni una limitación a consultar los 33 capítulos desde el índice.

## 3. Diez fichas de comportamiento de los Oráculos

### Oráculo 01 — Entrada a San Yallego

- **ID web:** `entrada`. **Dominio propuesto:** Identidad, nombres, preguntas.
- **Personajes para indexar:** Juan, Pancho, Gabriel.
- **Capítulos para leer/escuchar (sugerencia temática):**
  - **II — «El Nombre Que Quema»**
  - **III — «La Cicatriz Que Canta»**
  - **XVI — «La Escuela De Los Cazadores De Nombres»**
- **Pregunta de ejemplo:** «¿Por qué un nombre importa?»
- **Respuesta modelo:** «Un nombre puede abrir preguntas. Comienza por el Capítulo II; lo demás te toca descubrir.»
- **Advertencia de continuidad:** temático.

### Oráculo 02 — Casa de Juanito Colorao

- **ID web:** `casa-de-juanito`. **Dominio propuesto:** Infancia, familia y compañía.
- **Personajes para indexar:** Juan, Dolores, Pancho, María, XOLO.
- **Capítulos para leer/escuchar (sugerencia temática):**
  - **I — «El Primer Grito»**
  - **IV — «El Reflejo Que Respira»**
  - **V — «Las Lágrimas Que Germinan»**
  - **XI — «La Elección Del Xolo»**
- **Pregunta de ejemplo:** «¿Cómo era Juan pequeño y por qué el XOLO lo acompaña?»
- **Respuesta modelo:** «La historia comienza aquí. Conoce al Juan que nace en el I y regresa al XI para mirar de otra forma a su compañero.»
- **Advertencia de continuidad:** Capítulo I asociado a Casa en la web.

### Oráculo 03 — Plaza y Jardines del Pueblo

- **ID web:** `sitio-03`. **Dominio propuesto:** Fiestas, infancia, memoria colectiva.
- **Personajes para indexar:** Juan, María, Gabriel, Lupita, Tomás.
- **Capítulos para leer/escuchar (sugerencia temática):**
  - **IX — «El Primer Colorao»**
  - **XII — «Los Espejos Niños»**
  - **XIV — «La Lección De Los Pequeños»**
  - **XV — «El Baile De Los Nombres Verdaderos»**
- **Pregunta de ejemplo:** «¿Qué saben los niños que los adultos ignoran?»
- **Respuesta modelo:** «Hay cosas que aprende todo un pueblo. Escucha la fiesta del IX y la lección del XIV.»
- **Advertencia de continuidad:** varios vínculos son temáticos.

### Oráculo 04 — Iglesia del Pueblo

- **ID web:** `sitio-04`. **Dominio propuesto:** Conciencia, fe, elección y responsabilidad.
- **Personajes para indexar:** Juan, María, Gabriel.
- **Capítulos para leer/escuchar (sugerencia temática):**
  - **X — «La Esencia Del Colorao»**
  - **XXIII — «El Don Del Colorao»**
  - **XXIV — «La Sombra Propia»**
- **Pregunta de ejemplo:** «¿Juan siempre hace lo correcto?»
- **Respuesta modelo:** «Nadie es un solo color. Escucha al Juan del XXIII y observa el costo de sus elecciones.»
- **Advertencia de continuidad:** simbólico: no afirmar escenas en la iglesia.

### Oráculo 05 — La Casa del Herrero

- **ID web:** `sitio-05`. **Dominio propuesto:** Transformación, oficio y memoria.
- **Personajes para indexar:** Juan, Gabriel, María.
- **Capítulos para leer/escuchar (sugerencia temática):**
  - **XIII — «El Maestro Desplateado»**
  - **XVII — «La Tinta De Las Memorias»**
  - **XXVIII — «El Tejido De Las Verdades»**
- **Pregunta de ejemplo:** «¿Qué puede transformar una herramienta?»
- **Respuesta modelo:** «La forja del XVII y el tejido del XXVIII hablan de transformar, aunque no ocurren en el mismo lugar.»
- **Advertencia de continuidad:** el XXVIII ocurre en Amatlán, no en la herrería.

### Oráculo 06 — El Río de los Sueños

- **ID web:** `sitio-06`. **Dominio propuesto:** Sueños, nombre y reflejo.
- **Personajes para indexar:** Juan, Dolores, María, Gabriel.
- **Capítulos para leer/escuchar (sugerencia temática):**
  - **VI — «Los Sueños Plateados»**
  - **VII — «El Nombre En Los Sueños»**
  - **VIII — «La Puerta Del Reflejo»**
- **Pregunta de ejemplo:** «¿El sueño recuerda o anuncia?»
- **Respuesta modelo:** «Un sueño puede ser memoria, posibilidad o símbolo. Prueba el VI sin confundir imagen y respuesta.»
- **Advertencia de continuidad:** temático: no afirmar cada escena en el río.

### Oráculo 07 — La Bifurcación y Salida del Pueblo

- **ID web:** `sitio-07`. **Dominio propuesto:** Decidir, partir, regresar.
- **Personajes para indexar:** Juan, María, Pancho, Lupita.
- **Capítulos para leer/escuchar (sugerencia temática):**
  - **XXV — «El Umbral De Los Dieciséis»**
  - **XXVI — «El Año Del Puente»**
  - **XXVII — «Los Caminos De Amatlán»**
- **Pregunta de ejemplo:** «¿Cómo es Juan a los dieciséis años?»
- **Respuesta modelo:** «El Capítulo XXV te permite conocerlo a esa edad. Puedes seguir el XXVI; el futuro de otros libros aún no está abierto.»
- **Advertencia de continuidad:** no equiparar Bifurcación con Sendero del XOLO.

### Oráculo 08 — La Puerta hacia el Inframundo

- **ID web:** `sitio-08`. **Dominio propuesto:** Umbral, límites y memoria.
- **Personajes para indexar:** Juan, María, Gabriel, XOLO.
- **Capítulos para leer/escuchar (sugerencia temática):**
  - **XVIII — «La Puerta Del Mictlán»**
  - **XXX — «Las Dos Mitades Del Cabello»**
  - **XXXI — «La Cueva De Los Suspiros Plateados»**
- **Pregunta de ejemplo:** «¿Qué existe detrás de la Puerta del Mictlán?»
- **Respuesta modelo:** «Ponerle nombre a un umbral no es comprenderlo. Busca el XVIII; el resto se revela al vivirlo.»
- **Advertencia de continuidad:** XVIII confirmado: Puerta del Mictlán; XXXI es otra cueva, no igualarlas.

### Oráculo 09 — El Lago Mítico del Tiempo

- **ID web:** `sitio-09`. **Dominio propuesto:** Tiempo, memoria y orígenes.
- **Personajes para indexar:** Juan, XOLO, María, Gabriel.
- **Capítulos para leer/escuchar (sugerencia temática):**
  - **XXIX — «La Búsqueda Del Primer Xolo»**
  - **XXXII — «La Flor De La Memoria»**
  - **XXXIII — «El Último Corrido Del Libro Primero»**
- **Pregunta de ejemplo:** «¿Cuál es el origen del primer XOLO?»
- **Respuesta modelo:** «El Capítulo XXIX comienza esa búsqueda. Ningún relato por sí solo entrega toda su naturaleza.»
- **Advertencia de continuidad:** relaciones simbólicas, no visitas físicas confirmadas.

### Oráculo 10 — El Árbol de la Ceiba

- **ID web:** `sitio-10`. **Dominio propuesto:** Raíces, memoria, cuidado.
- **Personajes para indexar:** Juan, María, Gabriel, Lupita.
- **Capítulos para leer/escuchar (sugerencia temática):**
  - **XIX — «La Sombra Y La Savia»**
  - **XX — «El Canto De Las Raíces»**
  - **XXI — «El Lamento Del Ahuehuete»**
  - **XXII — «El Concilio De Los Árboles»**
- **Pregunta de ejemplo:** «¿Qué recuerda un árbol?»
- **Respuesta modelo:** «Escucha la savia del XIX y después el canto del XX. Los demás árboles también tienen memoria.»
- **Advertencia de continuidad:** XXI alude a otro árbol; no unir geográficamente.

## 4. Contrato del Oráculo GPT profesional

| Nivel | Qué puede hacer | Qué no puede hacer |
|---|---|---|
| N0 · Público | Orientar y explicar conceptos del glosario público, recomendar capítulos visibles | Afirmar secretos o partes no publicadas |
| N1 · Llave | Responder con material permitido para la llave y recordar progreso mínimo | Tratar una llave como compra de secretos |
| N2 · Descubierto | Relacionar capítulos y lugares ya conocidos | Revelar escenas de capítulos no autorizados |
| N3 · Cruzado | Conectar varias pistas que el viajero haya encontrado | Inferir revelaciones del núcleo reservadas |
| N4 · Secreto | Desviar, insinuar o redirigir a una experiencia | Dar la solución directamente |
| N5 · Núcleo | Mantener silencio narrativo y orientar hacia el recorrido | Revelar datos de la Biblia privada |
| C100 · Convergencia | Proteger el misterio final y no inventar su contenido | Exponer información del capítulo 100 antes de su publicación |

**Un solo motor, diez personalidades.** La configuración mínima de cada consulta incluirá `oracle_id`, `site_id`, `chapter_context`, `discovery_state`, `access_scope`, `spoiler_tier`, `approved_quotes`, `chapter_links` y `public_glossary`. Evitar diez agentes descoordinados.

**Formato de respuesta recomendado:** (1) contestar brevemente lo que es público, (2) ofrecer una observación o pista sin revelar el núcleo, (3) invitar a un capítulo o experiencia concretos que **sí estén disponibles**. No responder mecánicamente a todo con «te toca descubrir»: la cortesía y la utilidad preceden al misterio.

**Control de acceso:** el avance local de lectura/escucha ayuda a continuar, pero **no autentica** el acceso a material reservado. La comprobación de acceso y el recorte de contexto deben ejecutarse en el servidor; el frontend nunca debe recibir fragmentos N4/N5/C100 sin permiso. El motor debe negar llamadas a rutas privadas aun si el visitante cambia el estado local.

**Confiabilidad editorial:** ninguna respuesta afirma que una escena ocurre en un sitio solo porque pertenezca a su lista de capítulos. La matriz distingue claramente asociación literal, simbólica y pendiente; los hechos se citan con capítulo y edición verificada.

## 5. Tres caminos temporales (Libro I → futura trilogía)

| Camino que ofrece el Oráculo | Estado del Libro I | Condición futura |
|---|---|---|
| **Seguir la secuencia** | Recomendar capítulo siguiente **solo cuando tenga texto o MP3 accesible** | Incorporar Libros II y III en orden de descubrimiento aprobado |
| **Regresar al origen** | Volver a escenas de nacimiento, infancia, nombres, Ceiba o personajes, verificando cronología | Crear rutas cruzadas cuando existan las fichas y escenas autorizadas |
| **Saltar al futuro** | Mostrar el concepto como posibilidad, **no un enlace a una página ausente** | Activar cuando Libro II/III y capítulo correspondiente estén publicados, indexados y permitidos |

Ejemplo documentado por el manuscrito de trabajo: «¿Quieres conocer a Juan a los dieciséis años?» → **Capítulo XXV, «El Umbral De Los Dieciséis»**. «¿Deseas investigar el origen del primer XOLO?» → **Capítulo XXIX, «La Búsqueda Del Primer XOLO»**. Estos enlaces todavía no deben ofrecer audio si el archivo sigue sin alojar.

## 6. Biblioteca de personajes: datos que conectarán con los Oráculos

Por cada personaje se propone una identidad estable (`character_id`) y fichas **por etapa temporal**: edad o rango verificado, capítulo de evidencia, lugar, aspecto, atuendo, personalidad, contradicciones, relaciones, voz maestra y permisos de spoiler.

**Siete vistas por personaje:** sirven de referencia angular para animación y avatares consistentes. **No equivalen a siete edades**. Cuando una etapa necesite nuevas imágenes, se creará un conjunto angular propio con aprobación visual del autor. Las imágenes de trabajo anteriores no convierten sus detalles en canon por sí solas.

Edades expresamente narradas en la edición SRT de trabajo: Juan al nacer (I), a los tres años (III), cinco (IV), siete (V), nueve (IX), catorce (XXIII), quince (XXIV) y dieciséis (XXV). Confirmar la cronología exacta con los MP3 antes de fijar fichas definitivas. Otras edades del futuro quedan sin inventar.

El archivo de personajes también debe conservar modismos y acentos de la voz, distinguiendo **pronunciación de ElevenLabs** de la ortografía definitiva del libro. Por ejemplo, «maíz» en literatura, pronunciación expresiva en sonido; «burrín»/«pelado» contextualizados, no convertidos en insultos automáticos.

## 7. Plan de implementación anterior al Oráculo GPT

1. **Aprobar la matriz:** conservar los IDs actuales y decidir la diferencia Sendero del XOLO / Bifurcación / Convergencia.
2. **Normalizar 33 capítulos:** texto desde SRT cotejado con MP3, audios alojados, sus partes ordenadas y accesos verificados (la beta solo tiene el capítulo I en línea). No recortar voces ni comentarios sin localizar tiempos exactos en cada grabación.
3. **Completar índice narrativo:** capítulo → personajes, edades, lugares donde realmente ocurre, símbolos, hechos públicos, pistas, acceso, tipo de relación y nivel de spoiler.
4. **Construir fichas de voces y evolución visual:** catálogo con referencias aprobadas, edades y siete vistas angulares por cada etapa que lo requiera.
5. **Montar servidor del Oráculo:** motor común, recuperación por permisos, citas a capítulos, filtros de secretos y pruebas contra filtración de N4/N5/C100 y manipulación de progreso.
6. **Probar únicamente Entrada y Casa primero**, sin modificar sus recorridos aprobados. Publicar cada nuevo Oráculo solo al tener aprobado su lugar, videos y contenidos.
7. **Lanzar web estable** antes de comprometer serie animada, tienda, YouTube y enlaces sociales definitivos; esos destinos se añaden con URLs verificadas.

## 8. Decisiones editoriales sin resolver

- La Biblia V3.0 tiene orden y selección de 10 dominios distinta del mapa implementado.
- Sendero del XOLO figura en V3.0; Bifurcación en web; no equipararlos.
- Convergencia V3.0 no se introduce como undécimo sitio sin decisión del autor.
- No dar por definitivo texto SRT sin cotejarlo con MP3.
- No dar por idéntica la Cueva de los Suspiros Plateados a la Puerta del Mictlán.

**Estado final de este documento:** arquitectura editorial y datos preparados. No es un despliegue de Oráculos, no concede llaves, no cambia los ocho sitios sellados y no crea contenidos de los Libros II o III.
