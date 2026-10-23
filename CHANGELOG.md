# Changelog

All notable changes to the portfolio site.

## 2026-10-25

### Added

- Seasonal cursor: a flower in spring, a crescent moon in summer, a leaf in autumn, and a snowflake in winter, in the season's accent color for day or night, with a white halo. Over anything clickable (links, buttons, tabs, cards) the shape shrinks into a glowing ring of the season color with a small sparkle; over text and fields it stays the plain season shape.
- Skill logos burst out from behind the name and fly away in two waves on the loading screen.

### Changed

- The loading screen shows on every visit and refresh (about 2.6 seconds) instead of once per visit. It is still skipped for reduced motion.

- Everything is on one page again: About, Professional work, and the contact form moved back to the home page, and every menu link scrolls to its section. The separate About and Contact pages are gone; the Projects grid page stays.
- About is reformatted for the home page: the same layout as the other sections, with a short intro and the three cards, and no second "Hello, I'm Mariam" under the hero. The facts live in the hero's flip card.
- Projects is a spotlight: one project at a time in a large, level browser window, with faded neighbours at the edges. Arrows, tabs (with a dark pill that slides to the active one), arrow keys, and swipes move a project in from the side, and the title, description, and tags reveal in turn. It covers all eight projects. Scrolling the page never changes the project, but while nobody is using it, it moves on by itself every 5 seconds, with a thin line that fills until the next one. It pauses on hover and focus, while off screen or in a background tab, and with the pause button next to the arrows; it doesn't auto-play for reduced motion.
- The contact form sits beside the email address and links in the Contact section.

### Removed

- The animated character on the contact page.

## 2026-10-24

### Added

- Animated loading screen that matches the site: the same sky (stars at night, the season's sky by day), the hero name in two lines with the surname in the season's accent color, rising in letter by letter over a progress line. It shows once per visit and is skipped for reduced motion.
- Projects showcase on the home page: stacked, tilted browser windows with a tab for each featured project.
- Full-screen project view, inspired by giats.me: the name, tagline, description, highlights, tech, and links stay on the left while real desktop and phone screenshots of the live site (two of each per project, captured from the demos) glide up and down on their own inside a dark device frame on the right. The view fits on one screen; hovering the frame pauses it, and scrolling it by hand takes over until you stop. It replaces the earlier "View details" panel, a smaller panel styled as a browser window.
- About moved to its own page at `/about/`, so the home page no longer repeats the introduction. Professional work moved with it and follows straight after, with the About line leading into its timeline; the Work link in the menu goes to `/about/#work`. On the home page, the hero's "Front-End Developer at Nexey" card now flips in 3D every 6 seconds through the "A little more about me" facts and back. It flips straight away on click, tap, Enter, or Space, pauses on hover and focus, and has a pause button and a progress line. Links to a section on another page (like `/about/#work`) now scroll to it once the page has rendered. It has an About link first in the menu and a "More about me" link in the hero. The page builds in step by step as it scrolls into view: "Hello, I'm Mariam." rises in letter by letter, then the intro, then three cards (Architecture, Performance, User Experience) that open on hover, focus, or tap to show a description and a small animated visual. A "A little more about me" fact deck adds a personal touch, and an accent line grows with scrolling and leads into the Professional work timeline.
- Contact page at `/contact/` with a message form and an animated illustrated Mariam (hijab in the season's color, round glasses). Her eyes follow the pointer and the text as you type, she greets you by name, looks worried at an invalid email, gets excited when you hover Send, and throws a paper plane, then waves, when the message is sent. Sending opens the visitor's email app with the message addressed and filled in. The Contact link in the menu and the email on the home page lead here.
- Scrolling strip of technology logos in two rows that move in opposite directions. It is now the Skills section.
- Professional work is a scroll-driven timeline: the line fills in the accent color as you scroll, and each dot and project lights up when the fill reaches it.

### Changed

- Project cards are shorter: image, name, a one-line tagline, three tech tags, and links. The rest moved into the details panel.
- Large monitors (1800px and wider) get a wider page and proportionally larger text and spacing, so a 27" or 2K screen no longer shows a narrow column with wide empty margins.
- The Projects page shows four columns on large monitors.

### Removed

- The Experience section and its menu link. The work history is in the CV.
- The grouped skill lists. The logo strip replaces them, and the full list is in the CV.
- The Education and Certifications section. Both are in the CV.
- The Palynation landing page from Professional work, so it lists only the main products.

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
