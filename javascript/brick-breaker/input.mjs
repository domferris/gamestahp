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
  }
}
