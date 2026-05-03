import { createClient } from "@supabase/supabase-js";

// Этот файл выполняется ТОЛЬКО на сервере, где доступен SUPABASE_SERVICE_ROLE_KEY
function getAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

// PATCH /api/admin/leads — обновить статус заявки
export async function PATCH(request: Request) {
  try {
    const { id, status } = await request.json();
    if (!id || !status) {
      return Response.json({ error: "id и status обязательны" }, { status: 400 });
    }

    const { error } = await getAdmin().from("leads").update({ status }).eq("id", id);
    if (error) return Response.json({ error: error.message }, { status: 500 });

    return Response.json({ success: true });
  } catch (e: any) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}

// DELETE /api/admin/leads — удалить заявку
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    if (!id) {
      return Response.json({ error: "id обязателен" }, { status: 400 });
    }

    const { error } = await getAdmin().from("leads").delete().eq("id", id);
    if (error) return Response.json({ error: error.message }, { status: 500 });

    return Response.json({ success: true });
  } catch (e: any) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}
