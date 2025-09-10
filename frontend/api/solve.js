import { solveSudoku } from "./solver";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Alleen POST requests toegestaan" });
  }

  const { grid } = req.body;

  if (!grid || !Array.isArray(grid) || grid.length !== 9) {
    return res.status(400).json({ error: "Ongeldig sudoku-formaat" });
  }

  const solution = JSON.parse(JSON.stringify(grid));
  if (solveSudoku(solution)) {
    return res.status(200).json({ solution });
  } else {
    return res.status(400).json({ error: "Geen oplossing gevonden" });
  }
}
