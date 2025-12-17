export const content = {
    meta: {
        title: "Kesra | Systems Engineer",
        description: "Reliable services. Scalable data. Production-grade infrastructure.",
        domain: "kesra.dev",
        email: "k33sra@gmail.com",
        twitter: "@ProbablyK3",
    },
    hero: {
        tagline: "Backend Platform & Systems Engineer",
        headline: "Kesra",
        subhead: "Reliable services. Scalable data. Production-grade infrastructure.",
        chips: [
            { label: "Dubai, UAE", icon: "map" },
            { label: "Available for new systems", icon: "pulse" },
        ],
    },
    // Engineering Pillars (Replacing Highlights)
    pillars: [
        {
            title: "Reliability",
            icon: "ShieldCheck",
            items: ["Idempotent flows", "Safe retries", "Graceful degradation"]
        },
        {
            title: "Security",
            icon: "Lock",
            items: ["Strict secrets", "Scoped access", "Least privilege"]
        },
        {
            title: "Observability",
            icon: "Activity",
            items: ["Structured logs", "Metrics & traces", "Actionable alerts"]
        },
        {
            title: "DevEx",
            icon: "Terminal",
            items: ["Clear configs", "Predictable behavior", "Deep documentation"]
        },
    ],
    // Capabilities (Replacing generic Tech/Toolbox)
    capabilities: [
        {
            category: "Backend & Services",
            icon: "Server",
            tags: ["Type-safe APIs", "Background jobs", "Schedulers", "Rate limits"]
        },
        {
            category: "Data & Consistency",
            icon: "Database",
            tags: ["Relational schemas", "Migrations", "Indexing", "Audits"]
        },
        {
            category: "Platform & Infra",
            icon: "Container", // mapped to Box or Container in component
            tags: ["Containers", "CI/CD", "Secrets", "Monitoring", "Scaling"]
        }
    ],
    work: [
        {
            title: "Voltaic",
            type: "High-Performance Compute",
            description: "Next-gen compute platform designed for massive parallelism.",
            tags: ["Go", "Rust", "WASM"],
            link: "#",
        },
        {
            title: "Nebula",
            type: "Distributed Systems",
            description: "Atomic design system powering 15+ enterprise applications.",
            tags: ["React", "TypeScript", "Event Sourcing"],
            link: "#",
        },
        {
            title: "Apex",
            type: "Real-time Telemetry",
            description: "Sub-millisecond latency monitoring for distributed systems.",
            tags: ["Elixir", "Phoenix", "WebSockets"],
            link: "#",
        },
    ],
    // Keeping for legacy/footer references if needed, but primary display uses pillars/capabilities
    socials: [
        { label: "GitHub", url: "https://github.com/k3sra" },
        { label: "Twitter", url: "https://x.com/ProbablyK3" },
        { label: "Email", url: "mailto:k33sra@gmail.com" },
    ]
};
