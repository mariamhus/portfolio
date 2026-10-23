export type Season = "spring" | "summer" | "autumn" | "winter";

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  angle: number;
  spin: number;
  phase: number;
  depth: number;
  color: string;
}

interface Kind {
  density: number;
  max: number;
  size: [number, number];
  fall: number;
  sway: number;
  colors: string[];
}

const KINDS: Partial<Record<Season, Kind>> = {
  spring: { density: 26000, max: 55, size: [6, 11], fall: 0.7, sway: 0.9, colors: ["#f9a8d4", "#fbcfe8", "#f472b6", "#fde4ee", "#fecdd3"] },
  autumn: { density: 32000, max: 40, size: [10, 18], fall: 1, sway: 1.2, colors: ["#c2410c", "#ea580c", "#d97706", "#b45309", "#9a3412", "#eab308"] },
  winter: { density: 9000, max: 160, size: [1.2, 3.6], fall: 0.8, sway: 0.5, colors: ["#ffffff"] },
};

const REPEL_RADIUS = 130;

function random(min: number, max: number) {
  return min + Math.random() * (max - min);
}

const SEASON_BY_MONTH: Season[] = ["winter", "winter", "spring", "spring", "spring", "summer", "summer", "summer", "autumn", "autumn", "autumn", "winter"];

export function seasonForDate(date: Date): Season {
  return SEASON_BY_MONTH[date.getMonth()];
}

export function currentSeason(): Season {
  const season = document.documentElement.dataset.season;
  return season === "spring" || season === "autumn" || season === "winter" ? season : "summer";
}

export function createParticles(season: Season, width: number, height: number): Particle[] {
  const kind = KINDS[season];
  if (!kind) return [];
  const count = Math.min(kind.max, Math.round((width * height) / kind.density));
  return Array.from({ length: count }, () => {
    const depth = random(0.5, 1);
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      vx: 0,
      vy: kind.fall * depth,
      size: random(kind.size[0], kind.size[1]) * depth,
      angle: Math.random() * Math.PI * 2,
      spin: random(-0.03, 0.03),
      phase: Math.random() * Math.PI * 2,
      depth,
      color: kind.colors[Math.floor(Math.random() * kind.colors.length)],
    };
  });
}

interface Forces {
  step: number;
  wind: number;
  mouseX: number;
  mouseY: number;
  width: number;
  height: number;
}

export function updateParticles(season: Season, particles: Particle[], forces: Forces) {
  const kind = KINDS[season];
  if (!kind) return;
  const { step, wind, mouseX, mouseY, width, height } = forces;

  for (const p of particles) {
    p.phase += 0.02 * step;
    p.angle += p.spin * step;

    const dx = p.x - mouseX;
    const dy = p.y - mouseY;
    const distance = Math.hypot(dx, dy);
    if (distance > 0 && distance < REPEL_RADIUS) {
      const push = (1 - distance / REPEL_RADIUS) * 0.9;
      p.vx += (dx / distance) * push;
      p.vy += (dy / distance) * push;
      p.spin += (Math.random() - 0.5) * 0.01;
    }

    p.vx += (wind * p.depth - p.vx) * 0.03 * step;
    p.vy += (kind.fall * p.depth - p.vy) * 0.03 * step;
    p.spin *= 0.995;

    p.x += (p.vx + Math.sin(p.phase) * kind.sway * p.depth) * step;
    p.y += p.vy * step;

    if (p.y > height + 20) {
      p.y = -20;
      p.x = Math.random() * width;
    } else if (p.y < -40) {
      p.y = height + 10;
    }
    if (p.x > width + 30) p.x = -30;
    else if (p.x < -30) p.x = width + 30;
  }
}

export function drawParticles(season: Season, ctx: CanvasRenderingContext2D, particles: Particle[]) {
  for (const p of particles) {
    if (season === "winter") {
      ctx.fillStyle = "rgba(120, 150, 190, 0.35)";
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size + 0.8, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      continue;
    }

    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.angle);
    ctx.scale(1, 0.35 + Math.abs(Math.cos(p.phase * 1.3)) * 0.65);
    ctx.fillStyle = p.color;
    ctx.beginPath();
    if (season === "spring") {
      ctx.moveTo(-p.size, 0);
      ctx.bezierCurveTo(-p.size * 0.4, -p.size * 0.9, p.size * 0.7, -p.size * 0.7, p.size, -p.size * 0.15);
      ctx.lineTo(p.size * 0.75, 0);
      ctx.lineTo(p.size, p.size * 0.15);
      ctx.bezierCurveTo(p.size * 0.7, p.size * 0.7, -p.size * 0.4, p.size * 0.9, -p.size, 0);
      ctx.globalAlpha *= 0.9;
      ctx.fill();
    } else {
      ctx.moveTo(-p.size, 0);
      ctx.quadraticCurveTo(0, -p.size * 0.65, p.size, 0);
      ctx.quadraticCurveTo(0, p.size * 0.65, -p.size, 0);
      ctx.fill();
      ctx.strokeStyle = "rgba(90, 40, 10, 0.45)";
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(-p.size * 1.25, 0);
      ctx.lineTo(p.size * 0.8, 0);
      ctx.stroke();
    }
    ctx.restore();
  }
}
