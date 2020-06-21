export default class InputHandler {
  constructor() {
    document.addEventListener("keydown", (event) => {
      switch (event.keyCode) {
        // MOVEMENT LEFT
        case 37:
        case 65:
          console.log("moveleft");
          break;
        // MOVEMENT RIGHT
        case 39:
        case 68:
          console.log("moveright");
          break;
      }
    });
  }
}
