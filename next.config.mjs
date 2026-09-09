/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Medido sobre estos renders: AVIF ahorra solo 1–10% y tarda el doble en
    // generarse en frío, porque la fuente ya es WebP con pérdida y re-comprimir
    // no recupera detalle. Se queda WebP a secas.
    //
    // Los renders no cambian sin cambiar de nombre, así que no tiene sentido
    // revalidarlos cada minuto (el valor por defecto).
    minimumCacheTTL: 31536000,
    // Sin el 3840 de la lista por defecto: ningún render del proyecto pasa de
    // 2560px de ancho, así que ese corte no agrega detalle, solo agranda
    // píxeles y pesa. La única fuente de 3840 es la foto aérea del lote, y
    // 2048 es techo suficiente para el panel donde se muestra.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
