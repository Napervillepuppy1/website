import { z } from "zod";

export const artPostSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  artistName: z.string(),
  imageUrl: z.string(),
  likes: z.number().default(0),
  comments: z.number().default(0),
  createdAt: z.string(),
  tags: z.array(z.string()).default([]),
});

export const userSchema = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string().email(),
  displayName: z.string(),
  bio: z.string().optional(),
  website: z.string().optional(),
  artworks: z.number().default(0),
  likes: z.number().default(0),
  followers: z.number().default(0),
  avatarUrl: z.string().optional(),
});

export const commentSchema = z.object({
  id: z.string(),
  postId: z.string(),
  authorName: z.string(),
  content: z.string(),
  createdAt: z.string(),
});

export const gameStatsSchema = z.object({
  id: z.string(),
  userId: z.string(),
  stars: z.number().default(0),
  time: z.string().default("00:00"),
  lives: z.number().default(3),
  level: z.number().default(1),
  score: z.number().default(0),
});

export type ArtPost = z.infer<typeof artPostSchema>;
export type User = z.infer<typeof userSchema>;
export type Comment = z.infer<typeof commentSchema>;
export type GameStats = z.infer<typeof gameStatsSchema>;
