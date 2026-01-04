"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const LiquidBackground = () => {
    const [bgType, setBgType] = useState<"loading" | "gif" | "procedural">("loading");

    useEffect(() => {
        // Attempt to load the GIF
        const img = new Image();
        img.src = "/assets/background.gif";
        img.onload = () => setBgType("gif");
        img.onerror = () => setBgType("procedural");
    }, []);

    return (
        <div className="fixed inset-0 z-0 overflow-hidden bg-black select-none pointer-events-none">
            <AnimatePresence mode="wait">
                {bgType === "gif" && (
                    <motion.div
                        key="gif-bg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        className="absolute inset-0"
                    >
                        {/* The GIF Layer */}
                        <div
                            className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
                            style={{ backgroundImage: "url('/assets/background.gif')" }}
                        />
                        {/* The 20% Dimming Overlay */}
                        <div className="absolute inset-0 bg-black/20" />

                        {/* Soft Ambient Light Overlay to blend it nicely */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent mix-blend-overlay" />
                    </motion.div>
                )}

                {bgType === "procedural" && (
                    <motion.div
                        key="proc-bg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 bg-[#050505]"
                    >
                        {/* Ambient Base Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-bl from-blue-900/20 via-black to-purple-900/20 opacity-50" />

                        {/* Procedural Blobs */}
                        <BlurBlob
                            color="bg-blue-600"
                            initial={{ x: "-20%", y: "-20%", scale: 1 }}
                            animate={{
                                x: ["-20%", "20%", "-10%", "-20%"],
                                y: ["-20%", "10%", "30%", "-20%"],
                                scale: [1, 1.5, 0.8, 1],
                            }}
                            duration={25}
                        />
                        <BlurBlob
                            color="bg-purple-600"
                            initial={{ x: "80%", y: "20%", scale: 1.2 }}
                            animate={{
                                x: ["80%", "40%", "90%", "80%"],
                                y: ["20%", "60%", "10%", "20%"],
                                scale: [1.2, 0.9, 1.3, 1.2],
                            }}
                            duration={30}
                            delay={2}
                        />
                        <BlurBlob
                            color="bg-cyan-500"
                            initial={{ x: "30%", y: "80%", scale: 0.8 }}
                            animate={{
                                x: ["30%", "70%", "20%", "30%"],
                                y: ["80%", "40%", "90%", "80%"],
                                scale: [0.8, 1.2, 0.9, 0.8],
                            }}
                            duration={28}
                            delay={5}
                        />

                        {/* Noise Overlay for texture */}
                        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
                            style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                            }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const BlurBlob = ({
    color,
    initial,
    animate,
    duration,
    delay = 0,
}: {
    color: string;
    initial: any;
    animate: any;
    duration: number;
    delay?: number;
}) => {
    return (
        <motion.div
            className={`absolute w-[60vw] h-[60vw] rounded-full blur-[120px] opacity-40 mix-blend-screen ${color}`}
            initial={initial}
            animate={animate}
            transition={{
                duration,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
                delay,
            }}
        />
    );
};
