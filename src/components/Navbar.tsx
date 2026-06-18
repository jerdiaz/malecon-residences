"use client";

import { useEffect, useState } from "react";
import {
  NAV_LINKS,
  SECTION_IDS,
  SCROLL_SHELL_ID,
  scrollToSection,
} from "@/lib/sections";
import { useActiveSection } from "@/hooks/useActiveSection";

/**
 * Navegación flotante ultra-minimalista. Transparente sobre el Hero y
 * con un velo translúcido apenas el contenedor con snap comienza a desplazarse.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(SECTION_IDS);

  useEffect(() => {
    const shell = document.getElementById(SCROLL_SHELL_ID);
    if (!shell) return;

    const onScroll = () => setScrolled(shell.scrollTop > 40);
    onScroll();
    shell.addEventListener("scroll", onScroll, { passive: true });
    return () => shell.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavigate = (id: string) => {
    setOpen(false);
    scrollToSection(id);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-silk ${
        scrolled
          ? "border-b border-white/5 bg-ink/70 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-12">
        {/* Logo textual */}
        <button
          onClick={() => handleNavigate("hero")}
          className="group flex flex-col items-start leading-none"
          aria-label="Malecón Residences — inicio"
        >
          <span className="font-serif text-xl font-light tracking-[0.3em] text-white">
            MALECÓN
          </span>
          <span className="mt-1 text-[0.6rem] font-light uppercase tracking-[0.45em] text-bronze/80 transition-colors group-hover:text-champagne">
            Residences
          </span>
        </button>

        {/* Enlaces — desktop */}
        <ul className="hidden items-center gap-10 md:flex">
          {NAV_LINKS.map((section) => {
            const isActive = section.id === active;
            return (
              <li key={section.id}>
                <button
                  onClick={() => handleNavigate(section.id)}
                  className={`group relative text-[0.7rem] font-light uppercase tracking-[0.25em] transition-colors ${
                    isActive ? "text-champagne" : "text-white/70 hover:text-white"
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

        {/* CTA — desktop */}
        <button
          onClick={() => handleNavigate("contact")}
          className="hidden rounded-full border border-white/15 px-6 py-2 text-[0.65rem] font-light uppercase tracking-[0.25em] text-white/90 transition-all duration-500 ease-silk hover:border-bronze hover:text-champagne md:inline-block"
        >
          Agendar visita
        </button>

        {/* Toggle — mobile */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex h-8 w-8 flex-col items-center justify-center gap-1.5 md:hidden"
          aria-label="Abrir menú"
          aria-expanded={open}
        >
          <span
            className={`h-px w-6 bg-white transition-all duration-300 ${
              open ? "translate-y-[3.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-px w-6 bg-white transition-all duration-300 ${
              open ? "-translate-y-[3.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {/* Menú — mobile */}
      <div
        className={`overflow-hidden bg-ink/95 backdrop-blur-md transition-all duration-500 ease-silk md:hidden ${
          open ? "max-h-96 border-b border-white/5" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col gap-6 px-6 py-8">
          {NAV_LINKS.map((section) => (
            <li key={section.id}>
              <button
                onClick={() => handleNavigate(section.id)}
                className={`text-sm font-light uppercase tracking-[0.25em] ${
                  section.id === active ? "text-champagne" : "text-white/80"
                }`}
              >
                {section.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
