# Cimientos de juancoloraoleyendas.com — estado verificado y plan de pruebas

**Fecha de corte:** 30 de octubre de 2026. **Fuente:** repositorio GitHub `ganadores2/juancoloraoleyendas`, rama `main`, Vercel `juancoloraoleyendas-bsrp` y propuesta de cambio #1.  
**Regla del autor:** preservar las experiencias existentes, no reconstruir ni desbloquear rutas por accidente y no fusionar un cambio visual sin comprobarlo en móvil y escritorio.

## 1. Qué está construido

Proyecto Next.js con App Router en Vercel. Último despliegue de producción consultado: **READY**; esto confirma compilación/despliegue, **no equivale a una prueba humana de reproducción y navegación en todos los dispositivos**.

| Cimiento | Estado en repositorio | Nota |
|---|---|---|
| Home `/` | Existe | `Comenzar la aventura` dirige a `/bienvenida` si los cuatro MP4 introductorios están presentes; en caso contrario a `/mapa`. |
| Bienvenida `/bienvenida` | Existe; dos MP4 presentes | Saludo de Juan → invitación → micrófono. |
| Portal `/portal` | Existe; dos MP4 presentes | Video del portal → anuncio breve → vuelo aéreo → `/sitio/entrada`. |
| Oráculo de Entrada | Existe | Descenso → aproximación en video → imagen de oráculo, preguntas, piedra/argolla y Llave. |
| Llave / Pase temporal | Lógica presente | No expira; progreso inicial en `localStorage`, sin cuentas. |
| Mapa `/mapa` | Existe | Diez marcadores; Entrada abierta, Casa de Juanito mediante llave, ocho lugares sellados. |
| Casa de Juanito | Existe, ajuste **EN PR #1** | Descenso → aproximación al Oráculo → Oráculo → enlace al capítulo 1. La rama corrige la repetición de la aproximación. |
| Libro I capítulo 1 | Ruta y audio MP3 presentes | `/assets/audio/libro-1/capitulo-01-el-primer-grito.mp3`. |
| Navegación general | Existe | `TravelerMapNav` solo aparece después de la Llave y se oculta en Home/Bienvenida/Portal. |
| Archivo del Viajero | Planeado, **no implementado** | No publicarlo sin identidad visual, reglas de spoilers y recorrido aprobados. |

## 2. Inventario verificable en GitHub

**Diez videos de descenso:** presentes dentro de `public/assets/video/descenso/`.  
**Diez videos de aproximación a Oráculos:** presentes dentro de `public/assets/video/oraculo/`.  
**Cuatro videos introductorios:** presentes en `public/assets/video/` (bienvenida, invitación al micrófono, transición portal, recorrido aéreo).  
**Imágenes publicadas:** mapa, Oráculo de Entrada y Oráculo de Casa de Juanito.  
**Audio publicado:** archivo del Capítulo 1.

**Piezas aún no presentes en las rutas definidas por el manifiesto** `lib/san-yallego/assets.ts`:
- `public/assets/images/portada-san-yallego.jpg` — portada definitiva.
- `public/assets/images/llave-san-yallego.png` — arte oficial de la Llave (la UI usa símbolo alternativo).
- `public/assets/audio/primer-grito.mp3` — ruta heredada; la ruta nueva del audio del capítulo 1 sí existe y debe conservarse.

Una imagen aportada previamente por el autor se titula `JUAN COLORAO LEYENDAS PORTADA SITIO WEB.png` y puede servir de **referencia candidata**; no se ha publicado ni aprobado aquí como portada funcional. La imagen contiene botones dibujados: al integrarla, **los botones reales del sitio deben seguir siendo accesibles y accionables**, no confiar en letras o botones incrustados en una imagen plana.

## 3. Recorrido ceremonial que se debe preservar

```
Home
  → Bienvenida de Juan Colorao
  → Invitación y micrófono
  → Portal
  → Anuncio y recorrido aéreo
  → Descenso a la Entrada
  → Video Entrada al Oráculo
  → Oráculo de Entrada (piedra/argolla)
  → Llave + Pase de San Yallego
  → Mapa o Casa de Juanito
  → Descenso Casa de Juanito
  → Video Casa de Juanito al Oráculo
  → Oráculo de Juanito
  → Libro I, capítulo 1 «El Primer Grito»
```

La **Llave** abre Casa de Juanito, no los ocho lugares que continúan sellados. El visitante no necesita cuenta para guardar el avance temporal.

## 4. Cambio pendiente en PR #1: casa de Juanito

**Rama:** `fix/juanito-recorrido-oraculo`  
**PR:** https://github.com/ganadores2/juancoloraoleyendas/pull/1

- En `SiteJourney`, al finalizar descenso se transiciona a `hacia-oraculo`.
- En `CasaJuanitoScreen`, con `skipDescenso` ya se reprodujeron ambos videos; se presenta directamente el Oráculo, sin volver a reproducir el video.
- No modificar los videos, las imágenes, la llave, el capítulo ni los sitios sellados.
- **No fusionar sin pruebas humanas.**

### Prueba de aceptación antes de fusionar

- [ ] Desktop: `/bienvenida` reproduce saludo e invitación, y el micrófono abre el portal.
- [ ] Desktop: el portal lleva al Oráculo de Entrada mediante el vuelo, **sin saltar directamente al mapa**.
- [ ] Desktop: el Oráculo de Entrada permite encontrar la llave y abrir la Casa.
- [ ] Desktop: Casa de Juanito reproduce ambos MP4 **una sola vez cada uno**, luego muestra Oráculo y capítulo 1.
- [ ] Móvil Android/iPhone: reproducción automática o botón manual si el navegador la bloquea; no queda pantalla negra.
- [ ] Móvil: botones y texto visibles sin cortar la imagen ni tapar gestos.
- [ ] Navegación general solo después de la llave.
- [ ] Acceso directo a los ocho sitios sellados sigue bloqueado.
- [ ] `/libro/1/capitulo/1` puede abrirse desde el Oráculo, con su audio.
- [ ] Confirmar que el entorno preview con autenticación no impide las pruebas; no cambiar protección para forzar el acceso.

## 5. Próximas capas de la construcción (sin desplegar aún)

1. **Cerrar PR #1 tras pruebas**, para consolidar el camino Casa → Oráculo → Capítulo 1.
2. **Portada definitiva funcional**: conservar el trayecto `Comenzar aventura`; usar diseño oficial cuando esté aprobado; verificar responsividad sin botones dibujados inertes.
3. **Llave visual definitiva**: sustituir el icono de respaldo por el arte oficial, manteniendo intacta la lógica `findKey`, el Pase y los lugares sellados.
4. **Archivo del Viajero**: inventario visual del universo y personajes sin spoilers, nueva ruta aislada con pruebas previas.
5. **Audiolibros y revisión literaria** de libros II/III/IV después de finalizar los cimientos y auditar el canon.

## 6. Línea editorial: Esperanza

La escena literaria **«¿La habías perdido?»**, Oráculo de la Ceiba, fue aprobada por el autor el 30 de octubre de 2026 y se conserva como texto de desarrollo. **No aparecerá públicamente en el sitio ni se integrará en un libro** hasta decidir su ubicación, voz y contexto; esta aprobación **no autoriza cambiar el recorrido ni añadir secretos** a la web actual.

**Principio rector:** un mundo más grande sin perder el alma ni romper las puertas que ya abren.
