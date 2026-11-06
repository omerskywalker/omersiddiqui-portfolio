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
  const httpServer = createServer(app);
  return httpServer;
}
