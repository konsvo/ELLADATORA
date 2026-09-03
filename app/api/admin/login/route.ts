import { createAdminSession, validAdminPassword } from "@/lib/admin";

export async function POST(request: Request) {
  const { password } = await request.json() as { password?: string };
  if (!password || !validAdminPassword(password)) return Response.json({ error: "Λάθος κωδικός." }, { status: 401 });
  await createAdminSession();
  return Response.json({ ok: true });
}
