"use client";

import { content } from "@/lib/content";
import { Glass } from "@/components/system/Glass";
import { Container } from "@/components/system/Container";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function Contact() {
    return (
        <section id="contact" className="py-32 mb-20">
            <Container>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <h2 className="text-4xl sm:text-7xl font-semibold text-white tracking-tighter mb-12">
                        Let&apos;s build the future.
                    </h2>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Glass
                            interactive
                            intensity="high"
                            tint="gradient"
                            border="highlight"
                            className="group cursor-pointer p-1 rounded-full"
                        >
                            <a href={`mailto:${content.meta.email}`} className="flex items-center gap-4 bg-white text-black px-8 py-4 rounded-full font-medium text-lg transition-transform group-hover:scale-[1.02]">
                                Email Me
                                <ArrowRight className="w-5 h-5" />
                            </a>
                        </Glass>

                        <div className="flex items-center gap-6">
                            {content.socials.map(s => (
                                <a
                                    key={s.label}
                                    href={s.url}
                                    target="_blank"
                                    className="text-white/50 hover:text-white transition-colors"
                                >
                                    {s.label}
                                </a>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </Container>
        </section>
    );
}
