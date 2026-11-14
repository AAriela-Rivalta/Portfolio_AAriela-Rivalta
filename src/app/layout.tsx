import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import { profile } from "@/data/profile";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

/** URL pública: en Vercel se toma sola; si usás un dominio propio, definí NEXT_PUBLIC_SITE_URL. */
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

const title = `${profile.name} · ${profile.role}`;
const description = `Portfolio de ${profile.name}, ${profile.role.toLowerCase()} en ${profile.location}. React, Next.js, TypeScript y Tailwind CSS.`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  authors: [{ name: profile.name, url: profile.links.linkedin }],
  keywords: ["Desarrolladora Frontend", "React", "Next.js", "TypeScript", "Tailwind CSS", "React Native", "Córdoba", "Argentina"],
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "/",
    title,
    description,
    siteName: profile.name,
  },
  twitter: { card: "summary_large_image", title, description },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5efe3" },
    { media: "(prefers-color-scheme: dark)", color: "#0d1b16" },
  ],
};

/**
 * Se ejecuta antes de pintar la página: aplica el tema guardado (o el del
 * sistema) y marca que hay JavaScript, para evitar parpadeos.
 */
const themeScript = `(function(){try{var d=document.documentElement;d.classList.add("js");var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}d.setAttribute("data-theme",t);d.style.colorScheme=t}catch(e){}})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      data-theme="light"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${inter.variable} ${poppins.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
