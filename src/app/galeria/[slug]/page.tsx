import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RENDERS, getRenderBySlug, getAdjacentRenders } from "@/lib/renders";
import GalleryKeyNav from "@/components/GalleryKeyNav";

export function generateStaticParams() {
  return RENDERS.map((r) => ({ slug: r.slug }));
}

export default async function RenderDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const render = getRenderBySlug(slug);
  const adjacent = getAdjacentRenders(slug);

  if (!render || !adjacent) notFound();

  const { prev, next, index, total } = adjacent;

  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-center bg-ink px-6 py-16">
      <Link
        href="/#galeria"
        className="group absolute left-6 top-6 flex items-center gap-3 text-[0.65rem] font-light uppercase tracking-[0.3em] text-white/60 transition-colors duration-300 hover:text-champagne md:left-12 md:top-8"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 transition-colors duration-300 group-hover:border-bronze">
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
            <path d="M9 1L3 7L9 13" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
          </svg>
        </span>
        Volver a la galería
      </Link>

      <GalleryKeyNav prevSlug={prev.slug} nextSlug={next.slug} />

      <div className="relative mt-16 w-full max-w-6xl">
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <Image
            src={render.src}
            alt={render.label}
            fill
            sizes="100vw"
            className="object-contain"
            priority
          />

          {/* Flecha anterior */}
          <Link
            href={`/galeria/${prev.slug}`}
            aria-label={`Anterior: ${prev.label}`}
            className="group absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-ink/50 text-white/70 backdrop-blur-sm transition-all duration-300 hover:border-bronze hover:text-champagne md:left-5 md:h-12 md:w-12"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M9 1L3 7L9 13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </Link>

          {/* Flecha siguiente */}
          <Link
            href={`/galeria/${next.slug}`}
            aria-label={`Siguiente: ${next.label}`}
            className="group absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-ink/50 text-white/70 backdrop-blur-sm transition-all duration-300 hover:border-bronze hover:text-champagne md:right-5 md:h-12 md:w-12"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M5 1L11 7L5 13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </Link>
        </div>

        <p className="mt-8 text-center text-[0.65rem] font-light uppercase tracking-[0.35em] text-champagne/90">
          {render.label}
        </p>
        <p className="mt-2 text-center font-serif text-sm font-light tracking-wide text-white/40">
          Malecón Business Center
        </p>
        <p className="mt-4 text-center text-[0.6rem] font-light uppercase tracking-[0.3em] tabular-nums text-white/30">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </p>
      </div>
    </main>
  );
}
