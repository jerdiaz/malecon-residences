"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SplitWords from "@/components/ui/SplitWords";
import Reveal from "@/components/ui/Reveal";
import { RENDERS } from "@/lib/renders";

// Grupos de 3 fotos por slide: 1 grande + 2 pequeñas (mismo patrón asimétrico de antes).
const SLIDES = [
  [RENDERS[0], RENDERS[1], RENDERS[2]],
  [RENDERS[3], RENDERS[4], RENDERS[5]],
  [RENDERS[6], RENDERS[7], RENDERS[8]],
];

const AUTO_ADVANCE_MS = 5000;

export default function RendersGallery() {
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setSlide((prev) => (prev + 1) % SLIDES.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [paused]);

  const current = SLIDES[slide];

  return (
    <section id="galeria" className="relative w-full bg-ink scroll-mt-20 py-24 lg:py-32">
      {/* Header */}
      <div className="mx-auto max-w-7xl px-6 md:px-12 mb-16">
        <Reveal>
          <p className="mb-5 text-[0.65rem] font-light uppercase tracking-[0.45em] text-bronze/80">
            Galería
          </p>
        </Reveal>
        <h2 className="font-serif text-4xl font-extralight leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[3.5rem]">
          <SplitWords
            text="Espacios diseñados con altos estándares."
            delay={100}
            stagger={50}
          />
        </h2>
        <Reveal delay={500}>
          <p className="mt-6 max-w-lg text-sm font-light leading-relaxed tracking-wide text-white/50">
            Nueve perspectivas del Malecón Business Center. Arquitectura contemporánea
            diseñada para la Zona Norte de Cartagena de Indias.
          </p>
        </Reveal>
      </div>

      {/* Carrusel — avanza solo; se pausa solo al pasar el cursor sobre una foto */}
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div
          key={slide}
          className="grid animate-[fade-in_0.4s_ease-out] grid-cols-1 gap-3 sm:h-[60vh] sm:max-h-[480px] sm:grid-cols-3 sm:grid-rows-2"
        >
          {/* Foto grande — ocupa 2 columnas y ambas filas */}
          <RenderTile
            render={current[0]}
            className="sm:col-span-2 sm:row-span-2"
            big
            onHoverChange={setPaused}
          />
          {/* Dos fotos pequeñas, apiladas a la derecha */}
          <RenderTile render={current[1]} onHoverChange={setPaused} />
          <RenderTile render={current[2]} onHoverChange={setPaused} />
        </div>
      </div>

      {/* Número total de renders */}
      <Reveal delay={200}>
        <div className="mx-auto mt-8 max-w-7xl px-6 text-right md:px-12">
          <span className="font-serif text-[0.65rem] font-light uppercase tracking-[0.35em] text-white/20">
            9 perspectivas · Malecón Business Center
          </span>
        </div>
      </Reveal>
    </section>
  );
}

function RenderTile({
  render,
  big = false,
  className = "",
  onHoverChange,
}: {
  render: (typeof RENDERS)[number];
  big?: boolean;
  className?: string;
  onHoverChange?: (hovering: boolean) => void;
}) {
  return (
    <Link
      href={`/galeria/${render.slug}`}
      onMouseEnter={() => onHoverChange?.(true)}
      onMouseLeave={() => onHoverChange?.(false)}
      className={`group relative block overflow-hidden ${className}`}
    >
      <div
        className={`relative w-full overflow-hidden ${
          big ? "h-72 sm:h-full" : "h-56 sm:h-full"
        }`}
      >
        <Image
          src={render.src}
          alt={render.label}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 66vw"
          className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
        />
        {/* Velo inferior */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        {/* Etiqueta */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-2 p-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <p className="text-[0.65rem] font-light uppercase tracking-[0.3em] text-champagne/90">
            {render.label}
          </p>
        </div>
      </div>
    </Link>
  );
}
