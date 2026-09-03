"use client";

import { type FormEvent, useState } from "react";
import { Check, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const payload = await response.json() as { error?: string };
      if (!response.ok) throw new Error(payload.error || "Η εγγραφή δεν ολοκληρώθηκε.");
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Η εγγραφή δεν ολοκληρώθηκε.");
    }
  }

  if (status === "success") {
    return <div className="briefing-success"><Check /> Το email σου αποθηκεύτηκε στη λίστα αναμονής.</div>;
  }

  return (
    <form className="briefing-form" onSubmit={submit}>
      <label htmlFor="briefing-email"><Mail /> Email</label>
      <div><Input id="briefing-email" type="email" required placeholder="onoma@email.gr" value={email} onChange={(event) => setEmail(event.target.value)} /><Button disabled={status === "loading"} type="submit">{status === "loading" ? "Αποθήκευση…" : "Μπες στη λίστα"}</Button></div>
      {status === "error" && <p role="alert">{message}</p>}
      <small>Η αποστολή ενεργοποιείται όταν συνδεθεί ο πιστοποιημένος πάροχος email.</small>
    </form>
  );
}
