import { FAQS, HOTEL, ROOMS, formatCurrency } from "@/lib/data";

export interface ChatAnswer {
  text: string;
  matched: boolean;
}

const KNOWLEDGE_BASE: { keywords: string[]; answer: string }[] = [
  ...FAQS.map((faq) => ({
    keywords: `${faq.question} ${faq.category}`.toLowerCase().split(/\W+/).filter(Boolean),
    answer: faq.answer
  })),
  {
    keywords: ["precio", "precios", "tarifa", "tarifas", "cuanto", "cuesta", "vale"],
    answer: `Nuestras habitaciones van desde ${formatCurrency(Math.min(...ROOMS.map((r) => r.pricePerNight)))} hasta ${formatCurrency(
      Math.max(...ROOMS.map((r) => r.pricePerNight))
    )} por noche, según la categoría. ¿Quieres que te recomiende una según tu presupuesto?`
  },
  {
    keywords: ["disponibilidad", "disponible", "fechas", "libre"],
    answer: "Puedes consultar disponibilidad en tiempo real desde la sección Reservas, eligiendo tus fechas y número de huéspedes."
  },
  {
    keywords: ["ubicacion", "ubicación", "direccion", "dirección", "donde", "queda"],
    answer: `Estamos en ${HOTEL.address}, muy cerca del Parque Bolívar y de una estación de MegaBús, en el centro de Pereira.`
  },
  {
    keywords: ["hola", "buenas", "buenos", "hey"],
    answer: `¡Hola! Soy el asistente virtual de ${HOTEL.name}. Puedo ayudarte con disponibilidad, precios, servicios, check-in/check-out, mascotas y más. ¿Qué necesitas?`
  },
  {
    keywords: ["gracias", "genial", "perfecto"],
    answer: "¡Con gusto! Si necesitas algo más, aquí estoy."
  },
  {
    keywords: ["uber", "transporte", "taxi", "taxis", "turismo", "excursion", "excursión", "pasear"],
    answer: "Tenemos un botón de Transporte y Turismo (junto al de WhatsApp) con información sobre Uber, taxis y recomendaciones para conocer el Eje Cafetero desde Pereira."
  },
  {
    keywords: ["sugerencia", "sugerencias", "queja", "comentario", "feedback"],
    answer: "Puedes dejarnos tu sugerencia desde el botón de Sugerencias que está flotando en la pantalla, o escribirnos directamente por WhatsApp."
  }
];

function score(input: string, keywords: string[]): number {
  const tokens = input.toLowerCase().split(/\W+/).filter(Boolean);
  return tokens.filter((t) => keywords.includes(t)).length;
}

export function getChatAnswer(input: string): ChatAnswer {
  let best = { answer: "", score: 0 };

  for (const entry of KNOWLEDGE_BASE) {
    const s = score(input, entry.keywords);
    if (s > best.score) best = { answer: entry.answer, score: s };
  }

  if (best.score > 0) {
    return { text: best.answer, matched: true };
  }

  return {
    text:
      "No tengo esa información a la mano todavía. Te conecto directamente con nuestro equipo por WhatsApp para ayudarte mejor.",
    matched: false
  };
}
