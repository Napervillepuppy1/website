import { randomUUID } from "crypto";
import { 
  type User, 
  type ArtPost, 
  type Comment, 
  type Like, 
  type NewUser, 
  type NewArtPost, 
  type NewComment, 
  type NewLike 
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: NewUser): Promise<User>;
  updateUser(id: string, user: Partial<User>): Promise<User | undefined>;
  
  // Art post operations
  getArtPosts(limit?: number, offset?: number): Promise<ArtPost[]>;
  getArtPost(id: number): Promise<ArtPost | undefined>;
  getUserArtPosts(userId: string): Promise<ArtPost[]>;
  createArtPost(post: NewArtPost): Promise<ArtPost>;
  updateArtPost(id: number, post: Partial<ArtPost>): Promise<ArtPost | undefined>;
  deleteArtPost(id: number): Promise<boolean>;

  // Comment operations
  getComments(artPostId: number): Promise<Comment[]>;
  createComment(comment: NewComment): Promise<Comment>;
  deleteComment(id: number): Promise<boolean>;

  // Like operations
  toggleLike(userId: string, artPostId: number): Promise<{ liked: boolean; likeCount: number }>;
  getUserLikes(userId: string): Promise<number[]>;
  
  // Follow operations
  toggleFollow(followerId: string, followingId: string): Promise<{ following: boolean; followerCount: number }>;
  getUserFollowing(userId: string): Promise<string[]>;
  getUserFollowers(userId: string): Promise<string[]>;
  
  // Search operations
  searchArtPosts(query: string, tags?: string[]): Promise<ArtPost[]>;
}

class MemoryStorage implements IStorage {
  private users = new Map<string, User>();
  private artPosts = new Map<number, ArtPost>();
  private comments = new Map<number, Comment>();
  private likes = new Map<string, { userId: string; artPostId: number }>();
  private follows = new Map<string, { followerId: string; followingId: string }>();
  private nextArtPostId = 1;
  private nextCommentId = 1;

  constructor() {
    this.initializeMockData();
  }

  private initializeMockData() {
    // Create some mock art posts for testing
    const mockArtPosts = [
      {
        id: 1,
        title: "Digital Sunset",
        description: "A beautiful digital painting of a sunset over mountains",
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
        artistName: "Art Lover",
        userId: "user-mock-id",
        tags: ["digital", "landscape", "sunset"],
        likes: 24,
        views: 156,
        comments: 8,
        isPublic: true,
        isFeatured: true,
        createdAt: "2024-01-15",
        updatedAt: new Date(),
      },
      {
        id: 2,
        title: "Abstract Colors",
        description: "An exploration of color and form",
        imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262",
        artistName: "Creative Mind",
        userId: "user-creative",
        tags: ["abstract", "colorful", "modern"],
        likes: 18,
        views: 89,
        comments: 3,
        isPublic: true,
        isFeatured: false,
        createdAt: "2024-01-14",
        updatedAt: new Date(),
      },
    ];

    mockArtPosts.forEach(post => {
      this.artPosts.set(post.id, post as ArtPost);
    });

    this.nextArtPostId = 3;
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    for (const user of this.users.values()) {
      if (user.email === email) {
        return user;
      }
    }
    return undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    for (const user of this.users.values()) {
      if (user.username === username) {
        return user;
      }
    }
    return undefined;
  }

  async createUser(userData: NewUser): Promise<User> {
    const id = randomUUID();
    const joinDate = new Date().toLocaleDateString();
    const user: User = {
      id,
      ...userData,
      totalLikes: 0,
      totalViews: 0,
      artworksCount: 0,
      followersCount: 0,
      followingCount: 0,
      isVerified: false,
      joinDate,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: string, userData: Partial<User>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...userData, updatedAt: new Date() };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async getArtPosts(limit = 50, offset = 0): Promise<ArtPost[]> {
    const posts = Array.from(this.artPosts.values())
      .filter(post => post.isPublic)
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      .slice(offset, offset + limit);
    
    return posts;
  }

  async getArtPost(id: number): Promise<ArtPost | undefined> {
    return this.artPosts.get(id);
  }

  async getUserArtPosts(userId: string): Promise<ArtPost[]> {
    return Array.from(this.artPosts.values())
      .filter(post => post.userId === userId)
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  }

  async createArtPost(postData: NewArtPost): Promise<ArtPost> {
    const id = this.nextArtPostId++;
    const createdAt = new Date().toLocaleDateString();
    const artPost: ArtPost = {
      id,
      ...postData,
      likes: 0,
      views: 0,
      comments: 0,
      isPublic: true,
      isFeatured: false,
      createdAt,
      updatedAt: new Date(),
    };
    
    this.artPosts.set(id, artPost);
    
    // Update user artwork count
    const user = this.users.get(postData.userId);
    if (user) {
      user.artworksCount = (user.artworksCount || 0) + 1;
      this.users.set(postData.userId, user);
    }
    
    return artPost;
  }

  async updateArtPost(id: number, postData: Partial<ArtPost>): Promise<ArtPost | undefined> {
    const post = this.artPosts.get(id);
    if (!post) return undefined;
    
    const updatedPost = { ...post, ...postData, updatedAt: new Date() };
    this.artPosts.set(id, updatedPost);
    return updatedPost;
  }

  async deleteArtPost(id: number): Promise<boolean> {
    return this.artPosts.delete(id);
  }

  async getComments(artPostId: number): Promise<Comment[]> {
    return Array.from(this.comments.values())
      .filter(comment => comment.artPostId === artPostId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async createComment(commentData: NewComment): Promise<Comment> {
    const id = this.nextCommentId++;
    const comment: Comment = {
      id,
      ...commentData,
      parentId: null,
      isEdited: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    this.comments.set(id, comment);
    
    // Update art post comment count
    const post = this.artPosts.get(commentData.artPostId);
    if (post) {
      post.comments = (post.comments || 0) + 1;
      this.artPosts.set(commentData.artPostId, post);
    }
    
    return comment;
  }

  async deleteComment(id: number): Promise<boolean> {
    return this.comments.delete(id);
  }

  async toggleLike(userId: string, artPostId: number): Promise<{ liked: boolean; likeCount: number }> {
    const likeKey = `${userId}-${artPostId}`;
    const existingLike = this.likes.get(likeKey);
    
    if (existingLike) {
      // Remove like
      this.likes.delete(likeKey);
      const post = this.artPosts.get(artPostId);
      if (post) {
        post.likes = Math.max(0, (post.likes || 0) - 1);
        this.artPosts.set(artPostId, post);
      }
      return { liked: false, likeCount: post?.likes || 0 };
    } else {
      // Add like
      this.likes.set(likeKey, { userId, artPostId });
      const post = this.artPosts.get(artPostId);
      if (post) {
        post.likes = (post.likes || 0) + 1;
        this.artPosts.set(artPostId, post);
      }
      return { liked: true, likeCount: post?.likes || 0 };
    }
  }

  async getUserLikes(userId: string): Promise<number[]> {
    const userLikes: number[] = [];
    for (const [key, like] of this.likes.entries()) {
      if (like.userId === userId) {
        userLikes.push(like.artPostId);
      }
    }
    return userLikes;
  }

  async toggleFollow(followerId: string, followingId: string): Promise<{ following: boolean; followerCount: number }> {
    const followKey = `${followerId}-${followingId}`;
    const existingFollow = this.follows.get(followKey);
    
    if (existingFollow) {
      this.follows.delete(followKey);
      const followers = await this.getUserFollowers(followingId);
      return { following: false, followerCount: followers.length };
    } else {
      this.follows.set(followKey, { followerId, followingId });
      const followers = await this.getUserFollowers(followingId);
      return { following: true, followerCount: followers.length };
    }
  }

  async getUserFollowing(userId: string): Promise<string[]> {
    const following: string[] = [];
    for (const follow of this.follows.values()) {
      if (follow.followerId === userId) {
        following.push(follow.followingId);
      }
    }
    return following;
  }

  async getUserFollowers(userId: string): Promise<string[]> {
    const followers: string[] = [];
    for (const follow of this.follows.values()) {
      if (follow.followingId === userId) {
        followers.push(follow.followerId);
      }
    }
    return followers;
  }

  async searchArtPosts(query: string, tags?: string[]): Promise<ArtPost[]> {
    return Array.from(this.artPosts.values())
      .filter(post => post.isPublic)
      .filter(post => {
        const matchesQuery = !query || 
          post.title.toLowerCase().includes(query.toLowerCase()) ||
          post.description?.toLowerCase().includes(query.toLowerCase()) ||
          post.artistName.toLowerCase().includes(query.toLowerCase());
        
        const matchesTags = !tags || tags.length === 0 ||
          tags.some(tag => post.tags?.includes(tag));
        
        return matchesQuery && matchesTags;
      })
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  }
}

export const storage: IStorage = new MemoryStorage();