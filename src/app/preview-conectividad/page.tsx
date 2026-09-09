import MapaConectividad from "@/components/MapaConectividad";

// ─────────────────────────────────────────────────────────────────────────────
// PÁGINA TEMPORAL DE PRUEBA — no enlazada desde ningún lado.
//
// Recrea "Conectividad que impulsa los negocios" (página 8 del brochure) a
// partir de una captura que pasó el cliente por chat — no hay archivo fuente
// para esta página. Ver la nota completa en src/lib/conectividad.ts sobre
// qué tan aproximadas son las posiciones de los pines.
//
// No está montada en la página real: es para decidir si el enfoque sirve
// antes de invertir en ajustarla pixel a pixel o pedir el archivo original.
// ─────────────────────────────────────────────────────────────────────────────

export const metadata = {
  title: "Prueba: mapa de conectividad",
  robots: { index: false, follow: false },
};

export default function PreviewConectividad() {
  return (
    <main>
      <MapaConectividad />
    </main>
  );
}
