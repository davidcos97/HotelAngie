"use client";

import { useCurrency } from "@/context/CurrencyContext";
import { cn } from "@/lib/utils";

export default function CurrencyPrice({ copAmount, className }: { copAmount: number; className?: string }) {
  const { format } = useCurrency();
  return <span className={cn(className)}>{format(copAmount)}</span>;
}
