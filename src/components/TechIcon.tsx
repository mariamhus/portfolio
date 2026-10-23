import type { ComponentType } from "react";
import { AudioLines, Boxes, ChartLine, CloudSun, FileText, Radio, ShieldCheck, type LucideProps } from "lucide-react";
import {
  siAngular,
  siAntdesign,
  siChartdotjs,
  siExpress,
  siI18next,
  siJavascript,
  siJsonwebtokens,
  siMongodb,
  siMui,
  siNextdotjs,
  siNodedotjs,
  siReact,
  siReacthookform,
  siReactquery,
  siReactrouter,
  siRedux,
  siTailwindcss,
  siTestinglibrary,
  siTypescript,
  siVite,
  siVitest,
  siZod,
  type SimpleIcon,
} from "simple-icons";

// Brand logos for the tools in profile.ts. Related tools share a logo (RTK Query uses Redux).
const BRANDS: Record<string, SimpleIcon> = {
  React: siReact,
  TypeScript: siTypescript,
  JavaScript: siJavascript,
  "Next.js": siNextdotjs,
  Angular: siAngular,
  "Angular CDK": siAngular,
  "TanStack Query": siReactquery,
  "React Hook Form": siReacthookform,
  "React Router": siReactrouter,
  "React Testing Library": siTestinglibrary,
  "Redux Toolkit": siRedux,
  "RTK Query": siRedux,
  "Tailwind CSS": siTailwindcss,
  "Material UI": siMui,
  "Ant Design": siAntdesign,
  "Chart.js": siChartdotjs,
  i18next: siI18next,
  i18n: siI18next,
  Zod: siZod,
  Vite: siVite,
  Vitest: siVitest,
  JWT: siJsonwebtokens,
  "Node.js": siNodedotjs,
  Express: siExpress,
  MongoDB: siMongodb,
};

// Tools without a brand logo in the icon set get a matching symbol.
const SYMBOLS: Record<string, ComponentType<LucideProps>> = {
  Zustand: Boxes,
  Recharts: ChartLine,
  Signals: Radio,
  marked: FileText,
  DOMPurify: ShieldCheck,
  "Web Audio API": AudioLines,
  "Open-Meteo API": CloudSun,
};

// Near-black logos (Next.js, Express) would vanish on the night sky, so they use the text color.
function isDark(hex: string) {
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16));
  return 0.299 * r + 0.587 * g + 0.114 * b < 60;
}

export function TechIcon({ name, className = "size-4" }: { name: string; className?: string }) {
  const brand = BRANDS[name];
  if (brand) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={`shrink-0 ${className}`} style={{ color: isDark(brand.hex) ? "var(--ink)" : `#${brand.hex}` }}>
        <path d={brand.path} fill="currentColor" />
      </svg>
    );
  }
  const Symbol = SYMBOLS[name] ?? Boxes;
  return <Symbol aria-hidden="true" className={`shrink-0 text-accent ${className}`} />;
}
