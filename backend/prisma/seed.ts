import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const ROOMS = [
  {
    slug: "habitacion-lago",
    name: "Habitación Lago",
    shortDescription: "Cocina propia y la tranquilidad de estar frente a la zona del lago.",
    description:
      "La Habitación Lago tiene cocina equipada e independiente, closet amplio y acceso a través de tarjeta de seguridad. Ideal para quienes prefieren cocinar en casa.",
    pricePerNight: 150000,
    capacityAdults: 2,
    capacityChildren: 1,
    beds: 1,
    sizeM2: 24,
    view: "Vista al parque",
    amenities: ["wifi", "tv", "ac", "bathroom", "closet", "cardAccess", "kitchen"],
    images: [
      "https://614-coliving.netlify.app/assets/brand/room-with-signage-614-coliving.webp",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=80"
    ],
    rating: 4.9,
    reviewsCount: 58,
    featured: true
  },
  {
    slug: "habitacion-aurora",
    name: "Habitación Aurora",
    shortDescription: "Cocina compacta, closet y luz natural durante todo el día.",
    description:
      "Un espacio cálido y funcional con cocina propia, ideal para quienes buscan independencia total durante su estadía. Incluye closet, baño privado y puerta con acceso por tarjeta.",
    pricePerNight: 160000,
    capacityAdults: 2,
    capacityChildren: 0,
    beds: 1,
    sizeM2: 22,
    view: "Vista interior",
    amenities: ["wifi", "tv", "ac", "bathroom", "closet", "cardAccess", "kitchen"],
    images: ["https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1600&q=80"],
    rating: 4.8,
    reviewsCount: 41,
    featured: true
  },
  {
    slug: "habitacion-bosque",
    name: "Habitación Bosque",
    shortDescription: "La más amplia, con cocina completa para hasta 3 huéspedes.",
    description:
      "Nuestra habitación con cocina más espaciosa. Perfecta para viajar en familia o con un compañero de trabajo, con dos camas, closet grande y acceso con tarjeta de seguridad.",
    pricePerNight: 175000,
    capacityAdults: 3,
    capacityChildren: 1,
    beds: 2,
    sizeM2: 26,
    view: "Vista interior",
    amenities: ["wifi", "tv", "ac", "bathroom", "closet", "cardAccess", "kitchen"],
    images: ["https://images.unsplash.com/photo-1618221469555-7f3ad97540d6?auto=format&fit=crop&w=1600&q=80"],
    rating: 4.9,
    reviewsCount: 37,
    featured: true
  },
  {
    slug: "habitacion-brisa",
    name: "Habitación Brisa",
    shortDescription: "Sin cocina, con acceso a la zona común y todo lo esencial.",
    description:
      "Compacta y funcional, sin cocina propia pero con acceso a la zona de lavandería. Incluye closet, baño privado y puerta con acceso por tarjeta de seguridad.",
    pricePerNight: 110000,
    capacityAdults: 2,
    capacityChildren: 0,
    beds: 1,
    sizeM2: 16,
    view: "Vista interior",
    amenities: ["wifi", "tv", "ac", "bathroom", "closet", "cardAccess"],
    images: ["https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1600&q=80"],
    rating: 4.6,
    reviewsCount: 29,
    featured: false
  },
  {
    slug: "habitacion-cielo",
    name: "Habitación Cielo",
    shortDescription: "La opción esencial: cómoda, segura y sin distracciones.",
    description:
      "Ideal para estadías cortas. Sin cocina propia, pero con acceso a todas las zonas comunes del edificio. Closet, baño privado y puerta con acceso por tarjeta de seguridad incluidos.",
    pricePerNight: 115000,
    capacityAdults: 2,
    capacityChildren: 0,
    beds: 1,
    sizeM2: 17,
    view: "Vista interior",
    amenities: ["wifi", "tv", "ac", "bathroom", "closet", "cardAccess"],
    images: ["https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1600&q=80"],
    rating: 4.5,
    reviewsCount: 22,
    featured: false
  }
];

const BLOG_POSTS = [
  {
    slug: "guia-nomada-digital-pereira",
    title: "Guía para nómadas digitales en Pereira",
    excerpt: "Los mejores rincones para trabajar, desconectar y hacer comunidad en la capital del Eje Cafetero.",
    content: "Pereira se ha convertido en un destino cada vez más popular para nómadas digitales gracias a su clima, su ubicación central en el Eje Cafetero y su costo de vida accesible...",
    coverImage: "https://images.unsplash.com/photo-1517840901100-8179e982acb7?auto=format&fit=crop&w=1600&q=80",
    author: "Equipo 6/14",
    category: "Estilo de vida",
    tags: ["nomadismo", "trabajo-remoto", "pereira"],
    readingMinutes: 6
  },
  {
    slug: "que-es-el-co-living",
    title: "¿Qué es el co-living y por qué está transformando los viajes?",
    excerpt: "Descubre cómo el modelo de co-living combina la independencia de un apartamento con la vida en comunidad.",
    content: "El co-living nace de la necesidad de crear espacios híbridos entre el hogar, la oficina y el alojamiento temporal...",
    coverImage: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1600&q=80",
    author: "Laura Méndez",
    category: "Co-living",
    tags: ["coliving", "comunidad"],
    readingMinutes: 5
  }
];

const PROMOTIONS = [
  {
    title: "Reserva anticipada -20%",
    description: "Reserva con 30 días de anticipación y obtén 20% de descuento en cualquier habitación.",
    discount: "20%",
    code: "ANTICIPA20",
    validUntil: new Date("2026-12-31"),
    image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "Descuento por varias noches",
    description: "Reserva 3 noches o más y obtén 15% de descuento adicional en tu tarifa por noche.",
    discount: "15%",
    code: "STAY3",
    validUntil: new Date("2026-12-31"),
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80"
  }
];

async function main() {
  console.log("Sembrando base de datos de 6/14 Co-Living...");

  const adminPassword = process.env.SEED_ADMIN_PASSWORD ?? "Admin614!";
  const hashed = await bcrypt.hash(adminPassword, 12);

  await prisma.user.upsert({
    where: { email: "admin@614coliving.com" },
    update: {},
    create: { name: "Administrador 6/14", email: "admin@614coliving.com", password: hashed, role: "ADMIN" }
  });

  for (const room of ROOMS) {
    await prisma.room.upsert({ where: { slug: room.slug }, update: room, create: room });
  }

  for (const post of BLOG_POSTS) {
    await prisma.blogPost.upsert({ where: { slug: post.slug }, update: post, create: post });
  }

  for (const promo of PROMOTIONS) {
    await prisma.promotion.upsert({ where: { code: promo.code }, update: promo, create: promo });
  }

  console.log(`Listo. Usuario admin: admin@614coliving.com / ${adminPassword}`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
