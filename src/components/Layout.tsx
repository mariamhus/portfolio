import { useEffect, type ReactNode } from "react";
import { Header, type Page } from "./Header";
import { Starfield } from "./Starfield";
import { profile } from "../data/profile";

export function Layout({ page, children }: { page: Page; children: ReactNode }) {
  // Links like /about/#work arrive before React has drawn the section, so the browser can't jump to it.
  // Jump once the page is on screen, and again after fonts load in case the layout shifted.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;
    const jump = () => document.getElementById(id)?.scrollIntoView({ behavior: "instant" });
    window.requestAnimationFrame(jump);
    document.fonts?.ready.then(jump);
  }, []);

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Starfield />
      <Header page={page} />
      <main id="main" className="page-container">
        {children}
      </main>
      <footer className="page-container">
        <div className="flex flex-wrap justify-between gap-2 border-t border-line py-8 text-sm text-muted">
          <p>
            © {new Date().getFullYear()} {profile.name}
          </p>
          <p>Built with React, TypeScript, and Tailwind CSS.</p>
        </div>
      </footer>
    </>
  );
}
