# Ritual de la llave — Entrada a San Yallego · V1

**Estado: PREPRODUCCIÓN. Este PR es un borrador; NO fusionar ni publicar sin autorización del autor.**

## Intención narrativa aprobada

El visitante contempla San Yallego, desciende al Oráculo de Entrada, responde tres preguntas o guarda silencio, descubre la argolla semioculta y **extrae la primera llave narrativa**. La llave permite comenzar el primer vuelo a la Casa donde nació Juanito. No es la Llave Maestra del Creador ni abre los ocho sitios sellados.

## Imágenes exactas recibidas

El autor aportó:
1. `ORACULO DE LA ENTRADA LLAVE OCULTA.png`, fotografía panorámica de **1672 × 941**, con argolla visible en el pedestal.
2. `LLAVE DEL ORACULO DE LA ENTRADA.jpg`, llave dorada con raíz/árbol, tres círculos, huella del XOLO, **922 × 1152**. **El damero gris de este JPG está dibujado en los píxeles y no es transparencia real**.

Se preparó por separado un **kit ZIP privado de preproducción**, con el PNG original del Oráculo, el JPG original de la llave, una **interpretación PNG de llave con fondo transparente para ensayo** y un prototipo HTML local de tres preguntas y extracción. Esa llave recortada/recreada requiere revisión visual: NO es necesariamente idéntica al original.

### Importante: NO se subieron binarios al repositorio

Este PR solo prepara el código y las rutas previstas. Antes de fusionar, y **solo con la autorización del Creador**, agregar los archivos binarios definitivos:

| Ruta pendiente de entrega | Procedencia |
|---|---|
| `public/assets/images/oraculo-entrada-llave-oculta.png` | Fotografía panorámica exacta aportada por el Creador |
| `public/assets/images/llave-san-yallego.png` | Versión transparente por **aprobar**, respetando el original |

Hasta que exista la fotografía ampliada, la Entrada **mantiene la imagen ya instalada** `oraculo-entrada.jpg` y el marcador antiguo `71% × 78%`. Al cargar correctamente el nuevo archivo, el marcador cambia al aro comprobado de la fotografía ampliada `49,3% × 78%`, con zona táctil de al menos 56 px; esto evita que un archivo ausente rompa la página.

## Cambios de interacción y continuidad

- No se altera el número ni el texto de las tres preguntas; **guardar silencio sigue siendo válido**.
- Tras terminar las preguntas, el panel se recoloca arriba para dejar el pedestal visible y táctil.
- El botón accesible «Tocar la argolla del pedestal» es alternativa a la argolla para accesibilidad y móvil.
- El toque anima la argolla durante **950 ms**, luego ejecuta el `findKey()` **preexistente** y presenta el `KeyReveal` (con fallback visual si falta PNG).
- La navegación `/sitio/casa-de-juanito?desde-llave=1` inicia en la fase `descenso` para no interponer una pantalla adicional. **`isSiteUnlocked` continúa ejecutándose ANTES de mostrar el vuelo**; escribir esa URL sin llave no desbloquea la Casa.
- Desde cualquier otra entrada a la Casa, la visita mantiene el estado original `inicio` y sus controles habituales.
- Los ocho lugares `sealed`, los 33 capítulos, los audios, los permisos Guardian y los videos originales no se modifican.
- Los datos de progreso del visitante siguen en `localStorage`; **eso no equivale a autorización de acceso a material reservado**.

## Pruebas

`pnpm run test:key-ritual` para las invariantes (imagen opcional y fallback; dos coordenadas; preguntas y silencio; llave condicionada; acceso a Casa con llave; ocho sellos). También incluido en `pnpm run test:security` y `pnpm run build`.

### QA visual obligatorio antes de integrar
- Revisar que la argolla toque el punto exacto en pantalla ancha y móvil vertical con la foto ampliada definitiva.
- Revisar el orden: vuelo de Entrada → 3 preguntas → argolla → llave emergente → primer descenso a Casa.
- Verificar el retorno y el caso «llave ya obtenida».
- Verificar que una URL `desde-llave=1` sin llave dirige al sellado de Casa.
- Aprobar estética del PNG de llave transparente antes de colocar el archivo definitivo.
- Verificar accesibilidad, foco de teclado, contraste, movimiento reducido y ausencia de tapados.
- Mantener el PR como borrador: **no subir medios privados ni fusionar** hasta revisión del Creador.

## Esperanza

Sus apariciones ocasionales permanecen como **concepto editorial independiente**. Este PR no incorpora una aparición aleatoria ni añade un personaje o revelación sin cronología aprobada.
