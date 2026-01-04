import { LiquidBackground } from "@/components/liquid/LiquidBackground";
import { GlassCard } from "@/components/liquid/GlassCard";

export default function GlassPage() {
    return (
        <main className="relative h-[100dvh] w-full overflow-hidden bg-black flex items-center justify-center">
            {/* Background Layer */}
            <LiquidBackground />

            {/* Foreground Content */}
            <div className="perspective-[2000px] z-10 flex items-center justify-center p-4">
                <GlassCard />
            </div>
        </main>
    );
}
