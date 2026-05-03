"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PenTool, Cpu, Factory } from "lucide-react";

const services = [
  { id: "cad", icon: PenTool, title: "3D-моделирование", headline: "Разработка 3D-моделей (CAD)", description: "Переводим ваши эскизы и чертежи в точную цифровую модель. Учитываем усадки материалов, углы разъема и технологические особенности для идеального извлечения из формы.", features: ["Высокоточное 3D-сканирование", "Параметрическое моделирование", "Проектирование под производство", "Итеративная доработка"] },
  { id: "prototyping", icon: Cpu, title: "Мастер-модели", headline: "Высокоточная 3D-печать", description: "Выращиваем эталонные модели на профессиональных фотополимерных принтерах. Ручная шлифовка и доводка исключают появление «слоистости» на финальном изделии.", features: ["Фотополимерная печать", "Ручная доводка поверхности", "Проверка размеров", "Быстрые итерации"] },
  { id: "production", icon: Factory, title: "Литье", headline: "Вакуумное литье силикона", description: "Создаем тиражные молды из сертифицированных пищевых и технических силиконов разной жесткости (по Шору). Обязательное вакуумирование исключает микропузыри.", features: ["Пищевой силикон", "Выбор жёсткости материала", "Многоместные формы", "Контроль качества"] },
];

export default function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="py-20 lg:py-24 bg-[#FAF9F6]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="text-center mb-20">
          <p className="text-xs font-medium tracking-[0.2em] text-[#3D2B1F]/80 uppercase mb-6">НАШИ КОМПЕТЕНЦИИ</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-[#3D2B1F] text-balance leading-tight">
            Полный цикл разработки<br /><span className="text-[#8B7D75]">под ключ</span>
          </h2>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}>
          <Tabs defaultValue="cad" className="w-full">
            <div className="flex justify-center w-full">
              <TabsList className="inline-flex w-fit bg-white/60 backdrop-blur-sm rounded-full h-auto py-1.5 px-3 gap-2 shadow-[0_8px_30px_rgba(44,30,22,0.04)]">
                {services.map((service) => {
                  const Icon = service.icon;
                  return (
                    <TabsTrigger key={service.id} value={service.id}
                      className="rounded-full bg-transparent px-5 py-2.5 text-sm font-medium text-[#3D2B1F]/70 data-[state=active]:text-[#A34343] data-[state=active]:font-semibold hover:text-[#3D2B1F] transition-all duration-300 flex items-center gap-2 data-[state=active]:bg-transparent data-[state=active]:shadow-none cursor-pointer">
                      <Icon strokeWidth={1.5} className="w-4 h-4" />
                      <span className="hidden sm:inline">{service.title}</span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </div>

            {services.map((service) => {
              const Icon = service.icon;
              return (
                <TabsContent key={service.id} value={service.id} className="mt-16">
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                      <div className="flex items-start gap-4 mb-6">
                        <div className="mt-1 shrink-0">
                          <Icon strokeWidth={1.2} className="w-8 h-8 text-[#A34343]" />
                        </div>
                        <h3 className="text-2xl lg:text-3xl font-semibold text-[#3D2B1F] tracking-tight">{service.headline}</h3>
                      </div>
                      <p className="text-sm text-[#3D2B1F]/80 leading-relaxed mb-8 tracking-wide">{service.description}</p>
                      <ul className="space-y-3">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-4 text-[#3D2B1F]/80">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#A34343]" />
                            <span className="tracking-wide text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-white rounded-[2rem] aspect-[4/3] flex items-center justify-center overflow-hidden shadow-[0_8px_30px_rgba(44,30,22,0.06)]">
                      <div className="relative w-full h-full p-12">
                        <div className="absolute inset-0 bg-[#FAF9F6]" />
                        <div className="relative h-full flex items-center justify-center">
                          <motion.div animate={{ scale: [1, 1.03, 1], rotate: [0, 2, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
                            <Icon strokeWidth={1.2} className="w-32 h-32 text-[#EAE6E1]" />
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </TabsContent>
              );
            })}
          </Tabs>
        </motion.div>
      </div>
    </section>
  );
}
