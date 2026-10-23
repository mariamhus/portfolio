import {
  siChartdotjs,
  siGit,
  siHtml5,
  siI18next,
  siJavascript,
  siMongodb,
  siNodedotjs,
  siPostman,
  siReact,
  siReactquery,
  siRedux,
  siSass,
  siTailwindcss,
  siTypescript,
  siVite,
  siVitest,
  siZod,
  type SimpleIcon,
} from "simple-icons";

const MINIMUM_MS = 2600;
const MAXIMUM_MS = 5000;
const FADE_MS = 700;

// Brand-colored logos only; the black ones would vanish on the night sky.
const ICONS: SimpleIcon[] = [siReact, siTypescript, siJavascript, siRedux, siReactquery, siTailwindcss, siSass, siHtml5, siVite, siVitest, siNodedotjs, siMongodb, siGit, siPostman, siChartdotjs, siI18next, siZod];

// Skill logos that burst out from behind the name and fly off in every direction, in two waves.
function addFlyingIcons(loader: HTMLElement) {
  const layer = document.createElement("div");
  layer.className = "loader-icons";
  layer.setAttribute("aria-hidden", "true");
  const total = ICONS.length * 2;
  for (let i = 0; i < total; i++) {
    const icon = ICONS[i % ICONS.length];
    const angle = (i / ICONS.length) * Math.PI * 2 + (i >= ICONS.length ? Math.PI / ICONS.length : 0);
    const distance = 38 + (i % 3) * 9;
    const item = document.createElement("span");
    item.className = "loader-icon";
    item.style.setProperty("--dx", `${Math.cos(angle) * distance}vmax`);
    item.style.setProperty("--dy", `${Math.sin(angle) * distance}vmax`);
    item.style.setProperty("--spin", `${(i % 2 ? 1 : -1) * (90 + (i % 4) * 45)}deg`);
    item.style.setProperty("--delay", `${(i % ICONS.length) * 70 + (i >= ICONS.length ? 1000 : 150)}ms`);
    item.style.color = `#${icon.hex}`;
    item.innerHTML = `<svg viewBox="0 0 24 24"><path fill="currentColor" d="${icon.path}"/></svg>`;
    layer.appendChild(item);
  }
  loader.prepend(layer);
}

// Hides the loading screen from index.html once the page and fonts are ready.
// It stays up for at least MINIMUM_MS so the intro can play, and never longer than MAXIMUM_MS.
export function finishLoading() {
  const root = document.documentElement;
  if (root.dataset.loading !== "") return;
  const loader = document.getElementById("loader");
  if (loader) addFlyingIcons(loader);

  const loaded = document.readyState === "complete" ? Promise.resolve() : new Promise((resolve) => window.addEventListener("load", resolve, { once: true }));
  const fonts = document.fonts ? document.fonts.ready : Promise.resolve();
  const minimum = new Promise((resolve) => window.setTimeout(resolve, Math.max(0, MINIMUM_MS - performance.now())));
  const maximum = new Promise((resolve) => window.setTimeout(resolve, MAXIMUM_MS));

  Promise.race([Promise.all([loaded, fonts, minimum]), maximum]).then(() => {
    root.dataset.loading = "done";
    window.setTimeout(() => delete root.dataset.loading, FADE_MS);
  });
}
