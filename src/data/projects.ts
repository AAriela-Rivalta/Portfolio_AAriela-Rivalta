/**
 * ============================================================================
 *  PROYECTOS DEL PORTFOLIO
 * ============================================================================
 *  Este es el único archivo que tenés que editar para cambiar o sumar
 *  proyectos. Los componentes leen esta lista y arman las tarjetas solos.
 *
 *  - featured: true  → tarjeta grande con galería (proyectos destacados).
 *  - featured: false → tarjeta chica en "Otros proyectos".
 *  - El orden de la lista es el orden en pantalla.
 *
 *  Capturas:
 *  - Guardalas en /public/projects/<slug-del-proyecto>/ (por ejemplo
 *    /public/projects/cuidapp/dashboard.png) y poné la ruta en `src`,
 *    SIN "/public": "/projects/cuidapp/dashboard.png".
 *  - Mientras `src` esté vacío ("") se muestra un placeholder prolijo.
 *
 *  Campos pendientes:
 *  - Todo texto que empiece con "COMPLETAR" se marca en modo desarrollo
 *    (npm run dev) con un recuadro punteado y NO se muestra en producción.
 * ============================================================================
 */

export type TerminalLine = {
  text: string;
  tone?: "command" | "muted" | "success" | "accent" | "default";
};

export type ProjectMedia =
  | {
      type: "image";
      /** Ruta dentro de /public. Vacío = placeholder. */
      src: string;
      /** Texto alternativo: describí qué se ve en la captura. */
      alt: string;
      caption: string;
      /** "portrait" para capturas de celular. */
      orientation?: "landscape" | "portrait";
    }
  | {
      type: "terminal";
      title: string;
      caption: string;
      lines: TerminalLine[];
    };

export type ProjectLink = {
  label: string;
  href: string;
  kind: "repo" | "demo" | "external";
};

export type ProjectStat = { value: string; label: string };

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  /** Etiqueta destacada de la tarjeta. */
  category: string;
  featured: boolean;
  context: string;
  year: string;
  description: string;
  /** Qué problema resuelve (opcional). */
  problem?: string;
  highlights: string[];
  stats?: ProjectStat[];
  technologies: string[];
  /** Tu rol en el proyecto. */
  role: string;
  team?: string;
  media: ProjectMedia[];
  repoUrl: string;
  /** Link a la demo. Dejalo sin definir si no hay demo publicada. */
  demoUrl?: string;
  extraLinks?: ProjectLink[];
  note?: string;
};

export const projects: Project[] = [
  // --------------------------------------------------------------------------
  // PROYECTO PRINCIPAL
  // --------------------------------------------------------------------------
  {
    slug: "cuidapp",
    title: "CuidApp",
    tagline: "Sistema de gestión médica para consultorios y clínicas ambulatorias",
    category: "Proyecto principal",
    featured: true,
    context: "Proyecto académico · Práctica Profesionalizante I",
    // El historial del repositorio va de octubre de 2025 a noviembre de 2026.
    year: "2025 — 2026",
    description:
      "Aplicación web con roles de administrador, médicos y pacientes, cada uno con su propio panel. Reúne usuarios y pacientes con historial médico, turnos, historia clínica, estudios médicos, facturación y un dashboard con estadísticas.",
    problem:
      "Centralizar en un solo sistema web la gestión de un consultorio o clínica ambulatoria, con un acceso distinto para cada rol.",
    highlights: [
      "Paneles separados para administración, médicos y pacientes",
      "Usuarios y pacientes con historial médico y antecedentes",
      "Turnos: agenda, disponibilidad e historial",
      "Historia clínica con consultas, signos vitales y estudios médicos",
      "Facturación con registro de pagos y factura en PDF",
      "Dashboard con gráficos de estadísticas y reportes en PDF",
      "Consultas por videollamada (telemedicina) con WebRTC",
    ],
    stats: [
      { value: "3", label: "roles con panel propio" },
      { value: "8", label: "módulos de administración" },
    ],
    technologies: [
      "React 18",
      "React Router",
      "React-Bootstrap",
      "Recharts",
      "Axios",
      "Socket.IO",
      "WebRTC",
      "Python",
      "Flask",
      "SQLAlchemy",
      "SQLite",
    ],
    role: "COMPLETAR: tu rol en CuidApp (por ejemplo, qué pantallas o módulos desarrollaste).",
    team: "Proyecto en equipo con Lara López y Estefanía Roggero.",
    media: [
      {
        type: "image",
        src: "", // COMPLETAR: "/projects/cuidapp/dashboard.png"
        alt: "Dashboard de CuidApp con gráficos de estadísticas de turnos y pacientes",
        caption: "Dashboard con estadísticas",
      },
      {
        type: "image",
        src: "", // COMPLETAR: "/projects/cuidapp/turnos.png"
        alt: "Agenda de turnos de CuidApp",
        caption: "Gestión de turnos",
      },
      {
        type: "image",
        src: "", // COMPLETAR: "/projects/cuidapp/historia-clinica.png"
        alt: "Historia clínica de un paciente en CuidApp",
        caption: "Historia clínica",
      },
      {
        type: "image",
        src: "", // COMPLETAR: "/projects/cuidapp/facturacion.png"
        alt: "Pantalla de facturación de CuidApp",
        caption: "Facturación",
      },
    ],
    repoUrl: "https://github.com/AAriela-Rivalta/CuidApp-public",
    // demoUrl: "COMPLETAR si publicás una demo",
    note: "Versión pública del repositorio, sin datos sensibles.",
  },

  // --------------------------------------------------------------------------
  // PROYECTO DE AUTOMATIZACIÓN
  // --------------------------------------------------------------------------
  {
    slug: "recomendador-mascotas",
    title: "Recomendador Inteligente de Mascotas",
    tagline: "Automatización en Node.js para Refugio Conectado",
    category: "Proyecto de automatización",
    featured: true,
    context: "Proyecto académico · Refugio Conectado",
    year: "2026",
    description:
      "Automatización que recomienda mascotas en adopción según el perfil de cada adoptante. Combina un motor de reglas explicable con un ranking opcional con IA (Groq). Si la IA no está disponible, el proceso sigue funcionando por reglas y lo informa.",
    problem:
      "Recomendar una mascota a cada persona implicaba leer su perfil, revisar una por una las mascotas del refugio y descartar las que no pueden convivir con su familia.",
    highlights: [
      "Motor de reglas explicable: cada recomendación dice por qué encaja y qué tener en cuenta",
      "Restricciones de convivencia obligatorias: niños, otras mascotas, especie y disponibilidad",
      "Ranking opcional con IA (Groq), validado y con respaldo automático por reglas",
      "Informes en Markdown para leer y en JSON para integrar con otros sistemas",
      "Modo conversación con Luna, la asistente, en la terminal",
    ],
    stats: [
      { value: "29", label: "pruebas automáticas" },
      { value: "2", label: "modos: por lotes y conversación" },
      { value: "8", label: "criterios del perfil del adoptante" },
    ],
    technologies: ["Node.js", "JavaScript", "Groq (IA)", "JSON", "Markdown", "node:test"],
    role: "COMPLETAR: tu rol en el Recomendador (por ejemplo, qué parte del motor, las pruebas o el modo conversación desarrollaste).",
    team: "Proyecto en equipo con Lara López y Estefanía Roggero.",
    media: [
      {
        type: "terminal",
        title: "npm run lote",
        caption: "Modo por lotes: salida real del motor, sin clave de IA",
        lines: [
          { text: "$ npm run lote", tone: "command" },
          { text: "🐾 Recomendador Inteligente de Mascotas — modo por lotes", tone: "default" },
          { text: "   Mascotas: 14 · Perfiles: 5 · IA: no configurada, se usan reglas", tone: "muted" },
          { text: "" },
          { text: "   ✓ perfil-01: Michi (100%) [reglas]", tone: "success" },
          { text: "   ✓ perfil-02: Rayo (100%) [reglas]", tone: "success" },
          { text: "   ✓ perfil-03: Tita (100%) [reglas]", tone: "success" },
          { text: "   ✓ perfil-04: Rayo (100%) [reglas]", tone: "success" },
          { text: "   ✓ perfil-05: Sombra (56%) [reglas]", tone: "success" },
          { text: "" },
          { text: "   Informes generados:", tone: "default" },
          { text: "   - salida/informe-20261113-183146.md", tone: "accent" },
          { text: "   - salida/informe-20261113-183146.json", tone: "accent" },
        ],
      },
      {
        type: "terminal",
        title: "npm run chat -- --sin-ia",
        caption: "Modo conversación con Luna, solo con reglas",
        lines: [
          { text: "$ npm run chat -- --sin-ia", tone: "command" },
          {
            text: "Luna: ¡Hola! Soy Luna. ¿Vivís en casa o en departamento? ¿Preferís perro, gato o te da igual?",
            tone: "accent",
          },
          { text: "Vos: Vivo en un departamento chico y me da igual perro o gato", tone: "default" },
          {
            text: "Luna: Gracias por contarme. ¿Cuánto tiempo por día podés dedicarle y qué tan activo o activa sos? ¿Hay niños u otras mascotas en tu casa?",
            tone: "accent",
          },
          {
            text: "Vos: Trabajo todo el dia, soy tranquila y no tengo hijos ni otras mascotas. Nunca tuve mascota",
            tone: "default",
          },
          {
            text: "Luna: Con lo que me contaste, las mascotas que mejor encajan con vos son Michi, Pochi y Tita.",
            tone: "accent",
          },
          { text: "   1. Michi — gato, 4 años, pequeño · 100% compatible", tone: "success" },
        ],
      },
      // Podés sumar capturas, por ejemplo de Luna en Refugio Conectado:
      // { type: "image", src: "/projects/recomendador-mascotas/luna.png", alt: "...", caption: "..." },
    ],
    repoUrl: "https://github.com/EstefaniaRoggero/Recomendador-Inteligente-de-mascotas",
    // Sin demo web: es una herramienta de línea de comandos.
    extraLinks: [
      {
        label: "Plataforma completa: Refugio Conectado",
        href: "https://github.com/EstefaniaRoggero/Refugio-Conectado",
        kind: "repo",
      },
      {
        label: "Refugio Conectado en vivo",
        href: "https://refugio-conectado.vercel.app",
        kind: "demo",
      },
    ],
    note: "Versión independiente del recomendador de Refugio Conectado. Usa datos ficticios.",
  },

  // --------------------------------------------------------------------------
  // PROYECTOS SECUNDARIOS (tarjetas chicas)
  // --------------------------------------------------------------------------
  {
    slug: "figuritas-mundial-2026",
    title: "Figuritas Mundial 2026",
    tagline: "App móvil para llevar el álbum del Mundial",
    category: "App móvil",
    featured: false,
    context: "COMPLETAR: contexto (por ejemplo, proyecto personal o en equipo).",
    // El historial del repositorio es de 2026.
    year: "2026",
    description:
      "Aplicación móvil para controlar el álbum de figuritas del Mundial 2026: qué figuritas ya están pegadas, cuáles faltan y cuántas repetidas hay para intercambiar.",
    highlights: [
      "Progreso total del álbum y por selección",
      "Marcado rápido de obtenidas y faltantes",
      "Contador de repetidas para los intercambios",
      "Funciona sin conexión: guarda los datos en el dispositivo",
    ],
    technologies: ["React Native", "Expo", "Expo Router", "TypeScript", "AsyncStorage"],
    role: "COMPLETAR: tu rol en Figuritas Mundial 2026 (por ejemplo, diseño y desarrollo de la app).",
    media: [
      {
        type: "image",
        src: "/projects/figuritas-mundial-2026/home.jpg",
        alt: "Pantalla principal de la app: progreso del álbum, buscador y listado de selecciones con figuritas obtenidas",
        caption: "Colección y progreso",
        orientation: "portrait",
      },
      {
        type: "image",
        src: "/projects/figuritas-mundial-2026/repetidas.jpg",
        alt: "Pantalla de figuritas repetidas de la app",
        caption: "Mis repetidas",
        orientation: "portrait",
      },
      {
        type: "image",
        src: "/projects/figuritas-mundial-2026/buscar.jpg",
        alt: "Pantalla de búsqueda de figuritas de la app",
        caption: "Buscar",
        orientation: "portrait",
      },
    ],
    repoUrl: "https://github.com/AAriela-Rivalta/Figuritas_Mundial",
    // demoUrl: "COMPLETAR si publicás la app (por ejemplo, un link de Expo)",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const otherProjects = projects.filter((p) => !p.featured);
