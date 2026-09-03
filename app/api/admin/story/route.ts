import { isAdmin } from "@/lib/admin";
import { dbRequest } from "@/lib/supabase-rest";

export async function POST(request: Request) {
  if (!(await isAdmin())) return Response.json({ error: "Δεν επιτρέπεται." }, { status: 403 });
  const payload = await request.json() as { slug?: string; status?: string };
  const status = payload.status === "hidden" ? "hidden" : payload.status === "published" ? "published" : null;
  if (!payload.slug || !status) return Response.json({ error: "Μη έγκυρα δεδομένα." }, { status: 400 });
  try {
    await dbRequest("news_items", { slug: `eq.${payload.slug}` }, { method: "PATCH", prefer: "return=minimal", body: JSON.stringify({ status }) });
    return Response.json({ ok: true, status });
  } catch { return Response.json({ error: "Η αλλαγή δεν αποθηκεύτηκε." }, { status: 500 }); }
}
