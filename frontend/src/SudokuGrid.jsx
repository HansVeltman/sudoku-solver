import React from "react";

function SudokuGrid({ grid, setGrid, readonly }) {
  const updateCell = (row, col, value) => {
    if (readonly) return;
    const newGrid = grid.map((r, i) =>
      r.map((c, j) => (i === row && j === col ? Number(value) || 0 : c))
    );
    setGrid(newGrid);
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(9, 30px)", gap: "2px" }}>
      {grid.map((row, i) =>
        row.map((cell, j) => (
          <input
            key={`${i}-${j}`}
            type="number"
            min="0"
            max="9"
            value={cell || ""}
            onChange={(e) => updateCell(i, j, e.target.value)}
            style={{ width: "30px", height: "30px", textAlign: "center" }}
            readOnly={readonly}
          />
        ))
      )}
    </div>
  );
}

export default SudokuGrid;
