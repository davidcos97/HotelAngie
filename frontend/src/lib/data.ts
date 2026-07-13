import type { BlogPost, FaqItem, Promotion, Review, Room, ServiceItem } from "@/types";

export const HOTEL = {
  name: "6/14 Co-Living",
  legalName: "6/14 Co-Living S.A.S.",
  tagline: "Vive, comparte, pertenece.",
  description:
    "Un co-living de autor donde el diseño, la comunidad y el confort se encuentran. Habitaciones privadas, espacios compartidos y una terraza que respira ciudad.",
  phone: "+57 300 614 6140",
  whatsapp: "573006146140",
  email: "hola@614coliving.com",
  address: "Carrera 14 # 6-14, El Poblado, Medellín, Colombia",
  checkIn: "15:00",
  checkOut: "12:00",
  mapEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.699!2d-75.5691!3d6.2087!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1",
  social: {
    instagram: "https://instagram.com/614coliving",
    facebook: "https://facebook.com/614coliving",
    youtube: "https://youtube.com/@614coliving"
  }
};

export const ROOMS: Room[] = [
  {
    id: "1",
    slug: "studio-dorado",
    name: "Studio Dorado",
    shortDescription: "Estudio privado con acabados cálidos y luz natural todo el día.",
    description:
      "El Studio Dorado combina líneas minimalistas con detalles en madera y latón. Ideal para estadías de trabajo remoto o escapadas en pareja, cuenta con zona de estar independiente y ventanal de piso a techo.",
    pricePerNight: 320000,
    currency: "COP",
    capacityAdults: 2,
    capacityChildren: 1,
    beds: 1,
    sizeM2: 28,
    view: "Vista ciudad",
    amenities: ["wifi", "tv", "netflix", "ac", "minibar", "safe", "bathroom", "desk"],
    images: [
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=80"
    ],
    rating: 4.8,
    reviewsCount: 132,
    featured: true
  },
  {
    id: "2",
    slug: "suite-skyline",
    name: "Suite Skyline",
    shortDescription: "Suite amplia con balcón privado y vistas panorámicas de la ciudad.",
    description:
      "Diseñada para quienes buscan espacio y una vista que enamora. La Suite Skyline incluye sala independiente, balcón privado con mobiliario de exterior y bañera exenta.",
    pricePerNight: 520000,
    currency: "COP",
    capacityAdults: 3,
    capacityChildren: 2,
    beds: 2,
    sizeM2: 42,
    view: "Vista panorámica",
    amenities: ["wifi", "tv", "netflix", "ac", "minibar", "safe", "bathroom", "balcony"],
    images: [
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1600&q=80"
    ],
    rating: 4.9,
    reviewsCount: 98,
    featured: true
  },
  {
    id: "3",
    slug: "loft-comunidad",
    name: "Loft Comunidad",
    shortDescription: "Loft co-living con cama queen y acceso preferente a zonas comunes.",
    description:
      "Pensado para nómadas digitales: el Loft Comunidad ofrece un espacio íntimo con acceso ilimitado al coworking, rooftop y eventos semanales de comunidad.",
    pricePerNight: 245000,
    currency: "COP",
    capacityAdults: 2,
    capacityChildren: 0,
    beds: 1,
    sizeM2: 22,
    view: "Vista patio interior",
    amenities: ["wifi", "tv", "ac", "safe", "bathroom", "coworking"],
    images: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1517840901100-8179e982acb7?auto=format&fit=crop&w=1600&q=80"
    ],
    rating: 4.7,
    reviewsCount: 76,
    featured: true
  },
  {
    id: "4",
    slug: "deluxe-vista-ciudad",
    name: "Deluxe Vista Ciudad",
    shortDescription: "Confort superior con mini bar curado y smart TV 55”.",
    description:
      "Una habitación deluxe con atención al detalle: ropa de cama de algodón egipcio, mini bar curado con productos locales y estación de café de especialidad.",
    pricePerNight: 385000,
    currency: "COP",
    capacityAdults: 2,
    capacityChildren: 1,
    beds: 1,
    sizeM2: 30,
    view: "Vista ciudad",
    amenities: ["wifi", "tv", "netflix", "ac", "minibar", "safe", "bathroom"],
    images: [
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80"
    ],
    rating: 4.6,
    reviewsCount: 54,
    featured: false
  },
  {
    id: "5",
    slug: "penthouse-6-14",
    name: "Penthouse 6/14",
    shortDescription: "La joya de la casa: piso completo con jacuzzi y terraza privada.",
    description:
      "Nuestro Penthouse ocupa el último piso: jacuzzi al aire libre, sala de estar con doble altura, cocina completa y terraza privada de 360°.",
    pricePerNight: 980000,
    currency: "COP",
    capacityAdults: 4,
    capacityChildren: 2,
    beds: 2,
    sizeM2: 78,
    view: "Vista 360°",
    amenities: ["wifi", "tv", "netflix", "ac", "minibar", "safe", "bathroom", "balcony", "jacuzzi", "kitchen"],
    images: [
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80"
    ],
    rating: 5.0,
    reviewsCount: 41,
    featured: true
  },
  {
    id: "6",
    slug: "standard-confort",
    name: "Standard Confort",
    shortDescription: "La opción esencial: todo lo necesario, sin distracciones.",
    description:
      "Compacta y funcional, ideal para viajeros de una noche o estadías cortas de trabajo. Incluye escritorio, wifi de alta velocidad y baño privado completo.",
    pricePerNight: 190000,
    currency: "COP",
    capacityAdults: 2,
    capacityChildren: 0,
    beds: 1,
    sizeM2: 18,
    view: "Vista interior",
    amenities: ["wifi", "tv", "ac", "safe", "bathroom", "desk"],
    images: [
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1600&q=80"
    ],
    rating: 4.5,
    reviewsCount: 63,
    featured: false
  }
];

export const SERVICES: ServiceItem[] = [
  { icon: "Wifi", title: "Wifi de alta velocidad", description: "Fibra óptica simétrica en todas las áreas, ideal para trabajo remoto." },
  { icon: "Waves", title: "Rooftop & piscina", description: "Piscina infinita en la terraza con vista a la ciudad, abierta hasta las 22:00." },
  { icon: "Laptop", title: "Coworking 24/7", description: "Sala de coworking con cabinas privadas, impresión y café ilimitado." },
  { icon: "UtensilsCrossed", title: "Restaurante & bar", description: "Cocina de autor y coctelería de firma con productos de proximidad." },
  { icon: "Dumbbell", title: "Gimnasio", description: "Equipado con máquinas de última generación y zona de yoga." },
  { icon: "Dog", title: "Pet friendly", description: "Tu mascota es bienvenida sin cargo adicional en habitaciones seleccionadas." },
  { icon: "ShieldCheck", title: "Recepción 24 horas", description: "Equipo disponible todo el día para lo que necesites." },
  { icon: "Car", title: "Parking & shuttle", description: "Parqueadero privado y shuttle al aeropuerto bajo reserva." }
];

export const PROMOTIONS: Promotion[] = [
  {
    id: "1",
    title: "Reserva anticipada -20%",
    description: "Reserva con 30 días de anticipación y obtén 20% de descuento en cualquier habitación.",
    discount: "20%",
    code: "ANTICIPA20",
    validUntil: "2026-12-31",
    image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "2",
    title: "Tarifa co-living mensual",
    description: "Quédate 30 noches o más y accede a nuestra tarifa comunidad con 35% de ahorro.",
    discount: "35%",
    code: "COLIVING30",
    validUntil: "2026-12-31",
    image: "https://images.unsplash.com/photo-1517840901100-8179e982acb7?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "3",
    title: "Escapada de fin de semana",
    description: "Dos noches + desayuno + acceso rooftop desde $580.000 COP para dos personas.",
    discount: "15%",
    code: "WEEKEND15",
    validUntil: "2026-12-31",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
  }
];

export const REVIEWS: Review[] = [
  { id: "1", name: "Camila Restrepo", rating: 5, comment: "El mejor co-living en el que me he quedado. La comunidad, el rooftop y el café son increíbles.", date: "2026-05-14", roomName: "Studio Dorado" },
  { id: "2", name: "James Whitfield", rating: 5, comment: "Perfect for remote work. Fast wifi, quiet coworking space, and the staff is incredibly attentive.", date: "2026-04-02", roomName: "Loft Comunidad" },
  { id: "3", name: "Valentina Gómez", rating: 4.5, comment: "La Suite Skyline superó mis expectativas. El balcón con esa vista vale cada peso.", date: "2026-03-21", roomName: "Suite Skyline" },
  { id: "4", name: "Marco Belline", rating: 5, comment: "Design impeccable, staff warm, rooftop pool at sunset is unforgettable.", date: "2026-02-11", roomName: "Penthouse 6/14" },
  { id: "5", name: "Ana Sofía Duarte", rating: 4.8, comment: "Volví por tercera vez. Se siente como llegar a casa, pero con lujo hotelero.", date: "2026-01-30", roomName: "Deluxe Vista Ciudad" }
];

export const FAQS: FaqItem[] = [
  { category: "Reservas", question: "¿Cómo puedo reservar una habitación?", answer: "Puedes reservar directamente desde nuestro sitio en la sección Reservas, eligiendo fechas, huéspedes y habitación. También puedes escribirnos por WhatsApp." },
  { category: "Reservas", question: "¿Puedo cancelar o modificar mi reserva?", answer: "Sí, puedes cancelar sin costo hasta 48 horas antes del check-in desde tu panel de reserva o contactando a recepción." },
  { category: "Check-in", question: "¿Cuál es el horario de check-in y check-out?", answer: "El check-in es a partir de las 15:00 y el check-out hasta las 12:00. Podemos gestionar horarios flexibles según disponibilidad." },
  { category: "Políticas", question: "¿Aceptan mascotas?", answer: "Sí, somos pet-friendly en habitaciones seleccionadas sin costo adicional. Te pedimos avisarnos al reservar." },
  { category: "Servicios", question: "¿El wifi tiene algún costo adicional?", answer: "No, el wifi de alta velocidad está incluido en todas las habitaciones y zonas comunes sin costo adicional." },
  { category: "Servicios", question: "¿Tienen parqueadero?", answer: "Contamos con parqueadero privado con cupos limitados; recomendamos confirmarlo al momento de tu reserva." },
  { category: "Restaurante", question: "¿Cuál es el horario del restaurante?", answer: "Nuestro restaurante abre de 7:00 a 22:00, con servicio a la habitación disponible las 24 horas." },
  { category: "Eventos", question: "¿Puedo organizar un evento privado en el hotel?", answer: "Sí, contamos con espacios para eventos corporativos y sociales de hasta 60 personas. Escríbenos para cotizar." },
  { category: "Turismo", question: "¿Qué atracciones hay cerca del hotel?", answer: "Estamos a 5 minutos del Parque Lleras, 10 minutos del Museo de Arte Moderno y 20 minutos del Pueblito Paisa." },
  { category: "Pagos", question: "¿Qué métodos de pago aceptan?", answer: "Aceptamos tarjetas de crédito/débito, transferencias y pagos en línea a través de pasarelas seguras (Wompi, PayU, Stripe)." }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    slug: "guia-nomada-digital-medellin",
    title: "Guía para nómadas digitales en Medellín",
    excerpt: "Los mejores rincones para trabajar, desconectar y hacer comunidad en la ciudad de la eterna primavera.",
    content: "Medellín se ha convertido en uno de los destinos favoritos para nómadas digitales de todo el mundo...",
    coverImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80",
    author: "Equipo 6/14",
    category: "Estilo de vida",
    tags: ["nomadismo", "coworking", "medellin"],
    publishedAt: "2026-06-02",
    readingMinutes: 6
  },
  {
    id: "2",
    slug: "que-es-el-co-living",
    title: "¿Qué es el co-living y por qué está transformando los viajes?",
    excerpt: "Descubre cómo el modelo de co-living combina lo mejor del hotel boutique con la vida en comunidad.",
    content: "El co-living nace de la necesidad de crear espacios híbridos entre el hogar, la oficina y el hotel...",
    coverImage: "https://images.unsplash.com/photo-1517840901100-8179e982acb7?auto=format&fit=crop&w=1600&q=80",
    author: "Laura Méndez",
    category: "Co-living",
    tags: ["coliving", "comunidad"],
    publishedAt: "2026-05-18",
    readingMinutes: 5
  },
  {
    id: "3",
    slug: "eventos-rooftop-verano",
    title: "Eventos en nuestro rooftop este verano",
    excerpt: "Cine al aire libre, noches de jazz y clases de yoga al amanecer: así se vive el verano en 6/14.",
    content: "Cada fin de semana activamos nuestra terraza con experiencias diseñadas para huéspedes y comunidad local...",
    coverImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
    author: "Equipo 6/14",
    category: "Eventos",
    tags: ["rooftop", "eventos"],
    publishedAt: "2026-04-27",
    readingMinutes: 4
  },
  {
    id: "4",
    slug: "5-lugares-imperdibles-cerca-del-hotel",
    title: "5 lugares imperdibles a menos de 15 minutos",
    excerpt: "Desde mercados de autor hasta miradores secretos: así puedes aprovechar tu estadía al máximo.",
    content: "Uno de los grandes beneficios de hospedarte en 6/14 Co-Living es la ubicación privilegiada...",
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
