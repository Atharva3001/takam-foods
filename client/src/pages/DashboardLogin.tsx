import { FormEvent, useState } from "react";
import { useLocation } from "wouter";

export default function DashboardLogin() {
  const [, setLocation] = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await fetch("/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ username, password }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Login failed");
      setLocation("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return <main className="min-h-screen bg-cream px-4 py-10 flex items-center justify-center">
    <div className="w-full max-w-md border-[3px] border-ink bg-white p-6 sm:p-8 shadow-[8px_8px_0_0_var(--ink)] rotate-[-1deg]">
      <div className="mb-7"><p className="font-display font-extrabold text-sm uppercase tracking-widest text-muted-foreground">Takam Foods</p><h1 className="font-display text-4xl font-extrabold mt-1">Dashboard Login 🔐</h1><p className="mt-2 font-semibold text-muted-foreground">Orders, enquiries & production capacity.</p></div>
      <form onSubmit={submit} className="space-y-4">
        <label className="block space-y-1.5"><span className="font-display font-bold text-sm">Username</span><input value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="username" required className="w-full border-[2.5px] border-ink bg-white px-3 py-2.5 font-semibold shadow-[2px_2px_0_0_var(--ink)] outline-none focus:ring-4 focus:ring-mascot" /></label>
        <label className="block space-y-1.5"><span className="font-display font-bold text-sm">Password</span><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" required className="w-full border-[2.5px] border-ink bg-white px-3 py-2.5 font-semibold shadow-[2px_2px_0_0_var(--ink)] outline-none focus:ring-4 focus:ring-mascot" /></label>
        {error && <p role="alert" className="border-2 border-ink bg-peach p-3 font-bold text-tomato">{error}</p>}
        <button disabled={loading} className="sticker-btn w-full bg-mascot px-5 py-3 font-display font-extrabold disabled:opacity-60">{loading ? "Signing in…" : "Sign in"}</button>
      </form>
    </div>
  </main>;
}
