import Image from "next/image";
import { blurFor } from "@/lib/blur";

interface BackgroundImageProps {
  src: string;
  /** Vacío por defecto: estas imágenes son decorativas y el texto va aparte. */
  alt?: string;
  /** Ancho que ocupará en pantalla. Sin esto el navegador pide el corte más
   *  grande y se descargan megas de más. */
  sizes: string;
  priority?: boolean;
  className?: string;
}

/**
 * Fondo a sangre servido por `next/image` en vez de `background-image` de CSS.
 * La diferencia importa: un fondo CSS se baja entero, sin redimensionar, sin
 * AVIF y sin aplazarse. Esto sí pasa por el optimizador y por el lazy-load.
 *
 * Va dentro de un contenedor `relative`; las animaciones (escala, opacidad,
 * ken burns) se aplican a ese contenedor, no aquí.
 */
export default function BackgroundImage({
  src,
  alt = "",
  sizes,
  priority = false,
  className = "",
}: BackgroundImageProps) {
  const blur = blurFor(src);

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className={`object-cover ${className}`}
      {...(blur ? { placeholder: "blur" as const, blurDataURL: blur } : {})}
    />
  );
}
