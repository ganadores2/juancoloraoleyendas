# Kit de pilotaje — Primera visita a San Yallego
Fecha: 17 de noviembre de 2026
Estado: LISTO PARA APLICARSE, SIN SESIONES EJECUTADAS
Rama: preview/libro-1-audio-y-desbloqueo-integrado-20261114 · PR #19 Draft
Documento de referencia: `docs/operacion/cuaderno-pruebas-primera-visita-2026-11-17.md`
Destino público: https://www.juancoloraoleyendas.com

## 1. Qué incluye esta entrega
Un protocolo corto de pilotaje, invitación para compartir **manualmente** si el creador lo autoriza, formato de registro de 6 tareas, metodología para interpretar resultados y plantilla de decisión para implementar mejoras en preview. No se enviaron invitaciones ni se recolectaron datos.

## 2. Invitación propuesta — mensaje privado opcional (sin enviar)
«¡Hola! Estoy preparando una experiencia narrativa interactiva llamada San Yallego y me ayudaría mucho tu primera impresión. Me gustaría que entraras a https://www.juancoloraoleyendas.com sin que te explique la historia antes. Si tienes unos 15–20 minutos y te apetece participar, te compartiré seis tareas muy sencillas para observar cómo se entiende la experiencia. No necesitas conocimientos de tecnología ni literatura. La participación es voluntaria; puedes detenerte cuando quieras y no hace falta crear una cuenta, dar datos personales ni completar el libro. Lo más útil será saber qué te sorprendió y qué te confundió. ¡Gracias!»

Tiempo sugerido **solo para el ensayo guiado**, no una estimación de cuánto tarda recorrer el libro.

## 3. Preparación del moderador
- Confirmar que el enlace se abre antes de cada sesión y anotar la fecha. Si aparece una pantalla de login/preview protegida, no pedir contraseñas; usar un enlace público autorizado.
- Usar preferentemente primera visita y sesión sin historial previo. **No pedir al participante que borre cookies personales ni desactive su seguridad**; si ya exploró el sitio, anotarlo.
- Probar tanto móvil como computadora, con navegadores disponibles; no forzar que todos usen el mismo dispositivo.
- Explicar que se evalúa el producto, no la habilidad de la persona; no indicar de antemano qué hace el micrófono, cómo encontrar el mapa o la llave.
- No grabar pantalla, audio o datos personales sin permiso específico. Notas anónimas por defecto.
- Evitar usar la llave del Guardián o contenido de ocho sitios sellados. No compartir credenciales ni códigos privados.

## 4. Guion abreviado — seis tareas en orden
T1. «¿Qué crees que es este sitio y qué te invita a hacer?»
T2. «Entra de la forma que te parezca natural. ¿Qué entiendes que te pide la primera interacción?» (Si aparece el micrófono, preguntar qué cree que significa **después** de observar su respuesta espontánea.)
T3. «Encuentra el mapa y elige un lugar que te dé curiosidad.»
T4. «Sigue hasta encontrar una pregunta o decisión y dime qué harías.»
T5. «Encuentra el principio de la historia y comprueba si podrías leerla o escucharla.»
T6. «Imagina que regresas mañana. ¿Cómo continuarías? ¿Qué compartirías?»
No exigir completar capítulo 1 ni todas las escenas para terminar el ensayo; marcar tareas no alcanzadas y por qué.

## 5. Plantilla de registro anónimo por sesión

```
PRUEBA UX SAN YALLEGO — SESIÓN ____
Fecha: ______   Tipo dispositivo: ______
Entrada: portada / mapa / índice / glosario / otra ruta pública
Visitante: nuevo / ya había entrado / desconocido
Moderación: presencial / llamada / autónoma con comentarios voluntarios
Autorizó notas anónimas: sí / no
Tarea | Independiente | Con pista | No conseguida | No aplicable | Observación textual/acción
T1    | [ ]           | [ ]       | [ ]            | [ ]         | __________
T2    | [ ]           | [ ]       | [ ]            | [ ]         | __________
T3    | [ ]           | [ ]       | [ ]            | [ ]         | __________
T4    | [ ]           | [ ]       | [ ]            | [ ]         | __________
T5    | [ ]           | [ ]       | [ ]            | [ ]         | __________
T6    | [ ]           | [ ]       | [ ]            | [ ]         | __________
Punto exacto de mayor confusión: ______________
¿Qué disfrutó más?: __________________________
¿Comprendió el micrófono si apareció?: sí / parcialmente / no / no apareció
¿Pudo comenzar capítulo 1?: sí / con ayuda / no / no llegó
¿Querría regresar? Respuesta literal voluntaria: ___________________
Observación más importante: __________________
No incluir nombres, correos, teléfonos ni identificadores sensibles.
```

## 6. Plantilla agregada para la primera ronda
```
Fecha de cierre de la ronda: _______
Participantes con datos de alguna tarea: ____ (no suponer 6–8)
Tarea | Válidos | Independiente | Con pista | No conseguida | No aplicable
T1    |         |               |           |               |
T2    |         |               |           |               |
T3    |         |               |           |               |
T4    |         |               |           |               |
T5    |         |               |           |               |
T6    |         |               |           |               |

Hallazgo UX-01: [conducta verificable,  x de n, dispositivo y pantalla]
Severidad: 0 / 1 / 2 / 3
Hipótesis de solución: ________________________
Prueba propuesta para validar: ________________
Aprobación autor: pendiente / aprobada / rechazada
Estado de implementación: no iniciada / preview / verificada / descartada

Hallazgo UX-02: ...
Hallazgo UX-03: ...
Tres fortalezas que debemos conservar:
1.
2.
3.
```

Denominador por tarea: contar únicamente sesiones donde hubo oportunidad de intentar esa tarea. No usar `no aplicable` como error ni comunicar porcentajes de muestras pequeñas como estimaciones poblacionales. Las citas literales requieren permiso; si no, resumir sin identificar.

## 7. Regla de priorización sin estadísticas engañosas
La prioridad de una corrección requiere **evidencia observable**, repetición cuando exista, severidad y coste de intervenir en la experiencia. Antes de cambiar algo, responder:
- ¿La dificultad impide comenzar, llegar al mapa o encontrar capítulo 1?
- ¿El hallazgo existe en un único dispositivo/navegador o es más amplio?
- ¿La solución conserva el ritmo y el misterio deliberados de la narración?
- ¿Puede medirse su éxito con otra prueba, no solo con opinión del equipo?
- ¿Afectaría Guardian, spoilers, derechos o acceso a contenido protegido? Si sí, no implementar sin revisión aparte.

### Ejemplo de prioridad, completamente hipotético
Si 3 de 6 personas no saben que el micrófono es una invitación y se quedan inmóviles, registrar `UX-01 | T2 | 3/6 | severidad 2`; probar texto contextual discreto o señal de interacción en **preview**, solo después de aprobación. **Este ejemplo NO es un resultado real**.

## 8. Criterios de cierre para decidir cambios
- Informe de ronda con notas y problemas sustentados, no impresiones sin evidencia.
- Decisiones expresas del autor sobre qué conservar, qué editar y qué posponer.
- Un cambio por hipótesis en preview; prueba manual y CI; medir si mejora sin desfigurar el recorrido cinematográfico.
- Ningún cambio a `main`, producción, piezas de audio, llave, Guardian, ocho zonas selladas o identidad de Oráculos sin revisión y aprobación específicas.

## 9. Próxima acción práctica
El creador puede compartir voluntariamente la invitación o ejecutar una primera prueba moderada con una persona adulta que no conozca San Yallego. Luego, con las notas anónimas de una o más sesiones, podrá elaborarse un informe real y decidir cambios fundamentados. **No se afirma que haya pruebas hechas, visitas capturadas ni invitaciones enviadas.**
