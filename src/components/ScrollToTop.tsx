"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="scroll-top"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          onClick={handleClick}
          aria-label="Наверх"
          className="fixed bottom-8 right-8 z-50 w-11 h-11 rounded-full bg-[#3D2B1F] text-white border-[1.5px] border-[#3D2B1F] hover:bg-transparent hover:text-[#3D2B1F] flex items-center justify-center shadow-[0_4px_20px_rgba(44,30,22,0.2)] transition-all duration-500 ease-out cursor-pointer"
        >
          <ArrowUp strokeWidth={1.5} className="w-4 h-4" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
