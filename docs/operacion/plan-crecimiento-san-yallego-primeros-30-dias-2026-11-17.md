# Plan de crecimiento medible — San Yallego, camino al millón
Fecha: 17 de noviembre de 2026
Estado: PLAN DE TRABAJO / NO LANZADO — rama preview, PR #19 Draft.
Objetivo: ayudar a más personas a descubrir la obra y conseguir retornos y lecturas reales sin sacrificar la experiencia narrativa ni privacidad.

## 1. Evidencia comprobada en el código (rama preview)
- `app/layout.tsx`: metadatos generales y Open Graph / Twitter; `@vercel/analytics` integrado mediante `<Analytics />` en entorno de build NODE_ENV=production. No implica que haya datos accesibles en el panel.
- `app/robots.ts`: preview desindexada cuando `VERCEL_ENV !== 'production'`; en producción permite el ámbito público y excluye Guardian, `/sitio/`, capítulos individuales, bienvenida y portal. *robots.txt no controla autorización*.
- `app/sitemap.ts`: cuatro rutas públicas estables: `/`, `/mapa`, `/libro/1`, `/glosario`.
- `app/page.tsx` y `components/san-yallego/home/home-screen.tsx`: entrada «BIENVENIDO A SAN YALLEGO» y CTA «Comenzar la aventura». Según `introReady`, dirige a `/bienvenida` o `/mapa`.
- `app/libro/1/page.tsx`: índice de los 33 capítulos, con invitación a comenzar por «El Primer Grito», enlaces a recorrido cinematográfico, glosario y mapa.
- `app/glosario/page.tsx`: título y descripción específica del Archivo de Palabras.
- `app/mapa/page.tsx`: canonical y título específico del mapa.
- `components/san-yallego/traveler-map-nav.tsx`: navegación contextual visible cuando el visitante está hidratado, dispone de llave temporal y no está en determinadas pantallas.
- `lib/san-yallego/progress.ts`: avance local de lectura y visitas; no existe en ese módulo un contador universal fiable de personas.
- **Comprobación técnica previa:** GitHub Actions #112 y Vercel en estado success para commit `cb0ed762`. Una nueva edición requiere verificaciones propias.

**Limitaciones:** esta es inspección de código, no prueba de SEO en Google, no analítica en vivo y no auditoría visual de todos los dispositivos. No se ha verificado el tráfico ni los embudos efectivos. El conector Vercel, bajo el scope de cuenta conocido, no pudo localizar proyectos; no atribuirle cero visitas ni concluir que el proyecto no existe.

## 2. Objetivo de crecimiento: audiencia > número decorativo
**Métrica norte candidata:** visitantes únicos estimados que llegan a una página pública y realizan una acción de interés dentro de un periodo, reportando por separado alcance y calidad. El número único exacto no puede certificarse con analítica agregada. No anunciar «visitante #1,000,000» individual si no existe registro secuencial validado.

**Indicadores a medir, si existe cobertura y permiso:**
1. Descubrimiento: clics desde búsquedas orgánicas, enlaces externos, redes y recomendaciones.
2. Entrada: vistas de página inicial, tasa de inicio de la aventura (acción voluntaria), carga y errores.
3. Exploración: llega al mapa, abre páginas públicas y usa el glosario.
4. Lectura: inicia capítulo 1 y termina capítulo 1 **según la señal que el sistema realmente registra**; no confundir scroll con comprensión.
5. Continuidad: abre capítulo 2 después de completar el primero; retorna en 7 y 30 días si puede medirse sin seguimiento invasivo.
6. Conversión voluntaria futura: opta por seguir el proyecto o compra/accede a producto cuando esos sistemas hayan sido aprobados. Actualmente no dar por existentes esas acciones.

Usar métricas con denominadores, ventana de tiempo y método explícito. Nunca mezclar páginas vistas, sesiones, personas estimadas, capítulos completados y registro de viajeros bajo una sola cifra.

## 3. Recorrido mínimo propuesto (sin cambiar interfaz ahora)
`Descubre enlace público → página inicial / mapa / libro / glosario → Comenzar aventura → mapa u orientación → capítulo 1 (lectura o escucha) → desbloqueo de capítulos 2–33 → retorno`.

La experiencia de bienvenida cinematográfica sigue siendo la obra principal. Las entradas por búsqueda a `/libro/1` y `/glosario` ya ofrecen caminos de acceso complementarios. No ocultar, saltar ni desbloquear el ritual narrativo sin decisión editorial. **Un CTA secundario opcional y no intrusivo** podría permitir a quienes lleguen directamente al catálogo comprender por dónde empezar. Auditar primero pantallas móviles, velocidad, accesibilidad y claridad, no modificar por intuición.

## 4. Cuatro pilares de contenido publicable (ideas, no publicaciones)
- **El mundo:** recorrido por San Yallego y los diez lugares en piezas breves; no mostrar zonas privadas que requieren llave autorizada.
- **La historia:** extractos cortos autorizados del Libro I, preguntas que inviten a leer/escuchar capítulo 1, sin spoilers de libros siguientes.
- **La gente del pueblo:** clips originales de Esperanza, Don Chema, Doña Chavela y XOLO, fundamentados en las biografías vivas. No presentar escenas inventadas como canon aprobado.
- **El lenguaje:** pequeñas piezas con «Archivo de Palabras» (Pelao, Burrín, Comelonchi), combinando significado, contexto y humor. Verificar derechos de imágenes, música, voces y edición.

Para cada pieza usar **un solo destino claro** entre `/`, `/mapa`, `/libro/1` y `/glosario`; diferenciar campañas con etiquetas UTM si se decide instrumentarlas, sin duplicar artificialmente métricas. No publicar automáticamente en redes ni usar canciones/capturas ajenas sin permisos.

## 5. Estrategia de prueba con audiencia pequeña antes de escalar
Iniciar con un grupo voluntario de diversas edades; el usuario ya recibió observación de que la experiencia del micrófono puede confundir a quien llega sin contexto. Registrar notas, no datos personales identificables innecesarios.
- ¿Entiende el visitante dónde empezar sin explicación externa?
- ¿Comprende el propósito del micrófono o de la invitación?
- ¿Encuentra el mapa y una manera de regresar?
- ¿Descubre que puede leer/escuchar el capítulo 1?
- ¿Sabe qué requiere llave y qué es público?
- ¿Regresaría o compartiría el sitio? ¿Por qué?

Formato de registro recomendado: fecha, dispositivo/categoría, ruta inicial, resultado de cada tarea, fricción observada, comentario voluntario, solución propuesta, estado verificado. **No guardar nombres ni identificadores de menores.** Mantener separado el comentario cualitativo de la analítica agregada.

## 6. Plan operativo de 30 días — sujeto a disponibilidad y aprobación

| Etapa | Trabajo propuesto | Criterio de salida |
| --- | --- | --- |
| Días 1–7 | Confirmar panel Analytics y métricas disponibles; verificar `sitemap.xml`, `robots.txt`, indexación real y enlaces canónicos con herramientas autorizadas; probar entrada móvil | Línea de base con fechas y limitaciones, no conjeturas |
| Días 8–14 | Probar 2–3 entradas públicas con lectores voluntarios de distintas edades; identificar fricción en micrófono, instrucciones y regreso al mapa | Evidencia de usabilidad y prioridades acordadas |
| Días 15–21 | Preparar 4–6 piezas promocionales originales para aprobación (uno por personaje/lugar/glosario), con destinos consistentes | Copys y assets aprobados, cero publicación no autorizada |
| Días 22–30 | Ensayo pequeño con canales propios autorizados; comparar fuentes de tráfico, entrada a capítulo 1 y retorno cuando las métricas existan | Informe de resultados reales y decisión de iteración |

Los días son una **secuencia de planificación**, no una promesa de trabajo autónomo diario ni de publicación en segundo plano.

## 7. Acciones técnicas posteriores, con autorización
1. Consultar Vercel Analytics en el proyecto y scope correctos; comprobar activación, definición y fecha de los datos.
2. Verificar Search Console o mecanismo equivalente, si está disponible y el dueño da acceso, para indexación/consultas reales.
3. Diseñar registro de eventos mínimos `adventure_started`, `map_viewed`, `chapter_1_started`, `chapter_1_completed` solo si existen medios adecuados y políticas de consentimiento; **no añadir scripts rastreadores ni identificadores por este plan**.
4. Probar rendimiento y accesibilidad en móvil, primera carga de vídeos y alternativas a efectos; no prometer resultados sin medición.
5. Priorizar cambios UX por evidencia y aplicarlos en rama preview con pruebas; cualquier publicación queda pendiente del creador.

## 8. Seguridad editorial y técnica
- PR #19 Draft y preview son laboratorios; `main` y producción no se tocan.
- No emitir métricas ficticias, premios falsos ni contadores «en vivo» inventados.
- No exponer Guardian, claves, ocho sitios sellados ni talleres privados para atraer tráfico.
- No usar IA para suplantar autores o testimonios reales ni generar endorsements ficticios.
- Las biografías vivas son base de coherencia, no licencia para revelar capítulos no recorridos.
- Sin contratar analíticas, publicidad, hosting, bots o campañas de pago sin aprobación.

## 9. Proxima entrega sugerida
Un **cuaderno de pruebas de primera visita** reutilizable: cuestionario de 6 tareas, hoja de observación y criterios de severidad, para que las opiniones de los primeros visitantes se conviertan en mejoras medibles y no solo impresiones. Pendiente de aprobación para pilotaje externo.
