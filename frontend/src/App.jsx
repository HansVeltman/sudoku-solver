import React, { useState } from "react";
import SudokuGrid from "./SudokuGrid";

console.log(">>> Sudoku App.jsx is geladen <<<");

function App() {
  // const [grid, setGrid] = useState(Array.from({ length: 9 }, () => Array(9).fill(0)));
  const [grid, setGrid] = useState([
  [5,3,0, 0,7,0, 0,0,0],
  [6,0,0, 1,9,5, 0,0,0],
  [0,9,8, 0,0,0, 0,6,0],

  [8,0,0, 0,6,0, 0,0,3],
  [4,0,0, 8,0,3, 0,0,1],
  [7,0,0, 0,2,0, 0,0,6],

  [0,6,0, 0,0,0, 2,8,0],
  [0,0,0, 4,1,9, 0,0,5],
  [0,0,0, 0,8,0, 0,7,9]
]);

  const [solution, setSolution] = useState(null);

  const solve = async () => {
    const res = await fetch("/api/solve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ grid }),
    });

    const data = await res.json();
    if (data.solution) {
      setSolution(data.solution);
    } else {
      alert("Geen oplossing gevonden!");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Sudoku Oplosser</h1>
      <SudokuGrid grid={grid} setGrid={setGrid} />
      <button onClick={solve} style={{ marginTop: "10px" }}>
        Oplossen
      </button>

      {solution && (
        <div style={{ marginTop: "20px" }}>
          <h2>Oplossing:</h2>
          <SudokuGrid grid={solution} readonly />
        </div>
      )}
    </div>
  );
}

export default App;
