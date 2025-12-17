"use client";

import { cn } from "@/lib/utils";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { MouseEvent } from "react";

interface GlassProps {
    children: React.ReactNode;
    className?: string;
    intensity?: "low" | "medium" | "high" | "ultra";
    tint?: "clear" | "frosted" | "dark" | "gradient";
    border?: "none" | "subtle" | "highlight";
    interactive?: boolean;
}

export function Glass({
    children,
    className,
    intensity = "medium",
    tint = "clear",
    border = "subtle",
    interactive = true
}: GlassProps) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        if (!interactive) return;
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    // Configuration Maps (VisionOS Specs)
    const blurs = {
        low: "backdrop-blur-xl backdrop-saturate-150",
        medium: "backdrop-blur-2xl backdrop-saturate-150",
        high: "backdrop-blur-3xl backdrop-saturate-150",
        ultra: "backdrop-blur-[50px] backdrop-saturate-200",
    };

    const tints = {
        clear: "bg-white/[0.01]",
        frosted: "bg-zinc-900/40", // Darker base for VisionOS
        dark: "bg-black/60",
        gradient: "bg-gradient-to-b from-white/[0.08] to-transparent",
    };

    const borders = {
        none: "",
        subtle: "border border-white/5",
        highlight: "border border-white/10 ring-1 ring-white/5", // Double border effect
    };

    return (
        <div
            className={cn(
                "group relative overflow-hidden rounded-[32px]", // More organic radius
                blurs[intensity],
                tints[tint],
                borders[border],
                // Deep shadow for float
                "shadow-2xl shadow-black/40",
                className
            )}
            onMouseMove={handleMouseMove}
        >
            {/* 1. Reflective Sheen (Mouse Follower) - Sharper */}
            {interactive && (
                <motion.div
                    className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100" // Faster transition
                    style={{
                        background: useMotionTemplate`
              radial-gradient(
                500px circle at ${mouseX}px ${mouseY}px,
                rgba(255, 255, 255, 0.08),
                transparent 40%
              )
            `,
                    }}
                />
            )}

            {/* 2. Noise Texture (Anti-banding) */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-overlay"
                style={{ backgroundImage: `url("/noise.png")`, backgroundSize: "128px" }}
            />

            {/* 3. Inner Specular Highlight (Rim Light) - More pronounced */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-60" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-30" />

            {/* Content */}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
}
