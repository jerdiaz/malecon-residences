"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

// ─────────────────────────────────────────────────────────────────────────────
// Superposición para leer una imagen en grande: el plano de Plantas y el mapa
// de conexiones de Ubicación. Salió de Plantas.tsx, donde vivía a medida,
// cuando el mapa resultó tener el mismo problema y la misma solución.
//
// Quien lo usa se queda con su propio disparador y su propio estado: aquí solo
// vive la capa de encima, que es la parte que costaba.
//
// SE MONTA EN <body> CON UN PORTAL, no donde lo pone quien lo usa. El mapa de
// Ubicación vive dentro de un panel `lg:sticky`, y `position: sticky` abre su
// propio contexto de apilamiento: el `z-[70]` de esta capa dejaba de competir
// con la barra fija (`z-50`), que se pintaba ENCIMA. En producción, desde
// 1024px, la barra tapaba el botón de cerrar y el borde de arriba del mapa, y
// no había forma de salir. Lo mismo pasaría con un `transform` o un `filter`
// en cualquier ancestro; desde <body> no lo atrapa ninguno.
//
// ABRE ENTERA Y CENTRADA, Y SE ACERCA. Hasta el 2026-10-05 la imagen se abría
// a vez y media el alto del visor, pegada a la izquierda de una caja de
// 1152px y con una barra de desplazamiento al otro extremo: en escritorio el
// mapa salía cortado arriba y abajo, y para ver la leyenda había que dar con
// una barra que estaba lejos de él. El cliente pidió verlo entero y poder
// acercarse a una zona. Ahora:
//
//   · Se abre encajada: entera, centrada, sin nada que recorrer.
//   · Se acerca con la rueda o el pellizco del trackpad (hacia el puntero),
//     con un clic, con los botones + y −, con las teclas + − 0, y en táctil
//     pellizcando o con doble toque. Hasta 4 veces el tamaño encajado.
//   · Acercada, se mueve arrastrando, y nunca se deja sacar del cuadro.
//
// Una excepción a abrir encajada: si encajada ocupa menos del 40% del visor,
// se abre llenándolo. Es el plano general (1.74 de proporción) en un teléfono
// vertical: encajado mediría 343x197, lo mismo que en la página, y "ampliar"
// no ampliaría — que es justo lo que se corrigió en 226ebd5. El mapa no entra
// en la excepción en ningún tamaño medido.
// ─────────────────────────────────────────────────────────────────────────────

interface VisorImagenProps {
  src: string;
  /** Rótulo al pie y nombre accesible del diálogo. */
  label: string;
  /** Texto alternativo. Por defecto, el rótulo. */
  alt?: string;
  /** Proporción ancho/alto del archivo: es lo que permite encajarla sin
   *  esperar a que cargue, y estos SVG pesan 2,2 MB y 350 KB. */
  aspecto: number;
  onCerrar: () => void;
}

/** Cuánto se puede acercar, en veces el tamaño encajado. */
const MAX = 4;
/** Lo que acerca o aleja cada botón o tecla. */
const PASO = 1.5;
/** A cuánto lleva un clic o un doble toque. */
const DE_GOLPE = 2.5;

/** `s` en veces el tamaño encajado; `x` e `y`, desplazamiento del centro de
 *  la imagen respecto al del escenario, en px. */
interface Vista {
  s: number;
  x: number;
  y: number;
}

interface Medida {
  w: number;
  h: number;
}

type Punto = { x: number; y: number };

type Gesto =
  | { tipo: "mover"; desde: Punto; vista: Vista }
  | { tipo: "pellizco"; distancia: number; centro: Punto; vista: Vista };

/** El GestureEvent de Safari, que TypeScript no trae. */
type EventoGesto = Event & { scale: number; clientX: number; clientY: number };

const limitar = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));

/** Posición de un evento respecto al centro del escenario. */
function relativo(el: HTMLElement, clientX: number, clientY: number): Punto {
  const r = el.getBoundingClientRect();
  return {
    x: clientX - r.left - r.width / 2,
    y: clientY - r.top - r.height / 2,
  };
}

export default function VisorImagen({
  src,
  label,
  alt,
  aspecto,
  onCerrar,
}: VisorImagenProps) {
  const escenarioRef = useRef<HTMLDivElement>(null);
  const medidaRef = useRef<Medida | null>(null);
  const [medida, setMedida] = useState<Medida | null>(null);

  // La vista vive en un ref además de en el estado: los gestos llegan más
  // rápido de lo que React vuelve a pintar, y cada evento tiene que partir de
  // la vista que dejó el anterior, no de la del último render.
  const vistaRef = useRef<Vista>({ s: 1, x: 0, y: 0 });
  const [vista, setVista] = useState<Vista>(vistaRef.current);

  // NITIDEZ. Durante un gesto el tamaño cambia con `scale()`, que no obliga a
  // volver a dibujar la imagen y va fluido. Pero un SVG escalado así se ve
  // borroso: se dibujó al tamaño anterior y se estira. Por eso, en cuanto el
  // gesto se detiene, el tamaño pasa al `width` real (sBase) y el `scale()`
  // vuelve a 1: el navegador lo redibuja al tamaño en que se ve.
  const [sBase, setSBase] = useState(1);
  const [animar, setAnimar] = useState(false);
  const [arrastrando, setArrastrando] = useState(false);

  const punteros = useRef(new Map<number, Punto>());
  const gesto = useRef<Gesto | null>(null);
  const movido = useRef(false);
  const ultimoToque = useRef<{ t: number; p: Punto } | null>(null);

  const encajada = useCallback(
    (m: Medida): Medida => {
      const w = Math.min(m.w, m.h * aspecto);
      return { w, h: w / aspecto };
    },
    [aspecto]
  );

  /** Fija una vista, sin dejar acercar de más ni sacar la imagen del cuadro:
   *  si un lado cabe entero, va centrado; si no, sus bordes no entran. */
  const aplicar = useCallback(
    (s: number, x: number, y: number, conAnimacion = false) => {
      const m = medidaRef.current;
      if (!m) return;
      const e = encajada(m);
      const s2 = limitar(s, 1, MAX);
      const mx = Math.max(0, (e.w * s2 - m.w) / 2);
      const my = Math.max(0, (e.h * s2 - m.h) / 2);
      const nueva = { s: s2, x: limitar(x, -mx, mx), y: limitar(y, -my, my) };
      vistaRef.current = nueva;
      setVista(nueva);
      setAnimar(conAnimacion);
    },
    [encajada]
  );

  /** Acerca o aleja dejando quieto el punto (px, py) de la pantalla. */
  const acercar = useCallback(
    (factor: number, px = 0, py = 0, conAnimacion = false) => {
      const v = vistaRef.current;
      const s2 = limitar(v.s * factor, 1, MAX);
      const k = s2 / v.s;
      aplicar(s2, px - (px - v.x) * k, py - (py - v.y) * k, conAnimacion);
    },
    [aplicar]
  );

  const verCompleta = useCallback(() => aplicar(1, 0, 0, true), [aplicar]);

  /** Doble toque: si está acercada, vuelve a entera; si no, acerca ahí. */
  const alternar = useCallback(
    (p: Punto) => {
      if (vistaRef.current.s > 1.01) verCompleta();
      else acercar(DE_GOLPE, p.x, p.y, true);
    },
    [acercar, verCompleta]
  );

  // Medir el escenario antes de pintar, y otra vez si cambia (girar el
  // teléfono, redimensionar la ventana): la imagen se encaja contra él.
  useLayoutEffect(() => {
    const el = escenarioRef.current;
    if (!el) return;
    const medir = () => {
      const m = { w: el.clientWidth, h: el.clientHeight };
      if (!m.w || !m.h) return;
      const primera = !medidaRef.current;
      medidaRef.current = m;
      setMedida(m);
      if (primera) {
        // La excepción de la cabecera: si encajada apenas ocupa el visor,
        // arranca llenándolo.
        const e = encajada(m);
        const ocupa = (e.w * e.h) / (m.w * m.h);
        const s0 = ocupa < 0.4 ? Math.max(m.w / e.w, m.h / e.h) : 1;
        aplicar(s0, 0, 0);
        setSBase(vistaRef.current.s);
      } else {
        const v = vistaRef.current;
        aplicar(v.s, v.x, v.y);
      }
    };
    medir();
    const ro = new ResizeObserver(medir);
    ro.observe(el);
    return () => ro.disconnect();
  }, [aplicar, encajada]);

  // Pasar el tamaño al `width` cuando el gesto se detiene. Ver NITIDEZ.
  // 320ms deja terminar la transición de 200 de los botones antes del cambio,
  // que va sin transición: el tamaño en pantalla no se mueve.
  useEffect(() => {
    if (vista.s === sBase) return;
    const t = setTimeout(() => {
      setSBase(vistaRef.current.s);
      setAnimar(false);
    }, 320);
    return () => clearTimeout(t);
  }, [vista.s, sBase]);

  // Rueda y pellizco de trackpad. Van con addEventListener y no con onWheel
  // porque React los registra pasivos y entonces no se puede impedir que la
  // página haga zoom o se desplace por debajo.
  //
  // Chrome y Firefox mandan el pellizco como rueda con Ctrl; Safari no: manda
  // sus propios `gesture*`. En iPhone esos también llegan, pero allí el
  // pellizco ya entra por los pointer events de abajo, así que con dos dedos
  // apoyados se ignoran.
  useEffect(() => {
    const el = escenarioRef.current;
    if (!el) return;

    const alGirar = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaY;
      const p = relativo(el, e.clientX, e.clientY);
      acercar(Math.exp(-delta * (e.ctrlKey ? 0.01 : 0.002)), p.x, p.y);
    };

    let escalaPrevia = 1;
    const alEmpezarGesto = (e: Event) => {
      e.preventDefault();
      escalaPrevia = 1;
    };
    const alCambiarGesto = (e: Event) => {
      e.preventDefault();
      if (punteros.current.size > 1) return;
      const g = e as EventoGesto;
      const p = relativo(el, g.clientX, g.clientY);
      acercar(g.scale / escalaPrevia, p.x, p.y);
      escalaPrevia = g.scale;
    };

    el.addEventListener("wheel", alGirar, { passive: false });
    el.addEventListener("gesturestart", alEmpezarGesto);
    el.addEventListener("gesturechange", alCambiarGesto);
    return () => {
      el.removeEventListener("wheel", alGirar);
      el.removeEventListener("gesturestart", alEmpezarGesto);
      el.removeEventListener("gesturechange", alCambiarGesto);
    };
  }, [acercar]);

  // Arrastrar y pellizcar, con ratón, dedo o lápiz. Cada vez que cambia el
  // número de punteros apoyados el gesto vuelve a arrancar desde la vista
  // actual: así, al levantar un dedo de un pellizco, el que queda sigue
  // moviendo la imagen sin que salte.
  const reiniciarGesto = () => {
    const ps = [...punteros.current.values()];
    const v = vistaRef.current;
    if (ps.length >= 2) {
      const [a, b] = ps;
      gesto.current = {
        tipo: "pellizco",
        distancia: Math.hypot(a.x - b.x, a.y - b.y) || 1,
        centro: { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 },
        vista: v,
      };
    } else if (ps.length === 1) {
      gesto.current = { tipo: "mover", desde: ps[0], vista: v };
    } else {
      gesto.current = null;
    }
  };

  const alApoyar = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    punteros.current.set(e.pointerId, relativo(e.currentTarget, e.clientX, e.clientY));
    if (punteros.current.size === 1) movido.current = false;
    reiniciarGesto();
    setArrastrando(true);
  };

  const alMover = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!punteros.current.has(e.pointerId)) return;
    const p = relativo(e.currentTarget, e.clientX, e.clientY);
    punteros.current.set(e.pointerId, p);
    const g = gesto.current;
    if (!g) return;

    if (g.tipo === "mover") {
      const dx = p.x - g.desde.x;
      const dy = p.y - g.desde.y;
      // Unos píxeles de margen para que un clic o un toque con algo de
      // temblor no cuente como arrastre.
      if (!movido.current && Math.hypot(dx, dy) < 4) return;
      movido.current = true;
      aplicar(g.vista.s, g.vista.x + dx, g.vista.y + dy);
      return;
    }

    const [a, b] = [...punteros.current.values()];
    movido.current = true;
    const centro = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
    const s2 = limitar(
      (g.vista.s * Math.hypot(a.x - b.x, a.y - b.y)) / g.distancia,
      1,
      MAX
    );
    const k = s2 / g.vista.s;
    aplicar(
      s2,
      centro.x - (g.centro.x - g.vista.x) * k,
      centro.y - (g.centro.y - g.vista.y) * k
    );
  };

  const alSoltar = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!punteros.current.delete(e.pointerId)) return;

    if (e.type === "pointerup" && !movido.current && punteros.current.size === 0) {
      const p = relativo(e.currentTarget, e.clientX, e.clientY);
      if (e.pointerType === "mouse") {
        // Un clic acerca solo mientras está entera: es lo que promete el
        // cursor de lupa. Acercada, el cursor pasa a ser una mano y un clic
        // suelto no hace nada, para no acercar sin querer al arrastrar.
        if (vistaRef.current.s <= 1.01) acercar(DE_GOLPE, p.x, p.y, true);
      } else {
        const ahora = performance.now();
        const u = ultimoToque.current;
        if (u && ahora - u.t < 300 && Math.hypot(p.x - u.p.x, p.y - u.p.y) < 30) {
          alternar(p);
          ultimoToque.current = null;
        } else {
          ultimoToque.current = { t: ahora, p };
        }
      }
    }

    reiniciarGesto();
    if (punteros.current.size === 0) setArrastrando(false);
  };

  // Mientras el visor está abierto, la página de debajo no se mueve.
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Escape cierra, que es lo primero que se intenta en escritorio. + − y 0
  // hacen lo mismo que los botones.
  useEffect(() => {
    const alPulsar = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCerrar();
      else if (e.key === "+" || e.key === "=") acercar(PASO, 0, 0, true);
      else if (e.key === "-") acercar(1 / PASO, 0, 0, true);
      else if (e.key === "0") verCompleta();
    };
    window.addEventListener("keydown", alPulsar);
    return () => window.removeEventListener("keydown", alPulsar);
  }, [onCerrar, acercar, verCompleta]);

  // Solo se monta tras un clic del visitante, nunca en el servidor; la guarda
  // es por si algún día alguien lo renderiza abierto de entrada.
  if (typeof document === "undefined") return null;

  const e = medida ? encajada(medida) : null;
  const acercada = vista.s > 1.01;
  const parar = (ev: React.MouseEvent) => ev.stopPropagation();

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={label}
      onClick={onCerrar}
      className="fixed inset-0 z-[70] flex animate-[fade-in_0.3s_ease-out] flex-col bg-ink/95 backdrop-blur-sm"
    >
      <div className="flex shrink-0 justify-end px-5 pt-4 md:px-10 md:pt-6">
        <button
          onClick={onCerrar}
          aria-label="Cerrar"
          className="flex min-h-[44px] items-center gap-3 text-[0.65rem] font-light uppercase tracking-[0.25em] text-white/60 transition-colors duration-300 hover:text-champagne"
        >
          Cerrar
          <span className="relative flex h-8 w-8 items-center justify-center">
            <span className="absolute h-px w-5 rotate-45 bg-current" />
            <span className="absolute h-px w-5 -rotate-45 bg-current" />
          </span>
        </button>
      </div>

      {/* El escenario: ocupa todo lo que dejan la barra de arriba y los
          controles de abajo, y la imagen se encaja contra él. `touch-none`
          es lo que deja los pellizcos y arrastres a cargo de este código y no
          del navegador, que si no haría zoom a la página entera. */}
      <div
        ref={escenarioRef}
        onClick={parar}
        onPointerDown={alApoyar}
        onPointerMove={alMover}
        onPointerUp={alSoltar}
        onPointerCancel={alSoltar}
        className={`relative mx-4 min-h-0 flex-1 touch-none select-none overflow-hidden md:mx-10 ${
          acercada
            ? arrastrando
              ? "cursor-grabbing"
              : "cursor-grab"
            : "cursor-zoom-in"
        }`}
      >
        {e && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt ?? label}
            draggable={false}
            className={`pointer-events-none absolute left-1/2 top-1/2 max-w-none ${
              animar
                ? "transition-transform duration-200 ease-out motion-reduce:transition-none"
                : ""
            }`}
            style={{
              width: e.w * sBase,
              height: e.h * sBase,
              transform: `translate(-50%, -50%) translate(${vista.x}px, ${vista.y}px) scale(${vista.s / sBase})`,
            }}
          />
        )}
      </div>

      <div onClick={parar} className="shrink-0 px-4 pb-5 pt-4 text-center md:pb-8">
        <div className="flex items-center justify-center gap-3">
          <BotonZoom
            onClick={() => acercar(1 / PASO, 0, 0, true)}
            disabled={!acercada}
            label="Alejar"
          >
            −
          </BotonZoom>
          <button
            onClick={verCompleta}
            disabled={!acercada}
            className="min-h-[44px] px-3 text-[0.6rem] font-light uppercase tracking-[0.25em] text-white/70 transition-colors duration-300 hover:text-champagne disabled:cursor-default disabled:text-white/25 disabled:hover:text-white/25"
          >
            Ver completo
          </button>
          <BotonZoom
            onClick={() => acercar(PASO, 0, 0, true)}
            disabled={vista.s >= MAX - 0.01}
            label="Acercar"
          >
            +
          </BotonZoom>
        </div>

        <p className="rotulo mt-4 text-champagne">{label}</p>
        <p className="rotulo mt-2 hidden text-white/40 [@media(hover:hover)]:block">
          Clic o rueda para acercar · Arrastra para mover · Esc para cerrar
        </p>
        <p className="rotulo mt-2 text-white/40 [@media(hover:hover)]:hidden">
          Pellizca o toca dos veces para acercar
        </p>
      </div>
    </div>,
    document.body
  );
}

function BotonZoom({
  onClick,
  disabled,
  label,
  children,
}: {
  onClick: () => void;
  disabled: boolean;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-lg font-light leading-none text-white/80 transition-colors duration-300 hover:border-bronze hover:text-champagne disabled:cursor-default disabled:border-white/10 disabled:text-white/25 disabled:hover:border-white/10 disabled:hover:text-white/25"
    >
      {children}
    </button>
  );
}
