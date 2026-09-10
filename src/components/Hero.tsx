"use client";

import { useEffect, useRef } from "react";
import ScrollCue from "@/components/ScrollCue";
import Marquee from "@/components/ui/Marquee";

const TICKER_ITEMS = [
  "Zona Norte · Cartagena de Indias",
  "Oficinas y Locales de Lujo",
  "Frente al Mar Caribe",
];

const FUENTE_VIDEO = "/video/hero-fachada.mp4";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  // El video pesa 4.3 MB y es lo primero que pedía el navegador, compitiendo
  // por ancho de banda con todo lo demás justo cuando se decide la primera
  // pintura. Ahora el `src` no está en el HTML: se asigna después de `load` y
  // en cuanto el navegador esté ocioso, así que primero entra el póster —152
  // KB— y el video llega detrás sin bloquear a nadie.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    // `defaultPlaybackRate` y no solo `playbackRate`: más abajo se llama a
    // `load()`, que reinicia el elemento y devuelve la velocidad a 1. El valor
    // por defecto sí sobrevive, y es el que `load()` restaura.
    video.defaultPlaybackRate = 0.85;
    video.playbackRate = 0.85;

    // Con ahorro de datos activo el video no se descarga: se queda el póster,
    // que es el mismo fotograma y pesa el 3%.
    const conexion = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;
    if (conexion?.saveData) return;

    let cancelado = false;
    const cargar = () => {
      if (cancelado || video.src) return;
      video.src = FUENTE_VIDEO;
      video.load();
      video.playbackRate = 0.85;
      video.play().catch(() => {
        // Si el navegador bloquea la reproducción automática, el póster queda
        // como imagen fija. No es un error que haya que reportar.
      });
    };

    const programar = () => {
      if ("requestIdleCallback" in window) {
        window.requestIdleCallback(cargar, { timeout: 2000 });
      } else {
        setTimeout(cargar, 300);
      }
    };

    if (document.readyState === "complete") programar();
    else window.addEventListener("load", programar, { once: true });

    return () => {
      cancelado = true;
      window.removeEventListener("load", programar);
    };
  }, []);

  return (
    <section id="hero" className="relative h-dvh w-full overflow-hidden">
      {/* Video de fondo — entrega del 9 de septiembre. El original venía con
          franjas negras a los lados (pillarbox 1280x720 con el contenido real
          en 1092x720): se recorta con crop=1092:720:94:0 y se codifica sin
          audio (el video siempre va muted).

          Recodificado el 2026-09-10 desde el archivo original en vez del
          intermedio: el primer encode había quedado en 0.156 bits/pixel y se
          notaba, porque en pantalla el video se estira 1.76x y los artefactos
          se agrandan con él. Ahora va a CRF 24 (x264, preset slower), que da
          SSIM 0.972 contra el original frente al 0.960 de antes —un tercio
          menos de error— por 4.3 MB en vez de 2.8. Sigue pesando menos que el
          video anterior del hero, que eran 4.7 MB.

          El poster es el fotograma 0 de ESTE encode, no otra imagen: si se
          cambia el video hay que regenerarlo, o el primer cuadro salta.

          El video anterior sigue en /public/video/video_202606291024.mp4 con
          su poster en /public/images/hero-poster.webp — para volver a él,
          cambiar las dos rutas de abajo por esas. */}
      <video
        ref={videoRef}
        aria-label="Oficinas en la Zona Norte de Cartagena: recorrido por la fachada del Malecón Business Center sobre la Avenida Santander"
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster="/images/oficinas-zona-norte-cartagena.webp"
        preload="none"
      />
      <div className="veil absolute inset-0" />

      {/* Línea decorativa superior */}
      {/* Línea de encuadre — debe quedar por debajo del navbar (104px móvil / 120px desktop) */}
      <div className="absolute left-6 right-6 top-24 z-10 h-px bg-white/10 md:left-12 md:right-12 md:top-28" />

      {/* Contenido central */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <p
          // El texto lleva la keyword principal del sitio. Antes decía "Zona
          // Norte · Cartagena de Indias", que además repetía palabra por
          // palabra el primer ítem de la marquesina de abajo. Es el lugar
          // natural para la keyword: va sobre el pliegue y justo encima del
          // titular, que es una línea de marca y no se toca.
          //
          // Bronce a opacidad plena y halo fuerte: a 10px sobre el video, el
          // bronce al 90% quedaba en 1.8:1 contra el fondo. No es que
          // faltara velo — el color del texto es oscuro, y medirlo como si
          // fuera blanco fue el error. El halo lo resuelve sin tocar el
          // fotograma ni salirse del acento de marca.
          className="type-halo-strong mb-8 animate-fade-in text-[0.65rem] font-light uppercase tracking-[0.45em] text-bronze opacity-0"
          style={{ animationDelay: "0.2s" }}
        >
          Oficinas en la Zona Norte de Cartagena
        </p>

        <h1 className="type-halo max-w-5xl text-balance font-serif text-5xl font-extralight leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
          <span
            className="block animate-fade-up opacity-0"
            style={{ animationDelay: "0.35s" }}
          >
            Hacer negocios
          </span>
          <span
            className="block animate-fade-up opacity-0"
            style={{ animationDelay: "0.6s" }}
          >
            <span className="text-shimmer font-light italic">frente al mar</span>
          </span>
        </h1>

        <p
          className="type-halo mt-10 max-w-xl animate-fade-up text-sm font-light leading-relaxed tracking-wide text-white/70 opacity-0 sm:text-base"
          style={{ animationDelay: "0.9s" }}
        >
          Colección de oficinas y locales de lujo frente al Mar Caribe.
          Una sola dirección.
        </p>
      </div>

      <ScrollCue />

      {/* Marquee ticker inferior */}
      <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-white/10 pb-2 pt-3">
        <Marquee items={TICKER_ITEMS} />
      </div>
    </section>
  );
}
