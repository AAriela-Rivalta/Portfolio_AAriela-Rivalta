import { LuArrowUpRight, LuAward, LuBriefcase, LuGraduationCap, LuLanguages, LuSparkles } from "react-icons/lu";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";
import { StackIcon } from "./ui/Icons";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

export function About() {
  return (
    <section
      id="sobre-mi"
      aria-labelledby="sobre-mi-title"
      className="bg-background-alt py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="sobre-mi-title"
          index="01"
          eyebrow="Sobre mí"
          title={
            <>
              Del diseño al código, <span className="text-primary">pantalla por pantalla.</span>
            </>
          }
        />

        {/* Bio + experiencia */}
        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          <Reveal className="space-y-5 text-lg leading-relaxed text-foreground/90 lg:col-span-7">
            {profile.about.map((paragraph, i) => (
              <p key={i} className={cn(i === 0 && "text-xl font-medium text-foreground sm:text-2xl sm:leading-snug")}>
                {paragraph}
              </p>
            ))}
          </Reveal>

          <Reveal delay={120} className="lg:col-span-5">
            <ExperienceCard />
          </Reveal>
        </div>

        {/* Stack */}
        <div className="mt-24">
          <Reveal>
            <h3 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">Mi stack</h3>
          </Reveal>
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {profile.stack.map((group, i) => (
              <Reveal
                key={group.title}
                delay={i * 100}
                className={cn(group.emphasis === "primary" && "lg:col-span-2")}
              >
                <article className="spotlight h-full rounded-3xl border-2 border-ink bg-surface p-6 sm:p-8">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h4 className="font-display text-xl font-semibold">{group.title}</h4>
                    <p className="text-sm text-muted">{group.description}</p>
                  </div>
                  <ul
                    className={cn(
                      "mt-6 grid gap-3",
                      group.emphasis === "primary"
                        ? "grid-cols-2 sm:grid-cols-4"
                        : "grid-cols-1 sm:grid-cols-2",
                    )}
                  >
                    {group.items.map((item) => (
                      <li
                        key={item.name}
                        className={cn(
                          "group flex items-center gap-3 rounded-2xl border border-border bg-background px-4 transition-colors hover:border-primary",
                          group.emphasis === "primary" ? "py-4" : "py-3",
                        )}
                      >
                        <span
                          className={cn(
                            "grid shrink-0 place-items-center rounded-xl bg-primary-soft text-primary transition-transform duration-300 group-hover:-rotate-6",
                            group.emphasis === "primary" ? "size-11" : "size-9",
                          )}
                        >
                          <StackIcon
                            name={item.icon}
                            className={group.emphasis === "primary" ? "size-6" : "size-5"}
                          />
                        </span>
                        <span className="font-medium leading-tight">{item.name}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Formación y certificaciones */}
        <div className="mt-24">
          <Reveal>
            <h3 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
              Formación y certificaciones
            </h3>
          </Reveal>
          <ul className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            <li>
              <Reveal className="h-full">
                <article className="spotlight flex h-full flex-col rounded-3xl border-2 border-ink bg-band p-6 text-band-foreground sm:p-7">
                  <span className="grid size-12 place-items-center rounded-2xl bg-band-foreground/10 text-band-accent">
                    <LuGraduationCap aria-hidden="true" className="size-6" />
                  </span>
                  <p className="mt-6 text-sm font-semibold uppercase tracking-[0.14em] text-band-accent">
                    Formación · {profile.education.period}
                  </p>
                  <h4 className="mt-2 font-display text-xl font-semibold leading-snug">
                    {profile.education.title}
                  </h4>
                  <p className="mt-auto pt-4 text-band-muted">{profile.education.institution}</p>
                </article>
              </Reveal>
            </li>
            {profile.certifications.map((cert, i) => (
              <li key={cert.title}>
              <Reveal delay={(i + 1) * 100} className="h-full">
                <article className="spotlight flex h-full flex-col rounded-3xl border-2 border-ink bg-surface p-6 sm:p-7">
                  <span className="grid size-12 place-items-center rounded-2xl bg-primary-soft text-primary">
                    <LuAward aria-hidden="true" className="size-6" />
                  </span>
                  <p className="mt-6 text-sm font-semibold uppercase tracking-[0.14em] text-accent-text">
                    Certificación · {cert.date}
                  </p>
                  <h4 className="mt-2 font-display text-xl font-semibold leading-snug">{cert.title}</h4>
                  <p className="mt-auto flex flex-wrap items-center gap-x-3 pt-4 text-muted">
                    <span>{cert.issuer}</span>
                    <span aria-hidden="true">·</span>
                    <span>{cert.duration}</span>
                  </p>
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary underline-offset-4 hover:underline"
                    >
                      Ver certificado
                      <LuArrowUpRight aria-hidden="true" className="size-4" />
                      <span className="sr-only"> (se abre en una pestaña nueva)</span>
                    </a>
                  )}
                </article>
              </Reveal>
              </li>
            ))}
          </ul>
        </div>

        {/* Idiomas y habilidades blandas */}
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-5">
          <Reveal className="md:col-span-2">
            <article className="h-full rounded-3xl border-2 border-ink bg-surface p-6 sm:p-7">
              <h3 className="flex items-center gap-3 font-display text-lg font-semibold">
                <LuLanguages aria-hidden="true" className="size-5 text-primary" />
                Idiomas
              </h3>
              <ul className="mt-6 space-y-5">
                {profile.languages.map((lang) => (
                  <li key={lang.name}>
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="font-medium">{lang.name}</span>
                      <span className="text-sm text-muted">{lang.level}</span>
                    </div>
                    <div aria-hidden="true" className="mt-2 h-2 overflow-hidden rounded-full bg-primary-soft">
                      <div className="h-full rounded-full bg-primary" style={{ width: `${lang.value}%` }} />
                    </div>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
          <Reveal delay={100} className="md:col-span-3">
            <article className="h-full rounded-3xl border-2 border-ink bg-surface p-6 sm:p-7">
              <h3 className="flex items-center gap-3 font-display text-lg font-semibold">
                <LuSparkles aria-hidden="true" className="size-5 text-primary" />
                Habilidades blandas
              </h3>
              <ul className="mt-6 flex flex-wrap gap-2.5">
                {profile.softSkills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-full border-2 border-ink bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-primary-foreground"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ExperienceCard() {
  const { experience } = profile;
  return (
    <article className="relative h-full overflow-hidden rounded-3xl border-2 border-ink bg-band p-6 text-band-foreground shadow-hard sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-band-accent">Experiencia</p>
          <h3 className="mt-2 font-display text-2xl font-bold">{experience.company}</h3>
          <p className="mt-1 text-band-muted">{experience.role}</p>
        </div>
        <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-band-foreground/10 text-band-accent">
          <LuBriefcase aria-hidden="true" className="size-6" />
        </span>
      </div>
      <p className="mt-4 inline-flex rounded-full border border-band-border px-3 py-1 text-sm">
        {experience.period}
      </p>
      <ol className="mt-8 space-y-6 border-l-2 border-band-border pl-6">
        {experience.milestones.map((milestone) => (
          <li key={milestone.date} className="relative">
            <span
              aria-hidden="true"
              className="absolute -left-[33px] top-1 size-4 rounded-full border-2 border-band bg-band-accent"
            />
            <p className="font-display text-sm font-semibold text-band-accent">{milestone.date}</p>
            <p className="mt-1 leading-relaxed text-band-foreground/90">{milestone.text}</p>
          </li>
        ))}
      </ol>
    </article>
  );
}
