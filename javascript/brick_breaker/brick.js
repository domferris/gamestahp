import { detectCollision } from "./detect_collision.js";

export default class Brick {
  constructor(game, position) {
    this.game = game;

    this.image = document.getElementById("img-brick");

    this.position = position;

    this.width = 80;
    this.height = 24;

    this.markedForDeletion = false;
  }

  update(deltaTime) {
    if (detectCollision(this.game.ball, this)) {
      const scoreDisplay = document.querySelector(".score-display");

      this.game.ball.speed.y = -this.game.ball.speed.y;
      this.markedForDeletion = true;

      this.game.score++;
      scoreDisplay.innerHTML = this.game.score;
    }
  }

  draw(context) {
    context.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}
