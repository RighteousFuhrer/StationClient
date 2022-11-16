export const calcNextCoordinate = (tileMap, pointStart, pointEnd, velocity) => {
  if (pointStart === pointEnd) {
    return pointStart;
  }

  if (pointStart.x >= tileMap.tileSize * tileMap.map.length) {
    return { x: pointStart.x - velocity, y: pointStart.y };
  } else if (pointStart.x < tileMap.tileSize) {
    return { x: pointStart.x + velocity, y: pointStart.y };
  }
  if (pointStart.y >= tileMap.tileSize * tileMap.map[0].length) {
    return { x: pointStart.x, y: pointStart.y - velocity };
  } else if (pointStart.y < tileMap.tileSize) {
    return { x: pointStart.x, y: pointStart.y + velocity };
  }

  const difX = pointEnd.x - pointStart.x;
  const difY = pointEnd.y - pointStart.y;
  const distance = Math.sqrt(Math.pow(difX, 2) + Math.pow(difY, 2));

  if (distance < velocity) {
    return { x: pointEnd.x, y: pointEnd.y };
  }
  return {
    x: (pointStart.x + (difX * velocity) / distance),
    y: (pointStart.y + (difY * velocity) / distance),
  };
};
