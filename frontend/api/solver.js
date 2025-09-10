// sudoku solver functies
function createCandidates(grid) {
  const candidates = Array.from({ length: 9 }, () =>
    Array.from({ length: 9 }, () => new Set([1,2,3,4,5,6,7,8,9]))
  );

  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (grid[r][c] !== 0) {
        if (!setValue(candidates, r, c, grid[r][c])) {
          throw new Error("Ongeldige start-sudoku");
        }
      }
    }
  }
  return candidates;
}

function setValue(candidates, row, col, val) {
  candidates[row][col] = new Set([val]);

  for (let i = 0; i < 9; i++) {
    if (i !== col) candidates[row][i].delete(val);
    if (i !== row) candidates[i][col].delete(val);
  }

  const startRow = Math.floor(row/3)*3;
  const startCol = Math.floor(col/3)*3;
  for (let r = startRow; r < startRow+3; r++) {
    for (let c = startCol; c < startCol+3; c++) {
      if (!(r === row && c === col)) {
        candidates[r][c].delete(val);
      }
    }
  }

  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (candidates[r][c].size === 0) return false;
    }
  }
  return true;
}

function isSolved(candidates) {
  return candidates.every(row => row.every(cell => cell.size === 1));
}

function copyCandidates(c) {
  return c.map(row => row.map(set => new Set([...set])));
}

export function solveSudoku(grid) {
  let candidates = createCandidates(grid);

  function search(cand) {
    if (isSolved(cand)) return cand;

    let minOptions = 10, row = -1, col = -1;
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        const size = cand[r][c].size;
        if (size > 1 && size < minOptions) {
          minOptions = size; row = r; col = c;
        }
      }
    }

    for (const val of cand[row][col]) {
      const copy = copyCandidates(cand);
      if (setValue(copy, row, col, val)) {
        const result = search(copy);
        if (result) return result;
      }
    }
    return null;
  }

  const solved = search(candidates);
  if (!solved) return null;

  return solved.map(row => row.map(set => [...set][0]));
}
