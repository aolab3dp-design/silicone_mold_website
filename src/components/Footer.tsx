"use client";

export default function Footer() {
  return (
    <footer className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          
          {/* Column 1 (О нас) */}
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#A34343] rounded-full flex items-center justify-center shadow-[0_4px_15px_rgba(163,67,67,0.2)]">
                <span className="text-white font-semibold text-lg">M</span>
              </div>
              <span className="text-lg font-semibold tracking-wide text-[#3D2B1F]">MoldMaster</span>
            </div>
            <p className="text-[#3D2B1F]/60 text-sm leading-relaxed max-w-xs tracking-wide">
              Инженерная разработка мастер-моделей и тиражирование силиконовых форм для вашего бизнеса.
            </p>
          </div>

          {/* Column 2 (Навигация) */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-[#3D2B1F] mb-6">Меню</h4>
            <ul className="space-y-3">
              <li><a href="/#services" className="text-[#3D2B1F]/60 hover:text-[#3D2B1F] text-sm transition-colors tracking-wide">Наши услуги</a></li>
              <li><a href="/#industries" className="text-[#3D2B1F]/60 hover:text-[#3D2B1F] text-sm transition-colors tracking-wide">Сферы применения</a></li>
              <li><a href="/#process" className="text-[#3D2B1F]/60 hover:text-[#3D2B1F] text-sm transition-colors tracking-wide">Процесс работы</a></li>
              <li><a href="/#faq" className="text-[#3D2B1F]/60 hover:text-[#3D2B1F] text-sm transition-colors tracking-wide">FAQ</a></li>
              <li><a href="/about" className="text-[#3D2B1F]/60 hover:text-[#3D2B1F] text-sm transition-colors tracking-wide">О нас</a></li>
              <li><a href="/#contact" className="text-[#3D2B1F]/60 hover:text-[#3D2B1F] text-sm transition-colors tracking-wide">Оставить заявку</a></li>
            </ul>
          </div>

          {/* Column 3 (Контакты) */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-[#3D2B1F] mb-6">Связь</h4>
            <ul className="space-y-3 mb-6">
              <li><a href="#" className="text-[#3D2B1F]/60 hover:text-[#3D2B1F] text-sm transition-colors tracking-wide">Telegram</a></li>
              <li><a href="#" className="text-[#3D2B1F]/60 hover:text-[#3D2B1F] text-sm transition-colors tracking-wide">WhatsApp</a></li>
            </ul>
            <p className="text-[#3D2B1F]/60 text-sm tracking-wide">Алматы, Казахстан</p>
          </div>

        </div>

        {/* Bottom line (Copyright) */}
        <div className="mt-16 pt-8 border-t border-[#F5F4F1] flex justify-center">
          <p className="text-[#3D2B1F]/60 text-sm tracking-wide">© 2026 MoldMaster. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}
