export class Bird {
    constructor(game) {
        this.game = game;
        this.width = 34; // Placeholder size
        this.height = 24;
        this.x = game.width * 0.2; // 20% from left
        this.y = game.height / 2;
        
        this.velocity = 0;
        this.gravity = 0.5; // Gravity force
        this.jumpForce = -8; // Jump strength
        this.rotation = 0;

        // Visuals (Placeholder)
        this.color = '#e67e22'; // Orange bird
    }

    jump() {
        this.velocity = this.jumpForce;
    }

    reset() {
        this.x = this.game.width * 0.2;
        this.y = this.game.height / 2;
        this.velocity = 0;
        this.rotation = 0;
    }

    hover(timestamp) {
        // Simple Sine wave for hovering on start screen
        this.y = (this.game.height / 2) + Math.sin(timestamp / 300) * 10;
    }

    update(deltaTime) {
        this.velocity += this.gravity;
        this.y += this.velocity;

        // Rotation logic based on velocity
        if (this.velocity < 0) {
            this.rotation = -25 * Math.PI / 180;
        } else {
            this.rotation += 2 * Math.PI / 180;
            if (this.rotation > 90 * Math.PI / 180) {
                this.rotation = 90 * Math.PI / 180;
            }
        }
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        ctx.rotate(this.rotation);
        
        // Placeholder Bird (Rectangle)
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
        
        // Beak (for direction)
        ctx.fillStyle = '#f1c40f';
        ctx.fillRect(this.width / 4, -this.height / 4, 10, 10);
        
        // Eye
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(this.width/4, -this.height/4, 5, 0, Math.PI*2);
        ctx.fill();
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(this.width/4 + 2, -this.height/4, 2, 0, Math.PI*2);
        ctx.fill();

        ctx.restore();
    }
}
