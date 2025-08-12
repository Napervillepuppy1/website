import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertArtPostSchema, insertCommentSchema } from "@shared/schema";
import { randomUUID } from "crypto";
import { fromZodError } from "zod-validation-error";

// Simple auth middleware - check for user session
const requireAuth = (req: Request, res: Response, next: Function) => {
  const userId = req.headers['x-user-id'] as string;
  if (!userId) {
    return res.status(401).json({ error: "Authentication required" });
  }
  req.userId = userId;
  next();
};

// Mock user for development
const mockUser = {
  id: "user-mock-id",
  username: "artlover",
  email: "art@example.com",
  displayName: "Art Lover",
  bio: "Passionate about digital art and creativity",
  profileImageUrl: "https://images.unsplash.com/photo-1566753323558-f4e0952af115",
  totalLikes: 42,
  totalViews: 156,
  artworksCount: 8,
  followersCount: 24,
  followingCount: 18,
  isVerified: false,
  joinDate: "2024-01-15",
  createdAt: new Date(),
  updatedAt: new Date(),
};

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Auth routes
  app.post("/api/auth/register", async (req: Request, res: Response) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const existingUser = await storage.getUserByEmail(userData.email);
      
      if (existingUser) {
        return res.status(400).json({ error: "Email already registered" });
      }
      
      const user = await storage.createUser(userData);
      res.json({ user, message: "User created successfully" });
    } catch (error: any) {
      if (error.name === "ZodError") {
        return res.status(400).json({ error: fromZodError(error).toString() });
      }
      console.error("Registration error:", error);
      res.status(500).json({ error: "Registration failed" });
    }
  });

  app.post("/api/auth/login", async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      
      // For now, return mock user for any valid email
      if (email && password) {
        res.json({ user: mockUser, message: "Login successful" });
      } else {
        res.status(400).json({ error: "Email and password required" });
      }
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "Login failed" });
    }
  });

  app.get("/api/auth/user", async (req: Request, res: Response) => {
    try {
      const userId = req.headers['x-user-id'] as string;
      if (!userId) {
        return res.status(401).json({ error: "Not authenticated" });
      }
      
      const user = await storage.getUser(userId) || mockUser;
      res.json({ user });
    } catch (error) {
      console.error("Get user error:", error);
      res.status(500).json({ error: "Failed to get user" });
    }
  });

  // User routes
  app.get("/api/users/:id", async (req: Request, res: Response) => {
    try {
      const user = await storage.getUser(req.params.id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json({ user });
    } catch (error) {
      console.error("Get user error:", error);
      res.status(500).json({ error: "Failed to get user" });
    }
  });

  app.put("/api/users/:id", requireAuth, async (req: Request, res: Response) => {
    try {
      if (req.params.id !== req.userId) {
        return res.status(403).json({ error: "Unauthorized" });
      }
      
      const user = await storage.updateUser(req.params.id, req.body);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json({ user });
    } catch (error) {
      console.error("Update user error:", error);
      res.status(500).json({ error: "Failed to update user" });
    }
  });

  // Art posts routes
  app.get("/api/art-posts", async (req: Request, res: Response) => {
    try {
      const limit = parseInt(req.query.limit as string) || 20;
      const offset = parseInt(req.query.offset as string) || 0;
      const artPosts = await storage.getArtPosts(limit, offset);
      res.json({ artPosts });
    } catch (error) {
      console.error("Get art posts error:", error);
      res.status(500).json({ error: "Failed to get art posts" });
    }
  });

  app.get("/api/art-posts/:id", async (req: Request, res: Response) => {
    try {
      const artPost = await storage.getArtPost(parseInt(req.params.id));
      if (!artPost) {
        return res.status(404).json({ error: "Art post not found" });
      }
      res.json({ artPost });
    } catch (error) {
      console.error("Get art post error:", error);
      res.status(500).json({ error: "Failed to get art post" });
    }
  });

  app.post("/api/art-posts", requireAuth, async (req: Request, res: Response) => {
    try {
      const postData = insertArtPostSchema.parse({
        ...req.body,
        userId: req.userId,
      });
      
      const artPost = await storage.createArtPost(postData);
      res.status(201).json({ artPost });
    } catch (error: any) {
      if (error.name === "ZodError") {
        return res.status(400).json({ error: fromZodError(error).toString() });
      }
      console.error("Create art post error:", error);
      res.status(500).json({ error: "Failed to create art post" });
    }
  });

  app.put("/api/art-posts/:id", requireAuth, async (req: Request, res: Response) => {
    try {
      const artPost = await storage.updateArtPost(parseInt(req.params.id), req.body);
      if (!artPost) {
        return res.status(404).json({ error: "Art post not found" });
      }
      res.json({ artPost });
    } catch (error) {
      console.error("Update art post error:", error);
      res.status(500).json({ error: "Failed to update art post" });
    }
  });

  app.delete("/api/art-posts/:id", requireAuth, async (req: Request, res: Response) => {
    try {
      const success = await storage.deleteArtPost(parseInt(req.params.id));
      if (!success) {
        return res.status(404).json({ error: "Art post not found" });
      }
      res.json({ message: "Art post deleted successfully" });
    } catch (error) {
      console.error("Delete art post error:", error);
      res.status(500).json({ error: "Failed to delete art post" });
    }
  });

  app.get("/api/users/:id/art-posts", async (req: Request, res: Response) => {
    try {
      const artPosts = await storage.getUserArtPosts(req.params.id);
      res.json({ artPosts });
    } catch (error) {
      console.error("Get user art posts error:", error);
      res.status(500).json({ error: "Failed to get user art posts" });
    }
  });

  // Comments routes
  app.get("/api/art-posts/:id/comments", async (req: Request, res: Response) => {
    try {
      const comments = await storage.getComments(parseInt(req.params.id));
      res.json({ comments });
    } catch (error) {
      console.error("Get comments error:", error);
      res.status(500).json({ error: "Failed to get comments" });
    }
  });

  app.post("/api/art-posts/:id/comments", requireAuth, async (req: Request, res: Response) => {
    try {
      const commentData = insertCommentSchema.parse({
        ...req.body,
        userId: req.userId,
        artPostId: parseInt(req.params.id),
      });
      
      const comment = await storage.createComment(commentData);
      res.status(201).json({ comment });
    } catch (error: any) {
      if (error.name === "ZodError") {
        return res.status(400).json({ error: fromZodError(error).toString() });
      }
      console.error("Create comment error:", error);
      res.status(500).json({ error: "Failed to create comment" });
    }
  });

  // Likes routes
  app.post("/api/art-posts/:id/like", requireAuth, async (req: Request, res: Response) => {
    try {
      const result = await storage.toggleLike(req.userId!, parseInt(req.params.id));
      res.json(result);
    } catch (error) {
      console.error("Toggle like error:", error);
      res.status(500).json({ error: "Failed to toggle like" });
    }
  });

  app.get("/api/users/:id/likes", async (req: Request, res: Response) => {
    try {
      const likes = await storage.getUserLikes(req.params.id);
      res.json({ likes });
    } catch (error) {
      console.error("Get user likes error:", error);
      res.status(500).json({ error: "Failed to get user likes" });
    }
  });

  // Follow routes
  app.post("/api/users/:id/follow", requireAuth, async (req: Request, res: Response) => {
    try {
      if (req.params.id === req.userId) {
        return res.status(400).json({ error: "Cannot follow yourself" });
      }
      
      const result = await storage.toggleFollow(req.userId!, req.params.id);
      res.json(result);
    } catch (error) {
      console.error("Toggle follow error:", error);
      res.status(500).json({ error: "Failed to toggle follow" });
    }
  });

  app.get("/api/users/:id/following", async (req: Request, res: Response) => {
    try {
      const following = await storage.getUserFollowing(req.params.id);
      res.json({ following });
    } catch (error) {
      console.error("Get user following error:", error);
      res.status(500).json({ error: "Failed to get user following" });
    }
  });

  app.get("/api/users/:id/followers", async (req: Request, res: Response) => {
    try {
      const followers = await storage.getUserFollowers(req.params.id);
      res.json({ followers });
    } catch (error) {
      console.error("Get user followers error:", error);
      res.status(500).json({ error: "Failed to get user followers" });
    }
  });

  // Search routes
  app.get("/api/search/art-posts", async (req: Request, res: Response) => {
    try {
      const query = req.query.q as string || "";
      const tags = req.query.tags ? (req.query.tags as string).split(",") : undefined;
      const artPosts = await storage.searchArtPosts(query, tags);
      res.json({ artPosts });
    } catch (error) {
      console.error("Search art posts error:", error);
      res.status(500).json({ error: "Failed to search art posts" });
    }
  });

  // Health check
  app.get("/api/health", async (req: Request, res: Response) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  const httpServer = createServer(app);
  return httpServer;
}

// Extend Express Request interface
declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}