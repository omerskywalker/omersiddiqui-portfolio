import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { generateOGImage } from "./og-image";

let ogImageCache: Buffer | null = null;

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/og", async (_req, res) => {
    try {
      if (!ogImageCache) {
        ogImageCache = await generateOGImage();
      }
      res.setHeader("Content-Type", "image/png");
      res.setHeader("Cache-Control", "public, max-age=86400, s-maxage=86400");
      res.send(ogImageCache);
    } catch (err) {
      console.error("OG image generation failed:", err);
      res.status(500).json({ error: "Failed to generate OG image" });
    }
  });
  app.get("/api/github/contributions", async (req, res) => {
    try {
      const response = await fetch(
        "https://github-contributions-api.jogruber.de/v4/omerskywalker?y=last"
      );
      if (!response.ok) throw new Error("Failed to fetch contributions");
      const data = await response.json();
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch GitHub contributions" });
    }
  });

  app.get("/api/github/recent-commits", async (req, res) => {
    try {
      const reposRes = await fetch(
        "https://api.github.com/users/omerskywalker/repos?sort=pushed&per_page=6",
        { headers: { "User-Agent": "portfolio-app" } }
      );
      if (!reposRes.ok) throw new Error("Failed to fetch repos");
      const repos = await reposRes.json() as Array<{ name: string; private: boolean }>;
      const publicRepos = repos.filter((r) => !r.private).slice(0, 4);

      const commitPromises = publicRepos.map(async (repo) => {
        const res = await fetch(
          `https://api.github.com/repos/omerskywalker/${repo.name}/commits?per_page=2`,
          { headers: { "User-Agent": "portfolio-app" } }
        );
        if (!res.ok) return [];
        const commits = await res.json() as Array<{ sha: string; commit: { message: string; author: { date: string } } }>;
        return commits.map((c) => ({
          message: c.commit.message.split("\n")[0],
          repo: repo.name,
          sha: c.sha.slice(0, 7),
          date: c.commit.author.date,
        }));
      });

      const all = (await Promise.all(commitPromises)).flat();
      all.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      res.json(all.slice(0, 8));
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch recent commits" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
