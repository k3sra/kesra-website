"use client";

import { ImmersiveBackground } from "@/components/ImmersiveBackground";
import { EnterPortal } from "@/components/EnterPortal";
import { Reveal } from "@/components/Reveal";
import { Magnetic } from "@/components/Magnetic";
import { site } from "@/lib/site";

const links = [
  { label: "Email", href: "mailto:k33sra@gmail.com" },
  { label: "X", href: "https://x.com/ProbablyK3" },
  { label: "Instagram", href: "https://instagram.com/kesra____" },
  { label: "GitHub", href: "https://github.com/k3sra" },
];

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[12px] text-white/75">
      {children}
    </span>
  );
}

export default function Page() {
  return (
    <main className="relative min-h-screen text-white">
      <EnterPortal />
      <ImmersiveBackground />

      <div className="relative mx-auto max-w-[1120px] px-5 sm:px-7">
        {/* top */}
        <header className="flex items-center justify-between pt-7 sm:pt-9">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl border border-white/12 bg-white/5 shadow-[0_0_0_1px_rgba(255,255,255,0.06)_inset,0_16px_44px_rgba(0,0,0,0.45)] grid place-items-center">
              <span className="font-semibold tracking-tight">K</span>
            </div>
            <div className="leading-tight">
              <div className="text-sm font-medium tracking-tight text-white/90">Kesra</div>
              <div className="text-[12px] text-white/60">Dubai, UAE</div>
            </div>
          </div>

          <nav className="hidden sm:flex items-center gap-2">
            <Pill>reliability</Pill>
            <Pill>observability</Pill>
            <Pill>security</Pill>
          </nav>
        </header>

        {/* hero */}
        <section className="pt-16 sm:pt-20 pb-16 sm:pb-20">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-3 py-1 text-[12px] text-white/70">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-300/80 shadow-[0_0_24px_rgba(0,210,255,0.65)]" />
              Backend Platform &amp; Systems Engineer
              <span className="text-white/40">·</span>
              systems • backend • frontend • Unity
            </div>
          </Reveal>

          <div className="mt-7 grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
            <Reveal delayMs={90}>
              <div>
                <h1 className="text-[44px] sm:text-[64px] lg:text-[78px] font-semibold tracking-tight leading-[0.98]">
                  yep that’s me<span className="text-white/50">.</span>
                </h1>
                <p className="mt-4 text-[16px] sm:text-[18px] text-white/70 max-w-[62ch]">
                  pretending to know what’s going on — while quietly building reliable services,
                  scalable data systems, and production-grade infrastructure.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Magnetic>
                    <a
                      href="#contact"
                      className="group inline-flex items-center justify-center rounded-2xl border border-white/12 bg-white/6 px-5 py-3 text-sm font-medium shadow-[0_0_0_1px_rgba(255,255,255,0.06)_inset,0_18px_55px_rgba(0,0,0,0.55)] transition hover:bg-white/10"
                    >
                      <span className="mr-2 h-1.5 w-1.5 rounded-full bg-violet-300/80 shadow-[0_0_24px_rgba(124,92,255,0.6)]" />
                      contact
                      <span className="ml-3 opacity-60 transition group-hover:opacity-100">→</span>
                    </a>
                  </Magnetic>

                  <Magnetic strength={10}>
                    <a
                      href="https://github.com/k3sra"
                      className="inline-flex items-center justify-center rounded-2xl border border-white/12 bg-transparent px-5 py-3 text-sm font-medium text-white/80 hover:text-white transition hover:bg-white/5"
                      target="_blank"
                      rel="noreferrer"
                    >
                      github
                      <span className="ml-3 opacity-60">↗</span>
                    </a>
                  </Magnetic>
                </div>

                <div className="mt-10 flex flex-wrap gap-2">
                  <Pill>type-safe APIs</Pill>
                  <Pill>jobs &amp; schedulers</Pill>
                  <Pill>containers</Pill>
                  <Pill>CI/CD</Pill>
                  <Pill>prometheus/grafana</Pill>
                </div>
              </div>
            </Reveal>

            <Reveal delayMs={150} className="lg:justify-self-end">
              <div className="rounded-[28px] border border-white/12 bg-white/5 p-5 sm:p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.06)_inset,0_26px_70px_rgba(0,0,0,0.65)]">
                <div className="text-[12px] tracking-[0.28em] text-white/60">STATUS</div>
                <div className="mt-3 text-sm text-white/80">
                  currently: building systems that don’t fall over
                </div>

                <div className="mt-5 grid gap-2">
                  {[
                    ["Reliability", "idempotent flows · safe retries · graceful degradation"],
                    ["Security", "strict secrets · scoped access · least privilege"],
                    ["Observability", "structured logs · metrics & traces · actionable alerts"],
                    ["DX", "clear configs · predictable behavior · deep documentation"],
                  ].map(([k, v]) => (
                    <div key={k} className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                      <div className="text-[12px] text-white/85">{k}</div>
                      <div className="mt-1 text-[12px] text-white/60">{v}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* about */}
        <section className="pb-16 sm:pb-20">
          <Reveal>
            <div className="rounded-[32px] border border-white/12 bg-white/5 p-6 sm:p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.06)_inset,0_26px_70px_rgba(0,0,0,0.55)]">
              <div className="text-[12px] tracking-[0.32em] text-white/60">ABOUT</div>
              <div className="mt-4 grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
                <p className="text-[15px] sm:text-[16px] leading-relaxed text-white/75">
                  I’m Kesra — I build backend platforms, systems, and production infrastructure that stays calm under pressure.
                  I love reliable services, scalable data, and clean developer experiences. I also build frontend when it matters,
                  and I mess around with Unity/game development because I genuinely love games.
                </p>
                <div className="grid gap-3">
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <div className="text-[12px] text-white/85">Focus</div>
                    <div className="mt-1 text-[12px] text-white/60">
                      backend architecture · systems engineering · platform reliability
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <div className="text-[12px] text-white/85">Build style</div>
                    <div className="mt-1 text-[12px] text-white/60">
                      type-safe APIs · safe retries · observability-first · least privilege
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* skills */}
        <section className="pb-16 sm:pb-20">
          <Reveal>
            <div className="flex items-end justify-between gap-6">
              <div>
                <div className="text-[12px] tracking-[0.32em] text-white/60">STACK</div>
                <div className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight">
                  premium systems toolkit
                </div>
              </div>
              <div className="hidden sm:block text-[12px] text-white/60">
                tuned for reliability • speed • clarity
              </div>
            </div>
          </Reveal>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["Backend & Services", ["type-safe APIs", "background jobs", "rate limits", "modules & handlers"]],
              ["Data & Consistency", ["relational schemas", "migrations", "indexing", "audits"]],
              ["Platform & Infra", ["containers", "CI/CD", "secrets", "scaling patterns"]],
              ["Observability", ["structured logs", "metrics & traces", "alerts", "dashboards"]],
              ["Security", ["least privilege", "scoped access", "hardening", "trust boundaries"]],
              ["Playground", ["Unity", "frontend", "tooling", "experiments"]],
            ].map(([title, items], i) => (
              <Reveal key={title as string} delayMs={i * 60}>
                <div className="rounded-[26px] border border-white/12 bg-white/5 p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.06)_inset,0_22px_60px_rgba(0,0,0,0.55)]">
                  <div className="text-sm font-medium text-white/90">{title as string}</div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {(items as string[]).map((it) => (
                      <span
                        key={it}
                        className="inline-flex items-center rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[12px] text-white/70"
                      >
                        {it}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* contact */}
        <section id="contact" className="pb-16 sm:pb-20">
          <Reveal>
            <div className="rounded-[34px] border border-white/12 bg-white/5 p-6 sm:p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.06)_inset,0_26px_70px_rgba(0,0,0,0.6)]">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <div className="text-[12px] tracking-[0.32em] text-white/60">CONTACT</div>
                  <div className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight">
                    say hi — or ship something
                  </div>
                  <div className="mt-2 text-sm text-white/70">
                    {site.domain}
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  {links.map((l) => (
                    <Magnetic key={l.label} strength={12}>
                      <a
                        href={l.href}
                        target={l.href.startsWith("http") ? "_blank" : undefined}
                        rel={l.href.startsWith("http") ? "noreferrer" : undefined}
                        className="inline-flex items-center justify-center rounded-2xl border border-white/12 bg-black/20 px-4 py-3 text-sm font-medium text-white/85 hover:text-white transition hover:bg-white/8"
                      >
                        {l.label}
                        <span className="ml-3 opacity-60">↗</span>
                      </a>
                    </Magnetic>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        <footer className="pb-10 text-center text-[12px] text-white/55">
          © {new Date().getFullYear()} Kesra · built to feel like an experience
        </footer>
      </div>
    </main>
  );
}
