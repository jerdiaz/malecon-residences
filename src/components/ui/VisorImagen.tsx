"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// Superposición para leer una imagen en grande: el plano de Plantas y el mapa
// de conexiones de Ubicación. Salió de Plantas.tsx, donde vivía a medida,
// cuando el mapa resultó tener el mismo problema y la misma solución.
//
// Quien lo usa se queda con su propio disparador y su propio estado: aquí solo
// vive la capa de encima, que es la parte que costaba.
// ─────────────────────────────────────────────────────────────────────────────

interface VisorImagenProps {
  src: string;
  /** Rótulo al pie y nombre accesible del diálogo. */
  label: string;
  /** Texto alternativo. Por defecto, el rótulo. */
  alt?: string;
  /** Proporción ancho/alto del archivo. Ver la nota de la caja: es lo que
   *  permite decidir a qué tamaño mostrarlo sin esperar a que cargue. */
  aspecto: number;
  /** Qué decirle a quien va en táctil cuando la imagen no cabe entera. */
  pista?: string;
  onCerrar: () => void;
}

export default function VisorImagen({
  src,
  label,
  alt,
  aspecto,
  pista = "Desliza para recorrerla",
  onCerrar,
}: VisorImagenProps) {
  const cajaRef = useRef<HTMLDivElement>(null);
  const [recorrible, setRecorrible] = useState(false);

  // Arranca CENTRADO, no pegado al borde. Ahora que la imagen puede ser más
  // ancha que la pantalla, el punto de partida importa: el borde izquierdo del
  // plano general es mar abierto, así que al abrir se veía agua y palmeras y
  // el edificio quedaba fuera de cuadro hasta arrastrar.
  //
  // Se llama también desde el `load`: el tamaño depende de la proporción
  // intrínseca del archivo, que no se conoce hasta que llega, y estos SVG
  // pesan 2,2 MB y 350 KB. Si viene de caché, el efecto de montaje ya acierta.
  const centrar = useCallback(() => {
    const caja = cajaRef.current;
    if (!caja) return;
    caja.scrollLeft = (caja.scrollWidth - caja.clientWidth) / 2;
    caja.scrollTop = (caja.scrollHeight - caja.clientHeight) / 2;
    // Medido, no deducido de la proporción: así el rótulo de abajo aparece
    // exactamente cuando hay algo que recorrer, en cualquier ventana.
    setRecorrible(
      caja.scrollWidth > caja.clientWidth + 1 ||
        caja.scrollHeight > caja.clientHeight + 1
    );
  }, []);

  useEffect(centrar, [centrar]);

  // Mientras el visor está abierto, la página de debajo no se mueve. En táctil
  // importa más que en escritorio: ahora que la imagen se arrastra, al llegar
  // a su borde el gesto seguía de largo y lo que seguía desplazándose era la
  // página, así que al cerrar aparecías en otro sitio. El `overscroll-contain`
  // corta el encadenado; esto cierra el caso.
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={label}
      onClick={onCerrar}
      className="fixed inset-0 z-[70] flex animate-[fade-in_0.3s_ease-out] flex-col items-center justify-center bg-ink/95 p-4 backdrop-blur-sm md:p-10"
    >
      <button
        onClick={onCerrar}
        aria-label="Cerrar"
        className="absolute right-5 top-5 flex items-center gap-3 text-[0.65rem] font-light uppercase tracking-[0.25em] text-white/60 transition-colors duration-300 hover:text-champagne md:right-10 md:top-8"
      >
        Cerrar
        <span className="relative flex h-8 w-8 items-center justify-center">
          <span className="absolute h-px w-5 rotate-45 bg-current" />
          <span className="absolute h-px w-5 -rotate-45 bg-current" />
        </span>
      </button>

      {/* LA IMAGEN PUEDE SER MÁS GRANDE QUE EL VISOR, Y SE RECORRE.
          Antes esto iba en `w-full` dentro de un `max-w-6xl`: medía exactamente
          lo mismo que su contenedor, así que el `overflow-auto` no tenía nunca
          nada que desplazar. En escritorio daba igual porque el contenedor son
          1267px; en un teléfono el resultado era que ampliar no amplificaba.
          Medido a 375: el plano pasaba de 323x186 en la página a 340x196 en el
          visor —diecisiete píxeles— y no se podía arrastrar.

          La regla son dos ideas y no necesita puntos de corte. Llamando A al
          ancho con el que la imagen llenaría el alto del visor:

            1. Se muestra al mayor de dos tamaños, el que llena el ancho
               disponible (100%) o el que llena el alto (A).
            2. Con un tope: nunca más de vez y media el alto del visor, o sea
               1.5A de ancho.

          Lo que sobre de la caja se recorre arrastrando.

            plano, 375x812  → A=1072, 100%=343   → 1072. Se arrastra de lado;
                              3,3 veces lo que medía en la página, que es lo
                              que hace falta para leer los rótulos.
            plano, 812x375  → A=495, 100%=780    → 743 (tope). En apaisado
                              manda el ancho: encajar por alto lo dejaría MÁS
                              CHICO que en la página.
            plano, 1440x840 → A=1108, 100%=1267 → 1267. Igual que siempre.
            mapa,  375x812  → A=567, 100%=343    → 567. Contra los 161 que se
                              ven en la página, 3,5 veces.
            mapa,  1440x840 → A=587, 100%=1267 → 881 (tope).

          El tope es lo que arregla ese último caso. El mapa es MÁS ALTO QUE
          ANCHO (0.92) y en escritorio la caja es ancha: llenarle el ancho lo
          dejaba en 1252x1363 dentro de 672 de alto, casi 700px de arrastre
          vertical para ver una infografía que cabría entera. Con el tope son
          286, y la mitad larga del mapa se ve de una vez.

          Sirve igual para los planos verticales —las zonas, en 0.44— sin caso
          aparte: se ajustan por ancho y se recorren hacia abajo. */}
      <div
        ref={cajaRef}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[76svh] w-full max-w-6xl overflow-auto overscroll-contain md:max-h-[80vh]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt ?? label}
          onLoad={centrar}
          className="h-auto max-w-none"
          // 76svh y no 100: es el tope de la caja de arriba en móvil, que deja
          // sitio para el botón de cerrar y el rótulo del pie. 114 es ese
          // mismo alto por 1.5, el tope de la idea 2.
          style={{
            width: `min(max(100%, 76svh * ${aspecto}), 114svh * ${aspecto})`,
          }}
        />
      </div>

      <div onClick={(e) => e.stopPropagation()} className="mt-6 text-center">
        <p className="rotulo text-champagne">{label}</p>
        {/* Que se puede arrastrar no se ve solo: la imagen llena la pantalla y
            en táctil no hay barra de desplazamiento que lo insinúe. */}
        {recorrible && (
          <p className="rotulo mt-2 text-white/40 [@media(hover:hover)]:hidden">
            {pista}
          </p>
        )}
      </div>
    </div>
  );
}
