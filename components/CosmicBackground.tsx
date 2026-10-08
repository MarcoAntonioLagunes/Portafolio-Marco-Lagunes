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
const RING_RADIUS = 20;

const GOLD_NEAR = "#FBD9A5";
const GOLD_MID = "#F5B041";
const DUST_RGB = "255,200,110";

type Dust = { x: number; y: number; z: number; vy: number; size: number; opacity: number; twinkle: number };
type Bokeh = { x: number; y: number; r: number; vx: number; vy: number; opacity: number };
type Sparkle = { x: number; y: number; size: number; born: number; life: number; rotation: number };
type Shooter = { x: number; y: number; vx: number; vy: number; born: number; life: number; length: number };
type Filler = { angle: number; dist: number; size: number; alpha: number; targetAlpha: number };
type Node = { x: number; y: number; size: number; alpha: number };

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
    let ringAlpha = 0;
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
          vy: rand(4, 14) * (0.3 + z),
          size: rand(0.4, 2),
          opacity: rand(0.25, 0.85),
          twinkle: Math.random() * Math.PI * 2,
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
      ctx!.fillStyle = `rgb(${DUST_RGB})`;
      for (const d of dust) {
        ctx!.globalAlpha = d.opacity;
        ctx!.beginPath();
        ctx!.arc(d.x, d.y, d.size, 0, Math.PI * 2);
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

      const parallaxX = mouse.active ? (mouse.x - width / 2) / width : 0;
      const parallaxY = mouse.active ? (mouse.y - height / 2) / height : 0;
      for (const d of dust) {
        d.y -= d.vy * dt;
        if (d.y < -10) {
          d.y = height + 10;
          d.x = Math.random() * width;
        }
        const twinkle = 0.75 + 0.25 * Math.sin(now / 900 + d.twinkle);
        const px = d.x + parallaxX * 26 * d.z;
        const py = d.y + parallaxY * 18 * d.z;
        const alpha = d.opacity * twinkle;
        const radius = d.size * (0.7 + d.z * 0.8);
        if (d.z > 0.66) {
          const haloR = radius * 4.5;
          const halo = ctx!.createRadialGradient(px, py, 0, px, py, haloR);
          halo.addColorStop(0, `rgba(${DUST_RGB},${alpha * 0.35})`);
          halo.addColorStop(1, `rgba(${DUST_RGB},0)`);
          ctx!.globalAlpha = 1;
          ctx!.fillStyle = halo;
          ctx!.beginPath();
          ctx!.arc(px, py, haloR, 0, Math.PI * 2);
          ctx!.fill();
        }
        ctx!.globalAlpha = alpha;
        ctx!.fillStyle = `rgb(${DUST_RGB})`;
        ctx!.beginPath();
        ctx!.arc(px, py, radius, 0, Math.PI * 2);
        ctx!.fill();
      }

      if (fineHoverQuery.matches) {
        if (mouse.active) {
          smoothMouse.x += (mouse.x - smoothMouse.x) * CURSOR_LERP;
          smoothMouse.y += (mouse.y - smoothMouse.y) * CURSOR_LERP;
        }
        ringAlpha += ((mouse.active ? 1 : 0) - ringAlpha) * 0.12;

        const nodes: Node[] = [];
        for (const d of dust) {
          const dist = Math.hypot(d.x - smoothMouse.x, d.y - smoothMouse.y);
          if (dist > CONSTELLATION_RADIUS) continue;
          nodes.push({ x: d.x, y: d.y, size: d.size, alpha: 1 - dist / CONSTELLATION_RADIUS });
        }

        const needed = mouse.active ? Math.max(0, MIN_CONSTELLATION_NODES - nodes.length) : 0;
        while (fillers.length < needed) {
          fillers.push({
            angle: rand(0, Math.PI * 2),
            dist: rand(18, CONSTELLATION_RADIUS * 0.82),
            size: rand(0.8, 1.6),
            alpha: 0,
            targetAlpha: rand(0.5, 0.9),
          });
        }
        for (let i = 0; i < fillers.length; i++) {
          const f = fillers[i];
          const target = i < needed ? f.targetAlpha : 0;
          f.alpha += (target - f.alpha) * 0.08;
          f.angle += dt * 0.25;
        }
        fillers = fillers.filter((f, i) => i < needed || f.alpha > 0.01);
        for (const f of fillers) {
          nodes.push({
            x: smoothMouse.x + Math.cos(f.angle) * f.dist,
            y: smoothMouse.y + Math.sin(f.angle) * f.dist,
            size: f.size,
            alpha: f.alpha,
          });
        }

        for (let i = 0; i < nodes.length; i++) {
          const a = nodes[i];
          ctx!.globalAlpha = a.alpha * 0.9;
          ctx!.fillStyle = GOLD_NEAR;
          ctx!.beginPath();
          ctx!.arc(a.x, a.y, a.size + 1.2, 0, Math.PI * 2);
          ctx!.fill();
          for (let j = i + 1; j < nodes.length; j++) {
            const b = nodes[j];
            const dist = Math.hypot(a.x - b.x, a.y - b.y);
            if (dist > LINK_DISTANCE) continue;
            ctx!.globalAlpha = (1 - dist / LINK_DISTANCE) * 0.6 * Math.min(a.alpha, b.alpha);
            ctx!.strokeStyle = GOLD_MID;
            ctx!.lineWidth = 1;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.stroke();
          }
        }

        if (ringAlpha > 0.01) {
          ctx!.globalAlpha = ringAlpha * 0.5;
          ctx!.strokeStyle = GOLD_MID;
          ctx!.lineWidth = 1;
          ctx!.beginPath();
          ctx!.arc(smoothMouse.x, smoothMouse.y, RING_RADIUS, 0, Math.PI * 2);
          ctx!.stroke();
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
