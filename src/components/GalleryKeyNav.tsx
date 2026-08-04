"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * Navegación con teclado en la vista de detalle de la galería:
 * ← anterior · → siguiente. Prefetch para que el salto sea instantáneo.
 */
export default function GalleryKeyNav({
  prevSlug,
  nextSlug,
}: {
  prevSlug: string;
  nextSlug: string;
}) {
  const router = useRouter();

  useEffect(() => {
    router.prefetch(`/galeria/${prevSlug}`);
    router.prefetch(`/galeria/${nextSlug}`);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") router.push(`/galeria/${prevSlug}`);
      else if (e.key === "ArrowRight") router.push(`/galeria/${nextSlug}`);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prevSlug, nextSlug, router]);

  return null;
}
