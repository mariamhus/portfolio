import type { CSSProperties } from "react";
import { ArrowRight, Download, MapPin } from "lucide-react";
import { ExternalLink } from "./ExternalLink";
import { FlipCard } from "./FlipCard";
import { profile } from "../data/profile";

function Letters({ text, offset = 0 }: { text: string; offset?: number }) {
  return [...text].map((char, index) => (
    <span key={index} className="hero-letter">
      <span style={{ "--l": offset + index } as CSSProperties}>{char === " " ? " " : char}</span>
    </span>
  ));
}

export function Hero() {
  const [first, ...rest] = profile.name.split(" ");

  return (
    <section id="top" aria-labelledby="hero-name" className="pt-14 pb-20 sm:pt-20 sm:pb-28">
      <p className="flex items-center gap-2 text-lg text-muted">
        <MapPin aria-hidden="true" className="size-4" />
        {profile.title} in {profile.location}
      </p>
      <div className="hero-name-wrap mt-4">
        <h1 id="hero-name" className="hero-name font-display font-extrabold">
          <span className="sr-only">{profile.name}</span>
          <span aria-hidden="true" className="hero-line">
            <span>
              <Letters text={first} />
            </span>
          </span>
          <span aria-hidden="true" className="hero-line">
            <span className="text-accent">
              <Letters text={rest.join(" ")} offset={first.length} />
            </span>
          </span>
        </h1>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end lg:gap-16">
        <div>
          <p className="max-w-2xl text-xl leading-relaxed sm:text-2xl sm:leading-relaxed">{profile.intro}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="/projects/" className="button-primary">
              See my projects
              <ArrowRight aria-hidden="true" className="size-4" />
            </a>
            <a href={profile.cv} download className="button-secondary">
              <Download aria-hidden="true" className="size-4" />
              Download CV
            </a>
          </div>
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
            {profile.links.map((link) => (
              <li key={link.href}>
                <ExternalLink href={link.href}>{link.label}</ExternalLink>
              </li>
            ))}
            <li>
              <a href={`mailto:${profile.email}`} className="text-link">
                Email
              </a>
            </li>
            {/* <li>
              <a href="#about" className="text-link">
                More about me
              </a>
            </li> */}
          </ul>
        </div>

        <FlipCard />
      </div>
    </section>
  );
}
