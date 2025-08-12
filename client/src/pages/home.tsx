import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="h-screen flex items-center justify-center text-center relative overflow-hidden">
        <div className="absolute inset-0 game-canvas opacity-20"></div>
        <div className="relative z-10 px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl mb-6 pixel-text-shadow" data-testid="text-hero-title">
            Art Connect
          </h1>
          <p className="text-lg md:text-2xl mb-8 opacity-90 pixel-text-shadow" data-testid="text-hero-subtitle">
            Share Your Art & Get Feedback from the Community
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Link href="/upload">
              <Button className="retro-gradient px-6 py-3 rounded-lg hover:scale-105 transform transition-all duration-300 flex items-center gap-2" data-testid="button-share-art">
                <i className="fas fa-paint-brush"></i>
                Share Your Art
              </Button>
            </Link>
            <Link href="/feed">
              <Button className="bg-white bg-opacity-10 px-6 py-3 rounded-lg hover:bg-opacity-20 transition-all duration-300 flex items-center gap-2" data-testid="button-view-gallery">
                <i className="fas fa-images"></i>
                View Gallery
              </Button>
            </Link>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="art-post-card rounded-lg p-6 text-center hover:transform hover:scale-105 transition-all duration-300" data-testid="card-stats-artists">
              <div className="text-3xl text-primary mb-2" data-testid="text-stat-artists">1.2K</div>
              <div className="text-sm opacity-80">Artists</div>
            </div>
            <div className="art-post-card rounded-lg p-6 text-center hover:transform hover:scale-105 transition-all duration-300" data-testid="card-stats-artworks">
              <div className="text-3xl text-secondary mb-2" data-testid="text-stat-artworks">5.8K</div>
              <div className="text-sm opacity-80">Artworks</div>
            </div>
            <div className="art-post-card rounded-lg p-6 text-center hover:transform hover:scale-105 transition-all duration-300" data-testid="card-stats-comments">
              <div className="text-3xl text-accent mb-2" data-testid="text-stat-comments">15K</div>
              <div className="text-sm opacity-80">Comments</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 px-4 bg-gradient-to-b from-transparent to-gray-900">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl mb-12 text-primary pixel-text-shadow" data-testid="text-features-title">
            Platform Features
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="art-post-card rounded-lg p-6 hover:transform hover:scale-105 transition-all duration-300" data-testid="card-feature-showcase">
              <div className="text-4xl text-primary mb-4">
                <i className="fas fa-paint-brush"></i>
              </div>
              <h3 className="text-lg mb-3">Showcase Art</h3>
              <p className="text-sm opacity-80 leading-relaxed">Upload and share your artwork with the community</p>
            </div>
            
            <div className="art-post-card rounded-lg p-6 hover:transform hover:scale-105 transition-all duration-300" data-testid="card-feature-feedback">
              <div className="text-4xl text-secondary mb-4">
                <i className="fas fa-comments"></i>
              </div>
              <h3 className="text-lg mb-3">Get Feedback</h3>
              <p className="text-sm opacity-80 leading-relaxed">Receive constructive feedback from fellow artists</p>
            </div>
            
            <div className="art-post-card rounded-lg p-6 hover:transform hover:scale-105 transition-all duration-300" data-testid="card-feature-connect">
              <div className="text-4xl text-accent mb-4">
                <i className="fas fa-users"></i>
              </div>
              <h3 className="text-lg mb-3">Connect</h3>
              <p className="text-sm opacity-80 leading-relaxed">Build connections with artists worldwide</p>
            </div>
            
            <div className="art-post-card rounded-lg p-6 hover:transform hover:scale-105 transition-all duration-300" data-testid="card-feature-discover">
              <div className="text-4xl text-primary mb-4">
                <i className="fas fa-search"></i>
              </div>
              <h3 className="text-lg mb-3">Discover Art</h3>
              <p className="text-sm opacity-80 leading-relaxed">Explore diverse artwork from talented artists worldwide</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
