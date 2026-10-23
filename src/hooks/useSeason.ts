import { useCallback, useState } from "react";
import { currentSeason, seasonForDate, type Season } from "../lib/seasonParticles";

export type SeasonChoice = Season | "auto";

const KEY = "portfolio:season";

function storedChoice(): SeasonChoice {
  try {
    const value = window.localStorage.getItem(KEY);
    if (value === "spring" || value === "summer" || value === "autumn" || value === "winter") return value;
  } catch {
    // Storage can be blocked; fall back to the real season.
  }
  return "auto";
}

export function useSeason() {
  const [choice, setChoice] = useState<SeasonChoice>(storedChoice);
  const [season, setSeasonState] = useState<Season>(currentSeason);

  const pick = useCallback((next: SeasonChoice) => {
    const resolved = next === "auto" ? seasonForDate(new Date()) : next;
    document.documentElement.dataset.season = resolved;
    try {
      if (next === "auto") window.localStorage.removeItem(KEY);
      else window.localStorage.setItem(KEY, next);
    } catch {
      // The pick still applies for this visit.
    }
    setChoice(next);
    setSeasonState(resolved);
  }, []);

  return { choice, season, pick };
}
