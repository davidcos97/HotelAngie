import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        gold: {
          50: "#FDF9EE",
          100: "#FBF1D6",
          200: "#F6DD8C",
          300: "#EFCB6B",
          400: "#E3BA4E",
          500: "#D4AF37",
          600: "#B8860B",
          700: "#A97A1F",
          800: "#8A6218",
          900: "#5E4310"
        },
        charcoal: {
          50: "#F4F4F4",
          100: "#E4E4E4",
          400: "#5C5C5C",
          700: "#2A2A2A",
          800: "#1A1A1A",
          900: "#141414",
          950: "#050505"
        }
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"]
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #F6DD8C 0%, #D4AF37 45%, #B8860B 100%)",
        "charcoal-gradient": "linear-gradient(160deg, #2A2A2A 0%, #050505 100%)"
      },
      boxShadow: {
        soft: "0 10px 40px -12px rgba(20,20,20,0.15)",
        gold: "0 8px 30px -8px rgba(184,134,11,0.45)",
        glass: "0 8px 32px 0 rgba(20,20,20,0.12)"
      },
      backdropBlur: {
        xs: "2px"
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" }
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" }
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        }
      },
      animation: {
        shimmer: "shimmer 3s linear infinite",
        floatSlow: "floatSlow 6s ease-in-out infinite",
        fadeUp: "fadeUp 0.8s ease-out forwards"
      }
    }
  },
  plugins: [require("@tailwindcss/typography")]
};

export default config;
