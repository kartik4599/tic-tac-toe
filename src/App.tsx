import { useState } from "react";
import "./App.css";
import GameComponent from "./GameComponent";

function App() {
  const [size, setSize] = useState(3);
  const [start, setStart] = useState(false);
  // const [computer, setComputer] = useState(false);

  if (start) return <GameComponent size={size} setStart={setStart} />;

  return (
    <div>
      <h2>Tic-Tac-Toe</h2>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "start",
          margin: "20px",
          gap: "10px",
        }}
      >
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
            max={10}
            onChange={({ target: { value } }) => {
              let currentSize = parseInt(value);
              if (currentSize > 1 && currentSize < 11) setSize(parseInt(value));
            }}
          />
        </div>
        {/* <div>
          <label>Enter the Type</label>
          <select
            style={{
              margin: "0 10px",
              padding: "10px",
              paddingLeft: "25px",
              borderRadius: "5px",
              border: "none",
            }}
            value={computer ? "2" : "1"}
            onChange={({ target: { value } }) => {
              if (value === "1") {
                setComputer(false);
              } else if (value === "2") {
                setComputer(true);
              }
            }}
          >
            <option value="1">1 X 1</option>
            <option value="2">1 X Computer</option>
          </select>
        </div> */}
        <button onClick={() => setStart(true)}>Start the Game</button>
      </div>
    </div>
  );
}

export default App;
