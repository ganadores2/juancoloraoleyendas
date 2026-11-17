# Proyecto futuro: El Viajero Un Millón de San Yallego
Fecha: 17 de noviembre de 2026
Estado: PROPUESTA CREATIVA Y TÉCNICA; sin implementación ni aprobación de publicación.
Origen: deseo expresado por el creador: «quiero ir y ver cuando San Yallego tenga el visitante # 1 millón».
Rama de diseño: preview/libro-1-audio-y-desbloqueo-integrado-20261114 (PR #19 Draft).

## Idea principal
El objetivo no es un número decorativo sino celebrar que un millón de personas/viajeros reales han descubierto el universo de San Yallego. El primer visitante, el cien, el mil y el millón deben representar un crecimiento documentado, no una cifra simulada.

## Escena conceptual — La campana del millón
En la plaza, una campana anuncia un acontecimiento excepcional. Esperanza recibe al Viajero, el XOLO observa desde la entrada y cada habitante aporta un gesto acorde a su personalidad y a la época narrativa autorizada. Don Chema pregunta quién de los invitados piensa ayudar a reparar el techo; Doña Chavela lo llama desde la plaza. Los diálogos son **borrador humorístico**, no canon ni vídeo aprobado.

Propuesta de línea de Esperanza: «Has llegado a un pueblo que nació de una historia... y que ahora vive en la memoria de muchos viajeros».
La celebración puede estar disponible para la comunidad sin publicar el nombre, correo, foto o identidad del visitante que alcanzó la marca. Las revelaciones protegidas y los futuros diez Oráculos siguen regidos por permisos y progreso narrativo.

## Lo que NO debemos confundir
- **Vista de página:** una carga o visita a una URL; una persona puede generar muchas.
- **Sesión:** periodo de interacción; una persona puede crear muchas sesiones.
- **Visitante único estimado:** medida analítica que depende del método, consentimiento, dispositivo y ventanas de tiempo; NO certifica por sí sola el individuo un millón.
- **Viajero registrado y deduplicado:** identificador pseudónimo o cuenta, con reglas de deduplicación y políticas de privacidad; aun así no equivale necesariamente a una persona física única.
- **Lector activo / capítulo completado:** indicador narrativo diferente de llegada al sitio.

**Decisión pendiente del autor:** definir públicamente si la meta será «1 millón de visitas», «1 millón de visitantes únicos estimados» o «1 millón de Viajeros registrados». No etiquetar una estimación como persona exacta.

## Sistema de medición propuesto (no construido)
1. Establecer un contador base fiable y una fecha de inicio, documentando cobertura histórica y límites. No inventar un acumulado retroactivo a partir de datos ausentes.
2. Evaluar analítica respetuosa con privacidad y consentimiento según jurisdicción y configuración. Preferir agregados mínimos y evitar recolectar nombre, ubicación exacta, identidad o huellas digitales innecesarias.
3. Si la meta es «Viajero registrado #1,000,000», usar registro transaccional/contador atómico de identificadores admitidos, protección contra bots y cuentas duplicadas con criterios explícitos. Los registros anónimos y cuentas no garantizan unicidad humana.
4. Un endpoint de visualización **solo de lectura** puede mostrar un agregado verificado, actualizado en intervalos apropiados y sin revelar información personal. No exponer tablas internas, llaves ni respuestas de Guardian.
5. Separar el contador público global de `Progress.completedChapters`, marcadores de lectura o porcentaje de `ImmersiveReader`; estos son avances individuales y hoy se guardan principalmente de forma local.
6. Guardar un evento de hito verificable y revisable, con auditoría y detección de fraude, antes de desencadenar animaciones o anuncios.
7. Permitir revisar la cifra y la tasa de detección de bots, sin dramatizar una cifra provisional como certeza absoluta.

## Diseño de experiencia
- **Antes de la meta:** visualización optativa de avance global solo cuando la medición real sea comprobable. No añadir actualmente un contador ficticio ni métricas de ejemplo a producción.
- **Al alcanzar el hito:** modo celebración preparado y aprobado por el creador, con audiovisual accesible, carga optimizada, opción de omitir animación y respeto de preferencias de movimiento reducido.
- **Después:** archivo conmemorativo fechado de «El día del Millón», con cifra y método de medición explicados claramente.
- **Viaje al futuro del creador:** ilustración o simulación narrativa del día del millón, **claramente etiquetada como visión imaginada**, nunca como predicción, analítica real o fecha garantizada.
- **Personajes:** mantener el filtro temporal que aprobó el autor para Oráculos-GPT: no introducir conocimiento de capítulos futuros como si los personajes lo hubieran vivido. Un evento conmemorativo global no concede acceso al futuro de la historia.

## Hitos sugeridos
100 / 1,000 / 10,000 / 100,000 / 1,000,000 bajo una **misma definición consistente**; son metas propuestas, no cifras alcanzadas.

## Verificaciones necesarias antes de activar
- Contar dos vistas de una sesión como una sola según regla definida.
- Bots, solicitudes automáticas, caché, reconexiones y tráfico repetido no deben activar falsamente la meta.
- Reinicios y concurrencia no deben duplicar el evento del millón.
- Cumplimiento de privacidad; opción sin identificador personal; evitar almacenar IP completa por defecto.
- El modo celebración no salta capítulos, no abre las ocho ubicaciones selladas, no altera llaves ni obliga al visitante a registrarse.
- Cualquier gasto de analítica, servidores o vídeo requiere aprobación separada.

## Estado técnico auditado
`lib/san-yallego/progress.ts` modela progreso individual (sitios visitados, capítulos completados y respuestas de oráculos) mediante `createLocalStore`; no define en ese módulo una métrica global de visitantes únicos. Esta inspección **no prueba que ninguna analítica externa exista**: deberá auditarse la configuración de Vercel/analítica y sus fuentes antes de afirmar cifras. No tenemos actualmente un total verificado de visitantes únicos.

## Próximos entregables condicionados
1. Decisión editorial sobre unidad de medida y nombre público.
2. Inventario de analítica instalada, cobertura y consentimientos, sin activar servicios pagos.
3. Especificación de contador seguro y pruebas de concurrencia.
4. Guion literario para campana, Esperanza, XOLO y Don Chema; storyboard pendiente de aprobación.
5. Previsualización privada y autorización explícita para publicar.

**No tocar main/producción, Supabase, Guardian, accesos privados, APIs o presupuesto por esta propuesta.**
