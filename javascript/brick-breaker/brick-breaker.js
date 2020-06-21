import Paddle from "./paddle.mjs";
import InputHandler from "./input.mjs";

const canvas = document.getElementById("brick-breaker-canvas");
const context = canvas.getContext("2d");

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

// PADDLE
const paddle = new Paddle(GAME_WIDTH, GAME_HEIGHT);
paddle.draw(context);

// PLAYER INPUT
new InputHandler(paddle);

let lastTime = 0;

const gameLoop = (timestamp) => {
  let deltaTime = timestamp - lastTime;
  lastTime = timestamp;

  // CLEAR CANVAS
  context.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  paddle.update(deltaTime);
  paddle.draw(context);

  requestAnimationFrame(gameLoop);
};

gameLoop();
