import { ArtPostCard } from "@/components/art-post-card";
import { mockArtPosts } from "@/lib/mock-data";

export default function Feed() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl mb-4 text-primary pixel-text-shadow" data-testid="text-feed-title">
          Art Feed
        </h1>
        <p className="text-lg opacity-80" data-testid="text-feed-subtitle">
          Discover amazing artwork from our community
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-testid="grid-art-posts">
        {mockArtPosts.map((post) => (
          <ArtPostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
