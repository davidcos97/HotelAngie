import Image from "next/image";
import Link from "next/link";
import { Users, BedDouble, Maximize } from "lucide-react";
import type { Room } from "@/types";
import StarRating from "@/components/shared/StarRating";
import CurrencyPrice from "@/components/shared/CurrencyPrice";

export default function RoomCard({ room, index = 0 }: { room: Room; index?: number }) {
  return (
    <article className="card-elevated group overflow-hidden">
      <Link href={`/habitaciones/${room.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={room.images[0]!}
            alt={`${room.name} — ${room.shortDescription}`}
            fill
            sizes="(min-width: 1024px) 33vw, 100vw"
            priority={index < 3}
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-charcoal-950/60 to-transparent" />
          {room.featured && (
            <span className="absolute left-4 top-4 rounded-full bg-gold-gradient px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-charcoal-950">
              Destacada
            </span>
          )}
          <div className="absolute bottom-3 left-4 flex items-center gap-1.5 text-white">
            <StarRating rating={room.rating} />
            <span className="text-xs font-medium">{room.rating.toFixed(1)}</span>
          </div>
        </div>
      </Link>

      <div className="p-5">
        <Link href={`/habitaciones/${room.slug}`}>
          <h3 className="font-display text-xl font-semibold text-charcoal-950 transition-colors group-hover:text-gold-700">
            {room.name}
          </h3>
        </Link>
        <p className="mt-1.5 line-clamp-2 text-sm text-charcoal-700/75">{room.shortDescription}</p>

        <div className="mt-4 flex items-center gap-4 text-xs text-charcoal-700/70">
          <span className="flex items-center gap-1">
            <Users size={14} /> {room.capacityAdults + room.capacityChildren} huéspedes
          </span>
          <span className="flex items-center gap-1">
            <BedDouble size={14} /> {room.beds} {room.beds > 1 ? "camas" : "cama"}
          </span>
          <span className="flex items-center gap-1">
            <Maximize size={14} /> {room.sizeM2} m²
          </span>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-charcoal-900/5 pt-4">
          <div>
            <CurrencyPrice copAmount={room.pricePerNight} className="font-display text-lg font-semibold text-charcoal-950" />
            <span className="text-xs text-charcoal-700/60"> / noche</span>
          </div>
          <Link href={`/reservas?room=${room.slug}`} className="btn-primary !px-5 !py-2.5 text-xs">
            Reservar
          </Link>
        </div>
      </div>
    </article>
  );
}
