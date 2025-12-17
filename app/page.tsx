"use client";

import { VoidBackground } from "@/components/system/VoidBackground";
import { LivingCanvas } from "@/components/system/LivingCanvas";
import { Hero } from "@/components/sections/Hero";
import { Highlights } from "@/components/sections/Highlights";
import { Work } from "@/components/sections/Work";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";

export default function Page() {
  return (
    <main className="relative min-h-screen overflow-x-hidden selection:bg-indigo-500/30">
      <VoidBackground />
      <LivingCanvas />

      <div className="relative z-10">
        <Hero />
        <Highlights />
        <Work />
        <About />
        <Contact />
      </div>

      {/* Footer Copyright */}
      <footer className="relative z-10 py-8 text-center text-xs text-white/30 font-mono uppercase tracking-widest">
        &copy; {new Date().getFullYear()} Kesra. Engineered in Dubai.
      </footer>
    </main>
  );
}
