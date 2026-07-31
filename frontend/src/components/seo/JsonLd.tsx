import { HOTEL } from "@/lib/data";

export default function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Hotel",
    name: HOTEL.name,
    description: HOTEL.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: HOTEL.address,
      addressLocality: "Pereira",
      addressRegion: "Risaralda",
      addressCountry: "CO"
    },
    telephone: HOTEL.phone,
    email: HOTEL.email,
    checkinTime: HOTEL.checkIn,
    checkoutTime: HOTEL.checkOut,
    sameAs: [HOTEL.social.instagram, HOTEL.social.facebook, HOTEL.social.youtube],
    priceRange: "$$"
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function RoomJsonLd({ room }: { room: { name: string; description: string; images: string[]; pricePerNight: number } }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "HotelRoom",
    name: room.name,
    description: room.description,
    image: room.images,
    offers: {
      "@type": "Offer",
      priceCurrency: "COP",
      price: room.pricePerNight
    }
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function FaqJsonLd({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer }
    }))
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; url: string }[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
