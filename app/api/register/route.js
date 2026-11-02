import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { setSession } from "@/lib/auth";
export async function POST(req) {
  const { username = "", password = "" } = await req.json();
  const u = username.trim().toLowerCase();
  if (u.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(u)) return Response.json({ error: "Enter a valid email address" }, { status: 400 });
  if (password.length < 8) return Response.json({ error: "Password must be at least 8 characters" }, { status: 400 });
  const d = await db();
  try {
    const r = await d.collection("users").insertOne({ username: u, hash: await bcrypt.hash(password, 12), teamId: null, createdAt: new Date() });
    await setSession(r.insertedId.toString());
    return Response.json({ ok: true });
  } catch (e) {
    if (e.code === 11000) return Response.json({ error: "Username already taken" }, { status: 409 });
    throw e;
  }
}
