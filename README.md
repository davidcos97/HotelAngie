# 6/14 Co-Living

Sitio web premium para **6/14 Co-Living** (Medellín): Next.js + TailwindCSS en el frontend, Node/Express + PostgreSQL (Prisma) en el backend, con panel administrativo, sistema de reservas, chatbot con respuestas instantáneas y WhatsApp flotante.

Paleta de marca: **blanco / gris (charcoal) / dorado**, inspirada en el logo circular con casitas y el wordmark "6/14 CO-LIVING".

## Estructura del proyecto

```text
hotel-web/
├── frontend/                  Next.js 14 (App Router) + TypeScript + TailwindCSS
│   ├── src/app/(site)/        Páginas públicas (Home, Habitaciones, Reservas, Blog, etc.)
│   ├── src/app/admin/         Panel administrativo (login + dashboard, layout raíz propio)
│   ├── src/components/        Componentes por dominio (home, rooms, booking, blog, admin, shared)
│   ├── src/lib/                Datos de ejemplo, cliente API, utilidades
│   └── public/assets/logo/    Logo recreado en SVG (emblema + wordmark + lockup)
│
├── backend/                   API REST modular (Express + Prisma + PostgreSQL)
│   ├── src/modules/           auth, rooms, bookings, blog, contact, reviews, promotions, users, admin
│   ├── src/middleware/        JWT auth, rate limiting, validación (zod), manejo de errores
│   └── prisma/                schema.prisma + seed.ts
│
├── database/                  (gestionada por Prisma migrations; ver backend/prisma)
├── uploads/                   Carpeta reservada para subida de imágenes futuras
├── docs/                      Notas de arquitectura
├── docker-compose.yml
└── README.md
```

## Requisitos

- Node.js 20+
- PostgreSQL 16 (o usar el `docker-compose.yml` incluido)

## Puesta en marcha (desarrollo local)

### 1. Backend

```bash
cd backend
cp .env.example .env       # ajusta DATABASE_URL y JWT_SECRET
npm install
npm run prisma:migrate     # crea las tablas
npm run seed                # crea habitaciones, blog, promociones y el usuario admin
npm run dev                  # http://localhost:4000
```

Usuario admin creado por el seed: `admin@614coliving.com` / `Admin614!` (o el valor de `SEED_ADMIN_PASSWORD`).

### 2. Frontend

```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev                  # http://localhost:3000
```

Panel administrativo: `http://localhost:3000/admin/login`

### 3. Con Docker (Postgres + backend + frontend)

```bash
docker compose up --build
docker compose exec backend npm run seed   # una sola vez
```

## Estado actual de la integración

- **Panel administrativo, reservas y formularios** (contacto, reseñas, comentarios de blog) están conectados en vivo a la API real (`NEXT_PUBLIC_API_URL`).
- **Páginas públicas de contenido** (listado de habitaciones, blog, promociones) usan datos de ejemplo en `frontend/src/lib/data.ts` para garantizar que el sitio se vea completo sin depender de que el backend esté corriendo. Los slugs coinciden con el seed del backend, así que migrar cada página a `api.get(...)` es un cambio acotado cuando quieras que todo el contenido sea 100% dinámico.
- El calendario de disponibilidad y el buscador de habitaciones ya llaman a la API real; si el backend no está corriendo, degradan sin romper la UI (muestran "sin datos" en vez de fallar).

## Funcionalidades incluidas

- Diseño responsive, animaciones (Framer Motion), glassmorphism sutil, paleta blanco/gris/dorado.
- Home con hero, buscador, promociones, habitaciones destacadas, servicios, restaurante/piscina/eventos, galería con lightbox, reseñas + formulario para dejar opinión, ubicación con mapa, blog, FAQ y contacto.
- Habitaciones: listado con filtros, detalle con galería, calendario de disponibilidad, servicios y habitaciones relacionadas.
- Reservas: asistente por pasos (fechas → extras → datos del huésped → confirmación) con cálculo automático de subtotal, impuestos (19%) y total.
- Blog con búsqueda, categorías, comentarios y compartir en redes.
- Chatbot con motor de reglas (palabras clave) + fallback automático a WhatsApp cuando no reconoce la pregunta.
- Botón flotante de WhatsApp con mensaje sugerido.
- Panel admin: login JWT, dashboard con estadísticas, CRUD de habitaciones/blog/promociones, gestión de reservas y opiniones, usuarios.
- SEO: metadata por página, Open Graph dinámico (`opengraph-image.tsx`), JSON-LD (Hotel, HotelRoom, FAQPage, BreadcrumbList), sitemap.xml y robots.txt generados.
- Seguridad backend: Helmet, CORS restringido, rate limiting por ruta sensible, JWT, contraseñas con bcrypt, validación de entrada con Zod.

## Próximos pasos sugeridos (fuera del alcance de esta primera entrega)

- Integrar pasarela de pago real (Wompi / PayU / Stripe) en el paso final de reservas.
- Reemplazar el chatbot de reglas por un motor con LLM (ej. API de Claude) manteniendo el fallback a WhatsApp.
- Internacionalización completa ES/EN (ya existe el toggle de moneda COP/USD como base).
- Reemplazar los datos de ejemplo de las páginas públicas por llamadas directas a la API para contenido 100% dinámico.
- Subida de imágenes desde el panel admin hacia `uploads/` o un bucket S3/Cloudinary.
