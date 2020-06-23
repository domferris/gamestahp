import Game from "./game.js";

const canvas = document.getElementById("brick-breaker-canvas");
const context = canvas.getContext("2d");

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

const game = new Game(GAME_WIDTH, GAME_HEIGHT);
// game.start();

let lastTime = 0;

const gameLoop = (timestamp) => {
  let deltaTime = timestamp - lastTime;
  lastTime = timestamp;

  // CLEAR CANVAS
  context.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  game.update(deltaTime);
  game.draw(context);

  requestAnimationFrame(gameLoop);
};

requestAnimationFrame(gameLoop);
