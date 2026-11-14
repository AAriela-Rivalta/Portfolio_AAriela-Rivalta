# Portfolio · Ariela Rivalta

Sitio personal de **Ariela Rivalta, Desarrolladora Frontend**. Hecho con Next.js (App Router), React, TypeScript y Tailwind CSS, listo para publicar en Vercel.

## Correr el proyecto

Requisitos: Node.js 20.9 o superior.

```bash
npm install      # instala dependencias
npm run dev      # servidor de desarrollo en http://localhost:3000
npm run lint     # revisa el código con ESLint
npm run build    # build de producción (lo mismo que corre Vercel)
npm start        # sirve el build de producción
```

## Dónde se edita cada cosa

| Qué querés cambiar | Archivo |
| --- | --- |
| Proyectos (textos, tecnologías, capturas, links) | `src/data/projects.ts` |
| Datos personales, "Sobre mí", stack, formación, certificaciones | `src/data/profile.ts` |
| Colores (paleta 60/30/10) y animaciones | `src/app/globals.css` |
| Título del sitio y datos para buscadores | `src/app/layout.tsx` |

### Agregar o editar un proyecto

1. Abrí `src/data/projects.ts`.
2. Copiá uno de los objetos de la lista `projects` y cambiá los datos.
3. `featured: true` lo muestra como tarjeta grande con galería; `featured: false`, como tarjeta chica en "Otros proyectos".

No hace falta tocar ningún componente.

### Agregar capturas

1. Guardá la imagen en `public/projects/<slug-del-proyecto>/`, por ejemplo `public/projects/cuidapp/dashboard.png`.
2. En `src/data/projects.ts`, poné la ruta en `src` **sin** `/public`: `src: "/projects/cuidapp/dashboard.png"`.
3. Completá `alt` describiendo lo que se ve (es lo que lee un lector de pantalla).

Mientras `src` esté vacío se muestra un placeholder. Para capturas de celular, agregá `orientation: "portrait"`.

### Datos pendientes ("COMPLETAR")

Los textos que empiezan con `COMPLETAR` se marcan con un recuadro punteado **solo en `npm run dev`**. En producción se ocultan, así que el sitio nunca muestra la palabra "COMPLETAR".

### CV

El botón "Descargar CV" apunta a `public/CV_Ariela_Rivalta.pdf`. Copiá tu CV en esa carpeta con ese nombre exacto.

## Estructura

```
src/
├── app/
│   ├── layout.tsx            # fuentes, metadatos, script de tema (sin parpadeo)
│   ├── page.tsx              # arma la página con las secciones
│   ├── globals.css           # paleta, modo oscuro, animaciones
│   ├── icon.svg              # favicon
│   └── opengraph-image.tsx   # imagen al compartir el link
├── components/
│   ├── Navbar.tsx            # anclas, sección activa, menú móvil, tema
│   ├── Hero.tsx
│   ├── StackMarquee.tsx      # cinta de tecnologías
│   ├── About.tsx
│   ├── ProjectsSection.tsx
│   ├── ProjectCard.tsx       # variante destacada y compacta
│   ├── projects/             # galería, lightbox, terminal, placeholder
│   ├── Contact.tsx
│   ├── Footer.tsx
│   └── ui/                   # botones, encabezados, animación de aparición
├── data/
│   ├── profile.ts
│   └── projects.ts
└── lib/utils.ts
public/
└── projects/<slug>/          # capturas de cada proyecto
```

## Accesibilidad

- Contraste AA verificado en modo claro y oscuro.
- Navegación completa por teclado, enlace "Saltar al contenido" y foco visible.
- Galerías con flechas del teclado y lightbox nativo (`<dialog>`, se cierra con Esc).
- Textos alternativos en todas las imágenes.
- Las animaciones se desactivan si el sistema pide "reducir movimiento".

## Publicar en Vercel

### Opción A: desde GitHub (recomendada)

```bash
git add .
git commit -m "Portfolio inicial"
git branch -M main
git remote add origin https://github.com/AAriela-Rivalta/<nombre-del-repo>.git
git push -u origin main
```

Después, en [vercel.com/new](https://vercel.com/new), importá el repositorio y tocá **Deploy**. Vercel detecta Next.js solo. Cada `git push` vuelve a publicar el sitio.

### Opción B: con la CLI de Vercel

```bash
npm i -g vercel
vercel          # primera vez: vincula el proyecto y publica una vista previa
vercel --prod   # publica en producción
```

Si usás un dominio propio, definí la variable de entorno `NEXT_PUBLIC_SITE_URL` (por ejemplo `https://tu-dominio.com`) en Vercel para que la imagen al compartir use esa URL.
