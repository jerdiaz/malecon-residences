import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RENDERS, getRenderBySlug } from "@/lib/renders";

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

  if (!render) notFound();

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
        </div>

        <p className="mt-8 text-center text-[0.65rem] font-light uppercase tracking-[0.35em] text-champagne/90">
          {render.label}
        </p>
        <p className="mt-2 text-center font-serif text-sm font-light tracking-wide text-white/40">
          Malecón Business Center
        </p>
      </div>
    </main>
  );
}
