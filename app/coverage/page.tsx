import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink, Layers3, Scale, ShieldCheck } from "lucide-react";
import { stories } from "@/lib/news";

export const metadata: Metadata = {
  title: "Σύγκριση πηγών",
  description: "Δες πώς διαφορετικές πηγές καλύπτουν τα ίδια θέματα και άνοιξε τις πρωτότυπες δημοσιεύσεις.",
};

export default function CoveragePage() {
  return (
    <main className="coverage-page">
      <div className="demo-strip">Πιλοτική λειτουργία · οι παραπομπές οδηγούν στις αρχικές πηγές</div>
      <header className="site-header"><div className="shell masthead detail-masthead">
        <Link className="brand" href="/"><span className="brand-mark">ΕΤ</span><span><b>ΕΛΛΑΔΑ</b><strong>ΤΩΡΑ</strong></span><span className="flag">🇬🇷</span></Link>
        <Link className="back-link" href="/"><ArrowLeft /> Πίσω στη ροή</Link>
      </div></header>

      <section className="shell product-hero">
        <div><span><Scale /> ΣΥΓΚΡΙΣΗ ΚΑΛΥΨΗΣ</span><h1>Ένα γεγονός.<br />Πολλές οπτικές.</h1><p>Ξεχωρίζουμε την πρωτογενή πληροφορία από το ρεπορτάζ και δείχνουμε καθαρά ποια πηγή προσθέτει τι.</p></div>
        <aside><Layers3 /><strong>{stories.reduce((total, story) => total + story.coverageSources.length, 0)}</strong><span>παραπομπές σε πηγές</span></aside>
      </section>

      <section className="shell comparison-grid">
        {stories.map((story) => <article className="comparison-card" key={story.slug}>
          <div className="comparison-meta"><span>{story.category}</span><i>•</i><span>{story.coverageSources.length} πηγές</span></div>
          <h2><Link href={`/story/${story.slug}`}>{story.title}</Link></h2>
          <p>{story.summary}</p>
          <div className="comparison-sources">{story.coverageSources.map((source) => <a key={source.name} href={source.url} target="_blank" rel="noreferrer"><span><b>{source.name}</b><small>{source.role}</small></span><ExternalLink /></a>)}</div>
          <Link className="comparison-open" href={`/story/${story.slug}`}>Άνοιγμα σύνοψης <ArrowRight /></Link>
        </article>)}
      </section>

      <div className="shell comparison-note"><ShieldCheck /><p><b>Διαφάνεια:</b> οι περιλήψεις δεν αντικαθιστούν τα πρωτότυπα άρθρα. Για κρίσιμες πληροφορίες, έλεγξε πάντα τις αρχικές πηγές.</p></div>
    </main>
  );
}
