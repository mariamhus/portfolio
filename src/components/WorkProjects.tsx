import { useLayoutEffect, useRef } from "react";
import { Section } from "./Section";
import { workProjects } from "../data/profile";

// The line fills as the reader scrolls; each dot lights up once the fill reaches it.
// The fill tracks a point 60% down the screen.
const ANCHOR = 0.6;

export function WorkProjects() {
  const listRef = useRef<HTMLOListElement>(null);

  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const items = Array.from(list.querySelectorAll<HTMLElement>(".timeline-item"));
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let centers: number[] = [];
    let frame = 0;

    function measure() {
      const top = list!.getBoundingClientRect().top;
      centers = items.map((item) => {
        const dot = item.querySelector<HTMLElement>(".timeline-dot")!.getBoundingClientRect();
        return dot.top + dot.height / 2 - top;
      });
      const start = centers[0] ?? 0;
      list!.style.setProperty("--track-start", `${start}px`);
      list!.style.setProperty("--track-length", `${(centers.at(-1) ?? 0) - start}px`);
    }

    function update() {
      frame = 0;
      const reached = reduceMotion ? Infinity : window.innerHeight * ANCHOR - list!.getBoundingClientRect().top;
      const start = centers[0] ?? 0;
      const length = (centers.at(-1) ?? 0) - start;
      list!.style.setProperty("--fill", `${Math.min(length, Math.max(0, reached - start))}px`);
      items.forEach((item, index) => item.toggleAttribute("data-active", reached >= centers[index] - 1));
    }

    function schedule() {
      if (!frame) frame = window.requestAnimationFrame(update);
    }

    function refresh() {
      measure();
      update();
    }

    refresh();
    // Fonts and images can shift the layout after the first paint.
    document.fonts?.ready.then(refresh);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", refresh);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", refresh);
    };
  }, []);

  return (
    <Section id="work" title="Professional work" intro="Products I've built frontends for at work.">
      <ol ref={listRef} className="timeline">
        {workProjects.map((item) => (
          <li key={item.name} className="timeline-item">
            <span aria-hidden="true" className="timeline-dot" />
            <p className="text-sm font-medium text-muted">{item.context}</p>
            <h3 className="mt-1 font-display text-2xl font-bold leading-snug tracking-tight sm:text-3xl">{item.name}</h3>
            <p className="mt-3 max-w-2xl text-muted">{item.summary}</p>
            <ul aria-label="Built with" className="mt-4 flex flex-wrap gap-1.5">
              {item.tech.map((tech) => (
                <li key={tech} className="tag">
                  {tech}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </Section>
  );
}
