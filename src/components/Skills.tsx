import { Section } from "./Section";
import { certifications, education, skills } from "../data/profile";

export function Skills() {
  return (
    <Section id="skills" title="Skills and education">
      <div className="space-y-8">
        {skills.map((group) => (
          <div key={group.group}>
            <h3 className="font-semibold">{group.group}</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li key={item} className="chip">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-14 grid gap-10 sm:grid-cols-2">
        <div>
          <h3 className="font-semibold">Education</h3>
          <ul className="mt-4 space-y-5">
            {education.map((item) => (
              <li key={item.title}>
                <p className="font-medium">{item.title}</p>
                <p className="text-sm text-muted">
                  {item.place}, {item.period}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold">Certifications</h3>
          <ul className="mt-4 space-y-5">
            {certifications.map((item) => (
              <li key={item.title}>
                <p className="font-medium">{item.title}</p>
                <p className="text-sm text-muted">
                  {item.place}, {item.period}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
