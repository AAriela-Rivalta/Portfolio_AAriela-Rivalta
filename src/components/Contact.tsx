import type { ReactNode } from "react";
import { LuArrowUpRight, LuDownload, LuMail } from "react-icons/lu";
import { TbBrandGithub, TbBrandLinkedin } from "react-icons/tb";
import { profile } from "@/data/profile";
import { CopyEmailButton } from "./CopyEmailButton";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

export function Contact() {
  return (
    <section
      id="contacto"
      aria-labelledby="contacto-title"
      className="relative isolate overflow-hidden border-t-2 border-ink bg-band py-24 text-band-foreground sm:py-32"
    >
      <div
        aria-hidden="true"
        className="absolute -right-40 -top-40 -z-10 size-[32rem] rounded-full bg-band-accent/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-[0.08] [background-image:radial-gradient(#f2eadb_1px,transparent_1.5px)] [background-size:22px_22px]"
      />

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:items-end lg:px-8">
        <div className="lg:col-span-7">
          <SectionHeading
            id="contacto-title"
            index="03"
            eyebrow="Contacto"
            tone="band"
            title={
              <>
                ¿Hablamos<span className="text-band-accent">?</span>
              </>
            }
            description="Si te interesa mi perfil o querés conocer más sobre mis proyectos, escribime por mail o por LinkedIn."
          />

          <Reveal delay={120} className="mt-10">
            <a
              href={`mailto:${profile.email}`}
              className="group inline-flex max-w-full items-center gap-3 font-display text-xl font-bold tracking-tight break-all sm:text-3xl lg:text-4xl"
            >
              <LuMail aria-hidden="true" className="size-7 shrink-0 text-band-accent sm:size-9" />
              <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_3px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size] duration-500 group-hover:bg-[length:100%_3px]">
                {profile.email}
              </span>
            </a>
            <div className="mt-6">
              <CopyEmailButton email={profile.email} />
            </div>
          </Reveal>
        </div>

        <Reveal delay={200} className="lg:col-span-5">
          <ul className="flex flex-col gap-4">
            <li>
              <ContactLink
                href={profile.links.linkedin}
                external
                icon={<TbBrandLinkedin aria-hidden="true" className="size-6" />}
                label="LinkedIn"
                detail={`/in/${profile.links.linkedinUser}`}
              />
            </li>
            <li>
              <ContactLink
                href={profile.links.github}
                external
                icon={<TbBrandGithub aria-hidden="true" className="size-6" />}
                label="GitHub"
                detail={`@${profile.links.githubUser}`}
              />
            </li>
            <li>
              <ContactLink
                href={profile.cvPath}
                download={profile.cvFileName}
                icon={<LuDownload aria-hidden="true" className="size-6" />}
                label="Currículum"
                detail="Descargar PDF"
                highlight
              />
            </li>
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

function ContactLink({
  href,
  icon,
  label,
  detail,
  external = false,
  download,
  highlight = false,
}: {
  href: string;
  icon: ReactNode;
  label: string;
  detail: string;
  external?: boolean;
  download?: string;
  highlight?: boolean;
}) {
  return (
    <a
      href={href}
      download={download}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={
        highlight
          ? "group flex items-center gap-4 rounded-2xl border-2 border-ink bg-accent p-5 text-accent-foreground shadow-hard-sm transition-[transform,box-shadow] duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard"
          : "group flex items-center gap-4 rounded-2xl border-2 border-band-foreground/30 p-5 transition-colors hover:border-band-foreground hover:bg-band-foreground hover:text-band"
      }
    >
      <span
        className={
          highlight
            ? "grid size-12 shrink-0 place-items-center rounded-xl bg-accent-foreground/10"
            : "grid size-12 shrink-0 place-items-center rounded-xl bg-band-foreground/10"
        }
      >
        {icon}
      </span>
      <span className="flex-1">
        <span className="block font-display text-lg font-semibold">{label}</span>
        <span className="block text-sm opacity-80">{detail}</span>
      </span>
      <LuArrowUpRight
        aria-hidden="true"
        className="size-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      />
      {external && <span className="sr-only"> (se abre en una pestaña nueva)</span>}
    </a>
  );
}
