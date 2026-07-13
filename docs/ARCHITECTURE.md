# Arquitectura

## Frontend (`frontend/`)

- **Next.js 14, App Router, TypeScript, TailwindCSS.**
- Dos layouts raíz independientes (patrón *multi-root-layout*):
  - `src/app/(site)/layout.tsx` — sitio público: Header, Footer, WhatsApp flotante, Chatbot.
  - `src/app/admin/layout.tsx` — panel administrativo: sin chrome público, protegido por `AdminGuard` dentro de `src/app/admin/(panel)/layout.tsx`.
- `src/lib/api.ts` centraliza el `fetch` hacia el backend, inyecta el JWT desde `localStorage` y normaliza errores.
- `src/context/CurrencyContext.tsx` maneja el toggle COP/USD usado en toda la app (`useCurrency`, `CurrencyPrice`).
- Componentes organizados por dominio: `components/home`, `components/rooms`, `components/booking`, `components/blog`, `components/admin`, `components/shared`.

## Backend (`backend/`)

Arquitectura modular por dominio (controller → service → prisma), sin lógica de negocio en las rutas:

```
src/modules/<dominio>/
  <dominio>.routes.ts       Definición de endpoints + middlewares
  <dominio>.controller.ts   Recibe request/response, delega al service
  <dominio>.service.ts      Lógica de negocio y acceso a datos (Prisma)
  <dominio>.schema.ts        Validación de entrada (Zod)
```

- `config/env.ts` centraliza variables de entorno con valores por defecto seguros para desarrollo.
- `middleware/auth.middleware.ts` implementa `requireAuth` (verifica JWT) y `requireRole` (autorización por rol ADMIN/STAFF).
- `middleware/rateLimit.middleware.ts` define límites distintos para rutas generales, login y formularios públicos (contacto/reseñas/comentarios).
- El cálculo de precios de una reserva (`bookings.service.ts`) se recalcula siempre en el servidor a partir del catálogo de extras (`extras.data.ts`), nunca se confía en el total enviado por el cliente.
- `prisma/schema.prisma` es la única fuente de verdad del modelo de datos; `prisma/seed.ts` crea contenido de ejemplo y el usuario admin inicial.

## Decisiones notables

- **Datos de ejemplo vs. API real**: las páginas públicas de contenido (habitaciones, blog) usan `frontend/src/lib/data.ts` para que el sitio se vea completo de inmediato. El panel admin, las reservas y los formularios sí hablan con la API real. Ver "Próximos pasos" en el README raíz.
- **Sin ORM alternativo**: se eligió Prisma por generar tipos TypeScript automáticamente a partir del schema, reduciendo desincronización entre la base de datos y el código.
- **JWT sin refresh tokens**: para esta primera entrega el token expira en 7 días (configurable); un sistema de refresh tokens quedaría como mejora futura si se requiere revocación más granular.
