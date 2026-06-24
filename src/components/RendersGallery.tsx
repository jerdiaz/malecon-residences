"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SplitWords from "@/components/ui/SplitWords";
import Reveal from "@/components/ui/Reveal";

const RENDERS = [
  { src: "/images/renders/render-04.png", label: "Fachada principal", span: "col-span-2" },
  { src: "/images/renders/render-08.png", label: "Lobby de acceso",   span: "col-span-1" },
  { src: "/images/renders/render-06.png", label: "Plaza comercial",   span: "col-span-1" },
  { src: "/images/renders/render-07.png", label: "Detalle de fachada", span: "col-span-1" },
  { src: "/images/renders/render-09.png", label: "Acceso vehicular",  span: "col-span-1" },
  { src: "/images/renders/render-05.png", label: "Vista frontal",     span: "col-span-2" },
  { src: "/images/renders/render-02.png", label: "Vista aérea sur",   span: "col-span-1" },
  { src: "/images/renders/render-03.png", label: "Vista aérea norte", span: "col-span-1" },
  { src: "/images/renders/render-01.png", label: "Vista aérea compleja", span: "col-span-2" },
];

export default function RendersGallery() {
  return (
    <section id="galeria" className="relative w-full bg-stone-950 scroll-mt-20 py-24 lg:py-32">
      {/* Header */}
      <div className="mx-auto max-w-7xl px-6 md:px-12 mb-16">
        <Reveal>
          <p className="mb-5 text-[0.65rem] font-light uppercase tracking-[0.45em] text-bronze/80">
            Renders arquitectónicos
          </p>
        </Reveal>
        <h2 className="font-serif text-4xl font-extralight leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[3.5rem]">
          <SplitWords text="El proyecto. En detalle." delay={100} stagger={50} />
        </h2>
        <Reveal delay={500}>
          <p className="mt-6 max-w-lg text-sm font-light leading-relaxed tracking-wide text-white/50">
            Nueve perspectivas del Malecón Business Center. Arquitectura contemporánea
            diseñada para la Zona Norte de Cartagena de Indias.
          </p>
        </Reveal>
      </div>

      {/* Grid */}
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {RENDERS.map((render, i) => (
            <motion.div
              key={render.src}
              className={`group relative overflow-hidden ${
                render.span === "col-span-2"
                  ? "sm:col-span-2 lg:col-span-2"
                  : "col-span-1"
              }`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.08 }}
              transition={{
                delay: (i % 3) * 0.08,
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div
                className={`relative w-full overflow-hidden ${
                  render.span === "col-span-2" ? "h-[52vw] max-h-[520px] sm:h-[42vw]" : "h-[52vw] max-h-[380px] sm:h-[32vw]"
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
            </motion.div>
          ))}
        </div>
      </div>

      {/* Número total de renders */}
      <Reveal delay={200}>
        <div className="mx-auto mt-12 max-w-7xl px-6 text-right md:px-12">
          <span className="font-serif text-[0.65rem] font-light uppercase tracking-[0.35em] text-white/20">
            9 perspectivas · Malecón Business Center
          </span>
        </div>
      </Reveal>
    </section>
  );
}
