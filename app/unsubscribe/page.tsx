"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function UnsubscribePage() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  async function submit(event: FormEvent) {
    event.preventDefault(); setError("");
    const response = await fetch("/api/newsletter/unsubscribe", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
    const payload = await response.json() as { error?: string };
    if (!response.ok) return setError(payload.error || "Δεν ολοκληρώθηκε.");
    setDone(true);
  }
  return <main className="unsubscribe-page"><section>
    <Link href="/"><ArrowLeft /> Ελλάδα Τώρα</Link>
    {done ? <div className="unsubscribe-success"><Check /><h1>Η διαγραφή ολοκληρώθηκε.</h1><p>Δεν θα λαμβάνεις πλέον το πρωινό briefing.</p></div> : <><span>NEWSLETTER</span><h1>Διαγραφή από τη λίστα</h1><p>Γράψε το email με το οποίο έκανες εγγραφή.</p><form onSubmit={submit}><Input type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="to@email-sou.gr" /><Button type="submit">Διαγραφή</Button></form>{error && <p className="form-error">{error}</p>}</>}
  </section></main>;
}
