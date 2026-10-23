import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { ProjectDetails } from "./ProjectDetails";
import { ProjectShowcase } from "./ProjectShowcase";
import { projects, type Project } from "../data/profile";

export function Projects() {
  const [open, setOpen] = useState<Project | null>(null);

  return (
    <section id="projects" aria-labelledby="projects-title" className="scroll-mt-16 border-t border-line pt-16 pb-20 sm:pt-20">
      <ProjectShowcase
        projects={projects}
        onOpen={setOpen}
        heading={
          <div>
            <h2 id="projects-title" className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Projects
            </h2>
            <p className="mt-2 max-w-md text-muted">Personal projects, designed and built end to end.</p>
          </div>
        }
      />
      <a href="/projects/" className="button-secondary mt-10">
        View all {projects.length} projects
        <ArrowRight aria-hidden="true" className="size-4" />
      </a>
      <ProjectDetails project={open} projects={projects} onClose={() => setOpen(null)} />
    </section>
  );
}
