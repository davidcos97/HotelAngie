"use client";

import type { Room } from "@/types";
import { EXTRAS, TAX_RATE } from "@/lib/extras";
import { useCurrency } from "@/context/CurrencyContext";

interface Props {
  room?: Room;
  nights: number;
  adults: number;
  selectedExtras: string[];
}

export function computeTotals(room: Room | undefined, nights: number, adults: number, selectedExtras: string[]) {
  const roomTotal = room ? room.pricePerNight * Math.max(nights, 0) : 0;
  const extrasTotal = selectedExtras.reduce((sum, id) => {
    const extra = EXTRAS.find((e) => e.id === id);
    if (!extra) return sum;
    let cost = extra.price;
    if (extra.perNight) cost *= Math.max(nights, 1);
    if (extra.perGuest) cost *= adults;
    return sum + cost;
  }, 0);
  const subtotal = roomTotal + extrasTotal;
  const tax = Math.round(subtotal * TAX_RATE);
  const total = subtotal + tax;
  return { roomTotal, extrasTotal, subtotal, tax, total };
}

export default function PriceSummary({ room, nights, adults, selectedExtras }: Props) {
  const { format } = useCurrency();
  const { roomTotal, extrasTotal, subtotal, tax, total } = computeTotals(room, nights, adults, selectedExtras);

  return (
    <div className="card-elevated sticky top-28 p-6">
      <h3 className="font-display text-lg font-semibold text-charcoal-950">Resumen de tu reserva</h3>

      {room ? (
        <div className="mt-4 space-y-3 text-sm">
          <div className="flex justify-between text-charcoal-700/80">
            <span>{room.name} × {Math.max(nights, 0)} noche{nights === 1 ? "" : "s"}</span>
            <span>{format(roomTotal)}</span>
          </div>
          {selectedExtras.length > 0 && (
            <div className="flex justify-between text-charcoal-700/80">
              <span>Servicios adicionales</span>
              <span>{format(extrasTotal)}</span>
            </div>
          )}
          <div className="flex justify-between border-t border-charcoal-900/5 pt-3 text-charcoal-700/80">
            <span>Subtotal</span>
            <span>{format(subtotal)}</span>
          </div>
          <div className="flex justify-between text-charcoal-700/80">
            <span>Impuestos (19%)</span>
            <span>{format(tax)}</span>
          </div>
          <div className="flex justify-between border-t border-charcoal-900/5 pt-3 font-display text-lg font-semibold text-charcoal-950">
            <span>Total</span>
            <span>{format(total)}</span>
          </div>
        </div>
      ) : (
        <p className="mt-4 text-sm text-charcoal-700/60">Selecciona una habitación para ver el precio.</p>
      )}
    </div>
  );
}
