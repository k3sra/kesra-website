"use client";

import { content } from "@/lib/content";
import { Glass } from "@/components/system/Glass";
import { Container } from "@/components/system/Container";
import { motion } from "framer-motion";
import { Server, Database, Box } from "lucide-react";

// Map string icons to components
const icons = {
    Server,
    Database,
    Container: Box // Using Box for Container/Infra
} as const;

export function About() {
    return (
        <section className="py-20">
            <Container>
                <div className="grid md:grid-cols-12 gap-6">
                    {/* Capabilities (Spans 8 cols) */}
                    <div className="md:col-span-8 grid sm:grid-cols-2 gap-4">
                        {content.capabilities.map((cap, i) => {
                            const Icon = icons[cap.icon as keyof typeof icons];
                            return (
                                <motion.div
                                    key={cap.category}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className={i === 2 ? "sm:col-span-2" : ""} // Make the 3rd one full width if needed, or just let it flow
                                >
                                    <Glass intensity="medium" tint="dark" border="subtle" className="p-6 h-full">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="p-2 rounded-lg bg-white/5 text-emerald-400">
                                                <Icon size={20} />
                                            </div>
                                            <h3 className="font-medium text-white">{cap.category}</h3>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {cap.tags.map(tag => (
                                                <span key={tag} className="text-sm px-3 py-1 rounded-full bg-white/5 border border-white/5 text-white/60">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </Glass>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Now / Focus (Spans 4 cols - Sidebar style) */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="md:col-span-4"
                    >
                        <Glass intensity="medium" tint="gradient" border="highlight" className="p-8 h-full relative overflow-hidden flex flex-col">
                            {/* Decorative colored glow for 'Now' */}
                            <div className="absolute -right-20 -top-20 w-64 h-64 bg-emerald-500/20 blur-[100px] rounded-full pointer-events-none" />

                            <h3 className="text-xl font-medium text-white mb-6 relative z-10 flex items-center gap-2">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                </span>
                                Now
                            </h3>
                            <p className="text-white/70 font-light leading-relaxed relative z-10">
                                Architecting high-throughput ingestion pipelines. Deep diving into Rust concurrency patterns and WASM at the edge.
                            </p>
                        </Glass>
                    </motion.div>
                </div>
            </Container>
        </section>
    );
}
