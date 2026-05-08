"use client";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Cake, Flame, Gem, Box, X } from "lucide-react";

const industries = [
  { 
    id: "confectionery",
    icon: Cake, 
    title: "Кондитеры и Шоколатье", 
    description: "Эксклюзивные молды для шоколада, леденцов и мастики из безопасного пищевого силикона на платиновом катализаторе. Сохраняем идеальный глянец.", 
    size: "large", 
    span: "lg:col-span-2 lg:row-span-2",
    modalDescription: "Создаем формы для конфет, шоколадных плиток и сложных 3D-фигур. Используем сертифицированный пищевой силикон, который не выделяет вредных веществ и выдерживает температуры до +250°C.",
    portfolio: [
      { image: "Мастер-модель плитки", type: "Силиконовая форма" },
      { image: "3D-модель логотипа", type: "Пищевой молд" },
      { image: "Форма для леденцов", type: "Силиконовая форма" },
      { image: "Модель сложной фигуры", type: "Тиражная форма" },
    ]
  },
  { 
    id: "design",
    icon: Flame, 
    title: "Предметный дизайн", 
    description: "Износостойкие формы для серийной заливки гипса, архитектурного бетона и пластика.", 
    size: "small", 
    span: "lg:col-span-1 lg:row-span-1",
    modalDescription: "Разрабатываем прочные силиконовые матрицы для литья кашпо, подносов и декора из гипса и бетона. Учитываем усадку материалов и делаем формы с увеличенным ресурсом тиражирования.",
    portfolio: [
      { image: "Мастер-модель кашпо", type: "Полиуретановая форма" },
      { image: "Форма для подноса", type: "Силиконовая форма" },
      { image: "3D-модель вазы", type: "Комплексная матрица" },
      { image: "Декор для интерьера", type: "Тиражная форма" },
    ]
  },
  { 
    id: "candles",
    icon: Gem, 
    title: "Свечи и Мыло", 
    description: "Сложные объемные формы с обратными углами и правильными разрезами для легкого извлечения воска.", 
    size: "small", 
    span: "lg:col-span-1 lg:row-span-1",
    modalDescription: "Специализируемся на формах со сложной геометрией. Проектируем правильные разрезы (замки), чтобы изделие легко вынималось без повреждений тонких деталей.",
    portfolio: [
      { image: "Мастер-модель свечи", type: "Силиконовая форма с разрезом" },
      { image: "Форма для мыла", type: "Многоместная форма" },
      { image: "3D-модель бюста", type: "Форма для воска" },
      { image: "Ботанический барельеф", type: "Силиконовая форма" },
    ]
  },
  { 
    id: "jewelry",
    icon: Box, 
    title: "Ювелирное дело", 
    description: "Мастер-модели для литья по выплавляемым моделям и формы для ювелирной эпоксидной смолы с микродетализацией.", 
    size: "medium", 
    span: "lg:col-span-3 lg:row-span-1",
    modalDescription: "Высокоточная 3D-печать выжигаемыми фотополимерами и создание молдов с микродетализацией для заливки ювелирной смолы.",
    portfolio: [
      { image: "Мастер-модель кольца", type: "Силиконовая форма" },
      { image: "3D-модель кулона", type: "Форма для смолы" },
      { image: "Элемент серег", type: "Ювелирный молд" },
      { image: "Сложный паттерн", type: "Матрица для литья" },
    ]
  },
];

function IndustryCard({ industry, index, onClick }: { industry: typeof industries[0]; index: number; onClick: () => void }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const Icon = industry.icon;
  const isLarge = industry.size === "large";

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      className={`${industry.span} group relative bg-[#FAF9F6] rounded-[2rem] overflow-hidden transition-all duration-500 hover:scale-[1.02] cursor-pointer shadow-[0_8px_30px_rgba(44,30,22,0.06)] hover:shadow-[0_20px_50px_rgba(44,30,22,0.1)]`}>
      <div className={`p-8 ${isLarge ? "lg:p-10" : "lg:p-8"} h-full flex flex-col justify-between ${isLarge ? "min-h-[320px] lg:min-h-[360px]" : "min-h-[180px]"}`}>
        <div className="mb-4">
          <Icon strokeWidth={1.2} className={`${isLarge ? "w-10 h-10" : "w-8 h-8"} text-[#3D2B1F] group-hover:text-[#A34343] transition-colors duration-500`} />
        </div>
        <div className="mt-auto">
          <h3 className={`${isLarge ? "text-2xl lg:text-3xl" : "text-xl"} font-semibold text-[#3D2B1F] mb-3 tracking-tight`}>{industry.title}</h3>
          <p className={`text-[#3D2B1F]/80 leading-relaxed tracking-wide text-sm ${isLarge ? "max-w-md" : ""}`}>{industry.description}</p>
        </div>
        
        {/* Hover Text */}
        <div className="mt-6 overflow-hidden">
          <p className="text-sm font-medium tracking-wide text-[#3D2B1F]/40 group-hover:text-[#A34343] transition-colors duration-300 flex items-center gap-1">
            Смотреть работы <span className="translate-x-0 group-hover:translate-x-1 transition-transform duration-300">→</span>
          </p>
        </div>

        <motion.div className={`absolute ${isLarge ? "-bottom-12 -right-12 w-56 h-56" : "-bottom-6 -right-6 w-28 h-28"} opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-500 pointer-events-none`}>
          <Icon strokeWidth={1.2} className="w-full h-full" />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function IndustriesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const [selectedIndustry, setSelectedIndustry] = useState<typeof industries[0] | null>(null);

  return (
    <section id="industries" className="py-20 lg:py-24 bg-[#F6F1E8] relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="text-center mb-20">
          <p className="text-xs font-medium tracking-[0.2em] text-[#3D2B1F]/80 uppercase mb-6">СФЕРЫ ПРИМЕНЕНИЯ</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-[#3D2B1F] text-balance leading-tight">
            Решения для крафтовых<br /><span className="text-[#8B7D75]">и промышленных задач</span>
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-3 auto-rows-fr gap-6">
          {industries.map((industry, index) => (
            <IndustryCard 
              key={industry.title} 
              industry={industry} 
              index={index} 
              onClick={() => setSelectedIndustry(industry)} 
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedIndustry && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setSelectedIndustry(null)}
              className="absolute inset-0 bg-[#3D2B1F]/40 backdrop-blur-md cursor-pointer"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-4xl bg-[#FAF9F6] rounded-[2.5rem] shadow-2xl overflow-hidden max-h-[90vh]"
            >
              {/* Inner scrollable area — scrollbar hidden */}
              <div
                className="overflow-y-auto max-h-[90vh] p-8 md:p-12 scrollbar-hide"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <p className="text-xs font-medium tracking-[0.2em] text-[#A34343] uppercase mb-3">Портфолио</p>
                    <h3 className="text-2xl md:text-3xl font-semibold text-[#3D2B1F] tracking-tight">{selectedIndustry.title}</h3>
                  </div>
                  <button 
                    onClick={() => setSelectedIndustry(null)}
                    className="p-2 rounded-full hover:bg-[#EAE6E1] transition-colors text-[#3D2B1F]/60 hover:text-[#3D2B1F] cursor-pointer"
                  >
                    <X strokeWidth={1.5} className="w-6 h-6" />
                  </button>
                </div>

                {/* Description */}
                <p className="text-sm text-[#3D2B1F]/80 leading-relaxed mb-10 max-w-2xl tracking-wide">
                  {selectedIndustry.modalDescription}
                </p>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {selectedIndustry.portfolio.map((item, idx) => (
                    <div key={idx} className="group cursor-pointer">
                      <div className="w-full aspect-[4/3] bg-[#EAE6E1] rounded-2xl overflow-hidden mb-4 relative flex items-center justify-center">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-50" />
                        <selectedIndustry.icon strokeWidth={1} className="w-12 h-12 text-[#3D2B1F]/20 group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <p className="font-medium text-[#3D2B1F] tracking-tight">{item.image}</p>
                      <p className="text-sm text-[#8B7D75] tracking-wide">{item.type}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
