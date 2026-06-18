import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import Stats from "@/components/Stats";
import Amenities from "@/components/Amenities";
import Explorer from "@/components/Explorer";
import Contact from "@/components/Contact";
import ScrollProgress from "@/components/ScrollProgress";
import SectionNav from "@/components/SectionNav";
import { SCROLL_SHELL_ID } from "@/lib/sections";

/**
 * Página única (SPA). El contenedor aplica scroll-snap vertical obligatorio;
 * cada sección ocupa la pantalla completa y "encaja" al desplazarse, emulando
 * la fluidez de Mercedes-Benz Places.
 */
export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <SectionNav />
      <main
        id={SCROLL_SHELL_ID}
        className="scroll-shell h-screen snap-y snap-mandatory overflow-y-scroll scroll-smooth"
      >
        <Hero />
        <Manifesto />
        <Stats />
        <Amenities />
        <Explorer />
        <Contact />
      </main>
    </>
  );
}
