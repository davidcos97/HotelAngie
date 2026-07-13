"use client";

import { createContext, useContext, useMemo, useState } from "react";

type Currency = "COP" | "USD";

const USD_TO_COP_RATE = 4100;

interface CurrencyContextValue {
  currency: Currency;
  toggleCurrency: () => void;
  convert: (copAmount: number) => number;
  format: (copAmount: number) => string;
}

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<Currency>("COP");

  const value = useMemo<CurrencyContextValue>(() => {
    const convert = (copAmount: number) => (currency === "USD" ? copAmount / USD_TO_COP_RATE : copAmount);
    const format = (copAmount: number) =>
      new Intl.NumberFormat(currency === "COP" ? "es-CO" : "en-US", {
        style: "currency",
        currency,
        maximumFractionDigits: currency === "USD" ? 0 : 0
      }).format(convert(copAmount));

    return {
      currency,
      toggleCurrency: () => setCurrency((c) => (c === "COP" ? "USD" : "COP")),
      convert,
      format
    };
  }, [currency]);

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used within CurrencyProvider");
  return ctx;
}
