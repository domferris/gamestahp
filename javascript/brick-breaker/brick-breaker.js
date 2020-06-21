import Paddle from "./paddle.mjs";

const canvas = document.getElementById("brick-breaker-canvas");
const context = canvas.getContext("2d");

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

// CLEAR CANVAS
context.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

// PADDLE
const paddle = new Paddle(GAME_WIDTH, GAME_HEIGHT);
paddle.draw(context);
