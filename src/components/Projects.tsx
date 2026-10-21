import { ArrowRight } from "lucide-react";
import { ProjectCard } from "./ProjectCard";
import { Section } from "./Section";
import { projects } from "../data/profile";

const FEATURED = projects.slice(0, 3);

export function Projects() {
  return (
    <Section id="projects" title="Projects" intro="A few recent personal projects, designed and built end to end." stacked>
      <ul className="grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
        {FEATURED.map((project) => (
          <li key={project.name}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
      <a href="/projects/" className="button-secondary mt-12">
        View all {projects.length} projects
        <ArrowRight aria-hidden="true" className="size-4" />
      </a>
    </Section>
  );
}
