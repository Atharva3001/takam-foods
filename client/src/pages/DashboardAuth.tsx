import { useEffect, useState, type ReactNode } from "react";
import { useLocation } from "wouter";
import DashboardLogin from "./DashboardLogin";

export default function DashboardAuth({ children }: { children: ReactNode }) {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [location] = useLocation();

  useEffect(() => {
    let cancelled = false;
    fetch("/api/auth/me").then((response) => response.json()).then((data) => { if (!cancelled) setAuthenticated(Boolean(data.authenticated)); }).catch(() => { if (!cancelled) setAuthenticated(false); });
    return () => { cancelled = true; };
  }, [location]);

  if (authenticated === null) return <main className="min-h-screen bg-cream flex items-center justify-center font-display font-bold">Checking dashboard access…</main>;
  if (!authenticated) return <DashboardLogin />;
  return <>{children}</>;
}
