import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Pillars from "@/components/Pillars";
import StoryBlock from "@/components/StoryBlock";
import RendersGallery from "@/components/RendersGallery";
import LocationSection from "@/components/LocationSection";
// import Ubicacion from "@/components/Ubicacion"; // la página 8 completa
// como imagen (mismo tratamiento que Amenidades). Se dejó de usar al llegar
// el SVG real del mapa: ahora LocationSection combina texto real con ese
// mapa recortado en su tab "Conexiones". Sigue en el repo por si hay que
// volver a ella — descomentar este import y usar <Ubicacion /> en vez de
// <LocationSection />.
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
import SeoJsonLd from "@/components/SeoJsonLd";
// import SectionNav from "@/components/SectionNav"; // navegación lateral por
// puntos (lado derecho). El cliente la pidió quitar por ilegible/de más;
// queda en el repo por si hay que volver a ella — descomentar este import y
// <SectionNav /> más abajo.
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />

        {/* Segunda vista — los 3 pilares (acordeón interactivo) */}
        <Pillars />

        {/* Story 1 — El proyecto.
            La imagen es la Escena 11 de la entrega, que ya vivía en la galería
            como "Acceso vehicular": se reusa el mismo archivo en vez de subir
            una copia. Reemplazó a `frontal-palmeras`. */}
        <StoryBlock
          id="residencias"
          kicker="El Proyecto"
          title="Edificio de oficinas y locales corporativos de alto nivel."
          body="Malecón Business Center es un moderno centro de negocios ubicado en Cartagena, diseñado para ofrecer oficinas corporativas de alto nivel. Sus espacios boutique, acabados premium y excelente ubicación lo convierten en una opción ideal para empresas, profesionales e inversionistas que buscan un entorno empresarial exclusivo."
          image="/images/renders/acceso-vehicular.webp"
          imageAlt="Acceso vehicular del Malecón Business Center, centro de negocios en la Zona Norte de Cartagena de Indias"
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
          imageAlt="Fachada nocturna del Malecón Business Center, oficinas y locales frente al Mar Caribe en Cartagena de Indias"
          imagePos="left"
        />

        {/* Galería de renders arquitectónicos */}
        <RendersGallery />

        {/* Story 2 — El Caribe como contexto.
            Se cambió `panoramica-zona-norte` por este render: aquel tenía una
            grúa y una torre en obra a la vista (a x≈1575 del original), y
            ningún encuadre de la animación de entrada las dejaba fuera. Este
            es la Escena 12 de la entrega, que ya vivía en la galería como
            "El malecón" — se reusa el mismo archivo en vez de duplicarlo. */}
        <StoryBlock
          id="entorno"
          kicker="El Entorno"
          title="El Caribe como ventana permanente."
          body="La Zona Norte de Cartagena de Indias: el destino más codiciado de la Costa colombiana. A pocos minutos del centro histórico y a cero metros del mar, Malecón Business Center ocupa la última posición privilegiada disponible en esta franja costera."
          image="/images/renders/malecon-playa.webp"
          imageAlt="Malecón Business Center visto desde la playa, sobre la Avenida Santander en Cartagena de Indias"
          imagePos="left"
        />

        {/* Ubicación — mapa y distancias */}
        <LocationSection />

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

      <SeoJsonLd />
    </>
  );
}
