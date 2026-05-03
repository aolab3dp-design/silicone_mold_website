"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { LogOut, Trash2, ChevronLeft, ChevronRight } from "lucide-react";

export default function AdminPage() {
  const [session, setSession] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [leads, setLeads] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Все");
  const [page, setPage] = useState(1);
  const [isFetchingLeads, setIsFetchingLeads] = useState(false);

  const itemsPerPage = 10;

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) fetchLeads();
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) fetchLeads();
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) setError(error.message);
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const fetchLeads = async () => {
    setIsFetchingLeads(true);
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setLeads(data);
    }
    setIsFetchingLeads(false);
  };

  // Маппинг статусов из БД (English) в отображаемые (Russian) и обратно
  const DB_TO_RU: Record<string, string> = {
    new: "Новая",
    in_progress: "В работе",
    done: "Завершена",
    // на случай если уже записаны русские
    "Новая": "Новая",
    "В работе": "В работе",
    "Завершена": "Завершена",
  };
  const RU_TO_DB: Record<string, string> = {
    "Новая": "new",
    "В работе": "in_progress",
    "Завершена": "done",
  };
  const normalizeStatus = (status: string | null): string =>
    DB_TO_RU[status ?? "new"] ?? "Новая";

  const updateStatus = async (id: string, newStatusRu: string) => {
    const dbValue = RU_TO_DB[newStatusRu] ?? "new";
    const res = await fetch("/api/admin/leads", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: dbValue }),
    });
    const data = await res.json();
    if (data.success) {
      setLeads((prev) =>
        prev.map((lead) => (lead.id === id ? { ...lead, status: dbValue } : lead))
      );
    } else {
      alert("Ошибка при обновлении статуса: " + (data.error ?? "неизвестная ошибка"));
    }
  };

  const deleteLead = async (id: string) => {
    if (window.confirm("Вы уверены, что хотите удалить эту заявку? Это действие нельзя отменить.")) {
      const res = await fetch("/api/admin/leads", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.success) {
        setLeads((prev) => prev.filter((lead) => lead.id !== id));
      } else {
        alert("Ошибка при удалении заявки: " + (data.error ?? "неизвестная ошибка"));
      }
    }
  };

  if (!session) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-[2rem] p-8 md:p-10 shadow-[0_8px_30px_rgba(44,30,22,0.06)]">
          <div className="flex items-center gap-3 mb-8 justify-center">
            <div className="w-10 h-10 bg-[#A34343] rounded-full flex items-center justify-center shadow-[0_4px_15px_rgba(163,67,67,0.2)]">
              <span className="text-white font-semibold text-lg">M</span>
            </div>
            <span className="text-xl font-semibold tracking-wide text-[#3D2B1F]">MoldMaster</span>
          </div>
          
          <h1 className="text-2xl font-semibold text-center text-[#3D2B1F] mb-8 tracking-tight">Вход в панель управления</h1>
          
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-[#3D2B1F]/80 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 bg-[#F5F4F1] border-none rounded-xl px-4 text-[#3D2B1F] focus:ring-2 focus:ring-[#A34343]/20 transition-all outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#3D2B1F]/80 mb-2">Пароль</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 bg-[#F5F4F1] border-none rounded-xl px-4 text-[#3D2B1F] focus:ring-2 focus:ring-[#A34343]/20 transition-all outline-none"
                required
              />
            </div>
            {error && <p className="text-[#A34343] text-sm text-center">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-[#3D2B1F] text-white rounded-xl font-medium mt-4 hover:bg-[#A34343] transition-colors duration-300 disabled:opacity-50"
            >
              {loading ? "Вход..." : "Войти"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Filter and Search Logic
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch = 
      (lead.name && lead.name.toLowerCase().includes(search.toLowerCase())) ||
      (lead.contact && lead.contact.toLowerCase().includes(search.toLowerCase()));
      
    const matchesFilter = filter === "Все" || normalizeStatus(lead.status) === filter;
    
    return matchesSearch && matchesFilter;
  });

  const paginatedLeads = filteredLeads.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  const totalPages = Math.ceil(filteredLeads.length / itemsPerPage);

  const stats = {
    total: leads.length,
    new: leads.filter(l => normalizeStatus(l.status) === "Новая").length,
    inProgress: leads.filter(l => normalizeStatus(l.status) === "В работе").length,
  };


  return (
    <div className="min-h-screen bg-[#FAF9F6] p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#A34343] rounded-full flex items-center justify-center shadow-[0_4px_15px_rgba(163,67,67,0.2)] shrink-0">
              <span className="text-white font-semibold text-xl">M</span>
            </div>
            <div>
              <p className="text-xs font-medium tracking-[0.18em] text-[#3D2B1F]/50 uppercase mb-0.5">MoldMaster</p>
              <h1 className="text-2xl sm:text-3xl font-semibold text-[#3D2B1F] tracking-tight leading-none">Панель управления</h1>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm font-medium text-[#3D2B1F]/50 hover:text-[#A34343] transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Выйти</span>
          </button>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          {[
            { label: "Всего заявок", value: stats.total, color: "text-[#3D2B1F]" },
            { label: "Новые", value: stats.new, color: "text-[#A34343]" },
            { label: "В работе", value: stats.inProgress, color: "text-[#8B7D75]" }
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(44,30,22,0.04)]">
              <p className="text-sm text-[#3D2B1F]/60 font-medium mb-2">{stat.label}</p>
              <p className={`text-3xl font-semibold tracking-tight ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <input 
            type="text" 
            placeholder="Поиск по имени или контакту..." 
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="flex-1 h-12 bg-white rounded-xl px-4 text-sm text-[#3D2B1F] shadow-sm outline-none focus:ring-2 focus:ring-[#A34343]/20"
          />
          <select 
            value={filter}
            onChange={(e) => { setFilter(e.target.value); setPage(1); }}
            className="h-12 bg-white rounded-xl px-4 text-sm text-[#3D2B1F] shadow-sm outline-none focus:ring-2 focus:ring-[#A34343]/20 sm:w-48 cursor-pointer"
          >
            {["Все", "Новая", "В работе", "Завершена"].map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(44,30,22,0.04)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-[#F5F4F1]/50 text-[#3D2B1F]/60 font-medium border-b border-[#F5F4F1]">
                <tr>
                  <th className="px-6 py-4">Дата</th>
                  <th className="px-6 py-4">Имя</th>
                  <th className="px-6 py-4">Контакт</th>
                  <th className="px-6 py-4">Описание</th>
                  <th className="px-6 py-4">Статус</th>
                  <th className="px-6 py-4 text-right">Действия</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F5F4F1]">
                {paginatedLeads.length > 0 ? (
                  paginatedLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-[#FAF9F6]/50 transition-colors">
                      <td className="px-6 py-4 text-[#3D2B1F]/80">
                        {new Date(lead.created_at).toLocaleDateString('ru-RU')}
                      </td>
                      <td className="px-6 py-4 font-medium text-[#3D2B1F]">{lead.name || "—"}</td>
                      <td className="px-6 py-4 text-[#3D2B1F]/80">{lead.contact || "—"}</td>
                      <td className="px-6 py-4 text-[#3D2B1F]/80 max-w-[240px] truncate" title={lead.description}>
                        {lead.description || "—"}
                      </td>
                      <td className="px-6 py-4">
                        <select 
                          value={normalizeStatus(lead.status)}
                          onChange={(e) => updateStatus(lead.id, e.target.value)}
                          className={`text-xs font-semibold px-3 py-1.5 rounded-full border-none outline-none cursor-pointer ${
                            normalizeStatus(lead.status) === "В работе" ? "bg-amber-100 text-amber-800" :
                            normalizeStatus(lead.status) === "Завершена" ? "bg-green-100 text-green-800" :
                            "bg-[#A34343]/10 text-[#A34343]"
                          }`}
                        >
                          <option value="Новая">Новая</option>
                          <option value="В работе">В работе</option>
                          <option value="Завершена">Завершена</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={() => deleteLead(lead.id)}
                          className="text-[#3D2B1F]/40 hover:text-red-500 transition-colors"
                          title="Удалить заявку"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-[#3D2B1F]/40">
                      {isFetchingLeads ? "Загрузка..." : "Заявки не найдены"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-[#F5F4F1]">
              <p className="text-sm text-[#3D2B1F]/60">
                Страница {page} из {totalPages} · {filteredLeads.length} заявок
              </p>
              <div className="flex gap-2">
                <button 
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="p-2 rounded-lg hover:bg-[#F5F4F1] disabled:opacity-30 transition-colors text-[#3D2B1F]"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="p-2 rounded-lg hover:bg-[#F5F4F1] disabled:opacity-30 transition-colors text-[#3D2B1F]"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
