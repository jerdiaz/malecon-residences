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
        // Escala del cuerpo de texto sobre el azul de marca. Antes había seis
        // opacidades sueltas de blanco repartidas sin criterio —75, 70, 60,
        // 55, 50 y 25%—: el mismo tipo de párrafo aparecía con tres valores
        // distintos según la sección. Estos tres roles las reemplazan, y los
        // tres pasan el mínimo de 4.5:1 contra `ink`; el 25% daba 2.3:1 y lo
        // llevaba justamente la nota legal de Plantas.
        //
        // No aplican a Amenidades: esa sección va sobre crema con tinta
        // navy y tiene su propio sistema.
        // El techo del cuerpo es 72%, y no es arbitrario: el champaña de los
        // acentos da 9.4:1 contra `ink`, y a partir del 75% el texto de lectura
        // brillaría MÁS que el color que debe mandar. Ahí se rompe la jerarquía
        // tonal. Por eso el resto de la legibilidad se resuelve con peso y
        // espaciado, no subiendo más el blanco.
        cuerpo: "rgb(255 255 255 / 0.72)", //  8.8:1 — párrafos
        apoyo: "rgb(255 255 255 / 0.60)", //   6.6:1 — datos, pies y notas
        sobrefoto: "rgb(255 255 255 / 0.80)", // 10.6:1 — encima de foto o video

        // Subtle metallic accents — champagne / bronze
        champagne: "#d8c4a0",
        bronze: "#b08d57",
      },
      // Alto de una sección que debe verse ENTERA bajo la barra fija.
      //
      // Una sección a `min-h-screen` mide exactamente la ventana, pero el
      // navbar está fijo encima y le tapa el arranque: medido a 1440×840, de
      // una sección de 840px solo se veían 707. Nunca se veía completa.
      //
      // 4rem es el alto real de la barra en su estado compacto —70.4px contra
      // los 71 medidos—, que es el estado en el que está siempre que hay una
      // sección en pantalla: py-3 (26.4px) más el lockup horizontal (44px).
      //
      // `svh` y no `vh`: en móvil `vh` cuenta la ventana como si la barra del
      // navegador estuviera oculta, así que la sección se pasa de largo justo
      // en las pantallas más cortas. `svh` usa la ventana chica, que es la que
      // se ve de verdad. En escritorio los dos valen lo mismo.
      height: { pantalla: "calc(100svh - 4rem)" },
      minHeight: { pantalla: "calc(100svh - 4rem)" },

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
