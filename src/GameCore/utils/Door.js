export default class Door {
    constructor(x, y, tileSize) {
        this.x = x;
        this.y = y;
        this.tileSize = tileSize;
        this.image = new Image();
        this.image.src = require("../images/door.png");
    
      }
    
    
      draw(ctx) {
    
        ctx.drawImage(this.image, this.x, this.y, this.tileSize, this.tileSize);
    
      }
} 