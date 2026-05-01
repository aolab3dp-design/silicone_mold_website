import { getAdminSupabase } from '@/lib/supabaseClient';
import { Layers, Calendar, User, Phone, MessageSquare, CheckCircle } from 'lucide-react';

export const dynamic = 'force-dynamic'; // Prevent caching so we always see the latest leads

export default async function AdminPage() {
  const supabase = getAdminSupabase();
  
  const { data: leads, error } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex items-center justify-between mb-8 pb-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="bg-gray-900 p-2 rounded-xl">
              <Layers className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Админ-панель</h1>
              <p className="text-sm text-gray-500">Управление заявками МолдМастер</p>
            </div>
          </div>
          <div className="bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100 text-sm font-medium text-gray-600">
            Всего заявок: {leads?.length || 0}
          </div>
        </header>

        {error ? (
          <div className="bg-red-50 text-red-600 p-6 rounded-2xl border border-red-100">
            <h2 className="font-bold mb-2">Ошибка при загрузке заявок</h2>
            <p className="text-sm opacity-90">{error.message}</p>
          </div>
        ) : !leads || leads.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center border border-gray-100 shadow-sm">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-gray-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Заявок пока нет</h3>
            <p className="text-gray-500">Новые заявки появятся здесь после отправки формы на сайте.</p>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-100">
                    <th className="py-4 px-6 font-medium text-gray-500 text-sm">Дата</th>
                    <th className="py-4 px-6 font-medium text-gray-500 text-sm">Имя</th>
                    <th className="py-4 px-6 font-medium text-gray-500 text-sm">Контакт</th>
                    <th className="py-4 px-6 font-medium text-gray-500 text-sm">Описание</th>
                    <th className="py-4 px-6 font-medium text-gray-500 text-sm">Статус</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 px-6 align-top">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          {new Date(lead.created_at).toLocaleDateString('ru-RU', {
                            day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
                          })}
                        </div>
                      </td>
                      <td className="py-4 px-6 align-top font-medium text-gray-900">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-400" />
                          {lead.name}
                        </div>
                      </td>
                      <td className="py-4 px-6 align-top text-gray-600">
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-gray-400" />
                          {lead.contact}
                        </div>
                      </td>
                      <td className="py-4 px-6 align-top">
                        <div className="flex gap-2">
                          <MessageSquare className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                          <p className="text-sm text-gray-600 max-w-md whitespace-pre-wrap">
                            {lead.description}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-6 align-top">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                          {lead.status === 'new' ? 'Новая' : lead.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
