# Llave Maestra del Creador — arquitectura y activación

**Fecha:** 30 de octubre de 2026. **Estado:** implementación en **rama de prueba**, sin credenciales activadas y **sin fusión en producción**. El autor autoriza continuar pruebas e implementar posteriormente la Llave Maestra para conocer todos los sitios.

## Qué permite

- La ruta **`/guardian`** exige autenticar una llave del creador.
- Tras entrar, se muestra el inventario de los **diez lugares**.
- En `/guardian/sitio/{slug}` se reproducen, con controles, los **dos videos existentes** de cada lugar: descenso y aproximación al Oráculo.
- La sesión firmada dura ocho horas y es válida únicamente en rutas `/guardian`.
- La vista privada **no modifica** `localStorage`, la Llave del visitante, las reglas de desbloqueo ni los capítulos.
- No desbloquea los ocho oráculos incompletos en la experiencia pública: son materiales para el creador, **no mundos interactivos terminados**.

## Cómo se protege

La llave de acceso y el secreto de firma **no se guardan en GitHub** ni se incluyen en JavaScript del cliente. Se verifican exclusivamente en el servidor Next.js. La contraseña se compara de forma constante en el tiempo (resúmenes SHA-256) y la sesión se firma con HMAC-SHA256 y nonce aleatorio. La cookie es `HttpOnly`, `SameSite=Strict`, `Secure` en producción y solo se envía bajo `/guardian`.

La implementación exige **dos variables privadas** en el entorno de Vercel que controla el autor:

- `SAN_YALLEGO_MASTER_KEY`: secreto aleatorio con **al menos 24 caracteres**; debe ser difícil de adivinar, preferiblemente 32–48 caracteres generados con un gestor de contraseñas.
- `SAN_YALLEGO_GUARDIAN_SECRET`: otro secreto aleatorio **distinto**, de **al menos 32 caracteres**, para firmar sesiones.

**No usar prefijo `NEXT_PUBLIC_`**, no compartirlas por chat, no escribirlas en un PDF ni subirlas al repositorio. Configurar **únicamente en Preview** para iniciar pruebas y redeplegar la rama; tras aprobar funcionalidad, configurar el entorno que se vaya a publicar.

La aplicación no concede acceso al faltar las variables o si no cumplen longitud mínima. Nunca almacenar la contraseña en un query string, en la URL ni en `localStorage`.

## Seguridad y limitaciones conocidas

- Este diseño evita que visitantes casuales abran las páginas de la Sala del Creador sin una sesión válida. El material servido desde **`public/assets/video` conserva URLs públicas**; por tanto, esto **no protege el MP4 en sí** frente a alguien que conozca su dirección. Para material realmente secreto, moverlo a almacenamiento privado con autorización por petición.
- La implementación **no cuenta con limitador distribuido de intentos**. Se requiere una llave de alta entropía; antes de convertirla en panel de administración más amplio, agregar controles contra fuerza bruta mediante la capa de protección de Vercel, WAF o almacenamiento de tasa de intentos.
- Esta clave no debe permitir editar archivos, publicar libros, consultar datos privados, ni cambiar el estado de los visitantes.
- No sustituye un sistema completo de identidad y permisos. Si el proyecto crece, usar autenticación del autor (p. ej., Supabase Auth con roles comprobados del lado del servidor) en vez de ampliar privilegios de esta clave.
- No confundir `Llave Maestra del Creador` con `Llave de San Yallego` obtenida por los caminantes.

## Plan de validación en Vercel preview

1. Ejecutar el verificador `pnpm test:foundations`, que comprueba MP4, audio, sitios sellados y compuertas privadas.
2. Revisar compilación y tipo de Next.js, especialmente `cookies()` y rutas dinámicas.
3. Sin variables configuradas: `/guardian` muestra «todavía no activada» y `/guardian/sitio/sitio-03` redirige a login.
4. Con variables privadas de **Preview**: la llave equivocada debe fallar; la correcta genera cookie y muestra diez lugares.
5. Entrar a los diez: probar controles, sonido y dos videos por lugar; comprobar móvil/escritorio.
6. Cerrar sesión y verificar que una URL profunda ya no se puede abrir.
7. En la ruta normal `/mapa` confirmar ocho sitios aún sellados y la Casa accesible solo con la llave pública ganada.
8. Mantener esta rama **sin fusionar** hasta aprobar la comprobación visual y decidir cuándo lanzar el acceso.

## Proyecto conectado

Repositorio: `ganadores2/juancoloraoleyendas`. Proyecto Vercel: `juancoloraoleyendas-bsrp`. El sitio público continúa en `main`.

**Criterio de éxito:** que el creador observe los diez caminos sin romper la aventura de los demás.

## Entrada desde el Mapa Fantástico (implementación en prueba)

**30 de octubre de 2026:** se añade al mapa, en la esquina inferior derecha, un acceso discreto y accesible **«El Taller del Creador»**, que dirige a `/guardian` **en el mismo dominio de la prueba**. Es únicamente un enlace; no almacena contraseña ni cambia las reglas de desbloqueo del mapa.

- **Visitante sin llave:** puede ver el enlace, pero la Sala solicita autenticar al creador. Esto es intencional; el enlace no es una llave.
- **Creador autenticado:** entra a la Sala y consulta diez rutas sin levantar sus sellos públicos.
- **Navegación general:** el botón global del mapa se oculta mientras se está en `/guardian`, para evitar cubrir el formulario de autenticación o los controles.
- **Móvil:** acceso mínimo de 44 px de alto y texto legible; confirmar en el navegador real que no tape marcadores ni mensajes.
- **Comprobación automática:** nueva regla exige que la entrada exista, enlace a `/guardian` y que el menú global no invada las pantallas privadas.

**Validación manual pendiente:** en la preview, entrar a `/mapa`, pulsar «El Taller del Creador», iniciar sesión cuando sea necesario, ver los diez lugares, cerrar sesión y confirmar que la ruta privada exige credenciales nuevamente.

**No se ha fusionado a producción.** El dominio principal seguirá sin mostrar esta entrada hasta que se aprueben y fusionen los cambios.

## Confirmación del autor: 20 recorridos operativos (30 oct 2026)

El autor abrió **El Taller del Creador**, autenticó exitosamente su Llave Maestra y examinó los dos videos de cada uno de los diez sitios. Confirmó expresamente: **«T O D O S............... F U N C I O N A N!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!»**.

**Resultado validado por el autor:** 10 sitios × 2 videos = **20 reproducciones revisadas y comunicadas como funcionales** en la versión de prueba.

No atribuir a esta confirmación pruebas que no se reportaron: no consta una matriz separada de Android/iOS/escritorio, mediciones de latencia, verificación del enlace de logout ni una auditoría de seguridad. Permanecen pendientes esas verificaciones y la revisión de los lugares sellados en el recorrido público. **No fusionar a producción automáticamente**: mantener la Llave Maestra en Preview mientras se cierran las condiciones de acceso y publicación.
