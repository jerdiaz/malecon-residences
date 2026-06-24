"use client";

import { scrollToSection } from "@/lib/sections";
import SplitWords from "@/components/ui/SplitWords";
import Reveal from "@/components/ui/Reveal";

export default function VideoSection() {
  return (
    <section
      id="video"
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-ink scroll-mt-20"
    >
      {/* Vídeo de fondo — reemplazar src con el vídeo real del proyecto */}
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-60"
        autoPlay
        muted
        loop
        playsInline
        poster="/images/renders/render-04.png"
      >
        <source src="/video/malecon-highlight.mp4" type="video/mp4" />
      </video>

      {/* Velo gradiente */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/40 to-ink/80" />

      {/* Contenido */}
      <div className="relative z-10 px-6 text-center">
        <Reveal>
          <p className="mb-10 text-[0.65rem] font-light uppercase tracking-[0.45em] text-bronze/80">
            La experiencia
          </p>
        </Reveal>

        <h2 className="mx-auto max-w-4xl font-serif text-5xl font-extralight leading-[1.08] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
          <SplitWords text="Donde los negocios" delay={150} stagger={58} />
          <br />
          <SplitWords
            text="se encuentran con el mar."
            delay={750}
            stagger={58}
            className="italic text-champagne"
          />
        </h2>

        <Reveal delay={1400}>
          <button
            onClick={() => scrollToSection("contact")}
            className="group mx-auto mt-14 flex items-center gap-4 border border-white/20 px-10 py-5 text-[0.7rem] font-light uppercase tracking-[0.3em] text-white/80 transition-all duration-500 ease-silk hover:border-bronze hover:text-champagne"
          >
            Agendar una visita privada
            <span className="transition-transform duration-500 group-hover:translate-x-1">
              →
            </span>
          </button>
        </Reveal>
      </div>
    </section>
  );
}
