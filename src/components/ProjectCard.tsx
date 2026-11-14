import { LuArrowUpRight, LuCheck, LuExternalLink, LuGlobe, LuUsers } from "react-icons/lu";
import { TbBrandGithub } from "react-icons/tb";
import type { Project, ProjectLink } from "@/data/projects";
import { cn, isPending } from "@/lib/utils";
import { ProjectGallery } from "./projects/ProjectGallery";
import { ButtonLink } from "./ui/ButtonLink";
import { PendingNote } from "./ui/PendingNote";

type Props = {
  project: Project;
  /** Número que se muestra en la tarjeta (01, 02...). */
  index: number;
  variant?: "featured" | "compact";
  /** Invierte galería y texto en escritorio (para alternar tarjetas). */
  reverse?: boolean;
};

export function ProjectCard({ project, index, variant = "featured", reverse = false }: Props) {
  return variant === "featured" ? (
    <FeaturedCard project={project} index={index} reverse={reverse} />
  ) : (
    <CompactCard project={project} index={index} />
  );
}

// -----------------------------------------------------------------------------
// Tarjeta grande (proyectos destacados)
// -----------------------------------------------------------------------------

function FeaturedCard({ project, index, reverse }: { project: Project; index: number; reverse: boolean }) {
  const titleId = `${project.slug}-titulo`;
  const meta = [project.context, project.year].filter((v) => !isPending(v));
  // Las capturas de celular se ven mejor lado a lado que en el carrusel horizontal
  const onlyPhoneShots =
    project.media.length > 0 &&
    project.media.every((m) => m.type === "image" && m.orientation === "portrait");

  return (
    <article
      aria-labelledby={titleId}
      className="overflow-clip rounded-[2rem] border-2 border-ink bg-surface shadow-hard-lg"
    >
      <header className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-ink bg-background px-5 py-4 sm:px-8">
        <div className="flex items-center gap-3">
          <span className="font-display text-sm font-bold text-accent-text">{formatIndex(index)}</span>
          <span className="rounded-full border-2 border-ink bg-accent px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent-foreground">
            {project.category}
          </span>
        </div>
        {meta.length > 0 && <p className="text-sm text-muted">{meta.join(" · ")}</p>}
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div
          className={cn(
            "border-b-2 border-ink bg-background-alt p-4 sm:p-6 lg:col-span-7 lg:border-b-0",
            reverse ? "lg:order-2 lg:border-l-2" : "lg:border-r-2",
          )}
        >
          <div className="lg:sticky lg:top-28">
            {onlyPhoneShots ? (
              <div className="relative overflow-hidden rounded-2xl border-2 border-ink bg-primary-soft px-4 pb-14 pt-10 sm:px-8">
                <div aria-hidden="true" className="bg-dots absolute inset-0 opacity-40" />
                <div className="relative">
                  <ProjectGallery
                    projectTitle={project.title}
                    projectSlug={project.slug}
                    media={project.media}
                    variant="phones"
                    phoneSize="lg"
                  />
                </div>
              </div>
            ) : (
              <ProjectGallery projectTitle={project.title} projectSlug={project.slug} media={project.media} />
            )}
          </div>
        </div>

        <div className="flex flex-col p-6 sm:p-8 lg:col-span-5">
          <h3 id={titleId} className="font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            {project.title}
          </h3>
          <p className="mt-2 text-lg font-medium text-primary">{project.tagline}</p>
          <p className="mt-5 leading-relaxed text-muted">{project.description}</p>

          {project.parts && project.parts.length > 0 && (
            <div className="mt-6">
              <p className="text-xs font-bold uppercase tracking-wider text-accent-text">Partes del proyecto</p>
              <ol className="mt-3 grid gap-3">
                {project.parts.map((part, i) => (
                  <li key={part.name} className="rounded-2xl border-2 border-ink bg-background p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                      <span className="font-display font-bold text-accent-text">{formatIndex(i + 1)}</span> ·{" "}
                      {part.kind}
                    </p>
                    <p className="mt-1 font-display text-lg font-bold leading-snug">{part.name}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{part.description}</p>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {project.problem && (
            <div className="mt-6 rounded-2xl border-l-4 border-accent bg-background px-4 py-3">
              <p className="text-xs font-bold uppercase tracking-wider text-accent-text">Qué resuelve</p>
              <p className="mt-1 text-sm leading-relaxed">{project.problem}</p>
            </div>
          )}

          <ProjectActions project={project} className="mt-auto pt-8" />
        </div>
      </div>

      <div className="grid grid-cols-1 border-t-2 border-ink md:grid-cols-12">
        <div className="p-6 sm:p-8 md:col-span-7 md:border-r-2 md:border-ink">
          <h4 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-muted">Funcionalidades</h4>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {project.highlights.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-relaxed">
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
                  <LuCheck aria-hidden="true" className="size-3" strokeWidth={3} />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-7 p-6 sm:p-8 md:col-span-5">
          {project.stats && project.stats.length > 0 && (
            <dl className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-2 xl:grid-cols-3">
              {project.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col-reverse rounded-2xl border border-border bg-background p-3"
                >
                  <dt className="text-xs leading-snug text-muted">{stat.label}</dt>
                  <dd className="font-display text-3xl font-bold text-primary">{stat.value}</dd>
                </div>
              ))}
            </dl>
          )}

          <TechList technologies={project.technologies} />
          <ProjectCredits project={project} />
        </div>
      </div>
    </article>
  );
}

// -----------------------------------------------------------------------------
// Tarjeta chica (otros proyectos)
// -----------------------------------------------------------------------------

function CompactCard({ project, index }: { project: Project; index: number }) {
  const titleId = `${project.slug}-titulo`;
  const hasImages = project.media.some((m) => m.type === "image");

  return (
    <article
      aria-labelledby={titleId}
      className="group flex h-full flex-col overflow-hidden rounded-[2rem] border-2 border-ink bg-surface shadow-hard transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-hard-lg"
    >
      {hasImages && (
        <div className="relative overflow-hidden border-b-2 border-ink bg-primary-soft px-6 pb-10 pt-8">
          <div aria-hidden="true" className="bg-dots absolute inset-0 opacity-40" />
          <div className="relative">
            <ProjectGallery
              projectTitle={project.title}
              projectSlug={project.slug}
              media={project.media}
              variant="phones"
            />
          </div>
        </div>
      )}

      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-display text-sm font-bold text-accent-text">{formatIndex(index)}</span>
          <span className="rounded-full border-2 border-ink bg-background px-3 py-0.5 text-xs font-bold uppercase tracking-wider">
            {project.category}
          </span>
          {!isPending(project.year) && <span className="text-sm text-muted">{project.year}</span>}
        </div>

        <h3 id={titleId} className="mt-4 font-display text-2xl font-bold tracking-tight">
          {project.title}
        </h3>
        <p className="mt-1 font-medium text-primary">{project.tagline}</p>
        <p className="mt-4 leading-relaxed text-muted">{project.description}</p>

        <ul className="mt-5 space-y-2">
          {project.highlights.map((item) => (
            <li key={item} className="flex gap-2.5 text-sm">
              <LuCheck aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" strokeWidth={3} />
              {item}
            </li>
          ))}
        </ul>

        <TechList technologies={project.technologies} className="mt-6" />
        <ProjectCredits project={project} className="mt-5" />
        <ProjectActions project={project} className="mt-auto pt-7" compact />
      </div>
    </article>
  );
}

// -----------------------------------------------------------------------------
// Partes compartidas
// -----------------------------------------------------------------------------

function TechList({ technologies, className }: { technologies: string[]; className?: string }) {
  return (
    <div className={className}>
      <h4 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-muted">Tecnologías</h4>
      <ul className="mt-3 flex flex-wrap gap-2">
        {technologies.map((tech) => (
          <li
            key={tech}
            className="rounded-md border-2 border-ink bg-background px-2.5 py-1 text-xs font-bold uppercase tracking-wide"
          >
            {tech}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProjectCredits({ project, className }: { project: Project; className?: string }) {
  const showContext = !isPending(project.context) && !project.featured;
  return (
    <div className={cn("space-y-2 text-sm", className)}>
      {project.role !== undefined && (
        <>
          {!isPending(project.role) && (
            <p>
              <strong className="font-semibold">Mi rol:</strong> {project.role}
            </p>
          )}
          <PendingNote value={project.role} />
        </>
      )}
      {project.team && (
        <p className="flex items-start gap-2 text-muted">
          <LuUsers aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          {project.team}
        </p>
      )}
      {showContext && <p className="text-muted">{project.context}</p>}
      <PendingNote value={project.context} />
      {project.note && <p className="text-muted">{project.note}</p>}
    </div>
  );
}

function ProjectActions({
  project,
  className,
  compact = false,
}: {
  project: Project;
  className?: string;
  compact?: boolean;
}) {
  const hasDemo = Boolean(project.demoUrl) && !isPending(project.demoUrl);

  const extraLinks = compact ? [] : (project.extraLinks ?? []);

  return (
    <div className={className}>
      <div className="flex flex-wrap gap-3">
        <ButtonLink href={project.repoUrl} external variant="primary" aria-describedby={`${project.slug}-titulo`}>
          <TbBrandGithub aria-hidden="true" className="size-5" />
          Ver repositorio
        </ButtonLink>
        {hasDemo && project.demoUrl && (
          <ButtonLink href={project.demoUrl} external variant="accent" aria-describedby={`${project.slug}-titulo`}>
            <LuExternalLink aria-hidden="true" className="size-4" />
            Ver demo
          </ButtonLink>
        )}
      </div>

      {extraLinks.length > 0 && (
        <ul className="mt-5 space-y-2.5 border-t border-border pt-5">
          {extraLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-foreground underline decoration-border decoration-2 underline-offset-4 transition-colors hover:decoration-accent"
              >
                <ExtraLinkIcon kind={link.kind} />
                {link.label}
                <LuArrowUpRight
                  aria-hidden="true"
                  className="size-4 text-accent-text transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
                <span className="sr-only"> (se abre en una pestaña nueva)</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function ExtraLinkIcon({ kind }: { kind: ProjectLink["kind"] }) {
  if (kind === "repo") return <TbBrandGithub aria-hidden="true" className="size-4 text-primary" />;
  if (kind === "demo") return <LuGlobe aria-hidden="true" className="size-4 text-primary" />;
  return <LuExternalLink aria-hidden="true" className="size-4 text-primary" />;
}

function formatIndex(index: number) {
  return String(index).padStart(2, "0");
}
