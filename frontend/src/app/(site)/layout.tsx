import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "../globals.css";
import { HOTEL } from "@/lib/data";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/shared/WhatsAppButton";
import ChatbotWidget from "@/components/chatbot/ChatbotWidget";
import SuggestionsButton from "@/components/shared/SuggestionsButton";
import TransportButton from "@/components/shared/TransportButton";
import JsonLd from "@/components/seo/JsonLd";
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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://614coliving.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${HOTEL.name} | Co-Living de autor en Pereira`,
    template: `%s | ${HOTEL.name}`
  },
  description: HOTEL.description,
  keywords: ["co-living Pereira", "alojamiento Pereira", "habitaciones con cocina Pereira", "nómadas digitales Pereira", "6/14 co-living"],
  authors: [{ name: HOTEL.name }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: siteUrl,
    siteName: HOTEL.name,
    title: `${HOTEL.name} | Co-Living de autor en Pereira`,
    description: HOTEL.description
  },
  twitter: {
    card: "summary_large_image",
    title: `${HOTEL.name} | Co-Living de autor en Pereira`,
    description: HOTEL.description
  },
  icons: {
    icon: "/assets/logo/logo-emblem.svg",
    shortcut: "/assets/logo/logo-emblem.svg",
    apple: "/assets/logo/logo-emblem.svg"
  },
  robots: { index: true, follow: true }
};

export const viewport: Viewport = {
  themeColor: "#141414",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${display.variable} ${sans.variable}`}>
      <body className="flex min-h-screen flex-col font-sans">
        <JsonLd />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-charcoal-950 focus:px-5 focus:py-3 focus:text-sm focus:text-white"
        >
          Saltar al contenido principal
        </a>
        <CurrencyProvider>
          <Header />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
          <WhatsAppButton />
          <ChatbotWidget />
          <SuggestionsButton />
          <TransportButton />
        </CurrencyProvider>
      </body>
    </html>
  );
}
