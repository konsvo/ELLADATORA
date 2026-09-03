"use client";

import { useState } from "react";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SyncNewsButton() {
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  async function sync() {
    setState("loading");
    try {
      const response = await fetch("/api/news?refresh=1");
      if (!response.ok) throw new Error();
      setState("done");
      window.location.reload();
    } catch { setState("error"); }
  }
  return <Button onClick={sync} disabled={state === "loading"} className="admin-primary"><RefreshCw />{state === "loading" ? "Ανανέωση…" : state === "error" ? "Δοκίμασε ξανά" : "Ανανέωση πηγών"}</Button>;
}

export function StoryStatusButton({ slug, status }: { slug: string; status: string }) {
  const [saving, setSaving] = useState(false);
  const nextStatus = status === "published" ? "hidden" : "published";
  async function update() {
    setSaving(true);
    try {
      const response = await fetch("/api/admin/story", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ slug, status: nextStatus }) });
      if (!response.ok) throw new Error();
      window.location.reload();
    } finally { setSaving(false); }
  }
  return <Button variant="outline" size="sm" onClick={update} disabled={saving}>{saving ? "Αποθήκευση…" : status === "published" ? "Απόκρυψη" : "Δημοσίευση"}</Button>;
}

export function SendBriefingButton() {
  const [message, setMessage] = useState("");
  async function send() {
    setMessage("Αποστολή…");
    const response = await fetch("/api/admin/send-briefing", { method: "POST" });
    const payload = await response.json() as { sent?: number; error?: string };
    setMessage(response.ok ? `Στάλθηκε σε ${payload.sent ?? 0}` : payload.error || "Αποτυχία");
  }
  return <div className="admin-send"><Button variant="outline" onClick={send}><MailIcon /> Αποστολή briefing</Button>{message && <small>{message}</small>}</div>;
}

function MailIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16v12H4zM4 7l8 6 8-6" fill="none" stroke="currentColor" strokeWidth="2" /></svg>;
}
