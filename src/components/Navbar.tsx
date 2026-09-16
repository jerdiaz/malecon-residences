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
            className="group block leading-none"
            aria-label="Malecón Business Center — inicio"
          >
            {/* Dos lockups, no uno encogido. El apilado tiene "MALECÓN" y
                "BUSINESS CENTER" en renglones separados: por debajo de ~60px
                de alto el segundo renglón se vuelve ilegible, así que achicarlo
                no era opción. El horizontal pone lo mismo en línea y aguanta
                barras bajas — es para lo que existe la variante.
                Los dos se renderizan siempre (el navegador precarga ambos y al
                bajar no hay un cuadro sin logo), fuera del flujo y cruzándose
                en opacidad. Lo que sí ocupa espacio es el span de afuera, que
                anima su alto y su ancho entre los dos tamaños: como el logo es
                lo que marca la altura del header, así la barra se encoge con
                la misma curva que el fondo y el padding. Antes se alternaban
                con `hidden` y el header saltaba 40px en un frame mientras el
                resto seguía fundiéndose. Los anchos son el alto por la
                proporción de cada archivo (1100/633 y 1400/266). */}
            <span
              className={`relative block transition-all duration-500 ease-silk ${
                scrolled
                  ? "h-9 w-[190px] md:h-10 md:w-[211px]"
                  : "h-16 w-[111px] md:h-20 md:w-[139px]"
              }`}
            >
              <span
                aria-hidden={scrolled}
                className={`absolute left-0 top-1/2 -translate-y-1/2 transition-opacity duration-500 ease-silk ${
                  scrolled ? "opacity-0" : "opacity-100"
                }`}
              >
                <Logo
                  variant="stacked"
                  className="h-16 md:h-20"
                  hoverEffect
                  priority
                />
              </span>
              <span
                aria-hidden={!scrolled}
                className={`absolute left-0 top-1/2 -translate-y-1/2 transition-opacity duration-500 ease-silk ${
                  scrolled ? "opacity-100" : "opacity-0"
                }`}
              >
                <Logo
                  variant="horizontal"
                  className="h-9 md:h-10"
                  hoverEffect
                  priority
                />
              </span>
            </span>
          </button>

          {/* Links desktop */}
          {/* gap-6 a 1024px y gap-10 desde 1280: con seis links, el espaciado
          amplio no cabe en 1024 y el logo —único bloque sin ancho mínimo—
          se comprimía para compensar. */}
          {/* El lockup horizontal mide ~232px contra los ~139px del apilado:
              90px más de pista que hay que devolver. Como el navbar compacto
              ya iba justo con seis enlaces, en ese estado se aprieta el
              interlineado y el tamaño; en el hero se quedan como estaban. */}
          <ul
            className={`hidden items-center transition-[gap] duration-500 ease-silk lg:flex ${
              scrolled ? "gap-5 xl:gap-7" : "gap-6 xl:gap-10"
            }`}
          >
            {NAV_LINKS.map((section) => {
              const isActive = section.id === active;
              return (
                <li key={section.id}>
                  <button
                    onClick={() => handleNavigate(section.id)}
                    // `whitespace-nowrap`: "El Proyecto" son dos palabras y se
                    // partía en dos renglones, que era lo que hacía ver
                    // apretado el navbar compacto. No era falta de espacio.
                    // `transition-all` y no `transition-colors`: el tamaño y
                    // el tracking también cambian al encogerse el navbar, y
                    // sin esto saltaban de golpe mientras el fondo se fundía.
                    className={`group relative whitespace-nowrap font-light uppercase transition-all duration-500 ease-silk ${
                      scrolled
                        ? "text-[0.62rem] tracking-[0.18em]"
                        : "text-[0.7rem] tracking-[0.25em]"
                    } ${
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
              className={`hidden whitespace-nowrap rounded-full border border-white/15 font-light uppercase text-white/90 transition-all duration-500 ease-silk hover:border-bronze hover:text-champagne md:inline-block ${
                scrolled
                  ? "px-4 py-1.5 text-[0.6rem] tracking-[0.16em]"
                  : "px-6 py-2 text-[0.65rem] tracking-[0.25em]"
              }`}
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
