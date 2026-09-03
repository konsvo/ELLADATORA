import Link from "next/link";
import { ArrowLeft, Database, Mail, Radio, ShieldCheck } from "lucide-react";
import { requireAdmin } from "@/lib/admin";
import { getAdminSnapshot } from "@/lib/live-news";
import { SendBriefingButton, StoryStatusButton, SyncNewsButton } from "@/components/admin-controls";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const user = await requireAdmin("/admin");
  const snapshot = await getAdminSnapshot();
  const published = snapshot.stories.filter((story) => story.status === "published").length;
  const healthy = snapshot.sources.filter((source) => (source as { status?: string }).status === "ok").length;

  return <main className="admin-page">
    <header className="site-header"><div className="shell masthead detail-masthead">
      <Link className="brand" href="/"><span className="brand-mark">ΕΤ</span><span><b>ΕΛΛΑΔΑ</b><strong>ΤΩΡΑ</strong></span><span className="flag">🇬🇷</span></Link>
      <Link className="back-link" href="/"><ArrowLeft /> Πίσω στη ροή</Link>
    </div></header>
    <div className="shell admin-shell">
      <div className="admin-heading"><div><span>OWNER DASHBOARD</span><h1>Κέντρο σύνταξης</h1><p>Συνδεδεμένος ως {user.email}</p></div><div className="admin-actions"><SendBriefingButton /><SyncNewsButton /></div></div>
      <section className="admin-metrics">
        <article><Radio /><span>Δημοσιευμένα</span><strong>{published}</strong></article>
        <article><Database /><span>Υγιείς πηγές</span><strong>{healthy}/{snapshot.sources.length || 8}</strong></article>
        <article><Mail /><span>Newsletter</span><strong>{snapshot.subscriberCount}</strong></article>
        <article><ShieldCheck /><span>Κρυμμένα</span><strong>{snapshot.stories.length - published}</strong></article>
      </section>

      <section className="admin-panel"><div className="admin-panel-heading"><h2>Κατάσταση πηγών</h2><p>Ο τελευταίος αυτόματος έλεγχος κάθε RSS.</p></div>
        <div className="admin-source-grid">{snapshot.sources.length ? snapshot.sources.map((raw) => {
          const source = raw as { sourceName: string; feedUrl: string; status: string; itemCount: number; message?: string; checkedAt: string };
          return <article key={source.sourceName}><i className={source.status === "ok" ? "ok" : "error"} /><div><b>{source.sourceName}</b><small>{source.itemCount} θέματα · {source.status === "ok" ? "λειτουργεί" : source.message || "σφάλμα"}</small></div></article>;
        }) : <p className="admin-empty">Πάτησε «Ανανέωση πηγών» για τον πρώτο συγχρονισμό.</p>}</div>
      </section>

      <section className="admin-panel"><div className="admin-panel-heading"><h2>Τελευταία θέματα</h2><p>Άμεση απόκρυψη ή επαναδημοσίευση χωρίς αλλαγή κώδικα.</p></div>
        <div className="admin-story-list">{snapshot.stories.slice(0, 50).map((story) => <article key={story.id}>
          <div><span>{story.category} · {story.sourceName}</span><h3><Link href={`/live/${story.slug}`}>{story.title}</Link></h3><small>{new Date(story.publishedAt).toLocaleString("el-GR")}</small></div>
          <StoryStatusButton slug={story.slug} status={story.status} />
        </article>)}</div>
      </section>
    </div>
  </main>;
}
