import { dbRequest } from "@/lib/supabase-rest";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const email = ((await request.json()) as { email?: string }).email?.trim().toLocaleLowerCase("el") ?? "";
    if (!emailPattern.test(email) || email.length > 254) return Response.json({ error: "Γράψε μια έγκυρη διεύθυνση email." }, { status: 400 });
    await dbRequest("newsletter_subscribers", { on_conflict: "email" }, { method: "POST", prefer: "resolution=merge-duplicates,return=minimal", body: JSON.stringify([{ email, status: "pending", consent_text: "Επιθυμώ να λαμβάνω το πρωινό briefing του Ελλάδα Τώρα και μπορώ να διαγραφώ οποτεδήποτε." }]) });
    return Response.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error("newsletter_signup_failed", error);
    return Response.json({ error: "Η εγγραφή δεν ολοκληρώθηκε. Δοκίμασε ξανά σε λίγο." }, { status: 500 });
  }
}
