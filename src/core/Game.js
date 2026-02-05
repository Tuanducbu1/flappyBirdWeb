import { Bird } from '../entities/Bird.js';
import { PipeManager } from '../entities/Pipe.js';
import { Background } from '../entities/Background.js';

export class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.width = canvas.width;
        this.height = canvas.height;
        
        this.state = 'START'; // START, PLAYING, GAMEOVER
        this.score = 0;
        this.bestScore = parseInt(localStorage.getItem('flappy_best_score')) || 0;

        // Entities
        this.bird = new Bird(this);
        this.pipeManager = new PipeManager(this);
        this.background = new Background(this);
        
        // Loop bindings
        this.loop = this.loop.bind(this);
        this.lastTime = 0;
        
        // UI Elements
        this.scoreDisplay = document.getElementById('score-display');
        this.startScreen = document.getElementById('start-screen');
        this.gameOverScreen = document.getElementById('game-over-screen');
        this.finalScoreEl = document.getElementById('current-score');
        this.bestScoreEl = document.getElementById('best-score');
        
        this.setupInputs();
        this.resize();
        window.addEventListener('resize', () => this.resize());
        
        // Start loop
        requestAnimationFrame(this.loop);
    }

    setupInputs() {
        const action = () => {
            if (this.state === 'START') {
                this.startGame();
            } else if (this.state === 'PLAYING') {
                this.bird.jump();
            }
        };

        window.addEventListener('keydown', (e) => {
            if (e.code === 'Space') action();
        });

        window.addEventListener('touchstart', (e) => {
            e.preventDefault(); // Prevent scrolling
            action();
        }, { passive: false });
        
        window.addEventListener('mousedown', (e) => {
             // Only jump if not clicking UI buttons
            if(e.target.tagName !== 'BUTTON') action();
        });

        document.getElementById('restart-btn').addEventListener('click', () => {
            this.resetGame();
        });
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.background.resize(this.width, this.height);
    }

    startGame() {
        this.state = 'PLAYING';
        this.startScreen.classList.add('hidden');
        this.gameOverScreen.classList.add('hidden');
        this.score = 0;
        this.updateScoreUI();
    }

    gameOver() {
        this.state = 'GAMEOVER';
        this.gameOverScreen.classList.remove('hidden');
        this.finalScoreEl.textContent = this.score;
        
        if (this.score > this.bestScore) {
            this.bestScore = this.score;
            localStorage.setItem('flappy_best_score', this.bestScore);
        }
        this.bestScoreEl.textContent = this.bestScore;
    }

    resetGame() {
        this.bird.reset();
        this.pipeManager.reset();
        this.score = 0;
        this.updateScoreUI();
        this.state = 'START';
        this.gameOverScreen.classList.add('hidden');
        this.startScreen.classList.remove('hidden');
    }

    updateScoreUI() {
        this.scoreDisplay.textContent = this.score;
    }

    loop(timestamp) {
        const deltaTime = timestamp - this.lastTime;
        this.lastTime = timestamp;

        this.ctx.clearRect(0, 0, this.width, this.height);

        // Update
        this.background.update(deltaTime, this.state === 'PLAYING');
        if (this.state === 'PLAYING') {
            this.bird.update(deltaTime);
            this.pipeManager.update(deltaTime);
            this.checkCollisions();
        } else if (this.state === 'START') {
            this.bird.hover(timestamp); // Idle animation
        }

        // Draw
        this.background.draw(this.ctx);
        this.pipeManager.draw(this.ctx);
        this.bird.draw(this.ctx);

        requestAnimationFrame(this.loop);
    }

    checkCollisions() {
        // Ground collision (simple floor at bottom)
        const groundHeight = 20; // Matches background scrolling floor
        if (this.bird.y + this.bird.height >= this.height - groundHeight) {
            this.gameOver();
        }

        // Ceiling collision
        if (this.bird.y <= 0) {
            this.bird.y = 0;
            this.bird.velocity = 0;
        }

        // Pipe collision
        if (this.pipeManager.checkCollision(this.bird)) {
            this.gameOver();
        }
    }
}
