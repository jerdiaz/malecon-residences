"use client";

import { useState } from "react";
import VisorImagen from "@/components/ui/VisorImagen";

// ─────────────────────────────────────────────────────────────────────────────
// El mapa de conexiones, con el mismo visor que el plano de Plantas.
//
// Existe como componente aparte para que LocationSection siga siendo un
// componente de servidor: lo único que necesita estado es el propio panel, así
// que la isla de cliente se queda de este tamaño en vez de arrastrar la lista
// de destinos y la dirección al navegador.
// ─────────────────────────────────────────────────────────────────────────────

// Del viewBox del SVG: 494.693376 x 538.582677. El mapa es MÁS ALTO QUE ANCHO,
// aunque el panel que lo enmarca en móvil sea 16/9 — por eso lo que se ve en
// pantalla son unos 162x176, y no los 340 de ancho del hueco.
const MAPA_ASPECTO = 494.693376 / 538.582677;

export default function MapaAmpliable({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  const [ampliado, setAmpliado] = useState(false);

  return (
    <>
      <button
        onClick={() => setAmpliado(true)}
        // El alt de la imagen describe el mapa y se queda ahí, para los
        // buscadores y para quien lea la página; el rótulo del botón dice qué
        // hace al tocarlo, que es otra cosa. Mismo criterio que en Plantas.
        aria-label="Ampliar el mapa de conectividad"
        className="absolute inset-0 flex cursor-zoom-in items-center justify-center p-4 lg:px-4 lg:py-2"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="h-full w-full object-contain"
        />

        {/* Igual que en Plantas: en escritorio el `cursor-zoom-in` ya avisa, en
            táctil no hay cursor y nada decía que el mapa se pudiera abrir.
            Blanco sobre ink al 70%: 9,1:1 donde debajo hay mar y 7,0:1 donde
            hay tierra, que son los dos fondos posibles. */}
        <span
          aria-hidden
          className="pointer-events-none absolute bottom-3 right-3 rounded-full bg-ink/70 px-3 py-1.5 text-[0.6rem] font-medium uppercase tracking-[0.15em] text-white [@media(hover:hover)]:hidden"
        >
          Toca para ampliar
        </span>
      </button>

      {ampliado && (
        <VisorImagen
          src={src}
          label="Mapa de conectividad"
          alt={alt}
          aspecto={MAPA_ASPECTO}
          pista="Desliza para recorrer el mapa"
          onCerrar={() => setAmpliado(false)}
        />
      )}
    </>
  );
}
