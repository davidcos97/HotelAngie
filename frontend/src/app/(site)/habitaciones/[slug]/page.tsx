import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Users, BedDouble, Maximize, Eye } from "lucide-react";
import { ROOMS, getRoomBySlug, getRelatedRooms } from "@/lib/data";
import { AMENITY_MAP } from "@/lib/amenities";
import Gallery from "@/components/shared/Gallery";
import StarRating from "@/components/shared/StarRating";
import CurrencyPrice from "@/components/shared/CurrencyPrice";
import RoomCard from "@/components/rooms/RoomCard";
import AvailabilityCalendar from "@/components/rooms/AvailabilityCalendar";
import ScrollReveal from "@/components/shared/ScrollReveal";
import { RoomJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export function generateStaticParams() {
  return ROOMS.map((room) => ({ slug: room.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const room = getRoomBySlug(params.slug);
  if (!room) return {};
  return {
    title: room.name,
    description: room.shortDescription,
    alternates: { canonical: `/habitaciones/${room.slug}` },
    openGraph: { images: [{ url: room.images[0]! }] }
  };
}

export default function RoomDetailPage({ params }: { params: { slug: string } }) {
  const room = getRoomBySlug(params.slug);
  if (!room) notFound();

  const related = getRelatedRooms(room.slug);

  return (
    <div className="pb-24 pt-28">
      <RoomJsonLd room={room} />
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", url: "/" },
          { name: "Habitaciones", url: "/habitaciones" },
          { name: room.name, url: `/habitaciones/${room.slug}` }
        ]}
      />

      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <nav className="mb-6 text-xs text-charcoal-700/60" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-gold-700">Inicio</Link> / <Link href="/habitaciones" className="hover:text-gold-700">Habitaciones</Link> / <span className="text-charcoal-950">{room.name}</span>
        </nav>

        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="section-title">{room.name}</h1>
            <div className="mt-2 flex items-center gap-2">
              <StarRating rating={room.rating} />
              <span className="text-sm text-charcoal-700/70">{room.rating.toFixed(1)} ({room.reviewsCount} reseñas)</span>
            </div>
          </div>
          <div className="text-right">
            <CurrencyPrice copAmount={room.pricePerNight} className="font-display text-3xl font-semibold text-charcoal-950" />
            <p className="text-xs text-charcoal-700/60">por noche, impuestos no incluidos</p>
          </div>
        </div>

        <div className="mt-8">
          <Gallery images={room.images.map((src) => ({ src, alt: room.name }))} />
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <p className="text-base leading-relaxed text-charcoal-700/85">{room.description}</p>

            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="rounded-xl border border-charcoal-900/5 p-4 text-center">
                <Users className="mx-auto mb-1.5 text-gold-600" size={20} />
                <p className="text-sm font-semibold text-charcoal-950">{room.capacityAdults + room.capacityChildren}</p>
                <p className="text-xs text-charcoal-700/60">Huéspedes</p>
              </div>
              <div className="rounded-xl border border-charcoal-900/5 p-4 text-center">
                <BedDouble className="mx-auto mb-1.5 text-gold-600" size={20} />
                <p className="text-sm font-semibold text-charcoal-950">{room.beds}</p>
                <p className="text-xs text-charcoal-700/60">{room.beds > 1 ? "Camas" : "Cama"}</p>
              </div>
              <div className="rounded-xl border border-charcoal-900/5 p-4 text-center">
                <Maximize className="mx-auto mb-1.5 text-gold-600" size={20} />
                <p className="text-sm font-semibold text-charcoal-950">{room.sizeM2} m²</p>
                <p className="text-xs text-charcoal-700/60">Tamaño</p>
              </div>
              <div className="rounded-xl border border-charcoal-900/5 p-4 text-center">
                <Eye className="mx-auto mb-1.5 text-gold-600" size={20} />
                <p className="text-sm font-semibold text-charcoal-950">{room.view}</p>
                <p className="text-xs text-charcoal-700/60">Vista</p>
              </div>
            </div>

            <h2 className="mt-10 font-display text-2xl font-semibold text-charcoal-950">Servicios incluidos</h2>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {room.amenities.map((key) => {
                const amenity = AMENITY_MAP[key];
                if (!amenity) return null;
                const Icon = amenity.icon;
                return (
                  <div key={key} className="flex items-center gap-2.5 rounded-xl bg-charcoal-50/60 px-3.5 py-3 text-sm text-charcoal-800">
                    <Icon size={17} className="text-gold-600" /> {amenity.label}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-6">
            <div className="card-elevated p-6">
              <p className="mb-4 text-sm text-charcoal-700/75">Reserva esta habitación con confirmación inmediata.</p>
              <Link href={`/reservas?room=${room.slug}`} className="btn-gold w-full">
                Reservar ahora
              </Link>
            </div>
            <ScrollReveal>
              <AvailabilityCalendar roomId={room.id} />
            </ScrollReveal>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="section-title mb-8">Habitaciones relacionadas</h2>
            <div className="grid gap-7 md:grid-cols-3">
              {related.map((r, i) => (
                <RoomCard key={r.id} room={r} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
