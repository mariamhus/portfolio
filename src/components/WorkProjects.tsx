import { Section } from "./Section";
import { workProjects } from "../data/profile";

export function WorkProjects() {
  return (
    <Section id="work" title="Professional work" intro="Products I've built frontends for at work and as a freelancer.">
      <ul className="divide-y divide-line border-y border-line">
        {workProjects.map((item) => (
          <li key={item.name} className="grid gap-2 py-6 md:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] md:gap-8">
            <div>
              <h3 className="text-lg font-semibold leading-snug">{item.name}</h3>
              <p className="mt-1 text-sm text-muted">{item.context}</p>
            </div>
            <div>
              <p>{item.summary}</p>
              <p className="mt-3 text-sm text-muted">{item.tech.join(", ")}</p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
