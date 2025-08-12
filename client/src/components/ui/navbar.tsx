import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "../../lib/auth";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, LogOut } from "lucide-react";

export function Navbar() {
  const [location] = useLocation();
  const { user, isAuthenticated, logout } = useAuth();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/feed", label: "Art Feed" },
    { href: "/upload", label: "Upload Art" },
    { href: "/profile", label: "Profile" },
    { href: "/about", label: "About" },
  ];

  const handleLogout = () => {
    logout();
  };

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
              className={`px-3 py-2 text-sm hover:bg-white hover:bg-opacity-10 rounded nav-transition btn-press hover:scale-105 transform ${
                location === item.href ? "text-primary animate-glow" : "text-white"
              }`}
              data-testid={`nav-link-${item.label.toLowerCase().replace(' ', '-')}`}
            >
              {item.label}
            </Link>
          ))}
        </div>
        
        {isAuthenticated && user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full" data-testid="user-menu-trigger">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.profileImageUrl} alt={user.displayName || user.username} />
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-1 leading-none">
                  <p className="font-medium">{user.displayName || user.username}</p>
                  <p className="w-[200px] truncate text-sm text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </div>
              <DropdownMenuItem asChild>
                <Link href="/profile" className="w-full cursor-pointer" data-testid="menu-profile">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout} data-testid="menu-logout">
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link href="/auth">
            <Button className="retro-gradient hover:opacity-80 nav-transition" data-testid="button-sign-in">
              Sign In
            </Button>
          </Link>
        )}
      </div>
    </nav>
  );
}
