import TileMap from "./TileMap.js";

const tileSize = 44;
const velocity = 2;

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const tileMap = new TileMap(tileSize);
const customers = tileMap.getCustomers(velocity);
const desks = tileMap.getDesks();


function gameLoop() {
  tileMap.draw(ctx);
  desks.forEach((desk) => desk.draw(ctx));
  customers.forEach((desk) => desk.draw(ctx,pause()));
  
}



function pause() {
  return true;
}


tileMap.setCanvasSize(canvas);
setInterval(gameLoop, 1000 / 75);
