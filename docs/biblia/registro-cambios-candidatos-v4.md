# BIBLIA MAESTRA DEL UNIVERSO — REGISTRO DE CAMBIOS CANDIDATOS PARA V4

**Fecha inicial del registro:** 7 de noviembre de 2026.  
**Estado:** PREPARACIÓN EDITORIAL. **NO es la Biblia Maestra V4, no sustituye la V3 y no tiene autoridad superior.**

> La Biblia Maestra V3.0 es una fuente valiosa porque impide que se pierda el canon de San Yallego. Al reunir todas las nuevas decisiones en un registro de cambios, la futura V4 podrá incorporar las ampliaciones sin borrar la V3 ni añadir hechos no aprobados.

## 1. Regla de control de versiones

- **Fuente base:** `BIBLIA_MAESTRA_UNIVERSO_JUAN_COLORAO_V3_0.pdf` (3 de octubre de 2026). La V3 declara que prevalece sobre V1 y V2 mientras esté vigente.
- **Propuesta V4:** consolidar contenido íntegro, incorporar **solo decisiones editoriales confirmadas** con sus fuentes y separar los diseños conceptuales.
- **Ningún documento preliminar se promoverá a Canon Rojo automáticamente.** Mantener Canon Rojo (hechos de la saga), Canon Dorado (expansiones compatibles), Canon de Proyecto (experiencia digital) y categorías reservadas.
- **No borrar ni sobrescribir V3.** Conservarla como versión histórica y referencia comparativa al publicar la V4.
- La revisión final debe comprobar que no se exponen secretos N4/N5/C100 a la interfaz, los oráculos públicos o la documentación promocional.

## 2. Nuevas decisiones confirmadas que deben entrar a V4

| ID | Materia | Decisión / mejora que debe integrarse | Evidencia guardada | Estado |
|---|---|---|---|---|
| V4-001 | **El Ojón** | Nuevo personaje del universo extendido, secundario ocasional, con **SCH = SUPER CHISMOSO**; conservar tres imágenes; crecimiento reservado a series XOLO y Don Chema | `docs/personajes/el-ojon-ficha-maestra-oficial-v1.md`, `lib/san-yallego/el-ojon-character-v1.json`, imágenes de Biblioteca | **Confirmado por el autor; Canon Dorado de reserva** |
| V4-002 | María de los Ángeles | Mayor que Juan **deliberadamente**; conocimiento de plantas, sanación e intuición extraordinaria; compañera y mentora temporal durante su formación | `docs/personajes/maria-de-los-angeles-ficha-visual-maestra-v1.md` | **Canon confirmado; edades posteriores por verificar** |
| V4-003 | Juan Colorao | Su Camino del Guerrero **comienza después de la preparación del Libro I**; termina el Libro I con 17 años, no como guerrero de camino completado | `docs/personajes/juan-colorao-ficha-visual-maestra-v1.md` | **Canon confirmado** |
| V4-004 | Diez Oráculos | Distribución inicial aprobada: 33 capítulos del Libro I en grupos de 3 o 4; no equivale a abrir sitios sellados | `docs/oraculos/matriz-maestra-10-oraculos-v1.md` | **Distribución editorial aprobada** |
| V4-005 | Libros II–IV y Oráculos | Estructura para recomendar escucha presente, regresar a orígenes o brincar al futuro **solo cuando haya publicación y permisos** | `docs/oraculos/arquitectura-temporal-libros-1-4.md` | **Arquitectura aprobada; contenido futuro no indexado** |
| V4-006 | Cronología | Separar cronología real de cronología de descubrimiento; recuerdos y sueños no alteran edades actuales | `docs/oraculos/biblioteca-cronologica-personajes-v1.md` | **Norma editorial de continuidad** |
| V4-007 | Identidad visual | Conservar todas las láminas; para lectura/audio bastan referencias significativas de apariencia; para animación exigir modelos aprobados por edad y siete vistas | Fichas visuales de Juan, María y Gabriel | **Norma aprobada, avatares aún precanónicos** |
| V4-008 | Universo transmedia | Futuras series de Don Chema, XOLO y María, compatibles con la trama y sin inventar episodios | `docs/personajes/biblia-continuidad-transmedia-v1.md` | **Proyectos futuros conceptuales del autor** |
| V4-009 | Lengua y doblaje | Conservar significado contextual de «pelado», «pelao», «burrín» y «hijas del maíz»; pronunciación de ElevenLabs en archivo de voz, ortografía en el libro | `lib/san-yallego/glossary.ts` y diccionario PLS previo | **Criterio lingüístico editorial** |
| V4-010 | Puerta del Mictlán | Puerta del Mictlán equivale a puerta de entrada al Inframundo en el mapa; no equiparar sin prueba a cualquier otra cueva | `docs/oraculos/matriz-maestra-10-oraculos-v1.md` | **Correspondencia confirmada** |
| V4-011 | Protección del misterio | El Oráculo no revela el secreto; invita a escuchar, leer y descubrir la experiencia, aplicando políticas por nivel y permisos de servidor | `docs/oraculos/matriz-maestra-10-oraculos-v1.md` | **Política editorial y de seguridad** |

## 2.1. Nuevas fichas de continuidad añadidas al inventario V4

| ID | Personaje | Hechos establecidos que se protegen | Referencias nuevas | Estado |
|---|---|---|---|---|
| V4-012 | **Abuelo Pancho** | Tradición, prudencia, memoria y humor; presente en nacimiento de Juan y escena del XOLO con la mariposa. No fijar edades numéricas por láminas. | `docs/personajes/abuelo-pancho-ficha-visual-maestra-v1.md`; `lib/san-yallego/pancho-visual-master-v1.json` | Precanon visual, relación narrativa documentada |
| V4-013 | **Dolores Colorao** | **Madre de Juan**, fortaleza familiar, memoria y protección. La etiqueta de «amiga de Juanito» en la lámina de su infancia es **incompatible con la maternidad** y NO debe convertirse en canon. | `docs/personajes/dolores-ficha-visual-maestra-v1.md`; `lib/san-yallego/dolores-visual-master-v1.json` | Corrección de interpretación visual; no reescribir el manuscrito |
| V4-014 | **XOLO** | Guardia, guía y vínculo con Juan; escenas de Libro I y preguntas abiertas sobre el primer XOLO. No inferir edades biológicas ni poderes de ojos luminosos en concept art. | `docs/personajes/xolo-ficha-visual-maestra-v1.md`; `lib/san-yallego/xolo-visual-master-v1.json` | Precanon visual; secretos protegidos |
| V4-015 | **Don Chema** | Humor sarcástico, «¡NO SÉ!» y diálogo con Juan y María en la cantina **El Desengaño**; futura serie de humor. No mezclarlo con Pancho ni asignarle un rostro imaginado. | `docs/personajes/don-chema-ficha-visual-maestra-v1.md`; `lib/san-yallego/don-chema-visual-master-v1.json` | Ficha narrativa registrada; sin rostro maestro ni edad aprobados |

**Principio común:** estos personajes ya están incluidos en el catálogo de 17 habitantes/personajes; las nuevas fichas **no crean otros cuatro personajes duplicados**. Cualquier episodio futuro de serie, relación, edad o avatar requiere fuente y aprobación independiente.

**Índice de implementación visual:** `lib/san-yallego/character-visual-index-v1.json` conecta estas cuatro fichas por ID sin modificar el catálogo cronológico estable que utiliza la aplicación.

## 2.2. Nuevas fichas: partera, amistades y memoria Plateada

| ID | Personaje | Regla aprobada o hecho documentado | Referencia | Estado |
|---|---|---|---|---|
| **V4-016** | **Doña Chavela / Chabela** | El Capítulo I dice que había visto pasar **seis generaciones… tal vez cinco, tal vez siete**, y nunca aclaraba esas cosas. **Ambigüedad intencional confirmada por el autor**, no edad factual, contradicción a arreglar ni inmortalidad canónica. «Chavela» es la forma usada por el autor; «Chabela» la grafía del SRT consultado. | `docs/personajes/dona-chavela-ficha-visual-maestra-v1.md`; `lib/san-yallego/dona-chavela-visual-master-v1.json` | Narrativa y humor confirmados; nombre editorial y avatar pendientes |
| **V4-017** | **Tomás** | Amistad y lealtad. Conservar lámina «Amigo Eterno»; no fusionar al amigo de Juan con **Tomás Villaseñor** de un listado ni con otro Tomás que participa en debate de carretera sin verificar identidad. | `docs/personajes/tomas-ficha-visual-maestra-v1.md`; `lib/san-yallego/tomas-visual-master-v1.json` | Precanon visual; homónimos por auditar |
| **V4-018** | **Lupita** | Inteligencia y agencia propias; aparece en el **Capítulo XII, Los Espejos Niños**. Las escenas de pareja, familia o liderato insinuadas en la lámina no establecen hechos futuros. | `docs/personajes/lupita-ficha-visual-maestra-v1.md`; `lib/san-yallego/lupita-visual-master-v1.json` | Escena literaria documentada; edades y futuros pendientes |
| **V4-019** | **Geraldo** | Asociado a memorias de Gabriel. En el **Capítulo XXXI** Gabriel recuerda que **él mismo tenía nueve años** cuando Geraldo lo llevó a un lugar. No convertir ese dato en edad de Geraldo ni adelantar secretos. | `docs/personajes/geraldo-ficha-visual-maestra-v1.md`; `lib/san-yallego/geraldo-visual-master-v1.json` | Referencia del pasado; misterio y apariencia protegidos |

**Arquitectura de continuidad:** las ocho fichas visuales actualmente elaboradas desde Pancho hasta Geraldo se vinculan mediante `lib/san-yallego/character-visual-index-v1.json`. Se conserva el esquema del catálogo cronológico original que usa la web y los oráculos, sin duplicar habitantes ni calcular edades a partir de dibujos.

## 2.3. Nuevo eje de planificación: el Camino del Guerrero no termina en un solo libro

| ID | Nueva decisión | Hechos confirmados | Distribución aún propuesta | Archivo |
|---|---|---|---|---|
| **V4-020** | **Libro II: escuelas míticas y formación prolongada del COLORAO** | El autor confirma que **Juan visitará, por invitación, escuelas míticas de otros pueblos** durante el Libro II; surgirán nuevos personajes de esos viajes. La formación del Camino del Guerrero no debe concentrarse en Libro I ni II. La partida con Gabriel y XOLO y el camino separado de María hacia Tzinzunzan ya aparecen en el Capítulo XXXIII. | Libro II: aprendizajes y primeras responsabilidades; Libro III: contradicción, reparación e integración; Capítulo 100: convergencia sin obligación de perfección; Libro IV / 101+: El Bélico examina el legado en su propio contexto. **La distribución por capítulos 34–99 es propuesta, NO trama final aprobada.** | `docs/saga/camino-del-guerrero-y-escuelas-miticas-libros-1-4-v1.md`; `lib/san-yallego/camino-del-guerrero-roadmap-v1.json` |

**Continuidad de reparto:** Gabriel y XOLO parten con Juan según el texto; María tiene su propia invitación y ruta. El resto del pueblo puede aparecer en cameos si corresponde, no se obliga a todos a viajar. **Las escuelas y nuevos personajes todavía no tienen nombres o historias asignados.** Los diez Oráculos mantendrán su configuración, relacionando futuros capítulos solo cuando se publiquen y autoricen.

## 3. Asuntos pendientes: no resolverlos por inferencia

- **Apellido de Gabriel:** Vallego / Yallego, pendiente de decisión del autor. Preservar ambas láminas.
- **XOLO:** edades, continuidad biológica, origen y revelaciones permanecen sujetos a canon y protección.
- **María:** se confirmó que es mayor que Juan; la diferencia **numérica exacta** y episodios posteriores requieren cotejo.
- **El Ojón:** especie ficcional exacta, rol y primera aparición por capítulo, voz, edades y avatar maestro sin definir; no inventar.
- **Sendero del XOLO / Bifurcación / Convergencia:** resolver diferencias entre la lista temática de V3 y el mapa publicado antes de afirmar que son el mismo lugar.
- **Primer COLORAO visible y marcas físicas de Juan:** localización, lateralidad, momento de aparición y significado pendientes de auditoría textual/visual.
- **MP3 2–33 y textos:** cotejo del manuscrito SRT con las narraciones definitivas y la edición final.
- **Libros II, III y IV:** no introducir escenas o capítulos no escritos, ni fijar numeración pública del IV.
- **Avatares:** nadie pasa de precanon a avatar maestro sin aprobación expresa del autor.

## 4. Criterios de cierre antes de publicar la Biblia V4

1. Comparar cada sección de V3 y conservar su contenido canónico o explicar expresamente la corrección acordada.
2. Incorporar todas las **altas nuevas** con fecha, fuente, clase de canon y estado (confirmado / conceptual / reservado).
3. Resolver o marcar como pendientes los conflictos de nomenclatura, fechas y relaciones.
4. Reconstruir un **índice de personajes** por ID, incluyendo `el-ojon`, `don-chema`, `dona-chavela`, `xolo` y los principales.
5. Verificar que los 10 Oráculos mantengan sus IDs, las 33 asignaciones de Libro I y las reglas de secretos.
6. Conservar archivo visual y bibliografía de cada personaje, sin obligar a convertir concept art en canon.
7. Revisar para no insertar spoilers protegidos en un documento que vaya a publicarse abiertamente.
8. Generar la **Biblia Maestra V4** como nueva versión (PDF/archivo editorial) **solo al cerrar este proceso**, con aprobación del autor; archivar la V3 **sin borrarla**.
9. Añadir pruebas de regresión para los cambios de mayor impacto: María mayor/mentora, El Ojón/SCH, Gabriel pendiente, canon visual y acceso a material futuro.

## 5. Después del lanzamiento: expansión controlada de San Yallego (V4-021)

**Decisión nueva confirmada por el autor (7 de noviembre de 2026):** una vez terminados QA, seguridad y publicación beta de `juancoloraoleyendas.com`, incorporar a la futura Biblia Maestra V4.0 un apartado **posterior al lanzamiento** con tres líneas de proyecto: **motor de diez Oráculos GPT**, **edición multilingüe** de la obra y **TECH-OZ**, una operación de agentes IA coordinada por un Jefe de Personal bajo mando humano.

**Ejecución en fases aprobada en orientación (NO implementada):** arranque con métricas y agentes internos supervisados; pilotos del Oráculo de Entrada/Casa de Juanito y Capítulo I en ES/EN; ampliación gradual solo tras pruebas; después distribución, comunidades y patrocinios controlados. La ambición de **1.000.000 de suscriptores auténticos en doce meses** es una meta aspiracional, no promesa ni cifra proyectada. Es necesario definir audiencia, presupuesto, consentimiento y criterios de avance.

**Régimen editorial y de seguridad:** este plan se clasifica como **Canon de Proyecto**, nunca como Canon Rojo de la historia. No autoriza publicar capítulos futuros, revelar secretos N4/N5/C100, liberar accesos mediante GPT, gastar presupuesto, firmar contratos ni generar seguidores artificiales. El nombre «TECH-OZ INC.» no implica que exista una sociedad jurídicamente constituida.

**Registro público resumido:** `docs/biblia/v4-apartado-despues-del-lanzamiento-resumen-publicable.md`.  
**Anexo editorial completo reservado al autor:** `BIBLIA_V4_0_Anexo_Despues_del_Lanzamiento.pdf`.  
**Reporte operativo completo reservado al autor:** `TECH_OZ_INC_Reporte_Postlanzamiento_2026.pdf`.

**Estado de incorporación:** referenciado y preservado para la compilación final de V4. La Biblia Maestra V3.0 sigue vigente y no se modifica. Los PDF completos no se publican en el repositorio abierto.

---

## 6. Archivo vivo / futuras altas

A medida que terminemos fichas de Pancho, Dolores, XOLO, Don Chema, Doña Chavela, y sus cruces con los Libros II–IV, registrar aquí nuevas decisiones aprobadas antes de incorporarlas a V4.

**Importante:** esta hoja es un **inventario de cambios pendientes de compilación**, no la Biblia V4 ni un reemplazo de V3. Los documentos de desarrollo no deben publicarse como revelaciones de tramas secretas.
