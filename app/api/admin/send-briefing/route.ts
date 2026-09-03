import { isAdmin } from "@/lib/admin";
import { sendMorningBriefing } from "@/lib/newsletter-dispatch";

export async function POST() {
  if (!(await isAdmin())) return Response.json({ error: "Δεν επιτρέπεται." }, { status: 403 });
  try {
    return Response.json({ ok: true, ...(await sendMorningBriefing()) });
  } catch (error) {
    const message = error instanceof Error && error.message === "NEWSLETTER_NOT_CONFIGURED"
      ? "Χρειάζεται σύνδεση λογαριασμού αποστολής email."
      : "Η αποστολή δεν ολοκληρώθηκε.";
    return Response.json({ error: message }, { status: 424 });
  }
}
