import type { LucideIcon } from "lucide-react";

export default function StatCard({ icon: Icon, label, value, hint }: { icon: LucideIcon; label: string; value: string; hint?: string }) {
  return (
    <div className="card-elevated flex items-center gap-4 p-6">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold-gradient text-charcoal-950">
        <Icon size={20} />
      </span>
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-charcoal-700/60">{label}</p>
        <p className="font-display text-2xl font-semibold text-charcoal-950">{value}</p>
        {hint && <p className="text-xs text-charcoal-700/50">{hint}</p>}
      </div>
    </div>
  );
}
