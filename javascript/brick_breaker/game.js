import InputHandler from "./input.js";
import Paddle from "./paddle.js";
import Ball from "./ball.js";
import Brick from "./brick.js";
import { buildLevel, level1 } from "./levels.js";

const GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3,
};

export default class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
  }

  start() {
    this.gamestate = GAMESTATE.RUNNING;

    // PADDLE
    this.paddle = new Paddle(this);

    // BALL
    this.ball = new Ball(this);

    // BRICKS
    let bricks = buildLevel(this, level1);

    this.gameObjects = [this.paddle, this.ball, ...bricks];

    // PLAYER INPUT
    new InputHandler(this, this.paddle);
  }

  update(deltaTime) {
    if (this.gamestate == GAMESTATE.PAUSED) return;

    this.gameObjects.map((gameObject) => gameObject.update(deltaTime));

    this.gameObjects = this.gameObjects.filter(
      (gameObject) => !gameObject.markedForDeletion
    );
  }

  draw(context) {
    this.gameObjects.map((gameObject) => gameObject.draw(context));

    if (this.gamestate == GAMESTATE.PAUSED) {
      context.rect(0, 0, this.gameWidth, this.gameHeight);
      context.fillStyle = "rgba(0, 0, 0, 0.2)";
      context.fill();

      context.font = "30px Arial";
      context.fillStyle = "white";
      context.textAlign = "center";
      context.fillText("paused", this.gameWidth / 2, this.gameHeight / 2);
    }
  }

  togglePause() {
    if (this.gamestate == GAMESTATE.PAUSED) {
      this.gamestate = GAMESTATE.RUNNING;
    } else {
      this.gamestate = GAMESTATE.PAUSED;
    }
  }
}
