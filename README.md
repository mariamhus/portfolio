# Mariam Hussein — Portfolio

My personal portfolio site: who I am, the projects I've built, my experience, and how to reach me. Built with React, TypeScript, Vite, and Tailwind CSS.

**Live site:** [mariam-hussein.website](https://www.mariam-hussein.website/)

![The portfolio home page in its autumn night theme](./screenshot.png)

## Features

- Home page with Experience, Professional work, featured Projects, Skills, and Contact sections
- A separate Projects page at `/projects/` with every project in a three-column grid
- Project cards with screenshots, highlights, tech stack, and links to the live demo and source code
- Navigation that highlights the section you're reading
- Seasonal themes: spring petals, summer fireflies, autumn leaves, or winter snow with an aurora, chosen from today's date or picked in the header
- Day and night skies with a toggle that plays a sunrise or sunset: a starfield with parallax and shooting stars at night. Without a saved choice, spring and summer open in day mode and autumn and winter at night
- Text that settles into place word by word as you scroll, and a letter-by-letter animation on the name
- Downloadable CV and a one-click "Copy email" button
- Responsive from small phones to large screens, with the headline sized to fit any width
- Accessible: skip link, semantic landmarks, labelled links, visible focus, and reduced-motion support that stops every animation
- Social preview image and meta tags for sharing on LinkedIn and other sites
- Fonts bundled with the site and screenshots in WebP, so pages load fast

See [CHANGELOG.md](./CHANGELOG.md) for what has changed and when.

## Updating the content

All the text lives in one file, `src/data/profile.ts`: intro, about, projects, work, experience, skills, education, and links. Edit it and the page updates; no component changes are needed.

- **Projects:** the first three in the `projects` list are featured on the home page; the Projects page shows all of them.
- **Project links:** each project has a `demo` field. Leave it empty to hide the "Live demo" link, or paste the deployed URL to show it.
- **Screenshots:** replace the images in `public/projects/` with the same file names. 1600×1000 WebP or PNG works best.
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
│   ├── ProjectCard.tsx      Card used on both pages
│   ├── Starfield.tsx        Animated background (stars, seasonal particles, aurora, fireflies)
│   ├── FallingWords.tsx     Scroll-driven word animation
│   └── ThemeToggle.tsx      Season menu and day/night button
├── data/profile.ts        All site content
├── hooks/
│   ├── useActiveSection.ts
│   ├── useSeason.ts
│   └── useTheme.ts
├── lib/
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
