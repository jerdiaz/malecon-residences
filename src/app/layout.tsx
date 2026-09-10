import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import { SITE_NAME, SITE_OG_IMAGE, SITE_URL } from "@/lib/site";
import GrainOverlay from "@/components/GrainOverlay";
import CustomCursor from "@/components/CustomCursor";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Jost({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500"],
  variable: "--font-sans",
  display: "swap",
});

const TITULO = "Malecón Business Center · Zona Norte, Cartagena de Indias";
// Bajo los 165 caracteres que pide la checklist. La anterior decía "oficinas
// y vivienda": se quedó de la etapa Malecón Residences, cuando el proyecto
// era de apartamentos. Hoy son oficinas y locales comerciales.
const DESCRIPCION =
  "Oficinas y locales comerciales frente al Mar Caribe, sobre la Avenida Santander en la Zona Norte de Cartagena de Indias.";

export const metadata: Metadata = {
  // Sin esto, Next no puede resolver las URL relativas de canónicas y Open
  // Graph, y las emite sin dominio.
  metadataBase: new URL(SITE_URL),
  title: TITULO,
  description: DESCRIPCION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: "/",
    siteName: SITE_NAME,
    title: TITULO,
    description: DESCRIPCION,
    images: [{ url: SITE_OG_IMAGE, width: 2560, height: 1696, alt: TITULO }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITULO,
    description: DESCRIPCION,
    images: [SITE_OG_IMAGE],
  },
  icons: {
    // El orden importa: el navegador toma el primero que sepa mostrar.
    //   icon.svg          → adaptativo, placa blanca solo en modo oscuro.
    //   icon-fallback.png → respaldo para navegadores sin favicon SVG; lleva la
    //                       placa siempre, que es lo legible en cualquier barra.
    // Van declarados aquí y no como src/app/icon.*, porque definir `icons` en
    // el metadata anula la convención de archivo y dejaría solo uno.
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-fallback.png", type: "image/png", sizes: "512x512" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${serif.variable} ${sans.variable}`}>
      <body className="bg-ink text-[#e7e3da] antialiased">
        {children}
        <GrainOverlay />
        <CustomCursor />
      </body>
    </html>
  );
}
