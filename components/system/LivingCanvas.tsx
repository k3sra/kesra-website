"use client";

import { useEffect, useRef } from "react";

export function LivingCanvas() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const ripples = useRef<{ x: number; y: number; r: number; opacity: number }[]>([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let w = canvas.width;
        let h = canvas.height;

        const resize = () => {
            w = window.innerWidth;
            h = window.innerHeight;
            canvas.width = w;
            canvas.height = h;
        };

        const addRipple = (e: MouseEvent | TouchEvent) => {
            let x, y;
            if ('touches' in e) {
                x = e.touches[0].clientX;
                y = e.touches[0].clientY;
            } else {
                x = (e as MouseEvent).clientX;
                y = (e as MouseEvent).clientY;
            }
            ripples.current.push({ x, y, r: 0, opacity: 0.6 });
        };

        const draw = () => {
            ctx.clearRect(0, 0, w, h);

            // Filter and update ripples
            ripples.current = ripples.current.filter(r => r.opacity > 0.005); // Longer life

            ripples.current.forEach(r => {
                r.r += 1.5; // Slower expansion for more "weight"
                r.opacity *= 0.97; // Slower fade for longer persistence

                ctx.beginPath();
                ctx.arc(r.x, r.y, r.r, 0, Math.PI * 2);

                // Outer ring
                ctx.strokeStyle = `rgba(255, 255, 255, ${r.opacity * 0.4})`; // Brighter
                ctx.lineWidth = 1;
                ctx.stroke();

                // Inner glow
                const grad = ctx.createRadialGradient(r.x, r.y, 0, r.x, r.y, r.r);
                grad.addColorStop(0, `rgba(255, 255, 255, ${r.opacity * 0.1})`);
                grad.addColorStop(1, "transparent");
                ctx.fillStyle = grad;
                ctx.fill();
            });

            requestAnimationFrame(draw);
        };

        window.addEventListener("resize", resize);
        window.addEventListener("mousedown", addRipple);
        window.addEventListener("touchstart", addRipple);
        resize();
        const animId = requestAnimationFrame(draw);

        return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousedown", addRipple);
            window.removeEventListener("touchstart", addRipple);
            cancelAnimationFrame(animId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="pointer-events-none fixed inset-0 z-[100]"
            aria-hidden="true"
        />
    );
}
