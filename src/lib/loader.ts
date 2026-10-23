const MINIMUM_MS = 1400;
const MAXIMUM_MS = 4000;
const FADE_MS = 700;

// Hides the loading screen from index.html once the page and fonts are ready.
// It stays up for at least MINIMUM_MS so the intro can play, and never longer than MAXIMUM_MS.
export function finishLoading() {
  const root = document.documentElement;
  if (root.dataset.loading !== "") return;

  const loaded = document.readyState === "complete" ? Promise.resolve() : new Promise((resolve) => window.addEventListener("load", resolve, { once: true }));
  const fonts = document.fonts ? document.fonts.ready : Promise.resolve();
  const minimum = new Promise((resolve) => window.setTimeout(resolve, Math.max(0, MINIMUM_MS - performance.now())));
  const maximum = new Promise((resolve) => window.setTimeout(resolve, MAXIMUM_MS));

  Promise.race([Promise.all([loaded, fonts, minimum]), maximum]).then(() => {
    root.dataset.loading = "done";
    try {
      window.sessionStorage.setItem("portfolio:loaded", "1");
    } catch {
      // Without storage the loader simply shows again on the next page.
    }
    window.setTimeout(() => delete root.dataset.loading, FADE_MS);
  });
}
