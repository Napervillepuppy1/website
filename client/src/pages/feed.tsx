import { ArtPostCard } from "@/components/art-post-card";
import { mockArtPosts } from "@/lib/mock-data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Feed() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  const allTags = ["All", ...Array.from(new Set(mockArtPosts.flatMap(post => post.tags)))];

  const filteredPosts = mockArtPosts
    .filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.artistName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTag = selectedTag === "All" || post.tags.includes(selectedTag);
      return matchesSearch && matchesTag;
    })
    .sort((a, b) => {
      if (sortBy === "popular") return b.likes - a.likes;
      if (sortBy === "comments") return b.comments - a.comments;
      return 0; // newest (default order)
    });

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

      {/* Search and Filter Controls */}
      <div className="art-post-card rounded-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Search artwork, artists, or descriptions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
              data-testid="input-search"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {allTags.map(tag => (
              <Button
                key={tag}
                variant={selectedTag === tag ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTag(tag)}
                className={selectedTag === tag ? "retro-gradient" : ""}
                data-testid={`filter-tag-${tag.toLowerCase().replace(' ', '-')}`}
              >
                {tag}
              </Button>
            ))}
          </div>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-sm"
            data-testid="select-sort"
          >
            <option value="newest">Newest</option>
            <option value="popular">Most Liked</option>
            <option value="comments">Most Comments</option>
          </select>
        </div>
      </div>

      {/* Results Info */}
      <div className="mb-6 text-center opacity-80">
        <p data-testid="text-results-count">
          Showing {filteredPosts.length} of {mockArtPosts.length} artworks
          {searchTerm && ` for "${searchTerm}"`}
          {selectedTag !== "All" && ` in ${selectedTag}`}
        </p>
      </div>

      {/* Art Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-testid="grid-art-posts">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <ArtPostCard key={post.id} post={post} />
          ))
        ) : (
          <div className="col-span-full text-center py-12" data-testid="no-results">
            <div className="text-6xl mb-4 opacity-50">🎨</div>
            <h3 className="text-xl mb-2 text-primary">No artwork found</h3>
            <p className="opacity-80">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
