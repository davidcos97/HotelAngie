"use client";

import { useState } from "react";
import { XCircle } from "lucide-react";
import { useApiResource } from "@/hooks/useApiResource";
import { api } from "@/lib/api";
import DataTable from "@/components/admin/DataTable";

interface Booking {
  id: string;
  code: string;
  guestName: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  total: number;
  status: "CONFIRMED" | "CANCELLED" | "COMPLETED";
}

const STATUS_LABEL: Record<Booking["status"], string> = {
  CONFIRMED: "Confirmada",
  CANCELLED: "Cancelada",
  COMPLETED: "Completada"
};

const STATUS_STYLE: Record<Booking["status"], string> = {
  CONFIRMED: "bg-gold-50 text-gold-700",
  CANCELLED: "bg-red-50 text-red-700",
  COMPLETED: "bg-green-50 text-green-700"
};

export default function AdminBookingsPage() {
  const [filter, setFilter] = useState<"all" | Booking["status"]>("all");
  const { data: bookings, loading, error, reload } = useApiResource<Booking>("/bookings");

  const filtered = bookings?.filter((b) => filter === "all" || b.status === filter) ?? null;

  async function cancelBooking(id: string) {
    if (!confirm("¿Cancelar esta reserva?")) return;
    try {
      await api.patch(`/bookings/${id}`, { status: "CANCELLED" });
      reload();
    } catch {
      alert("No se pudo cancelar la reserva.");
    }
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-charcoal-950">Reservas</h1>
      <p className="text-sm text-charcoal-700/60">Consulta, modifica y cancela reservas de huéspedes.</p>

      <div className="mt-5 flex gap-2">
        {(["all", "CONFIRMED", "COMPLETED", "CANCELLED"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full border px-4 py-1.5 text-xs font-medium ${filter === f ? "border-gold-600 bg-gold-gradient text-charcoal-950" : "border-charcoal-900/10 text-charcoal-700"}`}
          >
            {f === "all" ? "Todas" : STATUS_LABEL[f]}
          </button>
        ))}
      </div>

      <div className="mt-6">
        <DataTable<Booking>
          rows={filtered}
          loading={loading}
          error={error}
          keyField={(b) => b.id}
          columns={[
            { header: "Código", render: (b) => <span className="font-mono text-xs">{b.code}</span> },
            { header: "Huésped", render: (b) => b.guestName },
            { header: "Habitación", render: (b) => b.roomName },
            { header: "Fechas", render: (b) => `${b.checkIn} → ${b.checkOut}` },
            { header: "Total", render: (b) => new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(b.total) },
            { header: "Estado", render: (b) => <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_STYLE[b.status]}`}>{STATUS_LABEL[b.status]}</span> },
            {
              header: "Acciones",
              render: (b) =>
                b.status === "CONFIRMED" ? (
                  <button onClick={() => cancelBooking(b.id)} className="flex items-center gap-1 text-xs font-medium text-red-600 hover:underline">
                    <XCircle size={14} /> Cancelar
                  </button>
                ) : (
                  <span className="text-xs text-charcoal-700/40">—</span>
                )
            }
          ]}
        />
      </div>
    </div>
  );
}
