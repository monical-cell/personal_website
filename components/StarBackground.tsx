"use client";

import { useEffect, useRef } from "react";

/**
 * StarBackground Component
 * 
 * Animated starfield with multiple parallax layers
 * Creates depth through varying sizes, speeds, and opacities
 * Optimized for performance using Canvas API
 */
export function StarBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas to full window size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Star configuration - 3 layers for parallax depth
    interface Star {
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      opacity: number;
      layer: number;
    }

    const stars: Star[] = [];
    const starCount = 80;

    // Generate stars with varied properties - subtler than original
    for (let i = 0; i < starCount; i++) {
      const layer = Math.floor(Math.random() * 3); // 0, 1, or 2
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: layer === 0 ? 0.3 : layer === 1 ? 0.6 : 1,
        vx: (Math.random() - 0.5) * 0.05 * (layer + 1),
        vy: (Math.random() - 0.5) * 0.05 * (layer + 1),
        opacity: layer === 0 ? 0.15 : layer === 1 ? 0.3 : 0.5,
        layer,
      });
    }

    // Animation loop
    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw each star
      stars.forEach((star) => {
        // Move star
        star.x += star.vx;
        star.y += star.vy;

        // Wrap around edges
        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;

        // Draw star
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();

        // No glow - keep stars subtle
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: "transparent" }}
      aria-hidden="true"
    />
  );
}
