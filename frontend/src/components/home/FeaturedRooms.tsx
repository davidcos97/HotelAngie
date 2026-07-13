import Link from "next/link";
import { ROOMS } from "@/lib/data";
import RoomCard from "@/components/rooms/RoomCard";
import SectionHeading from "@/components/shared/SectionHeading";
import ScrollReveal from "@/components/shared/ScrollReveal";

export default function FeaturedRooms() {
  const featured = ROOMS.filter((r) => r.featured).slice(0, 3);

  return (
    <section className="bg-charcoal-50/40 py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading label="Alojamiento" title="Habitaciones destacadas" description="Cada espacio diseñado para descansar, trabajar y crear comunidad." />
          <Link href="/habitaciones" className="btn-outline">
            Ver todas las habitaciones
          </Link>
        </div>

        <div className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((room, i) => (
            <ScrollReveal key={room.id} delay={i * 0.1}>
              <RoomCard room={room} index={i} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
