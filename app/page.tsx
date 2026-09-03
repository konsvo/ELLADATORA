"use client";

import { type FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight, Bookmark, Check, ChevronRight, Clock3, CloudSun, ExternalLink, Menu,
  Search, ShieldCheck, Sparkles, TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { stories, type Story } from "@/lib/news";

const categories = ["Όλα", "Πολιτική", "Οικονομία", "Κοινωνία", "Κόσμος", "Τεχνολογία", "Αθλητικά"];

const sourceInitials = ["Κ", "Ν", "Ε", "Π", "Α"];

export default function Home() {
  const [active, setActive] = useState("Όλα");
  const [saved, setSaved] = useState<number[]>([]);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [newsletterError, setNewsletterError] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [visibleLimit, setVisibleLimit] = useState(14);
  const [liveStories, setLiveStories] = useState<Story[]>([]);
  const [feedStatus, setFeedStatus] = useState<"loading" | "live" | "fallback">("loading");
  useEffect(() => {
    let cancelled = false;
    fetch("/api/news")
      .then((response) => response.json())
      .then((payload: { stories?: Array<Record<string, string | null>> }) => {
        if (cancelled) return;
        const mapped: Story[] = (payload.stories ?? []).map((item) => ({
          kind: "live",
          slug: String(item.slug), category: String(item.category), title: String(item.title), summary: String(item.summary),
          time: "Πρόσφατα", updated: new Date(String(item.fetchedAt)).toLocaleString("el-GR"),
          sources: 1, tone: item.summaryMethod === "ai" ? "AI σύνοψη με έλεγχο πηγής" : "Αυτόματη σύνοψη RSS",
          source: String(item.sourceName), sourceUrl: String(item.canonicalUrl), image: item.imageUrl ? String(item.imageUrl) : "",
          imageCredit: item.imageCredit ? String(item.imageCredit) : "", imageSourceUrl: item.imageUrl ? String(item.imageUrl) : String(item.canonicalUrl),
          imageLicense: "Δικαιώματα στην αρχική πηγή", imageLicenseUrl: String(item.canonicalUrl),
          points: [String(item.summary), "Η πληροφορία προέρχεται από το RSS της αναγραφόμενης πηγής.", "Η πρωτότυπη δημοσίευση παραμένει το σημείο οριστικής επιβεβαίωσης."],
          articleSummary: [String(item.summary)],
          coverageSources: [{ name: String(item.sourceName), url: String(item.canonicalUrl), role: "Πρωτότυπη δημοσίευση" }],
        }));
        setLiveStories(mapped);
        setFeedStatus(mapped.length ? "live" : "fallback");
      })
      .catch(() => { if (!cancelled) setFeedStatus("fallback"); });
    return () => { cancelled = true; };
  }, []);
  const allStories = useMemo(() => {
    if (!liveStories.length) return stories;
    const seen = new Set<string>();
    return [...liveStories, ...stories].filter((story) => {
      const key = story.title.toLocaleLowerCase("el");
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [liveStories]);
  const visibleStories = useMemo(() => allStories.filter((story) => {
    const inCategory = active === "Όλα" || story.category === active;
    const searchText = `${story.title} ${story.summary} ${story.category}`.toLocaleLowerCase("el");
    return inCategory && searchText.includes(query.toLocaleLowerCase("el"));
  }), [active, query, allStories]);
  const displayedStories = visibleStories.slice(0, visibleLimit);
  function toggleSaved(index: number) {
    setSaved((current) => current.includes(index) ? current.filter((item) => item !== index) : [...current, index]);
  }
  function goToSection(sectionId: "latest" | "coverage" | "briefing") {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  }
  async function subscribeToBriefing(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setNewsletterError("");
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const payload = await response.json() as { error?: string };
      if (!response.ok) throw new Error(payload.error || "Η εγγραφή δεν ολοκληρώθηκε.");
      setSubscribed(true);
    } catch (error) {
      setNewsletterError(error instanceof Error ? error.message : "Η εγγραφή δεν ολοκληρώθηκε.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main>
      <div className="demo-strip">{feedStatus === "live" ? "Ζωντανή ροή · αυτόματη ανανέωση · ακριβής πηγή σε κάθε θέμα" : feedStatus === "loading" ? "Σύνδεση με τις ειδησεογραφικές πηγές…" : "Εφεδρική ροή · οι πηγές αναγράφονται σε κάθε θέμα"}</div>
      <header className="site-header">
        <div className="shell masthead">
          <Button variant="ghost" size="icon" className="mobile-menu" aria-label="Άνοιγμα μενού" aria-expanded={menuOpen} onClick={() => setMenuOpen((value) => !value)}><Menu /></Button>
          <Link className="brand" href="/" aria-label="Ελλάδα Τώρα, αρχική">
            <span className="brand-mark">ΕΤ</span>
            <span><b>ΕΛΛΑΔΑ</b><strong>ΤΩΡΑ</strong></span><span className="flag" aria-label="Ελληνική σημαία">🇬🇷</span>
          </Link>
          <nav aria-label="Κύρια πλοήγηση">
            <Link href="/#latest">Ροή</Link>
            <Link href="/coverage">Σύγκριση</Link>
            <Link href="/briefing">Briefing</Link>
          </nav>
          <div className="header-actions">
            {searchOpen && <Input className="header-search" type="search" placeholder="Αναζήτηση θεμάτων…" value={query} onChange={(event) => { setQuery(event.target.value); setVisibleLimit(14); }} autoFocus />}
            <Button variant="ghost" size="icon" aria-label="Αναζήτηση" aria-expanded={searchOpen} onClick={() => setSearchOpen((value) => !value)}><Search /></Button>
            <Button className="subscribe-top" onClick={() => goToSection("briefing")}>Εγγραφή</Button>
          </div>
        </div>
        {menuOpen && <div className="shell mobile-nav">
          <Link href="/#latest" onClick={() => setMenuOpen(false)}>Ροή</Link>
          <Link href="/coverage" onClick={() => setMenuOpen(false)}>Σύγκριση</Link>
          <Link href="/briefing" onClick={() => setMenuOpen(false)}>Briefing</Link>
        </div>}
      </header>

      <section className="ticker" aria-label="Σύντομη ενημέρωση">
        <div className="shell ticker-inner">
          <span className="live"><i /> ΣΕ ΕΞΕΛΙΞΗ</span>
          <p>Η εικόνα της ημέρας σε 60 δευτερόλεπτα</p>
          <span className="ticker-time">Τελευταία ενημέρωση 14:32</span>
        </div>
      </section>

      <div className="shell category-row" aria-label="Θεματικές ειδήσεων">
        {categories.map((category) => (
          <Button key={category} variant="ghost" className={active === category ? "category active" : "category"} onClick={() => { setActive(category); setVisibleLimit(category === "Όλα" ? 14 : 7); }}>
            {category}
          </Button>
        ))}
      </div>

      <div className="shell page-grid">
        <div className="content-column">
          <section className="lead-story" id="coverage">
            <div className="lead-copy">
              <div className="eyebrow"><Sparkles /> AI ΣΥΝΟΨΗ · 9 ΠΗΓΕΣ</div>
              <h1>Η μεγάλη εικόνα της ημέρας, χωρίς τον θόρυβο</h1>
              <p>Συγκεντρώνουμε όσα δημοσιεύουν διαφορετικά μέσα, εντοπίζουμε τι συμφωνούν και τι λείπει και σου δίνουμε την ουσία.</p>
              <div className="lead-footer">
                <Button className="read-button" asChild><Link href={allStories[0]?.kind === "live" ? `/live/${allStories[0].slug}` : `/story/${allStories[0].slug}`}>Διάβασε σε 60″ <ArrowRight /></Link></Button>
                <span><Clock3 /> Ενημερώθηκε πριν 4′</span>
              </div>
            </div>
            <div className="coverage-card" aria-label="Κατανομή κάλυψης">
              <div className="coverage-orbit"><span>9<small>πηγές</small></span></div>
              <div>
                <span className="coverage-label">Κάλυψη θέματος</span>
                <div className="source-stack">{sourceInitials.map((source, index) => <i key={source} style={{ zIndex: 6 - index }}>{source}</i>)}</div>
                <p>5 διαφορετικοί εκδότες</p>
              </div>
            </div>
          </section>

          <section id="latest" className="latest-section">
            <div className="section-heading">
              <div><span>Ροή θεμάτων · {visibleStories.length} θέματα</span><h2>{active === "Όλα" ? "Τελευταίες ειδήσεις" : active}</h2></div>
              <button type="button" onClick={() => { setActive("Όλα"); setQuery(""); setVisibleLimit(14); }}>Όλες οι ειδήσεις <ChevronRight /></button>
            </div>
            <div className="story-list">
              {visibleStories.length ? displayedStories.map((story) => {
                const originalIndex = allStories.indexOf(story);
                const isSaved = saved.includes(originalIndex);
                const storyHref = story.kind === "live" ? `/live/${story.slug}` : `/story/${story.slug}`;
                return (
                  <article className="story" key={story.title}>
                    <Link className={story.image ? "story-image" : "story-image story-image-placeholder"} href={storyHref} aria-label={`Άνοιγμα: ${story.title}`}>
                      {story.image ? <img src={story.image} alt="" /> : <strong>ΕΤ</strong>}
                      <span>{story.sources} πηγές</span>
                    </Link>
                    <div className="story-body">
                      <div className="story-meta"><span>{story.category}</span><i>•</i><time>{story.time}</time></div>
                      <h3><Link href={storyHref}>{story.title}</Link></h3><p>{story.summary}</p>
                      <div className="story-bottom">
                        <span><ShieldCheck /> {story.tone}</span>
                        <a href={story.sourceUrl} target="_blank" rel="noreferrer">Πηγή: {story.source} <ExternalLink /></a>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" aria-label={isSaved ? "Αφαίρεση από αποθηκευμένα" : "Αποθήκευση"} onClick={() => toggleSaved(originalIndex)} className={isSaved ? "save active" : "save"}>
                      {isSaved ? <Check /> : <Bookmark />}
                    </Button>
                  </article>
                );
              }) : <div className="empty-state">Δεν υπάρχουν ακόμη ειδήσεις σε αυτή την κατηγορία.</div>}
            </div>
            {displayedStories.length < visibleStories.length && (
              <div className="load-more-wrap">
                <Button className="load-more" onClick={() => setVisibleLimit((limit) => limit + 14)}>
                  Φόρτωσε περισσότερα ({visibleStories.length - displayedStories.length})
                </Button>
              </div>
            )}
          </section>
        </div>

        <aside>
          <section className="brief-card" id="briefing">
            <span className="mini-label">ΠΡΩΙΝΟ BRIEFING</span><h2>Ξεκίνα ενημερωμένος.</h2>
            <p>Οι 7 ειδήσεις που αξίζει να ξέρεις, στο email σου κάθε πρωί στις 07:30.</p>
            {subscribed ? <div className="success"><Check /> Το email σου αποθηκεύτηκε στη λίστα αναμονής.</div> : (
              <form onSubmit={subscribeToBriefing}>
                <Input type="email" required aria-label="Email" placeholder="to@email-sou.gr" value={email} onChange={(event) => setEmail(event.target.value)} />
                <Button type="submit" disabled={submitting}>{submitting ? "Αποθήκευση…" : "Μπες στη λίστα"}</Button>
              </form>
            )}
            {newsletterError && <p className="form-error" role="alert">{newsletterError}</p>}
            <small>Η διεύθυνσή σου αποθηκεύεται με ασφάλεια. Η αποστολή ενεργοποιείται σύντομα.</small>
          </section>

          <section className="pulse-card">
            <div className="card-title"><TrendingUp /><span>Τι συζητιέται τώρα</span></div>
            <ol>
              <li><b>01</b><span>Ακρίβεια και αγορά<small>+38% ενδιαφέρον</small></span></li>
              <li><b>02</b><span>Τεχνητή νοημοσύνη<small>+24% ενδιαφέρον</small></span></li>
              <li><b>03</b><span>Μετακινήσεις<small>+17% ενδιαφέρον</small></span></li>
            </ol>
          </section>

          <section className="weather-card">
            <div><span>ΑΘΗΝΑ · ΤΩΡΑ</span><strong>27°</strong><p>Αίθριος καιρός</p></div><CloudSun />
          </section>
          <div className="trust-note"><Sparkles /><p><b>Διαφάνεια πρώτα.</b><br />Οι περιλήψεις δημιουργούνται με AI και συνδέονται πάντα με τις αρχικές πηγές.</p></div>
        </aside>
      </div>

      <footer>
        <div className="shell footer-inner">
          <a className="brand footer-brand" href="#"><span className="brand-mark">ΕΤ</span><span><b>ΕΛΛΑΔΑ</b><strong>ΤΩΡΑ</strong></span><span className="flag" aria-label="Ελληνική σημαία">🇬🇷</span></a>
          <p>Η είδηση από όλες τις πλευρές.</p>
          <div><Link href="/info/sources">Πηγές</Link><Link href="/info/methodology">Μεθοδολογία</Link><Link href="/info/ai-policy">Πολιτική AI</Link><Link href="/info/corrections">Διορθώσεις</Link><Link href="/info/contact">Επικοινωνία</Link><Link href="/info/privacy">Απόρρητο</Link><Link href="/info/terms">Όροι</Link></div>
        </div>
      </footer>
    </main>
  );
}
