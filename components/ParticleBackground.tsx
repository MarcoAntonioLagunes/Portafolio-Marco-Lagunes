"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
  radius: number;
};

const PARTICLE_COLOR = "96, 165, 250";
const MAX_CONNECTION_DISTANCE = 125;

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const glow = glowRef.current;

    if (!canvas || !glow) {
      return;
    }

    const context = canvas.getContext("2d");

    if (!context) {
      return;
    }

    /*
     * Estas referencias ya están comprobadas y nunca serán null
     * durante la ejecución de este efecto.
     */
    const canvasElement: HTMLCanvasElement = canvas;
    const glowElement: HTMLDivElement = glow;
    const ctx: CanvasRenderingContext2D = context;

    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const finePointerQuery = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    );

    let reducedMotion = reducedMotionQuery.matches;
    let hasFinePointer = finePointerQuery.matches;
    let isVisible = !document.hidden;
    let animationFrameId: number | null = null;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let particles: Particle[] = [];

    const targetPointer = {
      x: width * 0.7,
      y: height * 0.3,
    };

    const currentPointer = {
      x: targetPointer.x,
      y: targetPointer.y,
    };

    function getParticleCount(): number {
      const area = width * height;
      const calculatedCount = Math.floor(area / 26000);

      return Math.min(70, Math.max(24, calculatedCount));
    }

    function createParticles(): void {
      particles = Array.from(
        { length: getParticleCount() },
        (): Particle => ({
          x: Math.random() * width,
          y: Math.random() * height,
          velocityX: (Math.random() - 0.5) * 0.08,
          velocityY: (Math.random() - 0.5) * 0.08,
          radius: Math.random() * 1.1 + 0.45,
        })
      );
    }

    function resizeCanvas(): void {
      width = window.innerWidth;
      height = window.innerHeight;

      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.75);

      canvasElement.width = Math.floor(width * pixelRatio);
      canvasElement.height = Math.floor(height * pixelRatio);
      canvasElement.style.width = `${width}px`;
      canvasElement.style.height = `${height}px`;

      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      targetPointer.x = Math.min(targetPointer.x, width);
      targetPointer.y = Math.min(targetPointer.y, height);
      currentPointer.x = Math.min(currentPointer.x, width);
      currentPointer.y = Math.min(currentPointer.y, height);

      createParticles();
      drawParticles();
    }

    function updateParticle(particle: Particle): void {
      if (reducedMotion) {
        return;
      }

      particle.x += particle.velocityX;
      particle.y += particle.velocityY;

      if (particle.x < -10) {
        particle.x = width + 10;
      } else if (particle.x > width + 10) {
        particle.x = -10;
      }

      if (particle.y < -10) {
        particle.y = height + 10;
      } else if (particle.y > height + 10) {
        particle.y = -10;
      }
    }

    function drawParticle(particle: Particle): void {
      ctx.beginPath();
      ctx.arc(
        particle.x,
        particle.y,
        particle.radius,
        0,
        Math.PI * 2
      );

      ctx.fillStyle = `rgba(${PARTICLE_COLOR}, 0.28)`;
      ctx.fill();
    }

    function drawConnections(
      particle: Particle,
      particleIndex: number
    ): void {
      const remainingParticles = particles.slice(particleIndex + 1);

      for (const comparisonParticle of remainingParticles) {
        const distanceX = particle.x - comparisonParticle.x;
        const distanceY = particle.y - comparisonParticle.y;
        const distance = Math.hypot(distanceX, distanceY);

        if (distance >= MAX_CONNECTION_DISTANCE) {
          continue;
        }

        const opacity =
          (1 - distance / MAX_CONNECTION_DISTANCE) * 0.085;

        ctx.beginPath();
        ctx.moveTo(particle.x, particle.y);
        ctx.lineTo(
          comparisonParticle.x,
          comparisonParticle.y
        );

        ctx.strokeStyle = `rgba(${PARTICLE_COLOR}, ${opacity})`;
        ctx.lineWidth = 0.7;
        ctx.stroke();
      }
    }

    function drawParticles(): void {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((particle, particleIndex) => {
        updateParticle(particle);
        drawParticle(particle);
        drawConnections(particle, particleIndex);
      });
    }

    function updateGlow(): void {
      if (!hasFinePointer || reducedMotion) {
        return;
      }

      currentPointer.x +=
        (targetPointer.x - currentPointer.x) * 0.075;

      currentPointer.y +=
        (targetPointer.y - currentPointer.y) * 0.075;

      glowElement.style.transform = [
        `translate3d(${currentPointer.x}px, ${currentPointer.y}px, 0)`,
        "translate3d(-50%, -50%, 0)",
      ].join(" ");
    }

    function stopAnimation(): void {
      if (animationFrameId === null) {
        return;
      }

      window.cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }

    function animate(): void {
      if (!isVisible) {
        animationFrameId = null;
        return;
      }

      drawParticles();
      updateGlow();

      animationFrameId = window.requestAnimationFrame(animate);
    }

    function startAnimation(): void {
      stopAnimation();

      if (!isVisible) {
        return;
      }

      animationFrameId = window.requestAnimationFrame(animate);
    }

    function updateGlowVisibility(): void {
      glowElement.style.opacity =
        hasFinePointer && !reducedMotion ? "1" : "0";
    }

    function handlePointerMove(event: PointerEvent): void {
      if (!hasFinePointer || reducedMotion) {
        return;
      }

      targetPointer.x = event.clientX;
      targetPointer.y = event.clientY;
    }

    function handleVisibilityChange(): void {
      isVisible = !document.hidden;

      if (isVisible) {
        startAnimation();
      } else {
        stopAnimation();
      }
    }

    function handleReducedMotionChange(
      event: MediaQueryListEvent
    ): void {
      reducedMotion = event.matches;
      updateGlowVisibility();

      if (reducedMotion) {
        drawParticles();
      }
    }

    function handleFinePointerChange(
      event: MediaQueryListEvent
    ): void {
      hasFinePointer = event.matches;
      updateGlowVisibility();
    }

    resizeCanvas();
    updateGlowVisibility();
    startAnimation();

    window.addEventListener("resize", resizeCanvas, {
      passive: true,
    });

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    );

    reducedMotionQuery.addEventListener(
      "change",
      handleReducedMotionChange
    );

    finePointerQuery.addEventListener(
      "change",
      handleFinePointerChange
    );

    return () => {
      stopAnimation();

      window.removeEventListener("resize", resizeCanvas);

      window.removeEventListener(
        "pointermove",
        handlePointerMove
      );

      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );

      reducedMotionQuery.removeEventListener(
        "change",
        handleReducedMotionChange
      );

      finePointerQuery.removeEventListener(
        "change",
        handleFinePointerChange
      );
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full opacity-70"
      />

      <div
        ref={glowRef}
        className="particle-cursor-glow absolute left-0 top-0"
      />
    </div>
  );
}