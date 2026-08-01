import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  CATEGORY_LABELS,
  RENDERS,
  getRendersByCategory,
  type RenderCategory,
} from "@/lib/renders";
import { blurFor } from "@/lib/blur";

export const metadata: Metadata = {
  title: "Galería completa · Malecón Business Center",
  description: `Los ${RENDERS.length} renders oficiales del Malecón Business Center: exteriores, interiores y plantas del proyecto en la Zona Norte de Cartagena de Indias.`,
};

const ORDER: RenderCategory[] = ["exteriores", "interiores", "plantas"];

const INTRO: Record<RenderCategory, string> = {
  exteriores: "Fachadas, accesos, plazas y el proyecto en su contexto costero.",
  interiores: "Oficinas, espacios de trabajo y el rooftop.",
  plantas: "Distribución de las plantas, vista desde arriba.",
};

export default function GaleriaPage() {
  return (
    <main className="relative min-h-screen w-full bg-ink pb-32">
      {/* Cabecera */}
      <div className="mx-auto max-w-7xl px-6 pt-16 md:px-12 lg:pt-20">
        <Link
          href="/#galeria"
          className="group mb-10 inline-flex items-center gap-3 text-[0.65rem] font-light uppercase tracking-[0.3em] text-white/60 transition-colors duration-300 ease-silk hover:text-champagne"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 transition-colors duration-300 ease-silk group-hover:border-bronze">
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M9 1L3 7L9 13" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
            </svg>
          </span>
          Volver al inicio
        </Link>

        <p className="mb-6 text-[0.65rem] font-light uppercase tracking-[0.45em] text-bronze/80">
          Galería completa
        </p>
        <h1 className="max-w-3xl font-serif text-4xl font-extralight leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[3.5rem]">
          Los renders del proyecto.
        </h1>
        <p className="mt-6 max-w-lg text-sm font-light leading-relaxed tracking-wide text-white/50">
          El set completo entregado por los arquitectos. Toca cualquier imagen
          para verla en grande.
        </p>
      </div>

      {/* Grupos */}
      {ORDER.map((category) => {
        const items = getRendersByCategory(category);
        if (items.length === 0) return null;

        return (
          <section key={category} className="mx-auto max-w-7xl px-6 pt-16 md:px-12 lg:pt-20">
            <div className="mb-10 flex items-baseline justify-between border-b border-white/10 pb-5">
              <h2 className="font-serif text-2xl font-extralight tracking-tight text-champagne sm:text-3xl">
                {CATEGORY_LABELS[category]}
              </h2>
              <span className="text-[0.65rem] font-light uppercase tracking-[0.3em] tabular-nums text-white/35">
                {String(items.length).padStart(2, "0")}
              </span>
            </div>
            <p className="mb-10 max-w-md text-sm font-light leading-relaxed tracking-wide text-white/45">
              {INTRO[category]}
            </p>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((render) => (
                <Link
                  key={render.slug}
                  href={`/galeria/${render.slug}`}
                  className="group relative block aspect-[3/2] overflow-hidden transition-all duration-700 ease-silk hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/40"
                >
                  <Image
                    src={render.src}
                    alt={render.label}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-[1200ms] ease-silk group-hover:scale-[1.04]"
                    {...(blurFor(render.src)
                      ? { placeholder: "blur" as const, blurDataURL: blurFor(render.src)! }
                      : {})}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="text-[0.65rem] font-light uppercase tracking-[0.3em] text-champagne/90">
                      {render.label}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </main>
  );
}
