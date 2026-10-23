import { useEffect, useState, type CSSProperties } from "react";
import { Pause, Play, RotateCw } from "lucide-react";
import { aboutFacts, profile } from "../data/profile";

const INTERVAL_MS = 6000;

// The current role first, then each fact from "A little more about me".
const ITEMS = [null, ...aboutFacts] as const;

function Face({ item, hidden }: { item: string | null; hidden: boolean }) {
  return (
    <span className="flip-face" aria-hidden={hidden || undefined}>
      {item === null ? (
        <>
          <span className="flex items-center gap-2.5 font-semibold">
            <span aria-hidden="true" className="live-dot" />
            {profile.now.role}
          </span>
          <span className="mt-1.5 block text-muted">{profile.now.detail}</span>
        </>
      ) : (
        <>
          <span className="block text-xs font-semibold tracking-[0.14em] text-accent uppercase">
            A little more about me · {aboutFacts.indexOf(item) + 1}/{aboutFacts.length}
          </span>
          <span className="mt-2 block font-medium">{item}</span>
        </>
      )}
    </span>
  );
}

// A card that flips between what I'm working on and a few facts about me. It flips on its own every
// few seconds, pauses on hover and focus, and flips straight away on click, tap, Enter, or Space.
export function FlipCard() {
  const [step, setStep] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [stopped, setStopped] = useState(false);
  const paused = hovering || stopped;
  const count = ITEMS.length;

  useEffect(() => {
    if (paused) return;
    const id = window.setTimeout(() => setStep((value) => value + 1), INTERVAL_MS);
    return () => window.clearTimeout(id);
  }, [paused, step]);

  // Each face shows the item for its turn; the hidden face already holds the next one.
  const front = ITEMS[(step % 2 === 0 ? step : step + 1) % count];
  const back = ITEMS[(step % 2 === 1 ? step : step + 1) % count];
  const showingFront = step % 2 === 0;

  return (
    <aside aria-label="What I'm working on, and a few facts about me" className="flip-card" onPointerEnter={() => setHovering(true)} onPointerLeave={() => setHovering(false)}>
      <button
        type="button"
        onClick={() => setStep((value) => value + 1)}
        onFocus={() => setHovering(true)}
        onBlur={() => setHovering(false)}
        className="flip-inner"
        style={{ "--turn": step } as CSSProperties}
      >
        <Face item={front} hidden={!showingFront} />
        <Face item={back} hidden={showingFront} />
        <span className="sr-only">Show the next fact</span>
      </button>
      <div className="flip-controls">
        <span className="flip-progress" aria-hidden="true">
          <span key={step} data-paused={paused || undefined} style={{ "--interval": `${INTERVAL_MS}ms` } as CSSProperties} />
        </span>
        <button type="button" onClick={() => setStep((value) => value + 1)} className="flip-control" aria-label="Next">
          <RotateCw aria-hidden="true" className="size-3.5" />
        </button>
        <button type="button" onClick={() => setStopped((value) => !value)} className="flip-control" aria-label={stopped ? "Resume flipping" : "Pause flipping"} aria-pressed={stopped}>
          {stopped ? <Play aria-hidden="true" className="size-3.5" /> : <Pause aria-hidden="true" className="size-3.5" />}
        </button>
      </div>
    </aside>
  );
}
