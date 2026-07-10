import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BrandReveal from "@/components/BrandReveal";
import Pillars from "@/components/Pillars";
import StoryBlock from "@/components/StoryBlock";
import RendersGallery from "@/components/RendersGallery";
import LocationSection from "@/components/LocationSection";
import Amenities from "@/components/Amenities";
import Aliados from "@/components/Aliados";
import Partners from "@/components/Partners";
import Contact from "@/components/Contact";
import ScrollProgress from "@/components/ScrollProgress";
import SectionNav from "@/components/SectionNav";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <SectionNav />
      <main>
        <Hero />

        {/* Transición cinética — reveal del nombre de marca al bajar */}
        <BrandReveal />

        {/* Segunda vista — los 3 pilares (acordeón interactivo) */}
        <Pillars />

        {/* Story 1 — Las residencias */}
        <StoryBlock
          id="residencias"
          kicker="El Proyecto"
          title="Edificio de oficinas y locales corporativos de alto nivel."
          body="Malecón Business Center es un moderno centro de negocios ubicado en Cartagena, diseñado para ofrecer oficinas corporativas de alto nivel. Sus espacios boutique, acabados premium y excelente ubicación lo convierten en una opción ideal para empresas, profesionales e inversionistas que buscan un entorno empresarial exclusivo."
          image="/images/renders/render-08.png"
          imagePos="right"
          cta={{ label: "Ver galería", sectionId: "galeria" }}
        />

        {/* Por qué escogernos */}
        <StoryBlock
          id="porque"
          kicker="¿Por qué escogernos?"
          title="¿Por qué instalar tu empresa en un centro de negocios de alto nivel?"
          body={`El lugar donde opera una empresa también construye su reputación. Un centro de negocios moderno no solo ofrece oficinas; proyecta confianza, fortalece la imagen corporativa y crea el entorno ideal para impulsar el crecimiento empresarial.

En Malecón Business Center desarrollamos un proyecto de oficinas corporativas en Cartagena diseñado para empresas, inversionistas y profesionales que buscan un espacio alineado con los más altos estándares de calidad, funcionalidad y prestigio. Nuestra arquitectura contemporánea, los acabados premium y los espacios cuidadosamente diseñados reflejan los valores de organizaciones que entienden que la excelencia también se comunica a través de su sede.`}
          image="/images/renders/render-04.png"
          imagePos="left"
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

        {/* Aliados estratégicos (distintos de las marcas) */}
        <Aliados />

        {/* Marcas que han confiado en nosotros (marquee) */}
        <Partners />

        <Contact />
      </main>

      {/* Botón flotante de WhatsApp — permanente abajo a la derecha */}
      <WhatsAppButton />
    </>
  );
}
