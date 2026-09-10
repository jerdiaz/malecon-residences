import type { Metadata } from "next";
import Link from "next/link";
import { RENDERS } from "@/lib/renders";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: `Página no encontrada · ${SITE_NAME}`,
  // Una 404 no debe indexarse, pero sí seguirse: sus enlaces son la salida.
  robots: { index: false, follow: true },
};

/**
 * 404 propia. Antes se usaba la de Next: una pantalla en blanco con un texto
 * en inglés, sin marca y sin ninguna salida — quien llegaba a un enlace roto
 * se iba del sitio.
 *
 * Lleva enlaces a las tres rutas reales y a cuatro renders, para que la página
 * devuelva a la gente al contenido en vez de ser un callejón sin salida.
 */
export default function NotFound() {
  const sugeridos = RENDERS.slice(0, 4);

  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-center bg-ink px-6 py-24 text-center">
      <p className="mb-6 text-[0.65rem] font-light uppercase tracking-[0.45em] text-bronze/80">
        Error 404
      </p>

      <h1 className="max-w-2xl font-serif text-4xl font-extralight leading-[1.1] tracking-tight text-white sm:text-5xl">
        Esta página no existe.
      </h1>

      <p className="mt-6 max-w-md text-sm font-light leading-relaxed tracking-wide text-white/50">
        El enlace que seguiste no lleva a ninguna parte, o la página cambió de
        dirección. Desde aquí puedes volver al proyecto.
      </p>

      <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
        <Link
          href="/"
          className="group inline-flex items-center gap-4 border border-white/20 px-8 py-4 text-[0.7rem] font-light uppercase tracking-[0.25em] text-white/80 transition-all duration-500 ease-silk hover:border-bronze hover:text-champagne"
        >
          Ir al inicio
          <span className="transition-transform duration-500 group-hover:translate-x-1">
            →
          </span>
        </Link>
        <Link
          href="/galeria"
          className="text-[0.7rem] font-light uppercase tracking-[0.25em] text-white/55 transition-colors duration-300 hover:text-champagne"
        >
          Ver la galería
        </Link>
      </div>

      <div className="mt-20 w-full max-w-3xl border-t border-white/10 pt-10">
        <h2 className="mb-6 text-[0.6rem] font-light uppercase tracking-[0.3em] text-bronze/70">
          Del proyecto
        </h2>
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {sugeridos.map((r) => (
            <li key={r.slug}>
              <Link
                href={`/galeria/${r.slug}`}
                className="text-[0.65rem] font-light uppercase tracking-[0.25em] text-white/45 transition-colors duration-300 hover:text-champagne"
              >
                {r.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
