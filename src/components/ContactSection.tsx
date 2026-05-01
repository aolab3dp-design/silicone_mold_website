"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CheckCircle } from "lucide-react";
import ContactForm from "@/components/ContactForm";

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="py-20 lg:py-24 bg-[#F5F4F1]/50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
            <p className="text-xs font-medium tracking-[0.2em] text-[#3D2B1F]/80 uppercase mb-6">Контакты</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-[#3D2B1F] text-balance leading-tight">
              Готовы обсудить<br /><span className="text-[#8B7D75]">ваш проект?</span>
            </h2>
            <p className="mt-8 text-sm text-[#3D2B1F]/80 leading-relaxed max-w-md tracking-wide">
              Расскажите о своей идее. Мы свяжемся с вами, проконсультируем по материалам и рассчитаем точную стоимость производства.
            </p>
            <div className="mt-14 space-y-6">
              {[
                { title: "Бесплатная консультация", subtitle: "Подбор материалов и технологий" },
                { title: "Быстрый расчет", subtitle: "Смета в течение 24 часов" },
                { title: "NDA", subtitle: "Полная конфиденциальность вашей идеи" },
              ].map((item) => (
                <div key={item.title} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-[0_8px_30px_rgba(44,30,22,0.06)]">
                    <CheckCircle strokeWidth={1.2} className="w-5 h-5 text-[#A34343]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#3D2B1F] tracking-tight">{item.title}</p>
                    <p className="text-sm text-[#3D2B1F]/80">{item.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}>
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
