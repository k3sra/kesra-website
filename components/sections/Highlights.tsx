"use client";

import { content } from "@/lib/content";
import { Glass } from "@/components/system/Glass";
import { Container } from "@/components/system/Container";
import { motion } from "framer-motion";
import { ShieldCheck, Lock, Activity, Terminal } from "lucide-react";

const icons = {
    ShieldCheck,
    Lock,
    Activity,
    Terminal
} as const;

export function Highlights() {
    return (
        <section className="py-20">
            <Container>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {content.pillars.map((pillar, i) => {
                        const Icon = icons[pillar.icon as keyof typeof icons];
                        return (
                            <motion.div
                                key={pillar.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.6 }}
                            >
                                <Glass
                                    intensity="medium"
                                    tint="dark"
                                    border="subtle"
                                    className="p-6 h-full flex flex-col min-h-[220px] group hover:bg-white/[0.03] transition-colors"
                                >
                                    <div className="mb-4 text-emerald-400">
                                        <Icon size={24} strokeWidth={1.5} />
                                    </div>
                                    <h3 className="text-xl font-medium text-white mb-4">{pillar.title}</h3>
                                    <ul className="space-y-2 mt-auto">
                                        {pillar.items.map((item) => (
                                            <li key={item} className="text-sm text-white/50 flex items-center gap-2">
                                                <span className="w-1 h-1 rounded-full bg-emerald-500/50" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </Glass>
                            </motion.div>
                        );
                    })}
                </div>
            </Container>
        </section>
    );
}
