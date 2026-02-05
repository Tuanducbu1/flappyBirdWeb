export class Background {
    constructor(game) {
        this.game = game;
        this.width = game.width;
        this.height = game.height;
        this.speed = 1.5; // Base scrolling speed
        this.x1 = 0;
        this.x2 = this.width;
    }

    resize(width, height) {
        this.width = width;
        this.height = height;
        // Reset x to prevent gaps on resize
        this.x1 = 0;
        this.x2 = this.width;
    }

    update(deltaTime, isPlaying) {
        if (!isPlaying) return;

        // Simple infinite scroll for ground/bg
        this.x1 -= this.speed;
        this.x2 -= this.speed;

        if (this.x1 <= -this.width) this.x1 = this.width + this.x2 - this.speed;
        if (this.x2 <= -this.width) this.x2 = this.width + this.x1 - this.speed;
    }

    draw(ctx) {
        // Sky
        ctx.fillStyle = '#70c5ce';
        ctx.fillRect(0, 0, this.width, this.height);

        // Backdrop (Clouds/Mountains placeholder)
        ctx.fillStyle = '#a2d9e0';
        // Draw some simple cloud shapes static for now
        ctx.beginPath();
        ctx.arc(100, 100, 30, 0, Math.PI * 2);
        ctx.arc(140, 100, 40, 0, Math.PI * 2);
        ctx.fill();

        // City skyline placeholder (darker cyan)
        ctx.fillStyle = '#83d0d8';
        ctx.fillRect(0, this.height - 150, this.width, 130);

        // Ground (Moving layer)
        ctx.fillStyle = '#ded895'; // Sand color
        ctx.fillRect(this.x1, this.height - 20, this.width, 20);
        ctx.fillRect(this.x2, this.height - 20, this.width, 20);

        // Grass top on ground
        ctx.fillStyle = '#73bf2e';
        ctx.fillRect(this.x1, this.height - 25, this.width, 5);
        ctx.fillRect(this.x2, this.height - 25, this.width, 5);
    }
}
