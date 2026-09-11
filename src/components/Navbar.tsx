"use client";

import { useEffect, useState } from "react";
import { NAV_LINKS, SECTION_IDS, scrollToSection } from "@/lib/sections";
import { useActiveSection } from "@/hooks/useActiveSection";
import MegaMenu from "@/components/MegaMenu";
import Logo from "@/components/Logo";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection(SECTION_IDS);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavigate = (id: string) => {
    setMenuOpen(false);
    scrollToSection(id);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-silk ${
          menuOpen
            ? "border-b border-transparent bg-transparent"
            : scrolled
            ? "border-b border-white/5 bg-ink/70 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        {/* El navbar se encoge al salir del hero. Arriba del todo el logo
            grande es presencia de marca y no estorba, porque no hay nada
            debajo; en el resto de la página es una barra fija tapando
            contenido, y ahí conviene que ocupe lo mínimo.
            Reutiliza el estado `scrolled` que ya movía el fondo, así que no
            agrega ni un listener más. */}
        <nav
          className={`mx-auto flex max-w-7xl items-center justify-between px-6 transition-all duration-500 ease-silk md:px-12 ${
            scrolled ? "py-3" : "py-5"
          }`}
        >
          {/* Logo */}
          <button
            onClick={() => handleNavigate("hero")}
            className="group flex flex-col items-start leading-none"
            aria-label="Malecón Business Center — inicio"
          >
            {/* Dos lockups, no uno encogido. El apilado tiene "MALECÓN" y
                "BUSINESS CENTER" en renglones separados: por debajo de ~60px
                de alto el segundo renglón se vuelve ilegible, así que achicarlo
                no era opción. El horizontal pone lo mismo en línea y aguanta
                barras bajas — es para lo que existe la variante.
                Los dos se renderizan siempre y se alterna cuál se muestra: así
                el navegador precarga ambos y al bajar no hay un cuadro sin
                logo. El oculto va con `hidden`, que no ocupa espacio. */}
            <Logo
              variant="stacked"
              className={`h-16 md:h-20 ${scrolled ? "hidden" : ""}`}
              hoverEffect
              priority
            />
            <Logo
              variant="horizontal"
              className={`h-9 md:h-10 ${scrolled ? "" : "hidden"}`}
              hoverEffect
              priority
            />
          </button>

          {/* Links desktop */}
          {/* gap-6 a 1024px y gap-10 desde 1280: con seis links, el espaciado
          amplio no cabe en 1024 y el logo —único bloque sin ancho mínimo—
          se comprimía para compensar. */}
          <ul className="hidden items-center gap-6 lg:flex xl:gap-10">
            {NAV_LINKS.map((section) => {
              const isActive = section.id === active;
              return (
                <li key={section.id}>
                  <button
                    onClick={() => handleNavigate(section.id)}
                    className={`group relative text-[0.7rem] font-light uppercase tracking-[0.25em] transition-colors ${
                      isActive ? "text-champagne" : "text-white/90 hover:text-white"
                    }`}
                  >
                    {section.label}
                    <span
                      className={`absolute -bottom-1 left-0 h-px bg-bronze transition-all duration-500 ease-silk ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Acciones derechas */}
          <div className="flex items-center gap-5">
            <button
              onClick={() => handleNavigate("contact")}
              className="hidden rounded-full border border-white/15 px-6 py-2 text-[0.65rem] font-light uppercase tracking-[0.25em] text-white/90 transition-all duration-500 ease-silk hover:border-bronze hover:text-champagne md:inline-block"
            >
              Agenda tu visita
            </button>

            {/* Botón MENÚ — oculto en escritorio: allí la barra horizontal ya
                lista las secciones y este botón la duplicaría. Móvil y tablet no
                muestran esa barra, así que aquí es la única navegación. */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={menuOpen}
              className="group -m-2 flex items-center gap-2.5 p-2 lg:hidden"
            >
              <span className="hidden text-[0.65rem] font-light uppercase tracking-[0.25em] text-white/90 transition-colors group-hover:text-white sm:inline">
                {menuOpen ? "Cerrar" : "Menú"}
              </span>
              <span className="flex h-8 w-8 flex-col items-center justify-center gap-[5px]">
                <span
                  className={`h-px bg-white transition-all duration-400 ease-silk ${
                    menuOpen ? "w-5 translate-y-[4.5px] rotate-45" : "w-5"
                  }`}
                />
                <span
                  className={`h-px bg-white transition-all duration-400 ease-silk ${
                    menuOpen ? "w-0 opacity-0" : "w-3.5"
                  }`}
                />
                <span
                  className={`h-px bg-white transition-all duration-400 ease-silk ${
                    menuOpen ? "w-5 -translate-y-[4.5px] -rotate-45" : "w-5"
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>
      </header>

      {/* Mega menú full-screen */}
      <MegaMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
