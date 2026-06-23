import express from "express";
import path from "path";
import compression from "compression";
import { createServer as createViteServer } from "vite";
import { requireAuth, AuthRequest } from "./src/middleware/auth.ts";
import { getOrCreateUser } from "./src/db/users.ts";
import { db } from "./src/db/index.ts";
import { vocabulary, phrases, lessons, progress, favorites } from "./src/db/schema.ts";
import { eq, and } from "drizzle-orm";


async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware
  app.use(compression());
  app.use(express.json());

  // API Routes
  
  // Login / Sync User Profile
 app.post("/api/auth/sync", requireAuth, async (req: AuthRequest, res) => {
  try {
    const { uid, email, name, username } = req.user!;
    
    // Використовуємо функцію getOrCreateUser для запису в БД
    // (переконайся, що функція getOrCreateUser в src/db/users.ts очікує ці параметри)
    const user = await getOrCreateUser(uid, email, name, username);
    
    res.json({ user });
  } catch (error: any) {
    console.error("Помилка синхронізації користувача:", error);
    res.status(500).json({ error: error.message });
  }
});

  // Get User Profile
  app.get("/api/user", requireAuth, async (req: AuthRequest, res) => {
    try {
      const { users: usersDb } = await import("./src/db/schema.ts");
      const usersList = await db.select().from(usersDb).where(eq(usersDb.uid, req.user!.uid));
      res.json({ user: usersList[0] });
    } catch (error: any) {
      console.error("Get user error:", error);
      res.status(500).json({ error: error.message });
    }
  });
  
  // Get Vocabulary
  app.get("/api/vocabulary", requireAuth, async (req: AuthRequest, res) => {
    try {
      const items = await db.select().from(vocabulary);
      res.json({ items });
    } catch (error: any) {
      console.error("Vocabulary error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Get Phrases
  app.get("/api/phrases", requireAuth, async (req: AuthRequest, res) => {
    try {
      const items = await db.select().from(phrases);
      res.json({ items });
    } catch (error: any) {
      console.error("Phrases error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Get Lessons
  app.get("/api/lessons", requireAuth, async (req: AuthRequest, res) => {
    try {
      const items = await db.select().from(lessons);
      res.json({ items });
    } catch (error: any) {
      console.error("Lessons error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
