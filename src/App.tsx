import { useState } from "react";
import "./App.css";
import GameComponent from "./GameComponent";

function App() {
  const [size, setSize] = useState(3);
  const [start, setStart] = useState(false);

  if (start) return <GameComponent size={size} setStart={setStart} />;

  return (
    <div>
      <h2>Tic-Tac-Toe</h2>
      <div>
        <label>Enter the Size</label>
        <input
          value={size}
          type="number"
          style={{
            margin: "0 10px",
            width: "35px",
            padding: "10px",
            paddingLeft: "25px",
            borderRadius: "5px",
            border: "none",
          }}
          min={2}
          onChange={({ target: { value } }) => {
            let currentSize = parseInt(value);
            if (currentSize > 1) setSize(parseInt(value));
          }}
        />
        <button onClick={() => setStart(true)}>Start the Game</button>
      </div>
    </div>
  );
}

export default App;
