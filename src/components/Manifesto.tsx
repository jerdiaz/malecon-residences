"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import SplitWords from "@/components/ui/SplitWords";

export default function Manifesto() {
  return (
    <section
      id="manifesto"
      className="relative flex h-screen w-full snap-start items-center justify-center bg-ink px-6 pt-24"
    >
      {/* Acento tipográfico tenue de fondo */}
      <span
        aria-hidden
        className="pointer-events-none absolute select-none font-serif text-[28rem] font-extralight leading-none text-white/[0.015]"
      >
        N
      </span>

      <div className="relative mx-auto max-w-3xl text-center">
        <Reveal delay={0}>
          <p className="mb-12 text-[0.65rem] font-light uppercase tracking-[0.45em] text-bronze/80">
            La filosofía
          </p>
        </Reveal>

        {/* Cita principal — palabra por palabra al estilo editorial MB Places */}
        <p className="text-balance font-serif text-2xl font-extralight leading-[1.6] tracking-wide text-white/90 sm:text-3xl md:text-4xl md:leading-[1.55]">
          <SplitWords
            text="Hay un lugar donde el mar deja de ser paisaje"
            delay={150}
            stagger={48}
          />
          {" "}
          <SplitWords
            text="y se vuelve rutina."
            delay={700}
            stagger={48}
            className="text-champagne"
          />
          {" "}
          <SplitWords
            text="Donde el amanecer no se contempla: se habita."
            delay={1050}
            stagger={44}
          />
        </p>

        {/* Separador animado */}
        <motion.div
          className="mx-auto my-12 h-px w-16 origin-center bg-bronze/40"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 1.2, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
        />

        <Reveal delay={2000}>
          <p className="mx-auto max-w-xl text-sm font-light leading-loose tracking-wide text-white/55 sm:text-base">
            En la Zona Norte de Cartagena, entre la brisa del Caribe y la quietud
            de la ciénaga, concebimos un refugio para quienes entienden que el
            lujo verdadero es el silencio, el espacio y el tiempo. Malecón
            Residences no es un edificio: es una forma de estar en el mundo.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
