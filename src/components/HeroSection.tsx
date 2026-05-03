"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="h-[100dvh] flex items-center pt-20 bg-[#FAF9F6]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }} className="order-2 lg:order-1">

            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }} className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-[#3D2B1F] leading-[1.1] text-balance">
              Инженерная точность<br />
              <span className="text-[#8B7D75]">в каждой форме</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }} className="mt-8 text-sm text-[#3D2B1F]/80 leading-relaxed max-w-lg tracking-wide">
              Полный цикл производства: от 3D-модели до тиражного силиконового молда для вашего бизнеса. Пищевые и технические силиконы, вакуумирование и гарантия идеальной поверхности.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7 }} className="mt-12 flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-[#A34343] text-white border-[1.5px] border-[#A34343] hover:bg-transparent hover:text-[#A34343] rounded-[2rem] px-6 h-12 text-sm shadow-none cursor-pointer transition-all duration-500 ease-out">
                <a href="#contact">Оставить заявку</a>
              </Button>
            </motion.div>

          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }} className="order-1 lg:order-2">
            <div className="relative w-full max-w-lg mx-auto aspect-square bg-gradient-to-br from-[#F5F4F1] via-white to-[#FAF9F6] rounded-[3rem] overflow-hidden shadow-[0_30px_80px_rgba(44,30,22,0.06)]">
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/60 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center p-12">
                <div className="relative w-full h-full flex items-center justify-center">
                  <motion.div animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="absolute w-72 h-72 md:w-80 md:h-80 bg-[#EAE6E1]/50 rounded-full blur-xl" />
                  <motion.div animate={{ y: [-8, 8, -8], rotate: [0, 3, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} className="absolute w-56 h-56 md:w-64 md:h-64 bg-[#F5F4F1] rounded-[3rem] shadow-[0_20px_60px_rgba(44,30,22,0.08)]" />
                  <motion.div animate={{ y: [6, -6, 6], x: [-4, 4, -4] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }} className="absolute w-40 h-40 md:w-48 md:h-48 bg-[#FAF9F6] rounded-[2.5rem] shadow-[0_15px_50px_rgba(44,30,22,0.06)] translate-x-8 translate-y-8" />
                  <motion.div animate={{ scale: [1, 1.03, 1] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="relative z-10 w-24 h-24 md:w-28 md:h-28 bg-[#EAE6E1] rounded-[2rem] shadow-[0_4px_20px_rgba(44,30,22,0.08)]" />
                </div>
              </div>
              <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(circle_at_50%_50%,#3D2B1F_1px,transparent_1px)] bg-[length:32px_32px]" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
