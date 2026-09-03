import { dbRequest } from "@/lib/supabase-rest";

export const liveCategories = ["Πολιτική", "Οικονομία", "Κοινωνία", "Κόσμος", "Τεχνολογία", "Αθλητικά"] as const;
export type LiveCategory = (typeof liveCategories)[number];

export type LiveNewsItem = {
  id: string;
  slug: string;
  category: LiveCategory;
  title: string;
  summary: string;
  sourceName: string;
  sourceUrl: string;
  canonicalUrl: string;
  imageUrl: string | null;
  imageCredit: string | null;
  publishedAt: string;
  fetchedAt: string;
  status: string;
  summaryMethod: string;
};

type FeedSource = { name: string; url: string; defaultCategory?: LiveCategory };

const feeds: FeedSource[] = [
  { name: "ΕΡΤ News", url: "https://www.ertnews.gr/feed/" },
  { name: "Ναυτεμπορική", url: "https://www.naftemporiki.gr/feed/", defaultCategory: "Οικονομία" },
  { name: "in.gr", url: "https://www.in.gr/feed/" },
  { name: "Καθημερινή", url: "https://www.kathimerini.gr/feed/" },
  { name: "News 24/7", url: "https://www.news247.gr/feed/" },
  { name: "SPORT24", url: "https://www.sport24.gr/rss/", defaultCategory: "Αθλητικά" },
  { name: "Capital", url: "https://www.capital.gr/rss/", defaultCategory: "Οικονομία" },
  { name: "Insomnia", url: "https://www.insomnia.gr/rss/", defaultCategory: "Τεχνολογία" },
];

const categoryKeywords: Record<LiveCategory, string[]> = {
  "Πολιτική": ["κυβέρνησ", "βουλή", "υπουργ", "εκλογ", "κόμμα", "πολιτικ", "μαξίμου"],
  "Οικονομία": ["οικονομ", "αγορά", "τιμές", "ευρώ", "τράπεζ", "επιτόκ", "χρηματιστ", "φορο", "ενέργεια"],
  "Κοινωνία": ["κοινων", "υγεία", "παιδεία", "καιρός", "μετρό", "αστυνομ", "δικαιοσύ", "πολίτες"],
  "Κόσμος": ["κόσμος", "ευρώπη", "διεθν", "ηπα", "ουκραν", "μέση ανατολή", "γαλλία", "γερμανία"],
  "Τεχνολογία": ["τεχνολογ", "τεχνητή νοημοσύνη", " ai ", "ψηφιακ", "cyber", "διαδίκτυ", "κινητό", "startup"],
  "Αθλητικά": ["αθλη", "ποδόσφ", "μπάσκετ", "αγώνα", "πρωτάθλη", "ολυμπιακ", "παναθηνα", "αεκ", "παοκ"],
};

function decodeXml(value: string) {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&quot;/g, "\"").replace(/&#39;|&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)));
}

function stripMarkup(value: string) {
  return decodeXml(value)
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function xmlValue(block: string, tag: string) {
  const match = block.match(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tag}>`, "i"));
  return match ? decodeXml(match[1]).trim() : "";
}

function attrValue(block: string, expression: RegExp) {
  return block.match(expression)?.[1] ?? "";
}

function stableId(value: string) {
  let first = 2166136261;
  let second = 5381;
  for (let index = 0; index < value.length; index += 1) {
    first = Math.imul(first ^ value.charCodeAt(index), 16777619);
    second = Math.imul(second, 33) ^ value.charCodeAt(index);
  }
  return `${(first >>> 0).toString(36)}${(second >>> 0).toString(36)}`;
}

function slugify(title: string, id: string) {
  const base = title.toLocaleLowerCase("el")
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\u0370-\u03ff]+/g, "-").replace(/^-|-$/g, "")
    .slice(0, 72);
  return `${base || "eidisi"}-${id.slice(-7)}`;
}

function classify(title: string, description: string, fallback?: LiveCategory): LiveCategory {
  const text = ` ${title} ${description} `.toLocaleLowerCase("el");
  let best: LiveCategory = fallback ?? "Κοινωνία";
  let score = 0;
  for (const category of liveCategories) {
    const hits = categoryKeywords[category].filter((word) => text.includes(word)).length;
    if (hits > score) { best = category; score = hits; }
  }
  return best;
}

function safeHttpUrl(value: string) {
  try {
    const parsed = new URL(value);
    return parsed.protocol === "https:" || parsed.protocol === "http:" ? parsed.toString() : "";
  } catch { return ""; }
}

function parseFeed(xml: string, source: FeedSource): LiveNewsItem[] {
  const blocks = xml.match(/<item\b[\s\S]*?<\/item>/gi) ?? xml.match(/<entry\b[\s\S]*?<\/entry>/gi) ?? [];
  return blocks.slice(0, 30).flatMap((block) => {
    const title = stripMarkup(xmlValue(block, "title"));
    const descriptionHtml = xmlValue(block, "description") || xmlValue(block, "content:encoded") || xmlValue(block, "summary");
    const summary = stripMarkup(descriptionHtml).slice(0, 420);
    const rssLink = xmlValue(block, "link");
    const atomLink = attrValue(block, /<link[^>]+href=["']([^"']+)["']/i);
    const canonicalUrl = safeHttpUrl(rssLink || atomLink);
    if (!title || !canonicalUrl) return [];
    const sourceTag = block.match(/<source(?:\s+url=["']([^"']+)["'])?[^>]*>([\s\S]*?)<\/source>/i);
    const sourceName = stripMarkup(sourceTag?.[2] ?? "") || source.name;
    const sourceUrl = safeHttpUrl(sourceTag?.[1] ?? "") || new URL(canonicalUrl).origin;
    const rawImage = attrValue(block, /<(?:media:content|media:thumbnail|enclosure)[^>]+url=["']([^"']+)["'][^>]*>/i)
      || attrValue(descriptionHtml, /<img[^>]+src=["']([^"']+)["']/i);
    const imageUrl = safeHttpUrl(decodeXml(rawImage)) || null;
    const publishedRaw = xmlValue(block, "pubDate") || xmlValue(block, "published") || xmlValue(block, "updated");
    const parsedDate = new Date(publishedRaw);
    const publishedAt = Number.isNaN(parsedDate.getTime()) ? new Date().toISOString() : parsedDate.toISOString();
    const id = stableId(canonicalUrl);
    return [{
      id, slug: slugify(title, id), category: classify(title, summary, source.defaultCategory), title,
      summary: summary || "Η είδηση βρίσκεται σε εξέλιξη. Άνοιξε την πρωτότυπη πηγή για όλες τις διαθέσιμες λεπτομέρειες.",
      sourceName, sourceUrl, canonicalUrl, imageUrl,
      imageCredit: imageUrl ? `Εικόνα που παρέχεται από το RSS της πηγής ${sourceName}` : null,
      publishedAt, fetchedAt: new Date().toISOString(), status: "published", summaryMethod: "feed",
    }];
  });
}

async function fetchFeed(source: FeedSource) {
  const response = await fetch(source.url, {
    headers: { "User-Agent": "ElladaTora/1.0 (+https://www.elladatora.gr/info/sources)", Accept: "application/rss+xml, application/atom+xml, text/xml" },
    signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return parseFeed(await response.text(), source);
}

function extractResponseText(payload: unknown) {
  if (!payload || typeof payload !== "object") return "";
  const record = payload as { output_text?: string; output?: Array<{ content?: Array<{ type?: string; text?: string }> }> };
  if (record.output_text) return record.output_text;
  return record.output?.flatMap((item) => item.content ?? []).map((content) => content.text ?? "").join("") ?? "";
}

async function addAiSummaries(items: LiveNewsItem[], apiKey?: string, model = "gpt-5-mini") {
  if (!apiKey || !items.length) return items;
  try {
    const input = items.slice(0, 10).map(({ id, title, summary, sourceName }) => ({ id, title, sourceName, sourceExcerpt: summary }));
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model,
        input: `Είσαι αυστηρός συντάκτης ελληνικών ειδήσεων. Με βάση ΜΟΝΟ τα παρακάτω αποσπάσματα, γράψε ουδέτερη σύνοψη 35-55 λέξεων για κάθε εγγραφή. Μην προσθέσεις γεγονότα, αριθμούς ή κρίσεις. Επίστρεψε αποκλειστικά JSON array με πεδία id και summary.\n${JSON.stringify(input)}`,
      }),
      signal: AbortSignal.timeout(20000),
    });
    if (!response.ok) return items;
    const text = extractResponseText(await response.json());
    const start = text.indexOf("["); const end = text.lastIndexOf("]");
    if (start < 0 || end <= start) return items;
    const summaries = JSON.parse(text.slice(start, end + 1)) as Array<{ id?: string; summary?: string }>;
    const byId = new Map(summaries.filter((item) => item.id && item.summary).map((item) => [item.id, item.summary!.slice(0, 520)]));
    return items.map((item) => byId.has(item.id) ? { ...item, summary: byId.get(item.id)!, summaryMethod: "ai" } : item);
  } catch (error) {
    console.error("ai_summary_failed", error);
    return items;
  }
}

export async function getLiveStories(limit = 84, includeHidden = false): Promise<LiveNewsItem[]> {
  const query: Record<string, string | number> = { select: "*", order: "published_at.desc", limit };
  if (!includeHidden) query.status = "eq.published";
  return (await dbRequest<DbNewsRow[]>("news_items", query)).map(fromDbRow);
}

export async function getLiveStory(slug: string): Promise<LiveNewsItem | null> {
  const rows = await dbRequest<DbNewsRow[]>("news_items", { select: "*", slug: `eq.${slug}`, status: "eq.published", limit: 1 });
  return rows[0] ? fromDbRow(rows[0]) : null;
}

export async function syncLiveNews(force = false) {
  const lastRuns = await dbRequest<Array<{ checked_at: string }>>("source_runs", { select: "checked_at", order: "checked_at.desc", limit: 1 });
  if (!force && lastRuns[0]?.checked_at && Date.now() - new Date(lastRuns[0].checked_at).getTime() < 5 * 60_000) {
    return { refreshed: false, stories: await getLiveStories() };
  }

  const existingRows = await dbRequest<Array<{ canonical_url: string }>>("news_items", { select: "canonical_url", order: "fetched_at.desc", limit: 1000 });
  const existing = new Set(existingRows.map((item) => item.canonical_url));
  const results = await Promise.allSettled(feeds.map(async (source) => ({ source, items: await fetchFeed(source) })));
  const fetched = results.flatMap((result) => result.status === "fulfilled" ? result.value.items : []);
  const unique = [...new Map(fetched.map((item) => [item.canonicalUrl, item])).values()];
  const newItems = unique.filter((item) => !existing.has(item.canonicalUrl));
  const finalItems = await addAiSummaries(newItems, process.env.OPENAI_API_KEY, process.env.OPENAI_MODEL);
  if (finalItems.length) {
    await dbRequest("news_items", { on_conflict: "canonical_url" }, {
      method: "POST", prefer: "resolution=merge-duplicates,return=minimal",
      body: JSON.stringify(finalItems.map(toDbRow)),
    });
  }

  const runRows = results.map((result, index) => {
    const source = feeds[index];
    const ok = result.status === "fulfilled";
    const count = ok ? result.value.items.length : 0;
    const message = ok ? null : String(result.reason instanceof Error ? result.reason.message : "Αποτυχία λήψης").slice(0, 180);
    return { source_name: source.name, feed_url: source.url, status: ok ? "ok" : "error", item_count: count, message, checked_at: new Date().toISOString() };
  });
  await dbRequest("source_runs", { on_conflict: "source_name" }, { method: "POST", prefer: "resolution=merge-duplicates,return=minimal", body: JSON.stringify(runRows) });
  return { refreshed: true, imported: finalItems.length, newItems: finalItems.length, stories: await getLiveStories() };
}

export async function getAdminSnapshot() {
  const [stories, sources, subscribers] = await Promise.all([
    getLiveStories(120, true),
    dbRequest<Array<{ source_name: string; feed_url: string; status: string; item_count: number; message: string | null; checked_at: string }>>("source_runs", { select: "*", order: "source_name.asc" }),
    dbRequest<Array<{ id: number }>>("newsletter_subscribers", { select: "id", status: "neq.unsubscribed" }, { headers: { Prefer: "count=exact" } }),
  ]);
  return {
    stories,
    sources: sources.map((source) => ({ sourceName: source.source_name, feedUrl: source.feed_url, status: source.status, itemCount: source.item_count, message: source.message, checkedAt: source.checked_at })),
    subscriberCount: subscribers.length,
  };
}

type DbNewsRow = {
  id: string; slug: string; category: LiveCategory; title: string; summary: string;
  source_name: string; source_url: string; canonical_url: string; image_url: string | null;
  image_credit: string | null; published_at: string; fetched_at: string; status: string; summary_method: string;
};

function fromDbRow(row: DbNewsRow): LiveNewsItem {
  return { id: row.id, slug: row.slug, category: row.category, title: row.title, summary: row.summary, sourceName: row.source_name, sourceUrl: row.source_url, canonicalUrl: row.canonical_url, imageUrl: row.image_url, imageCredit: row.image_credit, publishedAt: row.published_at, fetchedAt: row.fetched_at, status: row.status, summaryMethod: row.summary_method };
}

function toDbRow(item: LiveNewsItem): DbNewsRow {
  return { id: item.id, slug: item.slug, category: item.category, title: item.title, summary: item.summary, source_name: item.sourceName, source_url: item.sourceUrl, canonical_url: item.canonicalUrl, image_url: item.imageUrl, image_credit: item.imageCredit, published_at: item.publishedAt, fetched_at: item.fetchedAt, status: item.status, summary_method: item.summaryMethod };
}
