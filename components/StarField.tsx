"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  color: string;
  twinkleSpeed: number;
  opacity: number;
  direction: number;
}

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let stars: Star[] = [];

    const colors = [
      "rgba(56, 189, 248, ",  // Sky Blue
      "rgba(14, 165, 233, ",  // Cyan
      "rgba(96, 165, 250, ",  // Light Blue
      "rgba(147, 197, 253, ", // Pale Blue
      "rgba(255, 255, 255, ", // Pure White
    ];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      stars = [];
      const density = Math.floor((canvas.width * canvas.height) / 12000); // density of stars
      const count = Math.min(Math.max(density, 30), 120); // reasonable limits

      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 0.5,
          color: colors[Math.floor(Math.random() * colors.length)],
          twinkleSpeed: 0.003 + Math.random() * 0.008,
          opacity: Math.random(),
          direction: Math.random() > 0.5 ? 1 : -1,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        // Twinkle effect
        star.opacity += star.twinkleSpeed * star.direction;
        if (star.opacity >= 0.9) {
          star.opacity = 0.9;
          star.direction = -1;
        } else if (star.opacity <= 0.1) {
          star.opacity = 0.1;
          star.direction = 1;
        }

        // Draw star
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `${star.color}${star.opacity})`;
        ctx.shadowBlur = star.size * 3;
        ctx.shadowColor = "rgba(14, 165, 233, 0.4)";
        ctx.fill();
      });

      // Reset shadow blur
      ctx.shadowBlur = 0;

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
}
