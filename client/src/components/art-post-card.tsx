import { ArtPost } from "@shared/schema";
import { useState } from "react";

interface ArtPostCardProps {
  post: ArtPost;
}

export function ArtPostCard({ post }: ArtPostCardProps) {
  const [likes, setLikes] = useState(post.likes);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
  };

  return (
    <div className="art-post-card rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300" data-testid={`art-post-${post.id}`}>
      <img 
        src={post.imageUrl} 
        alt={post.title} 
        className="w-full h-48 object-cover"
        data-testid={`img-artwork-${post.id}`}
      />
      <div className="p-6">
        <h3 className="text-lg mb-2 text-primary" data-testid={`text-title-${post.id}`}>
          {post.title}
        </h3>
        <p className="text-sm opacity-80 mb-3" data-testid={`text-description-${post.id}`}>
          {post.description}
        </p>
        <p className="text-xs mb-4 opacity-60" data-testid={`text-artist-${post.id}`}>
          By {post.artistName}
        </p>
        <div className="flex items-center justify-between">
          <button 
            className={`flex items-center gap-2 transition-colors ${isLiked ? 'text-red-400' : 'hover:text-red-400'}`}
            onClick={handleLike}
            data-testid={`button-like-${post.id}`}
          >
            <i className="fas fa-heart"></i>
            <span data-testid={`text-likes-${post.id}`}>{likes}</span>
          </button>
          <button 
            className="flex items-center gap-2 hover:text-blue-400 transition-colors"
            data-testid={`button-comment-${post.id}`}
          >
            <i className="fas fa-comment"></i>
            <span data-testid={`text-comments-${post.id}`}>{post.comments}</span>
          </button>
          <span className="text-xs opacity-60" data-testid={`text-date-${post.id}`}>
            {post.createdAt}
          </span>
        </div>
      </div>
    </div>
  );
}
