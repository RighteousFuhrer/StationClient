export default class Desk {
  constructor(x, y, tileSize, isManaging) {
    this.x = x;
    this.y = y;
    this.tileSize = tileSize;

    this.imageWorking = new Image();
    this.imageWorking.src = require("../images/booth.png");
    this.imageBroken = new Image();
    this.imageBroken.src = require("../images/boothBroken.png");

    this.isManaging = isManaging;
  }

  draw(ctx) {
    ctx.drawImage(
      this.isManaging ? this.imageWorking : this.imageBroken,
      this.x - this.tileSize / 7,
      this.y - this.tileSize / 2,
      this.tileSize * 1.3,
      this.tileSize * 1.3
    );
  }

  updateState(isManaging) {
    this.isManaging = isManaging;
  }

  loadImages() {}
}
