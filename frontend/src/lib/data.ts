import type { BlogPost, FaqItem, Promotion, Review, Room, ServiceItem } from "@/types";

export const HOTEL = {
  name: "6/14 Co-Living",
  legalName: "6/14 Co-Living S.A.S.",
  tagline: "Vive, comparte, pertenece.",
  description:
    "Un co-living de autor en Pereira: habitaciones privadas con acceso por tarjeta, cocina en algunas de ellas, a pasos del Parque Bolívar y de una estación de MegaBús. Alquiler solo por noches.",
  phone: "+57 300 614 6140",
  whatsapp: "573006146140",
  email: "hola@614coliving.com",
  address: "Carrera 6 # 13-76, Pereira, Risaralda, Colombia",
  checkIn: "15:00",
  checkOut: "12:00",
  mapEmbed: "https://www.google.com/maps?q=Carrera+6+%2313-76,+Pereira,+Risaralda,+Colombia&output=embed",
  petsAllowed: false,
  social: {
    instagram: "https://www.instagram.com/coliving.pereira?igsh=aW4wYmRnN3E0cGc3",
    facebook: "https://www.facebook.com/share/1VoxeeY413/?mibextid=wwXIfr"
  }
};

export const ROOMS: Room[] = [
  {
    id: "1",
    slug: "habitacion-lago",
    name: "Habitación Lago",
    shortDescription: "Cocina propia y la tranquilidad de estar frente a la zona del lago.",
    description:
      "La Habitación Lago tiene cocina equipada e independiente, closet amplio y acceso a través de tarjeta de seguridad. Ideal para quienes prefieren cocinar en casa.",
    pricePerNight: 150000,
    currency: "COP",
    capacityAdults: 2,
    capacityChildren: 1,
    beds: 1,
    sizeM2: 24,
    view: "Vista al parque",
    amenities: ["wifi", "tv", "ac", "bathroom", "closet", "cardAccess", "kitchen"],
    images: [
      "/assets/brand/room-with-signage-614-coliving.webp",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1600&q=80"
    ],
    rating: 4.9,
    reviewsCount: 58,
    featured: true
  },
  {
    id: "2",
    slug: "habitacion-aurora",
    name: "Habitación Aurora",
    shortDescription: "Cocina compacta, closet y luz natural durante todo el día.",
    description:
      "Un espacio cálido y funcional con cocina propia, ideal para quienes buscan independencia total durante su estadía. Incluye closet, baño privado y puerta con acceso por tarjeta.",
    pricePerNight: 160000,
    currency: "COP",
    capacityAdults: 2,
    capacityChildren: 0,
    beds: 1,
    sizeM2: 22,
    view: "Vista interior",
    amenities: ["wifi", "tv", "ac", "bathroom", "closet", "cardAccess", "kitchen"],
    images: [
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1595514535215-95f5487d1e3b?auto=format&fit=crop&w=1600&q=80"
    ],
    rating: 4.8,
    reviewsCount: 41,
    featured: true
  },
  {
    id: "3",
    slug: "habitacion-bosque",
    name: "Habitación Bosque",
    shortDescription: "La más amplia, con cocina completa para hasta 3 huéspedes.",
    description:
      "Nuestra habitación con cocina más espaciosa. Perfecta para viajar en familia o con un compañero de trabajo, con dos camas, closet grande y acceso con tarjeta de seguridad.",
    pricePerNight: 175000,
    currency: "COP",
    capacityAdults: 3,
    capacityChildren: 1,
    beds: 2,
    sizeM2: 26,
    view: "Vista interior",
    amenities: ["wifi", "tv", "ac", "bathroom", "closet", "cardAccess", "kitchen"],
    images: [
      "https://images.unsplash.com/photo-1618221469555-7f3ad97540d6?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1600&q=80"
    ],
    rating: 4.9,
    reviewsCount: 37,
    featured: true
  },
  {
    id: "4",
    slug: "habitacion-brisa",
    name: "Habitación Brisa",
    shortDescription: "Sin cocina, con acceso a la zona común y todo lo esencial.",
    description:
      "Compacta y funcional, sin cocina propia pero con acceso a la zona de lavandería. Incluye closet, baño privado y puerta con acceso por tarjeta de seguridad.",
    pricePerNight: 110000,
    currency: "COP",
    capacityAdults: 2,
    capacityChildren: 0,
    beds: 1,
    sizeM2: 16,
    view: "Vista interior",
    amenities: ["wifi", "tv", "ac", "bathroom", "closet", "cardAccess"],
    images: [
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1600&q=80"
    ],
    rating: 4.6,
    reviewsCount: 29,
    featured: false
  },
  {
    id: "5",
    slug: "habitacion-cielo",
    name: "Habitación Cielo",
    shortDescription: "La opción esencial: cómoda, segura y sin distracciones.",
    description:
      "Ideal para estadías cortas. Sin cocina propia, pero con acceso a todas las zonas comunes del edificio. Closet, baño privado y puerta con acceso por tarjeta de seguridad incluidos.",
    pricePerNight: 115000,
    currency: "COP",
    capacityAdults: 2,
    capacityChildren: 0,
    beds: 1,
    sizeM2: 17,
    view: "Vista interior",
    amenities: ["wifi", "tv", "ac", "bathroom", "closet", "cardAccess"],
    images: [
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1600&q=80"
    ],
    rating: 4.5,
    reviewsCount: 22,
    featured: false
  }
];

export const SERVICES: ServiceItem[] = [
  { icon: "Wifi", title: "Wifi de alta velocidad", description: "Fibra óptica en todas las habitaciones y zonas comunes, ideal para trabajo remoto." },
  { icon: "ChefHat", title: "Cocina en habitaciones seleccionadas", description: "3 de nuestras 5 habitaciones cuentan con cocina propia y equipada." },
  { icon: "WashingMachine", title: "Lavandería con monedero", description: "Zona de lavandería disponible para todos los huéspedes, sin necesidad de reservarla." },
  { icon: "ShieldCheck", title: "Seguridad con cámaras y tarjeta", description: "Acceso por tarjeta en cada habitación y sistema de cámaras privado en zonas comunes." },
  { icon: "MessageCircle", title: "Atención por chat", description: "No tenemos recepción presencial 24/7, pero te atendemos por chat en todo momento." },
  { icon: "Dumbbell", title: "Gimnasios recomendados cerca", description: "Te recomendamos los mejores gimnasios a pocos minutos caminando." }
];

export const PROMOTIONS: Promotion[] = [
  {
    id: "1",
    title: "Reserva anticipada -20%",
    description: "Reserva con 30 días de anticipación y obtén 20% de descuento en cualquier habitación.",
    discount: "20%",
    code: "ANTICIPA20",
    validUntil: "2026-12-31",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "2",
    title: "Descuento por varias noches",
    description: "Reserva 3 noches o más y obtén 15% de descuento adicional en tu tarifa por noche.",
    discount: "15%",
    code: "STAY3",
    validUntil: "2026-12-31",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "3",
    title: "Escapada de fin de semana",
    description: "Dos noches en una habitación con cocina desde $270.000 COP para dos personas.",
    discount: "10%",
    code: "WEEKEND10",
    validUntil: "2026-12-31",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80"
  }
];

export const REVIEWS: Review[] = [
  { id: "1", name: "Camila Restrepo", rating: 5, comment: "La cocina propia hizo toda la diferencia. Se siente como un apartamento, no como un hotel.", date: "2026-05-14", roomName: "Habitación Lago" },
  { id: "2", name: "James Whitfield", rating: 5, comment: "Perfect for remote work. Fast wifi, very quiet room, and the card access felt very secure.", date: "2026-04-02", roomName: "Habitación Brisa" },
  { id: "3", name: "Valentina Gómez", rating: 4.5, comment: "Me encantó la zona, muy tranquila y cerca del lago. La lavandería fue súper práctica.", date: "2026-03-21", roomName: "Habitación Aurora" },
  { id: "4", name: "Marco Belline", rating: 5, comment: "Great location in Pereira, very safe with the card access system. Would book again.", date: "2026-02-11", roomName: "Habitación Bosque" },
  { id: "5", name: "Ana Sofía Duarte", rating: 4.8, comment: "La atención por chat fue rápida siempre que la necesité. Volvería sin dudarlo.", date: "2026-01-30", roomName: "Habitación Cielo" }
];

export const FAQS: FaqItem[] = [
  { category: "Reservas", question: "¿Cómo puedo reservar una habitación?", answer: "Puedes reservar directamente desde nuestro sitio en la sección Reservas, eligiendo fechas, huéspedes y habitación. También puedes escribirnos por WhatsApp." },
  { category: "Reservas", question: "¿Puedo cancelar o modificar mi reserva?", answer: "Sí, puedes cancelar sin costo hasta 48 horas antes del check-in escribiéndonos por chat o WhatsApp." },
  { category: "Check-in", question: "¿Cuál es el horario de check-in y check-out?", answer: "El check-in es a partir de las 15:00 y el check-out hasta las 12:00. Podemos gestionar horarios flexibles según disponibilidad." },
  { category: "Políticas", question: "¿Aceptan mascotas?", answer: "No, no aceptamos mascotas en ninguna habitación. Es una política que mantenemos para el bienestar de todos los huéspedes." },
  { category: "Políticas", question: "¿Hay recepción las 24 horas?", answer: "No tenemos recepción presencial 24/7. Nuestro equipo te atiende por chat en todo momento para resolver cualquier necesidad." },
  { category: "Políticas", question: "¿Qué medidas de seguridad tienen?", answer: "Todas las habitaciones tienen acceso mediante tarjeta y contamos con un sistema de cámaras privado en las zonas comunes." },
  { category: "Servicios", question: "¿El wifi tiene algún costo adicional?", answer: "No, el wifi de alta velocidad está incluido en todas las habitaciones y zonas comunes sin costo adicional." },
  { category: "Servicios", question: "¿Todas las habitaciones tienen cocina?", answer: "Tenemos 3 habitaciones con cocina propia y equipada (Lago, Aurora y Bosque) y 2 sin cocina (Brisa y Cielo), con acceso a las zonas comunes." },
  { category: "Servicios", question: "¿Cómo funciona la lavandería?", answer: "Contamos con una zona de lavandería con monedero, disponible para todos los huéspedes sin necesidad de reservarla." },
  { category: "Turismo", question: "¿Qué atracciones hay cerca del alojamiento?", answer: "Estamos a pocos minutos de una estación de MegaBús y del Parque Bolívar, en el centro de Pereira, y a poco más de una hora de Salento, el Valle de Cocora y los termales de Santa Rosa de Cabal." },
  { category: "Reservas", question: "¿Puedo alquilar por mes?", answer: "No, el alojamiento solo se alquila por noches. No ofrecemos tarifas mensuales." },
  { category: "Pagos", question: "¿Qué métodos de pago aceptan?", answer: "Aceptamos tarjetas de crédito/débito, transferencias y pagos en línea a través de pasarelas seguras (Wompi, PayU, Stripe)." }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    slug: "guia-nomada-digital-pereira",
    title: "Guía para nómadas digitales en Pereira",
    excerpt: "Los mejores rincones para trabajar, desconectar y hacer comunidad en la capital del Eje Cafetero.",
    content: "Pereira se ha convertido en un destino cada vez más popular para nómadas digitales gracias a su clima, su ubicación central en el Eje Cafetero y su costo de vida accesible...",
    coverImage: "https://images.unsplash.com/photo-1517840901100-8179e982acb7?auto=format&fit=crop&w=1600&q=80",
    author: "Equipo 6/14",
    category: "Estilo de vida",
    tags: ["nomadismo", "trabajo-remoto", "pereira"],
    publishedAt: "2026-06-02",
    readingMinutes: 6
  },
  {
    id: "2",
    slug: "que-es-el-co-living",
    title: "¿Qué es el co-living y por qué está transformando los viajes?",
    excerpt: "Descubre cómo el modelo de co-living combina la independencia de un apartamento con la vida en comunidad.",
    content: "El co-living nace de la necesidad de crear espacios híbridos entre el hogar, la oficina y el alojamiento temporal...",
    coverImage: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1600&q=80",
    author: "Laura Méndez",
    category: "Co-living",
    tags: ["coliving", "comunidad"],
    publishedAt: "2026-05-18",
    readingMinutes: 5
  },
  {
    id: "3",
    slug: "explora-el-eje-cafetero-desde-pereira",
    title: "Explora el Eje Cafetero desde tu estadía en Pereira",
    excerpt: "Salento, el Valle de Cocora y los termales de Santa Rosa, todos a menos de una hora de tu habitación.",
    content: "Pereira es la puerta de entrada perfecta al Eje Cafetero. Desde nuestra ubicación puedes organizar excursiones de un día a algunos de los destinos más lindos de Colombia...",
    coverImage: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1600&q=80",
    author: "Equipo 6/14",
    category: "Turismo",
    tags: ["turismo", "eje-cafetero"],
    publishedAt: "2026-04-27",
    readingMinutes: 4
  },
  {
    id: "4",
    slug: "5-lugares-imperdibles-cerca-del-alojamiento",
    title: "5 lugares imperdibles a menos de 15 minutos",
    excerpt: "Desde el parque del lago hasta el centro histórico: así puedes aprovechar tu estadía en Pereira al máximo.",
    content: "Uno de los grandes beneficios de hospedarte en 6/14 Co-Living es la ubicación tranquila y bien conectada dentro de Pereira...",
    coverImage: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1600&q=80",
    author: "Carlos Peña",
    category: "Turismo",
    tags: ["turismo", "ciudad"],
    publishedAt: "2026-03-15",
    readingMinutes: 7
  }
];

export function getRoomBySlug(slug: string): Room | undefined {
  return ROOMS.find((room) => room.slug === slug);
}

export function getRelatedRooms(currentSlug: string, limit = 3): Room[] {
  return ROOMS.filter((room) => room.slug !== currentSlug).slice(0, limit);
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export function formatCurrency(amount: number, currency: "COP" | "USD" = "COP") {
  return new Intl.NumberFormat(currency === "COP" ? "es-CO" : "en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0
  }).format(amount);
}
