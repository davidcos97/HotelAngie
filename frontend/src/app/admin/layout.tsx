import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "../globals.css";
import { CurrencyProvider } from "@/context/CurrencyContext";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap"
});

const sans = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Panel administrativo | 6/14 Co-Living",
  robots: { index: false, follow: false }
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${display.variable} ${sans.variable}`}>
      <body className="font-sans">
        <CurrencyProvider>{children}</CurrencyProvider>
      </body>
    </html>
  );
}
