# BIBLIOTECA CRONOLÓGICA DE PERSONAJES · SAN YALLEGO

**Versión 1 · 7 noviembre 2026 · Estado: ficha editorial preliminar / MP3 pendientes de cotejo.**

> **Principio rector:** el personaje tiene una sola vida coherente, pero el visitante puede conocerla en distintos órdenes. El Oráculo recomienda un capítulo, no inventa una edad ni revela la respuesta de un misterio.

## 1. Fuentes y autoridad

1. **Biblia Maestra V3.0**, sección 16, "Personajes, edades, voces e identidad visual": identidad, relaciones, responsabilidades y regla de consistencia. Su sección 4.1 distingue **cronología real** y **cronología de descubrimiento**.
2. **El Gran Cambio — Edición literaria V1**, reconstruida desde SRT de ElevenLabs: referencias explícitas de edades y capítulos. **NO** ha sido cotejada palabra por palabra con todos los MP3.
3. **Biblia visual de personajes / Evolución de personajes**: paneles de concepto que sirven como guía creativa. **NO** equivalen automáticamente a versiones visuales canónicas aprobadas.
4. **Matriz Maestra de los Diez Oráculos V1**, aprobada por el autor: asignaciones temáticas iniciales del Libro I. El Oráculo asociado a un capítulo no indica necesariamente el lugar físico donde ocurre su escena.

La información estructurada está en `lib/san-yallego/character-chronology-v1.json`; el módulo `lib/san-yallego/character-chronology.ts` realiza consultas **en servidor** y solo ofrece enlaces de audio cuando existen publicación y permiso verificados.

## 2. Las dos cronologías que nunca deben confundirse

| Cronología | Pregunta | Ejemplo | Regla |
|---|---|---|---|
| **Real** | ¿Cuándo sucedió dentro del mundo? | Juan de 3, 5, 7 o 16 años | Los recuerdos documentados pueden señalar momentos anteriores; los sueños simbólicos NO cambian hechos pasados. |
| **De descubrimiento** | ¿Cuándo lo conoce el viajero? | Escuchar a Juan de 16 y regresar al nacimiento; luego volver al capítulo actual | Los saltos son recomendaciones, no una alteración de la biografía. |

**Importante:** un personaje puede tener *edad actual del capítulo*, *edad recordada por otra voz* o *edad evocada en un sueño*. Son campos distintos.

## 3. Juan Colorao — primera cronología fundamentada (Libro I)

| Edad mencionada | Capítulo que lo fundamenta | Tipo de evidencia |
|---|---|---|
| Recién nacido | **I · El Primer Grito** | Escena del nacimiento. La narración empieza la noche del 8 de marzo de 1969 y pasa al amanecer; no concluir el día exacto solo por esa secuencia. |
| 3 años | **III · La Cicatriz Que Canta** | Comienza «A los tres años, Juan...». |
| 5 años | **IV · El Reflejo Que Respira** | El texto dice que conoció a María en persona cuando tenía cinco años. |
| 7 años | **V · Las Lágrimas Que Germinan** | Comienza «A los siete años, Juan...». |
| 9 años | **IX · El Primer Colorao** | El texto dice que cumplió nueve años. |
| 10 años | **XI · La Elección Del Xolo** | Se indica que tenía diez años. |
| 11 años | **XII · Los Espejos Niños** | Se indica que Juan tenía once años. |
| 14 años | **XXIII · El Don Del Colorao** | Comienza «A los catorce años, Juan...». |
| 15 años | **XXIV · La Sombra Propia** | Comienza «A los quince años, Juan...». |
| 16 años | **XXV · El Umbral De Los Dieciséis** | Se indica que cumplió dieciséis. |
| 17 años | **XXVI · El Año Del Puente** | Se menciona el inicio del último tramo de preparación. |
| 17 años | **XXVIII · El Tejido De Las Verdades** | Se habla expresamente del Juan de diecisiete años. |

**Los 17 años del XXVI y del XXVIII son dos referencias al mismo tramo vital, no dos edades diferentes.** No asignar de forma automática esa edad a cada capítulo hasta el XXXIII; tampoco dar por concluido su Camino del Guerrero al terminar el Libro I.

**Memorias oníricas:** en el **XXIX · La Búsqueda Del Primer Xolo** aparecen imágenes de Juan con **5, 7 y 15 años dentro de un sueño**. Se registran para el modo "cronología de descubrimiento", pero **nunca** como su edad real durante el capítulo XXIX.

**Edades 20+**: las láminas visuales ofrecen propuestas de juventud y adultez, pero el Libro I recuperado no demuestra por sí solo qué capítulo retrata a Juan a los 20, 30, 40 o 50 años. Esas etapas permanecen **pendientes** de evidencia en los próximos libros.

## 4. María, Gabriel y otros personajes con edades textuales verificables

| Personaje | Edad o dato | Fuente | Tratamiento |
|---|---|---|---|
| **María de los Ángeles** | **5 años** cuando Juan es todavía un bebé | Capítulo **II · El Nombre Que Quema**, pasaje «Durante aquellos mismos días...» | **La diferencia de edad es intencional y aprobada por el autor**: María es mayor que Juan. Las edades posteriores deben cotejarse; no asumir que son coetáneos. |
| **Gabriel Vallego/Yallego** | Recuerda que **Geraldo lo llevó con 9 años** | Capítulo **XXXI · La Cueva De Los Suspiros Plateados** | Es una **edad del pasado recordado**, NO la edad actual de Gabriel en el XXXI. La grafía del apellido sigue sin fijarse. |
| **Nahual** | **10 años** en el relato de Amatlán | Capítulo **XXVII · Los Caminos De Amatlán** | Puede incorporarse como ficha secundaria; su edad no implica la de Juan ni la de María. |

Para **Pancho, Dolores, Tomás, Lupita, XOLO, Doña Chavela/Chabela, Don Chema, Geraldo, Padre Esteban, Doña Rosa, el Alcalde y El Bélico** existen datos de personalidad, función o imágenes conceptuales, pero en esta primera pasada **no quedó fundamentada una edad numérica para el presente de sus escenas**. Mantener celdas vacías hasta contar con fuente narrativa, no usar estereotipos de ancianidad.

### Relación de María y Juan — criterio canónico aprobado

El autor confirma que **María es deliberadamente mayor que Juan**. La diferencia **no es obstáculo ni error de continuidad**: le da a María una ventaja de experiencia que Juan aprovecha durante su formación.

Su conocimiento especial de **plantas y sanación**, su sabiduría inusual y su intuición extraordinaria hacen de ella **compañera y mentora temporal** de Juan. Esa orientación le permite evitar muchas equivocaciones, pero no anula sus decisiones, sus errores, ni su propio Camino del Guerrero. María conserva una evolución independiente y la mentoría **no debe prolongarse automáticamente** a los Libros II–IV sin evidencia.

Esta aclaración confirma la **relación de edades**, no una resta de años exacta. El dato explícito sigue siendo María con 5 años en el Capítulo II; las edades de otras escenas se corroborarán con el texto y MP3 definitivos.

## 5. Biblioteca visual por etapa: siete vistas, no siete edades

**Regla:** el mismo personaje puede tener tantas **etapas de edad aprobadas** como la historia necesite. **Cada etapa** que se modele para animación podrá tener un conjunto de **siete imágenes angulares** de referencia. La Biblia visual ya producida contiene ejemplos de etapas y rostros, pero por sí misma **no es la aprobación final de un avatar o de cada uno de sus ángulos**.

La ficha futura de cada etapa tendrá:

- Identificador permanente `character_id` + `stage_id`, edad o intervalo confirmado y capítulos fuente.
- Apariencia consistente: rostro, proporciones, estatura relativa, cabello, color de ojos, marcas, cicatrices y atuendo **solo cuando el autor lo apruebe**.
- **Siete ranuras** de vistas para estabilidad durante animación: no se llenan con imágenes inventadas ni se fijan ángulos no aprobados.
- Voice ID o referencia maestra, timbre y pronunciación por etapa cuando la licencia y los archivos estén confirmados.
- Nivel de acceso y restricciones de spoiler. Los secretos del núcleo permanecen fuera del catálogo público y de cualquier componente cliente.
- Estado: *concepto → cotejado con el capítulo → aprobado visualmente → avatar maestro → integrado a serie animada*.

**En particular XOLO**: usar cachorro / joven / adulto solo como referencias conceptuales y **no atribuir cambios biológicos** o sucesiones de identidad sin autorización canónica. La Biblia exige justificar cualquier cambio físico por la historia.

## 6. Vínculo con los diez Oráculos de audio

Las edades se relacionan primero con el **capítulo que las documenta** y después con el sitio curatorial de la Matriz Maestra aprobada. Un mismo personaje puede aparecer en distintas etapas y oráculos sin duplicar ni cambiar la asignación primaria del capítulo.

Ejemplo en Libro I:

- **Juan, recién nacido, I** → Casa de Juanito (Oráculo II) → audio del Capítulo I si está publicado.
- **Juan, 16 años, XXV** → Bifurcación (Oráculo VII) → invitación a escuchar si existe audio y permiso.
- **Juan, 17 años, XXVIII** → Herrero (Oráculo V), **relación temática**: no afirmar que ocurre en la herrería.
- **María, cinco años, II** → Entrada (Oráculo I), asociación editorial, no ubicación literal.
- **Gabriel, recuerdo a los nueve, XXXI** → Puerta del Mictlán (Oráculo VIII), **solo eco temático**: no confundir la cueva del XXXI con la Puerta del XVIII.

Así un oráculo podrá decir: «¿Quieres conocer a Juan cuando tenía dieciséis años?» y, **cuando la fuente esté publicada**, ofrecer el capítulo XXV. Puede luego sugerir regresar al nacimiento del I, o ampliar a Libros II–IV cuando estén indexados y aprobados.

Los metadatos cronológicos por sí solos **no desbloquean los ocho sitios sellados**, no dan acceso al canon N4/N5/C100 y no agregan audios a la web.

## 7. Pendientes de aprobación editorial

1. **María:** verificar si sus cinco años en el capítulo II son intención literaria (ser mayor que Juan) o una discordancia con láminas visuales que deben corregirse.
2. **Juan:** cerrar la fecha de nacimiento con una formulación inequívoca si el autor desea un día exacto; evitar deducir el 8 de marzo del comienzo nocturno.
3. **Gabriel:** resolver apellido Vallego / Yallego y separar su infancia retrospectiva de su edad actual.
4. **Chavela:** fijar la grafía oficial Chabela / Chavela en texto; conservar el registro oral sin errores fonéticos de ElevenLabs.
5. **XOLO:** registrar envejecimiento, continuidad y apariencia únicamente si la saga lo establece.
6. **Edades ausentes:** leer con detalle las escenas de los 33 capítulos y validar toda edad nueva con el MP3, especialmente las etapas de María, familiares y personajes secundarios.
7. **Libros II, III y IV:** completar la biografía por etapas futuras al recibirse textos y audios, sin inventar episodios, fechas ni sucesos.
8. **Avatares:** auditar los siete ángulos existentes por personaje/etapa y marcar los que el autor quiera elevar a imagen maestra.

**Esta entrega es un índice editorial y soporte en servidor; no crea una nueva página pública ni altera el reproductor, oráculos, bienvenida o material protegido.**
