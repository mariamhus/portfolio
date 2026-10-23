import { useEffect, useRef } from "react";
import { ArrowUpRight, Code2, X } from "lucide-react";
import { galleries, type Shot } from "../data/gallery";
import type { Project } from "../data/profile";

interface ProjectDetailsProps {
  project: Project | null;
  /** All projects, for the "Project 01 / 08" counter. */
  projects: Project[];
  onClose: () => void;
}

// Auto-scroll: pixels per second, the pause at each end, and how long to wait after the visitor
// scrolls the frame themselves before taking over again.
const SPEED = 55;
const HOLD_MS = 1800;
const IDLE_MS = 3000;

function slug(project: Project) {
  return project.image.replace(/^.*\//, "").replace(/\.\w+$/, "");
}

// Desktop shot, then the phone shots side by side, then the second desktop shot.
function rows(project: Project): Shot[][] {
  const shots = galleries[slug(project)] ?? [{ src: project.image, kind: "desktop", width: 1600, height: 1000 }];
  const desktop = shots.filter((shot) => shot.kind === "desktop");
  const mobile = shots.filter((shot) => shot.kind === "mobile");
  return [desktop.slice(0, 1), mobile, desktop.slice(1)].filter((row) => row.length > 0);
}

// A full-screen project view: the details on the left, and the site's screens gliding up and down
// on their own inside a dark device frame on the right.
// It's a native <dialog> opened with showModal(): focus stays inside, Escape closes it, and focus
// returns to the button that opened it.
export function ProjectDetails({ project, projects, onClose }: ProjectDetailsProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  const index = project ? projects.findIndex((item) => item.name === project.name) : -1;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (project && !dialog.open) dialog.showModal();
    if (!project && dialog.open) dialog.close();
  }, [project]);

  // Glide the screens down, hold, glide back up, hold, and repeat. Hovering pauses it, and scrolling
  // the frame by hand hands over control until the visitor has been idle for a moment.
  useEffect(() => {
    const frame = frameRef.current;
    if (!project || !frame) return;
    frame.scrollTop = 0;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let direction = 1;
    let holdUntil = performance.now() + HOLD_MS;
    let idleUntil = 0;
    let hovering = false;
    let position = 0;
    let last = performance.now();
    let frameId = 0;

    function tick(now: number) {
      const dt = Math.min(64, now - last) / 1000;
      last = now;
      const max = frame!.scrollHeight - frame!.clientHeight;
      if (!hovering && now > idleUntil && now > holdUntil && max > 0) {
        position = Math.min(max, Math.max(0, position + direction * SPEED * dt));
        frame!.scrollTop = position;
        if (position >= max || position <= 0) {
          direction = position >= max ? -1 : 1;
          holdUntil = now + HOLD_MS;
        }
      } else {
        position = frame!.scrollTop;
      }
      frameId = window.requestAnimationFrame(tick);
    }

    const takeOver = () => {
      idleUntil = performance.now() + IDLE_MS;
    };
    const enter = () => {
      hovering = true;
    };
    const leave = () => {
      hovering = false;
    };
    frame.addEventListener("wheel", takeOver, { passive: true });
    frame.addEventListener("touchstart", takeOver, { passive: true });
    frame.addEventListener("keydown", takeOver);
    frame.addEventListener("pointerenter", enter);
    frame.addEventListener("pointerleave", leave);
    frameId = window.requestAnimationFrame(tick);
    return () => {
      window.cancelAnimationFrame(frameId);
      frame.removeEventListener("wheel", takeOver);
      frame.removeEventListener("touchstart", takeOver);
      frame.removeEventListener("keydown", takeOver);
      frame.removeEventListener("pointerenter", enter);
      frame.removeEventListener("pointerleave", leave);
    };
  }, [project]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="project-view-title"
      onClose={onClose}
      className="project-view"
    >
      {project && (
        <div className="pv-scroll">
          <div className="pv-bar">
            <p className="text-sm font-medium text-muted tabular-nums">
              Project {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
            </p>
            <button type="button" onClick={onClose} className="pv-close">
              <X aria-hidden="true" className="size-4" />
              Close
            </button>
          </div>

          <div key={project.name} className="pv-content">
            <div className="pv-grid">
              <div className="pv-info">
                <h2 id="project-view-title" className="font-display text-[clamp(2.5rem,4.5vw,4.25rem)] leading-[0.95] font-bold tracking-tight">
                  {project.name}
                </h2>
                <p className="mt-2 text-xl text-muted italic">({project.tagline.replace(/\.$/, "")})</p>
                <p className="mt-6 leading-relaxed">{project.summary}</p>
                <ul className="mt-5 space-y-2.5 text-[0.95rem] leading-relaxed text-muted">
                  {project.highlights.map((point) => (
                    <li key={point} className="flex gap-2.5">
                      <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-accent" />
                      {point}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-sm text-muted">
                  <span className="font-semibold text-ink">Built with </span>
                  {project.tech.join(" · ")}
                </p>
                <p className="sr-only">{project.imageAlt}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noreferrer" className="pv-pill pv-pill-accent">
                      Visit live site
                      <ArrowUpRight aria-hidden="true" className="size-4" />
                      <span className="sr-only"> for {project.name} (opens in a new tab)</span>
                    </a>
                  )}
                  <a href={project.code} target="_blank" rel="noreferrer" className="pv-pill">
                    <Code2 aria-hidden="true" className="size-4" />
                    Source code<span className="sr-only"> for {project.name} (opens in a new tab)</span>
                  </a>
                </div>
              </div>

              <div ref={frameRef} className="pv-frame" tabIndex={0} aria-label={`Screens from ${project.name}. Scrolls on its own; hover to pause.`}>
                <div className="pv-gallery">
                  {rows(project).map((row, rowIndex) => (
                    <div key={rowIndex} className="pv-row" data-kind={row[0].kind}>
                      {row.map((shot) => (
                        <img
                          key={shot.src}
                          src={shot.src}
                          alt=""
                          width={shot.width}
                          height={shot.height}
                          loading={rowIndex === 0 ? "eager" : "lazy"}
                          decoding="async"
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}
