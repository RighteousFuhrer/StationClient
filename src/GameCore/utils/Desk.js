export default class Desk {
  constructor(x, y, tileSize) {
    this.x = x;
    this.y = y;
    this.tileSize = tileSize;
    this.image = new Image();
    this.image.src = require("../images/desk.png");

  }


  draw(ctx) {

    ctx.drawImage(this.image, this.x, this.y, this.tileSize, this.tileSize);

  }
}
