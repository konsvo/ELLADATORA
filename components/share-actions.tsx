"use client";

import { useState } from "react";
import { Check, Share2 } from "lucide-react";

export function ShareActions({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  async function share() {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({ title, url });
      return;
    }
    await navigator.clipboard.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return <button className="share-action" type="button" onClick={share}>{copied ? <Check /> : <Share2 />}{copied ? "Αντιγράφηκε" : "Κοινοποίηση"}</button>;
}
