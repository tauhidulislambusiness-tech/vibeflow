'use client';

import { useEffect, useRef, useCallback } from 'react';

export default function WaterRipple() {
  const canvasRef = useRef(null);
  const ripplesRef = useRef([]);
  const mouseRef = useRef({ x: -100, y: -100 });
  const lastSpawnRef = useRef(0);
  const rafRef = useRef(null);

  const COLORS = [
    { r: 124, g: 92, b: 255 },   // violet
    { r: 0, g: 212, b: 255 },     // cyan
    { r: 255, g: 107, b: 157 },   // pink
    { r: 100, g: 130, b: 255 },   // soft blue
  ];

  const spawnRipple = useCallback((x, y) => {
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    ripplesRef.current.push({
      x,
      y,
      radius: 2,
      maxRadius: 60 + Math.random() * 80,
      opacity: 0.35 + Math.random() * 0.15,
      lineWidth: 1.5 + Math.random() * 1.5,
      speed: 1.2 + Math.random() * 1.8,
      color,
      // Secondary inner ring
      innerRadius: 1,
      innerOpacity: 0.2 + Math.random() * 0.1,
    });

    // Occasionally spawn a larger, slower ripple for depth
    if (Math.random() > 0.6) {
      const color2 = COLORS[Math.floor(Math.random() * COLORS.length)];
      ripplesRef.current.push({
        x: x + (Math.random() - 0.5) * 10,
        y: y + (Math.random() - 0.5) * 10,
        radius: 1,
        maxRadius: 100 + Math.random() * 60,
        opacity: 0.15 + Math.random() * 0.1,
        lineWidth: 0.8 + Math.random() * 0.8,
        speed: 0.6 + Math.random() * 0.8,
        color: color2,
        innerRadius: 0,
        innerOpacity: 0.1,
      });
    }
  }, []);

  useEffect(() => {
    // Skip on touch devices / small screens / reduced motion
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.innerWidth < 768) return;
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

    const onMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      const now = Date.now();
      // Spawn ripples every ~40ms while moving
      if (now - lastSpawnRef.current > 40) {
        spawnRipple(e.clientX, e.clientY);
        lastSpawnRef.current = now;
      }
    };

    const onClick = (e) => {
      // Bigger splash on click
      for (let i = 0; i < 3; i++) {
        const color = COLORS[Math.floor(Math.random() * COLORS.length)];
        ripplesRef.current.push({
          x: e.clientX + (Math.random() - 0.5) * 8,
          y: e.clientY + (Math.random() - 0.5) * 8,
          radius: 2,
          maxRadius: 100 + Math.random() * 100,
          opacity: 0.4 + Math.random() * 0.15,
          lineWidth: 1.5 + Math.random() * 2,
          speed: 1.5 + Math.random() * 2,
          color,
          innerRadius: 1,
          innerOpacity: 0.25,
        });
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('click', onClick, { passive: true });

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const ripples = ripplesRef.current;

      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        const progress = r.radius / r.maxRadius;
        const fadeOut = 1 - progress;

        // Main outer ring
        const mainOpacity = r.opacity * fadeOut * fadeOut;
        if (mainOpacity > 0.003) {
          ctx.beginPath();
          ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${r.color.r}, ${r.color.g}, ${r.color.b}, ${mainOpacity})`;
          ctx.lineWidth = r.lineWidth * fadeOut;
          ctx.stroke();

          // Inner ring (slightly behind)
          if (r.innerRadius > 4) {
            const innerProgress = r.innerRadius / r.maxRadius;
            const innerFade = 1 - innerProgress;
            ctx.beginPath();
            ctx.arc(r.x, r.y, r.innerRadius * 0.6, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(${r.color.r}, ${r.color.g}, ${r.color.b}, ${r.innerOpacity * innerFade * innerFade})`;
            ctx.lineWidth = (r.lineWidth * 0.5) * innerFade;
            ctx.stroke();
          }

          // Subtle filled center glow (only when ripple is young)
          if (progress < 0.3) {
            const glowOpacity = mainOpacity * 0.15 * (1 - progress / 0.3);
            const gradient = ctx.createRadialGradient(r.x, r.y, 0, r.x, r.y, r.radius * 0.5);
            gradient.addColorStop(0, `rgba(${r.color.r}, ${r.color.g}, ${r.color.b}, ${glowOpacity})`);
            gradient.addColorStop(1, `rgba(${r.color.r}, ${r.color.g}, ${r.color.b}, 0)`);
            ctx.beginPath();
            ctx.arc(r.x, r.y, r.radius * 0.5, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();
          }
        }

        // Expand
        r.radius += r.speed;
        r.innerRadius += r.speed * 0.85;

        // Remove dead ripples
        if (r.radius >= r.maxRadius) {
          ripples.splice(i, 1);
        }
      }

      // Limit max active ripples
      if (ripples.length > 50) {
        ripples.splice(0, ripples.length - 50);
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('click', onClick);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [spawnRipple]);

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
        zIndex: 9998,
      }}
      aria-hidden="true"
    />
  );
}
