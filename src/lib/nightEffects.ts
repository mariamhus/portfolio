export interface Firefly {
  x: number;
  y: number;
  vx: number;
  vy: number;
  phase: number;
  speed: number;
  size: number;
}

const FIREFLY_REACH = 240;

export function createFireflies(width: number, height: number): Firefly[] {
  const count = Math.min(45, Math.round((width * height) / 28000));
  return Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: height * 0.25 + Math.random() * height * 0.75,
    vx: 0,
    vy: 0,
    phase: Math.random() * Math.PI * 2,
    speed: 0.8 + Math.random() * 1.6,
    size: 1.2 + Math.random() * 1.4,
  }));
}

export function updateFireflies(fireflies: Firefly[], step: number, mouseX: number, mouseY: number, width: number, height: number) {
  for (const f of fireflies) {
    f.vx += (Math.random() - 0.5) * 0.12 * step;
    f.vy += (Math.random() - 0.5) * 0.12 * step;

    const dx = mouseX - f.x;
    const dy = mouseY - f.y;
    const distance = Math.hypot(dx, dy);
    if (distance > 30 && distance < FIREFLY_REACH) {
      f.vx += (dx / distance) * 0.035 * step;
      f.vy += (dy / distance) * 0.035 * step;
    }

    f.vx *= 0.97;
    f.vy *= 0.97;
    const speed = Math.hypot(f.vx, f.vy);
    if (speed > 1.4) {
      f.vx = (f.vx / speed) * 1.4;
      f.vy = (f.vy / speed) * 1.4;
    }
    f.x += f.vx * step;
    f.y += f.vy * step;

    if (f.x < -20) f.x = width + 20;
    else if (f.x > width + 20) f.x = -20;
    if (f.y < -20) f.y = height + 20;
    else if (f.y > height + 20) f.y = -20;
  }
}

export function drawFireflies(ctx: CanvasRenderingContext2D, fireflies: Firefly[], seconds: number, alpha: number) {
  for (const f of fireflies) {
    const pulse = Math.max(0, Math.sin(seconds * f.speed + f.phase)) ** 2;
    const glow = (0.15 + pulse * 0.85) * alpha;
    const radius = f.size * 7;
    const halo = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, radius);
    halo.addColorStop(0, `rgba(220, 255, 140, ${(glow * 0.45).toFixed(3)})`);
    halo.addColorStop(1, "rgba(180, 255, 100, 0)");
    ctx.fillStyle = halo;
    ctx.beginPath();
    ctx.arc(f.x, f.y, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = `rgba(245, 255, 200, ${glow.toFixed(3)})`;
    ctx.beginPath();
    ctx.arc(f.x, f.y, f.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

interface AuroraBand {
  base: number;
  height: number;
  amp: number;
  freq: number;
  speed: number;
  phase: number;
  alpha: number;
  strip: HTMLCanvasElement;
}

function makeStrip(stops: [number, string][]) {
  const strip = document.createElement("canvas");
  strip.width = 1;
  strip.height = 256;
  const context = strip.getContext("2d");
  if (context) {
    const gradient = context.createLinearGradient(0, 0, 0, 256);
    for (const [offset, color] of stops) gradient.addColorStop(offset, color);
    context.fillStyle = gradient;
    context.fillRect(0, 0, 1, 256);
  }
  return strip;
}

export function createAurora(): AuroraBand[] {
  const green = makeStrip([
    [0, "rgba(140, 90, 255, 0)"],
    [0.2, "rgba(130, 100, 255, 0.45)"],
    [0.5, "rgba(70, 255, 180, 0.9)"],
    [1, "rgba(40, 220, 160, 0)"],
  ]);
  const teal = makeStrip([
    [0, "rgba(255, 90, 200, 0)"],
    [0.25, "rgba(200, 110, 255, 0.4)"],
    [0.6, "rgba(60, 220, 255, 0.75)"],
    [1, "rgba(60, 220, 255, 0)"],
  ]);
  return [
    { base: 0.06, height: 0.42, amp: 0.07, freq: 2.2, speed: 0.22, phase: 0, alpha: 0.75, strip: green },
    { base: 0.16, height: 0.32, amp: 0.05, freq: 3.4, speed: -0.16, phase: 2, alpha: 0.5, strip: teal },
    { base: 0.02, height: 0.3, amp: 0.04, freq: 5.1, speed: 0.3, phase: 4, alpha: 0.35, strip: green },
  ];
}

export function drawAurora(ctx: CanvasRenderingContext2D, bands: AuroraBand[], width: number, height: number, seconds: number, sway: number, alpha: number) {
  ctx.clearRect(0, 0, width, height);
  if (alpha <= 0) return;
  ctx.globalCompositeOperation = "lighter";
  for (const band of bands) {
    for (let x = 0; x < width; x += 1) {
      const u = x / width;
      const wave =
        Math.sin(u * band.freq * Math.PI * 2 + seconds * band.speed + band.phase + sway) * band.amp +
        Math.sin(u * band.freq * 5.3 - seconds * band.speed * 1.6) * band.amp * 0.35;
      const curtain = 0.45 + 0.55 * Math.sin(u * 40 + seconds * 1.1 + band.phase) ** 2;
      const edge = Math.min(1, u / 0.12, (1 - u) / 0.12);
      ctx.globalAlpha = alpha * band.alpha * curtain * edge;
      ctx.drawImage(band.strip, x, (band.base + wave) * height, 1, band.height * height);
    }
  }
  ctx.globalAlpha = 1;
  ctx.globalCompositeOperation = "source-over";
}
