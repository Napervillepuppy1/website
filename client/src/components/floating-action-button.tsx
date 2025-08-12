import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useState } from "react";

export function FloatingActionButton() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href="/upload">
      <Button
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full retro-gradient shadow-lg hover:shadow-xl transform transition-all duration-300 z-40 btn-press animate-bounce-in"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        data-testid="fab-upload"
      >
        <i className={`fas fa-plus text-xl transition-transform duration-300 ${isHovered ? 'rotate-90' : ''}`}></i>
      </Button>
    </Link>
  );
}