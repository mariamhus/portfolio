import { FallingWords } from "./FallingWords";
import { Section } from "./Section";
import { profile } from "../data/profile";

export function About() {
  return (
    <Section id="about" title="About">
      <div className="max-w-2xl space-y-5 text-lg leading-relaxed">
        {profile.about.map((paragraph) => (
          <FallingWords key={paragraph} text={paragraph} />
        ))}
      </div>
    </Section>
  );
}
