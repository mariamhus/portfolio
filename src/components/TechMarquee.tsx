import type { CSSProperties } from "react";
import {
  siAntdesign,
  siAngular,
  siChartdotjs,
  siCss,
  siEslint,
  siExpress,
  siGit,
  siGithub,
  siHtml5,
  siI18next,
  siJavascript,
  siMongodb,
  siMui,
  siMysql,
  siNextdotjs,
  siNodedotjs,
  siPostman,
  siPython,
  siReact,
  siReacthookform,
  siReactquery,
  siReactrouter,
  siRedux,
  siSass,
  siTailwindcss,
  siTestinglibrary,
  siTypescript,
  siVercel,
  siVite,
  siVitest,
  siZod,
  type SimpleIcon,
} from "simple-icons";

interface Tech {
  name: string;
  icon: SimpleIcon;
}

const ROWS: Tech[][] = [
  [
    { name: "React", icon: siReact },
    { name: "Next.js", icon: siNextdotjs },
    { name: "TypeScript", icon: siTypescript },
    { name: "Angular", icon: siAngular },
    { name: "JavaScript", icon: siJavascript },
    { name: "Redux Toolkit", icon: siRedux },
    { name: "TanStack Query", icon: siReactquery },
    { name: "React Router", icon: siReactrouter },
    { name: "React Hook Form", icon: siReacthookform },
    { name: "Tailwind CSS", icon: siTailwindcss },
    { name: "Material UI", icon: siMui },
    { name: "Ant Design", icon: siAntdesign },
    { name: "Sass", icon: siSass },
    { name: "HTML5", icon: siHtml5 },
    { name: "CSS", icon: siCss },
  ],
  [
    { name: "Vite", icon: siVite },
    { name: "Vitest", icon: siVitest },
    { name: "Testing Library", icon: siTestinglibrary },
    { name: "Chart.js", icon: siChartdotjs },
    { name: "i18next", icon: siI18next },
    { name: "Zod", icon: siZod },
    { name: "Node.js", icon: siNodedotjs },
    { name: "Express", icon: siExpress },
    { name: "MongoDB", icon: siMongodb },
    { name: "MySQL", icon: siMysql },
    { name: "Python", icon: siPython },
    { name: "Git", icon: siGit },
    { name: "GitHub", icon: siGithub },
    { name: "Postman", icon: siPostman },
    { name: "Vercel", icon: siVercel },
    { name: "ESLint", icon: siEslint },
  ],
];

function Item({ tech }: { tech: Tech }) {
  return (
    <li className="marquee-item" style={{ "--brand": `#${tech.icon.hex}` } as CSSProperties}>
      <svg role="img" viewBox="0 0 24 24" aria-hidden="true" className="size-5 shrink-0">
        <path d={tech.icon.path} fill="currentColor" />
      </svg>
      {tech.name}
    </li>
  );
}

// Each row is rendered twice and slid by half its width, so the loop has no visible seam.
// Screen readers get the first copy only.
export function TechMarquee() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="scroll-mt-24 border-t border-line py-16 sm:py-24">
      <h2 id="skills-title" className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
        Skills
      </h2>
      <p className="mt-3 max-w-xl text-muted">The tools I build with day to day, from the frontend to testing and deployment.</p>
      <div className="marquee mt-10">
        {ROWS.map((row, index) => (
          <div key={index} className="marquee-row" data-direction={index % 2 ? "right" : "left"}>
            <div className="marquee-track">
              <ul className="marquee-list">
                {row.map((tech) => (
                  <Item key={tech.name} tech={tech} />
                ))}
              </ul>
              <ul className="marquee-list" aria-hidden="true">
                {row.map((tech) => (
                  <Item key={tech.name} tech={tech} />
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
