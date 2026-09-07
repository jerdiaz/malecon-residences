import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
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

export const metadata: Metadata = {
  title: "Malecón Business Center · Zona Norte, Cartagena de Indias",
  description:
    "Proyecto de uso mixto de súper lujo frente al Mar Caribe. Espacios exclusivos de oficinas y vivienda en la Zona Norte de Cartagena de Indias.",
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
