import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Deep, profound dark backgrounds
        ink: {
          DEFAULT: "#090d11",
          900: "#090d11",
          800: "#0c1116",
          700: "#11171d",
          600: "#171f27",
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
      },
      animation: {
        "fade-up": "fade-up 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in": "fade-in 1.6s ease forwards",
      },
    },
  },
  plugins: [],
};

export default config;
