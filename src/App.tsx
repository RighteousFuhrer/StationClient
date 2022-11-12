import React from 'react';
import './App.css';
import GameCore from './GameCore/GameCore'
import TileMap from "./GameCore/utils/TileMap"

function App() {
  const tileSize = 44;
  const tileMap = new TileMap(tileSize);
  return (
    <>
      <GameCore tileMap={tileMap} tileSize={tileSize} />
    </>
  );
}

export default App;
