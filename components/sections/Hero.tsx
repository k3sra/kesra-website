"use client";

import { content } from "@/lib/content";
import { Glass } from "@/components/system/Glass";
import { Container } from "@/components/system/Container";
import { motion, Variants } from "framer-motion"; // Import Variants for type safety
import { ArrowRight, MapPin, Activity } from "lucide-react";

const variants: Variants = {
    hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } }
};

export function Hero() {
    return (
        <section className="relative flex min-h-[80vh] flex-col justify-center pt-20 pb-8">
            <Container className="flex flex-col items-center text-center">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    transition={{ staggerChildren: 0.15 }}
                    className="relative z-10 w-full"
                >
                    {/* Identity Chips - Stacked on very small screens, row on mobile+ */}
                    <motion.div variants={variants} className="flex flex-wrap justify-center gap-3 mb-12">
                        <Glass intensity="low" tint="dark" border="subtle" className="flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-3xl transition-transform hover:scale-105">
                            <MapPin className="w-3.5 h-3.5 text-white/50" />
                            <span className="text-xs sm:text-sm font-medium text-white/90 tracking-wide">{content.hero.chips[0].label}</span>
                        </Glass>
                        <Glass intensity="low" tint="dark" border="subtle" className="flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-3xl transition-transform hover:scale-105">
                            <Activity className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-xs sm:text-sm font-medium text-white/90 tracking-wide">{content.hero.chips[1].label}</span>
                        </Glass>
                    </motion.div>

                    {/* Massive Typography - Fluid Type & Strict Center Balance */}
                    <motion.div variants={variants}>
                        <h1 className="text-6xl sm:text-8xl md:text-9xl font-semibold tracking-tighter text-white mb-8 leading-[0.9] drop-shadow-2xl">
                            {content.hero.headline}<span className="text-white/30">.</span>
                        </h1>
                    </motion.div>

                    <motion.div variants={variants} className="max-w-2xl mx-auto">
                        <p className="text-lg sm:text-2xl text-white/70 font-normal leading-relaxed text-balance tracking-tight">
                            {content.hero.subhead}
                        </p>
                    </motion.div>

                    {/* Core Stack - Toolbox SVG */}
                    <motion.div variants={variants} className="mt-10 overflow-hidden">
                        <div className="overflow-x-auto scrollbar-hide py-2 flex justify-center">
                            <img
                                src="/toolbox.svg"
                                alt="Core Stack: TypeScript, JavaScript, Go, Python, Node.js, PostgreSQL, Docker, and more"
                                className="h-16 sm:h-24 w-auto max-w-none opacity-70 hover:opacity-100 transition-opacity"
                            />
                        </div>
                    </motion.div>

                    {/* Primary Actions - <a> as parent for reliable single-click */}
                    <motion.div variants={variants} className="mt-16 flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto">
                        <a href="#work" className="group w-full sm:w-auto">
                            <Glass
                                interactive
                                intensity="medium"
                                tint="frosted"
                                border="highlight"
                                className="inline-flex items-center justify-center gap-3 px-12 py-4 rounded-full transition-all active:scale-95 hover:bg-white/10 flex-nowrap min-w-max"
                            >
                                <span className="text-lg font-medium text-white tracking-tight whitespace-nowrap">View Work</span>
                                <ArrowRight className="w-5 h-5 text-white/60 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                            </Glass>
                        </a>

                        <a href="#contact" className="group w-full sm:w-auto">
                            <Glass
                                interactive
                                intensity="low"
                                tint="clear"
                                border="subtle"
                                className="flex items-center justify-center px-10 py-4 rounded-full transition-all active:scale-95 hover:bg-white/5 text-lg font-medium text-white/90 group-hover:text-white tracking-tight whitespace-nowrap"
                            >
                                Contact Me
                            </Glass>
                        </a>
                    </motion.div>

                    {/* Bio - Light humor */}
                    <motion.div variants={variants} className="mt-12 max-w-xl mx-auto">
                        <p className="text-base sm:text-lg text-white/50 font-light leading-relaxed text-balance">
                            Engineer by trade, debugger by necessity. I write code that (usually) works on the first try,
                            build systems that don&apos;t page me at 3am, and occasionally touch grass.
                        </p>
                    </motion.div>
                </motion.div>
            </Container>
        </section>
    );
}
