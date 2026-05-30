'use client';

import { useEffect, useRef } from 'react';

const COLORS = ['#7c5cff', '#00d4ff', '#ff6b9d'];
const MAX_PARTICLES = 80;
const SPAWN_COUNT = 2; // particles per mousemove

export default function CursorTrail() {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const mouse = useRef({ x: 0, y: 0 });
  const animId = useRef(null);
  const isActive = useRef(true);

  useEffect(() => {
    // Skip on touch devices / small screens
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.innerWidth < 768) return;

    // Respect reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const spawnParticle = (x, y) => {
      if (particles.current.length >= MAX_PARTICLES) return;

      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      particles.current.push({
        x,
        y,
        radius: 2 + Math.random() * 3,
        opacity: 0.3 + Math.random() * 0.3,
        vx: (Math.random() - 0.5) * 1, // horizontal drift
        vy: -(0.5 + Math.random() * 1.5), // upward velocity
        decay: 0.005 + Math.random() * 0.005,
        color,
      });
    };

    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      for (let i = 0; i < SPAWN_COUNT; i++) {
        spawnParticle(
          e.clientX + (Math.random() - 0.5) * 8,
          e.clientY + (Math.random() - 0.5) * 8
        );
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const alive = [];
      for (const p of particles.current) {
        p.x += p.vx;
        p.y += p.vy;
        p.opacity -= p.decay;

        if (p.opacity <= 0) continue;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();

        alive.push(p);
      }

      ctx.globalAlpha = 1;
      particles.current = alive;

      if (isActive.current) {
        animId.current = requestAnimationFrame(animate);
      }
    };

    animId.current = requestAnimationFrame(animate);

    return () => {
      isActive.current = false;
      cancelAnimationFrame(animId.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 9999,
      }}
      aria-hidden="true"
    />
  );
}
