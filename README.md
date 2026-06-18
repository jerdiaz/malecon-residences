<div align="center">

# Malecón Residences

**Residencias de súper lujo frente al Mar Caribe — Zona Norte, Cartagena de Indias**

Single Page Application inmersiva de presentación inmobiliaria, con una estética
minimalista y oscura.

![Next.js](https://img.shields.io/badge/Next.js-15-000000?logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)

</div>

---

## ✦ Sobre el proyecto

Mockup de alta fidelidad para una inmobiliaria boutique de un edificio de 6 niveles
frente al mar. El diseño es deliberadamente abstracto y geométrico: en lugar de
renders reales (aún no disponibles) usa imágenes de stock premium de arquitectura
minimalista y una fachada interactiva dibujada con líneas finas.

La experiencia se construye sobre **CSS Scroll-Snap**: cada sección ocupa la
pantalla completa y "encaja" al desplazarse, emulando la fluidez de las webs de
súper lujo.

## ✦ Características

**Secciones**
- **Hero** — portada a pantalla completa con tipografía serif delgada y fondo con *Ken Burns*.
- **Filosofía** — manifiesto sobrio con mucho *whitespace*.
- **Cifras** — banda de estadísticas con contadores animados al entrar en vista.
- **Amenidades** — galería por pestañas con fundido cruzado de fondos (Rooftop Infinity Pool, Private Beach Club, Wellness Spa, VIP Lounge).
- **Residencias** — *explorer* de apartamentos: una fachada abstracta reactiva al cursor a la izquierda y la ficha técnica de la unidad activa a la derecha.
- **Contacto** — formulario VIP minimalista con confirmación elegante.

**Capa premium / dinámica**
- Animaciones de aparición por sección (*scroll-reveal* con `IntersectionObserver`).
- Navegación lateral por puntos + enlace activo en el navbar.
- Barra de progreso de scroll.
- Grano de película + viñeta global y *shimmer* metálico en los acentos.
- Cursor personalizado (solo en dispositivos con puntero fino).
- Botones CTA con barrido de relleno al *hover*.
- Respeto por `prefers-reduced-motion` (desactiva el movimiento cuando el usuario lo prefiere).

## ✦ Stack

| | |
|---|---|
| **Framework** | Next.js 15 (App Router) |
| **Lenguaje** | TypeScript (estricto) |
| **Estilos** | Tailwind CSS 3.4 |
| **Tipografías** | Cormorant Garamond + Jost (`next/font`) |
| **Imágenes** | Placeholders de Unsplash |

**Paleta:** fondos profundos `#090d11`, texto blanco/grisáceo y acentos metálicos
en champaña `#d8c4a0` y bronce `#b08d57`.

## ✦ Puesta en marcha

```bash
# 1. Instalar dependencias
npm install

# 2. Servidor de desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # build de producción
npm run start   # servir el build
npm run lint    # linting
```

## ✦ Estructura

```
src/
├── app/
│   ├── layout.tsx          · fuentes, metadata y overlays globales
│   ├── page.tsx            · orquesta las secciones en el contenedor scroll-snap
│   └── globals.css         · base oscura + utilidades premium (grano, shimmer, Ken Burns)
├── components/
│   ├── Navbar.tsx          · navegación flotante con sección activa
│   ├── Hero.tsx · ScrollCue.tsx
│   ├── Manifesto.tsx
│   ├── Stats.tsx           · banda de cifras con contadores
│   ├── Amenities.tsx       · galería por pestañas
│   ├── Explorer/index.tsx  · buscador de apartamentos + fachada interactiva
│   ├── Contact.tsx         · formulario VIP
│   ├── SectionNav.tsx · ScrollProgress.tsx · GrainOverlay.tsx · CustomCursor.tsx
│   └── ui/Reveal.tsx       · wrapper de scroll-reveal reutilizable
├── hooks/
│   └── useActiveSection.ts
├── lib/
│   └── sections.ts         · ids de sección + scroll suave
├── data/
│   └── apartments.ts       · 10 unidades simuladas (pisos 2–6)
└── types/
    └── index.ts            · interfaz Apartment y uniones de tipos
```

## ✦ Personalización

- **Renders reales:** reemplaza las URLs de Unsplash en [`Hero.tsx`](src/components/Hero.tsx)
  y [`Amenities.tsx`](src/components/Amenities.tsx). Los dominios remotos se
  configuran en [`next.config.mjs`](next.config.mjs).
- **Inventario:** edita [`src/data/apartments.ts`](src/data/apartments.ts) (pisos,
  vistas, áreas, estado y *tier*). La fachada del *explorer* se reorganiza sola.
- **Paleta y tipografías:** [`tailwind.config.ts`](tailwind.config.ts) y
  [`src/app/layout.tsx`](src/app/layout.tsx).

---

<div align="center">
<sub>Proyecto privado · Mockup de demostración. Las imágenes son placeholders y no representan el proyecto final.</sub>
</div>
