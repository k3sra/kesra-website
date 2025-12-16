"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function EnterPortal({
  children,
}: {
  children: React.ReactNode;
}) {
  const [entering, setEntering] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setEntering(false), 1400);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <AnimatePresence>
        {entering && (
          <motion.div
            className="fixed inset-0 z-[9999] grid place-items-center bg-black"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative h-[320px] w-[320px]">
              <div className="portal-ring" aria-hidden />
              <div className="portal-ring portal-ring-2" aria-hidden />
              <div className="portal-ring portal-ring-3" aria-hidden />

              <div className="absolute inset-0 grid place-items-center">
                <motion.div
                  className="text-center"
                  initial={{ scale: 0.96, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.55, ease: "easeOut" }}
                >
                  <div className="text-[12px] tracking-[0.42em] text-white/75">
                    ENTERING
                  </div>
                  <div className="mt-2 text-[44px] font-semibold tracking-[-0.03em] text-white">
                    kesra.lol
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {children}
    </>
  );
}
