import Paddle from "./paddle.js";
import InputHandler from "./input.js";
import Ball from "./ball.js";

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

    this.gameObjects = [this.paddle, this.ball];

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
