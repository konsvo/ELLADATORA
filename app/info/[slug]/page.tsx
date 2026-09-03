import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ShieldCheck } from "lucide-react";
import { infoPages } from "@/lib/info-pages";

export function generateStaticParams() {
  return Object.keys(infoPages).map((slug) => ({ slug }));
}

export default async function InfoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = infoPages[slug];
  if (!page) notFound();

  return (
    <main className="info-page">
      <div className="demo-strip">Πιλοτική έκδοση · διαφάνεια σε κάθε βήμα</div>
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

      <article className="shell info-shell">
        <div className="info-heading">
          <span>{page.eyebrow}</span>
          <h1>{page.title}</h1>
          <p>{page.intro}</p>
        </div>
        <div className="info-content">
          {page.sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}><ShieldCheck /><span>{bullet}</span></li>)}</ul>}
            </section>
          ))}
        </div>
      </article>

      <footer>
        <div className="shell footer-inner">
          <Link className="brand footer-brand" href="/"><span className="brand-mark">ΕΤ</span><span><b>ΕΛΛΑΔΑ</b><strong>ΤΩΡΑ</strong></span><span className="flag" aria-label="Ελληνική σημαία">🇬🇷</span></Link>
          <p>Η είδηση από όλες τις πλευρές.</p>
          <Link className="footer-return" href="/">Αρχική <ArrowRight /></Link>
        </div>
      </footer>
    </main>
  );
}
