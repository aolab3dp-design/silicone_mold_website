import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder';

// Клиент для фронтенда (использует анонимный ключ)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Серверный клиент для /admin (использует service_role ключ)
export const getAdminSupabase = () => {
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder';
  return createClient(supabaseUrl, supabaseServiceKey);
};
