import React from 'react';
import './App.css';
import GameCore from './GameCore/GameCore'
import TileMap from "./GameCore/utils/TileMap"

function App() {
  const tileSize = 44;
  const tileMap = new TileMap(tileSize);
  const gameSpeed = 0.8;
  return (
    <>
      <GameCore tileMap={tileMap} tileSize={tileSize} gameSpeed = {gameSpeed}/>
    </>
  );
}

export default App;
