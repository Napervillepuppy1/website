import { useEffect, useRef, useState } from "react";
import { mockGameStats } from "@/lib/mock-data";

export function GameCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameStats, setGameStats] = useState(mockGameStats);

  useEffect(() => {
    if (!gameStarted || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Simple game initialization
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw simple platform
    ctx.fillStyle = '#4ecdc4';
    ctx.fillRect(100, 500, 600, 50);
    
    // Draw player character (simple rectangle)
    ctx.fillStyle = '#ff6b9d';
    ctx.fillRect(150, 450, 30, 50);
    
    // Draw some stars
    ctx.fillStyle = '#ffe66d';
    for (let i = 0; i < 5; i++) {
      ctx.fillRect(200 + i * 100, 400, 20, 20);
    }

    // Add text overlay
    ctx.fillStyle = '#fff';
    ctx.font = '16px "Press Start 2P"';
    ctx.fillText('Use Arrow Keys to Move!', 250, 100);

  }, [gameStarted]);

  const startGame = () => {
    setGameStarted(true);
  };

  return (
    <div className="relative">
      <canvas 
        ref={canvasRef}
        width="800" 
        height="600" 
        className="game-canvas rounded-lg max-w-full h-auto border-2 border-primary"
        data-testid="canvas-game"
      />
      {!gameStarted && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
          <div className="text-center">
            <div className="text-6xl mb-4">🎮</div>
            <p className="text-xl mb-4 pixel-text-shadow">Pixel Adventure Game</p>
            <p className="text-sm opacity-80 mb-6">Use arrow keys or WASD to move, SPACE to jump</p>
            <button 
              onClick={startGame}
              className="retro-gradient px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
              data-testid="button-start-game"
            >
              <i className="fas fa-play mr-2"></i>
              Start Game
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
