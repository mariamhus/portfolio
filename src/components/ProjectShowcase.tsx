import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent, type ReactNode } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Lock } from "lucide-react";
import type { Project } from "../data/profile";

interface ProjectShowcaseProps {
  projects: Project[];
  onOpen: (project: Project) => void;
  /** Rendered above the spotlight, inside the pinned area, so the heading stays with the projects. */
  heading: ReactNode;
}

// How much page scroll moves the spotlight on by one project while the section is pinned, as a share of the screen height.
const STEP = 0.32;
const PIN_QUERY = "(min-width: 1024px) and (min-height: 800px) and (prefers-reduced-motion: no-preference)";
const SWIPE_PX = 40;

function host(url: string) {
  try {
    return new URL(url).host;
  } catch {
    return url;
  }
}

// Position of each slide relative to the active one, wrapping around: 0 is the spotlight, -1 and 1 the neighbours.
function offsetOf(index: number, active: number, count: number) {
  return ((index - active + count + Math.floor(count / 2)) % count) - Math.floor(count / 2);
}

// One project at a time in a large browser window. Arrows, tabs, swipes, or (on large screens)
// scrolling through the pinned section glide the next project in from the side.
export function ProjectShowcase({ projects, onOpen, heading }: ProjectShowcaseProps) {
  const count = projects.length;
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState(false);
  const pinRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const swipe = useRef<{ x: number; y: number } | null>(null);
  // A swipe ends with a click on the slide; this stops that click from opening the details.
  const swiped = useRef(false);
  const current = projects[active];

  useEffect(() => {
    const query = window.matchMedia(PIN_QUERY);
    const sync = () => setPinned(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  // Pinned: the scroll position inside the section decides which project is in the spotlight.
  const geometry = useCallback(() => {
    const pin = pinRef.current!;
    const sticky = stickyRef.current!;
    const top = parseFloat(getComputedStyle(sticky).top) || 0;
    const start = pin.getBoundingClientRect().top + window.scrollY - top;
    const travel = pin.offsetHeight - sticky.offsetHeight;
    return { start, travel };
  }, []);

  useEffect(() => {
    if (!pinned) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const { start, travel } = geometry();
      const progress = Math.min(1, Math.max(0, (window.scrollY - start) / travel));
      setActive(Math.round(progress * (count - 1)));
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [pinned, count, geometry]);

  const select = useCallback(
    (index: number, focusTab = false) => {
      const next = (index + count) % count;
      setActive(next);
      if (pinned) {
        // Keep the page position and the spotlight in agreement: jump to this project's spot in the pinned range.
        const { start, travel } = geometry();
        window.scrollTo({ top: start + (next / (count - 1)) * travel, behavior: "instant" });
      }
      if (focusTab) tabsRef.current[next]?.focus();
    },
    [count, pinned, geometry],
  );

  // Slide the dark pill under the active tab, and keep that tab in view when the row scrolls.
  useLayoutEffect(() => {
    const tab = tabsRef.current[active];
    const indicator = indicatorRef.current;
    if (!tab || !indicator) return;
    indicator.style.width = `${tab.offsetWidth}px`;
    indicator.style.transform = `translateX(${tab.offsetLeft}px)`;
    const row = tab.parentElement!;
    if (row.scrollWidth > row.clientWidth) row.scrollTo({ left: tab.offsetLeft - (row.clientWidth - tab.offsetWidth) / 2, behavior: "smooth" });
  }, [active]);

  function onTabKey(event: KeyboardEvent) {
    const moves: Record<string, number> = { ArrowRight: active + 1, ArrowLeft: active - 1, Home: 0, End: count - 1 };
    if (event.key in moves) {
      event.preventDefault();
      select(moves[event.key], true);
    }
  }

  // Touch: a clear horizontal swipe changes project; anything else is left to normal vertical scrolling.
  function onPointerDown(event: PointerEvent) {
    swipe.current = { x: event.clientX, y: event.clientY };
  }
  function onPointerUp(event: PointerEvent) {
    const start = swipe.current;
    swipe.current = null;
    if (!start) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dx) > SWIPE_PX && Math.abs(dx) > Math.abs(dy) * 1.5) {
      swiped.current = true;
      select(active + (dx < 0 ? 1 : -1));
    }
  }

  return (
    <div ref={pinRef} className="spot-pin" style={pinned ? ({ "--steps": count - 1, "--step": STEP } as CSSProperties) : undefined} data-pinned={pinned || undefined}>
      <div ref={stickyRef} className="spot-sticky">
        <div className="spot-head">
          {heading}
          <div className="spot-nav">
            <span className="text-sm font-medium text-muted tabular-nums" aria-hidden="true">
              {String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
            </span>
            <button type="button" onClick={() => select(active - 1)} className="spot-arrow" aria-label="Previous project">
              <ArrowLeft aria-hidden="true" className="size-4" />
            </button>
            <button type="button" onClick={() => select(active + 1)} className="spot-arrow" aria-label="Next project">
              <ArrowRight aria-hidden="true" className="size-4" />
            </button>
          </div>
        </div>

        <div className="spot-stage" aria-hidden="true" onPointerDown={onPointerDown} onPointerUp={onPointerUp} onPointerCancel={() => (swipe.current = null)}>
          {projects.map((project, index) => {
            const offset = offsetOf(index, active, count);
            return (
              <button
                key={project.name}
                type="button"
                tabIndex={-1}
                onClick={() => {
                  if (swiped.current) {
                    swiped.current = false;
                    return;
                  }
                  if (offset === 0) onOpen(project);
                  else select(index);
                }}
                className="spot-slide"
                data-offset={Math.max(-2, Math.min(2, offset))}
                style={{ "--offset": offset } as CSSProperties}
              >
                <span className="spot-toolbar">
                  <span className="spot-dots" />
                  <span className="spot-url">
                    <Lock className="size-3" />
                    {host(project.demo || project.code)}
                  </span>
                </span>
                <img src={project.image} alt="" width={1600} height={1000} loading={Math.abs(offset) <= 1 ? "eager" : "lazy"} decoding="async" />
              </button>
            );
          })}
        </div>

        <div id="spot-panel" role="tabpanel" aria-labelledby={`spot-tab-${active}`} className="spot-info" key={current.name}>
          <div className="min-w-0">
            <h3 className="spot-reveal font-display text-3xl font-bold tracking-tight sm:text-4xl" style={{ "--d": 0 } as CSSProperties}>
              {current.name}
            </h3>
            <p className="spot-reveal mt-1.5 text-muted" style={{ "--d": 1 } as CSSProperties}>
              {current.tagline}
            </p>
            <p className="sr-only">{current.imageAlt}</p>
            <ul aria-label="Built with" className="spot-reveal mt-3 flex flex-wrap gap-1.5" style={{ "--d": 2 } as CSSProperties}>
              {current.tech.slice(0, 5).map((item) => (
                <li key={item} className="tag">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="spot-reveal flex flex-wrap items-center gap-x-5 gap-y-3" style={{ "--d": 3 } as CSSProperties}>
            {current.demo && (
              <a href={current.demo} target="_blank" rel="noreferrer" className="text-link">
                Live demo
                <ArrowUpRight aria-hidden="true" className="size-4" />
                <span className="sr-only"> of {current.name} (opens in a new tab)</span>
              </a>
            )}
            <button type="button" onClick={() => onOpen(current)} className="button-secondary h-11">
              View details<span className="sr-only"> about {current.name}</span>
            </button>
          </div>
        </div>

        <div role="tablist" aria-label="Projects" className="spot-tabs">
          <span ref={indicatorRef} className="spot-indicator" aria-hidden="true" />
          {projects.map((project, index) => (
            <button
              key={project.name}
              ref={(element) => {
                tabsRef.current[index] = element;
              }}
              id={`spot-tab-${index}`}
              type="button"
              role="tab"
              aria-selected={index === active}
              aria-controls="spot-panel"
              tabIndex={index === active ? 0 : -1}
              onClick={() => select(index)}
              onKeyDown={onTabKey}
              className="spot-tab"
            >
              {project.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
