// Screenshots of each live demo, captured at desktop (1440px) and phone (390px) sizes.
// Keys match the project image name in profile.ts, e.g. /projects/raff.webp -> "raff".

export interface Shot {
  src: string;
  kind: "desktop" | "mobile";
  width: number;
  height: number;
}

export const galleries: Record<string, Shot[]> = {
  "expense": [
    { src: "/projects/gallery/expense-desktop-1.webp", kind: "desktop", width: 1600, height: 1000 },
    { src: "/projects/gallery/expense-desktop-2.webp", kind: "desktop", width: 1600, height: 1000 },
    { src: "/projects/gallery/expense-mobile-1.webp", kind: "mobile", width: 640, height: 1385 },
    { src: "/projects/gallery/expense-mobile-2.webp", kind: "mobile", width: 640, height: 1385 },
  ],
  "kanban": [
    { src: "/projects/gallery/kanban-desktop-1.webp", kind: "desktop", width: 1600, height: 1000 },
    { src: "/projects/gallery/kanban-desktop-2.webp", kind: "desktop", width: 1600, height: 1000 },
    { src: "/projects/gallery/kanban-mobile-1.webp", kind: "mobile", width: 640, height: 1385 },
  ],
  "markdown-notes": [
    { src: "/projects/gallery/markdown-notes-desktop-1.webp", kind: "desktop", width: 1600, height: 1000 },
    { src: "/projects/gallery/markdown-notes-desktop-2.webp", kind: "desktop", width: 1600, height: 1000 },
    { src: "/projects/gallery/markdown-notes-mobile-1.webp", kind: "mobile", width: 640, height: 1385 },
  ],
  "movies": [
    { src: "/projects/gallery/movies-desktop-1.webp", kind: "desktop", width: 1600, height: 1000 },
    { src: "/projects/gallery/movies-desktop-2.webp", kind: "desktop", width: 1600, height: 1000 },
    { src: "/projects/gallery/movies-mobile-1.webp", kind: "mobile", width: 640, height: 1385 },
    { src: "/projects/gallery/movies-mobile-2.webp", kind: "mobile", width: 640, height: 1385 },
  ],
  "pomodoro": [
    { src: "/projects/gallery/pomodoro-desktop-1.webp", kind: "desktop", width: 1600, height: 1000 },
    { src: "/projects/gallery/pomodoro-desktop-2.webp", kind: "desktop", width: 1600, height: 1000 },
    { src: "/projects/gallery/pomodoro-mobile-1.webp", kind: "mobile", width: 640, height: 1385 },
    { src: "/projects/gallery/pomodoro-mobile-2.webp", kind: "mobile", width: 640, height: 1385 },
  ],
  "print-store": [
    { src: "/projects/gallery/print-store-desktop-1.webp", kind: "desktop", width: 1600, height: 1000 },
    { src: "/projects/gallery/print-store-desktop-2.webp", kind: "desktop", width: 1600, height: 1000 },
    { src: "/projects/gallery/print-store-mobile-1.webp", kind: "mobile", width: 640, height: 1385 },
    { src: "/projects/gallery/print-store-mobile-2.webp", kind: "mobile", width: 640, height: 1385 },
  ],
  "raff": [
    { src: "/projects/gallery/raff-desktop-1.webp", kind: "desktop", width: 1600, height: 1000 },
    { src: "/projects/gallery/raff-desktop-2.webp", kind: "desktop", width: 1600, height: 1000 },
    { src: "/projects/gallery/raff-mobile-1.webp", kind: "mobile", width: 640, height: 1385 },
    { src: "/projects/gallery/raff-mobile-2.webp", kind: "mobile", width: 640, height: 1385 },
  ],
  "weather": [
    { src: "/projects/gallery/weather-desktop-1.webp", kind: "desktop", width: 1600, height: 1000 },
    { src: "/projects/gallery/weather-desktop-2.webp", kind: "desktop", width: 1600, height: 1000 },
    { src: "/projects/gallery/weather-mobile-1.webp", kind: "mobile", width: 640, height: 1385 },
    { src: "/projects/gallery/weather-mobile-2.webp", kind: "mobile", width: 640, height: 1385 },
  ],
};
