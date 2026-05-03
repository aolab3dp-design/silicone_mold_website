"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "Какие материалы вы используете?",
    a: "Пищевые платиновые и технические оловянные силиконы мировых брендов. Все материалы имеют сертификаты безопасности и проверены на производстве.",
  },
  {
    q: "Какая точность мастер-моделей?",
    a: "Печать ведётся на 16K принтерах с точностью до 0.05 мм. Это позволяет передавать мельчайшие детали рельефа и получать изделия с идеальной поверхностью.",
  },
  {
    q: "Есть ли доставка?",
    a: "Да, работаем по всему Казахстану и СНГ. Отправляем через надёжных транспортных партнёров с упаковкой, защищающей формы в пути.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 lg:py-24 bg-[#FAF9F6]">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-xs font-medium tracking-[0.2em] text-[#3D2B1F]/80 uppercase mb-6">Ответы на вопросы</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-[#3D2B1F] text-balance leading-tight">
            Часто задаваемые<br /><span className="text-[#8B7D75]">вопросы</span>
          </h2>
        </div>

        <div className="divide-y divide-[#3D2B1F]/10">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i}>
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-6 py-6 text-left cursor-pointer group"
                >
                  <span className={`text-base font-medium tracking-tight transition-colors duration-200 ${isOpen ? "text-[#A34343]" : "text-[#3D2B1F] group-hover:text-[#A34343]"}`}>
                    {faq.q}
                  </span>
                  <span className={`shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300 ${isOpen ? "border-[#A34343] text-[#A34343]" : "border-[#3D2B1F]/20 text-[#3D2B1F]/40 group-hover:border-[#A34343]/40 group-hover:text-[#A34343]/60"}`}>
                    {isOpen ? <Minus strokeWidth={1.5} className="w-3.5 h-3.5" /> : <Plus strokeWidth={1.5} className="w-3.5 h-3.5" />}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 text-sm text-[#3D2B1F]/70 leading-relaxed tracking-wide">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
