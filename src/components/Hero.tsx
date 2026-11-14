import type { CSSProperties } from "react";
import { LuArrowDown, LuBriefcase, LuDownload, LuGraduationCap, LuMapPin } from "react-icons/lu";
import { TbBrandGithub, TbBrandLinkedin } from "react-icons/tb";
import { profile } from "@/data/profile";
import { ButtonLink } from "./ui/ButtonLink";

/** Escalona la animación de entrada de cada elemento del hero. */
const delay = (ms: number) => ({ animationDelay: `${ms}ms` }) as CSSProperties;

export function Hero() {
  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden pt-28 pb-20 sm:pt-32 lg:flex lg:min-h-[100svh] lg:items-center lg:pb-24"
    >
      <HeroBackground />

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-8">
        <div className="lg:col-span-7">
          <p
            className="inline-flex animate-fade-up items-center gap-2 rounded-full border-2 border-ink bg-surface px-4 py-1.5 text-sm font-medium"
            style={delay(0)}
          >
            <span className="relative flex size-2.5" aria-hidden="true">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex size-2.5 rounded-full bg-accent" />
            </span>
            <LuMapPin aria-hidden="true" className="size-4 text-primary" />
            {profile.location}
          </p>

          <h1
            id="hero-title"
            className="mt-8 font-display text-[clamp(3.4rem,11vw,7.5rem)] font-extrabold leading-[0.9] tracking-[-0.04em]"
          >
            <span className="sr-only">
              {profile.name}, {profile.role}
            </span>
            <span aria-hidden="true" className="block">
              <span className="inline-block animate-blur-in" style={delay(120)}>
                {profile.firstName}
              </span>
            </span>
            <span aria-hidden="true" className="block text-primary">
              <span className="inline-block animate-blur-in" style={delay(300)}>
                {profile.lastName}
                <span className="text-accent">.</span>
              </span>
            </span>
          </h1>

          <p
            aria-hidden="true"
            className="mt-6 flex animate-fade-up flex-wrap items-center gap-x-4 gap-y-2 font-display text-2xl font-semibold tracking-tight sm:text-3xl"
            style={delay(500)}
          >
            <span className="relative">
              {profile.role}
              <svg
                viewBox="0 0 300 12"
                preserveAspectRatio="none"
                className="absolute -bottom-2 left-0 h-3 w-full text-accent"
              >
                <path
                  d="M2 9 C 60 2, 120 2, 180 6 S 270 10, 298 4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </p>

          <p
            className="mt-8 max-w-xl animate-fade-up text-lg leading-relaxed text-muted sm:text-xl"
            style={delay(650)}
          >
            {profile.tagline}
          </p>

          <div className="mt-10 flex animate-fade-up flex-wrap items-center gap-3 sm:gap-4" style={delay(800)}>
            <ButtonLink href={profile.cvPath} download={profile.cvFileName} variant="accent" size="lg">
              <LuDownload aria-hidden="true" className="size-5 transition-transform group-hover:translate-y-0.5" />
              Descargar CV
            </ButtonLink>
            <ButtonLink href={profile.links.linkedin} external size="lg">
              <TbBrandLinkedin aria-hidden="true" className="size-5" />
              LinkedIn
            </ButtonLink>
            <ButtonLink href={profile.links.github} external size="lg">
              <TbBrandGithub aria-hidden="true" className="size-5" />
              GitHub
            </ButtonLink>
          </div>

          <ul
            className="mt-12 flex animate-fade-up flex-col gap-3 text-sm text-muted sm:flex-row sm:flex-wrap sm:gap-x-8"
            style={delay(950)}
          >
            <li className="flex items-center gap-2">
              <LuBriefcase aria-hidden="true" className="size-4 text-primary" />
              Frontend en <strong className="font-semibold text-foreground">{profile.experience.company}</strong>
            </li>
            <li className="flex items-center gap-2">
              <LuGraduationCap aria-hidden="true" className="size-4 text-primary" />
              Tecnicatura en Desarrollo de Software
            </li>
          </ul>
        </div>

        <div className="lg:col-span-5">
          <CodeCard />
        </div>
      </div>

      <a
        href="#sobre-mi"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted transition-colors hover:text-foreground [@media(min-width:1024px)_and_(min-height:880px)]:flex"
      >
        Scroll
        <span className="grid h-10 w-6 place-items-start justify-center rounded-full border-2 border-current pt-1.5">
          <LuArrowDown aria-hidden="true" className="size-3 animate-bounce motion-reduce:animate-none" />
        </span>
        <span className="sr-only">: ir a Sobre mí</span>
      </a>
    </section>
  );
}

function HeroBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      <div className="bg-dots absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_72%)]" />
      <div className="absolute -right-24 -top-24 size-[28rem] animate-drift rounded-full bg-primary/25 blur-3xl dark:bg-primary/15" />
      <div
        className="absolute -bottom-32 -left-24 size-[24rem] animate-drift rounded-full bg-accent/20 blur-3xl dark:bg-accent/10"
        style={{ animationDelay: "-9s" }}
      />
    </div>
  );
}

function Key({ children }: { children: string }) {
  return <span className="text-band-muted">{children}</span>;
}

function Str({ children }: { children: string }) {
  return <span className="text-[#a8dcc0]">&quot;{children}&quot;</span>;
}

/** Tarjeta decorativa con un "objeto" TypeScript armado con datos reales. */
function CodeCard() {
  const frontend = profile.stack[0].items
    .map((item) => item.name)
    .filter((name) => name !== "React Native")
    .slice(0, 4);

  return (
    <figure className="relative mx-auto max-w-md animate-fade-up lg:max-w-none" style={delay(400)}>
      <div className="mr-4 animate-float [--float-rotate:-1.5deg] sm:mr-0">
        <div className="overflow-hidden rounded-3xl border-2 border-ink bg-band text-band-foreground shadow-hard-lg">
          <div className="flex items-center gap-2 border-b border-band-border px-5 py-3.5">
            <span className="size-3 rounded-full bg-accent" />
            <span className="size-3 rounded-full bg-band-muted/60" />
            <span className="size-3 rounded-full bg-[#a8dcc0]/70" />
            <span className="ml-3 font-mono text-xs text-band-muted">ariela.ts</span>
          </div>
          <pre className="overflow-x-auto px-5 py-6 font-mono text-[13px] leading-7 sm:text-sm" aria-hidden="true">
            <code>
              <span className="text-band-accent">const</span> ariela = {"{"}
              {"\n  "}
              <Key>rol</Key>: <Str>{profile.role}</Str>,{"\n  "}
              <Key>empresa</Key>: <Str>{profile.experience.company}</Str>,{"\n  "}
              <Key>stack</Key>: [{"\n    "}
              {frontend.map((name, i) => (
                <span key={name}>
                  <Str>{name}</Str>
                  {i < frontend.length - 1 ? ", " : ""}
                  {i === 1 ? "\n    " : ""}
                </span>
              ))}
              {"\n  "}],{"\n  "}
              <Key>móvil</Key>: <Str>React Native</Str>,{"\n  "}
              <Key>base</Key>: <Str>Córdoba, AR</Str>,{"\n"}
              {"}"};{"\n\n"}
              <span className="text-band-accent">export default</span> ariela;
              <span className="ml-1 inline-block h-5 w-2 translate-y-1 animate-caret bg-band-accent" />
            </code>
          </pre>
        </div>
      </div>

      <span
        aria-hidden="true"
        className="absolute -left-4 -top-5 rotate-[-6deg] rounded-full border-2 border-ink bg-accent px-4 py-1.5 font-display text-sm font-semibold text-accent-foreground shadow-hard-sm sm:-left-8"
      >
        Componentes reutilizables
      </span>
      <span
        aria-hidden="true"
        className="absolute -bottom-5 -right-2 rotate-[4deg] rounded-full border-2 border-ink bg-surface px-4 py-1.5 font-display text-sm font-semibold shadow-hard-sm sm:-right-6"
      >
        Integración con APIs
      </span>
      <figcaption className="sr-only">
        Mi perfil escrito como un objeto de TypeScript. Rol: {profile.role}. Empresa:{" "}
        {profile.experience.company}. Stack principal: {frontend.join(", ")}.
      </figcaption>
    </figure>
  );
}
