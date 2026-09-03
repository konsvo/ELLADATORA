import { getLiveStories } from "@/lib/live-news";
import { dbRequest } from "@/lib/supabase-rest";

function escapeHtml(value: string) { return value.replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" }[character]!)); }

export async function sendMorningBriefing() {
  if (!process.env.RESEND_API_KEY || !process.env.NEWSLETTER_FROM) throw new Error("NEWSLETTER_NOT_CONFIGURED");
  const subscribers = await dbRequest<Array<{ email: string }>>("newsletter_subscribers", { select: "email", status: "neq.unsubscribed", order: "created_at.asc", limit: 500 });
  const stories = (await getLiveStories(30)).slice(0, 7);
  if (!stories.length) throw new Error("NO_LIVE_STORIES");
  const origin = process.env.PUBLIC_SITE_URL || "https://www.elladatora.gr";
  const storyHtml = stories.map((story) => `<li style="margin:0 0 20px"><div style="color:#0b48d8;font-size:12px;font-weight:700">${escapeHtml(story.category)} · ${escapeHtml(story.sourceName)}</div><h2 style="font-size:20px;line-height:1.25;margin:5px 0"><a style="color:#111b32" href="${origin}/live/${encodeURIComponent(story.slug)}">${escapeHtml(story.title)}</a></h2><p style="color:#59647a;line-height:1.55;margin:0">${escapeHtml(story.summary)}</p></li>`).join("");
  const html = `<div style="max-width:640px;margin:auto;font-family:Arial,sans-serif;color:#111b32"><p style="font-weight:800;color:#0b48d8">ΕΛΛΑΔΑ ΤΩΡΑ 🇬🇷</p><h1>Οι 7 ειδήσεις που αξίζει να ξέρεις</h1><ol style="padding-left:24px">${storyHtml}</ol><p style="font-size:12px;color:#7a8497;border-top:1px solid #e3e7ef;padding-top:18px">Λαμβάνεις αυτό το email επειδή γράφτηκες στο πρωινό briefing. <a href="${origin}/unsubscribe">Διαγραφή από τη λίστα</a></p></div>`;
  let sent = 0;
  for (const subscriber of subscribers) {
    const response = await fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" }, body: JSON.stringify({ from: process.env.NEWSLETTER_FROM, to: subscriber.email, subject: "Ελλάδα Τώρα — Πρωινό briefing", html }) });
    if (response.ok) sent += 1;
  }
  await dbRequest("newsletter_dispatches", {}, { method: "POST", prefer: "return=minimal", body: JSON.stringify([{ recipient_count: sent, status: sent === subscribers.length ? "sent" : "partial", provider_message: `${sent}/${subscribers.length}` }]) });
  return { sent, total: subscribers.length };
}
