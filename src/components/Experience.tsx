import { FallingWords } from "./FallingWords";
import { Section } from "./Section";
import { experience } from "../data/profile";

export function Experience() {
  return (
    <Section id="experience" title="Experience">
      <ol className="space-y-12">
        {experience.map((role) => (
          <li key={`${role.company}-${role.start}`} className="grid gap-3 md:grid-cols-[10rem_minmax(0,1fr)] md:gap-8">
            <p className="text-sm text-muted tabular-nums md:pt-1.5">
              {role.start} – {role.end}
            </p>
            <div>
              <h3 className="text-xl font-semibold leading-snug">
                {role.title}
                <span className="text-muted"> at </span>
                {role.company}
              </h3>
              <p className="mt-1 text-sm text-muted">{role.location}</p>
              <ul className="mt-4 max-w-2xl space-y-2.5">
                {role.points.map((point) => (
                  <li key={point} className="flex gap-3">
                    <span aria-hidden="true" className="mt-[0.7em] size-1.5 shrink-0 rounded-full bg-accent" />
                    <FallingWords text={point} />
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
