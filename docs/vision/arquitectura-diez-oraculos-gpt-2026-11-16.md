# Plan de arquitectura narrativa — Diez Oráculos-GPT de San Yallego
Fecha: 16 de noviembre de 2026
Estado: DISEÑO CONCEPTUAL — sin código ni servicios activados
Documento de referencia: docs/vision/familia-gptina-colora-2026-11-14.md

## Visión autoral que debe preservarse
Los diez Oráculos-GPT tendrán nombres secretos correspondientes a los diez personajes principales de los tres primeros libros, que el creador elegirá en una etapa posterior. Después del capítulo 100, los personajes tendrán continuidad narrativa mediante experiencias digitales y eventualmente encuentros transmedia, mientras las historias, canciones, conciertos y el pueblo de San Yallego siguen vivos. No confundir ese umbral con un cierre de la trilogía ni inventar identidades definitivas.

## Diferencia entre representación convincente y canon
La experiencia de entrevistas y debates con personajes históricos mediante IA es una referencia de formato, no una receta técnica verificada. Debemos separar: (a) evidencias de los libros, (b) recuerdos y puntos de vista de cada personaje, (c) interpretaciones plausibles de la IA señalizadas como dramatización, y (d) acontecimientos nuevos, que solo entrarán al canon con aprobación editorial del autor. Un debate coherente no implica conciencia artificial ni demuestra que la respuesta sea la única posible.

## Capas previstas
1. **Canon y bibliografía interna**: textos autorizados de Libros I–III, inventario de capítulos, cronología, lugares, secretos, dichos y relaciones. Cada pasaje con referencia a libro/capítulo y nivel de spoilers. No incluir manuscritos inéditos sin autorización.
2. **Biblia individual del personaje**: voz, tics lingüísticos, valores, deseos, temores, relaciones, evolución por libro, contradicciones y temas desconocidos; ejemplos aprobados de respuesta. No asignar nombres secretos aún.
3. **Motor conversacional**: búsqueda de pasajes relevantes antes de responder; identidad y restricciones por personaje; distinguir hechos del canon y nuevas hipótesis. Arquitectura compartida con diez perfiles, sin presuponer diez modelos entrenados de cero.
4. **Moderador / director de escena**: entrevista individual, diálogo entre dos personajes, mesa de hasta diez y participación del visitante. Turnos delimitados, control de duración, moderación y coherencia narrativa.
5. **Memoria de la experiencia**: sesiones efímeras por defecto; historial persistente solo con elección informada del visitante, opciones claras de eliminación y medidas de protección de datos.
6. **Voces y audiovisual (posterior)**: primero validar conversación escrita; luego voces permitidas y expresiones audiovisuales; generar videos a partir de diálogos revisados, no dar por hecho que son grabaciones reales.
7. **Seguridad y permisos**: los ocho sitios protegidos y el Guardián no se atraviesan por conversar con oráculos. Los agentes no conocen, revelan ni infieren llaves secretas; el acceso lo controla exclusivamente el servidor.
8. **Operación, costos y métricas**: probar en entorno aislado, sin gastos ni despliegue sin autorización; medir consistencia, latencia, calidad de diálogo, coste por sesión, abandono, retorno voluntario y satisfacción sin tratar la popularidad como única señal de calidad.

## Secuencia propuesta de ejecución (requiere aprobación para implementaciones)
**Fase 0 — Documentar (ahora):** guardar este plan y la visión. Mapear fuentes del canon sin alterar sus textos.
**Fase 1 — Matriz de diez personajes:** el autor selecciona sus identidades y nombres secretos, edad y tramo temporal, qué pueden revelar, información reservada y manera de expresarse. Conservar campos vacíos hasta que decida.
**Fase 2 — Un prototipo textual privado:** elegir un personaje piloto de común acuerdo y montar un diálogo controlado que cite internamente fuentes del canon. Verificar respuestas frente al manuscrito.
**Fase 3 — Mesa de diálogo:** simular entrevistas, contradicciones y debates supervisados. Prohibir que una improvisación se convierta automáticamente en canon.
**Fase 4 — Voz y presencia visual:** habilitar solo tras permisos, presupuesto, validaciones y pruebas.
**Fase 5 — Umbral narrativo posterior al capítulo 100:** definir evento de revelación y continuidad digital/física bajo la dirección del creador.

## Batería de pruebas para el futuro
- ¿La respuesta tiene respaldo en un pasaje o identifica la improvisación?
- ¿El personaje mantiene su habla y perspectiva sin repetirse mecánicamente?
- ¿Respeta la etapa cronológica y no revela libros futuros a visitantes nuevos?
- ¿Reconoce incertidumbre y jamás cambia silenciosamente un hecho canónico?
- ¿La discusión con otros personajes conserva identidades diferenciadas?
- ¿Se resisten intentos de pedir claves del Guardián o material restringido?
- ¿Los visitantes pueden controlar la retención y borrar su historia si se ofrece memoria?

## Límite operativo
Este plan no implementa agentes, no asigna nombres secretos, no modifica la web, no activa APIs, no expone fuentes privadas y no toca producción. Es un mapa de construcción para decidir etapas posteriores. Mantener el PR #19 en Draft y completar sus controles editoriales/audio antes de comprometer una nueva función pública.
