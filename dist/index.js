// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
var MemStorage = class {
  users;
  tools;
  currentUserId;
  currentToolId;
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.tools = /* @__PURE__ */ new Map();
    this.currentUserId = 1;
    this.currentToolId = 1;
    this.initializeTools();
  }
  initializeTools() {
    const staticTools = [
      {
        name: "ChatGPT",
        description: "\u5F3A\u5927\u7684\u5BF9\u8BDD\u5F0FAI\u52A9\u624B\uFF0C\u80FD\u591F\u56DE\u7B54\u95EE\u9898\u3001\u534F\u52A9\u5199\u4F5C\u3001\u7F16\u7A0B\u7B49\u591A\u79CD\u4EFB\u52A1",
        url: "https://chat.openai.com",
        category: "text",
        tags: ["\u5BF9\u8BDD", "\u5199\u4F5C", "\u7F16\u7A0B"],
        rating: 4.9,
        pricing: "\u514D\u8D39",
        logo: "GP",
        isOnline: true
      },
      {
        name: "Claude",
        description: "Anthropic\u5F00\u53D1\u7684AI\u52A9\u624B\uFF0C\u64C5\u957F\u5206\u6790\u3001\u5199\u4F5C\u548C\u590D\u6742\u63A8\u7406\u4EFB\u52A1",
        url: "https://claude.ai",
        category: "text",
        tags: ["\u5206\u6790", "\u63A8\u7406", "\u5199\u4F5C"],
        rating: 4.8,
        pricing: "\u4ED8\u8D39",
        logo: "CL",
        isOnline: true
      },
      {
        name: "Midjourney",
        description: "\u9876\u7EA7AI\u56FE\u50CF\u751F\u6210\u5DE5\u5177\uFF0C\u901A\u8FC7\u6587\u672C\u63CF\u8FF0\u521B\u5EFA\u9AD8\u8D28\u91CF\u7684\u827A\u672F\u4F5C\u54C1",
        url: "https://midjourney.com",
        category: "image",
        tags: ["\u827A\u672F", "\u8BBE\u8BA1", "\u521B\u610F"],
        rating: 4.9,
        pricing: "\u4ED8\u8D39",
        logo: "MD",
        isOnline: true
      },
      {
        name: "Stable Diffusion",
        description: "\u5F00\u6E90\u7684AI\u56FE\u50CF\u751F\u6210\u6A21\u578B\uFF0C\u53EF\u672C\u5730\u90E8\u7F72\u548C\u81EA\u5B9A\u4E49\u8BAD\u7EC3",
        url: "https://stability.ai",
        category: "image",
        tags: ["\u5F00\u6E90", "\u672C\u5730", "\u53EF\u5B9A\u5236"],
        rating: 4.6,
        pricing: "\u514D\u8D39",
        logo: "SD",
        isOnline: true
      },
      {
        name: "GitHub Copilot",
        description: "GitHub\u63A8\u51FA\u7684AI\u7F16\u7A0B\u52A9\u624B\uFF0C\u5B9E\u65F6\u4EE3\u7801\u5EFA\u8BAE\u548C\u81EA\u52A8\u8865\u5168",
        url: "https://github.com/features/copilot",
        category: "code",
        tags: ["\u7F16\u7A0B", "\u81EA\u52A8\u8865\u5168", "\u591A\u8BED\u8A00"],
        rating: 4.7,
        pricing: "\u4ED8\u8D39",
        logo: "CP",
        isOnline: true
      },
      {
        name: "Tabnine",
        description: "AI\u4EE3\u7801\u81EA\u52A8\u5B8C\u6210\u5DE5\u5177\uFF0C\u652F\u6301\u591A\u79CD\u7F16\u7A0B\u8BED\u8A00\u548CIDE\u96C6\u6210",
        url: "https://tabnine.com",
        category: "code",
        tags: ["AI\u8865\u5168", "IDE\u96C6\u6210", "\u56E2\u961F\u534F\u4F5C"],
        rating: 4.4,
        pricing: "\u514D\u8D39\u8BD5\u7528",
        logo: "TB",
        isOnline: true
      },
      {
        name: "ElevenLabs",
        description: "\u5148\u8FDB\u7684AI\u8BED\u97F3\u5408\u6210\u548C\u514B\u9686\u6280\u672F\uFF0C\u751F\u6210\u81EA\u7136\u6D41\u7545\u7684\u8BED\u97F3",
        url: "https://elevenlabs.io",
        category: "audio",
        tags: ["\u8BED\u97F3\u5408\u6210", "\u58F0\u97F3\u514B\u9686", "\u591A\u8BED\u8A00"],
        rating: 4.8,
        pricing: "\u4ED8\u8D39",
        logo: "EL",
        isOnline: true
      },
      {
        name: "Runway ML",
        description: "AI\u89C6\u9891\u751F\u6210\u548C\u7F16\u8F91\u5E73\u53F0\uFF0C\u652F\u6301\u6587\u672C\u751F\u6210\u89C6\u9891\u548C\u89C6\u9891\u7279\u6548",
        url: "https://runwayml.com",
        category: "video",
        tags: ["\u89C6\u9891\u751F\u6210", "\u7279\u6548", "\u7F16\u8F91"],
        rating: 4.5,
        pricing: "\u4ED8\u8D39",
        logo: "RW",
        isOnline: true
      },
      {
        name: "Jasper AI",
        description: "\u4E13\u4E1A\u7684AI\u8425\u9500\u5185\u5BB9\u751F\u6210\u5DE5\u5177\uFF0C\u5E2E\u52A9\u521B\u5EFA\u535A\u5BA2\u3001\u5E7F\u544A\u548C\u8425\u9500\u6587\u6848",
        url: "https://jasper.ai",
        category: "business",
        tags: ["\u8425\u9500", "\u6587\u6848", "\u535A\u5BA2"],
        rating: 4.3,
        pricing: "\u4ED8\u8D39",
        logo: "JA",
        isOnline: true
      },
      {
        name: "Perplexity AI",
        description: "AI\u9A71\u52A8\u7684\u641C\u7D22\u5F15\u64CE\uFF0C\u63D0\u4F9B\u51C6\u786E\u7684\u7B54\u6848\u548C\u5F15\u7528\u6765\u6E90",
        url: "https://perplexity.ai",
        category: "research",
        tags: ["\u641C\u7D22", "\u7814\u7A76", "\u5F15\u7528"],
        rating: 4.7,
        pricing: "\u514D\u8D39",
        logo: "PE",
        isOnline: true
      },
      {
        name: "Notion AI",
        description: "\u96C6\u6210\u5728Notion\u4E2D\u7684AI\u52A9\u624B\uFF0C\u5E2E\u52A9\u5199\u4F5C\u3001\u603B\u7ED3\u548C\u5185\u5BB9\u751F\u6210",
        url: "https://notion.so",
        category: "text",
        tags: ["\u7B14\u8BB0", "\u5199\u4F5C", "\u603B\u7ED3"],
        rating: 4.4,
        pricing: "\u4ED8\u8D39",
        logo: "NO",
        isOnline: true
      }
    ];
    staticTools.forEach((tool) => {
      const id = this.currentToolId++;
      this.tools.set(id, { ...tool, id });
    });
  }
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  async createUser(insertUser) {
    const id = this.currentUserId++;
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  async getAllTools() {
    return Array.from(this.tools.values());
  }
  async getToolsByCategory(category) {
    return Array.from(this.tools.values()).filter((tool) => tool.category === category);
  }
  async searchTools(query) {
    const lowerQuery = query.toLowerCase();
    return Array.from(this.tools.values()).filter(
      (tool) => tool.name.toLowerCase().includes(lowerQuery) || tool.description.toLowerCase().includes(lowerQuery) || tool.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
    );
  }
};
var storage = new MemStorage();

// server/routes.ts
async function registerRoutes(app2) {
  app2.get("/api/tools", async (req, res) => {
    try {
      const tools = await storage.getAllTools();
      res.json(tools);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch tools" });
    }
  });
  app2.get("/api/tools/category/:category", async (req, res) => {
    try {
      const { category } = req.params;
      const tools = await storage.getToolsByCategory(category);
      res.json(tools);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch tools by category" });
    }
  });
  app2.get("/api/tools/search", async (req, res) => {
    try {
      const { q } = req.query;
      if (!q || typeof q !== "string") {
        return res.status(400).json({ error: "Search query is required" });
      }
      const tools = await storage.searchTools(q);
      res.json(tools);
    } catch (error) {
      res.status(500).json({ error: "Failed to search tools" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5e3;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: false
  }, () => {
    log(`serving on port ${port}`);
  });
})();
