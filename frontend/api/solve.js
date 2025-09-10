import { solveSudoku } from "./solver.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Alleen POST toegestaan" });
  }

  const { grid } = req.body;
  if (!grid || !Array.isArray(grid) || grid.length !== 9) {
    return res.status(400).json({ error: "Ongeldig grid formaat" });
  }

  try {
    const solution = solveSudoku(grid);
    if (solution) {
      return res.status(200).json({ solution });
    } else {
      return res.status(400).json({ error: "Geen oplossing gevonden" });
    }
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
