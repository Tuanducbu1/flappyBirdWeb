class Pipe {
    constructor(game, x) {
        this.game = game;
        this.x = x;
        this.width = 60; // Pipe width
        this.gap = 170; // Gap for bird to fly through (can be variable)
        this.minHeight = 50;

        // Randomly determine top pipe height
        const maxTopHeight = game.height - this.gap - this.minHeight - 20; // 20 for ground buffer
        this.topHeight = Math.random() * (maxTopHeight - this.minHeight) + this.minHeight;
        this.bottomY = this.topHeight + this.gap;

        this.passed = false; // Track if score added
        this.markedForDeletion = false;
    }

    update(speed) {
        this.x -= speed;
        if (this.x + this.width < 0) {
            this.markedForDeletion = true;
        }
    }

    draw(ctx) {
        ctx.fillStyle = '#2ecc71'; // Green pipe

        // Top Pipe
        ctx.fillRect(this.x, 0, this.width, this.topHeight);

        // Bottom Pipe
        ctx.fillRect(this.x, this.bottomY, this.width, this.game.height - this.bottomY - 20); // 20 ground buffer

        // Cap styling (darker green edge)
        ctx.fillStyle = '#27ae60';
        ctx.fillRect(this.x - 2, this.topHeight - 20, this.width + 4, 20);
        ctx.fillRect(this.x - 2, this.bottomY, this.width + 4, 20);
    }
}

export class PipeManager {
    constructor(game) {
        this.game = game;
        this.pipes = [];
        this.spawnTimer = 0;
        this.spawnInterval = 1500; // ms
        this.speed = 3;
    }

    reset() {
        this.pipes = [];
        this.spawnTimer = 0;
    }

    update(deltaTime) {
        // Spawn pipes
        this.spawnTimer += deltaTime;
        if (this.spawnTimer > this.spawnInterval) {
            this.pipes.push(new Pipe(this.game, this.game.width));
            this.spawnTimer = 0;
        }

        // Update pipes
        this.pipes.forEach(pipe => {
            pipe.update(this.speed);

            // Score Logic
            if (!pipe.passed && pipe.x + pipe.width < this.game.bird.x) {
                this.game.score++;
                this.game.updateScoreUI();
                pipe.passed = true;
            }
        });

        // Remove off-screen pipes
        this.pipes = this.pipes.filter(pipe => !pipe.markedForDeletion);
    }

    draw(ctx) {
        this.pipes.forEach(pipe => pipe.draw(ctx));
    }

    checkCollision(bird) {
        for (let pipe of this.pipes) {
            // Horizontal overlap
            if (bird.x + bird.width > pipe.x && bird.x < pipe.x + pipe.width) {
                // Vertical overlap (Top pipe OR Bottom pipe)
                if (bird.y < pipe.topHeight || bird.y + bird.height > pipe.bottomY) {
                    return true;
                }
            }
        }
        return false;
    }
}
