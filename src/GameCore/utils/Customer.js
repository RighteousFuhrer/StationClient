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
      case 0: {
        this.image.src = require("../images/dude.png");
        this.velocity = 1 * gameSpeed;
        break;
      }
      case 1: {
        this.image.src = require("../images/woman.png");
        this.velocity = 0.75 * gameSpeed;
        break;
      }
      case 2: {
        this.image.src = require("../images/criple.png");
        this.velocity = 0.5 * gameSpeed;
        break;
      }
      default: {
        this.image.src = require("../images/dude.png");
        this.velocity = 1 * gameSpeed;
        break;
      }
    }
    // this.currentMovingDirection = null;
    // this.requestedMovingDirection = null;
  }

  update(destinationPoint) {
    this.destinationPoint = destinationPoint;
  }

  drawModel(ctx, pause) {
    if (!pause) {
      this.#move();
    }

    const size = this.tileSize / 4;

    ctx.drawImage(
      this.image,
      this.currentPoint.x,
      this.currentPoint.y - size,
      this.tileSize,
      this.tileSize
    );

    // ctx.drawImage(
    //   this.pacmanImages[this.pacmanImageIndex],
    //   this.x,
    //   this.y,
    //   this.tileSize,
    //   this.tileSize
    // );
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

  #move() {
    if (
      this.currentPoint.x === this.destinationPoint.x &&
      this.currentPoint.y === this.destinationPoint.y
    ) {
      this.update({
        x: Math.round(Math.random() * 13 + 1) * this.tileSize,
        y: Math.round(Math.random() * 13 + 1) * this.tileSize,
      });
    }

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
