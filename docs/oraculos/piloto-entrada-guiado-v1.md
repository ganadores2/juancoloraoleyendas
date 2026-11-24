# Piloto privado del Oráculo de Entrada — recorrido guiado V1

**Estado:** PR en borrador, sin autorización para fusionar ni publicar en producción.
**Naturaleza:** simulador de conversación por etapas, **NO es IA conversacional**.

## Objetivo

Probar con el Creador el ritmo de las **tres preguntas originales** del Oráculo de Entrada antes de contratar o conectar un sistema de inteligencia artificial:
- ¿Quién te trajo hasta aquí?
- ¿Escuchaste algo al cruzar?
- ¿Vienes a escuchar, o a descubrir?

El texto final «Entonces mira bien. La piedra también escucha.» procede literalmente de `lib/san-yallego/oracles.ts`.

El **ejemplo editorial N0** proviene de `lib/san-yallego/oracle-matrix-v1.json`: la pregunta «¿Por qué un nombre importa?» y la respuesta segura previamente aprobada. No hay generación de respuestas: **no se interpreta lo que escribió el usuario**. Se muestran referencias verificadas de los capítulos II, III y XVI desde `CHAPTERS` y `chapterHref`, con enlaces a las rutas reales del índice ya existente.

## Acceso y privacidad

- Ruta **`/guardian/piloto-oraculo-entrada`**; requiere `hasGuardianSession()` antes del resto de datos.
- Desde la **Sala del Creador** se enlaza un botón para probarlo.
- `force-dynamic` y `noindex, nofollow`, sin equivaler a autenticación: la sesión Guardian es el requisito.
- Los textos opcionales de ensayo son temporales en estado del componente React y se **descartan al avanzar o reiniciar**. No van al servidor, no se guardan en `localStorage` ni en el progreso de los visitantes, no se envían a herramientas de analytics ni a un proveedor de IA mediante este módulo. Evitar introducir datos personales incluso en pruebas.
- El botón «Guardar silencio y seguir» permite avanzar sin contestar; el piloto no afecta las preguntas y desbloqueos de la aventura pública.
- No se modifican las rutas públicas, ocho sellos, llaves, Vercel secrets, MP3 o avances guardados.

## Alcance y limitaciones

1. **No es un Oráculo-GPT real**: todavía no comprende lenguaje, personaliza respuestas ni consulta secretos.
2. **No es prueba completa de ciberseguridad**: las medidas son aislamiento, sesión existente y falta de comunicación externa en este piloto; aún requerirá revisión antes de una integración real.
3. **No implica aprobación de voz ni imagen**. Los nombres de las diez voces del PR #11 siguen como propuestas; no se crean clips ni nuevas locuciones.
4. Esta rama nace de `main` y es independiente de los PR #8–#11. No fusionar varios PR a ciegas; revisar integraciones y enlaces antes de desplegar.
5. Los niveles N4/N5 y C100 no se muestran en la interacción; mencionar que permanecen fuera no revela información del canon.

## QA

- `pnpm run test:entrance-oracle` verifica preguntas exactas, respuestas N0 aprobadas, enlaces, privacidad del borrador, ausencia de cambios de progreso y sesión server-side.
- `pnpm run test:security` y `pnpm run build` ejecutan también la suite.
- Revisar en teléfono y escritorio con acceso legítimo al Guardian. Verificar tres pasos, borrado del texto al avanzar, silencio, reinicio y enlaces a los capítulos.
- Solicitar aprobación autoral antes de ampliar el diálogo o añadir un motor IA con cuotas, costos y retención de datos.

## Orden sugerido del siguiente módulo

Tras revisar el piloto, diseñar una **simulación de respuesta por intención con texto editorial N0** y un conjunto de preguntas de prueba adversarias, **sin LLM activo**. El autor deberá aprobar el tipo de diálogo y los límites antes de activar el servicio.
