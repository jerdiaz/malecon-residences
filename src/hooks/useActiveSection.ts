"use client";

import { useEffect, useState } from "react";

/**
 * Observa las secciones por id y devuelve la que ocupa el viewport.
 * Usada por la navegación por puntos y por el estado activo del navbar.
 */
export function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState(ids[0] ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { threshold: 0.25 },
    );

    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
    // ids proviene de una constante de módulo (referencia estable).
  }, [ids]);

  return active;
}
