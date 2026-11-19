# Cuaderno de Pruebas de Primera Visita — San Yallego
Fecha: 17 de noviembre de 2026
Versión: 0.1 — instrumento de investigación y experiencia de usuario.
Estado: listo para revisión del creador; pruebas externas NO realizadas.
Rama: preview/libro-1-audio-y-desbloqueo-integrado-20261114, PR #19 Draft.
Sitio bajo estudio: https://www.juancoloraoleyendas.com

## Propósito
Descubrir qué comprende, encuentra y disfruta un visitante **que no conoce previamente a Juan Colorao ni San Yallego**. Evitar que las decisiones del creador, diseñador o desarrollador sustituyan la conducta observada. Respetar el recorrido cinematográfico, el Oráculo, la llave temporal y las ocho zonas protegidas.

## Lo que sabemos antes de probar
- La portada del proyecto presenta «BIENVENIDO A SAN YALLEGO» y «Aquí las leyendas no se cuentan. Se descubren.»; CTA «Comenzar la aventura».
- Según la disponibilidad de assets de introducción, el botón lleva a `/bienvenida` o `/mapa`. No todas las experiencias tendrán exactamente la misma pantalla.
- Existe catálogo `/libro/1` con 33 capítulos y un flujo de desbloqueo después de finalizar el primero.
- `/glosario` y `/mapa` son puntos públicos alternativos de descubrimiento.
- Una visitante con experiencia en diseño gráfico informó anteriormente que no comprendió el propósito del micrófono. Eso es **un testimonio cualitativo**, no evidencia de un problema universal.
- Se guardan señales de progreso individual; no hay cifras verificadas de tráfico global obtenidas en esta auditoría.
- No pedir a nadie que intente abrir Guardian o las ocho zonas selladas para «probar» seguridad.

## Participantes sugeridos (no reclutados)
Un ensayo inicial de 6 a 8 adultos voluntarios de diferentes familiaridades con tecnología y literatura, si resulta viable para el creador. Diversidad de dispositivos y experiencias, evitando atribuir resultados solo a la edad. No recolectar nombres reales, teléfonos, correos, localización, contraseñas o información sensible. No registrar ni filmar a nadie sin consentimiento. Si el creador desea pruebas con menores, diseñar un protocolo específico con consentimiento del tutor y sin identificación de los menores.

## Guion neutro para el moderador (leer tal cual)
«Quiero conocer tu primera impresión de un mundo literario interactivo. No es un examen para ti: estamos evaluando si la página explica bien cómo recorrerla. Explórala como lo harías normalmente. Puedes decir en voz alta lo que piensas, qué te entusiasma y qué te confunde. No hay respuestas buenas o malas. Si algo no está claro, intenta decidir por ti mismo qué harías. Puedes detener la prueba en cualquier momento.»

**No explicar antes** quién es Juan, qué representa el micrófono, dónde está la llave, cómo se desbloquea el libro, qué es el Oráculo ni los nombres de lugares míticos. Si la prueba se atasca, documentar el momento y ofrecer una pista neutra; anotar que hubo asistencia.

## Las seis tareas de observación

| ID | Instrucción para el participante | Criterio observable | Fricciones a registrar |
| --- | --- | --- | --- |
| T1 | «Abre la página y cuéntame qué crees que es este lugar y qué podrías hacer aquí». | Puede describir una experiencia narrativa/exploratoria sin información del moderador | Mensaje de valor confuso; CTA invisible; texto demasiado pequeño |
| T2 | «Entra como lo harías normalmente y dime qué crees que te pide la primera interacción». | Entiende la invitación de entrada y puede avanzar; si aparece el micrófono, describe su sentido percibido | Micrófono interpretado como control de grabación; espera sin fin; transición confusa |
| T3 | «Encuentra el mapa y elige un lugar que te dé curiosidad». | Localiza el mapa, reconoce posibilidad de explorar y entiende qué es interactivo | Sitios sin señal, objetivos superpuestos, bloqueo inexplicado, demasiada espera |
| T4 | «Sigue el recorrido hasta que el sitio te haga una pregunta o te pida tomar una decisión». | Reconoce la parada del Oráculo/llave y sabe qué acción se espera | Preguntas ambiguas; silencio confundido con error; avance automático inesperado |
| T5 | «Busca cómo comenzar la primera historia para leerla o escucharla». | Encuentra cap. 1 o índice sin ayuda y entiende opción audio/texto | Dificultad para hallar capítulo, reproducir audio o regresar |
| T6 | «Imagina que mañana quieres regresar. Muéstrame cómo retomarías y qué compartirías con alguien». | Explica ruta de regreso, percibe utilidad del progreso y ubica enlace compartible | Pérdida aparente de avance, falta de orientación, salida difícil |

La sesión puede detenerse antes del desbloqueo de capítulos: **no exigir escuchar siete horas**. Para T5 basta identificar lectura/audio y comenzar capítulo 1; completar y desbloquear el resto requiere otra sesión específica con tiempo suficiente.

## Hoja de registro por tarea
Copiar una ficha sin datos personales:
```
ID de sesión anónimo: UX-___
Fecha: __ / __ / __
Dispositivo: móvil / tableta / PC
Navegador (si se conoce): ________
Condición de entrada: portada / enlace a libro / enlace a glosario
Conexión aparente: estable / irregular / no evaluada
Tarea: T__
Resultado: independiente / con pista / no conseguida / no aplicable
Primera acción observada: ________
Tiempo aproximado hasta la acción: ________ (solo si se midió)
Momento de duda: ________
Palabras exactas del participante (con permiso): ________
Intervención del moderador (si hubo): ________
Captura autorizada: sí / no / no tomada
Problema propuesto: ________
Severidad: 0 / 1 / 2 / 3
Nota: ________
```

## Escala de severidad (orientación)
- **0 — No es problema:** preferencia personal o comportamiento esperado.
- **1 — Menor:** molestia, tarda un poco más, continúa por sí mismo.
- **2 — Importante:** necesita una pista o interpreta mal una función esencial.
- **3 — Bloqueante:** no puede continuar, abandona o confunde una protección con un fallo grave.
La gravedad se asigna según comportamiento y consecuencia, **no** por fuerza emocional de una opinión aislada. Registrar también hallazgos positivos.

## Preguntas después de explorar
1. «¿Qué parte te dio más ganas de seguir?»
2. «¿En qué momento no supiste qué hacer?»
3. «¿Qué creías que pasaría al pulsar o ver el micrófono, si apareció?»
4. «¿Qué te parece que es la llave? ¿Qué crees que abre?»
5. «¿Preferirías escuchar, leer o alternar? ¿Por qué?»
6. «¿Qué te haría volver y a quién se lo recomendarías?»

**No preguntar** de forma inducida «¿Verdad que te gustó el video?» o «¿El micrófono estaba confuso?». La pregunta abierta detecta mejor el problema real.

## Método de resumen tras una primera ronda
- Tabla por tarea: intentos válidos, finalizaciones independientes, con pista, no conseguidas, sin datos.
- Tabla de problemas: ID, descripción verificable, frecuencia observada (ej. 2 de 6), gravedad, dispositivo, evidencia, solución candidata, necesidad de validación.
- Identificar las 3 fricciones más costosas que afecten inicio de aventura, paso al mapa y comienzo del capítulo 1.
- Registrar 3 experiencias que funcionaron especialmente bien y deben preservarse.
- Evitar generalizar porcentajes de una muestra pequeña a «todos los visitantes».
- A/B solo si posteriormente hay tráfico y medición suficientes; primero resolver fallas inequívocas de usabilidad.

## Hipótesis de mejora (NO implementadas)
**H1. Micrófono:** un texto contextual sutil («Juan te invita a entrar. Toca para continuar», si se valida en pruebas) podría clarificar sin arruinar la atmósfera. Antes de diseñarlo, comprobar cómo se comporta la experiencia actualmente y si el clip realmente incluye el micrófono.
**H2. Ritmo de espera:** permitir continuar sin esperar ciertas transiciones podría mejorar control; conservar versión cinematográfica completa y posibilidad de observación.
**H3. Navegación:** una forma discreta de «Regresar al mapa» puede evitar extravío cuando ya corresponde, sin mostrar rutas protegidas.
**H4. Catálogo:** hacer explícita la ruta hacia capítulo 1 y las opciones leer/escuchar, manteniendo reglas actuales de acceso.

Cada hipótesis exige una prueba comparativa y aprobación del creador antes de modificar el sitio. No interpretar los hallazgos de este documento como autorización para alterar textos o tiempos de videos.

## Condiciones éticas y operativas
- Invitar de forma voluntaria, sin presión; evitar exponer menores o información privada.
- No recopilar datos de identidad, ubicación precisa, salud ni preferencias sensibles.
- No usar páginas de Guardian ni forzar llaves; si el participante llega a un sitio sellado, preguntar simplemente qué entiende del mensaje.
- No publicar testimonios ni grabaciones sin consentimiento.
- No cambiar `main`, producción, audios, capítulos ni rutas del Guardián con este cuaderno.
- Ningún sitio, clave o Oráculo privado se hace público por razón de una prueba.
- Los resultados solo existen cuando se realizan sesiones reales: **este documento no afirma que se haya reclutado ni probado a nadie**.

## Criterio para salir de fase de investigación
El creador revisa un primer resumen de observaciones reales, acepta o rechaza cambios concretos y los aprobados se implementan individualmente en preview con pruebas automáticas y manuales, antes de considerar producción.
