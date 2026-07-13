"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { addMonths, endOfMonth, format, getDay, startOfMonth, subMonths } from "date-fns";
import { es } from "date-fns/locale";
import { api } from "@/lib/api";

export default function AvailabilityCalendar({ roomId }: { roomId: string }) {
  const [month, setMonth] = useState(new Date());
  const [unavailable, setUnavailable] = useState<Set<string>>(new Set());

  useEffect(() => {
    let cancelled = false;
    api
      .get<{ unavailableDates: string[] }>(`/rooms/${roomId}/availability?month=${format(month, "yyyy-MM")}`)
      .then((res) => {
        if (!cancelled) setUnavailable(new Set(res.unavailableDates));
      })
      .catch(() => {
        if (!cancelled) setUnavailable(new Set());
      });
    return () => {
      cancelled = true;
    };
  }, [roomId, month]);

  const days = useMemo(() => {
    const start = startOfMonth(month);
    const end = endOfMonth(month);
    const leadingBlanks = getDay(start);
    const list: (Date | null)[] = Array.from({ length: leadingBlanks }, () => null);
    for (let d = 1; d <= end.getDate(); d++) {
      list.push(new Date(month.getFullYear(), month.getMonth(), d));
    }
    return list;
  }, [month]);

  return (
    <div className="rounded-2xl border border-charcoal-900/5 bg-white p-5 shadow-soft">
      <div className="mb-4 flex items-center justify-between">
        <button onClick={() => setMonth((m) => subMonths(m, 1))} aria-label="Mes anterior" className="rounded-full p-1.5 hover:bg-gold-50">
          <ChevronLeft size={18} />
        </button>
        <p className="font-display text-lg font-semibold capitalize text-charcoal-950">{format(month, "MMMM yyyy", { locale: es })}</p>
        <button onClick={() => setMonth((m) => addMonths(m, 1))} aria-label="Mes siguiente" className="rounded-full p-1.5 hover:bg-gold-50">
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1.5 text-center text-[11px] font-medium uppercase text-charcoal-700/50">
        {["D", "L", "M", "X", "J", "V", "S"].map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>

      <div className="mt-2 grid grid-cols-7 gap-1.5">
        {days.map((day, i) => {
          if (!day) return <span key={i} />;
          const key = format(day, "yyyy-MM-dd");
          const isPast = day < new Date(new Date().toDateString());
          const isUnavailable = unavailable.has(key) || isPast;
          return (
            <span
              key={key}
              className={`flex aspect-square items-center justify-center rounded-lg text-xs ${
                isUnavailable ? "bg-charcoal-900/5 text-charcoal-900/25 line-through" : "bg-gold-50 text-charcoal-800"
              }`}
            >
              {day.getDate()}
            </span>
          );
        })}
      </div>

      <div className="mt-4 flex items-center gap-4 text-xs text-charcoal-700/60">
        <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-gold-50" /> Disponible</span>
        <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-charcoal-900/5" /> No disponible</span>
      </div>
    </div>
  );
}
