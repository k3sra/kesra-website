"use client";

import { ReactLenis, useLenis } from "@studio-freight/react-lenis";
import { useEffect } from "react";

function AnchorInterceptor() {
    const lenis = useLenis();

    useEffect(() => {
        if (!lenis) return;

        const handleClick = (e: MouseEvent) => {
            const target = (e.target as HTMLElement).closest("a");
            if (!target) return;

            const href = target.getAttribute("href");
            if (!href || !href.startsWith("#")) return;

            e.preventDefault();
            const el = document.querySelector(href);
            if (el) {
                lenis.scrollTo(el as HTMLElement, { duration: 1.2 });
            }
        };

        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);
    }, [lenis]);

    return null;
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
    return (
        <ReactLenis root options={{ lerp: 0.08, duration: 1.2, smoothWheel: true }}>
            <AnchorInterceptor />
            {children}
        </ReactLenis>
    );
}
