import { ArtPost, User, Comment, GameStats } from "@shared/schema";

export const mockArtPosts: ArtPost[] = [
  {
    id: "1",
    title: "Mystic Realms",
    description: "Digital painting of floating islands",
    artistName: "PixelMaster42",
    imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    likes: 234,
    comments: 18,
    createdAt: "2 days ago",
    tags: ["Digital Art", "Fantasy"],
  },
  {
    id: "2",
    title: "Neon Dreams",
    description: "Cyberpunk portrait study",
    artistName: "RetroArtist99",
    imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    likes: 156,
    comments: 12,
    createdAt: "5 hours ago",
    tags: ["Portrait", "Digital Art"],
  },
  {
    id: "3",
    title: "Geometric Flow",
    description: "Abstract geometric composition",
    artistName: "AbstractVision",
    imageUrl: "https://images.unsplash.com/photo-1549490349-8643362247b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    likes: 89,
    comments: 7,
    createdAt: "1 day ago",
    tags: ["Abstract"],
  },
  {
    id: "4",
    title: "Forest Spirits",
    description: "Traditional watercolor painting",
    artistName: "NatureArtist21",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    likes: 342,
    comments: 28,
    createdAt: "3 days ago",
    tags: ["Traditional", "Nature"],
  },
  {
    id: "5",
    title: "Urban Legends",
    description: "Street art inspired digital piece",
    artistName: "StreetVibe",
    imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    likes: 178,
    comments: 15,
    createdAt: "6 hours ago",
    tags: ["Digital Art", "Street Art"],
  },
  {
    id: "6",
    title: "Silent Harmony",
    description: "Minimalist acrylic painting",
    artistName: "MinimalMood",
    imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    likes: 267,
    comments: 22,
    createdAt: "4 days ago",
    tags: ["Abstract", "Traditional"],
  },
];

export const mockUser: User = {
  id: "user-1",
  username: "PixelArtist42",
  email: "pixel.artist@artconnect.com",
  displayName: "PixelArtist42",
  bio: "Digital artist specializing in fantasy and sci-fi artwork. Always experimenting with new techniques!",
  website: "https://pixelartist42.portfolio.com",
  artworks: 24,
  likes: 1200,
  followers: 456,
};

export const mockUserArtworks: ArtPost[] = [
  {
    id: "user-art-1",
    title: "Cosmic Journey",
    description: "Space-themed digital artwork",
    artistName: "PixelArtist42",
    imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    likes: 89,
    comments: 12,
    createdAt: "2 days ago",
    tags: ["Digital Art", "Fantasy"],
  },
  {
    id: "user-art-2",
    title: "Digital Portrait",
    description: "Character design study",
    artistName: "PixelArtist42",
    imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    likes: 156,
    comments: 8,
    createdAt: "5 days ago",
    tags: ["Portrait", "Digital Art"],
  },
];

export const mockComments: Comment[] = [
  {
    id: "comment-1",
    postId: "1",
    authorName: "ArtLover23",
    content: "Amazing work! Love the color palette.",
    createdAt: "1 day ago",
  },
  {
    id: "comment-2",
    postId: "1",
    authorName: "DigitalMaster",
    content: "Great composition and lighting!",
    createdAt: "2 hours ago",
  },
];

export const mockGameStats: GameStats = {
  id: "game-1",
  userId: "user-1",
  stars: 0,
  time: "00:00",
  lives: 3,
  level: 1,
  score: 0,
};
