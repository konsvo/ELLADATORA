type QueryValue = string | number | boolean;

function config() {
  const url = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("DATABASE_NOT_CONFIGURED");
  return { url, key };
}

export async function dbRequest<T>(table: string, query: Record<string, QueryValue> = {}, init: RequestInit & { prefer?: string } = {}): Promise<T> {
  const { url, key } = config();
  const endpoint = new URL(`${url}/rest/v1/${table}`);
  for (const [name, value] of Object.entries(query)) endpoint.searchParams.set(name, String(value));
  const response = await fetch(endpoint, {
    ...init,
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: init.prefer ?? "return=representation",
      ...(init.headers ?? {}),
    },
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`DATABASE_${response.status}:${(await response.text()).slice(0, 180)}`);
  const text = await response.text();
  return (text ? JSON.parse(text) : null) as T;
}
