import type { MetadataRoute } from "next";
import { stories } from "@/lib/news";
import { infoPages } from "@/lib/info-pages";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://elladatora.gr";
  return [
    { url: base, changeFrequency: "hourly", priority: 1 },
    { url: `${base}/coverage`, changeFrequency: "hourly", priority: .9 },
    { url: `${base}/briefing`, changeFrequency: "daily", priority: .8 },
    ...stories.map((story) => ({ url: `${base}/story/${story.slug}`, changeFrequency: "daily" as const, priority: .7 })),
    ...Object.keys(infoPages).map((slug) => ({ url: `${base}/info/${slug}`, changeFrequency: "monthly" as const, priority: .4 })),
  ];
}
