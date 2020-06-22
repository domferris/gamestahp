import InputHandler from "./input.js";
import Paddle from "./paddle.js";
import Ball from "./ball.js";
import Brick from "./brick.js";
import { buildLevel, level1 } from "./levels.js";

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
    let bricks = buildLevel(this, level1);

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
