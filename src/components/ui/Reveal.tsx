"use client";

import { motion } from "framer-motion";

type RevealVariant = "fade-up" | "fade-left" | "fade-right" | "clip" | "scale";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Delay in milliseconds */
  delay?: number;
  variant?: RevealVariant;
  once?: boolean;
}

const variants = {
  "fade-up":    { hidden: { opacity: 0, y: 32 },              visible: { opacity: 1, y: 0 } },
  "fade-left":  { hidden: { opacity: 0, x: -48 },             visible: { opacity: 1, x: 0 } },
  "fade-right": { hidden: { opacity: 0, x: 48 },              visible: { opacity: 1, x: 0 } },
  "clip":       { hidden: { clipPath: "inset(0 0 100% 0)" },  visible: { clipPath: "inset(0 0 0% 0)" } },
  "scale":      { hidden: { opacity: 0, scale: 0.94 },        visible: { opacity: 1, scale: 1 } },
} satisfies Record<RevealVariant, { hidden: Record<string, unknown>; visible: Record<string, unknown> }>;

export default function Reveal({
  children,
  className = "",
  delay = 0,
  variant = "fade-up",
  // Una sola vez por defecto. Con `false` cada bloque volvía a su estado
  // oculto al salir de pantalla y se reanimaba 1,1s al volver a entrar. En un
  // teléfono, donde la página son 18 pantallas y se sube y se baja con
  // golpes de dedo, eso era un parpadeo constante: al retroceder para releer
  // algo, el texto desaparecía y volvía a entrar debajo del dedo.
  // Quien quiera el comportamiento anterior puede pasar `once={false}`.
  once = true,
}: RevealProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.15 }}
      variants={variants[variant]}
      transition={{
        duration: 1.1,
        delay: delay / 1000,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
