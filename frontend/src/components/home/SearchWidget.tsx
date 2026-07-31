"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { CalendarDays, Users, Search } from "lucide-react";

export default function SearchWidget() {
  const router = useRouter();
  const today = new Date().toISOString().split("T")[0]!;
  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams({
      checkIn,
      checkOut,
      adults: String(adults),
      children: String(children)
    });
    router.push(`/reservas?${params.toString()}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="glass-panel mx-auto grid w-full max-w-4xl grid-cols-2 gap-3 rounded-2xl p-4 sm:grid-cols-4 sm:items-end sm:gap-2 sm:rounded-full sm:p-2.5"
    >
      <label className="flex flex-col gap-1 px-3 py-1 text-left sm:border-r sm:border-charcoal-900/10">
        <span className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wide text-charcoal-700/60">
          <CalendarDays size={12} /> Check-in
        </span>
        <input
          type="date"
          required
          min={today}
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
          className="bg-transparent text-sm text-charcoal-950 outline-none"
        />
      </label>

      <label className="flex flex-col gap-1 px-3 py-1 text-left sm:border-r sm:border-charcoal-900/10">
        <span className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wide text-charcoal-700/60">
          <CalendarDays size={12} /> Check-out
        </span>
        <input
          type="date"
          required
          min={checkIn}
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
          className="bg-transparent text-sm text-charcoal-950 outline-none"
        />
      </label>

      <label className="flex flex-col gap-1 px-3 py-1 text-left sm:border-r sm:border-charcoal-900/10">
        <span className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wide text-charcoal-700/60">
          <Users size={12} /> Huéspedes
        </span>
        <div className="flex items-center gap-2 text-sm text-charcoal-950">
          <select value={adults} onChange={(e) => setAdults(Number(e.target.value))} className="bg-transparent outline-none">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>
                {n} adultos
              </option>
            ))}
          </select>
          <select value={children} onChange={(e) => setChildren(Number(e.target.value))} className="bg-transparent outline-none">
            {[0, 1, 2, 3].map((n) => (
              <option key={n} value={n}>
                {n} niños
              </option>
            ))}
          </select>
        </div>
      </label>

      <button type="submit" className="btn-gold w-full sm:w-auto">
        <Search size={16} /> Buscar
      </button>
    </form>
  );
}
