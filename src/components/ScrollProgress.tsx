"use client";

import { useEffect, useState } from "react";
import { SCROLL_SHELL_ID } from "@/lib/sections";

/**
 * Barra de progreso de scroll, fina y en bronce, fijada al borde superior.
 * Refleja el avance dentro del contenedor con snap.
 */
export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const shell = document.getElementById(SCROLL_SHELL_ID);
    if (!shell) return;

    const onScroll = () => {
      const max = shell.scrollHeight - shell.clientHeight;
      setProgress(max > 0 ? shell.scrollTop / max : 0);
    };

    onScroll();
    shell.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      shell.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      className="fixed inset-x-0 top-0 z-[70] h-px bg-transparent"
      aria-hidden
    >
      <div
        className="h-full origin-left bg-gradient-to-r from-bronze via-champagne to-bronze transition-transform duration-150 ease-out"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}
