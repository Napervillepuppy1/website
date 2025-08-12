import { pgTable, text, integer, timestamp, boolean, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

// Users table - integrates with Supabase Auth
export const users = pgTable("users", {
  id: uuid("id").primaryKey(), // Supabase auth user ID
  username: text("username").unique().notNull(),
  email: text("email").unique().notNull(),
  displayName: text("display_name"),
  bio: text("bio"),
  profileImageUrl: text("profile_image_url"),
  totalLikes: integer("total_likes").default(0),
  totalViews: integer("total_views").default(0),
  artworksCount: integer("artworks_count").default(0),
  followersCount: integer("followers_count").default(0),
  followingCount: integer("following_count").default(0),
  isVerified: boolean("is_verified").default(false),
  joinDate: text("join_date").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const artPosts = pgTable("art_posts", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  title: text("title").notNull(),
  description: text("description"),
  imageUrl: text("image_url").notNull(),
  artistName: text("artist_name").notNull(),
  userId: uuid("user_id").references(() => users.id).notNull(),
  tags: text("tags").array().default([]),
  likes: integer("likes").default(0),
  views: integer("views").default(0),
  comments: integer("comments").default(0),
  isPublic: boolean("is_public").default(true),
  isFeatured: boolean("is_featured").default(false),
  createdAt: text("created_at").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const comments: any = pgTable("comments", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  content: text("content").notNull(),
  authorName: text("author_name").notNull(),
  userId: uuid("user_id").references(() => users.id).notNull(),
  artPostId: integer("art_post_id").references(() => artPosts.id).notNull(),
  parentId: integer("parent_id"),
  isEdited: boolean("is_edited").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const likes = pgTable("likes", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  userId: uuid("user_id").references(() => users.id).notNull(),
  artPostId: integer("art_post_id").references(() => artPosts.id).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const follows = pgTable("follows", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  followerId: uuid("follower_id").references(() => users.id).notNull(),
  followingId: uuid("following_id").references(() => users.id).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const collections = pgTable("collections", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: text("name").notNull(),
  description: text("description"),
  userId: uuid("user_id").references(() => users.id).notNull(),
  isPublic: boolean("is_public").default(true),
  artworksCount: integer("artworks_count").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const collectionArtworks = pgTable("collection_artworks", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  collectionId: integer("collection_id").references(() => collections.id).notNull(),
  artPostId: integer("art_post_id").references(() => artPosts.id).notNull(),
  addedAt: timestamp("added_at").defaultNow().notNull(),
});

// Zod schemas for validation
export const insertUserSchema = createInsertSchema(users, {
  username: z.string().min(1).max(50),
  email: z.string().email(),
  displayName: z.string().min(1).max(100).optional(),
  bio: z.string().max(500).optional(),
}).omit({
  createdAt: true,
  updatedAt: true,
  totalLikes: true,
  totalViews: true,
  artworksCount: true,
  followersCount: true,
  followingCount: true,
});

export const insertArtPostSchema = createInsertSchema(artPosts, {
  title: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  imageUrl: z.string().url(),
  artistName: z.string().min(1).max(100),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  likes: true,
  views: true,
  comments: true,
}).extend({
  tags: z.array(z.string()).default([]),
});

export const insertCommentSchema = createInsertSchema(comments, {
  content: z.string().min(1).max(500),
  authorName: z.string().min(1).max(100),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  isEdited: true,
});

export const insertLikeSchema = createInsertSchema(likes).omit({
  id: true,
  createdAt: true,
});

export const insertFollowSchema = createInsertSchema(follows).omit({
  id: true,
  createdAt: true,
});

export const insertCollectionSchema = createInsertSchema(collections, {
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  artworksCount: true,
});

// Types
export type User = typeof users.$inferSelect;
export type NewUser = z.infer<typeof insertUserSchema>;
export type ArtPost = typeof artPosts.$inferSelect;
export type NewArtPost = z.infer<typeof insertArtPostSchema>;
export type Comment = typeof comments.$inferSelect;
export type NewComment = z.infer<typeof insertCommentSchema>;
export type Like = typeof likes.$inferSelect;
export type NewLike = z.infer<typeof insertLikeSchema>;
export type Follow = typeof follows.$inferSelect;
export type NewFollow = z.infer<typeof insertFollowSchema>;
export type Collection = typeof collections.$inferSelect;
export type NewCollection = z.infer<typeof insertCollectionSchema>;

// Legacy types for backwards compatibility
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
  totalLikes: z.number().default(0),
  totalViews: z.number().default(0),
  followers: z.number().default(0),
  avatarUrl: z.string().optional(),
  joinDate: z.string(),
});

export const commentSchema = z.object({
  id: z.string(),
  postId: z.string(),
  authorName: z.string(),
  content: z.string(),
  createdAt: z.string(),
});