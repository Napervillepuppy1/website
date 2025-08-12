import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [location] = useLocation();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/feed", label: "Art Feed" },
    { href: "/upload", label: "Upload Art" },
    { href: "/profile", label: "Profile" },
    { href: "/game", label: "Game" },
    { href: "/about", label: "About" },
  ];

  return (
    <nav className="fixed w-full bg-gray-900 bg-opacity-90 backdrop-blur-sm z-50 px-4 py-3 pixel-border border-x-0 border-t-0">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl text-white pixel-text-shadow hover:text-primary nav-transition">
          Art Connect
        </Link>
        
        <div className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-2 text-sm hover:bg-white hover:bg-opacity-10 rounded nav-transition ${
                location === item.href ? "text-primary" : "text-white"
              }`}
              data-testid={`nav-link-${item.label.toLowerCase().replace(' ', '-')}`}
            >
              {item.label}
            </Link>
          ))}
        </div>
        
        <Link href="/auth">
          <Button className="retro-gradient hover:opacity-80 nav-transition" data-testid="button-sign-in">
            Sign In
          </Button>
        </Link>
      </div>
    </nav>
  );
}
