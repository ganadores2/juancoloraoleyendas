# Oráculo-GPT: piloto controlado (2026-11-23)

## Objetivo
Probar un primer Oráculo conversacional opcional, sin alterar el recorrido, la
lectura y audio de los 33 capítulos, el mapa, la llave temporal, el Guardián,
las áreas selladas ni la producción.

## Ubicación
- UI: `/laboratorio/oraculo-gpt`
- API: `POST /api/oraculo-gpt`
- Ambas rutas devuelven 404 en Vercel production (la API también evita responder).
- Cambio aislado en `feature/oraculo-gpt-piloto-20261123`, basado en rama preview.
- No modificar `main` ni fusionar sin revisión explícita.

## Configuración necesaria (solo Preview)
Configurar en Vercel por parte del titular, sin pegar valores en el chat:
- `OPENAI_API_KEY`: clave API de proyecto OpenAI, solo servidor.
- `ORACULO_OPENAI_MODEL`: identificador de modelo de Responses API habilitado para ese proyecto.
No hay IA real hasta que se configuren ambos. ChatGPT Plus NO sustituye la API.
No definir las variables en `NEXT_PUBLIC_` ni almacenarlas en el repositorio.

## Límites intencionales
- Solo lore público mínimo; no se inyectan libros completos ni materiales
  del Creador. El Oráculo no tiene acceso a la identidad del narrador.
- Hasta 12 mensajes por solicitud, 800 caracteres por mensaje, respuesta corta.
- 6 solicitudes/minuto/IP en memoria local del proceso (medida básica;
  NO garantiza limitación global en despliegues serverless).
- Sin base de datos, memoria persistente ni creación de perfiles.
- `store:false` en peticiones al proveedor; consultar sus condiciones de
  retención y procesamiento antes de publicar a visitantes.
- Los filtros de secretos basados en prompt no son defensa suficiente para
  incluir material privado. Por eso solo se utiliza contexto público.
- La misma página enlaza al Libro I y al mapa, sin forzar conversación.

## Pruebas manuales pendientes
1. Sin variables: mostrar 503 legible, nunca credenciales.
2. Con variables Preview: preguntar sobre capítulos y espejos.
3. Preguntar por llaves, áreas selladas o desenlaces: respuesta sin revelaciones.
4. Intentar inyección de instrucciones en pregunta: no cambiar reglas.
5. Verificar accesibilidad en móvil y teclado.
6. Verificar 404 de página y API bajo `VERCEL_ENV=production`.
7. Ejecutar `pnpm typecheck` y pruebas del repositorio antes de fusionar.
8. Revisar costos, rate limit distribuido, abuso y privacidad antes del lanzamiento público.

## Fases siguientes, sujetas a aprobación
- Banco de conocimiento editorial autorizado con control de spoilers por capítulo.
- Supabase u otro almacén para progreso/memoria SOLO con consentimiento.
- Oráculos por sitios, nunca exponiendo los ocho sitios sellados por defecto.
- Voz de personajes, opcional, con revisión de costos y derechos.
