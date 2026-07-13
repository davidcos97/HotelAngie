"use client";

import { useMemo, useState } from "react";
import type { Room } from "@/types";
import RoomCard from "./RoomCard";
import { SlidersHorizontal } from "lucide-react";

export default function RoomsExplorer({ rooms }: { rooms: Room[] }) {
  const [guests, setGuests] = useState(1);
  const [maxPrice, setMaxPrice] = useState(1000000);
  const [sort, setSort] = useState<"recommended" | "price-asc" | "price-desc">("recommended");

  const filtered = useMemo(() => {
    let list = rooms.filter((r) => r.capacityAdults + r.capacityChildren >= guests && r.pricePerNight <= maxPrice);
    if (sort === "price-asc") list = [...list].sort((a, b) => a.pricePerNight - b.pricePerNight);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.pricePerNight - a.pricePerNight);
    return list;
  }, [rooms, guests, maxPrice, sort]);

  return (
    <div>
      <div className="mb-10 flex flex-wrap items-center gap-4 rounded-2xl border border-charcoal-900/5 bg-white p-5 shadow-soft">
        <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-charcoal-700/60">
          <SlidersHorizontal size={14} /> Filtrar
        </span>

        <label className="flex items-center gap-2 text-sm text-charcoal-800">
          Huéspedes
          <select value={guests} onChange={(e) => setGuests(Number(e.target.value))} className="rounded-lg border border-charcoal-900/10 px-2 py-1.5 text-sm outline-none">
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>{n}+</option>
            ))}
          </select>
        </label>

        <label className="flex items-center gap-2 text-sm text-charcoal-800">
          Precio máx.
          <input
            type="range"
            min={150000}
            max={1000000}
            step={25000}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="accent-gold-600"
          />
          <span className="w-24 text-xs text-charcoal-700/70">{new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(maxPrice)}</span>
        </label>

        <label className="ml-auto flex items-center gap-2 text-sm text-charcoal-800">
          Ordenar por
          <select value={sort} onChange={(e) => setSort(e.target.value as typeof sort)} className="rounded-lg border border-charcoal-900/10 px-2 py-1.5 text-sm outline-none">
            <option value="recommended">Recomendado</option>
            <option value="price-asc">Precio: menor a mayor</option>
            <option value="price-desc">Precio: mayor a menor</option>
          </select>
        </label>
      </div>

      {filtered.length === 0 ? (
        <p className="py-16 text-center text-sm text-charcoal-700/60">No encontramos habitaciones con esos filtros. Prueba ajustar el precio o los huéspedes.</p>
      ) : (
        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((room, i) => (
            <RoomCard key={room.id} room={room} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
