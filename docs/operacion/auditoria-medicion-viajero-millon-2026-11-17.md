# Auditoría preliminar del contador global — Camino al Viajero Un Millón
Fecha: 17 de noviembre de 2026
Estado: auditoría estática de código + especificación propuesta, NO implementación.
Rama: preview/libro-1-audio-y-desbloqueo-integrado-20261114. PR #19 Draft.

## Resultado comprobado de la revisión del código

1. `package.json` contiene la dependencia **`@vercel/analytics` versión 1.6.1**.
2. `app/layout.tsx` importa `Analytics` desde `@vercel/analytics/next` y renderiza `<Analytics />` cuando `process.env.NODE_ENV === 'production'`. Este condicional incluye builds de producción para previews; **no equivale necesariamente a `VERCEL_ENV === 'production'`**. No demuestra por sí solo que el servicio esté habilitado en la cuenta, que registre eventos o que existan estadísticas accesibles.
3. `lib/san-yallego/progress.ts` define progreso **por visitante/navegador**, usando `createLocalStore('san-yallego:progreso:v1', INITIAL_PROGRESS)`: `completedChapters`, `visitedSites` y respuestas de Oráculos, entre otros. No contiene un contador global de personas distintas.
4. `ImmersiveReader` presenta porcentaje estimado y bloque visible por desplazamiento de lectura y marcador del capítulo; eso es **navegación narrativa**, no métrica de visitantes.
5. Un documento previo `docs/vision/el-viajero-un-millon-2026-11-17.md` ya fijó que no se han verificado cifras ni definido una métrica única.

**Limitación de la auditoría:** no se ha realizado inventario exhaustivo de todos los servicios externos ni consulta confirmada al panel de Web Analytics. Una búsqueda de código no sustituye una consulta al panel de Vercel. Se intentó recuperar el proyecto con los nombres conocidos mediante el conector y el servicio respondió «project not found» en ese contexto; no significa que el proyecto o sus analíticas no existan. Por tanto **no hay ninguna cifra verificable de visitas ni personas únicas** para anunciar hoy.

## Primera decisión operativa recomendada
Separar dos indicadores con nombres honestos:
- **Tráfico del sitio:** métricas agregadas de Vercel Web Analytics para tendencia (visitas, páginas vistas, visitantes estimados según la definición real ofrecida por la plataforma y la ventana consultada).
- **Viajeros con identidad persistente validada:** potencial contador propio transaccional, opcional y futuro, si el creador decide crear cuentas o identificadores persistentes con reglas explícitas. No tratar automáticamente cada identificación de dispositivo como una persona única.

La meta «Viajero #1,000,000» solo podría atribuirse a un individuo concreto si existe un sistema que registre altas de viajeros con secuencia única y criterios de duplicados/bots. La analítica agregada no garantiza identificar al visitante exacto.

## Arquitectura propuesta (sin activar)
### Etapa A — Medición y transparencia
- Verificar con permisos de lectura si Vercel Web Analytics está habilitado, fecha de inicio, cobertura, limitaciones y significado de sus métricas.
- Elegir una unidad única para publicar: «visitas acumuladas», «visitantes estimados en periodo», o «viajeros registrados». Evitar mezclar totales de ventanas temporales y métodos distintos.
- Establecer **fecha de inicio verificable**. Si no se dispone de serie histórica completa, comenzar desde cero o señalar «desde [fecha]», sin inventar retrospectivamente el pasado.
- Definir filtrado de bots, ruido de previsualizaciones y visitas internas, siguiendo los recursos del proveedor; distinguir métodos reales de aspiraciones.

### Etapa B — Recuento estable (solo con aprobación)
- Registro de hitos atómico e idempotente, separado de `Progress` y del Guardian; una escritura de evento debe ocurrir una sola vez incluso con concurrencia.
- No recolectar IP, ubicación exacta ni huellas digitales de forma improvisada; política de privacidad, minimización de datos y tratamiento de consentimiento deben revisarse antes.
- Mantener separadas la secuencia de registros y el número de usuarios únicos estimados; resistir cuentas duplicadas y automatizaciones sin prometer verificación perfecta de personas.
- Mostrar solo el total agregado, con fecha de actualización y método. Implementar caché razonable y pruebas de saturación.
- La meta del millón se confirma **después de validar el evento**, no cuando un navegador muestra el número por primera vez.

### Etapa C — Celebración (solo con aprobación autoral)
- Escena artística «Campana del Millón» con Esperanza, XOLO, Don Chema y Doña Chavela.
- Todo material futuro etiquetado como **representación imaginada** hasta cumplir el hito.
- Accesible, opcional y saltable; no desbloquea capítulos, Oráculos ni los ocho lugares sellados.
- Identidad de un eventual viajero distinguido: privacidad por defecto; cualquier reconocimiento nominal requiere permiso específico.

## Pruebas de aceptación a diseñar
1. Repetir 10 veces la misma página no suma 10 visitantes.
2. Recargar o abrir varias pestañas no genera nuevas identidades por defecto.
3. Dos solicitudes concurrentes por una misma inscripción no activan dos veces el hito.
4. La cifra cero/ausencia de datos se representa como «sin datos verificados», no como resultado real.
5. Cambiar de dispositivo no garantiza unicidad de personas; documentar la limitación.
6. El «salto al futuro» del Oráculo no modifica ningún contador de visitantes ni capítulos.
7. No aparece analítica simulada ni aviso prematuro de «un millón».
8. Guardian, llaves y material sellado se mantienen aislados y privados.
9. Los previews no contaminan la cifra pública bajo un método que los incluya inadvertidamente.

## Próxima consulta concreta para el creador (cuando sea útil)
Antes de implementar cualquier contador público, definir si el objetivo simbólico es **un millón de personas estimadas que visitaron San Yallego** o **un millón de Viajeros registrados**. Podemos estudiar el tráfico con Web Analytics sin introducir aún un nuevo sistema de cuentas.

## Límites operativos
Esta entrega solo añade documentación en preview. Ningún servicio se habilitó, ninguna cuenta se conectó, ningún contador se activó ni se realizaron gastos o cambios en producción.
