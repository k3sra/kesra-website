"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

type Dot = {
  id: string;
  x: number;
  y: number;
  r: number;
  a: number;
  blur: number;
  driftX: number;
  driftY: number;
};

export default function ImmersiveBackground() {
  const [isMobile, setIsMobile] = useState(false);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const raf = useRef<number | null>(null);
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 640);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      target.current = {
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5,
      };
      if (raf.current) return;
      raf.current = window.requestAnimationFrame(() => {
        raf.current = null;
        setPointer((p) => ({
          x: p.x + (target.current.x - p.x) * 0.18,
          y: p.y + (target.current.y - p.y) * 0.18,
        }));
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf.current) window.cancelAnimationFrame(raf.current);
    };
  }, []);

  const dots = useMemo(() => {
    const count = isMobile ? 28 : 44;
    return Array.from({ length: count }, (_, i) => ({
      id: `d${i}`,
      x: rand(0, 100),
      y: rand(0, 100),
      r: rand(200, 480),
      a: rand(0.15, 0.35),
      blur: rand(20, 80),
      driftX: rand(-1, 1),
      driftY: rand(-1, 1),
    }));
  }, [isMobile]);

  const px = pointer.x * 16;
  const py = pointer.y * 16;

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(1200px_800px_at_40%_10%,rgba(120,120,255,0.14),transparent_60%),radial-gradient(900px_900px_at_70%_35%,rgba(255,120,220,0.10),transparent_58%),radial-gradient(700px_700px_at_30%_70%,rgba(120,255,220,0.10),transparent_58%)]" />
      <div className="absolute inset-0 opacity-[0.55] mix-blend-screen">
        {dots.map((d, i) => (
          <motion.div
            key={d.id}
            className="absolute rounded-full"
            style={{
              left: `${d.x + px * (0.2 + (i % 6) * 0.04)}%`,
              top: `${d.y + py * (0.2 + (i % 6) * 0.04)}%`,
              width: d.r,
              height: d.r,
              filter: `blur(${d.blur}px)`,
              opacity: d.a,
              background:
                "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.7), rgba(255,255,255,0) 60%)",
            }}
            animate={{
              scale: [1, 1.05, 1],
              opacity: [d.a * 0.8, d.a, d.a * 0.9],
            }}
            transition={{
              duration: 8 + (i % 5),
              repeat: Infinity,
              ease: "easeInOut",
              delay: (i % 7) * 0.2,
            }}
          />
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/75" />
    </div>
  );
}
