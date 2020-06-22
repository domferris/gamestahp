export default class Ball {
  constructor(game) {
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;

    this.game = game;

    this.image = document.getElementById("img-ball");
    this.size = 16;

    this.position = { x: 10, y: 10 };

    this.speed = { x: 4, y: 2 };
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

    // TOP+BOT WALL COLLISION
    if (this.position.y + this.size > this.gameHeight || this.position.y < 0) {
      this.speed.y = -this.speed.y;
    }

    // PADDLE COLLISION
    const ballBottom = this.position.y + this.size;
    const paddleTop = this.game.paddle.position.y;
    const paddleLeft = this.game.paddle.position.x;
    const paddleRight = this.game.paddle.position.x + this.game.paddle.width;

    if (
      ballBottom >= paddleTop &&
      this.position.x >= paddleLeft &&
      this.position.x + this.size <= paddleRight
    ) {
      this.speed.y = -this.speed.y;
      this.position.y = this.game.paddle.position.y - this.size;
    }
  }
}