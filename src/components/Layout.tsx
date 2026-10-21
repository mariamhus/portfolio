import type { ReactNode } from "react";
import { Header, type Page } from "./Header";
import { profile } from "../data/profile";

export function Layout({ page, children }: { page: Page; children: ReactNode }) {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header page={page} />
      <main id="main" className="mx-auto max-w-6xl px-4 sm:px-8">
        {children}
      </main>
      <footer className="mx-auto max-w-6xl px-4 sm:px-8">
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
