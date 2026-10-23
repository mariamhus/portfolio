import { Download } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { useActiveSection } from "../hooks/useActiveSection";
import { profile } from "../data/profile";

export type Page = "home" | "about" | "projects" | "contact";

// Items with an href are separate pages; the rest are sections of the home page.
const NAV: { id: string; label: string; href?: string; page?: Page }[] = [
  { id: "about", label: "About", href: "/about/", page: "about" },
  { id: "work", label: "Work", href: "/about/#work" },
  { id: "projects", label: "Projects", href: "/projects/", page: "projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact", href: "/contact/", page: "contact" },
];

const SECTION_IDS = NAV.filter((item) => !item.href).map((item) => item.id);

export function Header({ page }: { page: Page }) {
  const active = useActiveSection(SECTION_IDS);

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-bg/80 backdrop-blur-xl">
      <div className="page-container flex h-16 items-center justify-between gap-4">
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
          <ThemeToggle />
          <a href={profile.cv} download className="button-secondary h-10 px-4 text-sm">
            <Download aria-hidden="true" className="size-4" />
            CV
          </a>
        </div>
      </div>
    </header>
  );
}
