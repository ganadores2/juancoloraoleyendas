# Acceso visible y sencillo a la encuesta rápida — propuesta UX San Yallego
Fecha: 17 de noviembre de 2026
Estado: ubicación aprobada en principio por el autor, propuesta de implementación en preview; NO implantada en la web.
Branch: preview/libro-1-audio-y-desbloqueo-integrado-20261114 · PR #19 Draft.
Referencia: petición del autor: «que sea sencillo localizarla para el visitante», con encuesta tipo YouTube de una sola pantalla con ✓/✕ y comentario opcional.

## Decisión de diseño: descubrible pero no intrusiva
**Etiqueta visible y literal:** «Tu opinión». Nunca un icono sin texto y nunca un nombre que obligue a adivinar («Buzón místico», «Oráculo», etc.). El enlace conduce a una pantalla breve o modal accesible y se puede cerrar sin responder. El formulario es voluntario, no bloquea recorridos, no solicita identificadores personales ni afecta progreso.

### Ubicaciones recomendadas
1. **Mapa, prioridad máxima:** acceso «Tu opinión» visible en la franja inferior, diferenciable de «Archivo de Palabras» a la izquierda y «El Taller del Creador» a la derecha; evitar tapar marcadores de sitios, controles de mapa, avisos de comienzo y safe-area móvil. Considerar un grupo compacto de enlaces abajo a la izquierda, o colocar el acceso junto al índice/menú cuando el espacio vertical sea pequeño. En pantallas estrechas, no crear tres botones simultáneos que se superpongan.
2. **Índice del Libro I (`/libro/1`):** enlace discreto «Tu opinión» al final de la cabecera o junto al retorno al mapa; permanece hallable después de buscar el capítulo 1.
3. **Después de una etapa natural del recorrido:** una invitación opcional una sola vez «¿Cómo te pareció tu visita? ✓ Sí, opinar / Ahora no», solo tras completar la entrada o llegar al capítulo 1. Nunca detener un video para solicitar respuestas y nunca interrumpir el Oráculo de Entrada.
4. **No mostrar flotante durante `/bienvenida`, `/portal`, descenso cinematográfico o Guardia/Guardian** ni sobre el audio/lector inmersivo. Allí no debe cubrir controles o revelar zonas selladas.

### Comportamiento esperado de móvil
- Texto «Tu opinión» siempre legible; área táctil mínima 44×44 px.
- Botón al borde seguro (safe-area) con contraste adecuado; comprobar orientación horizontal 711×320, pantallas pequeñas y menú del mapa.
- No competir con el toggle de sonido (arriba a la derecha) ni navegación del mapa (arriba a la izquierda).
- Al volver de encuesta preservar el punto narrativo; no reiniciar videos ni cambiar progresos o llaves como efecto de opinar.
- Accesibilidad: nombre real de control, foco de teclado, cierre claro, opción omitir y respeto a reducción de movimiento.

## Diseño de encuesta
Una sola pantalla con cinco preguntas de **Sí ✓ / No ✕**:
1. ¿Te gustó la bienvenida?
2. ¿Entendiste cómo comenzar?
3. ¿Encontraste el mapa fácilmente?
4. ¿Comprendiste el propósito del micrófono? **Permitir «No lo vi» o «No aplica»** si no apareció para ese visitante, pues `introReady` puede dirigirlo directamente al mapa.
5. ¿Te gustaría regresar?

Comentario opcional «¿Qué mejorarías?».
No exigir correo, usuario, nombre ni edad. Debe poder omitir preguntas y enviar parcialmente si se aprueba; sin forzar cinco respuestas. Al confirmar recepción real mostrar estado «Gracias, recibimos tu opinión» y permitir cerrar. Si falla el envío ofrecer reintento sin afirmar éxito.

**Nota metodológica:** cada pregunta es apreciación subjetiva. Un «No» en el micrófono solo aplica si apareció. Registrar exposición: estuvo en bienvenida / llegó directo al mapa / otro; no sobreinterpretar resultados de muestra pequeña.

## Cómo recibir las respuestas de verdad (pendiente de decisión técnica)
- **Piloto rápido:** un Google Forms/servicio externo enlazado desde «Tu opinión», con formulario en una pantalla y respuesta anónima si las opciones reales del proveedor lo permiten. Necesita URL real que el creador controle y que autorice a compartir. El enlace no puede apuntar a URL inventada.
- **Integración propia:** página `/opinion` y endpoint protegido con validación, antiabuso, límites, almacenamiento privado y vista de resultados autorizada. Requiere elección/consentimiento de almacenamiento y pruebas; no generar endpoints que simulen envíos ni guardar opiniones solo en localStorage como si hubieran llegado al creador.
- Hasta establecer un destino real de recepción, mantener **solo prototipo y documentación** en preview, sin botón visible en producción que conduzca a una encuesta que no registra respuestas.

## Verificación con primeros visitantes
La prueba crucial: solicitar «Si quisieras decirnos qué te pareció, ¿dónde tocarías?» sin indicar «Tu opinión». Registrar hallazgos reales.
- Éxito buscado: el participante lo encuentra desde el mapa o índice sin explicación.
- Fallos: se confunde con Oráculo; no ve el enlace al llegar al mapa; lo tapa una notificación; al salir de la encuesta pierde progreso; cree que se requiere llave.
- Probar al menos un móvil estrecho, un móvil en horizontal y PC antes de aprobar ubicación definitiva.

## Fuentes concretas del código inspeccionado
- `components/san-yallego/mapa/mapa-screen.tsx`: «Archivo de Palabras» tiene un botón fijo abajo a la izquierda; «El Taller del Creador», fijo abajo a la derecha; guía inicial a la derecha.
- `components/san-yallego/traveler-map-nav.tsx`: botón de navegación del mapa arriba a la izquierda **solo si ya posee la llave**.
- `components/san-yallego/sound-toggle.tsx`: control de audio fijo arriba a la derecha.
- `components/san-yallego/home/home-screen.tsx`: CTA «Comenzar la aventura», según `introReady` llega a bienvenida o mapa.
- `lib/san-yallego/progress.ts`: progreso individual local, independiente de feedback.
Por estos hechos se **desaconseja** añadir un tercer botón fijo abajo sin rediseñar distribución responsiva.

## Próximo paso condicionado
Cuando se decida el destino real para recibir respuestas, implementar primero una navegación evidente y el formulario sencillo en preview; comprobar entrega real y errores; realizar prueba de móvil; después revisar con el autor si corresponde publicar. Ninguna encuesta se considera operativa solo porque su interfaz se vea bien.

## Límites
No modificar `main`, producción, Guardián, ocho sitios protegidos, sistema de llaves, capítulos, audios, duración de clips ni presupuestos. Sin activación de datos personales ni publicación de enlaces externos no verificados.
