"use client";

import { useEffect, useRef } from "react";

type Particle = { x: number; y: number; velocityX: number; velocityY: number; radius: number };
type ParticleBackgroundProps = { density?: "low" | "medium"; className?: string };
const PARTICLE_COLOR = "124, 111, 224";

export function ParticleBackground({ density = "low", className = "" }: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reducedMotion = reducedMotionQuery.matches;
    let visible = false;
    let frameId: number | null = null;
    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    const maxDistance = density === "medium" ? 132 : 112;
    const densityDivisor = density === "medium" ? 20000 : 36000;
    const maxParticles = density === "medium" ? 42 : 25;

    const draw = () => {
      context.clearRect(0, 0, width, height);
      particles.forEach((particle, index) => {
        if (!reducedMotion) {
          particle.x += particle.velocityX;
          particle.y += particle.velocityY;
          if (particle.x < -8 || particle.x > width + 8) particle.velocityX *= -1;
          if (particle.y < -8 || particle.y > height + 8) particle.velocityY *= -1;
        }
        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(${PARTICLE_COLOR}, 0.3)`;
        context.fill();
        for (let comparison = index + 1; comparison < particles.length; comparison += 1) {
          const other = particles[comparison];
          const distance = Math.hypot(particle.x - other.x, particle.y - other.y);
          if (distance >= maxDistance) continue;
          context.beginPath();
          context.moveTo(particle.x, particle.y);
          context.lineTo(other.x, other.y);
          context.strokeStyle = `rgba(${PARTICLE_COLOR}, ${(1 - distance / maxDistance) * 0.09})`;
          context.lineWidth = 0.6;
          context.stroke();
        }
      });
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      const mobile = width < 640;
      const count = Math.min(mobile ? Math.ceil(maxParticles * 0.5) : maxParticles, Math.max(mobile ? 8 : 12, Math.floor((width * height) / densityDivisor)));
      particles = Array.from({ length: count }, () => ({ x: Math.random() * width, y: Math.random() * height, velocityX: (Math.random() - 0.5) * 0.1, velocityY: (Math.random() - 0.5) * 0.08, radius: Math.random() * 0.85 + 0.4 }));
      draw();
    };
    const stop = () => { if (frameId !== null) window.cancelAnimationFrame(frameId); frameId = null; };
    const animate = () => { if (!visible || reducedMotion) { frameId = null; return; } draw(); frameId = window.requestAnimationFrame(animate); };
    const start = () => { stop(); if (visible && !reducedMotion) frameId = window.requestAnimationFrame(animate); };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible) start(); else stop(); }, { rootMargin: "100px" });
    const resizeObserver = new ResizeObserver(resize);
    const handleReducedMotion = (event: MediaQueryListEvent) => { reducedMotion = event.matches; draw(); if (reducedMotion) stop(); else start(); };

    resize();
    observer.observe(canvas);
    resizeObserver.observe(canvas);
    reducedMotionQuery.addEventListener("change", handleReducedMotion);
    return () => { stop(); observer.disconnect(); resizeObserver.disconnect(); reducedMotionQuery.removeEventListener("change", handleReducedMotion); };
  }, [density]);

  return <canvas ref={canvasRef} aria-hidden="true" className={`pointer-events-none absolute inset-0 z-0 h-full w-full ${className}`} />;
}
