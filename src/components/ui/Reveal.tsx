"use client";

import { useEffect, useRef, useState } from "react";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Retardo de la animación en milisegundos (para escalonar elementos). */
  delay?: number;
  /** Desplazamiento vertical inicial en px. */
  y?: number;
  /** Si solo debe animarse la primera vez (por defecto se reanima al reentrar). */
  once?: boolean;
}

/**
 * Envoltorio de aparición al hacer scroll. Usa IntersectionObserver para
 * desvanecer y elevar el contenido cuando entra en el viewport — el gesto
 * que da vida a cada sección al encajar el snap.
 */
export default function Reveal({
  children,
  className = "",
  delay = 0,
  y = 28,
  once = false,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respeta la preferencia de movimiento reducido.
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) {
      setShown(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          if (once) io.disconnect();
        } else if (!once) {
          setShown(false);
        }
      },
      { threshold: 0.2 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [once]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-[1100ms] ease-silk ${className}`}
      style={{
        transitionDelay: `${delay}ms`,
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : `translateY(${y}px)`,
      }}
    >
      {children}
    </div>
  );
}
