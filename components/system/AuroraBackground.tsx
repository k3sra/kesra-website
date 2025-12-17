"use client";

import { useEffect, useRef } from "react";

export function AuroraBackground() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let w = canvas.width;
        let h = canvas.height;
        let time = 0;

        // Configuration
        const orbs = [
            { x: 0.2, y: 0.2, r: 0.5, color: [0, 255, 255], speed: 0.002 },   // Cyan
            { x: 0.8, y: 0.3, r: 0.6, color: [139, 92, 246], speed: -0.003 }, // Violet
            { x: 0.5, y: 0.8, r: 0.5, color: [236, 72, 153], speed: 0.002 },  // Pink
        ];

        const resize = () => {
            w = window.innerWidth;
            h = window.innerHeight;
            canvas.width = w;
            canvas.height = h;
        };

        const draw = () => {
            time += 1;
            ctx.fillStyle = "#05050A"; // Deep base
            ctx.fillRect(0, 0, w, h);

            orbs.forEach((orb) => {
                // Organic movement using noise-like sin/cos waves
                const x = (orb.x + Math.sin(time * orb.speed) * 0.15) * w;
                const y = (orb.y + Math.cos(time * orb.speed * 0.8) * 0.15) * h;
                const r = Math.min(w, h) * orb.r;

                const g = ctx.createRadialGradient(x, y, 0, x, y, r);
                // RGB string construction
                const c = orb.color;
                g.addColorStop(0, `rgba(${c[0]}, ${c[1]}, ${c[2]}, 0.35)`);
                g.addColorStop(1, "rgba(0,0,0,0)");

                ctx.globalCompositeOperation = "screen"; // Additive blending for "light" feel
                ctx.fillStyle = g;
                ctx.beginPath();
                ctx.arc(x, y, r, 0, Math.PI * 2);
                ctx.fill();
            });

            requestAnimationFrame(draw);
        };

        window.addEventListener("resize", resize);
        resize();
        const animId = requestAnimationFrame(draw);

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animId);
        };
    }, []);

    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#05050A]">
            <canvas ref={canvasRef} className="absolute inset-0 h-full w-full blur-[100px] scale-125" />
            <div className="absolute inset-0 bg-[#05050A]/20 backdrop-blur-[0px]" /> {/* Subtle overlay if needed */}
        </div>
    );
}
