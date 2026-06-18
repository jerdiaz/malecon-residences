"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Cursor personalizado: un punto champaña preciso y un anillo que lo sigue
 * con retardo y se expande sobre elementos interactivos. Solo se activa en
 * dispositivos con puntero fino (mouse / trackpad); en táctil no aparece.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  // 1) Detectar puntero fino y activar el render de los nodos.
  useEffect(() => {
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      setEnabled(true);
    }
  }, []);

  // 2) Ya activos y montados los nodos, cablear el movimiento.
  //    (Este efecto corre tras el re-render, cuando los refs ya existen.)
  useEffect(() => {
    if (!enabled) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.documentElement.classList.add("has-custom-cursor");

    // Posición objetivo (mouse) y posición suavizada del anillo.
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let raf = 0;

    // Posición inicial centrada para evitar el salto desde la esquina.
    dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;

      // Expandir el anillo sobre elementos interactivos.
      const target = e.target as Element | null;
      const interactive = !!(
        target &&
        typeof target.closest === "function" &&
        target.closest("a, button, input, label, [data-cursor='hover']")
      );
      ring.dataset.hover = interactive ? "true" : "false";
    };

    const tick = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };

    const onLeave = () => {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };
    const onEnter = () => {
      dot.style.opacity = "1";
      ring.style.opacity = "1";
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 rounded-full bg-champagne transition-opacity duration-300"
      />
      <div
        ref={ringRef}
        aria-hidden
        data-hover="false"
        className="pointer-events-none fixed left-0 top-0 z-[9998] h-9 w-9 rounded-full border border-bronze/70 transition-[width,height,opacity,background-color,border-color] duration-300 ease-silk data-[hover=true]:h-14 data-[hover=true]:w-14 data-[hover=true]:border-champagne/80 data-[hover=true]:bg-champagne/5"
      />
    </>
  );
}
