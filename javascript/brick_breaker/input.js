export default class InputHandler {
  constructor(paddle) {
    document.addEventListener("keydown", (event) => {
      switch (event.keyCode) {
        // MOVEMENT LEFT
        case 37:
        case 65:
          paddle.moveLeft();
          break;
        // MOVEMENT RIGHT
        case 39:
        case 68:
          paddle.moveRight();
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
