/**
 * Datos personales del portfolio.
 * Editá este archivo para cambiar textos, links, stack o formación
 * sin tocar los componentes.
 */

export type IconName =
  | "react"
  | "react-native"
  | "nextjs"
  | "typescript"
  | "javascript"
  | "tailwind"
  | "html"
  | "css"
  | "nodejs"
  | "csharp"
  | "dotnet"
  | "sql"
  | "git"
  | "github"
  | "ai";

export type StackItem = { name: string; icon: IconName };

export type StackGroup = {
  title: string;
  description: string;
  /** "primary" se muestra más grande: es el foco del perfil (frontend). */
  emphasis: "primary" | "secondary";
  items: StackItem[];
};

export type Certification = {
  title: string;
  issuer: string;
  duration: string;
  date: string;
  /** Link al certificado (opcional). Si lo agregás, aparece un botón. */
  credentialUrl?: string;
};

export type Milestone = { date: string; text: string };

export type Experience = {
  company: string;
  role: string;
  period: string;
  location: string;
  milestones: Milestone[];
};

export const profile = {
  name: "Ariela Rivalta",
  firstName: "Ariela",
  lastName: "Rivalta",
  role: "Desarrolladora Frontend",
  // Frase corta del hero. Texto sugerido: ajustalo a tu voz si querés.
  tagline:
    "Diseño y desarrollo interfaces web y móviles claras, accesibles y pensadas para las personas que las usan.",
  location: "Villa del Rosario, Córdoba, Argentina",
  email: "ariela.rivalta.ts@gmail.com",
  /** El PDF tiene que estar en /public con este nombre exacto. */
  cvPath: "/CV_Ariela_Rivalta.pdf",
  cvFileName: "CV_Ariela_Rivalta.pdf",
  links: {
    github: "https://github.com/AAriela-Rivalta",
    githubUser: "AAriela-Rivalta",
    linkedin: "https://www.linkedin.com/in/ariela-rivalta-6a880b270/",
    linkedinUser: "ariela-rivalta",
  },

  // "Sobre mí" en primera persona. Los datos son tuyos; la redacción es una
  // propuesta: revisala y cambiá lo que no suene a vos.
  about: [
    "Soy Ariela, desarrolladora frontend en GoodApps, en Villa del Rosario, Córdoba. Formo parte del equipo desde noviembre de 2025 y, desde febrero de 2026, trabajo en el área de Grandes Clientes, donde desarrollo pantallas y componentes reutilizables y los conecto con APIs.",
    "Me interesa el punto en el que el diseño se convierte en código: que una interfaz se vea bien, se entienda rápido y funcione igual de bien en el celular que en la computadora.",
    "En paralelo estudio la Tecnicatura Superior en Desarrollo de Software y sigo formándome en JavaScript y en inteligencia artificial aplicada al desarrollo.",
  ],

  experience: {
    company: "GoodApps",
    role: "Desarrolladora Frontend",
    period: "Nov. 2025 — actualidad",
    location: "Villa del Rosario, Córdoba",
    milestones: [
      {
        date: "Feb. 2026",
        text: "Área de Grandes Clientes: desarrollo pantallas y componentes reutilizables y los conecto con APIs.",
      },
      {
        date: "Nov. 2025",
        text: "Ingreso al equipo de desarrollo como desarrolladora frontend.",
      },
    ],
  } satisfies Experience,

  education: {
    title: "Tecnicatura Superior en Desarrollo de Software",
    institution: "Instituto Superior Villa del Rosario",
    period: "2024 — 2026",
  },

  certifications: [
    {
      title: "Ultimate JavaScript: de cero a programador experto",
      issuer: "Udemy",
      duration: "13 h",
      date: "Noviembre 2025",
    },
    {
      title: "IA: De 0 a Agentes",
      issuer: "BIG School",
      duration: "6 h",
      date: "Junio 2026",
    },
  ] satisfies Certification[] as Certification[],

  languages: [
    { name: "Español", level: "Nativo", value: 100 },
    { name: "Inglés", level: "Intermedio (B1/B2)", value: 60 },
  ],

  softSkills: [
    "Trabajo en equipo",
    "Comunicación",
    "Adaptabilidad",
    "Resolución de problemas",
    "Gestión del tiempo",
  ],

  stack: [
    {
      title: "Frontend",
      description: "Mi foco diario: interfaces web y móviles.",
      emphasis: "primary",
      items: [
        { name: "React", icon: "react" },
        { name: "React Native", icon: "react-native" },
        { name: "Next.js", icon: "nextjs" },
        { name: "TypeScript", icon: "typescript" },
        { name: "JavaScript", icon: "javascript" },
        { name: "Tailwind CSS", icon: "tailwind" },
        { name: "HTML", icon: "html" },
        { name: "CSS", icon: "css" },
      ],
    },
    {
      title: "También trabajo con",
      description: "Para entender y conectar el resto del sistema.",
      emphasis: "secondary",
      items: [
        { name: "Node.js", icon: "nodejs" },
        { name: "C#", icon: "csharp" },
        { name: "ASP.NET", icon: "dotnet" },
        { name: "SQL Server", icon: "sql" },
      ],
    },
    {
      title: "Herramientas",
      description: "Del versionado al trabajo diario.",
      emphasis: "secondary",
      items: [
        { name: "Git", icon: "git" },
        { name: "GitHub", icon: "github" },
        { name: "IA aplicada al desarrollo", icon: "ai" },
      ],
    },
  ] satisfies StackGroup[] as StackGroup[],

  /** Año que se muestra en el footer. */
  year: 2026,
};

/** Secciones del sitio: la navbar y el footer se arman con esta lista. */
export const navLinks = [
  { id: "inicio", label: "Inicio" },
  { id: "sobre-mi", label: "Sobre mí" },
  { id: "proyectos", label: "Proyectos" },
  { id: "contacto", label: "Contacto" },
] as const;

export type SectionId = (typeof navLinks)[number]["id"];
