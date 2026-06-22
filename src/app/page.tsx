import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StoryBlock from "@/components/StoryBlock";
import LocationSection from "@/components/LocationSection";
import VideoSection from "@/components/VideoSection";
import Amenities from "@/components/Amenities";
import Explorer from "@/components/Explorer";
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
          kicker="Las Residencias"
          title="Diseñadas para quienes no aceptan medias tintas."
          body="Diez unidades irrepetibles distribuidas en seis niveles boutique. Materiales nobles, acabados de autor y vistas que hacen del horizonte una presencia constante. Cada residencia es una declaración de intenciones."
          image="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80"
          imagePos="right"
          cta={{ label: "Explorar residencias", sectionId: "explorer" }}
        />

        {/* Story 2 — El Caribe como contexto */}
        <StoryBlock
          id="entorno"
          kicker="El Entorno"
          title="El Caribe como ventana permanente."
          body="La Zona Norte de Cartagena de Indias: el destino más codiciado de la Costa colombiana. A pocos minutos del centro histórico y a cero metros del mar, Malecón Residences ocupa la última posición privilegiada disponible en esta franja costera."
          image="https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1600&q=80"
          imagePos="left"
        />

        {/* Ubicación — mapa y distancias */}
        <LocationSection />

        <VideoSection />
        <Amenities />
        <Explorer />
        <Contact />
      </main>
    </>
  );
}
