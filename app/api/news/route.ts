import { isAdmin } from "@/lib/admin";
import { getLiveStories, syncLiveNews } from "@/lib/live-news";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const force = url.searchParams.get("refresh") === "1";
    if (force && !(await isAdmin())) {
      return Response.json({ error: "Δεν επιτρέπεται η χειροκίνητη ανανέωση." }, { status: 403 });
    }
    const result = await syncLiveNews(force);
    return Response.json(result, { headers: { "Cache-Control": "public, max-age=60, stale-while-revalidate=240" } });
  } catch (error) {
    console.error("live_news_failed", error);
    try {
      return Response.json({ refreshed: false, stories: await getLiveStories() });
    } catch {
      return Response.json({ error: "Η ζωντανή ροή είναι προσωρινά μη διαθέσιμη.", stories: [] }, { status: 503 });
    }
  }
}
