# Changelog

All notable changes to the portfolio site.

## 2026-10-23

### Added

- Animated background on both pages: a night starfield with parallax and shooting stars, plus seasonal effects (spring petals, summer fireflies, autumn leaves, winter snow and aurora).
- Season picker in the header (automatic from today's date, or a chosen season), saved between visits. `?season=` and `?theme=` in the address preview any combination.
- Sunrise and sunset animation when switching between day and night. Without a saved choice, spring and summer open in day mode and autumn and winter at night.
- Letter-by-letter animation on the name, and text that settles into place word by word as you scroll.
- All animations stop when the visitor's system asks for reduced motion.

### Changed

- Skills now include Zustand, React Hook Form, and i18next, matching the CV.
- README updated for the custom domain, the new features, and the current project structure, with a new screenshot.

## 2026-10-22

### Added

- **Raff Store** project: a bilingual English and Arabic store with full RTL support, an admin dashboard, and tests. It's first in the list, so it's featured on the home page.

### Changed

- New CV (`public/Mariam_Hussein_CV.pdf`) with Raff Store, live demo links for every personal project, and React Testing Library under testing tools.

## 2026-10-21

### Added

- **Projects page** at `/projects/` showing every personal project in a three-column grid (two on tablets, one on phones), with its own page title and social preview tags.
- **New projects:** Art Print Store (Next.js), Kanban Board (Angular), and Markdown Notes (React), each with a screenshot, highlights, tech tags, and links.
- **Workforce Management (WFM) module** at Nexey, added to Experience and as the first card under Professional work.
- **Live demo links** for every personal project.
- **Testing** in Skills: Vitest and React Testing Library, plus a Pomodoro Timer highlight for its 32 unit and component tests.
- New skill groups and items: Angular, RTK Query, TanStack Query, React Router, internationalization (RTL), a Data visualization group (Chart.js, Recharts, Power BI, Tableau), and a Backend and tooling group.
- "Work" link in the navigation.

### Changed

- The home page shows the three newest projects in one row, with a "View all projects" button. The "See my projects" button and the Projects link in the navigation open the Projects page.
- Sections are ordered Experience, Professional work, then Projects, so professional work comes before personal projects.
- Next.js is back in the headline and page description, now that the Art Print Store backs it up.
- The About text says "three years building software, most of it on the frontend", which matches the work history.
- The "What I'm working on" card mentions the WFM module.
- The CV download serves the updated CV.
- Social preview tags (`og:image`, `og:url`, canonical link) use absolute URLs, filled in at build time from `SITE_URL` or the Vercel production domain.
- Project cards are a shared `ProjectCard` component, and both pages share one `Layout` (header and footer).

### Fixed

- A section title that wraps onto two lines, such as "Professional work", no longer overlaps its intro text while scrolling on large screens.
- The "See my projects" button uses a right arrow, because it now opens a page instead of scrolling down.
