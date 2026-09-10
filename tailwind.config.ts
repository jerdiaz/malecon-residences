import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Azul profundo de marca — RGB(20, 34, 56). Reemplaza al casi-negro
        // que se usaba antes. La escala mantiene el mismo tono y saturación,
        // subiendo solo la luminosidad para capas sutiles.
        ink: {
          DEFAULT: "#142238",
          // El tono de marca llevado a la luminosidad que tenía el casi-negro
          // anterior (RGB 20,34,56 escalado a 45%). Para velos sobre foto y
          // video: oscurece sin teñir, porque el azul saturado al 60-90% de
          // opacidad se lee como un filtro de color encima de la imagen.
          950: "#090f19",
          900: "#142238",
          800: "#16263e",
          700: "#192b47",
          600: "#1e3253",
        },
        // Subtle metallic accents — champagne / bronze
        champagne: "#d8c4a0",
        bronze: "#b08d57",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        widest: "0.25em",
        ultra: "0.45em",
      },
      transitionTimingFunction: {
        silk: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "marquee": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "line-grow": {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
      },
      animation: {
        "fade-up": "fade-up 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in": "fade-in 1.6s ease forwards",
        "marquee": "marquee 40s linear infinite",
        "line-grow": "line-grow 1.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
    },
  },
  plugins: [],
};

export default config;
