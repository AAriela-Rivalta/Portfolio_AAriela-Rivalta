import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { ProjectsSection } from "@/components/ProjectsSection";
import { StackMarquee } from "@/components/StackMarquee";
import { InteractiveEffects } from "@/components/ui/InteractiveEffects";

export default function Home() {
  return (
    <>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:border-2 focus:border-ink focus:bg-accent focus:px-5 focus:py-3 focus:font-display focus:font-semibold focus:text-accent-foreground"
      >
        Saltar al contenido
      </a>
      <Navbar />
      <main id="contenido" tabIndex={-1} className="outline-none">
        <Hero />
        <StackMarquee />
        <About />
        <ProjectsSection />
        <Contact />
      </main>
      <Footer />
      <InteractiveEffects />
    </>
  );
}
