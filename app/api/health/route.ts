export async function GET() {
  return Response.json({ ok: true, service: "elladatora", checkedAt: new Date().toISOString() });
}
