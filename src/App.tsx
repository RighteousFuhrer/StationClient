import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import GameCore from "./GameCore/GameCore";
import TileMap from "./GameCore/utils/TileMap";
import Settings from "./Page/Settings";

function App() {
  const tileSize = 44;
  const tileMap = new TileMap(tileSize);
  const gameSpeed = 0.65;
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Settings />} />
          <Route
            path="/game"
            element={
              <GameCore
                tileMap={tileMap}
                tileSize={tileSize}
                gameSpeed={gameSpeed}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
