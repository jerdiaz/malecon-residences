import Aliados from "@/components/Aliados";
import AliadosAlt from "@/components/AliadosAlt";

// ─────────────────────────────────────────────────────────────────────────────
// PÁGINA TEMPORAL DE COMPARACIÓN — no enlazada desde ningún lado.
// Sirve para elegir entre las dos versiones de la sección Aliados.
// Borrar esta carpeta (y el componente descartado) cuando se decida.
// ─────────────────────────────────────────────────────────────────────────────

export const metadata = {
  title: "Comparar versiones de Aliados",
  robots: { index: false, follow: false },
};

export default function PreviewAliados() {
  return (
    <main className="bg-ink">
      <Label text="Versión A — la que está en la página hoy" />
      <Aliados />
      <Label text="Versión B — banda con render y portafolio en índice" />
      <AliadosAlt />
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
