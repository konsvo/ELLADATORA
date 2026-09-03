"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { ArrowLeft, LockKeyhole } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  async function submit(event: FormEvent) {
    event.preventDefault(); setLoading(true); setError("");
    const response = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) });
    if (!response.ok) { setError("Ο κωδικός δεν είναι σωστός."); setLoading(false); return; }
    window.location.href = "/admin";
  }
  return <main className="unsubscribe-page"><section><Link href="/"><ArrowLeft /> Ελλάδα Τώρα</Link><LockKeyhole /><span>OWNER ACCESS</span><h1>Κέντρο σύνταξης</h1><p>Ο χώρος αυτός είναι διαθέσιμος μόνο στον ιδιοκτήτη.</p><form onSubmit={submit}><Input type="password" required minLength={10} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Κωδικός διαχειριστή" /><Button disabled={loading}>{loading ? "Έλεγχος…" : "Σύνδεση"}</Button></form>{error && <p className="form-error">{error}</p>}</section></main>;
}
