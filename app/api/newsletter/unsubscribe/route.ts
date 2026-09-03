import { dbRequest } from "@/lib/supabase-rest";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const email = ((await request.json()) as { email?: string }).email?.trim().toLocaleLowerCase("el") ?? "";
    if (!emailPattern.test(email)) return Response.json({ error: "Γράψε ένα έγκυρο email." }, { status: 400 });
    await dbRequest("newsletter_subscribers", { email: `eq.${email}` }, { method: "PATCH", prefer: "return=minimal", body: JSON.stringify({ status: "unsubscribed" }) });
    return Response.json({ ok: true });
  } catch { return Response.json({ error: "Η διαγραφή δεν ολοκληρώθηκε." }, { status: 500 }); }
}
