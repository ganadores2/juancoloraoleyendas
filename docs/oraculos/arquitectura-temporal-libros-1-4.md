# ARQUITECTURA TEMPORAL DE LOS 10 ORÁCULOS — LIBROS I, II, III Y IV

**Decisión editorial aprobada por el autor el 7 de noviembre de 2026.**

> Los diez oráculos son puntos de encuentro entre los capítulos de las cuatro etapas del universo. Desde cualquier capítulo disponible, el Viajero podrá seguir la secuencia, regresar a un origen o descubrir un momento posterior de un personaje. La experiencia literaria y el misterio tienen prioridad sobre la explicación directa del oráculo.

## 1. Qué se ha aprobado

- La **Matriz Maestra V1** conserva la asignación inicial aprobada: **33 capítulos del Libro I en diez grupos de 3 o 4**. No se modifica su orden ni su vínculo principal con cada sitio.
- Los **mismos diez oráculos** admitirán capítulos relacionados de los **Libros II, III y IV**, en un catálogo de audio y lectura extensible. No hace falta crear un oráculo nuevo por libro.
- El viajero puede elegir un camino temporal: **seguir la secuencia**, **regresar al origen** o **brincar al futuro**, siempre que el material exista, haya sido verificado, esté publicado y su acceso esté autorizado.
- Las recomendaciones temporales **pueden cruzar oráculos**: un capítulo aparece en su sitio principal, pero otro oráculo puede ofrecerlo como eco o conexión, sin duplicarlo en la distribución principal.
- El **catálogo de personajes por edades** será una fuente de las conexiones. Cada etapa se vincula a un capítulo verificable; siete imágenes de distintos ángulos son vistas de referencia visual, **no** siete edades.
- Se preservan los secretos: N0 para respuestas públicas, N1–N3 según progreso autorizado, N4 para insinuación, N5 y C100 sin divulgación.

## 2. Archivos creados y autoridad

| Recurso | Uso |
|---|---|
| `lib/san-yallego/oracle-matrix-v1.json` | Distribución editorial aprobada del Libro I, 10 sitios y 33 capítulos; se conserva para estabilidad. |
| `lib/san-yallego/oracle-timeline-v2.json` | Capa temporal extensible: diez colecciones con grupos por libro, enlaces entre edades y episodios, sin rutas ni spoilers privados. |
| `lib/san-yallego/oracle-audio-catalog.ts` | Resolución en servidor de **audios realmente publicados** para cada oráculo y de **enlaces temporales**, filtrada por permisos. |
| `lib/san-yallego/chapters.ts` | Índice vigente del Libro I; **no alterado** por esta extensión. |
| `lib/san-yallego/universe.ts` | Cronología de 99 capítulos de la trilogía y Capítulo 100. **No modificado**; Libro IV necesita numeración y metadatos aprobados antes de integrarse al índice. |
| `docs/oraculos/matriz-maestra-10-oraculos-v1.md` | Reglas literarias, diez voces/dominios, preguntas y respuestas que invitan a experimentar. |

**La Biblia Maestra V3.0 conserva su autoridad narrativa.** Si un personaje, edad, símbolo, lugar o evento aún no está confirmado por la obra aprobada, la relación nueva queda pendiente, no se inventa.

## 3. Modelo conceptual por oráculo

Cada oráculo tiene cuatro compartimentos de audio, inicialmente:

| Libro | Estado inicial | Qué podrá asociarse |
|---|---|---|
| **I — El Gran Cambio** | **33 capítulos distribuidos y aprobados editorialmente**; solo el MP3 del I está enlazado actualmente en la web | Origen, infancia, primera evolución |
| **II** | Vacío, pendiente de capítulos editados y audio | Consecuencias y cambios posteriores; conexiones hacia Libro I |
| **III** | Vacío, pendiente de capítulos editados y audio | Convergencias progresivas y regreso a semillas narrativas |
| **IV / ciclo 101** | Vacío, cronología y numeración por fijar | Puente hacia el mundo contemporáneo; no comprometer números ni edades |

Los compartimentos II, III y IV **no tienen capítulos inventados**, y no limitan artificialmente a tres o cuatro el número de episodios disponibles cuando crezcan. La distribución inicial de tres o cuatro corresponde solo al Libro I aprobado.

Una recomendación se representa por **identidad compuesta `{book, chapter}`**, no solo por un número. Además se registra su relación editorial con el sitio: directa, temática o eco temporal. La aparición de un capítulo como sugerencia no demuestra que su escena sucediera físicamente en ese lugar.

## 4. Conexiones en el tiempo

```text
       PASADO / ORIGEN
   Libro I · Juan nace (I)
           ↑      ↓
  Regresar al   Brincar al
     origen       futuro
           ↑      ↓
       PRESENTE DEL VIAJERO
 Libro I · Juan a los 16 años (XXV)
           │
           ▼  (solo cuando se publique)
     LIBRO II → LIBRO III
           │
           ▼  (cronología por aprobar)
      LIBRO IV / CICLO 101
```

**Ejemplos iniciales, sin spoilers del núcleo:**

- Juan en el Capítulo XXV → **regresar al origen**: Capítulo I, nacimiento de Juan.
- Juan en el Capítulo I → **brincar al futuro del mismo Libro I**: Capítulo XXV, edad dieciséis (sin salto de audio hasta publicarse).
- XOLO en el Capítulo XI → **brincar al futuro**: Capítulo XXIX, «La Búsqueda Del Primer Xolo».
- La búsqueda del primer XOLO, XXIX → **regresar al origen**: Capítulo XI, «La Elección Del Xolo».
- La Puerta del Mictlán, XVIII → **regresar a un antecedente**: Capítulo XVII, «La Tinta De Las Memorias».

Estas conexiones son **rutas editoriales de descubrimiento**, no afirmaciones de que se revela el verdadero origen del XOLO ni de que una cueva sea idéntica a la Puerta del Mictlán. Cada vínculo habrá de confirmarse contra las grabaciones definitivas.

## 5. Reglas técnicas que impiden enlaces falsos

Una recomendación de audio SOLO se considera **escuchable** cuando se cumplen conjuntamente:

1. El libro y capítulo existen en el **catálogo publicado** y coinciden con una referencia propuesta.
2. Su estado de publicación es verdadero; no basta con estar nombrado en la matriz.
3. Las partes del MP3 realmente están disponibles, en secuencia verificada y con rutas correctas.
4. El enlace apunta a una página real `/libro/{book}/capitulo/{chapter}`, no a una ruta fabricada.
5. El servidor **autoriza expresamente** el acceso para este viajero.
6. Un enlace que regresa al origen o salta al futuro pasa por los **mismos controles** que el audio principal.

El módulo `oracle-audio-catalog.ts` tiene `import 'server-only'` para impedir su importación desde componentes cliente; exige una función de autorización en todas las consultas. Las credenciales, el canon reservado y las respuestas N4/N5/C100 no van al frontend.

**Estado actual:** el motor de Oráculo-GPT aún **no está conectado** a estas estructuras; esto solo prepara las referencias y los filtros del catálogo. La existencia de la matriz NO habilita sitios sellados.

### 5.1. Camino del Guerrero y escuelas míticas (Libro II)

**Nueva decisión del autor:** Juan, tras partir de San Yallego en el final del Capítulo XXXIII acompañado de Gabriel y XOLO, **visitará escuelas míticas de otros pueblos por invitación** en el Libro II, y encontrará allí nuevos personajes. María tomó un camino independiente hacia Tzinzunzan al cerrar el Libro I. Los demás habitantes de San Yallego pueden tener **cameos episódicos**, sin que todos deban salir del pueblo. **La lista de escuelas, nuevos personajes y su reparto por capítulos aún no se ha definido.**

**El Camino del Guerrero se desarrollará gradualmente**: I prepara, II amplía/aprende, III exige aplicar y reparar, 100 converge y el ciclo 101+ permite ver la herencia de valores en El Bélico sin reescribir la biografía de Juan. La distribución editorial propuesta se guarda en `docs/saga/camino-del-guerrero-y-escuelas-miticas-libros-1-4-v1.md` y `lib/san-yallego/camino-del-guerrero-roadmap-v1.json`.

**No añadir un onceavo Oráculo por las escuelas exteriores:** un futuro capítulo del Libro II sobre una escuela podrá tener afinidad con uno de los diez Oráculos de San Yallego, pero **su escenario físico estará fuera del mapa principal**, y la relación no estará disponible hasta que exista capítulo/audio publicado y autorizado. Los nombres de escuelas, maestros y sus niveles de revelación no se pueden inferir a partir de los nombres de pueblos ya mencionados en el Libro I.

## 6. Cómo incorporar cada libro cuando el autor lo termine

1. Registrar el capítulo completo con su número aprobado y título final, sin asumir que Libro IV empieza en un número específico.
2. Confirmar narración, corrección del SRT, partes MP3, derecho de publicación y URL definitiva.
3. Indexar personajes, edades precisas con evidencia, símbolos, sitios literales y relaciones temáticas.
4. Distribuir ese capítulo en el oráculo cuya función le corresponda, y crear enlaces temporales aprobados a orígenes/futuros ya verificados.
5. Etiquetar nivel de revelación y permisos. **Las futuras escenas secretas se quedan en almacenamiento protegido, jamás en el manifiesto público.**
6. Probar que el oráculo propone el capítulo cuando se puede escuchar; si no, ofrece una pista verbal sin fingir que el enlace funciona.
7. Registrar aprobación del autor antes de activar nuevas sugerencias y comprobar el flujo en teléfono y escritorio.

## 7. Continuidad de apariencia entre libros y medios (decisión del autor)

**Todas las láminas ya creadas se conservarán**. La aprobación de este principio de continuidad **no** convierte ninguna imagen en canon visual definitivo.

La ficha central de Juan —`docs/personajes/juan-colorao-ficha-visual-maestra-v1.md` y `lib/san-yallego/juan-visual-master-v1.json`— mantiene tres grados de precisión:

- **Lectura:** al pasar de un libro a otro, incluir únicamente las descripciones necesarias de evolución física y manifestaciones COLORAO, siempre motivadas por la narración; evitar repetir fichas físicas.
- **Audio:** narración coherente con esas descripciones, voz e interpretación acordes a la edad y al momento narrativo; instrucciones fonéticas del estudio son independientes del texto final.
- **Serie animada:** continuidad estricta y auditable de cada modelo por edad, con referencias de todos los ángulos, marcas/coloración en el mismo lado y un evento documentado de primera aparición. La serie requiere más precisión que el libro y su audiolibro.

**En Libros II–IV**, cada nueva etapa de Juan se incorpora solo cuando existe evidencia del texto/audio aprobado; la estructura temporal de los diez Oráculos podrá orientarla sin revelar el secreto físico o simbólico antes de que aparezca en la historia. El registro de la edad del personaje no debe tratar un sueño o recuerdo como su edad presente.

## 7. Compatibilidad con el lanzamiento

**Se mantiene:** bienvenida cinematográfica aprobada, mapa, los diez identificadores de sitios, ocho sellos, llave, oráculos existentes, lector inmersivo, glosario y reproductor del primer capítulo.

**No se hace todavía:** publicación de los Libros II–IV, generación de sus avatares, conexiones ficticias, exposición de spoilers ni activación del oráculo inteligente.

**Siguiente entregable verificable:** catálogo de personajes por edades y un índice de evidencia capítulo–personaje–momento temporal; luego integración de audios alojados y una primera experiencia piloto de Oráculo inteligente cuando los controles de acceso estén implementados.
