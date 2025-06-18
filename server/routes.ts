import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all tools
  app.get("/api/tools", async (req, res) => {
    try {
      const tools = await storage.getAllTools();
      res.json(tools);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch tools" });
    }
  });

  // Get tools by category
  app.get("/api/tools/category/:category", async (req, res) => {
    try {
      const { category } = req.params;
      const tools = await storage.getToolsByCategory(category);
      res.json(tools);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch tools by category" });
    }
  });

  // Search tools
  app.get("/api/tools/search", async (req, res) => {
    try {
      const { q } = req.query;
      if (!q || typeof q !== 'string') {
        return res.status(400).json({ error: "Search query is required" });
      }
      const tools = await storage.searchTools(q);
      res.json(tools);
    } catch (error) {
      res.status(500).json({ error: "Failed to search tools" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
