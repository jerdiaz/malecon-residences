import Amenidades from "@/components/Amenidades";
import AmenidadesTexto from "@/components/AmenidadesTexto";

// ─────────────────────────────────────────────────────────────────────────────
// PÁGINA TEMPORAL DE COMPARACIÓN — no enlazada desde ningún lado.
// Sirve para elegir entre las dos versiones de la sección Amenidades.
// Borrar esta carpeta (y el componente descartado) cuando se decida.
// ─────────────────────────────────────────────────────────────────────────────

export const metadata = {
  title: "Comparar versiones de Amenidades",
  robots: { index: false, follow: false },
};

export default function PreviewAmenidades() {
  return (
    <main className="bg-ink">
      <Label text="Versión A — la página 7 del brochure, como imagen" />
      <Amenidades />
      <Label text="Versión B — el mismo contenido, transcrito con la tipografía del sitio" />
      <AmenidadesTexto />
    </main>
  );
}

function Label({ text }: { text: string }) {
  return (
    <div className="sticky top-0 z-50 border-y border-bronze/30 bg-bronze/10 px-6 py-3 backdrop-blur-sm md:px-12">
      <p className="text-[0.65rem] font-light uppercase tracking-[0.35em] text-champagne">
        {text}
      </p>
    </div>
  );
}
