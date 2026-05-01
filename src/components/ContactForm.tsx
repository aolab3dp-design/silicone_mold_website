'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', contact: '', description: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const { error } = await supabase
        .from('leads')
        .insert([{
          name: formData.name,
          contact: formData.contact,
          description: formData.description
        }]);

      if (error) throw error;

      setStatus('success');
      setFormData({ name: '', contact: '', description: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message || 'Произошла ошибка при отправке.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 bg-[#FAF9F6] rounded-[2rem] p-8 lg:p-10 shadow-[0_8px_30px_rgba(44,30,22,0.06)]">
      {/* Name */}
      <div className="space-y-2">
        <label htmlFor="name" className="block text-sm font-medium text-[#3D2B1F] tracking-wide">
          Имя
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full px-5 py-4 rounded-2xl bg-white border-0 text-[#3D2B1F] placeholder:text-[#8B7D75] focus:outline-none focus:ring-2 focus:ring-[#A34343]/20 transition-all shadow-[0_4px_20px_rgba(44,30,22,0.04)]"
          placeholder="Ваше имя"
        />
      </div>

      {/* Contact */}
      <div className="space-y-2">
        <label htmlFor="contact" className="block text-sm font-medium text-[#3D2B1F] tracking-wide">
          Telegram / Телефон
        </label>
        <input
          type="text"
          id="contact"
          name="contact"
          required
          value={formData.contact}
          onChange={handleChange}
          className="w-full px-5 py-4 rounded-2xl bg-white border-0 text-[#3D2B1F] placeholder:text-[#8B7D75] focus:outline-none focus:ring-2 focus:ring-[#A34343]/20 transition-all shadow-[0_4px_20px_rgba(44,30,22,0.04)]"
          placeholder="Telegram или WhatsApp"
        />
      </div>


      {/* Description */}
      <div className="space-y-2">
        <label htmlFor="description" className="block text-sm font-medium text-[#3D2B1F] tracking-wide">
          Описание проекта
        </label>
        <textarea
          id="description"
          name="description"
          required
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className="w-full px-5 py-4 rounded-2xl bg-white border-0 text-[#3D2B1F] placeholder:text-[#8B7D75] focus:outline-none focus:ring-2 focus:ring-[#A34343]/20 transition-all resize-none shadow-[0_4px_20px_rgba(44,30,22,0.04)]"
          placeholder="Опишите задачу (размеры, тираж, материал заливки)..."
        />
      </div>

      {/* Error */}
      {status === 'error' && (
        <div className="flex items-center gap-3 text-red-700 bg-red-50 border border-red-100 p-4 rounded-2xl">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span className="text-sm">{errorMessage}</span>
        </div>
      )}

      {/* Success */}
      {status === 'success' && (
        <div className="flex items-center gap-3 text-emerald-700 bg-emerald-50 border border-emerald-100 p-4 rounded-2xl">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          <span className="text-sm">Заявка успешно отправлена! Мы скоро свяжемся с вами.</span>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'loading' || status === 'success'}
        className="w-full bg-[#A34343] text-white border-[1.5px] border-[#A34343] hover:bg-transparent hover:text-[#A34343] font-semibold py-4 px-10 rounded-[2rem] flex items-center justify-center gap-2 transition-all duration-500 ease-out shadow-none cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-[#A34343] disabled:hover:text-white"
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Отправка...
          </>
        ) : status === 'success' ? (
          <>
            <CheckCircle2 className="w-5 h-5" />
            Отправлено
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            Отправить запрос
          </>
        )}
      </button>

      <p className="text-xs text-[#8B7D75] text-center tracking-wide">
        Отправляя форму, вы соглашаетесь с политикой конфиденциальности.
      </p>
    </form>
  );
}
