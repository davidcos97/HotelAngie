"use client";

import { useEffect, useState } from "react";
import { BedDouble, CalendarCheck, DollarSign, TrendingUp } from "lucide-react";
import StatCard from "@/components/admin/StatCard";
import { api } from "@/lib/api";

interface Stats {
  totalRooms: number;
  activeBookings: number;
  monthRevenue: number;
  occupancyRate: number;
  bookingsByDay: { day: string; count: number }[];
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    api
      .get<Stats>("/admin/stats")
      .then(setStats)
      .catch(() => setError(true));
  }, []);

  const maxCount = stats ? Math.max(...stats.bookingsByDay.map((d) => d.count), 1) : 1;

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-charcoal-950">Dashboard</h1>
      <p className="text-sm text-charcoal-700/60">Resumen general de la operación de 6/14 Co-Living.</p>

      {error && (
        <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
          No pudimos cargar las estadísticas. Verifica la conexión con el backend.
        </div>
      )}

      {stats && (
        <>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard icon={BedDouble} label="Habitaciones" value={String(stats.totalRooms)} />
            <StatCard icon={CalendarCheck} label="Reservas activas" value={String(stats.activeBookings)} />
            <StatCard icon={DollarSign} label="Ingresos del mes" value={new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(stats.monthRevenue)} />
            <StatCard icon={TrendingUp} label="Ocupación" value={`${stats.occupancyRate}%`} />
          </div>

          <div className="mt-8 card-elevated p-6">
            <h2 className="mb-6 font-display text-lg font-semibold text-charcoal-950">Reservas — últimos 7 días</h2>
            <div className="flex items-end gap-3" style={{ height: 160 }}>
              {stats.bookingsByDay.map((d) => (
                <div key={d.day} className="flex flex-1 flex-col items-center gap-2">
                  <div className="w-full rounded-t-lg bg-gold-gradient transition-all" style={{ height: `${(d.count / maxCount) * 120}px` }} />
                  <span className="text-[11px] text-charcoal-700/60">{d.day}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
