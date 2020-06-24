import InputHandler from "./input.js";
import Paddle from "./paddle.js";
import Ball from "./ball.js";
// import Brick from "./brick.js";
import { buildLevel, level1 } from "./levels.js";

export const GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3,
};

export default class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;

    this.gamestate = GAMESTATE.MENU;

    // PADDLE
    this.paddle = new Paddle(this);

    // BALL
    this.ball = new Ball(this);

    // BRICKS TO BE
    this.gameObjects = [];

    this.lives = 3;

    // PLAYER INPUT
    new InputHandler(this, this.paddle);
  }

  start() {
    if (this.gamestate !== GAMESTATE.MENU) return;

    // LOAD BRICKS
    let bricks = buildLevel(this, level1);
    this.gameObjects = [this.paddle, this.ball, ...bricks];

    this.gamestate = GAMESTATE.RUNNING;
  }

  update(deltaTime) {
    if (this.lives === 0) this.gamestate = GAMESTATE.GAMEOVER;

    if (
      this.gamestate === GAMESTATE.PAUSED ||
      this.gamestate === GAMESTATE.MENU ||
      this.gamestate == GAMESTATE.GAMEOVER
    )
      return;

    this.gameObjects.map((gameObject) => gameObject.update(deltaTime));

    this.gameObjects = this.gameObjects.filter(
      (gameObject) => !gameObject.markedForDeletion
    );
  }

  draw(context) {
    this.gameObjects.map((gameObject) => gameObject.draw(context));

    if (this.gamestate === GAMESTATE.MENU) {
      context.rect(0, 0, this.gameWidth, this.gameHeight);
      context.fillStyle = "rgba(0, 0, 0, 0.2)";
      context.fill();

      context.font = "30px Arial";
      context.fillStyle = "white";
      context.textAlign = "center";
      context.fillText(
        "Press SPACEBAR to Play",
        this.gameWidth / 2,
        this.gameHeight / 2
      );
    }

    if (this.gamestate === GAMESTATE.PAUSED) {
      context.rect(0, 0, this.gameWidth, this.gameHeight);
      context.fillStyle = "rgba(0, 0, 0, 0.2)";
      context.fill();

      context.font = "30px Arial";
      context.fillStyle = "white";
      context.textAlign = "center";
      context.fillText("❚ ❚", this.gameWidth / 2, this.gameHeight / 2);
    }

    if (this.gamestate === GAMESTATE.GAMEOVER) {
      context.rect(0, 0, this.gameWidth, this.gameHeight);
      context.fillStyle = "rgba(0, 0, 0, 0.2)";
      context.fill();

      context.font = "30px Arial";
      context.fillStyle = "white";
      context.textAlign = "center";
      context.fillText("GAME OVER", this.gameWidth / 2, this.gameHeight / 2);
    }
  }

  togglePause() {
    if (this.gamestate === GAMESTATE.PAUSED) {
      this.gamestate = GAMESTATE.RUNNING;
    } else {
      this.gamestate = GAMESTATE.PAUSED;
    }
  }
}
