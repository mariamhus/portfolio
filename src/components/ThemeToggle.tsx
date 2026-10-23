import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Check, CalendarDays, Flower2, Leaf, Moon, Snowflake, Sun, type LucideIcon } from "lucide-react";
import { useSeason, type SeasonChoice } from "../hooks/useSeason";
import { useTheme } from "../hooks/useTheme";
import type { Season } from "../lib/seasonParticles";

const SEASON_ICONS: Record<Season, LucideIcon> = {
  spring: Flower2,
  summer: Sun,
  autumn: Leaf,
  winter: Snowflake,
};

const OPTIONS: { value: SeasonChoice; label: string; icon: LucideIcon }[] = [
  { value: "auto", label: "Auto (today's season)", icon: CalendarDays },
  { value: "spring", label: "Spring", icon: Flower2 },
  { value: "summer", label: "Summer", icon: Sun },
  { value: "autumn", label: "Autumn", icon: Leaf },
  { value: "winter", label: "Winter", icon: Snowflake },
];

const ICON_BUTTON = "grid size-10 place-items-center rounded-full text-muted transition-colors hover:bg-surface hover:text-ink";

export function ThemeToggle() {
  const { theme, transition, toggle } = useTheme();
  const { choice, season, pick } = useSeason();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const SeasonIcon = SEASON_ICONS[season];

  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: PointerEvent) {
      if (!menuRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  function choose(value: SeasonChoice) {
    pick(value);
    setOpen(false);
  }

  return (
    <>
      <div ref={menuRef} className="relative">
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-haspopup="true"
          aria-expanded={open}
          aria-label={`Season: ${season}. Change season`}
          title="Change season"
          className={ICON_BUTTON}
        >
          <SeasonIcon aria-hidden="true" className="size-4.5" />
        </button>
        {open && (
          <div className="season-menu absolute top-12 right-0 w-56 rounded-2xl border border-line bg-bg p-1.5 shadow-xl">
            <p className="px-3 pt-1.5 pb-1 text-xs font-semibold tracking-wide text-muted uppercase">Season</p>
            <ul>
              {OPTIONS.map((option) => (
                <li key={option.value}>
                  <button
                    type="button"
                    onClick={() => choose(option.value)}
                    aria-pressed={choice === option.value}
                    className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-sm font-medium transition-colors hover:bg-surface aria-pressed:text-accent"
                  >
                    <option.icon aria-hidden="true" className="size-4" />
                    <span className="flex-1">{option.label}</span>
                    {choice === option.value && <Check aria-hidden="true" className="size-4" />}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <button
        type="button"
        onClick={toggle}
        aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
        title={theme === "dark" ? "Day sky" : "Night sky"}
        className={ICON_BUTTON}
      >
        <span key={theme} className="theme-icon">
          {theme === "dark" ? <Sun aria-hidden="true" className="size-4.5" /> : <Moon aria-hidden="true" className="size-4.5" />}
        </span>
      </button>
      {transition &&
        createPortal(
          <div aria-hidden="true" className="sky-transition" data-mode={transition}>
            <span className="sky-night" />
            <span className="sky-day" />
            <span className="sky-clouds" />
          </div>,
          document.body,
        )}
    </>
  );
}
