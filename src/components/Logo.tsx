import Image from "next/image";

// Logo oficial entregado por el cliente (agosto 2026).
//   stacked    → lockup original: ícono arriba, "MALECÓN" y "BUSINESS CENTER" debajo.
//                Pensado para gran formato; en espacios de poca altura el segundo
//                renglón queda ilegible, así que se usa donde sobra alto (footer).
//   horizontal → mismo ícono y mismo wordmark, dispuestos en línea. Es la variante
//                para barras compactas: mantiene "BUSINESS CENTER" legible.
const VARIANTS = {
  stacked: { src: "/images/logo/malecon-logo.png", width: 1100, height: 633 },
  horizontal: {
    src: "/images/logo/malecon-logo-horizontal.png",
    width: 1400,
    height: 266,
  },
} as const;

interface LogoProps {
  variant?: keyof typeof VARIANTS;
  /** true = el logo se atenúa cuando el contenedor padre (con clase "group") recibe hover */
  hoverEffect?: boolean;
  /** Clases de alto; el ancho se ajusta solo para respetar la proporción */
  className?: string;
  priority?: boolean;
}

export default function Logo({
  variant = "horizontal",
  hoverEffect = false,
  className = "h-12 md:h-14",
  priority = false,
}: LogoProps) {
  const { src, width, height } = VARIANTS[variant];

  return (
    <Image
      src={src}
      alt="Malecón Business Center"
      width={width}
      height={height}
      priority={priority}
      className={`w-auto ${className} ${
        hoverEffect
          ? "transition-opacity duration-500 ease-silk group-hover:opacity-80"
          : ""
      }`}
    />
  );
}
