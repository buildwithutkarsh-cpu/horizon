"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function AuthForm({ mode }) {
  const r = useRouter(), [err, setErr] = useState(""), [busy, setBusy] = useState(false);
  const reg = mode === "register";
  async function submit(e) {
    e.preventDefault(); setErr(""); setBusy(true);
    const f = new FormData(e.target);
    const res = await fetch("/api/" + mode, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ username: f.get("u"), password: f.get("p") }) });
    const j = await res.json(); setBusy(false);
    if (!res.ok) return setErr(j.error);
    r.push("/dashboard"); r.refresh();
  }
  return (
    <main className="panel">
      <Link href="/" className="mk">H.</Link>
      <h1>{reg ? "Register" : "Log in"}</h1>
      <form onSubmit={submit}>
        <label>Email<input name="u" type="email" required autoComplete="email" placeholder="you@example.com" /></label>
        <label>Password<input name="p" type="password" required minLength={8} autoComplete={reg ? "new-password" : "current-password"} /></label>
        {err && <p className="err" role="alert">{err}</p>}
        <button className="btn" disabled={busy}>{busy ? "..." : reg ? "Create account" : "Log in"}</button>
      </form>
      <p className="sub">{reg ? <>Have an account? <Link href="/login">Log in</Link></> : <>New here? <Link href="/register">Register</Link></>}</p>
    </main>
  );
}
