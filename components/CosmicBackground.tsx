"use client";

import { useEffect, useRef } from "react";

const DESKTOP_DUST = 170;
const MOBILE_DUST = 60;
const BOKEH_COUNT = 14;
const MAX_SPARKLES = 7;
const MOBILE_BREAKPOINT = 640;
const CONSTELLATION_RADIUS = 160;
const LINK_DISTANCE = 85;
const CURSOR_LERP = 0.12;
const MIN_CONSTELLATION_NODES = 8;
const RING_RADIUS = 12;

const GOLD_MID = "#F5B041";
const DUST_RGB = "255,200,110";
const LINK_RGB = "245,176,65";

type Dust = { x: number; y: number; z: number; vy: number; r: number; a: number };
type Bokeh = { x: number; y: number; r: number; vx: number; vy: number; opacity: number };
type Sparkle = { x: number; y: number; size: number; born: number; life: number; rotation: number };
type Shooter = { x: number; y: number; vx: number; vy: number; born: number; life: number; length: number };
type Filler = { angle: number; dist: number; speed: number; life: number; dying: boolean };
type LinkNode = { x: number; y: number; life: number };

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function drawFourPointStar(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, alpha: number, rotation: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);
  ctx.globalAlpha = alpha;
  const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, size);
  grad.addColorStop(0, "rgba(255,236,205,1)");
  grad.addColorStop(1, "rgba(245,176,65,0)");
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.moveTo(0, -size);
  ctx.quadraticCurveTo(size * 0.12, -size * 0.12, size, 0);
  ctx.quadraticCurveTo(size * 0.12, size * 0.12, 0, size);
  ctx.quadraticCurveTo(-size * 0.12, size * 0.12, -size, 0);
  ctx.quadraticCurveTo(-size * 0.12, -size * 0.12, 0, -size);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

/**
 * Fondo "Cósmico" global, fijo detrás de todo el contenido: polvo de oro en profundidad, bokeh,
 * destellos, estrellas fugaces y constelaciones cerca del cursor (solo con mouse fino). El haz
 * diagonal y los resplandores de esquina son capas CSS (más baratas); el resto se dibuja en canvas.
 * Se pausa con la pestaña oculta, usa menos partículas en mobile y respeta prefers-reduced-motion
 * (un solo frame estático, sin interacción de cursor).
 */
export function CosmicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktopQuery = window.matchMedia(`(min-width: ${MOBILE_BREAKPOINT}px)`);
    const fineHoverQuery = window.matchMedia("(hover: hover) and (pointer: fine)");

    let width = 0;
    let height = 0;
    let dust: Dust[] = [];
    let bokeh: Bokeh[] = [];
    let sparkles: Sparkle[] = [];
    let shooters: Shooter[] = [];
    const mouse = { x: -9999, y: -9999, active: false };
    const smoothMouse = { x: -9999, y: -9999 };
    let fillers: Filler[] = [];
    let frame: number | null = null;
    let lastTime = 0;
    let nextShooterAt = 0;
    let visible = true;
    let resizeTimeout: ReturnType<typeof setTimeout> | undefined;

    const reduced = () => reducedMotionQuery.matches;

    function initParticles() {
      const count = desktopQuery.matches ? DESKTOP_DUST : MOBILE_DUST;
      dust = Array.from({ length: count }, () => {
        const z = Math.random();
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          z,
          vy: -(0.05 + z * 0.35),
          r: 0.4 + z * 1.6,
          a: 0.25 + z * 0.6,
        };
      });
      bokeh = Array.from({ length: BOKEH_COUNT }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: rand(60, 160),
        vx: rand(-3, 3),
        vy: rand(-4, -1),
        opacity: rand(0.035, 0.09),
      }));
    }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas!.clientWidth;
      height = canvas!.clientHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      initParticles();
    }

    function spawnSparkle() {
      if (sparkles.length >= MAX_SPARKLES) return;
      sparkles.push({
        x: Math.random() * width,
        y: Math.random() * height * 0.9,
        size: rand(6, 14),
        born: performance.now(),
        life: rand(1600, 2800),
        rotation: rand(0, Math.PI),
      });
    }

    function spawnShooter() {
      shooters.push({
        x: rand(width * 0.1, width * 0.8),
        y: rand(0, height * 0.3),
        vx: rand(340, 520),
        vy: rand(140, 220),
        born: performance.now(),
        life: rand(700, 1100),
        length: rand(90, 160),
      });
    }

    function drawBokeh() {
      ctx!.save();
      ctx!.filter = "blur(18px)";
      for (const b of bokeh) {
        ctx!.globalAlpha = b.opacity;
        ctx!.fillStyle = GOLD_MID;
        ctx!.beginPath();
        ctx!.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx!.fill();
      }
      ctx!.restore();
    }

    function drawStatic() {
      ctx!.clearRect(0, 0, width, height);
      drawBokeh();
      for (const d of dust) {
        ctx!.globalAlpha = 1;
        ctx!.fillStyle = `rgba(${DUST_RGB},${d.a})`;
        ctx!.beginPath();
        ctx!.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx!.fill();
      }
      ctx!.globalAlpha = 1;
    }

    function tick(now: number) {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      ctx!.clearRect(0, 0, width, height);

      drawBokeh();
      for (const b of bokeh) {
        b.x += b.vx * dt;
        b.y += b.vy * dt;
        if (b.y < -b.r) {
          b.y = height + b.r;
          b.x = Math.random() * width;
        }
        if (b.x < -b.r) b.x = width + b.r;
        if (b.x > width + b.r) b.x = -b.r;
      }

      const active = fineHoverQuery.matches && mouse.active;
      if (active) {
        smoothMouse.x += (mouse.x - smoothMouse.x) * CURSOR_LERP;
        smoothMouse.y += (mouse.y - smoothMouse.y) * CURSOR_LERP;
      }

      const near: LinkNode[] = [];
      for (const d of dust) {
        d.y += d.vy * dt * 60;
        if (d.y < -10) {
          d.y = height + 10;
          d.x = Math.random() * width;
        }
        let r = d.r;
        let a = d.a;
        const dist = Math.hypot(d.x - smoothMouse.x, d.y - smoothMouse.y);
        const isNear = active && dist < CONSTELLATION_RADIUS;
        if (isNear) {
          const k = 1 - dist / CONSTELLATION_RADIUS;
          r += 1.2 * k;
          a = Math.min(1, a + k * 0.6);
          near.push({ x: d.x, y: d.y, life: 1 });
        }
        if (d.z > 0.66) {
          const haloR = r * 4;
          const halo = ctx!.createRadialGradient(d.x, d.y, 0, d.x, d.y, haloR);
          halo.addColorStop(0, `rgba(${DUST_RGB},${a * 0.25})`);
          halo.addColorStop(1, `rgba(${DUST_RGB},0)`);
          ctx!.globalAlpha = 1;
          ctx!.fillStyle = halo;
          ctx!.beginPath();
          ctx!.arc(d.x, d.y, haloR, 0, Math.PI * 2);
          ctx!.fill();
        }
        ctx!.globalAlpha = 1;
        ctx!.fillStyle = `rgba(${DUST_RGB},${a})`;
        ctx!.beginPath();
        ctx!.arc(d.x, d.y, r, 0, Math.PI * 2);
        ctx!.fill();
      }

      if (fineHoverQuery.matches) {
        const need = active ? Math.max(0, MIN_CONSTELLATION_NODES - near.length) : 0;
        const alive = fillers.filter((f) => !f.dying).length;
        for (let i = 0; i < need - alive; i++) {
          fillers.push({ angle: rand(0, Math.PI * 2), dist: rand(40, 140), speed: (Math.random() < 0.5 ? -1 : 1) * 0.012, life: 0, dying: false });
        }
        if (alive > need) {
          let toRetire = alive - need;
          for (const f of fillers) {
            if (toRetire <= 0) break;
            if (!f.dying) {
              f.dying = true;
              toRetire--;
            }
          }
        }
        for (const f of fillers) {
          f.angle += f.speed * dt * 60;
          f.life += (f.dying ? -0.03 : 0.04) * dt * 60;
          f.life = Math.max(0, Math.min(1, f.life));
        }
        fillers = fillers.filter((f) => !f.dying || f.life > 0);
        for (const f of fillers) {
          const x = smoothMouse.x + Math.cos(f.angle) * f.dist;
          const y = smoothMouse.y + Math.sin(f.angle) * f.dist;
          ctx!.globalAlpha = 1;
          ctx!.fillStyle = `rgba(${DUST_RGB},${f.life})`;
          ctx!.beginPath();
          ctx!.arc(x, y, 1.4, 0, Math.PI * 2);
          ctx!.fill();
          near.push({ x, y, life: f.life });
        }

        for (let i = 0; i < near.length; i++) {
          const a = near[i];
          for (let j = i + 1; j < near.length; j++) {
            const b = near[j];
            const dist = Math.hypot(a.x - b.x, a.y - b.y);
            if (dist > LINK_DISTANCE) continue;
            ctx!.globalAlpha = 1;
            ctx!.strokeStyle = `rgba(${LINK_RGB},${(1 - dist / LINK_DISTANCE) * 0.6 * Math.min(a.life, b.life)})`;
            ctx!.lineWidth = 1;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.stroke();
          }
        }

        if (active) {
          ctx!.globalAlpha = 1;
          ctx!.strokeStyle = `rgba(${LINK_RGB},0.7)`;
          ctx!.lineWidth = 1;
          ctx!.beginPath();
          ctx!.arc(smoothMouse.x, smoothMouse.y, RING_RADIUS, 0, Math.PI * 2);
          ctx!.stroke();

          ctx!.fillStyle = GOLD_MID;
          ctx!.beginPath();
          ctx!.arc(mouse.x, mouse.y, 2.5, 0, Math.PI * 2);
          ctx!.fill();
        }
      }

      if (Math.random() < 0.012) spawnSparkle();
      sparkles = sparkles.filter((s) => now - s.born < s.life);
      for (const s of sparkles) {
        const t = (now - s.born) / s.life;
        const alpha = t < 0.5 ? t * 2 : (1 - t) * 2;
        drawFourPointStar(ctx!, s.x, s.y, s.size, alpha * 0.85, s.rotation);
      }

      if (now > nextShooterAt && shooters.length < 2) {
        spawnShooter();
        nextShooterAt = now + rand(4000, 9000);
      }
      shooters = shooters.filter((s) => now - s.born < s.life);
      for (const s of shooters) {
        const t = (now - s.born) / s.life;
        const elapsedS = (t * s.life) / 1000;
        const x = s.x + s.vx * elapsedS;
        const y = s.y + s.vy * elapsedS;
        const alpha = t < 0.15 ? t / 0.15 : 1 - (t - 0.15) / 0.85;
        const angle = Math.atan2(s.vy, s.vx);
        const tailX = x - Math.cos(angle) * s.length;
        const tailY = y - Math.sin(angle) * s.length;
        const grad = ctx!.createLinearGradient(tailX, tailY, x, y);
        grad.addColorStop(0, "rgba(245,176,65,0)");
        grad.addColorStop(1, `rgba(255,236,196,${alpha})`);
        ctx!.globalAlpha = 1;
        ctx!.strokeStyle = grad;
        ctx!.lineWidth = 1.6;
        ctx!.beginPath();
        ctx!.moveTo(tailX, tailY);
        ctx!.lineTo(x, y);
        ctx!.stroke();
      }
      ctx!.globalAlpha = 1;

      frame = requestAnimationFrame(tick);
    }

    function cancelAnim() {
      if (frame !== null) cancelAnimationFrame(frame);
      frame = null;
    }

    function start() {
      cancelAnim();
      if (!visible) return;
      if (reduced()) {
        drawStatic();
        return;
      }
      lastTime = performance.now();
      nextShooterAt = lastTime + rand(2000, 6000);
      frame = requestAnimationFrame(tick);
    }

    function handleResize() {
      if (resizeTimeout) clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        resize();
        if (reduced()) drawStatic();
      }, 150);
    }

    function handleMouseMove(e: MouseEvent) {
      if (!mouse.active) {
        smoothMouse.x = e.clientX;
        smoothMouse.y = e.clientY;
      }
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    }
    function handleMouseLeave() {
      mouse.active = false;
    }
    function handleVisibility() {
      visible = document.visibilityState === "visible";
      if (visible) start();
      else cancelAnim();
    }
    function handlePreferenceChange() {
      start();
    }

    resize();
    start();

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("visibilitychange", handleVisibility);
    reducedMotionQuery.addEventListener("change", handlePreferenceChange);
    desktopQuery.addEventListener("change", handleResize);

    return () => {
      cancelAnim();
      if (resizeTimeout) clearTimeout(resizeTimeout);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("visibilitychange", handleVisibility);
      reducedMotionQuery.removeEventListener("change", handlePreferenceChange);
      desktopQuery.removeEventListener("change", handleResize);
    };
  }, []);

  return (
    <div aria-hidden="true" className="cosmic-bg print:hidden">
      <div className="cosmic-glow-tr" />
      <div className="cosmic-glow-bl" />
      <div className="cosmic-beam" />
      <canvas ref={canvasRef} className="cosmic-canvas" />
    </div>
  );
}
