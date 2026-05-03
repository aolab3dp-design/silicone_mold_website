"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Услуги", href: "/#services" },
  { name: "Применение", href: "/#industries" },
  { name: "Процесс", href: "/#process" },
  { name: "FAQ", href: "/#faq" },
  { name: "О нас", href: "/about" },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-4 pt-4"
    >
      <nav className={`mx-auto max-w-5xl transition-all duration-700 ${isScrolled ? "bg-white/80 backdrop-blur-xl shadow-[0_8px_30px_rgba(44,30,22,0.06)] rounded-full px-6" : "bg-transparent px-2"}`}>
        <div className="flex h-16 items-center justify-between">
          <a href="#" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#A34343] rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(163,67,67,0.2)]">
              <span className="text-white font-semibold text-lg">M</span>
            </div>
            <span className="text-lg font-medium tracking-wide text-[#3D2B1F]">MoldMaster</span>
          </a>

          <div className="hidden md:flex items-center">
            <div className="flex items-center gap-1 bg-[#F5F4F1]/60 rounded-full px-2 py-1.5">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href}
                  className="text-sm font-medium text-[#3D2B1F]/80 hover:text-[#3D2B1F] hover:bg-white/80 px-4 py-2 rounded-full transition-all duration-300">
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          <div className="hidden md:block">
            <Button asChild className="bg-[#A34343] text-white border-[1.5px] border-[#A34343] hover:bg-transparent hover:text-[#A34343] rounded-[2rem] px-6 h-10 text-sm shadow-none cursor-pointer transition-all duration-500 ease-out">
              <a href="#contact">Рассчитать проект</a>
            </Button>
          </div>

          <button className="md:hidden p-2 rounded-full hover:bg-[#F5F4F1]/60 transition-colors" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="w-5 h-5 text-[#3D2B1F]" /> : <Menu className="w-5 h-5 text-[#3D2B1F]" />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="md:hidden py-6">
            <div className="flex flex-col gap-2 bg-white rounded-[2rem] p-4 shadow-[0_8px_30px_rgba(44,30,22,0.06)]">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href}
                  className="text-base font-medium text-[#5A4A42] hover:text-[#3D2B1F] hover:bg-[#F5F4F1]/60 px-4 py-3 rounded-[2rem] transition-all"
                  onClick={() => setIsMobileMenuOpen(false)}>
                  {link.name}
                </a>
              ))}
              <Button asChild className="bg-[#A34343] text-white border-[1.5px] border-[#A34343] hover:bg-transparent hover:text-[#A34343] rounded-[2rem] mt-2 shadow-none cursor-pointer transition-all duration-500 ease-out">
                <a href="#contact">Рассчитать проект</a>
              </Button>
            </div>
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
}
