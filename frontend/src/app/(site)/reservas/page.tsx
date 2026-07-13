import type { Metadata } from "next";
import BookingWizard from "@/components/booking/BookingWizard";
import SectionHeading from "@/components/shared/SectionHeading";

export const metadata: Metadata = {
  title: "Reservas",
  description: "Reserva tu habitación en 6/14 Co-Living: elige fechas, huéspedes y servicios adicionales con confirmación inmediata.",
  alternates: { canonical: "/reservas" }
};

interface Props {
  searchParams: { room?: string; checkIn?: string; checkOut?: string; adults?: string; children?: string };
}

export default function ReservasPage({ searchParams }: Props) {
  return (
    <div className="pb-24 pt-32">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <SectionHeading label="Reservas" title="Completa tu reserva" description="Disponibilidad en tiempo real y confirmación instantánea por correo." />
        <div className="mt-12">
          <BookingWizard
            initialRoomSlug={searchParams.room}
            initialCheckIn={searchParams.checkIn}
            initialCheckOut={searchParams.checkOut}
            initialAdults={searchParams.adults ? Number(searchParams.adults) : undefined}
            initialChildren={searchParams.children ? Number(searchParams.children) : undefined}
          />
        </div>
      </div>
    </div>
  );
}
