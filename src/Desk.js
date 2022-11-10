export default class Desk {
  constructor(x, y, tileSize, tileMap) {
    this.x = x;
    this.y = y;
    this.tileSize = tileSize;
    this.tileMap = tileMap;

    this.#loadImages();

  }


  draw(ctx) {

    

    ctx.drawImage(this.image, this.x, this.y, this.tileSize, this.tileSize);

  }

  #loadImages() {
    this.image = new Image();
    this.image.src = "images/desk.png";
  }
}
