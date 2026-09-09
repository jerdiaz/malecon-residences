import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Pillars from "@/components/Pillars";
import StoryBlock from "@/components/StoryBlock";
import RendersGallery from "@/components/RendersGallery";
// import LocationSection from "@/components/LocationSection"; // sección
// oculta por ahora, reemplazada por Ubicacion (la página 8 del brochure tal
// cual, como imagen). El cliente pidió el mismo tratamiento que Amenidades;
// queda en el repo por si hay que volver a ella — descomentar este import y
// usar <LocationSection /> en vez de <Ubicacion />.
import Ubicacion from "@/components/Ubicacion";
// import Amenities from "@/components/Amenities"; // sección oculta por ahora,
// reemplazada por Amenidades (contenido real del brochure). El cliente pidió
// quitar esta versión; queda en el repo por si hay que volver a ella —
// descomentar este import y usar <Amenities /> en vez de <Amenidades />.
// import Amenidades from "@/components/Amenidades"; // Versión A — la página
// del brochure como imagen. Montada abajo la Versión B para verla en
// contexto; ver /preview-amenidades para las dos una junto a la otra.
import AmenidadesTexto from "@/components/AmenidadesTexto";
import Plantas from "@/components/Plantas";
import Aliados from "@/components/Aliados";
// import Partners from "@/components/Partners"; // sección oculta por ahora
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

        {/* Segunda vista — los 3 pilares (acordeón interactivo) */}
        <Pillars />

        {/* Story 1 — Las residencias */}
        <StoryBlock
          id="residencias"
          kicker="El Proyecto"
          title="Edificio de oficinas y locales corporativos de alto nivel."
          body="Malecón Business Center es un moderno centro de negocios ubicado en Cartagena, diseñado para ofrecer oficinas corporativas de alto nivel. Sus espacios boutique, acabados premium y excelente ubicación lo convierten en una opción ideal para empresas, profesionales e inversionistas que buscan un entorno empresarial exclusivo."
          image="/images/renders/frontal-palmeras.webp"
          imagePos="right"
          cta={{ label: "Ver galería", sectionId: "galeria" }}
        />

        {/* Por qué escogernos — "Malecón del Mar" es el nombre propio de otro
            proyecto de Cartagena, no una errata por "Mar Caribe" ni por el
            nombre de este proyecto. Confirmado por el cliente. No corregir. */}
        <StoryBlock
          id="porque"
          kicker="¿Por qué escogernos?"
          title="Inversión inmobiliaria en Cartagena"
          body="Invierte en Malecón Business Center, un activo inmobiliario premium con ubicación estratégica frente a Malecón del Mar y alta proyección de valorización."
          bullets={{
            label: "Beneficios",
            items: [
              "Potencial de valorización",
              "Demanda de oficinas corporativas",
              "Uso propio o renta",
            ],
          }}
          image="/images/renders/fachada-nocturna.webp"
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
          image="/images/renders/panoramica-zona-norte.webp"
          imagePos="left"
        />

        {/* Ubicación — mapa y distancias */}
        <Ubicacion />

        <AmenidadesTexto id="amenities" />

        {/* Plantas — va después de Amenidades y antes del cierre: es el
            contenido más concreto de la página, y quien lo mira ya está
            evaluando comprar. */}
        <Plantas />

        {/* Aliados estratégicos (distintos de las marcas) */}
        <Aliados />

        {/* Marcas que han confiado en nosotros (marquee) — OCULTA POR AHORA.
            Para reactivarla: descomentar esto, el import de Partners arriba, y
            la entrada "marcas" en src/lib/sections.ts (si no, el punto de la
            navegación lateral queda sin destino). */}
        {/* <Partners /> */}

        <Contact />
      </main>

      {/* Botón flotante de WhatsApp — permanente abajo a la derecha */}
      <WhatsAppButton />
    </>
  );
}
