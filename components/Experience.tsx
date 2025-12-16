"use client";

import { motion, useReducedMotion, useScroll, useTransform, useMotionValue } from "framer-motion";
import { ArrowUpRight, Github, Instagram, Mail, MapPin, Sparkles, Twitter, MessageCircle, Ghost } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { site } from "@/lib/site";
import { cn } from "@/components/cn";
import { dur, ease, stagger } from "@/components/motion";

function useRafPointerGlow(enabled: boolean) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: PointerEvent) => {
      if (raf.current) cancelAnimationFrame(raf.current);
      const { clientX, clientY } = e;
      raf.current = requestAnimationFrame(() => {
        x.set(clientX);
        y.set(clientY);
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      window.removeEventListener("pointermove", onMove);
    };
  }, [enabled, x, y]);

  return { x, y };
}

function BackgroundGrid() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;

    const ctx = c.getContext("2d", { alpha: true });
    if (!ctx) return;

    let w = 0, h = 0, dpr = 1;
    let t = 0;
    let raf = 0;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = c.clientWidth;
      h = c.clientHeight;
      c.width = Math.floor(w * dpr);
      c.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (time: number) => {
      t = time * 0.001;
      ctx.clearRect(0, 0, w, h);

      // Grid
      const gap = 46;
      const ox = (w * 0.5) % gap;
      const oy = (h * 0.5) % gap;

      // Drift is tiny; disabled entirely in reduced-motion
      const drift = reduced ? 0 : Math.sin(t * 0.6) * 10;

      ctx.globalAlpha = 0.55;
      ctx.lineWidth = 1;

      for (let x = -gap; x < w + gap; x += gap) {
        const px = x + ox + drift;
        ctx.strokeStyle = "rgba(255,255,255,0.06)";
        ctx.beginPath();
        ctx.moveTo(px, 0);
        ctx.lineTo(px, h);
        ctx.stroke();
      }

      for (let y = -gap; y < h + gap; y += gap) {
        const py = y + oy - drift;
        ctx.strokeStyle = "rgba(255,255,255,0.05)";
        ctx.beginPath();
        ctx.moveTo(0, py);
        ctx.lineTo(w, py);
        ctx.stroke();
      }

      // Accent pulses (subtle)
      ctx.globalAlpha = 1;
      const cx = w * 0.75;
      const cy = h * 0.25;
      const r = 140 + (reduced ? 0 : (Math.sin(t * 0.8) + 1) * 14);

      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      g.addColorStop(0, "rgba(124,92,255,0.16)");
      g.addColorStop(1, "rgba(124,92,255,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      if (!reduced) raf = requestAnimationFrame(draw);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(c);

    resize();
    raf = requestAnimationFrame(draw);

    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-white/55">
      <span className="h-[1px] w-10 bg-white/20" />
      <span>{children}</span>
    </div>
  );
}

function PillarCard({ title, lines }: { title: string; lines: readonly string[] }) {
  return (
    <div className="group rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur">
      <div className="mb-3 flex items-center justify-between">
        <div className="text-sm font-medium text-white/90">{title}</div>
        <div className="h-8 w-8 rounded-full border border-white/10 bg-white/[0.03] grid place-items-center">
          <Sparkles className="h-4 w-4 text-white/70" />
        </div>
      </div>
      <ul className="space-y-1.5 text-sm text-white/70">
        {lines.map((l) => (
          <li key={l} className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-white/35" />
            <span>{l}</span>
          </li>
        ))}
      </ul>
      <div className="mt-5 h-[1px] w-full bg-gradient-to-r from-white/0 via-white/10 to-white/0" />
      <div className="mt-4 text-xs text-white/45">
        Boring in prod. Beautiful in motion.
      </div>
    </div>
  );
}

function StackChip({ label, detail }: { label: string; detail: string }) {
  return (
    <div className="group rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 backdrop-blur">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-sm font-medium text-white/90">{label}</div>
          <div className="mt-0.5 text-xs text-white/55">{detail}</div>
        </div>
        <div className="h-8 w-8 rounded-xl border border-white/10 bg-white/[0.03] grid place-items-center">
          <span className="h-1.5 w-1.5 rounded-full bg-[rgb(var(--a1))]" />
        </div>
      </div>
      <div className="mt-3 h-[1px] w-full bg-gradient-to-r from-white/0 via-white/10 to-white/0" />
      <div className="mt-3 text-[11px] text-white/45">
        tuned for scale + clarity
      </div>
    </div>
  );
}

function SocialButton({
  href,
  label,
  icon
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("mailto:") ? undefined : "_blank"}
      rel={href.startsWith("mailto:") ? undefined : "noreferrer"}
      className={cn(
        "group relative flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3",
        "shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur",
        "transition-transform duration-200 will-change-transform",
        "hover:-translate-y-0.5 hover:border-white/20"
      )}
    >
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl border border-white/10 bg-white/[0.03] grid place-items-center">
          {icon}
        </div>
        <div>
          <div className="text-sm font-medium text-white/90">{label}</div>
          <div className="text-xs text-white/55">{href.replace("mailto:", "")}</div>
        </div>
      </div>
      <ArrowUpRight className="h-4 w-4 text-white/55 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[rgba(124,92,255,0.10)] via-[rgba(0,210,255,0.08)] to-transparent" />
      </div>
    </a>
  );
}

export default function Experience() {
  const reduced = useReducedMotion();

  const intro = {
    initial: { opacity: 0, y: reduced ? 0 : 18, filter: "blur(10px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: reduced ? { duration: 0 } : { staggerChildren: stagger.md, delayChildren: 0.08 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: reduced ? 0 : 14 },
    show: { opacity: 1, y: 0, transition: reduced ? { duration: 0 } : { duration: dur.base, ease } }
  };

  const { scrollYProgress } = useScroll();
  const heroParallax = useTransform(scrollYProgress, [0, 0.25], [0, reduced ? 0 : -32]);

  const enableGlow = !reduced && typeof window !== "undefined" && matchMedia("(pointer:fine)").matches;
  const { x, y } = useRafPointerGlow(enableGlow);

  const glowStyle = useMemo(() => {
    return {
      transform: "translate3d(0,0,0)"
    };
  }, []);

  const [copied, setCopied] = useState(false);
  const copyDiscord = async () => {
    await navigator.clipboard.writeText(site.socials.discordLabel);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 900);
  };

  return (
    <div className="relative min-h-dvh overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <BackgroundGrid />
        <div className="absolute inset-0 bg-[radial-gradient(900px_600px_at_50%_0%,rgba(255,255,255,0.06),transparent_65%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.0),rgba(0,0,0,0.35),rgba(0,0,0,0.55))]" />
      </div>

      {enableGlow && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-40 opacity-70"
          style={{
            ...glowStyle,
            background:
              "radial-gradient(320px 320px at var(--mx) var(--my), rgba(0,210,255,0.10), transparent 60%), radial-gradient(360px 360px at var(--mx) var(--my), rgba(124,92,255,0.10), transparent 62%)"
          }}
          animate={{
            "--mx": `${x.get()}px`,
            "--my": `${y.get()}px`
          } as any}
          transition={{ duration: 0 }}
        />
      )}

      <main className="relative mx-auto w-full max-w-6xl px-5 pb-24 pt-10 sm:px-7 sm:pt-14">
        {/* Top bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur grid place-items-center">
              <span className="text-sm font-semibold tracking-tight">K</span>
            </div>
            <div className="leading-tight">
              <div className="text-sm font-medium text-white/90">{site.author.name}</div>
              <div className="text-xs text-white/55">{site.hero.tagline}</div>
            </div>
          </div>

          <a
            href={site.socials.github}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white/80 backdrop-blur transition-transform duration-200 hover:-translate-y-0.5 hover:border-white/20"
          >
            <Github className="h-4 w-4" />
            <span className="hidden sm:inline">GitHub</span>
            <ArrowUpRight className="h-4 w-4 opacity-60 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* Hero */}
        <motion.section
          className="mt-12 sm:mt-16"
          variants={intro}
          initial="initial"
          animate="animate"
          transition={reduced ? { duration: 0 } : { duration: dur.intro, ease }}
          style={{ y: heroParallax }}
        >
          <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur sm:p-10">
            <div className="pointer-events-none absolute inset-0 opacity-80">
              <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,rgba(124,92,255,0.28),transparent_60%)] blur-2xl" />
              <div className="absolute -right-20 -bottom-28 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_center,rgba(0,210,255,0.22),transparent_60%)] blur-2xl" />
              <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(255,255,255,0.06),transparent_35%,rgba(255,255,255,0.04))]" />
            </div>

            <div className="relative">
              <div className="flex items-center justify-between gap-6">
                <SectionLabel>enter</SectionLabel>
                <div className="flex items-center gap-2 text-xs text-white/55">
                  <MapPin className="h-4 w-4" />
                  <span>{site.author.location}</span>
                </div>
              </div>

              <div className="mt-8">
                <div className="text-[13px] uppercase tracking-[0.22em] text-white/60">
                  {site.hero.subline}
                </div>

                <h1 className="mt-3 text-balance text-4xl font-semibold tracking-[-0.04em] text-white sm:text-6xl">
                  {site.author.name}
                  <span className="text-white/55">.</span>
                </h1>

                <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-white/70 sm:text-lg">
                  Systems-first engineering with a taste for premium motion — backend, frontend, and Unity game systems.
                </p>

                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <a
                    href="#contact"
                    className="group inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-medium text-black transition-transform duration-200 hover:-translate-y-0.5"
                  >
                    Contact
                    <ArrowUpRight className="h-4 w-4 opacity-70 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>

                  <a
                    href="#about"
                    className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-medium text-white/80 backdrop-blur transition-transform duration-200 hover:-translate-y-0.5 hover:border-white/20"
                  >
                    About
                  </a>

                  <div className="ml-auto hidden md:flex items-center gap-3 text-xs text-white/55">
                    <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 backdrop-blur">
                      60fps-minded
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 backdrop-blur">
                      reduced-motion safe
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* About */}
        <section id="about" className="mt-14 sm:mt-18">
          <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-120px" }}>
            <motion.div variants={item}>
              <SectionLabel>identity</SectionLabel>
            </motion.div>

            <motion.div variants={item} className="mt-5 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur sm:p-10">
                <div className="text-sm font-medium text-white/90">{site.hero.tagline}</div>
                <div className="mt-2 text-xs uppercase tracking-[0.22em] text-white/55">{site.vibe.join(" · ")}</div>

                <p className="mt-6 text-pretty text-base leading-relaxed text-white/70 sm:text-lg">
                  {site.bio}
                </p>

                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4">
                    <div className="text-xs uppercase tracking-[0.22em] text-white/55">focus</div>
                    <div className="mt-2 text-sm text-white/80">reliability · security · observability</div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4">
                    <div className="text-xs uppercase tracking-[0.22em] text-white/55">also</div>
                    <div className="mt-2 text-sm text-white/80">frontend craft · Unity systems</div>
                  </div>
                </div>
              </div>

              <div className="grid gap-5">
                {site.pillars.map((p) => (
                  <PillarCard key={p.title} title={p.title} lines={p.lines} />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Stack */}
        <section id="stack" className="mt-14 sm:mt-18">
          <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-120px" }}>
            <motion.div variants={item}>
              <SectionLabel>stack</SectionLabel>
            </motion.div>

            <motion.div variants={item} className="mt-5 rounded-[28px] border border-white/10 bg-white/[0.03] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur sm:p-10">
              <div className="flex items-end justify-between gap-6">
                <div>
                  <div className="text-2xl font-semibold tracking-[-0.03em] text-white">Premium systems, clean surfaces.</div>
                  <div className="mt-2 text-sm text-white/65">Architecture, reliability, and the details users feel.</div>
                </div>
                <div className="hidden md:flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-white/60">
                  <Sparkles className="h-4 w-4" />
                  <span>built for production</span>
                </div>
              </div>

              <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {site.stack.map((s) => (
                  <StackChip key={s.label} label={s.label} detail={s.detail} />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Highlights */}
        <section id="highlights" className="mt-14 sm:mt-18">
          <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-120px" }}>
            <motion.div variants={item}>
              <SectionLabel>highlights</SectionLabel>
            </motion.div>

            <motion.div variants={item} className="mt-5 grid gap-4 lg:grid-cols-2">
              {site.highlights.map((h) => (
                <div
                  key={h.title}
                  className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur sm:p-10"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-xl font-semibold tracking-[-0.03em] text-white">{h.title}</div>
                      <div className="mt-2 text-sm text-white/65">{h.blurb}</div>
                    </div>
                    <div className="h-10 w-10 rounded-2xl border border-white/10 bg-white/[0.03] grid place-items-center">
                      <Ghost className="h-5 w-5 text-white/70" />
                    </div>
                  </div>

                  <div className="mt-7 h-[1px] w-full bg-gradient-to-r from-white/0 via-white/12 to-white/0" />

                  <div className="mt-6 text-xs text-white/50">
                    small joke, big energy.
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* Contact */}
        <section id="contact" className="mt-14 sm:mt-18">
          <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-120px" }}>
            <motion.div variants={item}>
              <SectionLabel>contact</SectionLabel>
            </motion.div>

            <motion.div variants={item} className="mt-5 rounded-[28px] border border-white/10 bg-white/[0.03] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur sm:p-10">
              <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <div className="text-2xl font-semibold tracking-[-0.03em] text-white">Let’s build something that holds.</div>
                  <div className="mt-2 text-sm text-white/65">Fast, safe, observable — with taste.</div>
                </div>

                <button
                  type="button"
                  onClick={copyDiscord}
                  className={cn(
                    "inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-medium text-white/80",
                    "backdrop-blur transition-transform duration-200 hover:-translate-y-0.5 hover:border-white/20"
                  )}
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>{copied ? "Copied Discord: k3sra" : "Copy Discord: k3sra"}</span>
                </button>
              </div>

              <div className="mt-8 grid gap-3 md:grid-cols-2">
                <SocialButton href={site.socials.email} label="Email" icon={<Mail className="h-5 w-5 text-white/80" />} />
                <SocialButton href={site.socials.github} label="GitHub" icon={<Github className="h-5 w-5 text-white/80" />} />
                <SocialButton href={site.socials.x} label="X" icon={<Twitter className="h-5 w-5 text-white/80" />} />
                <SocialButton href={site.socials.instagram} label="Instagram" icon={<Instagram className="h-5 w-5 text-white/80" />} />
                <SocialButton href={site.socials.snapchat} label="Snapchat" icon={<Sparkles className="h-5 w-5 text-white/80" />} />
                <SocialButton href={"https://kesra.lol"} label="Apex" icon={<ArrowUpRight className="h-5 w-5 text-white/80" />} />
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="mt-14">
          <div className="flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row sm:items-center">
            <div>© {new Date().getFullYear()} {site.author.name}. Built on Next.js + Tailwind + Motion.</div>
            <div className="text-white/40">Dubai · {site.domain}</div>
          </div>
        </footer>
      </main>
    </div>
  );
}
