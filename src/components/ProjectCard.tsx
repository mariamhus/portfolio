import { Code2 } from "lucide-react";
import { ExternalLink } from "./ExternalLink";
import type { Project } from "../data/profile";

interface ProjectCardProps {
  project: Project;
  headingLevel?: "h2" | "h3";
}

export function ProjectCard({ project, headingLevel: Heading = "h3" }: ProjectCardProps) {
  return (
    <article aria-labelledby={`project-${project.name}`} className="group flex h-full flex-col">
      <a
        href={project.demo || project.code}
        target="_blank"
        rel="noreferrer"
        tabIndex={-1}
        aria-hidden="true"
        className="block overflow-hidden rounded-xl border border-line bg-surface"
      >
        <img
          src={project.image}
          alt=""
          width={1600}
          height={1000}
          loading="lazy"
          decoding="async"
          className="aspect-[16/10] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.025]"
        />
      </a>
      <Heading id={`project-${project.name}`} className="mt-5 font-display text-2xl font-bold tracking-tight">
        {project.name}
      </Heading>
      <p className="sr-only">{project.imageAlt}</p>
      <p className="mt-2 text-muted">{project.summary}</p>
      <ul className="mt-4 space-y-1.5 text-[15px]">
        {project.highlights.map((point) => (
          <li key={point} className="flex gap-2.5">
            <span aria-hidden="true" className="mt-2.5 h-px w-3 shrink-0 bg-accent" />
            {point}
          </li>
        ))}
      </ul>
      <ul aria-label="Built with" className="mt-5 flex flex-wrap gap-1.5">
        {project.tech.map((item) => (
          <li key={item} className="tag">
            {item}
          </li>
        ))}
      </ul>
      <div className="mt-auto flex flex-wrap gap-x-6 gap-y-2 pt-6">
        {project.demo && (
          <ExternalLink href={project.demo}>
            Live demo<span className="sr-only"> of {project.name}</span>
          </ExternalLink>
        )}
        <a href={project.code} target="_blank" rel="noreferrer" className="text-link">
          <Code2 aria-hidden="true" className="size-4" />
          Source code<span className="sr-only"> for {project.name} (opens in a new tab)</span>
        </a>
      </div>
    </article>
  );
}
