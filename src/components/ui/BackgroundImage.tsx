import Image from "next/image";
import { blurFor } from "@/lib/blur";

interface BackgroundImageProps {
  src: string;
  /** Vacío por defecto: estas imágenes son decorativas y el texto va aparte. */
  alt?: string;
  /** Ancho que ocupará en pantalla. Sin esto el navegador pide el corte más
   *  grande y se descargan megas de más.
   *
   *  Ojo con los paneles más verticales que la imagen: con `object-cover` el
   *  recorte lo manda la ALTURA, no el ancho. Un panel de 33vw a pantalla
   *  completa necesita una imagen de ~165vh de ancho (el alto por la
   *  proporción 1.57 del render, más el 5% del zoom al pasar el cursor);
   *  pedirle 33vw servía un corte de 640px estirado 2.6 veces, y se veía.
   *  `vh` es válido en `sizes`, y el navegador que no lo entienda cae en
   *  100vw, que sirve de más y no de menos. */
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
