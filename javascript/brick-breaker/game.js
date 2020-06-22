import Paddle from "./paddle.js";
import InputHandler from "./input.js";
import Ball from "./ball.js";
import Brick from "./brick.js";

export default class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
  }

  start() {
    // PADDLE
    this.paddle = new Paddle(this);

    // BALL
    this.ball = new Ball(this);

    // BRICKS
    let bricks = [];
    for (let i = 0; i <= 10; i++) {
      bricks.push(new Brick(this, { x: i * 52, y: 30 }));
    }

    this.gameObjects = [this.paddle, this.ball, ...bricks];

    // PLAYER INPUT
    new InputHandler(this.paddle);
  }

  update(deltaTime) {
    this.gameObjects.map((gameObject) => gameObject.update(deltaTime));
  }

  draw(context) {
    this.gameObjects.map((gameObject) => gameObject.draw(context));
  }
}
