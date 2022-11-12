export default class Desk {
  constructor(x, y, tileSize) {
    this.x = x;
    this.y = y;
    this.tileSize = tileSize;
    this.image = new Image();
    this.image.src = require("../images/booth.png");

  }


  draw(ctx) {

    ctx.drawImage(this.image, this.x-this.tileSize/7, this.y-this.tileSize/2, this.tileSize*1.3, this.tileSize*1.3);

  }
}
