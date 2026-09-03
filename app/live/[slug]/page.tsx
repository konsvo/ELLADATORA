import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, Clock3, ExternalLink, ShieldCheck, Sparkles } from "lucide-react";
import { ShareActions } from "@/components/share-actions";
import { getLiveStory } from "@/lib/live-news";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const story = await getLiveStory((await params).slug);
  if (!story) return {};
  return {
    title: story.title,
    description: story.summary,
    alternates: { canonical: `/live/${story.slug}` },
    openGraph: { title: story.title, description: story.summary, type: "article", images: story.imageUrl ? [story.imageUrl] : [] },
  };
}

export default async function LiveStoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const story = await getLiveStory((await params).slug);
  if (!story) notFound();
  const published = new Date(story.publishedAt).toLocaleString("el-GR", { dateStyle: "long", timeStyle: "short" });

  return <main className="story-page">
    <div className="demo-strip">Ζωντανή ροή · αυτόματη σύνοψη · ακριβής σύνδεσμος πρωτότυπης δημοσίευσης</div>
    <header className="site-header"><div className="shell masthead detail-masthead">
      <Link className="brand" href="/"><span className="brand-mark">ΕΤ</span><span><b>ΕΛΛΑΔΑ</b><strong>ΤΩΡΑ</strong></span><span className="flag">🇬🇷</span></Link>
      <Link className="back-link" href="/"><ArrowLeft /> Πίσω στη ροή</Link>
    </div></header>

    <article className="shell article-shell">
      <div className="article-main">
        <div className="article-kicker"><span>{story.category}</span><i>•</i><span>{story.sourceName}</span><i>•</i><time>{published}</time></div>
        <h1>{story.title}</h1>
        <p className="article-deck">{story.summary}</p>
        <div className="article-trust"><span><Clock3 /> Αυτόματη ενημέρωση</span><span><ShieldCheck /> {story.summaryMethod === "ai" ? "Σύνοψη με AI" : "Σύνοψη από RSS"}</span><ShareActions title={story.title} /></div>

        {story.imageUrl && <figure className="article-figure">
          <img src={story.imageUrl} alt={`Εικόνα που συνοδεύει την πρωτότυπη δημοσίευση: ${story.title}`} />
          <figcaption><a href={story.canonicalUrl} target="_blank" rel="noreferrer">{story.imageCredit ?? `Εικόνα: ${story.sourceName}`} <ExternalLink /></a><span> · τα δικαιώματα ανήκουν στην αρχική πηγή</span></figcaption>
        </figure>}

        <section className="ai-summary">
          <div className="ai-summary-title"><Sparkles /><div><span>ΣΥΝΟΨΗ</span><h2>Η ουσία σε λιγότερο από ένα λεπτό</h2></div></div>
          <ul>
            <li><CheckCircle2 /><span>{story.summary}</span></li>
            <li><CheckCircle2 /><span>Η σελίδα δεν αναδημοσιεύει το πλήρες κείμενο του εκδότη.</span></li>
            <li><CheckCircle2 /><span>Για όλες τις λεπτομέρειες και τυχόν νεότερες αλλαγές, άνοιξε την πρωτότυπη δημοσίευση.</span></li>
          </ul>
        </section>

        <section className="context-block"><span>ΔΙΑΦΑΝΕΙΑ</span><h2>Πώς δημιουργήθηκε αυτή η σελίδα</h2>
          <p>Το θέμα εντοπίστηκε αυτόματα στην επίσημη ροή RSS του εκδότη. Κρατάμε τον τίτλο, τον ακριβή σύνδεσμο, την ώρα δημοσίευσης και μόνο μια σύντομη περιγραφή, ώστε το πρωτότυπο άρθρο να παραμένει ο κύριος προορισμός.</p>
          <div className="summary-note"><ShieldCheck /> Η σύνοψη είναι συντομότερη από το πρωτότυπο και δεν το αντικαθιστά.</div>
        </section>
      </div>

      <aside className="article-aside"><section className="sources-panel">
        <div className="card-title"><ExternalLink /><span>Πρωτότυπη πηγή</span></div>
        <p>Άνοιξε τη δημοσίευση του εκδότη για το πλήρες ρεπορτάζ.</p>
        <div className="source-links"><a href={story.canonicalUrl} target="_blank" rel="noreferrer"><b>01</b><span><strong>{story.sourceName}</strong><small>Ακριβής σύνδεσμος άρθρου</small></span><ExternalLink /></a></div>
      </section>
      <section className="verify-panel"><ShieldCheck /><div><b>Επιβεβαίωση στην πηγή</b><p>Το Ελλάδα Τώρα επισημαίνει καθαρά την προέλευση κάθε ζωντανού θέματος.</p></div></section></aside>
    </article>
  </main>;
}
