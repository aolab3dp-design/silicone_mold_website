"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Cake, Flame, Gem, Box } from "lucide-react";

const industries = [
  { icon: Cake, title: "Кондитеры и Шоколатье", description: "Эксклюзивные молды для шоколада, леденцов и мастики из безопасного пищевого силикона на платиновом катализаторе. Сохраняем идеальный глянец.", size: "large", span: "lg:col-span-2 lg:row-span-2" },
  { icon: Flame, title: "Предметный дизайн", description: "Износостойкие формы для серийной заливки гипса, архитектурного бетона и пластика.", size: "small", span: "lg:col-span-1 lg:row-span-1" },
  { icon: Gem, title: "Свечи и Мыло", description: "Сложные объемные формы с обратными углами и правильными разрезами для легкого извлечения воска.", size: "small", span: "lg:col-span-1 lg:row-span-1" },
  { icon: Box, title: "Ювелирное дело", description: "Мастер-модели для литья по выплавляемым моделям и формы для ювелирной эпоксидной смолы с микродетализацией.", size: "medium", span: "lg:col-span-3 lg:row-span-1" },
];

function IndustryCard({ industry, index }: { industry: typeof industries[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const Icon = industry.icon;
  const isLarge = industry.size === "large";

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className={`${industry.span} group relative bg-white rounded-[2rem] overflow-hidden transition-all duration-500 hover:scale-[1.02] cursor-pointer shadow-[0_8px_30px_rgba(44,30,22,0.06)] hover:shadow-[0_20px_50px_rgba(44,30,22,0.1)]`}>
      <div className={`p-8 ${isLarge ? "lg:p-10" : "lg:p-8"} h-full flex flex-col justify-between ${isLarge ? "min-h-[320px] lg:min-h-[360px]" : "min-h-[180px]"}`}>
        <div className="mb-4">
          <Icon strokeWidth={1.2} className={`${isLarge ? "w-10 h-10" : "w-8 h-8"} text-[#3D2B1F] group-hover:text-[#A34343] transition-colors duration-500`} />
        </div>
        <div className="mt-auto">
          <h3 className={`${isLarge ? "text-2xl lg:text-3xl" : "text-xl"} font-semibold text-[#3D2B1F] mb-3 tracking-tight`}>{industry.title}</h3>
          <p className={`text-[#3D2B1F]/80 leading-relaxed tracking-wide text-sm ${isLarge ? "max-w-md" : ""}`}>{industry.description}</p>
        </div>
        <motion.div className={`absolute ${isLarge ? "-bottom-12 -right-12 w-56 h-56" : "-bottom-6 -right-6 w-28 h-28"} opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-500`}>
          <Icon strokeWidth={1.2} className="w-full h-full" />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function IndustriesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <section id="industries" className="py-20 lg:py-24 bg-[#FAF9F6]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="text-center mb-20">
          <p className="text-xs font-medium tracking-[0.2em] text-[#3D2B1F]/80 uppercase mb-6">СФЕРЫ ПРИМЕНЕНИЯ</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-[#3D2B1F] text-balance leading-tight">
            Решения для крафтовых<br /><span className="text-[#8B7D75]">и промышленных задач</span>
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-3 auto-rows-fr gap-6">
          {industries.map((industry, index) => (
            <IndustryCard key={industry.title} industry={industry} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
