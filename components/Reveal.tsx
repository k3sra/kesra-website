"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

type RevealProps = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  from?: "bottom" | "top" | "left" | "right";
};

function getVariants(from: RevealProps["from"], reduced: boolean) {
  const dist = reduced ? 0 : 18;
  const base = { opacity: 0 } as const;

  switch (from) {
    case "top":
      return { hidden: { ...base, y: -dist }, show: { opacity: 1, y: 0 } };
    case "left":
      return { hidden: { ...base, x: -dist }, show: { opacity: 1, x: 0 } };
    case "right":
      return { hidden: { ...base, x: dist }, show: { opacity: 1, x: 0 } };
    default:
      return { hidden: { ...base, y: dist }, show: { opacity: 1, y: 0 } };
  }
}

export default function Reveal({
  children,
  delay = 0,
  className,
  from = "bottom",
}: RevealProps) {
  const reduced = false; // disable reduced-motion
  const ref = useRef<HTMLDivElement | null>(null);
  const controls = useAnimation();
  const [inView, setInView] = useState(false);
  const variants = useMemo(() => getVariants(from, reduced), [from, reduced]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setInView(true),
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (inView) controls.start("show");
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={controls}
      variants={variants}
      transition={{
        duration: 0.85,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
