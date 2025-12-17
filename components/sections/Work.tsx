"use client";

import { content } from "@/lib/content";
import { Glass } from "@/components/system/Glass";
import { Container } from "@/components/system/Container";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export function Work() {
    return (
        <section id="work" className="py-20">
            <Container>
                <motion.h2
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-xs font-semibold tracking-widest text-white/50 uppercase mb-8 text-center sm:text-left"
                >
                    Selected Works
                </motion.h2>

                <div className="grid gap-6">
                    {content.work.map((project, i) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, scale: 0.98 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: i * 0.1 }}
                        >
                            <Glass
                                interactive
                                intensity="high"
                                tint="frosted"
                                border="highlight"
                                className="group relative p-8 sm:p-12 hover:bg-white/[0.1] transition-colors"
                            >
                                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
                                    <div>
                                        <div className="flex items-center gap-3 mb-3">
                                            <h3 className="text-3xl font-semibold text-white">{project.title}</h3>
                                            <span className="px-3 py-1 rounded-full bg-white/10 text-xs text-white/70 border border-white/5">
                                                {project.type}
                                            </span>
                                        </div>
                                        <p className="text-xl text-white/70 font-light max-w-2xl leading-relaxed">
                                            {project.description}
                                        </p>

                                        <div className="flex flex-wrap gap-2 mt-8">
                                            {project.tags.map(tag => (
                                                <span key={tag} className="text-sm font-mono text-white/40">#{tag}</span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="h-12 w-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">
                                        <ArrowUpRight className="w-5 h-5" />
                                    </div>
                                </div>
                            </Glass>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
