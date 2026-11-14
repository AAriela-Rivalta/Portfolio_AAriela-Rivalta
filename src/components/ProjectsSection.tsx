import { LuArrowUpRight } from "react-icons/lu";
import { TbBrandGithub } from "react-icons/tb";
import { profile } from "@/data/profile";
import { featuredProjects, otherProjects } from "@/data/projects";
import { cn } from "@/lib/utils";
import { ProjectCard } from "./ProjectCard";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

export function ProjectsSection() {
  // Con pocas tarjetas chicas, la grilla usa 2 columnas para no dejar huecos.
  const otherColumns = otherProjects.length + 1 >= 3 ? "lg:grid-cols-3" : "lg:grid-cols-2";

  return (
    <section id="proyectos" aria-labelledby="proyectos-title" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="proyectos-title"
          index="02"
          eyebrow="Proyectos"
          title={
            <>
              Proyectos <span className="text-primary">destacados.</span>
            </>
          }
          description="Una selección de lo que construí: un sistema de gestión médica, una plataforma de adopción con un recomendador con IA y una app móvil."
        />

        <div className="mt-16 space-y-16 lg:space-y-24">
          {featuredProjects.map((project, i) => (
            <Reveal key={project.slug}>
              <ProjectCard project={project} index={i + 1} variant="featured" reverse={i % 2 === 1} />
            </Reveal>
          ))}
        </div>

        <div className="mt-28">
          <Reveal>
            <h3 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">Otros proyectos</h3>
          </Reveal>
          {otherProjects.length === 0 ? (
            // Sin tarjetas chicas: solo el link a GitHub, a todo el ancho
            <Reveal className="mt-8">
              <GithubCard wide />
            </Reveal>
          ) : (
            <ul className={cn("mt-8 grid grid-cols-1 gap-8 md:grid-cols-2", otherColumns)}>
              {otherProjects.map((project, i) => (
                <li key={project.slug}>
                  <Reveal delay={i * 100} className="h-full">
                    <ProjectCard
                      project={project}
                      index={featuredProjects.length + i + 1}
                      variant="compact"
                    />
                  </Reveal>
                </li>
              ))}
              <li>
                <Reveal delay={otherProjects.length * 100} className="h-full">
                  <GithubCard />
                </Reveal>
              </li>
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}

/** Link a GitHub. `wide`: banda horizontal a todo el ancho en lugar de tarjeta de grilla. */
function GithubCard({ wide = false }: { wide?: boolean }) {
  const handle = (
    <p className={cn("inline-flex shrink-0 items-center gap-2 font-display font-semibold", !wide && "mt-8")}>
      github.com/{profile.links.githubUser}
      <LuArrowUpRight
        aria-hidden="true"
        className="size-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      />
    </p>
  );

  return (
    <a
      href={profile.links.github}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "spotlight group flex overflow-hidden rounded-[2rem] border-2 border-ink bg-band p-8 text-band-foreground shadow-hard transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-hard-lg",
        wide
          ? "flex-col gap-8 sm:p-10 md:flex-row md:items-center md:justify-between"
          : "h-full min-h-72 flex-col justify-between",
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.09] [background-image:radial-gradient(#f2eadb_1px,transparent_1.5px)] [background-size:22px_22px] [mask-image:linear-gradient(to_bottom,black,transparent_75%)]"
      />
      <div className={wide ? "flex flex-col gap-6 sm:flex-row sm:items-center" : "flex flex-1 flex-col"}>
        <TbBrandGithub
          aria-hidden="true"
          className="size-14 shrink-0 text-band-accent transition-transform duration-500 group-hover:-rotate-12"
        />
        <div className={cn(!wide && "mt-auto pt-10")}>
          <p className="font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            Más código en GitHub
          </p>
          <p className="mt-3 text-band-muted">Repositorios, pruebas y lo que voy construyendo.</p>
          {!wide && handle}
        </div>
      </div>
      {wide && handle}
      <span className="sr-only"> (se abre en una pestaña nueva)</span>
    </a>
  );
}
