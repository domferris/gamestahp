let canvas, context, health, currentScore;

window.onload = () => {
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");

  document.addEventListener("keydown", playerInput);

  // RENDER X/SEC
  const x = 14;
  setInterval(drawSnake, 1000 / x);

  health = 3;
  currentScore = 0;
};

// GAME CANVAS
const gridSize = (tileSize = 20); // 20 x 20 = 400
let nextX = (nextY = 0);

// SNAKE PROPERTIES
const defaultTailSize = 4;
let tailSize = defaultTailSize;
const snakeTrail = [];
let snakeX = (snakeY = 10);

// APPLE POSITION
let appleX = (appleY = 15);

// DRAW SNAKE
const drawSnake = () => {
  // MOVE SNAKE TO NEXT POSITION
  snakeX += nextX;
  snakeY += nextY;

  // SNAKE LEAVES CANVAS/WRAP?
  if (snakeX < 0) {
    snakeX = gridSize - 1;
  }
  if (snakeX > gridSize - 1) {
    snakeX = 0;
  }

  if (snakeY < 0) {
    snakeY = gridSize - 1;
  }
  if (snakeY > gridSize - 1) {
    snakeY = 0;
  }

  // SNAKE BITES APPLE?
  const currentScoreDisplay = document.querySelector(".current-score-display");
  if (snakeX == appleX && snakeY == appleY) {
    tailSize++;

    appleX = Math.floor(Math.random() * gridSize);
    appleY = Math.floor(Math.random() * gridSize);

    currentScore += 1;
    currentScoreDisplay.innerHTML = currentScore;
  }

  // BACKGROUND FILL
  context.fillStyle = "rgb(191, 204, 1)";
  context.fillRect(0, 0, canvas.width, canvas.height);

  // APPLE FILL
  context.fillStyle = "rgb(64, 46, 1)";
  context.fillRect(appleX * tileSize, appleY * tileSize, tileSize, tileSize);

  // SNAKE FILL
  context.fillStyle = "rgb(114, 96, 1)";
  for (var i = 0; i < snakeTrail.length; i++) {
    context.fillRect(
      snakeTrail[i].x * tileSize,
      snakeTrail[i].y * tileSize,
      tileSize,
      tileSize
    );

    // SNAKE BITES TAIL?
    if (snakeTrail[i].x == snakeX && snakeTrail[i].y == snakeY) {
      tailSize = defaultTailSize;
      // health -= 1 AFTER game start
    }
  }

  // SET SNAKE TRAIL
  snakeTrail.push({ x: snakeX, y: snakeY });
  while (snakeTrail.length > tailSize) {
    snakeTrail.shift();
  }
};

// PLAYER INPUT
const playerInput = (event) => {
  switch (event.keyCode) {
    case 37:
      nextX = -1;
      nextY = 0;
      break;
    case 38:
      nextX = 0;
      nextY = -1;
      break;
    case 39:
      nextX = 1;
      nextY = 0;
      break;
    case 40:
      nextX = 0;
      nextY = 1;
      break;
  }
};
