"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Lightbulb, Box, Printer, CheckCircle } from "lucide-react";

const steps = [
  { icon: Lightbulb, title: "Анализ", description: "Изучаем задачу, размеры изделия и подбираем оптимальную жесткость силикона." },
  { icon: Box, title: "Проектирование", description: "Создаем 3D-модель и согласовываем с вами каждую деталь до запуска в печать." },
  { icon: Printer, title: "Прототип", description: "Выращиваем мастер-модель с точностью до 0.05 мм и доводим поверхность до эталона." },
  { icon: CheckCircle, title: "Литье", description: "Заливаем силикон в вакуумной камере, тестируем молд и бережно отправляем вам." },
];

export default function ProcessSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="process" className="py-20 lg:py-24 bg-[#FAF9F6]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="text-center mb-20">
          <p className="text-xs font-medium tracking-[0.2em] text-[#3D2B1F]/80 uppercase mb-6">АЛГОРИТМ РАБОТЫ</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-[#3D2B1F] text-balance leading-tight">
            От идеи<br /><span className="text-[#8B7D75]">до готового молда</span>
          </h2>
          <p className="mt-6 text-sm text-[#3D2B1F]/80 leading-relaxed max-w-xl mx-auto tracking-wide">
            Прозрачный алгоритм, где вы контролируете каждый ключевой этап.
          </p>
        </motion.div>

        <div className="relative mt-16 max-w-2xl mx-auto">
          <motion.div initial={{ scaleY: 0 }} animate={isInView ? { scaleY: 1 } : {}} transition={{ duration: 1.2, delay: 0.5 }} className="absolute left-[39px] top-0 bottom-0 w-px bg-gradient-to-b from-[#EAE6E1] via-[#EAE6E1] to-transparent origin-top" />
          <div className="flex flex-col gap-12 relative z-10">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div key={step.title} initial={{ opacity: 0, x: -30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }} className="flex gap-8 items-start">
                  <motion.div initial={{ scale: 0.8 }} animate={isInView ? { scale: 1 } : {}} transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }} className="relative shrink-0">
                    <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-[0_8px_30px_rgba(44,30,22,0.06)] relative z-10">
                      <Icon strokeWidth={1.2} className="w-8 h-8 text-[#A34343]" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-[#A34343] text-white text-xs font-semibold flex items-center justify-center shadow-[0_4px_12px_rgba(163,67,67,0.3)] z-20">
                      {index + 1}
                    </div>
                  </motion.div>
                  <div className="pt-5">
                    <h3 className="text-lg font-semibold text-[#3D2B1F] mb-2 tracking-tight">{step.title}</h3>
                    <p className="text-sm text-[#3D2B1F]/80 leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
