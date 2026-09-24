"use client";

import { MotionConfig } from "framer-motion";

// ─────────────────────────────────────────────────────────────────────────────
// Hace que todo lo que anima Framer Motion respete `prefers-reduced-motion`.
//
// Con `reducedMotion="user"`, cuando el sistema pide menos movimiento, Framer
// deja de animar transformaciones —desplazar, escalar, girar— y sigue animando
// la opacidad. O sea: los títulos, los párrafos y las fotos siguen entrando
// en fundido, pero ya no suben, ni se deslizan, ni hacen zoom. Es el mismo
// criterio que globals.css aplica a las animaciones CSS.
//
// Va en el layout, envolviendo todo, porque Reveal, SplitWords, StoryBlock, el
// mega menú y la puerta de registro usan Framer y ninguno lo preguntaba.
// ─────────────────────────────────────────────────────────────────────────────

export default function PreferenciaMovimiento({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
