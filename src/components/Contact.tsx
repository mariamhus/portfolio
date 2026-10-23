import { useEffect, useState } from "react";
import { Check, Copy, Download } from "lucide-react";
import { ContactForm } from "./ContactForm";
import { ExternalLink } from "./ExternalLink";
import { FallingWords } from "./FallingWords";
import { profile } from "../data/profile";

export function Contact() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(id);
  }, [copied]);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  }

  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-24 border-t border-line py-16 sm:py-24">
      <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
        <div>
          <h2 id="contact-title" className="font-display text-[clamp(2.75rem,7vw,5rem)] leading-[0.95] font-extrabold tracking-tight">
            Get in touch
          </h2>
          <FallingWords
            text="Write me a message and it opens in your email app, ready to send. Or email me directly; I'm also on LinkedIn and GitHub."
            className="mt-5 max-w-xl text-lg text-muted"
          />
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href={`mailto:${profile.email}`} className="email-link font-display font-bold">
              {profile.email}
            </a>
            <button type="button" onClick={() => void copyEmail()} className="button-secondary h-10 px-4 text-sm" aria-live="polite">
              {copied ? <Check aria-hidden="true" className="size-4" /> : <Copy aria-hidden="true" className="size-4" />}
              {copied ? "Copied" : "Copy email"}
            </button>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
            {profile.links.map((link) => (
              <li key={link.href}>
                <ExternalLink href={link.href}>{link.label}</ExternalLink>
              </li>
            ))}
            <li>
              <a href={profile.cv} download className="text-link">
                <Download aria-hidden="true" className="size-4" />
                Download CV
              </a>
            </li>
          </ul>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
