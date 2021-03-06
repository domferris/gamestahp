import { detectCollision } from "./detect_collision.js";

export default class Ball {
  constructor(game) {
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;

    this.game = game;

    this.image = document.getElementById("img-ball");
    this.size = 16;

    this.reset();
  }

  reset() {
    this.position = {
      x:
        this.game.paddle.position.x +
        this.game.paddle.width / 2 -
        this.size / 2,
      y: this.game.paddle.position.y - this.size,
    };

    this.speed = { x: 4, y: -2 };
  }

  draw(context) {
    context.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.size,
      this.size
    );
  }

  update(deltaTime) {
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;

    // L+R WALL COLLISION
    if (this.position.x + this.size > this.gameWidth || this.position.x < 0) {
      this.speed.x = -this.speed.x;
    }

    // TOP WALL COLLISION
    if (this.position.y < 0) {
      this.speed.y = -this.speed.y;
    }

    // BOT WALL COLLISION
    if (this.position.y + this.size > this.gameHeight) {
      const livesDisplay = document.querySelector(".lives-display");

      this.game.lives--;
      livesDisplay.innerHTML = this.game.lives;
      this.reset();
    }

    // PADDLE COLLISION
    if (detectCollision(this, this.game.paddle)) {
      this.speed.y = -this.speed.y;
      this.position.y = this.game.paddle.position.y - this.size;
    }
  }
}
