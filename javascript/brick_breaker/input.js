export default class InputHandler {
  constructor(game, paddle) {
    document.addEventListener("keydown", (event) => {
      switch (event.keyCode) {
        // MOVEMENT LEFT
        case 37: // ARROW LEFT
        case 65: // A
          paddle.moveLeft();
          break;
        // MOVEMENT RIGHT
        case 39: // ARROW RIGHT
        case 68: // D
          paddle.moveRight();
          break;
        case 27: // ESC
        case 32: // SPACEBAR
          game.togglePause();
          break;
      }
    });

    document.addEventListener("keyup", (event) => {
      switch (event.keyCode) {
        // MOVEMENT LEFT
        case 37:
        case 65:
          if (paddle.speed < 0) paddle.stop();
          break;
        // MOVEMENT RIGHT
        case 39:
        case 68:
          if (paddle.speed > 0) paddle.stop();
          break;
      }
    });
  }
}
