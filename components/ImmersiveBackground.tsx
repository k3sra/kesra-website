"use client";

import { useEffect, useMemo, useRef, useState } from "react";

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(!!mq.matches);
    onChange();
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);
  return reduced;
}

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  a: number;
};

export function ImmersiveBackground() {
  const reduced = usePrefersReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const [ready, setReady] = useState(false);

  const seed = useMemo(() => Math.random() * 9999, []);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;

    const ctx = c.getContext("2d", { alpha: true });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const state = {
      w: 0,
      h: 0,
      t: 0,
      mx: 0.5,
      my: 0.35,
      particles: [] as Particle[],
    };

    const resize = () => {
      const parent = c.parentElement;
      const w = parent ? parent.clientWidth : window.innerWidth;
      const h = parent ? parent.clientHeight : window.innerHeight;
      state.w = Math.max(1, w);
      state.h = Math.max(1, h);
      c.width = Math.floor(state.w * dpr);
      c.height = Math.floor(state.h * dpr);
      c.style.width = `${state.w}px`;
      c.style.height = `${state.h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const base = Math.max(40, Math.min(130, Math.floor(state.w / 11)));
      const count = reduced ? Math.floor(base * 0.25) : base;

      const rand = (n: number) => {
        const x = Math.sin(n + seed) * 10000;
        return x - Math.floor(x);
      };

      state.particles = new Array(count).fill(0).map((_, i) => {
        const rr = 0.7 + rand(i * 13.1) * 1.7;
        const a = 0.08 + rand(i * 7.7) * 0.18;
        const sp = reduced ? 0 : 0.15 + rand(i * 5.3) * 0.55;
        const ang = rand(i * 9.9) * Math.PI * 2;
        return {
          x: rand(i * 3.3) * state.w,
          y: rand(i * 4.4) * state.h,
          vx: Math.cos(ang) * sp,
          vy: Math.sin(ang) * sp,
          r: rr,
          a,
        };
      });
    };

    const onPointer = (e: PointerEvent) => {
      const rect = c.getBoundingClientRect();
      const x = (e.clientX - rect.left) / Math.max(1, rect.width);
      const y = (e.clientY - rect.top) / Math.max(1, rect.height);
      state.mx = Math.min(1, Math.max(0, x));
      state.my = Math.min(1, Math.max(0, y));
    };

    const draw = () => {
      state.t += 1;

      const w = state.w;
      const h = state.h;
      ctx.clearRect(0, 0, w, h);

      // base vignette + depth
      const vg = ctx.createRadialGradient(w * 0.52, h * 0.36, 0, w * 0.52, h * 0.36, Math.max(w, h) * 0.9);
      vg.addColorStop(0, "rgba(12,12,18,0.0)");
      vg.addColorStop(0.55, "rgba(9,9,12,0.35)");
      vg.addColorStop(1, "rgba(0,0,0,0.8)");
      ctx.fillStyle = vg;
      ctx.fillRect(0, 0, w, h);

      // two "reactors" that follow pointer (subtle on mobile via default mx/my)
      const rx = w * (0.2 + state.mx * 0.7);
      const ry = h * (0.18 + state.my * 0.55);
      const reactorA = ctx.createRadialGradient(rx, ry, 0, rx, ry, Math.max(w, h) * 0.55);
      reactorA.addColorStop(0, "rgba(0,210,255,0.20)");
      reactorA.addColorStop(0.32, "rgba(0,210,255,0.06)");
      reactorA.addColorStop(1, "rgba(0,210,255,0.0)");
      ctx.fillStyle = reactorA;
      ctx.fillRect(0, 0, w, h);

      const px = w * (0.75 - state.mx * 0.55);
      const py = h * (0.82 - state.my * 0.55);
      const reactorB = ctx.createRadialGradient(px, py, 0, px, py, Math.max(w, h) * 0.6);
      reactorB.addColorStop(0, "rgba(124,92,255,0.20)");
      reactorB.addColorStop(0.34, "rgba(124,92,255,0.07)");
      reactorB.addColorStop(1, "rgba(124,92,255,0.0)");
      ctx.fillStyle = reactorB;
      ctx.fillRect(0, 0, w, h);

      // particles
      ctx.save();
      ctx.globalCompositeOperation = "screen";
      for (const p of state.particles) {
        if (!reduced) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < -20) p.x = w + 20;
          if (p.x > w + 20) p.x = -20;
          if (p.y < -20) p.y = h + 20;
          if (p.y > h + 20) p.y = -20;
        }

        const dmx = (p.x / w - state.mx) * 2;
        const dmy = (p.y / h - state.my) * 2;
        const pull = reduced ? 0 : Math.max(0, 1 - Math.sqrt(dmx * dmx + dmy * dmy));
        const glow = p.a + pull * 0.14;

        ctx.fillStyle = `rgba(255,255,255,${glow})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // scanline shimmer (very subtle)
      ctx.save();
      ctx.globalAlpha = 0.10;
      ctx.fillStyle = "rgba(255,255,255,0.06)";
      const step = 3;
      for (let y = 0; y < h; y += step) {
        if ((y + state.t) % 18 === 0) ctx.fillRect(0, y, w, 1);
      }
      ctx.restore();

      rafRef.current = requestAnimationFrame(draw);
    };

    resize();
    setReady(true);

    window.addEventListener("resize", resize, { passive: true });
    c.addEventListener("pointermove", onPointer, { passive: true });

    // Start animation loop (keeps a static but rendered background when reduced)
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      c.removeEventListener("pointermove", onPointer);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [reduced, seed]);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[#07070b]" />
      <div className="absolute inset-0 opacity-[0.12] bg-[radial-gradient(circle_at_30%_18%,rgba(0,210,255,0.55),transparent_52%),radial-gradient(circle_at_78%_84%,rgba(124,92,255,0.60),transparent_54%)]" />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-0 noise-overlay" />
      <div className={`absolute inset-0 transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`} />
    </div>
  );
}
