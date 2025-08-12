import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function About() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <div className="mb-8">
          <div className="w-48 h-48 mx-auto mb-6 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center text-6xl" data-testid="logo-placeholder">
            🎨
          </div>
          <h1 className="text-3xl md:text-4xl mb-4 text-primary pixel-text-shadow" data-testid="text-about-title">
            Welcome to Art Connect
          </h1>
        </div>
        
        <div className="art-post-card rounded-lg p-8 max-w-4xl mx-auto mb-12">
          <p className="text-lg leading-relaxed mb-6" data-testid="text-about-description">
            Art Connect is a vibrant community where artists from around the world come together to share their creations, receive feedback, and connect with fellow creatives. Whether you're a seasoned artist or just starting out, our platform provides a welcoming space for you to showcase your work and grow as an artist.
          </p>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        <div className="art-post-card rounded-lg p-6 text-center hover:transform hover:scale-105 transition-all duration-300" data-testid="card-feature-showcase-art">
          <div className="text-4xl text-primary mb-4">
            <i className="fas fa-paint-brush"></i>
          </div>
          <h3 className="text-lg mb-3 text-primary">Showcase Your Art</h3>
          <p className="text-sm opacity-80 leading-relaxed">Upload and share your artwork with our global community of artists and art enthusiasts</p>
        </div>
        
        <div className="art-post-card rounded-lg p-6 text-center hover:transform hover:scale-105 transition-all duration-300" data-testid="card-feature-get-feedback">
          <div className="text-4xl text-secondary mb-4">
            <i className="fas fa-comments"></i>
          </div>
          <h3 className="text-lg mb-3 text-primary">Get Feedback</h3>
          <p className="text-sm opacity-80 leading-relaxed">Receive constructive feedback and critiques from fellow artists to improve your skills</p>
        </div>
        
        <div className="art-post-card rounded-lg p-6 text-center hover:transform hover:scale-105 transition-all duration-300" data-testid="card-feature-connect-artists">
          <div className="text-4xl text-accent mb-4">
            <i className="fas fa-users"></i>
          </div>
          <h3 className="text-lg mb-3 text-primary">Connect with Artists</h3>
          <p className="text-sm opacity-80 leading-relaxed">Build meaningful connections with artists worldwide and grow your creative network</p>
        </div>
        
        <div className="art-post-card rounded-lg p-6 text-center hover:transform hover:scale-105 transition-all duration-300" data-testid="card-feature-achieve-success">
          <div className="text-4xl text-primary mb-4">
            <i className="fas fa-trophy"></i>
          </div>
          <h3 className="text-lg mb-3 text-primary">Achieve Success</h3>
          <p className="text-sm opacity-80 leading-relaxed">Reach new heights in your artistic journey and achieve recognition for your work</p>
        </div>
      </div>

      {/* Community Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="art-post-card rounded-lg p-8 text-center" data-testid="stat-active-artists">
          <div className="text-4xl text-primary mb-4" data-testid="text-artists-count">1,000+</div>
          <div className="text-lg opacity-80">Active Artists</div>
        </div>
        <div className="art-post-card rounded-lg p-8 text-center" data-testid="stat-artworks-shared">
          <div className="text-4xl text-secondary mb-4" data-testid="text-artworks-shared-count">10,000+</div>
          <div className="text-lg opacity-80">Artworks Shared</div>
        </div>
        <div className="art-post-card rounded-lg p-8 text-center" data-testid="stat-comments-feedback">
          <div className="text-4xl text-accent mb-4" data-testid="text-comments-feedback-count">50,000+</div>
          <div className="text-lg opacity-80">Comments & Feedback</div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center">
        <div className="art-post-card rounded-lg p-8 max-w-2xl mx-auto">
          <h2 className="text-2xl mb-4 text-primary" data-testid="text-cta-title">Ready to Join Our Community?</h2>
          <p className="text-lg opacity-80 mb-6" data-testid="text-cta-description">Start your artistic journey today and connect with thousands of creative minds</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/auth">
              <Button className="retro-gradient px-6 py-3 rounded-lg hover:opacity-90 transition-opacity" data-testid="button-join-now">
                <i className="fas fa-user-plus mr-2"></i>
                Join Now
              </Button>
            </Link>
            <Link href="/feed">
              <Button className="bg-white bg-opacity-10 px-6 py-3 rounded-lg hover:bg-opacity-20 transition-opacity" data-testid="button-view-gallery-cta">
                <i className="fas fa-images mr-2"></i>
                View Gallery
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
