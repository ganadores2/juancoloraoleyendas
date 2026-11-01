# Política propuesta de medios — San Yallego
**Estado:** OPCIÓN A APROBADA POR EL AUTOR EL 2026-11-01. Esta autorización cubre el uso público y promocional de los 20 MP4 de vuelos, NO la publicación de secretos narrativos, ni el lanzamiento a Production.

## Inventario comprobado en la rama de pruebas
- `lib/san-yallego/assets.ts` define 10 MP4 de descenso y 10 MP4 de aproximación a Oráculos, además de intro, bienvenida y recorrido aéreo.
- `app/sitio/[slug]/page.tsx` mantiene **ocho sitios** en el estado `sellado`: no expone su experiencia interactiva en la ruta pública.
- `app/guardian/sitio/[slug]/page.tsx` exige una sesión del creador para presentar la vista de los 20 videos.
- **Límite real de acceso:** los MP4 están en `public/assets/video`. El acceso a `/guardian` no impide abrir directamente esas URLs estáticas. Un mensaje de «sellado» en la interfaz no convierte esos archivos en privados.

## Propuesta creativa
**Material de difusión (autor por confirmar):**
- Las panorámicas y descensos podrían usarse como avances de 10 sitios, con invitación de Esperanza de 7 s, fragmento elegido de unos 10–12 s y portada final.
- No revelar respuestas a preguntas del Oráculo, interior de relatos por publicar, claves, escenas inéditas ni recompensas secretas.
- La existencia de 10 vuelos no equivale a 10 Oráculos construidos; conservar los ocho sitios sellados.

**Material reservado:**
- Cualquier MP4 que el autor declare secreto **no debe depender de la carpeta `public` ni de un simple botón oculto**.
- Preparar copia verificada fuera del repositorio/hosting público, entregar con rutas de servidor que autentiquen y autoricen cada solicitud y respeten solicitudes de reproducción/rango; probar móvil, navegadores y tráfico.
- Si los archivos ya estuvieron en Git público o en URLs previamente distribuidas, moverlos no elimina automáticamente copias o historial existente. Valorar sustitución por versiones de avance que no revelen contenido reservado.

## Decisión del autor — OPCIÓN A APROBADA (2026-11-01)

El autor aprobó expresamente: **«los 20 vuelos pueden ser material público y promocional. Continuemos protegiendo los Oráculos y el Taller»**.

- Los 10 videos de descenso y los 10 videos de aproximación a los Oráculos pueden permanecer accesibles mediante URLs públicas y reutilizarse como paisajes/avances promocionales.
- Los ocho lugares reservados permanecen sellados para el visitante: sus Oráculos, narrativas, recompensas y experiencias no se autorizan por esta decisión.
- La Sala del Creador sigue exigiendo sesión autenticada; la autorización de los MP4 no equivale a autorización para publicar el Taller ni sus credenciales.
- Material nuevo de la campaña de Esperanza requiere disponer del archivo original y revisar el montaje final antes de difundirlo.
- No borrar, sustituir ni convertir los MP4 a almacenamiento privado como requisito de lanzamiento.
- Esta decisión **no constituye autorización de fusionar ramas ni desplegar a Production**.

## Requisitos de lanzamiento independientes
- Limitar intentos de `POST /guardian/login` mediante WAF confirmado o equivalente distribuido, sin afirmar que está activo.
- Configurar secretos del entorno de destino con controles de alcance; no publicar valores.
- Revisar continuidad de los dos vuelos Entrada y Casa, llave del visitante, acceso y cierre del Taller y ocho sellos.
- Obtener aprobación del autor para merge y publicación.
