"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Transición cinética entre el Hero y los pilares — inspirada en el reveal
 * tipográfico de burjkhalifa.ae. La sección es más alta que la pantalla;
 * su contenido queda "clavado" (sticky) mientras se recorre ese alto extra,
 * y el scroll controla directamente el letter-spacing / escala / opacidad
 * del nombre de la marca. Al terminar el alto extra, la siguiente sección
 * sube y cubre este bloque de forma natural — sin necesidad de scroll-jacking.
 */
export default function BrandReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const letterSpacing = useTransform(
    scrollYProgress,
    [0, 0.6],
    ["-0.03em", "0.2em"],
  );
  const scale = useTransform(scrollYProgress, [0, 0.6], [1.2, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.22], [0, 1]);

  const lineWidth = useTransform(scrollYProgress, [0.2, 0.55], ["0%", "100%"]);

  const subOpacity = useTransform(scrollYProgress, [0.4, 0.65], [0, 1]);
  const subY = useTransform(scrollYProgress, [0.4, 0.65], [20, 0]);

  return (
    <section ref={ref} className="relative h-[220vh] w-full bg-[#090d11]">
      <div className="sticky top-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden px-6">
        <motion.h2
          style={{ letterSpacing, scale, opacity }}
          className="whitespace-nowrap text-center font-serif text-[15vw] font-extralight uppercase leading-none text-champagne sm:text-[11vw]"
        >
          Malecón
        </motion.h2>

        <motion.div
          style={{ width: lineWidth }}
          className="my-6 h-px max-w-xs bg-bronze/60 sm:my-8"
        />

        <motion.p
          style={{ opacity: subOpacity, y: subY }}
          className="text-center text-[4vw] font-light uppercase tracking-[0.5em] text-bronze sm:text-[1.4vw]"
        >
          Business Center
        </motion.p>
      </div>
    </section>
  );
}
