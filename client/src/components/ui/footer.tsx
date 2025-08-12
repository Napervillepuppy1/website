export function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-700 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg mb-4 text-primary">Art Connect</h3>
            <p className="text-sm opacity-80 leading-relaxed">
              Your platform for sharing art and connecting with artists worldwide
            </p>
          </div>
          <div>
            <h4 className="text-md mb-4 text-secondary">Community</h4>
            <div className="space-y-2 text-sm opacity-80">
              <div>Art Feed</div>
              <div>Featured Artists</div>
              <div>Challenges</div>
              <div>Forums</div>
            </div>
          </div>
          <div>
            <h4 className="text-md mb-4 text-secondary">Resources</h4>
            <div className="space-y-2 text-sm opacity-80">
              <div>Tutorials</div>
              <div>Art Tips</div>
              <div>Tools</div>
              <div>Guidelines</div>
            </div>
          </div>
          <div>
            <h4 className="text-md mb-4 text-secondary">Support</h4>
            <div className="space-y-2 text-sm opacity-80">
              <div>Help Center</div>
              <div>Contact Us</div>
              <div>Privacy Policy</div>
              <div>Terms of Service</div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm opacity-80">
          <p>&copy; 2024 Art Connect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
