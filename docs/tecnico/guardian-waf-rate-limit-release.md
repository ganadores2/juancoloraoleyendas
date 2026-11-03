# Puerta del Taller: regla WAF de acceso — propuesta operativa

**Estado:** pendiente de activar y verificar por el titular de Vercel; **NO desplegada**. Proyecto `juancoloraoleyendas-bsrp`. PR complementaria #5 y seguimiento issue #4. No cambiar `main`, el dominio público ni los MP4 para instalar esta regla.

## Regla propuesta

- **Nombre:** `guardian-login-rate-limit`
- **SI** ruta (Request Path) **equals** `/guardian/login`
- **Y** método HTTP (Request Method) **equals** `POST`
- **ENTONCES:** Rate Limit, Fixed Window, **5 solicitudes por 60 segundos**, clave de conteo **IP**.
- **Respuesta después del límite:** **429 Too Many Requests**, no solo Log.
- Solo afectar al formulario, no a la portada, mapa, Oráculos ni reproducción.
- Verificar en la interfaz de Vercel si existen reglas de mayor prioridad o una regla incompatible. En planes con una sola regla, comprobar su uso antes de crear otra.

## Procedimiento seguro

1. En el proyecto correcto de Vercel, abrir **Firewall > Configure > New Rule**. Vercel publica esta función en todos los planes, pero puede mostrar un diálogo de precios la primera vez; **el titular decide y acepta cualquier condición de facturación**.
2. Definir las dos condiciones con **AND**. Configurar inicialmente la acción **Log** para observar tráfico legítimo durante 10 minutos sin bloquear solicitudes.
3. Tras revisar registros y confirmar el filtrado, cambiar a **Rate Limit**, estrategia Fixed Window, 5/60s/IP, resultado 429. Aplicar cambios con **Review Changes > Publish**. Nota: esta publicación de *firewall* puede afectar el proyecto inmediatamente, incluso sin deployment, por lo que se debe revisar su alcance.
4. Verificar desde una red de prueba que solicitudes legítimas pueden ingresar y que el exceso retorna 429. **No hacer intentos con llaves reales en trazas compartidas**.
5. Comprobar que el mapa, la portada, el acceso público y los 20 MP4 del Taller no quedan limitados por la regla.
6. Registrar fecha, configuración final y confirmación del titular en issue #4. Nunca registrar contraseñas ni el secreto de firma.

## Estado de la integración

El intento de leer y configurar la regla por el conector de Vercel devolvió **HTTP 404: Seawall Config not found**. No significa que exista o no exista protección automática global; significa que no tenemos una configuración WAF personalizada consultable/creable mediante esa ruta. **No afirmar que el rate limit está activo**.

## Controles complementarios

- El PR #5 añade parseo acotado de formulario (4 KiB reales); **no reemplaza** el rate limit distribuido.
- La ruta `/guardian` comprueba sesión firmada, vencimiento y cookie HttpOnly/Strict del lado del servidor; cerrar sesión borra la cookie local, no revoca un token previamente copiado.
- Los archivos en `public/assets/video` son servidos como archivos estáticos y **no están protegidos por autenticación del Taller**. Hay que decidir si esos vídeos son secretos y, de serlo, migrarlos a almacenamiento privado con validación de permisos. No manipular ni borrar los MP4 originales hasta tener una copia verificada.
- Tras activación y pruebas, solicitar revisión explícita del autor antes de fusionar PR #2/#5 a `main`.

**Referencias:** https://vercel.com/docs/vercel-firewall/vercel-waf/rate-limiting y https://vercel.com/docs/vercel-firewall/vercel-waf/custom-rules

## Alternativa preparada en código — Redis compartido (2026-11-01)

**Estado:** IMPLEMENTADA EN LA RAMA DE PRUEBAS, NO ACTIVADA. No asumir que existe un contador hasta que se configure y pruebe Redis.

Se añadió `lib/san-yallego/guardian-rate-limit.mjs` y su integración en `app/guardian/login/route.ts` con:
- **5 intentos por IP en una ventana de 60 segundos**, registrados con una operación Redis `EVAL` atómica, clave con HMAC irreversible a partir de la IP (no se almacena la IP en claro).
- Al superar el límite, respuesta HTTP **429** y cabecera `Retry-After`.
- El contador se consulta **antes** de analizar el formulario o verificar la llave. Se cuentan intentos válidos e inválidos para limitar abuso de la ruta.
- En **Production**, si falta el proveedor Redis, falta IP o Redis falla, responder **503** y NO permitir ingresos sin protección. Esta conducta podría impedir el acceso del administrador hasta que se conecte el servicio; está prevista como protección de seguridad.
- En **Preview**, si Redis aún no está conectado, se mantiene el acceso de pruebas **SIN rate limiting distribuido**. Nunca anunciarlo como activo en Preview sin verificar.
- No se modifican las credenciales, la firma de sesión, el acceso a los videos públicos ni los ocho sellos.

### Activación pendiente — requiere autorización del titular

1. Seleccionar e instalar un proveedor de Redis compartido a través de Vercel Marketplace (p. ej., Upstash Redis); **puede implicar costes**, no aprovisionar ni aceptar precios automáticamente.
2. Confirmar que el proyecto correcto dispone de las variables **server-only** `UPSTASH_REDIS_REST_URL` y `UPSTASH_REDIS_REST_TOKEN`, al menos en el Preview de la rama de prueba. No mostrar ni pegar sus valores en chats o issues.
3. Crear nuevo despliegue de Preview para que adquiera las variables y realizar **prueba controlada** con un entorno no sensible: intentos 1–5 producen el comportamiento normal; intento 6 de la misma IP responde 429; otra IP no comparte contador; al cabo de 60 s se restablece la cuenta.
4. Probar fallo del backend Redis (en entorno aislado) y respuesta 503 en Production, restaurando servicio antes de cualquier lanzamiento.
5. Configurar las variables para Production **antes** de integrar a `main`, y revalidar la ruta en una preview preparada. El WAF puede ser capa adicional pero **no sustituye** la comprobación de Redis si se elige esta arquitectura.
6. Tras pruebas y aprobación del titular, actualizar este documento/issue #4 con resultados.

**Recomendación:** evitar contador `Map` en memoria: las instancias serverless no lo comparten. Los endpoints de Redis se usan solo del lado del servidor.
