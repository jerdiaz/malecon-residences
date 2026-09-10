import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CATEGORY_LABELS,
  RENDERS,
  getRenderBySlug,
  getAdjacentRenders,
  getRendersByCategory,
} from "@/lib/renders";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import GalleryKeyNav from "@/components/GalleryKeyNav";

export function generateStaticParams() {
  return RENDERS.map((r) => ({ slug: r.slug }));
}

/**
 * Hasta el 2026-09-10 estas 33 páginas no declaraban metadata propia: heredaban
 * el título del layout, así que Google veía 33 URL distintas con el mismo
 * título y sin descripción. Cada una tiene ahora título, descripción y canónica
 * propios, y el H1 —el nombre del render— es distinto del título, como pide la
 * checklist.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const render = getRenderBySlug(slug);
  if (!render) return {};

  const titulo = `${render.label} · ${SITE_NAME}`;
  const descripcion = `${render.label} del ${SITE_NAME}, centro de negocios con oficinas y locales frente al Mar Caribe en la Zona Norte de Cartagena de Indias.`;
  const ruta = `/galeria/${render.slug}`;

  return {
    title: titulo,
    description: descripcion,
    alternates: { canonical: ruta },
    openGraph: {
      type: "article",
      locale: "es_CO",
      url: ruta,
      siteName: SITE_NAME,
      title: titulo,
      description: descripcion,
      images: [{ url: render.src, width: 2560, height: 1696, alt: render.label }],
    },
    twitter: {
      card: "summary_large_image",
      title: titulo,
      description: descripcion,
      images: [render.src],
    },
  };
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

  // Cuatro de la misma categoría, sin repetir la actual ni las dos que ya
  // enlazan las flechas.
  const relacionados = getRendersByCategory(render.category)
    .filter((r) => ![render.slug, prev.slug, next.slug].includes(r.slug))
    .slice(0, 4);

  const datosEstructurados = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: SITE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: "Galería",
            item: `${SITE_URL}/galeria`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: render.label,
            item: `${SITE_URL}/galeria/${render.slug}`,
          },
        ],
      },
      {
        "@type": "ImageObject",
        contentUrl: `${SITE_URL}${render.src}`,
        name: render.label,
        caption: `${render.label} del ${SITE_NAME}, Zona Norte de Cartagena de Indias`,
        representativeOfPage: true,
      },
    ],
  };

  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-center bg-ink px-6 py-16">
      {/* Migas de pan. Reemplazan al "Volver al inicio" suelto: dicen lo mismo
          y además dejan la estructura del sitio explícita para el visitante y
          para los buscadores, que era lo que faltaba aquí. */}
      <nav
        aria-label="Ruta de navegación"
        className="absolute left-6 top-6 flex items-center gap-2 text-[0.6rem] font-light uppercase tracking-[0.25em] text-white/40 md:left-12 md:top-8"
      >
        <Link href="/" className="transition-colors duration-300 hover:text-champagne">
          Inicio
        </Link>
        <span aria-hidden className="text-white/20">/</span>
        <Link href="/galeria" className="transition-colors duration-300 hover:text-champagne">
          Galería
        </Link>
        <span aria-hidden className="hidden text-white/20 sm:inline">/</span>
        <span className="hidden text-champagne/80 sm:inline">{render.label}</span>
      </nav>

      <Link
        href="/galeria"
        aria-label="Ver galería completa"
        className="group absolute right-6 top-6 flex items-center gap-3 text-[0.65rem] font-light uppercase tracking-[0.3em] text-white/60 transition-colors duration-300 hover:text-champagne md:right-12 md:top-8"
      >
        {/* El texto se oculta en móvil: junto al enlace de la izquierda no cabe */}
        <span className="hidden sm:inline">Ver galería completa</span>
        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 transition-colors duration-300 group-hover:border-bronze">
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <rect x="1" y="1" width="5" height="5" stroke="currentColor" strokeWidth="1" />
            <rect x="8" y="1" width="5" height="5" stroke="currentColor" strokeWidth="1" />
            <rect x="1" y="8" width="5" height="5" stroke="currentColor" strokeWidth="1" />
            <rect x="8" y="8" width="5" height="5" stroke="currentColor" strokeWidth="1" />
          </svg>
        </span>
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

        {/* El H1 de la ficha. Antes era un <p> y la página no tenía ninguno. */}
        <h1 className="mt-8 text-center text-[0.65rem] font-light uppercase tracking-[0.35em] text-champagne/90">
          {render.label}
        </h1>
        <p className="mt-2 text-center font-serif text-sm font-light tracking-wide text-white/40">
          Malecón Business Center
        </p>
        <p className="mt-4 text-center text-[0.6rem] font-light uppercase tracking-[0.3em] tabular-nums text-white/30">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </p>

        {/* Más de la misma categoría. Cumple dos cosas de la checklist a la
            vez: sube la ficha de 4 a 8 enlaces internos —pedía 5 o más— y
            evita que cada render quede colgando solo del anterior y el
            siguiente, que era una cadena de 33 eslabones y nada más. */}
        {relacionados.length > 0 && (
          <section className="mt-20 border-t border-white/10 pt-10">
            <h2 className="mb-6 text-center text-[0.6rem] font-light uppercase tracking-[0.3em] text-bronze/80">
              Más {CATEGORY_LABELS[render.category].toLowerCase()}
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {relacionados.map((r) => (
                <Link
                  key={r.slug}
                  href={`/galeria/${r.slug}`}
                  className="group block"
                >
                  <span className="relative block aspect-[3/2] overflow-hidden">
                    <Image
                      src={r.src}
                      alt={`${r.label} — ${SITE_NAME}, Cartagena de Indias`}
                      fill
                      sizes="(max-width: 640px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 ease-silk group-hover:scale-105"
                    />
                  </span>
                  <span className="mt-3 block text-[0.6rem] font-light uppercase tracking-[0.25em] text-white/45 transition-colors duration-300 group-hover:text-champagne">
                    {r.label}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Datos estructurados: la ruta de migas y la imagen. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(datosEstructurados) }}
      />
    </main>
  );
}
