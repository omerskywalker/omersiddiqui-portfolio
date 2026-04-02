import express, { type Request, Response, NextFunction } from "express";
import path from "path";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();

// Trust proxy headers (important for cloud platforms like Replit)
app.enable('trust proxy');

// Force HTTPS in production
if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    // Check if request is already secure
    const proto = req.headers['x-forwarded-proto'];
    const protoString = Array.isArray(proto) ? proto[0] : proto;
    const isSecure = req.secure || (protoString && protoString.split(',')[0].trim().toLowerCase() === 'https');
    
    if (!isSecure) {
      // Get and normalize the host (lowercase, strip default ports)
      let host = req.get('host');
      if (host) {
        host = host.toLowerCase().replace(/:80$/, '').replace(/:443$/, '');
        
        // Build strict allowlist of known-good hosts (no wildcards)
        const allowedHosts = new Set<string>();
        
        // Add custom domain from environment if set
        if (process.env.CANONICAL_HOST) {
          allowedHosts.add(process.env.CANONICAL_HOST.toLowerCase());
        }
        
        // Add Replit-specific domains if env vars are present
        if (process.env.REPL_SLUG && process.env.REPL_OWNER) {
          allowedHosts.add(`${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`.toLowerCase());
          allowedHosts.add(`${process.env.REPL_SLUG}-${process.env.REPL_OWNER}.replit.app`.toLowerCase());
        }
        
        // Add common Replit domain from REPLIT_DOMAINS if present
        if (process.env.REPLIT_DOMAINS) {
          const domains = process.env.REPLIT_DOMAINS.split(',');
          domains.forEach(domain => allowedHosts.add(domain.trim().toLowerCase()));
        }
        
        // Only redirect if host is in the strict allowlist
        if (allowedHosts.has(host)) {
          return res.redirect(301, `https://${host}${req.url}`);
        }
      }
    }
    next();
  });
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve attached_assets as static files
app.use('/attached_assets', express.static(path.resolve(import.meta.dirname, '..', 'attached_assets')));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = parseInt(process.env.PORT || '5000', 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });
})();
