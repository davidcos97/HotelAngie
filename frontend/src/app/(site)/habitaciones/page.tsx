import type { Metadata } from "next";
import { ROOMS, HOTEL } from "@/lib/data";
import RoomsExplorer from "@/components/rooms/RoomsExplorer";
import SectionHeading from "@/components/shared/SectionHeading";

export const metadata: Metadata = {
  title: "Habitaciones",
  description: `Descubre las habitaciones de ${HOTEL.name} en Pereira, todas con acceso por tarjeta de seguridad.`,
  alternates: { canonical: "/habitaciones" }
};

export default function RoomsPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading label="Alojamiento" title="Todas nuestras habitaciones" description="Todas con baño privado, closet y acceso por tarjeta de seguridad." />
        <div className="mt-12">
          <RoomsExplorer rooms={ROOMS} />
        </div>
      </div>
    </div>
  );
}
