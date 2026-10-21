import { ArrowLeft } from "lucide-react";
import { Layout } from "./components/Layout";
import { ProjectCard } from "./components/ProjectCard";
import { projects } from "./data/profile";

export default function ProjectsPage() {
  return (
    <Layout page="projects">
      <section aria-labelledby="projects-title" className="pt-12 pb-20 sm:pt-16 sm:pb-28">
        <a href="/" className="text-link text-sm">
          <ArrowLeft aria-hidden="true" className="size-4" />
          Back to home
        </a>
        <h1 id="projects-title" className="mt-8 font-display text-5xl font-extrabold tracking-tight sm:text-6xl">
          Projects
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">
          Personal projects I designed and built end to end, in React, Next.js, and Angular. Each one links to its source
          code, and to a live demo where there is one.
        </p>
        <ul className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <li key={project.name}>
              <ProjectCard project={project} headingLevel="h2" />
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
