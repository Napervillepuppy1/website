import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArtPostCard } from "@/components/art-post-card";
import { mockUser, mockUserArtworks, mockArtPosts } from "@/lib/mock-data";
import { useToast } from "@/hooks/use-toast";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("my-art");
  const { toast } = useToast();

  const likedArtworks = mockArtPosts.slice(0, 3);

  const handleSettingsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Settings Saved",
      description: "Your profile settings have been updated successfully!",
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Profile Header */}
      <div className="art-post-card rounded-lg p-8 mb-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-3xl" data-testid="avatar-user">
            <i className="fas fa-user"></i>
          </div>
          <div className="text-center md:text-left flex-1">
            <h1 className="text-2xl md:text-3xl mb-2 text-primary pixel-text-shadow" data-testid="text-username">
              {mockUser.displayName}
            </h1>
            <p className="text-lg opacity-80 mb-4" data-testid="text-email">
              {mockUser.email}
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm">
              <div className="flex items-center gap-2">
                <i className="fas fa-images text-primary"></i>
                <span data-testid="text-artworks-count">{mockUser.artworks} Artworks</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="fas fa-heart text-red-400"></i>
                <span data-testid="text-likes-count">{mockUser.likes} Likes</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="fas fa-users text-secondary"></i>
                <span data-testid="text-followers-count">{mockUser.followers} Followers</span>
              </div>
            </div>
          </div>
          <Button className="retro-gradient hover:opacity-90 transition-opacity" data-testid="button-edit-profile">
            Edit Profile
          </Button>
        </div>
      </div>

      {/* Profile Tabs */}
      <div className="mb-8">
        <div className="flex border-b border-gray-700">
          {[
            { id: "my-art", label: "My Art" },
            { id: "liked", label: "Liked" },
            { id: "settings", label: "Settings" },
          ].map(tab => (
            <button 
              key={tab.id}
              className={`px-6 py-3 text-sm hover:text-primary transition-colors border-b-2 ${
                activeTab === tab.id ? "border-primary text-primary" : "border-transparent"
              }`}
              onClick={() => setActiveTab(tab.id)}
              data-testid={`tab-${tab.id}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* My Art Tab */}
      {activeTab === "my-art" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="tab-content-my-art">
          {mockUserArtworks.map((artwork) => (
            <div key={artwork.id} className="relative">
              <ArtPostCard post={artwork} />
              <button 
                className="absolute top-4 right-4 text-red-400 hover:text-red-300 bg-black bg-opacity-50 p-2 rounded"
                data-testid={`button-delete-${artwork.id}`}
              >
                <i className="fas fa-trash"></i>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Liked Tab */}
      {activeTab === "liked" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="tab-content-liked">
          {likedArtworks.map((artwork) => (
            <ArtPostCard key={artwork.id} post={artwork} />
          ))}
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === "settings" && (
        <div className="art-post-card rounded-lg p-8 max-w-2xl" data-testid="tab-content-settings">
          <h3 className="text-xl mb-6 text-primary">Profile Settings</h3>
          <form onSubmit={handleSettingsSubmit} data-testid="form-settings">
            <div className="mb-6">
              <Label htmlFor="displayName" className="block text-sm mb-2 text-primary">
                Display Name
              </Label>
              <Input 
                type="text" 
                id="displayName" 
                name="displayName" 
                defaultValue={mockUser.displayName}
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-primary focus:outline-none transition-colors"
                data-testid="input-display-name"
              />
            </div>
            
            <div className="mb-6">
              <Label htmlFor="bio" className="block text-sm mb-2 text-primary">
                Bio
              </Label>
              <Textarea 
                id="bio" 
                name="bio" 
                rows={4} 
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-primary focus:outline-none transition-colors resize-none" 
                placeholder="Tell us about yourself..."
                defaultValue={mockUser.bio}
                data-testid="textarea-bio"
              />
            </div>
            
            <div className="mb-6">
              <Label htmlFor="website" className="block text-sm mb-2 text-primary">
                Website
              </Label>
              <Input 
                type="url" 
                id="website" 
                name="website" 
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-primary focus:outline-none transition-colors" 
                placeholder="https://your-portfolio.com"
                defaultValue={mockUser.website}
                data-testid="input-website"
              />
            </div>
            
            <Button 
              type="submit" 
              className="retro-gradient px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
              data-testid="button-save-settings"
            >
              Save Changes
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}
