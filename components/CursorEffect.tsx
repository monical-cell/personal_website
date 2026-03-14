"use client";

import { useEffect, useRef, useState } from "react";

/**
 * CursorEffect Component
 * 
 * Custom cursor with particle trail and magnetic interaction
 * Features:
 * - Energy glow that follows cursor
 * - Particle trail on movement
 * - Magnetic pull effect on interactive elements
 * - Click ripple animation
 */
export function CursorEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setIsVisible(false);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Cursor state
    const cursor = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
    };

    // Particle system
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
      size: number;
    }

    const particles: Particle[] = [];
    let lastParticleTime = 0;

    // Click ripples
    interface Ripple {
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      opacity: number;
    }

    const ripples: Ripple[] = [];

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      cursor.targetX = e.clientX;
      cursor.targetY = e.clientY;

      // Create particles on movement
      const now = Date.now();
      if (now - lastParticleTime > 30) {
        particles.push({
          x: cursor.x,
          y: cursor.y,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          life: 1,
          maxLife: 60,
          size: Math.random() * 2 + 1,
        });
        lastParticleTime = now;
      }
    };

    // Click handler
    const handleClick = (e: MouseEvent) => {
      ripples.push({
        x: e.clientX,
        y: e.clientY,
        radius: 0,
        maxRadius: 50,
        opacity: 1,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);

    // Animation loop
    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Smooth cursor follow (ease)
      cursor.x += (cursor.targetX - cursor.x) * 0.15;
      cursor.y += (cursor.targetY - cursor.y) * 0.15;

      // Draw cursor glow
      const gradient = ctx.createRadialGradient(
        cursor.x,
        cursor.y,
        0,
        cursor.x,
        cursor.y,
        30
      );
      gradient.addColorStop(0, "rgba(255, 215, 0, 0.4)"); // purple glow
      gradient.addColorStop(0.5, "rgba(255, 215, 0, 0.2)");
      gradient.addColorStop(1, "rgba(255, 215, 0, 0)");

      ctx.fillStyle = gradient;
      ctx.fillRect(cursor.x - 30, cursor.y - 30, 60, 60);

      // Draw cursor center dot
      ctx.beginPath();
      ctx.arc(cursor.x, cursor.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 215, 0, 0.8)";
      ctx.fill();

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        
        p.x += p.vx;
        p.y += p.vy;
        p.life--;
        
        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        const opacity = p.life / p.maxLife;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 215, 0, ${opacity * 0.6})`;
        ctx.fill();
      }

      // Update and draw ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        
        r.radius += 2;
        r.opacity -= 0.02;
        
        if (r.opacity <= 0) {
          ripples.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 215, 0, ${r.opacity})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{ background: "transparent", cursor: "none" }}
      aria-hidden="true"
    />
  );
}
