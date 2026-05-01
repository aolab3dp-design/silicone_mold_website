-- Скрипт создания базы данных для проекта МолдМастер

-- 1. Создание таблицы leads
CREATE TABLE IF NOT EXISTS public.leads (
    id uuid default gen_random_uuid() primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    name text not null,
    contact text not null,
    description text not null,
    status text default 'new'
);

-- 2. Включение Row Level Security (RLS)
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- 3. Создание политик безопасности

-- Разрешить всем (анонимным пользователям) вставлять новые заявки
CREATE POLICY "Allow anonymous insert" ON public.leads
    FOR INSERT
    TO public
    WITH CHECK (true);

-- Разрешить только авторизованным пользователям просматривать заявки
-- В рамках проекта /admin может получать данные, используя service_role ключ, который обходит RLS,
-- но для дополнительной безопасности мы также можем разрешить authenticated пользователям SELECT.
CREATE POLICY "Allow authenticated select" ON public.leads
    FOR SELECT
    TO authenticated
    USING (true);
