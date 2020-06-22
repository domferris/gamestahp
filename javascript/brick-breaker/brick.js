export default class Brick {
  constructor(game, position) {
    this.game = game;

    this.image = document.getElementById("img-brick");

    this.position = position;

    this.width = 80;
    this.height = 24;
  }

  update() {}

  draw(context) {
    context.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}
