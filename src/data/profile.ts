export interface Link {
  label: string;
  href: string;
}

export interface Project {
  name: string;
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

export interface Role {
  title: string;
  company: string;
  location: string;
  start: string;
  end: string;
  points: string[];
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

export const projects: Project[] = [
  {
    name: "Raff Store",
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
  {
    name: "Palynation landing page",
    context: "Freelance",
    summary: "A single-page marketing site for a gaming tool.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Redux Toolkit"],
  },
];

export const experience: Role[] = [
  {
    title: "Front-End Developer",
    company: "Nexey",
    location: "Maadi, Cairo",
    start: "Aug 2025",
    end: "Present",
    points: [
      "Own frontend architecture for a real-time workforce monitoring platform, including state management, API integration, and reusable UI patterns.",
      "Building the Workforce Management (WFM) module, a standalone sub-application inside the dashboard with its own layout, navigation, permission-based routing, and full English and Arabic (RTL) support.",
      "Build shared components such as data tables with inline filters and pagination, dialogs, and summary cards, plus data-visualization modules, to keep modules consistent and speed up delivery.",
      "Tune rendering performance on data-heavy dashboards with memoization, lazy loading, and code splitting.",
      "Apply accessibility best practices, including semantic HTML and keyboard navigation, and test across browsers and devices.",
    ],
  },
  {
    title: "IT Service Desk",
    company: "VOIS",
    location: "Smart Village, Cairo",
    start: "Dec 2023",
    end: "Aug 2025",
    points: [
      "Designed an automated KPI reporting pipeline with Power Automate, Python, and Power BI that cut report generation from over 4 hours to under 10 minutes.",
      "Standardized KPIs across teams and automated report delivery to every stakeholder.",
      "Supported internal users and acted as the link between them and backend technical teams.",
    ],
  },
  {
    title: "React.js Developer",
    company: "TEQNEIA",
    location: "Sheikh Zayed, Giza",
    start: "Mar 2023",
    end: "Dec 2023",
    points: [
      "Led and mentored 8 frontend interns through code reviews and day-to-day technical problems.",
      "Defined the project structure and coding standards the team worked to.",
      "Took part in sprint planning and estimation, and turned business requirements into frontend solutions with product owners.",
    ],
  },
  {
    title: "MEARN Track Trainee",
    company: "Information Technology Institute (ITI)",
    location: "Cairo",
    start: "Dec 2022",
    end: "May 2023",
    points: ["Intensive full-stack program covering Angular and React on the front end, and Node.js, Express, and MongoDB on the back end."],
  },
];

export const skills: { group: string; items: string[] }[] = [
  {
    group: "Frontend",
    items: ["React", "Next.js", "Angular", "TypeScript", "JavaScript (ES6+)", "Redux Toolkit", "RTK Query", "TanStack Query", "Zustand", "React Router", "React Hook Form", "HTML5", "CSS3", "Sass", "Tailwind CSS", "Material UI", "Ant Design"],
  },
  {
    group: "Architecture and quality",
    items: ["Component architecture", "Design systems", "Performance optimization", "Lazy loading", "Accessibility", "Internationalization (i18next, RTL)", "Unit testing (Vitest, React Testing Library)", "Cross-browser testing"],
  },
  {
    group: "Data visualization",
    items: ["Chart.js", "Recharts", "Power BI", "Tableau"],
  },
  {
    group: "Backend and tooling",
    items: ["Node.js", "Express", "MongoDB", "MySQL", "Python", "Spring MVC", "Zod", "Vite", "ESLint", "Git and GitHub", "Postman", "Vercel"],
  },
];

export const education = [
  { title: "BA in Computer Science", place: "October 6 University", period: "2019 – 2022" },
  { title: "Full-Stack Web Development, MEARN track", place: "Information Technology Institute (ITI)", period: "2022 – 2023" },
];

export const certifications = [
  { title: "Next.js", place: "Udemy", period: "In progress" },
  { title: "Data Analyst Professional", place: "Epsilon AI Institute", period: "2023 – 2024" },
  { title: "Data Scientist Professional", place: "Epsilon AI Institute", period: "2022 – 2023" },
];
