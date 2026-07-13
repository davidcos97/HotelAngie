import type { Metadata } from "next";
import { HOTEL } from "@/lib/data";
import SectionHeading from "@/components/shared/SectionHeading";

export const metadata: Metadata = {
  title: "Política de privacidad",
  alternates: { canonical: "/privacidad" },
  robots: { index: false }
};

export default function PrivacyPage() {
  return (
    <div className="pb-24 pt-32">
      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        <SectionHeading label="Legal" title="Política de privacidad" />
        <div className="prose prose-neutral mt-10 max-w-none text-sm leading-relaxed text-charcoal-700/85">
          <p>
            En {HOTEL.name} protegemos tus datos personales conforme a la Ley 1581 de 2012 de Colombia. La información que recolectamos
            durante tu reserva (nombre, correo, teléfono, documento) se usa exclusivamente para gestionar tu estadía y comunicarte
            promociones si lo autorizas.
          </p>
          <p>
            No compartimos tus datos con terceros salvo para procesar pagos de forma segura. Puedes solicitar la eliminación de tus
            datos escribiendo a {HOTEL.email}.
          </p>
        </div>
      </div>
    </div>
  );
}
