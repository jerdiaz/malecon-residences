"use client";

import { motion } from "framer-motion";
import SplitWords from "@/components/ui/SplitWords";
import Reveal from "@/components/ui/Reveal";
import { scrollToSection } from "@/lib/sections";
import BackgroundImage from "@/components/ui/BackgroundImage";

interface StoryBlockProps {
  id?: string;
  kicker: string;
  title: string;
  body: string;
  /** Lista opcional bajo el cuerpo. `label` encabeza los ítems. */
  bullets?: { label: string; items: string[] };
  image: string;
  /** Posición de la imagen respecto al texto */
  imagePos?: "left" | "right";
  cta?: { label: string; sectionId: string };
  /** Descripción de la imagen. Estas no son decorativas: son los renders del
   *  proyecto, contenido en sí mismo, así que llevan alt real. */
  imageAlt: string;
}

export default function StoryBlock({
  id,
  kicker,
  title,
  body,
  bullets,
  image,
  imagePos = "right",
  cta,
  imageAlt,
}: StoryBlockProps) {
  return (
    <section
      id={id}
      className="relative w-full scroll-mt-16 bg-ink"
    >
      <div
        className={`grid min-h-pantalla w-full grid-cols-1 items-stretch lg:grid-cols-2 ${
          imagePos === "left" ? "lg:[grid-template-columns:1fr_1fr]" : ""
        }`}
      >
        {/* Imagen izquierda — en móvil siempre va después del texto (order-2) para
            que cada sección se identifique por su propio título antes que por su foto;
            en desktop vuelve a su posición natural en la columna izquierda. */}
        {imagePos === "left" && (
          <ImagePanel image={image} alt={imageAlt} className="order-2 lg:order-none" />
        )}

        {/* Texto — en móvil siempre primero (order-1), en desktop vuelve a su posición natural */}
        <div className="order-1 flex items-center px-8 aire-seccion lg:order-none lg:items-start lg:px-16 xl:px-24">
          <div className="max-w-lg">
            <Reveal>
              {/* El antetítulo dorado, el cuerpo blanco y el rótulo de la lista
                  suben de cuerpo y de peso por pedido del 14 de septiembre
                  ("letra dorada más grande al igual que la blanca"). Mismo
                  tratamiento que el antetítulo del hero, que cumple este mismo
                  papel: 0.8rem, peso 500 y el tracking de 0.45 a 0.2em — a
                  0.45em las mayúsculas quedan tan sueltas que hay que
                  reconstruir la palabra letra por letra. */}
              <p className="antetitulo mb-6 text-bronze">
                {kicker}
              </p>
            </Reveal>

            <h2 className="titulo-seccion mb-8 text-white">
              <SplitWords text={title} delay={100} stagger={38} />
            </h2>

            <Reveal delay={600} variant="fade-up">
              <div className="space-y-4">
                {body.split("\n\n").map((paragraph, i) => (
                  <p
                    key={i}
                    // Un escalón completo arriba (sm→base, base→lg). El color
                    // no se toca: `text-cuerpo` ya está en el techo de la
                    // jerarquía tonal — ver la nota de la paleta en
                    // tailwind.config.ts—, así que lo que queda para ganar
                    // legibilidad es el cuerpo, no más blanco.
                    className="text-base font-normal leading-relaxed text-cuerpo sm:text-lg"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </Reveal>

            {bullets && (
              <Reveal delay={750} variant="fade-up">
                <div className="mt-8">
                  <p className="rotulo mb-4 text-bronze">
                    {bullets.label}
                  </p>
                  <ul className="space-y-2.5">
                    {bullets.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-base font-normal leading-relaxed text-cuerpo sm:text-lg"
                      >
                        <span
                          aria-hidden
                          // El punto baja con el cuerpo: a `text-lg` la primera
                          // línea arranca más abajo y con mt-2.5 quedaba pegado
                          // al borde superior en vez de centrado con el renglón.
                          className="mt-3 h-1 w-1 shrink-0 rounded-full bg-bronze"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )}

            {cta && (
              <Reveal delay={950}>
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

        {/* Imagen derecha — mismo orden forzado en móvil que la variante izquierda */}
        {imagePos === "right" && (
          <ImagePanel image={image} alt={imageAlt} className="order-2 lg:order-none" />
        )}
      </div>
    </section>
  );
}

function ImagePanel({
  image,
  alt,
  className = "",
}: {
  image: string;
  alt: string;
  className?: string;
}) {
  return (
    <motion.div
      className={`relative min-h-[55vw] overflow-hidden lg:min-h-0 ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      // Una sola vez, igual que Reveal y SplitWords: al volver a pasar por la
      // sección la foto ya no se apaga y vuelve a encenderse.
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.06 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.08 }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* 165vh en vez de 50vw: el panel es más alto que ancho y con
            object-cover el corte lo manda el alto (ver BackgroundImage). */}
        <BackgroundImage src={image} alt={alt} sizes="(max-width: 1024px) 100vw, 165vh" />
      </motion.div>
    </motion.div>
  );
}
