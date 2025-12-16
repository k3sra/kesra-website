export const site = {
  domain: "kesra.lol",
  title: "Kesra — Backend Platform & Systems Engineer",
  description:
    "Kesra is a Backend Platform & Systems Engineer in Dubai. Reliability, observability, security, and polished experiences across backend, frontend, and Unity game systems.",
  locale: "en_US",
  author: {
    name: "Kesra",
    location: "Dubai, UAE"
  },
  vibe: ["cinematic", "noir", "neon", "graphite", "precise", "futuristic", "clean"],
  socials: {
    email: "mailto:k33sra@gmail.com",
    github: "https://github.com/k3sra",
    x: "https://x.com/ProbablyK3",
    instagram: "https://instagram.com/kesra____",
    snapchat: "https://www.snapchat.com/add/kesra1",
    discordLabel: "k3sra"
  },
  hero: {
    tagline: "Backend Platform & Systems Engineer",
    subline: "reliable services · scalable data · production-grade infrastructure"
  },
  bio: `I’m Kesra — a backend platform & systems engineer based in Dubai. I build reliable services, scalable data systems, and production-grade infrastructure with a strong bias toward clarity, safety, and predictable behavior in production. I care about observability and security as first-class features: structured logs, actionable metrics, scoped access, and strict secret handling. I also enjoy the other side of the stack — crafting clean, responsive frontends and smooth micro-interactions. Outside of web systems, I build games in Unity, focusing on core gameplay systems, tools, and “feel.” I love playing games just as much as building them — and I’m always chasing that mix of performance, polish, and resilience.`,
  pillars: [
    {
      title: "Reliability",
      lines: ["idempotent flows", "safe retries", "graceful degradation"]
    },
    {
      title: "Security",
      lines: ["strict secrets", "scoped access", "least privilege"]
    },
    {
      title: "Observability",
      lines: ["structured logs", "metrics & traces", "actionable alerts"]
    },
    {
      title: "Developer Experience",
      lines: ["clear configs", "predictable behavior", "deep documentation"]
    }
  ],
  stack: [
    { label: "TypeScript", detail: "type-safe APIs, UI, tooling" },
    { label: "Go", detail: "services, concurrency, performance" },
    { label: "Python", detail: "automation, data, integrations" },
    { label: "Postgres", detail: "schemas, migrations, indexing" },
    { label: "Redis", detail: "caching, queues, rate limits" },
    { label: "Docker", detail: "containers, reproducible deploys" },
    { label: "Linux", detail: "systems, tuning, reliability" },
    { label: "Prometheus/Grafana", detail: "metrics, dashboards, alerts" }
  ],
  highlights: [
    {
      title: "yep thats me",
      blurb: "from the meme “yep thats me”.",
      href: null
    },
    {
      title: "pretending to know whats going on.",
      blurb: "still shipping anyway — calm, measured, and production-first.",
      href: null
    }
  ]
} as const;
