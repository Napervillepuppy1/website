import { GameCanvas } from "@/components/game-canvas";
import { useState } from "react";
import { mockGameStats } from "@/lib/mock-data";

export default function Game() {
  const [gameStats, setGameStats] = useState(mockGameStats);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 text-center">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl mb-4 text-primary pixel-text-shadow" data-testid="text-game-title">
          My Journey - Pixel Adventure
        </h1>
        <p className="text-lg opacity-80" data-testid="text-game-subtitle">
          Navigate through challenging levels in this retro-style platformer
        </p>
      </div>

      {/* Game HUD */}
      <div className="art-post-card rounded-lg p-4 mb-8 flex justify-center gap-8 max-w-lg mx-auto" data-testid="game-hud">
        <div className="flex items-center gap-2">
          <i className="fas fa-star text-yellow-400"></i>
          <span data-testid="text-stars">{gameStats.stars}</span>
        </div>
        <div className="flex items-center gap-2">
          <i className="fas fa-clock text-blue-400"></i>
          <span data-testid="text-time">{gameStats.time}</span>
        </div>
        <div className="flex items-center gap-2">
          <i className="fas fa-heart text-red-400"></i>
          <span data-testid="text-lives">{gameStats.lives}</span>
        </div>
      </div>

      {/* Game Canvas */}
      <div className="art-post-card rounded-lg p-4 mb-8">
        <GameCanvas />
      </div>

      {/* Game Instructions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="art-post-card rounded-lg p-6" data-testid="card-controls">
          <h3 className="text-xl mb-4 text-primary">
            <i className="fas fa-keyboard mr-2"></i>
            Controls
          </h3>
          <div className="space-y-2 text-left">
            <div className="flex items-center gap-3">
              <div className="flex gap-1">
                <kbd className="px-2 py-1 bg-gray-700 rounded text-xs">↑</kbd>
                <kbd className="px-2 py-1 bg-gray-700 rounded text-xs">↓</kbd>
                <kbd className="px-2 py-1 bg-gray-700 rounded text-xs">←</kbd>
                <kbd className="px-2 py-1 bg-gray-700 rounded text-xs">→</kbd>
              </div>
              <span className="text-sm">or WASD - Move</span>
            </div>
            <div className="flex items-center gap-3">
              <kbd className="px-3 py-1 bg-gray-700 rounded text-xs">SPACE</kbd>
              <span className="text-sm">Jump</span>
            </div>
            <div className="flex items-center gap-3">
              <kbd className="px-3 py-1 bg-gray-700 rounded text-xs">R</kbd>
              <span className="text-sm">Restart Level</span>
            </div>
            <div className="flex items-center gap-3">
              <kbd className="px-3 py-1 bg-gray-700 rounded text-xs">ESC</kbd>
              <span className="text-sm">Pause</span>
            </div>
          </div>
        </div>

        <div className="art-post-card rounded-lg p-6" data-testid="card-objectives">
          <h3 className="text-xl mb-4 text-primary">
            <i className="fas fa-target mr-2"></i>
            Objectives
          </h3>
          <div className="space-y-2 text-left">
            <div className="flex items-center gap-3">
              <i className="fas fa-star text-yellow-400"></i>
              <span className="text-sm">Collect all stars in each level</span>
            </div>
            <div className="flex items-center gap-3">
              <i className="fas fa-skull text-red-400"></i>
              <span className="text-sm">Avoid enemies and obstacles</span>
            </div>
            <div className="flex items-center gap-3">
              <i className="fas fa-door-open text-green-400"></i>
              <span className="text-sm">Reach the level exit</span>
            </div>
            <div className="flex items-center gap-3">
              <i className="fas fa-trophy text-primary"></i>
              <span className="text-sm">Complete levels with highest score</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
