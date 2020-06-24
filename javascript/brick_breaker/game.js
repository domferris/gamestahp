import InputHandler from "./input.js";
import Paddle from "./paddle.js";
import Ball from "./ball.js";
import { buildLevel, level1, level2 } from "./levels.js";

export const GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3,
  NEWLEVEL: 4,
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
    this.bricks = [];

    this.lives = 3;
    this.score = 0;

    this.levels = [level1, level2];
    this.currentLevel = 0;

    // PLAYER INPUT
    new InputHandler(this, this.paddle);
  }

  start() {
    if (
      this.gamestate !== GAMESTATE.MENU &&
      this.gamestate !== GAMESTATE.NEWLEVEL
    )
      return;

    // LOAD BRICKS
    this.bricks = buildLevel(this, this.levels[this.currentLevel]);
    this.gameObjects = [this.paddle, this.ball];

    this.ball.reset();

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

    if (this.bricks.length === 0) {
      this.currentLevel++;
      this.gamestate = GAMESTATE.NEWLEVEL;
      this.start();
    }

    [...this.gameObjects, ...this.bricks].map((gameObject) =>
      gameObject.update(deltaTime)
    );

    this.bricks = this.bricks.filter((brick) => !brick.markedForDeletion);
  }

  draw(context) {
    [...this.gameObjects, ...this.bricks].map((gameObject) =>
      gameObject.draw(context)
    );

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
