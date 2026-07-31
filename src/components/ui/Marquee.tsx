"use client";

import { Children, Fragment, type ReactNode } from "react";

interface MarqueeProps {
  /** Modo texto (ticker del Hero): lista de frases, se repiten 4 veces. */
  items?: string[];
  /** Modo elementos (p. ej. logos): se duplica la lista una vez para el loop. */
  children?: ReactNode;
  className?: string;
  speed?: number;
  /** Pausa la animación al pasar el cursor sobre la pista. */
  pauseOnHover?: boolean;
}

export default function Marquee({
  items,
  children,
  className = "",
  speed = 1,
  pauseOnHover = false,
}: MarqueeProps) {
  const duration = `${40 / speed}s`;
  const childArray = children ? Children.toArray(children) : null;

  const trackClassName = childArray
    ? "animate-marquee flex w-max shrink-0 items-center gap-16 whitespace-nowrap pr-16 md:gap-24 md:pr-24"
    : "animate-marquee flex whitespace-nowrap";

  return (
    <div className={`${pauseOnHover ? "group/marquee " : ""}overflow-hidden ${className}`}>
      <div className={trackClassName} style={{ animationDuration: duration }}>
        {childArray
          ? [0, 1].flatMap((rep) =>
              childArray.map((node, i) => (
                <Fragment key={`${rep}-${i}`}>{node}</Fragment>
              )),
            )
          : [...Array(4)].map((_, i) => (
              <span
                key={i}
                className="mr-16 shrink-0 text-[0.6rem] font-light uppercase tracking-[0.4em] text-white/35"
              >
                {items!.join("  ·  ")}
              </span>
            ))}
      </div>
    </div>
  );
}
