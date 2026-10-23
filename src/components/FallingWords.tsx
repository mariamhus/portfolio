import { useLayoutEffect, useRef, type CSSProperties } from "react";

interface FallingWordsProps {
  text: string;
  className?: string;
}

function clamp(value: number) {
  return Math.min(1, Math.max(0, value));
}

function easeOutBack(t: number) {
  const c = 1.6;
  return 1 + (c + 1) * (t - 1) ** 3 + c * (t - 1) ** 2;
}

export function FallingWords({ text, className }: FallingWordsProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = text.split(" ");

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const spans = Array.from(element.querySelectorAll<HTMLElement>(".fall-word"));
    let frame = 0;

    function update() {
      frame = 0;
      const top = element!.getBoundingClientRect().top;
      const viewport = window.innerHeight;
      // 0 when the paragraph's top reaches the bottom of the screen, 1 once it is 45% from the top.
      const progress = clamp((viewport * 0.95 - top) / (viewport * 0.5));
      spans.forEach((span, index) => {
        const start = (index / spans.length) * 0.6;
        const t = clamp((progress - start) / 0.4);
        span.style.setProperty("--t", t.toFixed(3));
        span.style.setProperty("--e", easeOutBack(t).toFixed(3));
      });
    }

    function schedule() {
      if (!frame) frame = window.requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [text]);

  return (
    <p ref={ref} className={className}>
      {words.map((word, index) => (
        <span key={index}>
          {index > 0 && " "}
          <span className="fall-word" style={{ "--r": `${((index * 37) % 21) - 10}deg` } as CSSProperties}>
            {word}
          </span>
        </span>
      ))}
    </p>
  );
}
