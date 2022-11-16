import MovingDirection from "./MovingDirection.js";
import { calcNextCoordinate } from "./PathFinder.js";

export default class Customer {
  constructor(
    currentPoint,
    destinationPoint,
    tileSize,
    type,
    id,
    tileMap,
    gameSpeed
  ) {
    this.id = id;
    this.currentPoint = currentPoint;
    this.destinationPoint = destinationPoint;
    this.tileMap = tileMap;
    this.tileSize = tileSize;
    this.image = new Image();
    switch (type) {
      case "Usual": {
        this.image.src = require("../images/dude.png");
        this.velocity = 1 * gameSpeed;
        break;
      }
      case "OldBoy": {
        this.image.src = require("../images/woman.png");
        this.velocity = 0.8 * gameSpeed;
        break;
      }
      case "Disabled": {
        this.image.src = require("../images/criple.png");
        this.velocity = 0.6 * gameSpeed;
        break;
      }
      default: {
        this.image.src = require("../images/dude.png");
        this.velocity = 1 * gameSpeed;
        break;
      }
    }
  }

  update(destinationPoint) {
    this.destinationPoint = destinationPoint;
  }

  drawModel(ctx) {
    // if (!pause) {
    //   this.#move();
    // }

    const size = this.tileSize / 4;

    ctx.drawImage(
      this.image,
      this.currentPoint.x,
      this.currentPoint.y - size,
      this.tileSize,
      this.tileSize
    );
  }
  drawId(ctx) {
    const size = this.tileSize / 4;
    ctx.font = "14px serif";
    ctx.textAlign = "center";
    ctx.fillStyle = "#FFD700";
    ctx.fillText(
      String(this.id),
      this.currentPoint.x + 2 * size,
      this.currentPoint.y - size * 1.5
    );
  }

  move(pause) {
    if (!pause) {
      const next = calcNextCoordinate(
        this.tileMap,
        { x: this.currentPoint.x, y: this.currentPoint.y },
        { x: this.destinationPoint.x, y: this.destinationPoint.y },
        this.velocity
      );

      this.currentPoint.x = next.x;
      this.currentPoint.y = next.y;
    }
  }
}
