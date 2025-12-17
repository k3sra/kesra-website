export function VoidBackground() {
    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden bg-black selection:bg-indigo-500/30">
            {/* 1. Deep Atmosphere (Drifting) */}
            <div
                className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full mix-blend-screen opacity-[0.2] blur-[100px] animate-blob"
                style={{ background: "radial-gradient(circle, #2563eb 0%, transparent 70%)", animationDelay: "0s" }}
            />
            <div
                className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full mix-blend-screen opacity-[0.15] blur-[120px] animate-blob"
                style={{ background: "radial-gradient(circle, #4f46e5 0%, transparent 70%)", animationDelay: "4s" }}
            />
            <div
                className="absolute top-[40%] left-[30%] w-[50vw] h-[50vw] rounded-full mix-blend-screen opacity-[0.1] blur-[140px] animate-blob"
                style={{ background: "radial-gradient(circle, #8b5cf6 0%, transparent 70%)", animationDelay: "8s" }}
            />

            {/* 2. Starfield / Dust (Subtle Parallax feel) */}
            <div
                className="absolute inset-[-100%] w-[300%] h-[300%] animate-drift opacity-30"
                style={{
                    backgroundImage: `url("/noise.png")`, // Reusing noise as a base texture, but ideally this would be stars. 
                    // Let's stick to the "dust" feel with noise for now as specific star assets might not be available.
                    // Instead, let's create a quick CSS radial gradient pattern for "stars" if no asset exists.
                    background: "radial-gradient(1px 1px at 10% 10%, white 100%, transparent), radial-gradient(1px 1px at 20% 40%, white 100%, transparent), radial-gradient(2px 2px at 40% 60%, white 100%, transparent), radial-gradient(1px 1px at 70% 30%, white 100%, transparent)",
                    backgroundSize: "600px 600px"
                }}
            />

            {/* 3. Grain Overlay (Film grain) */}
            <div
                className="absolute inset-0 opacity-[0.05] mix-blend-overlay pointer-events-none"
                style={{ backgroundImage: `url("/noise.png")`, backgroundSize: "128px" }}
            />
        </div>
    );
}
