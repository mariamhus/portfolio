import type { ReactNode } from "react";

interface SectionProps {
  id: string;
  title: string;
  intro?: string;
  /** Put the title above the content instead of beside it, so the content gets the full width. */
  stacked?: boolean;
  children: ReactNode;
}

export function Section({ id, title, intro, stacked = false, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-24 border-t border-line py-16 sm:py-24">
      <div className={stacked ? "grid gap-10" : "grid gap-8 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-12"}>
        {/* Title and intro stick as one block, so a title that wraps never runs into the intro. */}
        <div className={stacked ? undefined : "lg:sticky lg:top-28 lg:self-start"}>
          <h2 id={`${id}-title`} className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {title}
          </h2>
          {intro && <p className="mt-3 max-w-sm text-muted">{intro}</p>}
        </div>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}
