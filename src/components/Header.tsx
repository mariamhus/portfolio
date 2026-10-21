import { Download, Moon, Sun } from "lucide-react";
import { useActiveSection } from "../hooks/useActiveSection";
import { useTheme } from "../hooks/useTheme";
import { profile } from "../data/profile";

export type Page = "home" | "projects";

// Items with an href are separate pages; the rest are sections of the home page.
const NAV: { id: string; label: string; href?: string; page?: Page }[] = [
  { id: "experience", label: "Experience" },
  { id: "work", label: "Work" },
  { id: "projects", label: "Projects", href: "/projects/", page: "projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

const SECTION_IDS = NAV.filter((item) => !item.href).map((item) => item.id);

export function Header({ page }: { page: Page }) {
  const active = useActiveSection(SECTION_IDS);
  const { theme, toggle } = useTheme();

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-bg/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-8">
        <a href={page === "home" ? "#top" : "/"} className="font-display text-lg font-bold tracking-tight">
          {profile.name}
        </a>
        <nav aria-label="Sections" className="hidden md:block">
          <ul className="flex gap-1">
            {NAV.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href ?? (page === "home" ? `#${item.id}` : `/#${item.id}`)}
                  aria-current={item.page === page ? "page" : page === "home" && active === item.id ? "true" : undefined}
                  className="rounded-full px-3.5 py-2 text-sm font-medium text-muted transition-colors hover:text-ink aria-[current]:bg-surface aria-[current]:text-ink aria-[current]:shadow-[inset_0_0_0_1px_var(--color-line)]"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggle}
            aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            title={theme === "dark" ? "Light theme" : "Dark theme"}
            className="grid size-10 place-items-center rounded-full text-muted transition-colors hover:bg-surface hover:text-ink"
          >
            {theme === "dark" ? <Sun aria-hidden="true" className="size-[18px]" /> : <Moon aria-hidden="true" className="size-[18px]" />}
          </button>
          <a href={profile.cv} download className="button-secondary h-10 px-4 text-sm">
            <Download aria-hidden="true" className="size-4" />
            CV
          </a>
        </div>
      </div>
    </header>
  );
}
