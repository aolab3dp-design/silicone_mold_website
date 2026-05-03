import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "О нас — MoldMaster",
  description: "Инженерный подход к литью силикона. Мастерская по разработке мастер-моделей и тиражированию силиконовых форм.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#FAF9F6]">
      {/* Header */}
      <div className="border-b border-[#3D2B1F]/[0.06]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#A34343] rounded-full flex items-center justify-center shadow-[0_4px_15px_rgba(163,67,67,0.2)]">
              <span className="text-white font-semibold">M</span>
            </div>
            <span className="text-base font-medium tracking-wide text-[#3D2B1F]">MoldMaster</span>
          </div>
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-medium text-[#3D2B1F]/60 hover:text-[#3D2B1F] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            На главную
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="py-24 lg:py-32 bg-[#FAF9F6]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-medium tracking-[0.2em] text-[#A34343] uppercase mb-6">О мастерской</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-[#3D2B1F] leading-[1.1] mb-8">
              Инженерный подход<br />
              <span className="text-[#8B7D75]">к литью</span>
            </h1>
            <p className="text-base text-[#3D2B1F]/70 leading-relaxed max-w-2xl tracking-wide">
              MoldMaster — это мастерская, где инженерное мышление встречается с ремеслом. Мы занимаемся разработкой мастер-моделей и тиражированием силиконовых форм для кондитеров, дизайнеров, ювелиров и производственных предприятий. Печать ведётся на 16K принтерах Saturn 4 Ultra и Bambu A1 с точностью до 0.05 мм. Используем только сертифицированные пищевые платиновые и технические оловянные силиконы мировых брендов. Работаем по всему Казахстану и СНГ.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-24 bg-[#F2F1E9]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <p className="text-xs font-medium tracking-[0.2em] text-[#3D2B1F]/80 uppercase mb-6">Начнём работу</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-[#3D2B1F] text-balance leading-tight mb-6">
            Готовы обсудить<br /><span className="text-[#8B7D75]">ваш проект?</span>
          </h2>
          <p className="text-sm text-[#3D2B1F]/60 mb-10 tracking-wide max-w-md mx-auto">
            Оставьте заявку на главной странице или свяжитесь с нами напрямую.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center h-12 px-8 bg-[#A34343] text-white text-sm font-semibold rounded-[2rem] border-[1.5px] border-[#A34343] hover:bg-transparent hover:text-[#A34343] transition-all duration-500 ease-out"
            >
              Оставить заявку
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 h-12 px-8 text-sm font-medium text-[#3D2B1F]/70 hover:text-[#3D2B1F] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Вернуться на главную
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
