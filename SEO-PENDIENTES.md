# SEO — pendientes

Estado al 2026-09-10. Lo que sigue abierto y quién puede cerrarlo.

Referencia: la checklist del cliente (Google Sheets, "SEO Checklist 2026",
4 hojas, 183 puntos). De esos, ~35 eran código, ~75 dependen de cuentas y
herramientas externas, y ~33 no aplican a este sitio (hreflang con un solo
idioma, paginadores y tags sin blog, bios de autor sin artículos firmados,
multi-ciudad con una sola sede).

---

## Bloquean todo lo demás

### 1. Google Search Console

**Nadie lo ha creado.** Sin esa propiedad, nada de lo que se implementó es
medible ni corregible: no se sabe qué se indexó, con qué consultas aparece,
ni si algo falla. Es el primer paso, no el último.

Al crearla, enviar `https://maleconbusiness.com/sitemap.xml`. Lo mismo en
Bing Webmaster Tools.

---

## Fugas de conversión activas

El sitio tiene hoy tres vías de contacto visibles. **Ninguna funciona.**

### 2. El formulario no envía nada

Ver el bloque de comentarios en `src/components/Contact.tsx`, sobre
`handleSubmit`. Resumen: los datos se descartan en el navegador y la página
responde "Hemos recibido tu solicitud. Un asesor se pondrá en contacto
contigo". Falta definir dónde se guardan los datos.

Arrastra consigo:

- La casilla de autorización de tratamiento de datos. La Ley 1581 de 2012
  exige consentimiento previo, expreso e informado. El formulario no la tiene.
- Las páginas de confianza, que hoy dan 404: política de tratamiento de datos
  personales y términos y condiciones. Hacen falta la razón social y el NIT
  del responsable, y deberían pasar por revisión legal.

A favor: el sitio no tiene analítica, cookies ni píxeles de rastreo
(verificado), así que la política será corta y podrá ser honesta.

### 3. El teléfono es un placeholder

`+57 300 000 0000`, en `src/lib/contact.ts`. El botón flotante de WhatsApp
hereda ese número, así que abre un chat con una cuenta que no existe.

### 4. Los perfiles de redes apuntan a los dominios pelados

`src/components/SocialLinks.tsx`: Instagram, LinkedIn y Facebook enlazan a
`https://instagram.com/`, `https://linkedin.com/` y `https://facebook.com/`.
Sin perfiles reales, el JSON-LD tampoco puede declarar `sameAs`, que es lo que
conecta el sitio con las redes en el grafo de Google.

---

## Contenido

### 5. Las 33 fichas de galería son contenido delgado

Cada una tiene una imagen y unas 20 palabras. Ya tienen título, descripción,
H1, migas y enlaces propios, pero un párrafo real por render —qué se está
viendo, desde dónde, qué destaca— las convertiría en páginas con algo que
decir. Hoy son 33 páginas casi vacías.

### 6. La keyword no está en la URL

La keyword principal es **"oficinas en la Zona Norte de Cartagena"**. El punto
de la checklist que pide tenerla en la URL no se puede cumplir: el sitio es de
una sola página y la home es `/`. Solo se resuelve creando páginas de
aterrizaje propias (`/oficinas-en-venta-cartagena`, por ejemplo), que es un
trabajo aparte y más grande.

### 7. FAQs

La checklist pide responder las primeras cuatro preguntas frecuentes de la
keyword principal, con su `FAQPage` en datos estructurados. Faltan las
respuestas: precios, fecha de entrega y condiciones de compra no están
definidas en el sitio.

---

## Herramientas externas

Todo esto necesita cuenta y licencia, y queda del lado del cliente o de la
agencia: Semrush o Ahrefs, Screaming Frog, Grammarly, Originality.ai,
CopyScape, Siteliner, GA4 y Google Tag Manager.

La hoja completa de **Google My Business / Local SEO** (63 puntos) es toda de
este tipo: depende de crear y verificar el perfil de negocio.

---

## Ya implementado — no rehacer

Redirección de www a no-www · canónicas y `metadataBase` · Open Graph y
Twitter Card · `robots.txt` con sitemap y agentes de IA · `sitemap.xml` con 35
URL y 70 imágenes · `llms.txt` · título, descripción, H1 y migas propios en las
33 fichas · datos estructurados (WebSite, Organization, Place, BreadcrumbList,
ImageObject) · jerarquía de encabezados sin saltos · alt descriptivo en los
renders · página 404 propia · video del hero diferido · keyword en título,
descripción, primer texto, primer H2 y nombre del póster.
