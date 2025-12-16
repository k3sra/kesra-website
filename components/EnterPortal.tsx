"use client";

import { useEffect, useMemo, useState } from "react";

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

export function EnterPortal() {
  const reduced = usePrefersReducedMotion();
  const [done, setDone] = useState(false);

  const key = useMemo(() => `kesra_enter_${new Date().toISOString().slice(0, 10)}`, []);
  useEffect(() => {
    const seen = typeof window !== "undefined" ? window.sessionStorage.getItem(key) : "1";
    if (seen) {
      setDone(true);
      return;
    }
    window.sessionStorage.setItem(key, "1");

    if (reduced) {
      setDone(true);
      return;
    }

    const t = window.setTimeout(() => setDone(true), 1550);
    return () => window.clearTimeout(t);
  }, [key, reduced]);

  if (done) return null;

  return (
    <div className="fixed inset-0 z-[60] grid place-items-center bg-[#06060a]">
      <div className="absolute inset-0 opacity-[0.18] bg-[radial-gradient(circle_at_50%_30%,rgba(0,210,255,0.50),transparent_55%),radial-gradient(circle_at_50%_70%,rgba(124,92,255,0.55),transparent_58%)]" />
      <div className="absolute inset-0 noise-overlay" />

      <div className="relative flex flex-col items-center gap-4 px-8">
        <div className="portal-ring" aria-hidden />
        <div className="portal-ring portal-ring-2" aria-hidden />
        <div className="portal-ring portal-ring-3" aria-hidden />

        <div className="text-center">
          <div className="text-[12px] tracking-[0.42em] text-white/70">ENTERING</div>
          <div className="mt-2 text-4xl font-semibold text-white/95 tracking-tight">
            kesra.lol
          </div>
          <div className="mt-2 text-[13px] text-white/70">
            initializing experience…
          </div>
        </div>
      </div>

      <div className="absolute inset-0 portal-wipe" aria-hidden />
    </div>
  );
}
