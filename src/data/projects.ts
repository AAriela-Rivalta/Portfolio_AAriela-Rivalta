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

/** Una parte de un proyecto que tiene varias (por ejemplo, plataforma + automatización). */
export type ProjectPart = {
  /** Tipo de parte: "Plataforma web", "Automatización"... */
  kind: string;
  name: string;
  description: string;
};

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
  /** Partes del proyecto, si tiene más de una (opcional). */
  parts?: ProjectPart[];
  highlights: string[];
  stats?: ProjectStat[];
  technologies: string[];
  /** Tu rol en el proyecto (opcional: si no lo ponés, no se muestra). */
  role?: string;
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
    team: "Proyecto en equipo con Lara López y Estefanía Roggero.",
    media: [
      {
        type: "image",
        src: "/projects/cuidapp/dashboard-paciente.png",
        alt: "Panel del paciente en CuidApp: resumen de turnos próximos y estudios pendientes, accesos rápidos, notas personales, medicamentos y consultas virtuales",
        caption: "Panel del paciente",
      },
      {
        type: "image",
        src: "/projects/cuidapp/turnos.png",
        alt: "Listado de turnos programados del paciente con médico, especialidad, estado y opción para cancelar",
        caption: "Turnos del paciente",
      },
      {
        type: "image",
        src: "/projects/cuidapp/historia-clinica.png",
        alt: "Historial clínico del paciente con filtros por tipo y fecha y registros cronológicos de consultas y estudios",
        caption: "Historia clínica",
      },
      {
        type: "image",
        src: "/projects/cuidapp/estudios.png",
        alt: "Estudios médicos del paciente con contadores por estado, filtros y una tarjeta por estudio",
        caption: "Estudios médicos",
      },
      {
        type: "image",
        src: "/projects/cuidapp/reportes.png",
        alt: "Reportes del administrador con indicadores del mes, filtros de búsqueda y tabla de turnos exportable a PDF",
        caption: "Reportes (admin)",
      },
      {
        type: "image",
        src: "/projects/cuidapp/facturacion.png",
        alt: "Listado de facturas del administrador con filtros, total, estado de pago y acciones por factura",
        caption: "Facturación (admin)",
      },
    ],
    repoUrl: "https://github.com/AAriela-Rivalta/CuidApp-public",
    // demoUrl: "COMPLETAR si publicás una demo",
    note: "Versión pública del repositorio, sin datos sensibles.",
  },

  // --------------------------------------------------------------------------
  // PLATAFORMA + AUTOMATIZACIÓN (un mismo proyecto con dos partes)
  // --------------------------------------------------------------------------
  {
    slug: "refugio-conectado",
    title: "Refugio Conectado",
    tagline: "Plataforma de adopción responsable con un recomendador de mascotas con IA",
    category: "Plataforma web + automatización",
    featured: true,
    context: "Proyecto académico",
    year: "2026",
    description:
      "Plataforma web para gestionar refugios de animales y acompañar la adopción responsable. Conecta a adoptantes, donantes y voluntarios con una o varias sedes, y le da a cada refugio un panel para administrar mascotas, solicitudes y el seguimiento posterior.",
    parts: [
      {
        kind: "Plataforma web",
        name: "Refugio Conectado",
        description:
          "Catálogo, adopciones, seguimiento post-adopción y un panel por sede. React y Tailwind en el frontend, Express y MySQL en el backend.",
      },
      {
        kind: "Automatización",
        name: "Recomendador Inteligente de Mascotas",
        description:
          "El recomendador como herramienta independiente en Node.js: procesa perfiles por lotes o conversando con Luna y genera informes en Markdown y JSON.",
      },
    ],
    problem:
      "Encontrar la mascota adecuada implicaba revisar una por una las del refugio y descartar las que no pueden convivir con cada familia. El recomendador lo resuelve a partir del perfil de la persona.",
    highlights: [
      "Catálogo de mascotas con búsqueda, filtros, ficha e historial médico",
      "Solicitudes de adopción y seguimiento post-adopción",
      "Varias sedes: selector con mapa y datos separados por refugio",
      "Panel de cada sede con métricas, gráficos y alertas de urgencia",
      "Perdidos y encontrados, novedades, donaciones y voluntariado",
      "Luna en la web: conversa con la persona y la IA ordena y explica las mascotas compatibles",
      "Recomendador independiente: motor de reglas explicable, con ranking opcional por IA (Groq) y respaldo automático",
      "Informes en Markdown y JSON, por lotes o conversando desde la terminal",
    ],
    stats: [
      { value: "3", label: "sedes de demostración en Córdoba" },
      { value: "29", label: "pruebas automáticas del recomendador" },
      { value: "2", label: "modos del recomendador: lotes y conversación" },
    ],
    technologies: [
      "React 18",
      "Vite",
      "Tailwind CSS",
      "Zustand",
      "Leaflet",
      "Recharts",
      "Node.js",
      "Express",
      "MySQL",
      "JWT",
      "Groq (IA)",
      "node:test",
    ],
    team: "Proyecto en equipo con Lara López y Estefanía Roggero.",
    media: [
      {
        type: "image",
        src: "/projects/refugio-conectado/luna-recomendador.png",
        alt: "Asistente de adopción con IA: chat con Luna, que pregunta por la vivienda y preferencias, con respuestas sugeridas y un panel donde aparecen las recomendaciones",
        caption: "Luna, el recomendador con IA",
      },
      {
        type: "image",
        src: "/projects/refugio-conectado/mascotas.png",
        alt: "Catálogo de mascotas de una sede con búsqueda, filtros por tamaño, sexo, energía y compatibilidad con niños, y tarjetas de mascotas disponibles",
        caption: "Catálogo de mascotas",
      },
      {
        type: "image",
        src: "/projects/refugio-conectado/solicitudes.png",
        alt: "Solicitudes de adopción de una persona adoptante, aprobadas, con acceso al seguimiento post-adopción de cada mascota",
        caption: "Mis solicitudes",
      },
      {
        type: "image",
        src: "/projects/refugio-conectado/mapa-sedes.png",
        alt: "Selector de refugio con un mapa de la provincia de Córdoba y un marcador por cada sede que usa la plataforma",
        caption: "Mapa de sedes",
      },
      {
        type: "terminal",
        title: "npm run lote",
        caption: "Recomendador independiente, modo por lotes: salida real del motor, sin clave de IA",
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
        caption: "Recomendador independiente, modo conversación con Luna, solo con reglas",
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
    ],
    // Repositorio de la plataforma; el del recomendador va en extraLinks.
    repoUrl: "https://github.com/EstefaniaRoggero/Refugio-Conectado",
    demoUrl: "https://refugio-conectado.vercel.app",
    extraLinks: [
      {
        label: "Repositorio del Recomendador (automatización)",
        href: "https://github.com/EstefaniaRoggero/Recomendador-Inteligente-de-mascotas",
        kind: "repo",
      },
    ],
    //   = espacio que no se corta, para que "©" no quede solo al final de una línea
    note: "Versiones públicas con datos ficticios. Mapa: © colaboradores de OpenStreetMap.",
  },

  // --------------------------------------------------------------------------
  // APP MÓVIL
  // Las capturas son de celular ("portrait"), así que la tarjeta las muestra
  // lado a lado en lugar del carrusel.
  // --------------------------------------------------------------------------
  {
    slug: "figuritas-mundial-2026",
    title: "Figuritas Mundial 2026",
    tagline: "App móvil para completar el álbum del Mundial sin perder la cuenta",
    category: "App móvil",
    featured: true,
    context: "Proyecto personal",
    // El historial del repositorio es de 2026.
    year: "2026",
    description:
      "FiguSwap es una aplicación móvil para controlar el álbum de figuritas del Mundial 2026: qué figuritas ya están pegadas, cuáles faltan y cuántas repetidas hay para intercambiar. Guarda todo en el dispositivo, así que funciona sin conexión.",
    problem:
      "Con el álbum en papel o en listas sueltas cuesta saber qué falta y qué se puede cambiar. La app muestra el progreso al instante y arma la lista para compartir en un toque.",
    highlights: [
      "Progreso total del álbum y por selección, con la bandera de cada país",
      "Marcado rápido de figuritas obtenidas y faltantes",
      "Contador de repetidas: solo deja sumar figuritas que ya están en el álbum",
      "Búsqueda rápida por código de país y número, por ejemplo ARG 10",
      "Copia o comparte la lista de faltantes y de repetidas, con banderas, desde el menú del celular",
      "Modo oscuro que se recuerda entre sesiones",
      "Funciona sin conexión: los datos se guardan en el dispositivo",
      "Navegación por pestañas: Colección, Repetidas, Buscar y Ajustes",
    ],
    stats: [
      { value: "48", label: "selecciones" },
      { value: "994", label: "figuritas en el álbum" },
      { value: "4", label: "pestañas de navegación" },
    ],
    technologies: ["React Native", "Expo", "Expo Router", "TypeScript", "AsyncStorage", "Expo Clipboard"],
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
        alt: "Pantalla Mis Repetidas: total de figuritas para cambiar, botones para copiar y compartir la lista y selecciones con su bandera",
        caption: "Mis repetidas",
        orientation: "portrait",
      },
      {
        type: "image",
        src: "/projects/figuritas-mundial-2026/buscar.jpg",
        alt: "Pantalla de búsqueda rápida: casilleros para el código del país y el número de la figurita",
        caption: "Búsqueda rápida",
        orientation: "portrait",
      },
    ],
    repoUrl: "https://github.com/AAriela-Rivalta/Figuritas_Mundial",
    // demoUrl: "COMPLETAR si publicás la app (por ejemplo, un link de Expo)",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const otherProjects = projects.filter((p) => !p.featured);
