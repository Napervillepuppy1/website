import { ArtPost } from "@shared/schema";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface ArtPostCardProps {
  post: ArtPost;
}

export function ArtPostCard({ post }: ArtPostCardProps) {
  const [likes, setLikes] = useState(post.likes);
  const [isLiked, setIsLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([
    { id: 1, author: "ArtLover23", text: "Amazing work! Love the colors.", time: "2 hours ago" },
    { id: 2, author: "PixelMaster", text: "Great composition!", time: "1 hour ago" }
  ]);
  const { toast } = useToast();

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
    
    toast({
      title: isLiked ? "Removed like" : "Liked!",
      description: isLiked ? "You unliked this artwork" : "You liked this artwork",
    });
  };

  const handleComment = () => {
    setShowComments(!showComments);
  };

  const submitComment = () => {
    if (newComment.trim()) {
      setComments([...comments, {
        id: Date.now(),
        author: "You",
        text: newComment,
        time: "Just now"
      }]);
      setNewComment("");
      toast({
        title: "Comment added!",
        description: "Your comment has been posted",
      });
    }
  };

  return (
    <div className="art-post-card rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300 animate-fade-in" data-testid={`art-post-${post.id}`}>
      <img 
        src={post.imageUrl} 
        alt={post.title} 
        className="w-full h-48 object-cover cursor-pointer hover:opacity-90 transition-opacity"
        data-testid={`img-artwork-${post.id}`}
        onClick={() => toast({ title: "Image clicked", description: "Full image view coming soon!" })}
      />
      <div className="p-6">
        <h3 className="text-lg mb-2 text-primary" data-testid={`text-title-${post.id}`}>
          {post.title}
        </h3>
        <p className="text-sm opacity-80 mb-3" data-testid={`text-description-${post.id}`}>
          {post.description}
        </p>
        <p className="text-xs mb-4 opacity-60 cursor-pointer hover:text-primary transition-colors" data-testid={`text-artist-${post.id}`}>
          By {post.artistName}
        </p>
        
        <div className="flex items-center justify-between mb-4">
          <button 
            className={`flex items-center gap-2 transition-colors hover:scale-110 transform btn-press ${isLiked ? 'text-red-400 animate-glow' : 'hover:text-red-400'}`}
            onClick={handleLike}
            data-testid={`button-like-${post.id}`}
          >
            <i className={`fas fa-heart ${isLiked ? 'animate-pulse' : ''}`}></i>
            <span data-testid={`text-likes-${post.id}`}>{likes}</span>
          </button>
          <button 
            className="flex items-center gap-2 hover:text-blue-400 transition-colors hover:scale-110 transform btn-press"
            onClick={handleComment}
            data-testid={`button-comment-${post.id}`}
          >
            <i className="fas fa-comment"></i>
            <span data-testid={`text-comments-${post.id}`}>{comments.length}</span>
          </button>
          <button className="hover:text-secondary transition-colors hover:scale-110 transform btn-press">
            <i className="fas fa-share"></i>
          </button>
          <span className="text-xs opacity-60" data-testid={`text-date-${post.id}`}>
            {post.createdAt}
          </span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag, index) => (
            <span 
              key={index} 
              className="px-2 py-1 bg-primary bg-opacity-20 text-primary text-xs rounded-full hover:bg-opacity-30 transition-colors cursor-pointer"
              data-testid={`tag-${tag.toLowerCase().replace(' ', '-')}-${post.id}`}
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Comments Section */}
        {showComments && (
          <div className="border-t border-gray-700 pt-4" data-testid={`comments-section-${post.id}`}>
            <div className="space-y-3 mb-4 max-h-40 overflow-y-auto">
              {comments.map((comment) => (
                <div key={comment.id} className="text-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-primary font-medium">{comment.author}</span>
                    <span className="text-xs opacity-60">{comment.time}</span>
                  </div>
                  <p className="opacity-80">{comment.text}</p>
                </div>
              ))}
            </div>
            
            <div className="flex gap-2">
              <Input
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1 text-sm"
                onKeyPress={(e) => e.key === 'Enter' && submitComment()}
                data-testid={`input-comment-${post.id}`}
              />
              <Button 
                onClick={submitComment}
                size="sm"
                className="retro-gradient"
                data-testid={`button-submit-comment-${post.id}`}
              >
                <i className="fas fa-paper-plane"></i>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
