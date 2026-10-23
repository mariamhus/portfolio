export interface Link {
  label: string;
  href: string;
}

export interface Project {
  name: string;
  /** One short line for cards and the home page showcase. */
  tagline: string;
  summary: string;
  highlights: string[];
  tech: string[];
  image: string;
  imageAlt: string;
  demo: string;
  code: string;
}

export interface WorkProject {
  name: string;
  context: string;
  summary: string;
  tech: string[];
}

export const profile = {
  name: "Mariam Hussein",
  title: "Front-End Engineer",
  location: "Cairo, Egypt",
  intro:
    "I build dashboards and SaaS interfaces with React, TypeScript, and Next.js: the screens people rely on all day to understand real-time data and get work done.",
  about: [
    "I've spent three years building software, most of it on the frontend, turning complex business requirements into interfaces that feel simple. Most of that work lives in data-heavy products, from real-time monitoring platforms to multi-tenant admin dashboards.",
    "I care about the parts users never see but always feel: a sensible component architecture, fast rendering on large datasets, and accessible markup that works with a keyboard. I've also led code reviews and mentored a team of eight frontend interns.",
    "Before moving fully into frontend work, I automated KPI reporting with Python and Power BI, so I bring a data analyst's eye to how numbers should be shown.",
  ],
  now: {
    role: "Front-End Developer at Nexey",
    detail: "Building the Workforce Management (WFM) module of a real-time workforce monitoring and IT operations platform.",
  },
  email: "mariamhussein.dev@gmail.com",
  cv: "/Mariam_Hussein_CV.pdf",
  links: [
    { label: "GitHub", href: "https://github.com/mariamhus" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/mariamhusseindev" },
  ] satisfies Link[],
};

export interface AboutCard {
  title: string;
  subtitle: string;
  description: string;
  visual: "architecture" | "performance" | "experience";
}

export const aboutCards: AboutCard[] = [
  {
    title: "Architecture",
    subtitle: "Designing scalable systems",
    description:
      "Component architecture, shared patterns, and state management that keep large dashboards consistent as they grow, like the WFM module I'm building at Nexey.",
    visual: "architecture",
  },
  {
    title: "Performance",
    subtitle: "Optimizing React applications",
    description: "Memoization, lazy loading, and code splitting, so data-heavy dashboards stay fast while real-time data keeps arriving.",
    visual: "performance",
  },
  {
    title: "User Experience",
    subtitle: "Building accessible interfaces",
    description: "Semantic HTML, keyboard navigation, and English and Arabic (right-to-left) layouts, so every screen works for everyone.",
    visual: "experience",
  },
];

/** Short facts for the "a little more about me" deck in the About section. */
export const aboutFacts: string[] = [
  "Before frontend, I automated KPI reporting with Python and Power BI, and cut a 4-hour report down to under 10 minutes.",
  "I've mentored a team of eight frontend interns through code reviews and day-to-day problems.",
  "I build in English and Arabic, including full right-to-left layouts.",
  "I studied Computer Science, then trained as a full-stack developer at ITI.",
  "I'm deepening my Next.js skills alongside my work at Nexey.",
  "I'm based in Cairo, Egypt.",
];

export const projects: Project[] = [
  {
    name: "Raff Store",
    tagline: "A bilingual English and Arabic store with an admin dashboard.",
    summary:
      "A bilingual English and Arabic online store on the DummyJSON API, with a catalog, cart, validated checkout, accounts, a wishlist, reviews, and an admin dashboard. The whole interface flips to right-to-left in Arabic.",
    highlights: [
      "Full Arabic translation with RTL layout, Arabic plural rules, and localized prices and dates",
      "Search, filters, sorting, and pagination kept in the URL, with TanStack Query and Zustand",
      "Lazy-loaded admin dashboard with KPI cards, charts, and product management",
    ],
    tech: ["React", "TypeScript", "TanStack Query", "Zustand", "React Hook Form", "Zod", "i18next", "Recharts", "Vitest"],
    image: "/projects/raff.webp",
    imageAlt: "Raff store home page with a dark hero banner and a row of shopping categories",
    demo: "https://raffstore-ochre.vercel.app",
    code: "https://github.com/mariamhus/Raff-Store",
  },
  {
    name: "Art Print Store",
    tagline: "A Next.js storefront for abstract art prints.",
    summary:
      "A storefront for abstract art prints built on the Next.js App Router, with shop filters, a framed-print configurator, a cart that syncs across tabs, and a validated checkout.",
    highlights: [
      "Server Components by default, statically generated product pages, and per-product SEO and share images",
      "Checkout through a Server Action that re-prices every item on the server with Zod validation",
      "Shop filters kept in the URL, streamed with Partial Prerendering, and usable without JavaScript",
    ],
    tech: ["Next.js", "React", "TypeScript", "Zod", "Tailwind CSS"],
    image: "/projects/print-store.webp",
    imageAlt: "Art print store home page with a headline and a framed abstract sunset print",
    demo: "https://print-store-pi.vercel.app",
    code: "https://github.com/mariamhus/Print-Store",
  },
  {
    name: "Kanban Board",
    tagline: "A drag-and-drop task board built with Angular.",
    summary:
      "A drag-and-drop board with work-in-progress limits, due date badges, label and priority filters, and undo. The board is saved in the browser.",
    highlights: [
      "Signals-based store with zoneless, OnPush change detection",
      "Drag and drop, dialogs, and menus built on the Angular CDK, with a keyboard alternative to dragging",
      "Typed reactive forms, with the store covered by Vitest unit tests",
    ],
    tech: ["Angular", "TypeScript", "Angular CDK", "Signals", "Tailwind CSS", "Vitest"],
    image: "/projects/kanban.webp",
    imageAlt: "Kanban board with five columns of labelled cards showing priorities and due dates",
    demo: "https://kanban-board-sand-one.vercel.app",
    code: "https://github.com/mariamhus/Kanban-Board",
  },
  {
    name: "Markdown Notes",
    tagline: "A notes app with a live Markdown preview.",
    summary:
      "A notes app with a live Markdown preview, hashtag tags, search, pinning, and checklists you can tick right in the preview. Notes are saved in the browser and export as .md files.",
    highlights: [
      "Rendered with marked and sanitized with DOMPurify, so pasted HTML can't run scripts",
      "Toolbar shortcuts and lists that continue when you press Enter",
      "Write, Split, and Preview layouts that adapt from phones to wide screens",
    ],
    tech: ["React", "TypeScript", "marked", "DOMPurify", "Tailwind CSS"],
    image: "/projects/markdown-notes.webp",
    imageAlt: "Markdown Notes with the note list, the Markdown editor, and the formatted preview side by side",
    demo: "https://markdown-notes-hazel.vercel.app",
    code: "https://github.com/mariamhus/Markdown-Notes",
  },
  {
    name: "Movie Search",
    tagline: "Search and browse movies from TMDB.",
    summary:
      "Search and browse movies from TMDB with infinite scroll, a details page for every film, trailers, and a watchlist that stays in sync across tabs.",
    highlights: [
      "Debounced search kept in the URL, so results can be shared",
      "Cached infinite queries with request cancellation",
      "Deep links, scroll restoration, and a 404 page",
    ],
    tech: ["React", "TypeScript", "React Router", "TanStack Query", "Tailwind CSS"],
    image: "/projects/movies.webp",
    imageAlt: "Movie Search home page with a featured movie banner and a trending row",
    demo: "https://moviesearch-swart-beta.vercel.app",
    code: "https://github.com/mariamhus/Movie-Search",
  },
  {
    name: "Expense Tracker",
    tagline: "Track spending against a monthly budget.",
    summary:
      "Track spending by category against a monthly budget, with a breakdown that doubles as a filter, a day-by-day chart, month history, and CSV export.",
    highlights: [
      "Budget bar that shows each category's share",
      "Undo after delete and validated forms",
      "Amounts stored in cents to avoid rounding errors",
    ],
    tech: ["React", "TypeScript", "Recharts", "Tailwind CSS"],
    image: "/projects/expense.webp",
    imageAlt: "Expense Tracker dashboard with the monthly total, budget bar, and expense list",
    demo: "https://expense-tracker-one-bay-13.vercel.app",
    code: "https://github.com/mariamhus/Expense-Tracker",
  },
  {
    name: "Weather Dashboard",
    tagline: "Forecasts for any city, in the colors of the sky.",
    summary:
      "Search any city for current conditions, the next 24 hours, and a 7-day outlook. The main panel takes on the color of the actual sky.",
    highlights: [
      "Accessible combobox search with keyboard navigation",
      "Geolocation and Celsius or Fahrenheit units",
      "No API key needed, powered by Open-Meteo",
    ],
    tech: ["React", "TypeScript", "Open-Meteo API", "Tailwind CSS"],
    image: "/projects/weather.webp",
    imageAlt: "Weather Dashboard showing London with an hourly forecast and a 7-day outlook",
    demo: "https://weather-dashboard-eight-cyan.vercel.app",
    code: "https://github.com/mariamhus/Weather-Dashboard",
  },
  {
    name: "Pomodoro Timer",
    tagline: "A focus timer with break cycles and weekly stats.",
    summary:
      "A focus timer with automatic break cycles, sound alerts, desktop notifications, keyboard shortcuts, and stats for today and the past week.",
    highlights: [
      "Drift-free timing based on timestamps",
      "Timer modelled as a reducer state machine",
      "Timer logic and controls covered by 32 unit and component tests",
    ],
    tech: ["React", "TypeScript", "Web Audio API", "Tailwind CSS", "Vitest", "React Testing Library"],
    image: "/projects/pomodoro.webp",
    imageAlt: "Pomodoro Timer running a focus session with a large countdown",
    demo: "https://pomodorotimer-sand.vercel.app",
    code: "https://github.com/mariamhus/Pomodoro-Timer",
  },
];

export const workProjects: WorkProject[] = [
  {
    name: "Workforce Management (WFM) module",
    context: "Nexey",
    summary:
      "A standalone sub-application inside the Nexey dashboard for managing clients, contacts, contracts, employees, and roles, with its own layout, permission-based routing, and full English and Arabic (RTL) support. Contracts move through statuses driven by a transition matrix, and server validation errors land on the matching form field and tab.",
    tech: ["React", "TypeScript", "Redux Toolkit", "RTK Query", "React Router", "i18n"],
  },
  {
    name: "Real-time workforce monitoring platform",
    context: "Nexey",
    summary:
      "Dashboards for user activity, application usage, device health, and productivity, plus admin tools to run remediation workflows and remote support on managed devices through RustDesk.",
    tech: ["React", "TypeScript", "Redux Toolkit", "Chart.js", "Tailwind CSS", "Ant Design"],
  },
  {
    name: "Multi-tenant e-commerce platform",
    context: "SaaS product",
    summary:
      "An admin dashboard for products, categories, staff tasks, and analytics, with a storefront for each tenant and online payments.",
    tech: ["React", "TypeScript", "Vite", "Redux Toolkit", "JWT", "Ant Design", "Material UI", "Tailwind CSS"],
  },
  {
    name: "E-learning system",
    context: "MindsOn",
    summary: "A learning platform where instructors upload and manage video lectures, tests, and course materials.",
    tech: ["React", "JavaScript", "Material UI", "Node.js", "Express", "MongoDB"],
  },
];
