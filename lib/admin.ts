import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const COOKIE_NAME = "elladatora_admin";

function bytes(value: string) { return new TextEncoder().encode(value); }
function toHex(buffer: ArrayBuffer) { return [...new Uint8Array(buffer)].map((value) => value.toString(16).padStart(2, "0")).join(""); }

async function signature(expires: string) {
  const secret = process.env.AUTH_SECRET;
  if (!secret) return "";
  const key = await crypto.subtle.importKey("raw", bytes(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return toHex(await crypto.subtle.sign("HMAC", key, bytes(expires)));
}

export async function createAdminSession() {
  const expires = String(Date.now() + 7 * 24 * 60 * 60 * 1000);
  (await cookies()).set(COOKIE_NAME, `${expires}.${await signature(expires)}`, { httpOnly: true, secure: true, sameSite: "lax", path: "/", maxAge: 7 * 24 * 60 * 60 });
}

export async function clearAdminSession() { (await cookies()).delete(COOKIE_NAME); }

export async function isAdmin() {
  const [expires, supplied] = ((await cookies()).get(COOKIE_NAME)?.value ?? "").split(".");
  if (!expires || !supplied || Number(expires) < Date.now()) return false;
  const expected = await signature(expires);
  if (!expected || expected.length !== supplied.length) return false;
  let different = 0;
  for (let index = 0; index < expected.length; index += 1) different |= expected.charCodeAt(index) ^ supplied.charCodeAt(index);
  return different === 0;
}

export async function requireAdmin(returnTo = "/admin") {
  if (!(await isAdmin())) redirect(`/admin/login?returnTo=${encodeURIComponent(returnTo)}`);
  return { email: "Διαχειριστής" };
}

export function validAdminPassword(value: string) {
  const expected = process.env.ADMIN_PASSWORD ?? "";
  if (!expected || expected.length !== value.length) return false;
  let different = 0;
  for (let index = 0; index < expected.length; index += 1) different |= expected.charCodeAt(index) ^ value.charCodeAt(index);
  return different === 0;
}
