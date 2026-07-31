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
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
