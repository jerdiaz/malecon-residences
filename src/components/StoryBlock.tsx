"use client";

import { motion } from "framer-motion";
import SplitWords from "@/components/ui/SplitWords";
import Reveal from "@/components/ui/Reveal";
import { scrollToSection } from "@/lib/sections";

interface StoryBlockProps {
  id?: string;
  kicker: string;
  title: string;
  body: string;
  image: string;
  /** Posición de la imagen respecto al texto */
  imagePos?: "left" | "right";
  cta?: { label: string; sectionId: string };
}

export default function StoryBlock({
  id,
  kicker,
  title,
  body,
  image,
  imagePos = "right",
  cta,
}: StoryBlockProps) {
  return (
    <section
      id={id}
      className="relative w-full scroll-mt-20 bg-ink"
    >
      <div
        className={`grid min-h-screen w-full grid-cols-1 items-stretch lg:grid-cols-2 ${
          imagePos === "left" ? "lg:[grid-template-columns:1fr_1fr]" : ""
        }`}
      >
        {/* Imagen izquierda */}
        {imagePos === "left" && <ImagePanel image={image} />}

        {/* Texto */}
        <div className="flex items-center px-8 py-28 lg:px-16 xl:px-24">
          <div className="max-w-lg">
            <Reveal>
              <p className="mb-6 text-[0.65rem] font-light uppercase tracking-[0.45em] text-bronze/80">
                {kicker}
              </p>
            </Reveal>

            <h2 className="mb-8 font-serif text-4xl font-extralight leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[3.25rem]">
              <SplitWords text={title} delay={100} stagger={38} />
            </h2>

            <Reveal delay={600} variant="fade-up">
              <p className="text-sm font-light leading-relaxed tracking-wide text-white/60 sm:text-base">
                {body}
              </p>
            </Reveal>

            {cta && (
              <Reveal delay={850}>
                <button
                  onClick={() => scrollToSection(cta.sectionId)}
                  className="group mt-10 flex items-center gap-4 border border-white/20 px-8 py-4 text-[0.7rem] font-light uppercase tracking-[0.25em] text-white/80 transition-all duration-500 ease-silk hover:border-bronze hover:text-champagne"
                >
                  {cta.label}
                  <span className="transition-transform duration-500 group-hover:translate-x-1">
                    →
                  </span>
                </button>
              </Reveal>
            )}
          </div>
        </div>

        {/* Imagen derecha */}
        {imagePos === "right" && <ImagePanel image={image} />}
      </div>
    </section>
  );
}

function ImagePanel({ image }: { image: string }) {
  return (
    <motion.div
      className="relative min-h-[55vw] overflow-hidden lg:min-h-0"
      initial={{ clipPath: "inset(0 0 100% 0)" }}
      whileInView={{ clipPath: "inset(0 0 0% 0)" }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${image}')` }}
        initial={{ scale: 1.08 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
      />
    </motion.div>
  );
}
