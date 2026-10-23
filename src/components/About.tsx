import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowDown } from "lucide-react";
import { Section } from "./Section";
import { useInView } from "../hooks/useInView";
import { aboutCards, profile, type AboutCard } from "../data/profile";

function Visual({ kind }: { kind: AboutCard["visual"] }) {
  if (kind === "architecture") {
    // A component tree that draws its connections.
    return (
      <svg viewBox="0 0 200 110" className="about-visual" aria-hidden="true">
        <g className="viz-lines">
          <path d="M100 26 V40 H52 V56" />
          <path d="M100 40 H148 V56" />
          <path d="M52 76 V86 H26 V94" />
          <path d="M52 86 H78 V94" />
          <path d="M148 76 V94" />
        </g>
        <rect className="viz-node viz-node-root" x="74" y="8" width="52" height="18" rx="6" />
        <rect className="viz-node" x="28" y="56" width="48" height="20" rx="6" />
        <rect className="viz-node" x="124" y="56" width="48" height="20" rx="6" />
        <rect className="viz-node viz-leaf" x="10" y="94" width="32" height="12" rx="4" />
        <rect className="viz-node viz-leaf" x="62" y="94" width="32" height="12" rx="4" />
        <rect className="viz-node viz-leaf" x="132" y="94" width="32" height="12" rx="4" />
      </svg>
    );
  }
  if (kind === "performance") {
    // Render times dropping as the bars get faster, with a speed line on top.
    return (
      <svg viewBox="0 0 200 110" className="about-visual" aria-hidden="true">
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <rect key={index} className="viz-bar" x={18 + index * 30} y="18" width="18" height="84" rx="4" style={{ "--i": index } as CSSProperties} />
        ))}
        <path className="viz-speed" d="M14 30 C60 34 90 60 120 72 S170 90 190 94" />
      </svg>
    );
  }
  // A form being walked through with the keyboard: the focus ring moves from field to field.
  return (
    <svg viewBox="0 0 200 110" className="about-visual" aria-hidden="true">
      <rect className="viz-field" x="16" y="12" width="168" height="22" rx="6" />
      <rect className="viz-field" x="16" y="44" width="168" height="22" rx="6" />
      <rect className="viz-button" x="16" y="78" width="70" height="22" rx="11" />
      <rect className="viz-focus" x="12" y="8" width="176" height="30" rx="9" />
      <text className="viz-rtl" x="176" y="27" textAnchor="end">
        مرحبا
      </text>
    </svg>
  );
}

function Card({ card, index }: { card: AboutCard; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <li style={{ "--i": index } as CSSProperties} className="about-card-slot">
      <article
        tabIndex={0}
        aria-labelledby={`about-card-${index}`}
        data-open={open || undefined}
        onClick={() => setOpen((value) => !value)}
        className="about-card"
      >
        <Visual kind={card.visual} />
        <h3 id={`about-card-${index}`} className="mt-5 font-display text-2xl font-bold tracking-tight">
          {card.title}
        </h3>
        <p className="mt-1 text-muted">{card.subtitle}</p>
        <div className="about-card-more">
          <p className="pt-3 text-[0.95rem] leading-relaxed">{card.description}</p>
        </div>
      </article>
    </li>
  );
}

// A line that grows as you scroll and leads into the Professional work timeline below.
function Bridge() {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      element.style.setProperty("--grow", "1");
      return;
    }
    let frame = 0;
    const update = () => {
      frame = 0;
      const box = element.getBoundingClientRect();
      const progress = (window.innerHeight * 0.9 - box.top) / (box.height + window.innerHeight * 0.4);
      element.style.setProperty("--grow", Math.min(1, Math.max(0, progress)).toFixed(3));
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
    };
  }, []);

  return (
    <a ref={ref} href="#work" className="about-bridge">
      <span className="about-bridge-line" aria-hidden="true" />
      <span className="flex items-center gap-2 font-semibold">
        Where I've put it to work
        <ArrowDown aria-hidden="true" className="size-4" />
      </span>
    </a>
  );
}

// Sits under the hero, so it skips a second big introduction: a short intro, three cards about how
// I work, and a line that leads into Professional work below.
export function About() {
  const [ref, inView] = useInView<HTMLDivElement>(0.2);

  return (
    <Section id="about" title="About" intro="How I like to work.">
      <div ref={ref} data-inview={inView || undefined} className="about">
        <p className="about-intro max-w-2xl text-lg leading-relaxed sm:text-xl">{profile.about[0]}</p>
        <ul className="mt-10 grid items-start gap-5 md:grid-cols-3">
          {aboutCards.map((card, index) => (
            <Card key={card.title} card={card} index={index} />
          ))}
        </ul>
        <Bridge />
      </div>
    </Section>
  );
}
