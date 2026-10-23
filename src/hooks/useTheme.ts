import { useCallback, useEffect, useRef, useState } from "react";

export type Theme = "light" | "dark";
export type SkyTransition = "sunrise" | "sunset";

const SWITCH_AT = 950;
const DURATION = 1600;

function applyTheme(next: Theme) {
  document.documentElement.dataset.theme = next;
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", next === "light" ? "#eef6ff" : "#05060f");
  try {
    window.localStorage.setItem("portfolio:theme", next);
  } catch {
    // Storage can be blocked; the theme still applies for this visit.
  }
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => (document.documentElement.dataset.theme === "light" ? "light" : "dark"));
  const [transition, setTransition] = useState<SkyTransition | null>(null);
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach((id) => window.clearTimeout(id)), []);

  const change = useCallback(
    (next: Theme) => {
      if (transition || next === theme) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        applyTheme(next);
        setTheme(next);
        return;
      }

      setTransition(next === "light" ? "sunrise" : "sunset");
      timers.current = [
        window.setTimeout(() => {
          applyTheme(next);
          setTheme(next);
        }, SWITCH_AT),
        window.setTimeout(() => setTransition(null), DURATION),
      ];
    },
    [theme, transition],
  );

  const toggle = useCallback(() => change(theme === "dark" ? "light" : "dark"), [change, theme]);

  return { theme, transition, change, toggle };
}
