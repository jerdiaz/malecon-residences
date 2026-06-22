"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Reveal from "@/components/ui/Reveal";

interface Stat {
  value: number;
  label: string;
  pad?: boolean;
  suffix?: string;
}

const STATS: Stat[] = [
  { value: 10, label: "Residencias exclusivas", pad: true },
  { value: 6, label: "Niveles boutique", pad: true },
  { value: 280, label: "Metros de playa privada", suffix: " m" },
  { value: 1, label: "Dirección irrepetible", pad: true },
];

function useCountUp(target: number, active: boolean, duration = 1700): number {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) {
      setValue(0);
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(target);
      return;
    }

    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active, duration]);

  return value;
}

function StatItem({ stat, active, index }: { stat: Stat; active: boolean; index: number }) {
  const current = useCountUp(stat.value, active);
  const display =
    stat.pad && stat.value < 100 ? String(current).padStart(2, "0") : String(current);

  return (
    <div className="flex flex-col items-center text-center">
      {/* Línea superior que se dibuja */}
      <motion.div
        className="mb-8 h-px w-full origin-left bg-bronze/25"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: false, amount: 0.1 }}
        transition={{
          duration: 1.3,
          delay: 0.1 + index * 0.12,
          ease: [0.16, 1, 0.3, 1],
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.1 }}
        transition={{
          duration: 0.9,
          delay: 0.3 + index * 0.14,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="flex flex-col items-center"
      >
        <span className="font-serif text-6xl font-extralight leading-none text-white sm:text-7xl">
          {display}
          {stat.suffix && (
            <span className="text-2xl text-champagne sm:text-3xl">{stat.suffix}</span>
          )}
        </span>
        <span className="mt-5 h-px w-8 bg-bronze/50" />
        <span className="mt-5 max-w-[10rem] text-[0.65rem] font-light uppercase leading-relaxed tracking-[0.25em] text-white/55">
          {stat.label}
        </span>
      </motion.div>
    </div>
  );
}

export default function Stats() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="stats"
      ref={ref}
      className="relative flex h-screen w-full snap-start items-center justify-center bg-ink px-6 pt-24"
    >
      {/* Número editorial gigante de fondo — estilo MB Places */}
      <span
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 select-none font-serif text-[22rem] font-extralight leading-none text-white/[0.018] lg:text-[28rem]"
      >
        10
      </span>

      <div className="mx-auto w-full max-w-5xl">
        <Reveal className="mb-16 text-center">
          <p className="text-[0.65rem] font-light uppercase tracking-[0.45em] text-bronze/80">
            El proyecto en cifras
          </p>
        </Reveal>

        <div className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-4 md:gap-x-4">
          {STATS.map((stat, i) => (
            <StatItem key={stat.label} stat={stat} active={active} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
