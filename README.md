# Mariam Hussein — Portfolio

My personal portfolio site: who I am, the projects I've built, my experience, and how to reach me. Built with React, TypeScript, Vite, and Tailwind CSS.

**Live site:** [mariam-hussein.website](https://www.mariam-hussein.website/)

![The portfolio home page in its autumn night theme](./screenshot.png)

## Features

- Animated loading screen, shown once per visit
- One page with About, Professional work, Projects, Skills, and Contact, plus a Projects page at `/projects/` with every project in a grid
- Hero card that flips on its own between what I'm working on and a few facts about me (click to flip, hover or the pause button to stop)
- About: a short intro and three cards (Architecture, Performance, User Experience) that open on hover, focus, or tap with a small animated visual, and a line that leads into Professional work
- Professional work as a timeline: the line fills as you scroll, and each project lights up when the fill reaches it
- Projects spotlight: one project at a time in a large browser window; arrows, tabs, arrow keys, or a swipe glide the next one in from the side
- A full-screen project view for each project: the details on the left, and real desktop and phone screenshots of the live site gliding up and down on their own inside a dark device frame (hover to pause, or scroll the frame yourself)
- Skills as two rows of technology logos that scroll in opposite directions
- Contact form that opens the visitor's email app with the message addressed and filled in, next to the email address, a copy button, and links
- Seasonal themes: spring petals, summer fireflies, autumn leaves, or winter snow with an aurora, chosen from today's date or picked in the header
- Day and night skies with a toggle that plays a sunrise or sunset; a starfield with parallax and shooting stars at night
- Responsive from small phones to 2K and 4K monitors: on large screens the whole layout scales up and widens, so it keeps its proportions
- Accessible: skip link, semantic landmarks, labelled controls, visible focus, keyboard support, and reduced-motion support that stops every animation
- Social preview image and meta tags for sharing on LinkedIn and other sites
- Fonts bundled with the site and screenshots in WebP, so pages load fast

See [CHANGELOG.md](./CHANGELOG.md) for what has changed and when.

## Updating the content

All the text lives in one file, `src/data/profile.ts`: intro, about, projects, professional work, and links. Edit it and the page updates; no component changes are needed. The full work history, skills, education, and certifications live in the CV.

- **Projects:** the first five in the `projects` list are featured in the home page showcase; the Projects page shows all of them. Each project has a short `tagline` for cards and a longer `summary` and `highlights` for the details panel.
- **Project links:** each project has a `demo` field. Leave it empty to hide the "Live demo" link, or paste the deployed URL to show it.
- **Screenshots:** replace the images in `public/projects/` with the same file names. 1600×1000 WebP or PNG works best. The project view's gallery lives in `public/projects/gallery/` (`<name>-desktop-1.webp`, `<name>-mobile-1.webp`, and so on) and is listed in `src/data/gallery.ts`.
- **About:** the cards and facts are `aboutCards` and `aboutFacts` in `profile.ts`.
- **CV:** replace `public/Mariam_Hussein_CV.pdf` with a newer version using the same file name.

## Getting started

You need [Node.js](https://nodejs.org/) 20.19 or newer.

```bash
git clone https://github.com/mariamhus/portfolio.git
cd portfolio
npm install
npm run dev
```

Then open http://localhost:5173. The Projects page is at http://localhost:5173/projects/.

| Command           | What it does                        |
| ----------------- | ----------------------------------- |
| `npm run dev`     | Starts the dev server               |
| `npm run build`   | Type-checks and builds to `dist/`   |
| `npm run preview` | Serves the production build locally |

### Previewing a season or theme

Add `?season=` and `?theme=` to the address to see any combination without changing your saved choice:

- `/?season=winter&theme=dark`: snow and the aurora at night
- `/?season=summer&theme=dark`: fireflies
- `/?season=spring&theme=light`: falling petals by day

## Project structure

```
index.html                 Home page
projects/index.html        Projects page
public/
├── projects/              Project screenshots
├── Mariam_Hussein_CV.pdf
├── favicon.svg
└── og.png                 Image shown when the link is shared
src/
├── components/            One component per section, plus:
│   ├── Header.tsx           Navigation, season picker, and theme toggle
│   ├── Layout.tsx           Shared header, background, and footer for both pages
│   ├── ProjectCard.tsx      Short card on the Projects page
│   ├── ProjectShowcase.tsx  Stacked project showcase on the home page
│   ├── ProjectDetails.tsx   "View details" dialog
│   ├── TechMarquee.tsx      Skills: scrolling strip of technology logos
│   ├── FlipCard.tsx         Hero card that flips between the current role and facts
│   ├── ContactForm.tsx      Message form in the Contact section
│   ├── WorkProjects.tsx     Professional work timeline
│   ├── Starfield.tsx        Animated background (stars, seasonal particles, aurora, fireflies)
│   ├── FallingWords.tsx     Scroll-driven word animation
│   └── ThemeToggle.tsx      Season menu and day/night button
├── data/profile.ts        All site content
├── data/gallery.ts        Screenshots for each project's gallery
├── hooks/
│   ├── useActiveSection.ts
│   ├── useSeason.ts
│   └── useTheme.ts
├── lib/
│   ├── loader.ts            Hides the loading screen once the page is ready
│   ├── seasonParticles.ts   Petals, leaves, and snow
│   └── nightEffects.ts      Fireflies and aurora
├── App.tsx                Home page
├── ProjectsPage.tsx       Projects page
├── projects.tsx           Entry point for the Projects page
├── index.css              Theme and season colors, fonts, and shared styles
└── main.tsx               Entry point for the home page
```

## Deploying

Import the repository at [vercel.com/new](https://vercel.com/new) and click **Deploy**. Vite is detected automatically, and both pages are built.

The social preview tags (`og:image`, `og:url`, and the canonical link) need absolute URLs. On Vercel they're filled in automatically from the production domain, including a custom domain like `www.mariam-hussein.website`. On another host, set the `SITE_URL` environment variable to the full address, for example `SITE_URL=https://www.mariam-hussein.website`.
