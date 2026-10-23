import { ArrowUpRight, Code2 } from "lucide-react";
import type { Project } from "../data/profile";

interface ProjectCardProps {
  project: Project;
  onOpen: (project: Project) => void;
  headingLevel?: "h2" | "h3";
}

const VISIBLE_TAGS = 3;

export function ProjectCard({ project, onOpen, headingLevel: Heading = "h3" }: ProjectCardProps) {
  const hidden = project.tech.length - VISIBLE_TAGS;

  return (
    <article aria-labelledby={`project-${project.name}`} className="group flex h-full flex-col">
      <button
        type="button"
        onClick={() => onOpen(project)}
        tabIndex={-1}
        aria-hidden="true"
        className="block cursor-pointer overflow-hidden rounded-xl border border-line bg-surface"
      >
        <img
          src={project.image}
          alt=""
          width={1600}
          height={1000}
          loading="lazy"
          decoding="async"
          className="aspect-[16/10] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </button>
      <Heading id={`project-${project.name}`} className="mt-5 font-display text-2xl font-bold tracking-tight">
        {project.name}
      </Heading>
      <p className="mt-1.5 text-muted">{project.tagline}</p>
      <ul aria-label="Built with" className="mt-4 flex flex-wrap gap-1.5">
        {project.tech.slice(0, VISIBLE_TAGS).map((item) => (
          <li key={item} className="tag">
            {item}
          </li>
        ))}
        {hidden > 0 && (
          <li className="tag">
            +{hidden}
            <span className="sr-only"> more</span>
          </li>
        )}
      </ul>
      <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-3 pt-6">
        <button type="button" onClick={() => onOpen(project)} className="button-secondary h-10 px-4 text-sm">
          View details<span className="sr-only"> about {project.name}</span>
        </button>
        {project.demo && (
          <a href={project.demo} target="_blank" rel="noreferrer" className="text-link text-sm">
            Live demo
            <ArrowUpRight aria-hidden="true" className="size-4" />
            <span className="sr-only"> of {project.name} (opens in a new tab)</span>
          </a>
        )}
        <a href={project.code} target="_blank" rel="noreferrer" className="text-link text-sm">
          <Code2 aria-hidden="true" className="size-4" />
          Code<span className="sr-only"> for {project.name} (opens in a new tab)</span>
        </a>
      </div>
    </article>
  );
}
