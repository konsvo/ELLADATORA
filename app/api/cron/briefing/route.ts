import { sendMorningBriefing } from "@/lib/newsletter-dispatch";

async function run(request: Request) {
  const authorization = request.headers.get("authorization");
  if (!process.env.CRON_SECRET || authorization !== `Bearer ${process.env.CRON_SECRET}`) return Response.json({ error: "Δεν επιτρέπεται." }, { status: 403 });
  const url = new URL(request.url);
  const athensTime = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Athens", hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date());
  if (url.searchParams.get("force") !== "1" && athensTime !== "07:30") return Response.json({ ok: true, skipped: true, athensTime });
  try { return Response.json({ ok: true, ...(await sendMorningBriefing()) }); }
  catch { return Response.json({ error: "Η αποστολή απέτυχε." }, { status: 500 }); }
}

export const GET = run;
export const POST = run;
