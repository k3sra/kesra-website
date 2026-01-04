"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import React, { useRef } from "react";
import { MoveRight } from "lucide-react";

export const GlassCard = () => {
    const ref = useRef<HTMLDivElement>(null);

    // Motion values for tilt effect
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth springs for the tilt
    const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

    // Sheen effect movement
    const sheenX = useTransform(mouseXSpring, [-0.5, 0.5], ["-20%", "120%"]);
    const sheenY = useTransform(mouseYSpring, [-0.5, 0.5], ["-20%", "120%"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className="relative z-10 w-[90vw] max-w-md aspect-[4/5] md:aspect-[3/4] rounded-[2.5rem] bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl overflow-hidden cursor-default group"
        >
            {/* Glossy Sheen Overlay */}
            <motion.div
                style={{
                    background: "radial-gradient(circle at center, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 60%)",
                    left: sheenX,
                    top: sheenY,
                    translateX: "-50%",
                    translateY: "-50%",
                    rotate: "-45deg",
                    width: "150%",
                    height: "20%"
                }}
                className="absolute z-20 pointer-events-none blur-3xl opacity-50"
            />

            {/* Specular highlight border correction (top-left light source simulation) */}
            <div className="absolute inset-0 rounded-[2.5rem] ring-1 ring-inset ring-white/30 pointer-events-none z-50" />
            <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-white/10 to-transparent opacity-50 pointer-events-none" />

            {/* Content wrapper with Parallax */}
            <div className="relative h-full w-full flex flex-col justify-between p-8 md:p-10 pointer-events-auto">

                {/* Header / Top */}
                <motion.div
                    style={{ translateZ: 40 }}
                    className="flex justify-between items-start"
                >
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-white/80 shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                        <span className="text-xs font-mono tracking-widest text-white/70 uppercase">Liquid OS</span>
                    </div>
                    <div className="h-8 w-8 rounded-full border border-white/20 flex items-center justify-center bg-white/5 backdrop-blur-md">
                        <div className="w-4 h-0.5 bg-white/80 rounded-full" />
                    </div>
                </motion.div>

                {/* Main Hero Content */}
                <motion.div
                    style={{ translateZ: 80 }}
                    className="space-y-4"
                >
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-white drop-shadow-2xl">
                        Glass.<br />
                        Refined.
                    </h1>
                    <p className="text-sm text-white/70 leading-relaxed max-w-[260px] drop-shadow-md backdrop-blur-sm rounded-lg">
                        Experience the fluidity of pure light. Soft shadows, seamless interactions, and depth that feels real.
                    </p>
                </motion.div>

                {/* Action / Bottom */}
                <motion.div
                    style={{ translateZ: 60 }}
                    className="mt-4"
                >
                    <button className="group/btn relative w-full overflow-hidden rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 p-4 transition-all duration-300">
                        <div className="relative z-10 flex items-center justify-between">
                            <span className="text-sm font-medium text-white tracking-wide">Enter Experience</span>
                            <MoveRight className="w-4 h-4 text-white/80 transition-transform duration-300 group-hover/btn:translate-x-1" />
                        </div>
                        {/* Button Glow on Hover */}
                        <div className="absolute inset-0 rounded-xl bg-white/5 blur-md opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
                    </button>
                </motion.div>

            </div>

            {/* Noise Grain Overlay for texture inside the card */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
            />
        </motion.div>
    );
};
