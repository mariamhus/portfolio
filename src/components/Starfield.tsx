import { useEffect, useRef } from "react";
import { createAurora, createFireflies, drawAurora, drawFireflies, updateFireflies, type Firefly } from "../lib/nightEffects";
import { createParticles, currentSeason, drawParticles, updateParticles, type Particle } from "../lib/seasonParticles";

interface Star {
  x: number;
  y: number;
  depth: number;
  radius: number;
  alpha: number;
  phase: number;
  speed: number;
  color: string;
}

interface Meteor {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
}

const COLORS = ["255, 255, 255", "255, 255, 255", "200, 210, 255", "190, 180, 255", "255, 230, 210"];
const PARALLAX = 60;
const MARGIN = 60;
const AURORA_SCALE = 4;

function wrap(value: number, size: number) {
  return ((((value + MARGIN) % size) + size) % size) - MARGIN;
}

export function Starfield() {
  const spaceRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const auroraRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const space = spaceRef.current;
    const canvas = canvasRef.current;
    const auroraCanvas = auroraRef.current;
    const context = canvas?.getContext("2d");
    const auroraContext = auroraCanvas?.getContext("2d");
    if (!space || !canvas || !auroraCanvas || !context || !auroraContext) return;
    const ctx = context;
    const actx = auroraContext;
    const aurora = createAurora();
    let auroraDrawn = false;
    let fireflies: Firefly[] = [];
    const root = document.documentElement;
    const isNight = () => root.dataset.theme !== "light";
    let night = isNight() ? 1 : 0;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let stars: Star[] = [];
    let meteor: Meteor | null = null;
    let nextMeteor = performance.now() + 4000;
    let frame = 0;
    const pointer = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    const mouse = { x: -9999, y: -9999 };
    let season = currentSeason();
    let particles: Particle[] = [];
    let gust = 0;
    let lastTime = 0;

    function resize() {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas!.width = width * ratio;
      canvas!.height = height * ratio;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

      const count = Math.min(520, Math.round((width * height) / 3000));
      stars = Array.from({ length: count }, () => {
        const depth = Math.random() ** 2 * 0.9 + 0.1;
        return {
          x: Math.random() * (width + MARGIN * 2),
          y: Math.random() * (height + MARGIN * 2),
          depth,
          radius: 0.5 + depth * 1.5,
          alpha: 0.5 + depth * 0.5,
          phase: Math.random() * Math.PI * 2,
          speed: 0.6 + Math.random() * 1.8,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
        };
      });
      particles = createParticles(season, width, height);
      fireflies = season === "summer" ? createFireflies(width, height) : [];
      auroraCanvas!.width = Math.ceil(width / AURORA_SCALE);
      auroraCanvas!.height = Math.ceil(height / AURORA_SCALE);
      auroraDrawn = true;
    }

    function draw(time: number) {
      pointer.x += (target.x - pointer.x) * 0.05;
      pointer.y += (target.y - pointer.y) * 0.05;
      night = reduceMotion ? Number(isNight()) : night + (Number(isNight()) - night) * 0.04;
      space!.style.setProperty("--px", pointer.x.toFixed(3));
      space!.style.setProperty("--py", pointer.y.toFixed(3));
      const scroll = window.scrollY;
      const seconds = time / 1000;
      const step = lastTime ? Math.min((time - lastTime) / 16.67, 3) : 1;
      lastTime = time;

      ctx.clearRect(0, 0, width, height);
      if (particles.length) {
        if (!reduceMotion) {
          gust *= 0.96;
          updateParticles(season, particles, { step, wind: 0.25 + gust, mouseX: mouse.x, mouseY: mouse.y, width, height });
        }
        drawParticles(season, ctx, particles);
      }

      const auroraAlpha = season === "winter" && night > 0.01 ? night : 0;
      if (auroraAlpha || auroraDrawn) {
        try {
          drawAurora(actx, aurora, auroraCanvas!.width, auroraCanvas!.height, reduceMotion ? 0 : seconds, pointer.x * 0.8, auroraAlpha);
        } catch {
          // The aurora is decoration; keep the stars going if it fails.
        }
        auroraDrawn = auroraAlpha > 0;
      }

      if (night < 0.01) return;
      const spanX = width + MARGIN * 2;
      const spanY = height + MARGIN * 2;

      for (const star of stars) {
        const drift = reduceMotion ? 0 : seconds * 16 * star.depth;
        const x = wrap(star.x + drift - pointer.x * PARALLAX * star.depth, spanX);
        const y = wrap(star.y + drift * 0.35 - scroll * 0.12 * star.depth - pointer.y * PARALLAX * star.depth, spanY);
        const twinkle = reduceMotion ? 1 : 0.65 + 0.35 * Math.sin(seconds * star.speed + star.phase);
        const alpha = star.alpha * twinkle * night;

        if (star.depth > 0.75) {
          ctx.fillStyle = `rgba(${star.color}, ${(alpha * 0.15).toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(x, y, star.radius * 3.5, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.fillStyle = `rgba(${star.color}, ${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(x, y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      if (fireflies.length) {
        if (!reduceMotion) updateFireflies(fireflies, step, mouse.x, mouse.y, width, height);
        drawFireflies(ctx, fireflies, reduceMotion ? 1 : seconds, night);
      }

      if (!reduceMotion && night > 0.95) drawMeteor(time);
    }

    function drawMeteor(time: number) {
      if (!meteor && time > nextMeteor) {
        const angle = Math.PI * (0.15 + Math.random() * 0.15);
        const speed = 9 + Math.random() * 5;
        meteor = {
          x: Math.random() * width * 0.8 + width * 0.2,
          y: Math.random() * height * 0.4,
          vx: -Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
        };
      }
      if (!meteor) return;

      const tailX = meteor.x - meteor.vx * 9;
      const tailY = meteor.y - meteor.vy * 9;
      const gradient = ctx.createLinearGradient(meteor.x, meteor.y, tailX, tailY);
      gradient.addColorStop(0, `rgba(255, 255, 255, ${Math.max(0, meteor.life * 0.9).toFixed(3)})`);
      gradient.addColorStop(1, season === "autumn" ? "rgba(255, 160, 80, 0)" : "rgba(163, 155, 255, 0)");
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(meteor.x, meteor.y);
      ctx.lineTo(tailX, tailY);
      ctx.stroke();

      meteor.x += meteor.vx;
      meteor.y += meteor.vy;
      meteor.life -= 0.012;
      if (meteor.life <= 0 || meteor.x < -100 || meteor.y > height + 100) {
        meteor = null;
        nextMeteor = time + (season === "autumn" ? 600 + Math.random() * 2200 : season === "summer" ? 1500 + Math.random() * 3500 : 5000 + Math.random() * 9000);
      }
    }

    function loop(time: number) {
      // Schedule first so one bad frame can't stop the animation for good.
      frame = window.requestAnimationFrame(loop);
      draw(time);
    }

    function onPointerMove(event: PointerEvent) {
      if (event.pointerType !== "mouse") return;
      target.x = (event.clientX / width) * 2 - 1;
      target.y = (event.clientY / height) * 2 - 1;
      mouse.x = event.clientX;
      mouse.y = event.clientY;
      gust = Math.max(-4, Math.min(4, gust + event.movementX * 0.02));
    }

    function onPointerLeave() {
      mouse.x = -9999;
      mouse.y = -9999;
    }

    function onVisibility() {
      window.cancelAnimationFrame(frame);
      if (!document.hidden) frame = window.requestAnimationFrame(loop);
    }

    function onStaticChange() {
      draw(0);
    }

    function onStaticResize() {
      resize();
      draw(0);
    }

    const themeObserver = new MutationObserver(onStaticChange);
    const seasonObserver = new MutationObserver(() => {
      season = currentSeason();
      particles = createParticles(season, width, height);
      fireflies = season === "summer" ? createFireflies(width, height) : [];
      auroraDrawn = true;
      if (reduceMotion) draw(0);
    });
    seasonObserver.observe(root, { attributes: true, attributeFilter: ["data-season"] });

    resize();
    if (reduceMotion) {
      draw(0);
      window.addEventListener("resize", onStaticResize);
      window.addEventListener("scroll", onStaticChange, { passive: true });
      themeObserver.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    } else {
      window.addEventListener("resize", resize);
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", onPointerLeave);
      document.addEventListener("visibilitychange", onVisibility);
      frame = window.requestAnimationFrame(loop);
    }

    return () => {
      window.cancelAnimationFrame(frame);
      themeObserver.disconnect();
      seasonObserver.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("resize", onStaticResize);
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("scroll", onStaticChange);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div ref={spaceRef} aria-hidden="true" className="space">
      <div className="space-day" />
      <div className="space-cloud" />
      <div className="space-cloud" />
      <div className="space-cloud" />
      <div className="space-cloud" />
      <div className="space-cloud" />
      <canvas ref={auroraRef} className="space-aurora" />
      <canvas ref={canvasRef} />
    </div>
  );
}
