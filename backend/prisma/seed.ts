import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const ROOMS = [
  {
    slug: "studio-dorado",
    name: "Studio Dorado",
    shortDescription: "Estudio privado con acabados cálidos y luz natural todo el día.",
    description:
      "El Studio Dorado combina líneas minimalistas con detalles en madera y latón. Ideal para estadías de trabajo remoto o escapadas en pareja.",
    pricePerNight: 320000,
    capacityAdults: 2,
    capacityChildren: 1,
    beds: 1,
    sizeM2: 28,
    view: "Vista ciudad",
    amenities: ["wifi", "tv", "netflix", "ac", "minibar", "safe", "bathroom", "desk"],
    images: [
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80"
    ],
    rating: 4.8,
    reviewsCount: 132,
    featured: true
  },
  {
    slug: "suite-skyline",
    name: "Suite Skyline",
    shortDescription: "Suite amplia con balcón privado y vistas panorámicas de la ciudad.",
    description: "Diseñada para quienes buscan espacio y una vista que enamora, con balcón privado y bañera exenta.",
    pricePerNight: 520000,
    capacityAdults: 3,
    capacityChildren: 2,
    beds: 2,
    sizeM2: 42,
    view: "Vista panorámica",
    amenities: ["wifi", "tv", "netflix", "ac", "minibar", "safe", "bathroom", "balcony"],
    images: ["https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1600&q=80"],
    rating: 4.9,
    reviewsCount: 98,
    featured: true
  },
  {
    slug: "loft-comunidad",
    name: "Loft Comunidad",
    shortDescription: "Loft co-living con cama queen y acceso preferente a zonas comunes.",
    description: "Pensado para nómadas digitales, con acceso ilimitado al coworking, rooftop y eventos semanales de comunidad.",
    pricePerNight: 245000,
    capacityAdults: 2,
    capacityChildren: 0,
    beds: 1,
    sizeM2: 22,
    view: "Vista patio interior",
    amenities: ["wifi", "tv", "ac", "safe", "bathroom", "coworking"],
    images: ["https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=80"],
    rating: 4.7,
    reviewsCount: 76,
    featured: true
  },
  {
    slug: "deluxe-vista-ciudad",
    name: "Deluxe Vista Ciudad",
    shortDescription: "Confort superior con mini bar curado y smart TV 55”.",
    description: "Ropa de cama de algodón egipcio, mini bar curado y estación de café de especialidad.",
    pricePerNight: 385000,
    capacityAdults: 2,
    capacityChildren: 1,
    beds: 1,
    sizeM2: 30,
    view: "Vista ciudad",
    amenities: ["wifi", "tv", "netflix", "ac", "minibar", "safe", "bathroom"],
    images: ["https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1600&q=80"],
    rating: 4.6,
    reviewsCount: 54,
    featured: false
  },
  {
    slug: "penthouse-6-14",
    name: "Penthouse 6/14",
    shortDescription: "La joya de la casa: piso completo con jacuzzi y terraza privada.",
    description: "Jacuzzi al aire libre, sala de estar con doble altura, cocina completa y terraza privada de 360°.",
    pricePerNight: 980000,
    capacityAdults: 4,
    capacityChildren: 2,
    beds: 2,
    sizeM2: 78,
    view: "Vista 360°",
    amenities: ["wifi", "tv", "netflix", "ac", "minibar", "safe", "bathroom", "balcony", "jacuzzi", "kitchen"],
    images: ["https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1600&q=80"],
    rating: 5.0,
    reviewsCount: 41,
    featured: true
  },
  {
    slug: "standard-confort",
    name: "Standard Confort",
    shortDescription: "La opción esencial: todo lo necesario, sin distracciones.",
    description: "Compacta y funcional, ideal para viajeros de una noche o estadías cortas de trabajo.",
    pricePerNight: 190000,
    capacityAdults: 2,
    capacityChildren: 0,
    beds: 1,
    sizeM2: 18,
    view: "Vista interior",
    amenities: ["wifi", "tv", "ac", "safe", "bathroom", "desk"],
    images: ["https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1600&q=80"],
    rating: 4.5,
    reviewsCount: 63,
    featured: false
  }
];

const BLOG_POSTS = [
  {
    slug: "guia-nomada-digital-medellin",
    title: "Guía para nómadas digitales en Medellín",
    excerpt: "Los mejores rincones para trabajar, desconectar y hacer comunidad en la ciudad de la eterna primavera.",
    content: "Medellín se ha convertido en uno de los destinos favoritos para nómadas digitales de todo el mundo...",
    coverImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80",
    author: "Equipo 6/14",
    category: "Estilo de vida",
    tags: ["nomadismo", "coworking", "medellin"],
    readingMinutes: 6
  },
  {
    slug: "que-es-el-co-living",
    title: "¿Qué es el co-living y por qué está transformando los viajes?",
    excerpt: "Descubre cómo el modelo de co-living combina lo mejor del hotel boutique con la vida en comunidad.",
    content: "El co-living nace de la necesidad de crear espacios híbridos entre el hogar, la oficina y el hotel...",
    coverImage: "https://images.unsplash.com/photo-1517840901100-8179e982acb7?auto=format&fit=crop&w=1600&q=80",
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
    title: "Tarifa co-living mensual",
    description: "Quédate 30 noches o más y accede a nuestra tarifa comunidad con 35% de ahorro.",
    discount: "35%",
    code: "COLIVING30",
    validUntil: new Date("2026-12-31"),
    image: "https://images.unsplash.com/photo-1517840901100-8179e982acb7?auto=format&fit=crop&w=1200&q=80"
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
