// Mau's Journey - A Pixelated Platformer Game
// Game state management
let gameState = 'title';
let currentLevel = 0;
let score = 0;
let lives = 3;
let starsCollected = 0;
let gameTime = 0;
let isPaused = false;

// Canvas setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game objects
mau = new Player(50, 400); // Start player near bottom left
let platforms = [];
let enemies = [];
let stars = [];
let levelExit;
let backgroundElements = [];
let particles = []; // Floating particles for polish

// Input handling
const keys = {};
const gamepad = {};

// Level data - Focused on Bedroom and School
const levels = [
    {
        name: "Mau's Bedroom",
        background: "download.gif", // Animated bedroom background
        platforms: [
            {x: 0, y: 550, width: 800, height: 50}, // Floor
            {x: 100, y: 450, width: 80, height: 20}, // Bed
            {x: 300, y: 400, width: 100, height: 20}, // Desk
            {x: 500, y: 350, width: 80, height: 20}, // Bookshelf
            {x: 650, y: 300, width: 60, height: 20}, // Window sill
            {x: 200, y: 200, width: 60, height: 20}, // Floating platform
            {x: 400, y: 150, width: 60, height: 20}  // Another floating platform
        ],
        enemies: [
            {x: 150, y: 400, width: 25, height: 25, speed: 0.8, direction: 1, type: 'toy'}, // Moving toy
            {x: 350, y: 350, width: 25, height: 25, speed: 1.2, direction: -1, type: 'book'} // Flying book
        ],
        stars: [
            {x: 140, y: 400, width: 20, height: 20, collected: false}, // On bed
            {x: 340, y: 350, width: 20, height: 20, collected: false}, // On desk
            {x: 540, y: 300, width: 20, height: 20, collected: false}, // On bookshelf
            {x: 690, y: 250, width: 20, height: 20, collected: false}, // On window
            {x: 230, y: 150, width: 20, height: 20, collected: false}  // Floating star
        ],
        exit: {x: 750, y: 250, width: 30, height: 30}
    },
    {
        name: "Elementary School",
        background: "download (8).jpeg", // School background
        platforms: [
            {x: 0, y: 550, width: 800, height: 50}, // Ground
            {x: 50, y: 450, width: 100, height: 20}, // Playground equipment
            {x: 200, y: 350, width: 80, height: 20}, // Monkey bars
            {x: 350, y: 250, width: 100, height: 20}, // Slide
            {x: 500, y: 200, width: 80, height: 20}, // Climbing wall
            {x: 650, y: 300, width: 80, height: 20}, // Swing set
            {x: 150, y: 200, width: 60, height: 20}, // Floating platform
            {x: 400, y: 150, width: 60, height: 20}  // Another floating platform
        ],
        enemies: [
            {x: 100, y: 400, width: 30, height: 30, speed: 1.5, direction: 1, type: 'bully'}, // School bully
            {x: 400, y: 200, width: 25, height: 25, speed: 1, direction: -1, type: 'homework'}, // Flying homework
            {x: 600, y: 250, width: 25, height: 25, speed: 1.2, direction: 1, type: 'test'} // Test paper
        ],
        stars: [
            {x: 90, y: 400, width: 20, height: 20, collected: false}, // On playground
            {x: 240, y: 300, width: 20, height: 20, collected: false}, // On monkey bars
            {x: 390, y: 200, width: 20, height: 20, collected: false}, // On slide
            {x: 540, y: 150, width: 20, height: 20, collected: false}, // On climbing wall
            {x: 690, y: 250, width: 20, height: 20, collected: false}  // On swing set
        ],
        exit: {x: 750, y: 200, width: 30, height: 30}
    }
];

// Player class
class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 80;  // Made less wide for less squashed look
        this.height = 100; // Made less tall for better proportions
        this.velocityX = 0;
        this.velocityY = 0;
        this.speed = 5;
        this.jumpPower = 15;
        this.onGround = false;
        this.facingRight = true;
        this.animationFrame = 0;
        this.animationTimer = 0;
        this.animationState = 'idle'; // idle, running, jumping
    }

    update() {
        // Gravity
        this.velocityY += 0.8;
        
        // Movement
        if (keys['ArrowLeft'] || keys['a'] || keys['A']) {
            this.velocityX = -this.speed;
            this.facingRight = false;
            this.animationState = 'running';
        } else if (keys['ArrowRight'] || keys['d'] || keys['D']) {
            this.velocityX = this.speed;
            this.facingRight = true;
            this.animationState = 'running';
        } else {
            this.velocityX *= 0.8; // Friction
            this.animationState = 'idle';
        }

        // Jumping
        if ((keys[' '] || keys['ArrowUp'] || keys['w'] || keys['W']) && this.onGround) {
            this.velocityY = -this.jumpPower;
            this.onGround = false;
            this.animationState = 'jumping';
        }
        
        // Set jumping state when in air
        if (!this.onGround) {
            this.animationState = 'jumping';
        }

        // Update position
        this.x += this.velocityX;
        this.y += this.velocityY;

        // Platform collision
        this.onGround = false;
        for (let platform of platforms) {
            if (this.x < platform.x + platform.width &&
                this.x + this.width > platform.x &&
                this.y < platform.y + platform.height &&
                this.y + this.height > platform.y) {
                
                if (this.velocityY > 0 && this.y < platform.y) {
                    this.y = platform.y - this.height;
                    this.velocityY = 0;
                    this.onGround = true;
                }
            }
        }

        // Screen boundaries
        if (this.x < 0) this.x = 0;
        if (this.x + this.width > canvas.width) this.x = canvas.width - this.width;
        if (this.y > canvas.height) {
            this.loseLife();
        }

        // Animation
        this.animationTimer++;
        if (this.animationTimer > 10) {
            this.animationFrame = (this.animationFrame + 1) % 4;
            this.animationTimer = 0;
        }
    }

    loseLife() {
        lives--;
        updateHUD();
        if (lives <= 0) {
            gameOver();
        } else {
            resetPlayer();
        }
    }

    resetPlayer() {
        this.x = 50;
        this.y = 400;
        this.velocityX = 0;
        this.velocityY = 0;
    }

    draw() {
        ctx.save();
        
        const mauSprite = document.getElementById('mau-sprite');
        
        if (mauSprite && mauSprite.complete) {
            // Create animation by drawing different parts of the image
            let sourceX = 0;
            let sourceY = 0;
            let sourceWidth = mauSprite.naturalWidth;
            let sourceHeight = mauSprite.naturalHeight;
            
            // Add animation variety based on state
            switch (this.animationState) {
                case 'running':
                    // Enhanced running animation with bouncing and stretching
                    const runBounce = Math.sin(this.animationFrame * 0.4) * 3;
                    const runStretch = 1 + Math.sin(this.animationFrame * 0.6) * 0.1;
                    const runSquash = 1 - Math.sin(this.animationFrame * 0.6) * 0.1;
                    
                    // Apply bouncing effect
                    sourceY = runBounce;
                    // Apply stretching effect (horizontal stretch, vertical squash)
                    ctx.scale(runStretch, runSquash);
                    break;
                case 'jumping':
                    // Enhanced jumping animation with rotation and stretching
                    const jumpRotation = Math.sin(this.animationFrame * 0.3) * 0.15;
                    const jumpStretch = 1 + Math.sin(this.animationFrame * 0.2) * 0.2;
                    const jumpSquash = 1 - Math.sin(this.animationFrame * 0.2) * 0.1;
                    
                    ctx.rotate(jumpRotation);
                    ctx.scale(jumpStretch, jumpSquash);
                    break;
                case 'idle':
                    // Enhanced idle animation with gentle breathing and swaying
                    const idleScale = 1 + Math.sin(this.animationFrame * 0.08) * 0.03;
                    const idleSway = Math.sin(this.animationFrame * 0.05) * 0.02;
                    
                    ctx.scale(idleScale, idleScale);
                    ctx.rotate(idleSway);
                    break;
            }
            
            // Draw Mau with animation effects
            if (this.facingRight) {
                ctx.drawImage(mauSprite, sourceX, sourceY, sourceWidth, sourceHeight, 
                            this.x, this.y, this.width, this.height);
            } else {
                // Flip horizontally when facing left
                ctx.scale(-1, 1);
                ctx.drawImage(mauSprite, sourceX, sourceY, sourceWidth, sourceHeight, 
                            -this.x - this.width, this.y, this.width, this.height);
            }
        } else {
            // Enhanced fallback rectangle with professional styling
            const mauGradient = ctx.createLinearGradient(this.x, this.y, this.x, this.y + this.height);
            mauGradient.addColorStop(0, '#FF69B4');   // Hot pink top
            mauGradient.addColorStop(0.5, '#FF1493'); // Deep pink middle
            mauGradient.addColorStop(1, '#C71585');   // Medium violet red bottom
            
            // Add glow effect
            ctx.shadowColor = '#FF69B4';
            ctx.shadowBlur = 10;
            
            // Add enhanced animation to the fallback rectangle
            switch (this.animationState) {
                case 'running':
                    // Enhanced running rectangle with bouncing and stretching
                    const runBounce = Math.sin(this.animationFrame * 0.4) * 3;
                    const runStretch = 1 + Math.sin(this.animationFrame * 0.6) * 0.1;
                    const runSquash = 1 - Math.sin(this.animationFrame * 0.6) * 0.1;
                    
                    ctx.fillStyle = mauGradient;
                    ctx.fillRect(this.x, this.y + runBounce, 
                               this.width * runStretch, this.height * runSquash);
                    break;
                case 'jumping':
                    // Enhanced jumping rectangle with rotation effect
                    const jumpOffset = Math.sin(this.animationFrame * 0.3) * 3;
                    ctx.fillStyle = mauGradient;
                    ctx.fillRect(this.x + jumpOffset, this.y, 
                               this.width * 1.1, this.height * 0.9);
                    break;
                default:
                    // Enhanced idle animation with gentle movement
                    const idleOffset = Math.sin(this.animationFrame * 0.08) * 2;
                    const idleScale = 1 + Math.sin(this.animationFrame * 0.05) * 0.02;
                    ctx.fillStyle = mauGradient;
                    ctx.fillRect(this.x, this.y + idleOffset, 
                               this.width * idleScale, this.height * idleScale);
                    break;
            }
            
            // Reset shadow
            ctx.shadowBlur = 0;
            
            // Add border
            ctx.strokeStyle = '#C71585';
            ctx.lineWidth = 2;
            ctx.strokeRect(this.x, this.y, this.width, this.height);
            
            // Enhanced eyes with glow
            ctx.shadowColor = '#000';
            ctx.shadowBlur = 3;
            ctx.fillStyle = '#000';
            if (this.animationState === 'running') {
                // Blinking eyes for running
                if (this.animationFrame % 20 < 10) {
                    ctx.fillRect(this.x + 18, this.y + 18, 9, 9);
                    ctx.fillRect(this.x + 42, this.y + 18, 9, 9);
                }
            } else {
                ctx.fillRect(this.x + 18, this.y + 18, 9, 9);
                ctx.fillRect(this.x + 42, this.y + 18, 9, 9);
            }
            
            // Add eye highlights
            ctx.shadowBlur = 0;
            ctx.fillStyle = '#FFF';
            ctx.fillRect(this.x + 19, this.y + 19, 2, 2);
            ctx.fillRect(this.x + 43, this.y + 19, 2, 2);
            
            // Enhanced animated smile with gradient
            const smileGradient = ctx.createLinearGradient(this.x + 15, this.y + 35, this.x + 35, this.y + 35);
            smileGradient.addColorStop(0, '#FF69B4');
            smileGradient.addColorStop(1, '#C71585');
            ctx.fillStyle = smileGradient;
            ctx.fillRect(this.x + 15, this.y + 35, 20, 4);
        }
        
        ctx.restore();
    }
}

// Enemy class
class Enemy {
    constructor(x, y, width, height, speed, direction, type) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.direction = direction;
        this.type = type;
        this.startX = x;
    }

    update() {
        this.x += this.speed * this.direction;
        
        // Change direction at boundaries
        if (this.x <= this.startX - 100 || this.x >= this.startX + 100) {
            this.direction *= -1;
        }

        // Check collision with player
        if (mau && this.x < mau.x + mau.width &&
            this.x + this.width > mau.x &&
            this.y < mau.y + mau.height &&
            this.y + this.height > mau.y) {
            mau.loseLife();
        }
    }

    draw() {
        // Different colors and professional styling based on enemy type
        let mainColor, glowColor, borderColor;
        
        switch(this.type) {
            case 'toy':
                mainColor = '#FF69B4'; // Hot pink for toy
                glowColor = '#FF1493';
                borderColor = '#C71585';
                break;
            case 'book':
                mainColor = '#40E0D0'; // Turquoise for book
                glowColor = '#00CED1';
                borderColor = '#008B8B';
                break;
            case 'bully':
                mainColor = '#DC143C'; // Crimson for bully
                glowColor = '#FF0000';
                borderColor = '#8B0000';
                break;
            case 'homework':
                mainColor = '#FF8C00'; // Dark orange for homework
                glowColor = '#FFA500';
                borderColor = '#FF7F00';
                break;
            case 'test':
                mainColor = '#FF4500'; // Orange red for test
                glowColor = '#FF6347';
                borderColor = '#CD5C5C';
                break;
            default:
                mainColor = '#FF4444';
                glowColor = '#FF0000';
                borderColor = '#8B0000';
        }
        
        // Add glow effect
        ctx.shadowColor = glowColor;
        ctx.shadowBlur = 8;
        
        // Main enemy body with gradient
        const gradient = ctx.createRadialGradient(
            this.x + this.width/2, this.y + this.height/2, 0,
            this.x + this.width/2, this.y + this.height/2, this.width/2
        );
        gradient.addColorStop(0, mainColor);
        gradient.addColorStop(1, borderColor);
        
        ctx.fillStyle = gradient;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
        // Reset shadow
        ctx.shadowBlur = 0;
        
        // Add border
        ctx.strokeStyle = borderColor;
        ctx.lineWidth = 2;
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        
        // Enhanced eyes with glow
        ctx.shadowColor = '#000';
        ctx.shadowBlur = 3;
        ctx.fillStyle = '#000';
        ctx.fillRect(this.x + 5, this.y + 5, 4, 4);
        ctx.fillRect(this.x + 15, this.y + 5, 4, 4);
        ctx.shadowBlur = 0;
        
        // Add eye highlights
        ctx.fillStyle = '#FFF';
        ctx.fillRect(this.x + 6, this.y + 6, 1, 1);
        ctx.fillRect(this.x + 16, this.y + 6, 1, 1);
    }
}

// Particle class for background effects
class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 3 + 1;
        this.opacity = Math.random() * 0.5 + 0.3;
        this.life = Math.random() * 100 + 50;
        this.maxLife = this.life;
    }
    
    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life--;
        
        // Wrap around screen
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
    }
    
    draw() {
        if (this.life > 0) {
            ctx.save();
            ctx.globalAlpha = this.opacity * (this.life / this.maxLife);
            ctx.fillStyle = '#E6E6FA';
            ctx.shadowColor = '#E6E6FA';
            ctx.shadowBlur = 5;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }
}

// Star class
class Star {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 20;
        this.height = 20;
        this.collected = false;
        this.animationFrame = 0;
        this.animationTimer = 0;
    }

    update() {
        if (!this.collected) {
            // Check collision with player
            if (mau && this.x < mau.x + mau.width &&
                this.x + this.width > mau.x &&
                this.y < mau.y + mau.height &&
                this.y + this.height > mau.y) {
                this.collected = true;
                starsCollected++;
                score += 100;
                updateHUD();
            }
        }

        // Animation
        this.animationTimer++;
        if (this.animationTimer > 15) {
            this.animationFrame = (this.animationFrame + 1) % 8;
            this.animationTimer = 0;
        }
    }

    draw() {
        if (!this.collected) {
            ctx.save();
            
            // Add pulsing glow effect
            const pulseIntensity = Math.sin(this.animationFrame * 0.3) * 0.3 + 0.7;
            ctx.shadowColor = '#FFD700';
            ctx.shadowBlur = 15 * pulseIntensity;
            
            ctx.translate(this.x + this.width/2, this.y + this.height/2);
            ctx.rotate(this.animationFrame * 0.2);
            
            // Create gradient for star
            const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 12);
            gradient.addColorStop(0, '#FFD700');   // Bright gold center
            gradient.addColorStop(0.5, '#FFA500'); // Orange middle
            gradient.addColorStop(1, '#FF8C00');   // Dark orange edge
            
            ctx.fillStyle = gradient;
            
            // Draw enhanced star shape with better proportions
            for (let i = 0; i < 5; i++) {
                ctx.beginPath();
                ctx.moveTo(0, -12);
                ctx.lineTo(2, -4);
                ctx.lineTo(12, 0);
                ctx.lineTo(2, 4);
                ctx.lineTo(0, 12);
                ctx.lineTo(-2, 4);
                ctx.lineTo(-12, 0);
                ctx.lineTo(-2, -4);
                ctx.closePath();
                ctx.fill();
                ctx.rotate(Math.PI * 2 / 5);
            }
            
            // Add star border
            ctx.strokeStyle = '#FF4500';
            ctx.lineWidth = 1;
            for (let i = 0; i < 5; i++) {
                ctx.beginPath();
                ctx.moveTo(0, -12);
                ctx.lineTo(2, -4);
                ctx.lineTo(12, 0);
                ctx.lineTo(2, 4);
                ctx.lineTo(0, 12);
                ctx.lineTo(-2, 4);
                ctx.lineTo(-12, 0);
                ctx.lineTo(-2, -4);
                ctx.closePath();
                ctx.stroke();
                ctx.rotate(Math.PI * 2 / 5);
            }
            
            ctx.restore();
        }
    }
}

// Game functions
function initGame() {
    mau = new Player(50, 400);
    loadLevel(currentLevel);
    gameTime = 0;
    updateHUD();
    
    // Initialize particles
    particles = [];
    for (let i = 0; i < 20; i++) {
        particles.push(new Particle(
            Math.random() * canvas.width,
            Math.random() * canvas.height
        ));
    }
}

function loadLevel(levelIndex) {
    if (levelIndex >= levels.length) {
        gameComplete();
        return;
    }

    const level = levels[levelIndex];
    document.getElementById('level-name').textContent = `Level: ${level.name}`;
    
    // Clear arrays
    platforms = [];
    enemies = [];
    stars = [];
    
    // Load level data
    platforms = level.platforms.map(p => ({...p}));
    
    enemies = level.enemies.map(e => new Enemy(e.x, e.y, e.width, e.height, e.speed, e.direction, e.type));
    
    stars = level.stars.map(s => new Star(s.x, s.y));
    
    levelExit = {...level.exit};
    
    // Reset player
    mau.resetPlayer();
    starsCollected = 0;
    updateHUD();
}

function updateGame() {
    if (isPaused) return;

    gameTime += 1/60; // Assuming 60 FPS
    
    // Update game objects
    if (mau) mau.update();
    enemies.forEach(enemy => enemy.update());
    stars.forEach(star => star.update());
    
    // Update particles
    particles.forEach(particle => particle.update());
    
    // Remove dead particles and add new ones
    particles = particles.filter(particle => particle.life > 0);
    if (particles.length < 15) {
        particles.push(new Particle(
            Math.random() * canvas.width,
            Math.random() * canvas.height
        ));
    }
    
    // Check level completion
    if (mau && levelExit && 
        mau.x < levelExit.x + levelExit.width &&
        mau.x + mau.width > levelExit.x &&
        mau.y < levelExit.y + levelExit.height &&
        mau.y + mau.height > levelExit.y) {
        levelComplete();
    }
}

function drawGame() {
    // Clear canvas
    const level = levels[currentLevel];
    
    // Draw background image
    const backgroundImg = new Image();
    backgroundImg.src = level.background;
    
    // Try to draw background image, fallback to professional gradient if not loaded
    try {
        if (backgroundImg.complete && backgroundImg.naturalWidth > 0) {
            // Scale background to fit canvas
            ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
        } else {
            // Professional gradient fallback
            if (level.background === "download.gif") {
                // Bedroom gradient
                const bedroomGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
                bedroomGradient.addColorStop(0, '#87CEEB');   // Sky blue top
                bedroomGradient.addColorStop(0.5, '#98FB98'); // Pale green middle
                bedroomGradient.addColorStop(1, '#F0E68C');   // Khaki bottom
                ctx.fillStyle = bedroomGradient;
            } else {
                // School gradient
                const schoolGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
                schoolGradient.addColorStop(0, '#98FB98');   // Pale green top
                schoolGradient.addColorStop(0.5, '#90EE90'); // Light green middle
                schoolGradient.addColorStop(1, '#32CD32');   // Lime green bottom
                ctx.fillStyle = schoolGradient;
            }
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
    } catch (e) {
        // Professional gradient fallback on error
    }

    // Draw platforms
    platforms.forEach(platform => {
        ctx.fillStyle = '#4B0082';
        ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
    });

    // Draw exit
    ctx.fillStyle = '#00CED1';
    ctx.fillRect(levelExit.x, levelExit.y, levelExit.width, levelExit.height);

    // Draw player
    if (mau) {
        ctx.fillStyle = '#8B00FF';
        ctx.fillRect(mau.x, mau.y, mau.width, mau.height);
    }

    // Draw stars
    stars.forEach(star => {
        if (!star.collected) {
            ctx.fillStyle = '#FFD700';
            ctx.beginPath();
            ctx.arc(star.x + star.width/2, star.y + star.height/2, star.width/2, 0, Math.PI * 2);
            ctx.fill();
        }
    });
}

function gameLoop() {
    if (isPaused) return;
    
    // Update game state
    updateGame();
    
    // Draw everything
    drawGame();
    
    // Update HUD
    updateHUD();
    
    // Continue animation
    requestAnimationFrame(gameLoop);
}

function updateHUD() {
    document.getElementById('score-value').textContent = score;
    document.getElementById('stars-value').textContent = starsCollected;
    document.getElementById('time-value').textContent = formatTime(gameTime);
}

function levelComplete() {
    gameState = 'level-complete';
    document.getElementById('final-score').textContent = score;
    document.getElementById('level-score').textContent = score;
    document.getElementById('level-stars').textContent = starsCollected;
    document.getElementById('level-time').textContent = formatTime(gameTime);
    showScreen('level-complete-screen');
}

function gameComplete() {
    alert('Congratulations! You completed Mau\'s journey!');
    showScreen('game-complete-screen');
    resetGame();
}

function gameOver() {
    gameState = 'game-over';
    showScreen('game-over-screen');
}

function resetGame() {
    currentLevel = 0;
    score = 0;
    lives = 3;
    starsCollected = 0;
    gameTime = 0;
    updateHUD();
}

function resetPlayer() {
    if (mau) mau.resetPlayer();
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Screen management
function showScreen(screenId) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });

    // Show the selected screen
    const screen = document.getElementById(screenId);
    if (screen) {
        screen.classList.add('active');
        
        // Update screen-specific content
        if (screenId === 'level-complete-screen') {
            document.getElementById('level-score').textContent = score;
            document.getElementById('level-stars').textContent = starsCollected;
            document.getElementById('level-time').textContent = formatTime(gameTime);
        } else if (screenId === 'game-complete-screen') {
            document.getElementById('final-score').textContent = score;
        }
    }
    gameState = screenId;
}

// Event listeners
document.addEventListener('keydown', (e) => {
    keys[e.key] = true;
    
    if (e.key === 'Escape') {
        if (gameState === 'game-screen') {
            togglePause();
        }
    }
    
    if (e.key === 'r' || e.key === 'R') {
        if (gameState === 'game-screen') {
            resetPlayer();
        }
    }
});

document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

// Button event listeners
document.getElementById('start-btn').addEventListener('click', () => {
    showScreen('game-screen');
    initGame();
    gameLoop();
});

document.getElementById('instructions-btn').addEventListener('click', () => {
    showScreen('instructions-screen');
});

document.getElementById('back-btn').addEventListener('click', () => {
    showScreen('title-screen');
});

document.getElementById('resume-btn').addEventListener('click', () => {
    togglePause();
});

document.getElementById('restart-btn').addEventListener('click', () => {
    loadLevel(currentLevel);
    showScreen('game-screen');
});

document.getElementById('quit-btn').addEventListener('click', () => {
    showScreen('title-screen');
    resetGame();
});

document.getElementById('next-level-btn').addEventListener('click', () => {
    currentLevel++;
    showScreen('game-screen');
    loadLevel(currentLevel);
});

document.getElementById('retry-btn').addEventListener('click', () => {
    showScreen('game-screen');
    loadLevel(currentLevel);
});

document.getElementById('menu-btn').addEventListener('click', () => {
    showScreen('title-screen');
    resetGame();
});

document.getElementById('restart-game-btn').addEventListener('click', () => {
    resetGame();
    showScreen('game-screen');
    initGame();
});

document.getElementById('game-over-menu-btn').addEventListener('click', () => {
    showScreen('title-screen');
    resetGame();
});

function togglePause() {
    isPaused = !isPaused;
    document.getElementById('pause-menu').classList.toggle('hidden');
}

// Initialize game
document.addEventListener('DOMContentLoaded', () => {
    console.log('Game script loaded and initialized');
    
    // Initialize game state
    gameState = 'playing';
    currentLevel = 0;
    score = 0;
    lives = 3;
    starsCollected = 0;
    gameTime = 0;
    isPaused = false;

    // Initialize canvas
    const canvas = document.getElementById('gameCanvas');
    if (!canvas) {
        console.error('Canvas not found!');
        return;
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error('Canvas context not found!');
        return;
    }
    canvas.width = 800;
    canvas.height = 600;
    console.log('Canvas initialized with dimensions:', canvas.width, 'x', canvas.height);

    // Initialize player
    mau = new Player(50, 400);
    console.log('Player initialized at position:', mau.x, mau.y);
    
    // Load first level
    loadLevel(0);
    console.log('Level loaded:', levels[currentLevel].name);
    
    // Start game loop
    gameLoop();
    console.log('Game loop started');

    // Add keyboard event listeners
    document.addEventListener('keydown', (e) => {
        keys[e.key] = true;
        console.log('Key pressed:', e.key);
    });
    document.addEventListener('keyup', (e) => {
        keys[e.key] = false;
        console.log('Key released:', e.key);
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            togglePause();
            console.log('Game paused');
        }
    });
});

// Add hero screen to screen management
function showScreen(screenId) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });

    // Show the selected screen
    const screen = document.getElementById(screenId);
    if (screen) {
        screen.classList.add('active');
        
        // Update screen-specific content
        if (screenId === 'level-complete-screen') {
            document.getElementById('level-score').textContent = score;
            document.getElementById('level-stars').textContent = starsCollected;
            document.getElementById('level-time').textContent = formatTime(gameTime);
        } else if (screenId === 'game-complete-screen') {
            document.getElementById('final-score').textContent = score;
        }
    }
    gameState = screenId;
}
