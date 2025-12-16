"use client";

import { useEffect, useState } from "react";

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

  useEffect(() => {
    if (reduced) {
      setDone(true);
      return;
    }
    const t = window.setTimeout(() => setDone(true), 1250);
    return () => window.clearTimeout(t);
  }, [reduced]);

  if (done) return null;

  return (
    <div className="fixed inset-0 z-[60] grid place-items-center bg-[#04040a]">
      <div className="absolute inset-0 opacity-[0.22] bg-[radial-gradient(circle_at_50%_28%,rgba(0,210,255,0.55),transparent_58%),radial-gradient(circle_at_50%_76%,rgba(124,92,255,0.60),transparent_62%)]" />
      <div className="absolute inset-0 noise-overlay" />

      <div className="relative flex flex-col items-center gap-4 px-8">
        <div className="portal-ring" aria-hidden />
        <div className="portal-ring portal-ring-2" aria-hidden />
        <div className="portal-ring portal-ring-3" aria-hidden />

        <div className="text-center">
          <div className="text-[12px] tracking-[0.42em] text-white/75">ENTERING</div>
          <div className="mt-2 text-4xl font-semibold text-white/95 tracking-tight">
            kesra.lol
          </div>
          <div className="mt-2 text-[13px] text-white/70">
            booting visuals…
          </div>
        </div>
      </div>

      <div className="absolute inset-0 portal-wipe" aria-hidden />
    </div>
  );
}
