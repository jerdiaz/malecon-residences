import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StoryBlock from "@/components/StoryBlock";
import RendersGallery from "@/components/RendersGallery";
import LocationSection from "@/components/LocationSection";
import Amenities from "@/components/Amenities";
import Contact from "@/components/Contact";
import ScrollProgress from "@/components/ScrollProgress";
import SectionNav from "@/components/SectionNav";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <SectionNav />
      <main>
        <Hero />

        {/* Story 1 — Las residencias */}
        <StoryBlock
          id="residencias"
          kicker="El Proyecto"
          title="Diseñado para quienes aprecian la calidad."
          body="Espacios irrepetibles distribuidos en seis niveles boutique. Materiales nobles, acabados de autor y vistas que hacen del horizonte una presencia constante. Cada espacio es una declaración de intenciones."
          image="/images/renders/render-08.png"
          imagePos="right"
          cta={{ label: "Ver galería", sectionId: "galeria" }}
        />

        {/* Galería de renders arquitectónicos */}
        <RendersGallery />

        {/* Story 2 — El Caribe como contexto */}
        <StoryBlock
          id="entorno"
          kicker="El Entorno"
          title="El Caribe como ventana permanente."
          body="La Zona Norte de Cartagena de Indias: el destino más codiciado de la Costa colombiana. A pocos minutos del centro histórico y a cero metros del mar, Malecón Business Center ocupa la última posición privilegiada disponible en esta franja costera."
          image="/images/renders/render-01.png"
          imagePos="left"
        />

        {/* Ubicación — mapa y distancias */}
        <LocationSection />

        <Amenities />
        <Contact />
      </main>
    </>
  );
}
