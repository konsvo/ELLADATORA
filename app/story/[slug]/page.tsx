import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft, ArrowRight, CheckCircle2, Clock3, ExternalLink,
  Layers3, ShieldCheck, Sparkles,
} from "lucide-react";
import { getStory, stories } from "@/lib/news";
import { ShareActions } from "@/components/share-actions";

export function generateStaticParams() {
  return stories.map((story) => ({ slug: story.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const story = getStory(slug);
  if (!story) return {};
  return {
    title: story.title,
    description: story.summary,
    alternates: { canonical: `/story/${story.slug}` },
    openGraph: { title: story.title, description: story.summary, type: "article", images: [story.image] },
  };
}

export default async function StoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const story = getStory(slug);
  if (!story) notFound();

  return (
    <main className="story-page">
      <div className="demo-strip">Πιλοτική έκδοση · επιμελημένη σύνοψη · έλεγξε τις αρχικές πηγές</div>
      <header className="site-header">
        <div className="shell masthead detail-masthead">
          <Link className="brand" href="/" aria-label="Ελλάδα Τώρα, αρχική">
            <span className="brand-mark">ΕΤ</span>
            <span><b>ΕΛΛΑΔΑ</b><strong>ΤΩΡΑ</strong></span>
            <span className="flag" aria-label="Ελληνική σημαία">🇬🇷</span>
          </Link>
          <Link className="back-link" href="/"><ArrowLeft /> Πίσω στη ροή</Link>
        </div>
      </header>

      <article className="shell article-shell">
        <div className="article-main">
          <div className="article-kicker"><span>{story.category}</span><i>•</i><span>{story.sources} πηγές</span><i>•</i><time>{story.time}</time></div>
          <h1>{story.title}</h1>
          <p className="article-deck">{story.summary}</p>
          <div className="article-trust">
            <span><Clock3 /> Ενημερώθηκε {story.updated}</span>
            <span><ShieldCheck /> {story.tone}</span>
            <ShareActions title={story.title} />
          </div>

          <figure className="article-figure">
            <img src={story.image} alt={`Πραγματική φωτογραφία για το θέμα: ${story.title}`} />
            <figcaption>
              <a href={story.imageSourceUrl} target="_blank" rel="noreferrer">{story.imageCredit} <ExternalLink /></a>
              <span> · </span>
              <a href={story.imageLicenseUrl} target="_blank" rel="noreferrer">{story.imageLicense}</a>
              <span> · πρωτότυπο αρχείο, χωρίς επεξεργασία</span>
            </figcaption>
          </figure>

          <section className="ai-summary">
            <div className="ai-summary-title"><Sparkles /><div><span>AI ΣΥΝΟΨΗ</span><h2>Η ουσία σε 60 δευτερόλεπτα</h2></div></div>
            <ul>
              {story.points.map((point) => <li key={point}><CheckCircle2 /> <span>{point}</span></li>)}
            </ul>
          </section>

          <section className="context-block">
            <span>ΣΥΝΟΨΗ ΑΡΘΡΟΥ</span>
            <h2>Η συνολική εικόνα</h2>
            {story.articleSummary.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            <div className="summary-note"><ShieldCheck /> Η σύνοψη είναι συντομότερη από τα πρωτότυπα άρθρα και δεν τα αντικαθιστά.</div>
          </section>
        </div>

        <aside className="article-aside" id="sources">
          <section className="sources-panel">
            <div className="card-title"><Layers3 /><span>Πηγές κάλυψης</span></div>
            <p>Ενδεικτικές πηγές για το δοκιμαστικό άρθρο.</p>
            <div className="source-links">
              {story.coverageSources.map((source, index) => (
                <a href={source.url} target="_blank" rel="noreferrer" key={source.name}>
                  <b>{String(index + 1).padStart(2, "0")}</b>
                  <span><strong>{source.name}</strong><small>{source.role}</small></span>
                  <ExternalLink />
                </a>
              ))}
            </div>
          </section>

          <section className="verify-panel">
            <ShieldCheck />
            <div><b>Έλεγξε το πρωτότυπο</b><p>Για σημαντικές αποφάσεις, διάβασε πάντα τις αρχικές πηγές.</p></div>
          </section>

          <Link className="next-story" href={`/story/${stories[(stories.indexOf(story) + 1) % stories.length].slug}`}>
            <span>Επόμενο θέμα</span><strong>{stories[(stories.indexOf(story) + 1) % stories.length].title}</strong><ArrowRight />
          </Link>
        </aside>
      </article>

      <footer>
        <div className="shell footer-inner">
          <Link className="brand footer-brand" href="/"><span className="brand-mark">ΕΤ</span><span><b>ΕΛΛΑΔΑ</b><strong>ΤΩΡΑ</strong></span><span className="flag" aria-label="Ελληνική σημαία">🇬🇷</span></Link>
          <p>Η είδηση από όλες τις πλευρές.</p>
          <div className="detail-footer-links"><Link href="/info/methodology">Μεθοδολογία</Link><Link href="/info/sources">Πηγές</Link></div>
          <Link className="footer-return" href="/">Επιστροφή στην αρχική <ArrowRight /></Link>
        </div>
      </footer>
    </main>
  );
}
