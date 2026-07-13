import type { Metadata } from "next";
import { ROOMS, HOTEL } from "@/lib/data";
import RoomsExplorer from "@/components/rooms/RoomsExplorer";
import SectionHeading from "@/components/shared/SectionHeading";

export const metadata: Metadata = {
  title: "Habitaciones",
  description: `Descubre las habitaciones de ${HOTEL.name}: estudios, suites y penthouse con diseño cálido y todos los servicios incluidos.`,
  alternates: { canonical: "/habitaciones" }
};

export default function RoomsPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading label="Alojamiento" title="Todas nuestras habitaciones" description="Desde estudios compactos hasta el penthouse con jacuzzi privado." />
        <div className="mt-12">
          <RoomsExplorer rooms={ROOMS} />
        </div>
      </div>
    </div>
  );
}
