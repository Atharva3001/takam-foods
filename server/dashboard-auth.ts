import "dotenv/config";
import type { NextFunction, Request, Response } from "express";
import crypto from "crypto";

const sessionCookie = "takam_dashboard_session";
const sessions = new Set<string>();

function getCredentials() {
  return {
    username: process.env.DASHBOARD_USERNAME || "",
    password: process.env.DASHBOARD_PASSWORD || "",
  };
}

function parseCookies(req: Request) {
  const header = req.headers.cookie || "";
  return Object.fromEntries(header.split(";").map((part) => part.trim().split("=")).filter(([key]) => key).map(([key, ...value]) => [key, decodeURIComponent(value.join("="))]));
}

export function dashboardAuthConfigured() {
  const { username, password } = getCredentials();
  return Boolean(username && password);
}

export function requireDashboardAuth(req: Request, res: Response, next: NextFunction) {
  const cookies = parseCookies(req);
  if (cookies[sessionCookie] && sessions.has(cookies[sessionCookie])) return next();
  res.status(401).json({ error: "Dashboard authentication required" });
}

export function registerDashboardAuth(app: import("express").Express) {
  app.post("/api/auth/login", (req, res) => {
    const { username, password } = getCredentials();
    if (!username || !password) return res.status(503).json({ error: "Dashboard authentication is not configured" });
    const suppliedUsername = String(req.body?.username || "");
    const suppliedPassword = String(req.body?.password || "");
    if (suppliedUsername !== username || suppliedPassword !== password) return res.status(401).json({ error: "Invalid username or password" });

    const token = crypto.randomBytes(32).toString("hex");
    sessions.add(token);
    const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
    res.setHeader("Set-Cookie", `${sessionCookie}=${encodeURIComponent(token)}; HttpOnly; SameSite=Lax; Path=/; Max-Age=604800${secure}`);
    res.json({ ok: true });
  });

  app.post("/api/auth/logout", (req, res) => {
    const cookies = parseCookies(req);
    if (cookies[sessionCookie]) sessions.delete(cookies[sessionCookie]);
    res.setHeader("Set-Cookie", `${sessionCookie}=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0`);
    res.json({ ok: true });
  });

  app.get("/api/auth/me", (req, res) => {
    const cookies = parseCookies(req);
    res.json({ authenticated: Boolean(cookies[sessionCookie] && sessions.has(cookies[sessionCookie])) });
  });
}
