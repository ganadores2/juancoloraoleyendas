# Política propuesta de medios — San Yallego
**Estado:** PROPUESTA EN REVISIÓN. No es autorización de publicación ni confirmación de confidencialidad. 2026-11-01.

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

## Decisión necesaria del autor
A. **Avances públicos**: autoriza que los 20 MP4 de vuelos puedan conocerse mediante URLs directas; la sorpresa está en experiencias y narrativas aún selladas. Facilita la campaña con Esperanza.
B. **Vuelos reservados**: al menos los 16 MP4 de los ocho sitios sellados deben protegerse en almacenamiento privado antes del lanzamiento; exige trabajo de migración y pruebas.

**Hasta decisión:** conservar los archivos como están y no afirmar que son privados. No fusionar a `main`, mover archivos, eliminar contenido ni publicar desde este documento.

## Requisitos de lanzamiento independientes
- Limitar intentos de `POST /guardian/login` mediante WAF confirmado o equivalente distribuido, sin afirmar que está activo.
- Configurar secretos del entorno de destino con controles de alcance; no publicar valores.
- Revisar continuidad de los dos vuelos Entrada y Casa, llave del visitante, acceso y cierre del Taller y ocho sellos.
- Obtener aprobación del autor para merge y publicación.
