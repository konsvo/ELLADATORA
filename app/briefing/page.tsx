import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock3, Mail, ShieldCheck } from "lucide-react";
import { NewsletterSignup } from "@/components/newsletter-signup";
import { stories } from "@/lib/news";

export const metadata: Metadata = {
  title: "Πρωινό Briefing",
  description: "Οι επτά ειδήσεις που αξίζει να γνωρίζεις, με σύντομες περιλήψεις και καθαρές πηγές.",
};

export default function BriefingPage() {
  const briefingStories = stories.slice(0, 7);
  return (
    <main className="briefing-page">
      <div className="demo-strip">Πιλοτικό briefing · επιμελημένο δείγμα επτά θεμάτων</div>
      <header className="site-header"><div className="shell masthead detail-masthead">
        <Link className="brand" href="/"><span className="brand-mark">ΕΤ</span><span><b>ΕΛΛΑΔΑ</b><strong>ΤΩΡΑ</strong></span><span className="flag">🇬🇷</span></Link>
        <Link className="back-link" href="/"><ArrowLeft /> Πίσω στη ροή</Link>
      </div></header>

      <section className="shell briefing-hero">
        <div className="briefing-intro"><span><Mail /> ΠΡΩΙΝΟ BRIEFING</span><h1>Τα σημαντικά.<br />Χωρίς τον θόρυβο.</h1><p>Επτά θέματα, σύντομες περιλήψεις και σύνδεσμοι προς όλες τις αρχικές πηγές.</p><div><Clock3 /> Σχεδιασμένο για αποστολή στις 07:30</div></div>
        <div className="briefing-signup"><h2>Λάβε το briefing</h2><p>Μπες στη λίστα αναμονής για την πρώτη κανονική έκδοση.</p><NewsletterSignup /></div>
      </section>

      <section className="shell briefing-edition">
        <div className="briefing-edition-title"><div><span>ΠΙΛΟΤΙΚΗ ΕΚΔΟΣΗ</span><h2>Οι 7 ιστορίες της ημέρας</h2></div><ShieldCheck /></div>
        <ol>{briefingStories.map((story, index) => <li key={story.slug}><b>{String(index + 1).padStart(2, "0")}</b><div><span>{story.category} · {story.coverageSources.length} πηγές</span><h3><Link href={`/story/${story.slug}`}>{story.title}</Link></h3><p>{story.summary}</p><Link href={`/story/${story.slug}`}>Διάβασε τη σύνοψη <ArrowRight /></Link></div></li>)}</ol>
      </section>
    </main>
  );
}
