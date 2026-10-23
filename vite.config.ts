import { resolve } from "node:path";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Social sites need absolute URLs for og:image. Set SITE_URL to the deployed address,
// or let Vercel's production domain fill it in.
const siteUrl = (
  process.env.SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "")
).replace(/\/$/, "");

function siteUrlPlugin(): Plugin {
  return {
    name: "site-url",
    transformIndexHtml: (html) => html.replaceAll("%SITE_URL%", siteUrl),
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), siteUrlPlugin()],
  build: {
    // Four pages: the home page, /about/, /projects/, and /contact/.
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, "index.html"),
        projects: resolve(import.meta.dirname, "projects/index.html"),
        contact: resolve(import.meta.dirname, "contact/index.html"),
        about: resolve(import.meta.dirname, "about/index.html"),
      },
    },
  },
});
