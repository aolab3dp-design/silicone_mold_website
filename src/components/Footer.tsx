"use client";
import { motion } from "framer-motion";

const footerLinks = {
  services: [{ name: "3D Моделирование", href: "#services" }, { name: "Мастер-модели", href: "#services" }, { name: "Тиражирование", href: "#services" }],
  industries: [{ name: "Кондитеры", href: "#industries" }, { name: "Свечевары", href: "#industries" }, { name: "Ювелиры", href: "#industries" }, { name: "Декор", href: "#industries" }],
  company: [{ name: "О нас", href: "#" }, { name: "Процесс", href: "#process" }, { name: "Контакты", href: "#contact" }],
};

export default function Footer() {
  return (
    <footer className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-16">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#A34343] rounded-full flex items-center justify-center shadow-[0_4px_15px_rgba(163,67,67,0.2)]">
                <span className="text-white font-semibold text-lg">M</span>
              </div>
              <span className="text-lg font-semibold tracking-wide text-[#3D2B1F]">MoldMaster</span>
            </div>
            <p className="text-[#3D2B1F]/80 text-sm leading-relaxed max-w-xs tracking-wide">
              Бутик-студия силиконовых форм для тех, кто ценит качество и внимание к деталям.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-[#3D2B1F] mb-6">Услуги</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((l) => <li key={l.name}><a href={l.href} className="text-[#3D2B1F]/80 hover:text-[#3D2B1F] text-sm transition-colors tracking-wide">{l.name}</a></li>)}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-[#3D2B1F] mb-6">Для кого</h4>
            <ul className="space-y-3">
              {footerLinks.industries.map((l) => <li key={l.name}><a href={l.href} className="text-[#3D2B1F]/80 hover:text-[#3D2B1F] text-sm transition-colors tracking-wide">{l.name}</a></li>)}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-[#3D2B1F] mb-6">Компания</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((l) => <li key={l.name}><a href={l.href} className="text-[#3D2B1F]/80 hover:text-[#3D2B1F] text-sm transition-colors tracking-wide">{l.name}</a></li>)}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-[#F5F4F1]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[#8B7D75] text-sm tracking-wide">{new Date().getFullYear()} MoldMaster. Все права защищены.</p>
            <a href="#" className="text-[#8B7D75] hover:text-[#3D2B1F] text-sm transition-colors tracking-wide">Политика конфиденциальности</a>
          </div>
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }} viewport={{ once: true }} className="mt-16 overflow-hidden">
          <p className="text-[8vw] md:text-[6vw] font-bold tracking-tight text-[#F5F4F1] leading-none whitespace-nowrap text-center select-none">
            MOLDMASTER
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
