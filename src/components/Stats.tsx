"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/ui/Reveal";

interface Stat {
  value: number;
  label: string;
  /** Rellenar a dos dígitos (p. ej. 06). */
  pad?: boolean;
  /** Sufijo opcional (p. ej. " m"). */
  suffix?: string;
}

const STATS: Stat[] = [
  { value: 10, label: "Residencias exclusivas", pad: true },
  { value: 6, label: "Niveles boutique", pad: true },
  { value: 280, label: "Metros de playa privada", suffix: " m" },
  { value: 1, label: "Dirección irrepetible", pad: true },
];

/** Cuenta de 0 al objetivo con easing cuando `active` es verdadero. */
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
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      setValue(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active, duration]);

  return value;
}

function StatItem({ stat, active, delay }: { stat: Stat; active: boolean; delay: number }) {
  const current = useCountUp(stat.value, active);
  const display =
    stat.pad && stat.value < 100 ? String(current).padStart(2, "0") : String(current);

  return (
    <Reveal delay={delay} className="flex flex-col items-center text-center">
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
    </Reveal>
  );
}

/**
 * Banda de cifras — un "momento" a pantalla completa con contadores que
 * animan al entrar en vista, comunicando la exclusividad del proyecto.
 */
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
      <div className="mx-auto w-full max-w-5xl">
        <Reveal className="mb-16 text-center">
          <p className="text-[0.65rem] font-light uppercase tracking-[0.45em] text-bronze/80">
            El proyecto en cifras
          </p>
        </Reveal>

        <div className="grid grid-cols-2 gap-x-8 gap-y-16 md:grid-cols-4 md:gap-x-4">
          {STATS.map((stat, i) => (
            <StatItem key={stat.label} stat={stat} active={active} delay={i * 120} />
          ))}
        </div>
      </div>
    </section>
  );
}
