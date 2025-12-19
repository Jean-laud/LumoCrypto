const express = require("express");
const pool = require("../db");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/assets", authMiddleware, async (req, res) => {
  try {
    const portfolio = await pool.query(
      "SELECT * FROM portfolios WHERE user_id = $1",
      [req.user.id]
    );

    if (portfolio.rows.length === 0) {
      return res.status(404).json({ message: "Portfolio not found" });
    }

    const assets = await pool.query(
      "SELECT * FROM assets WHERE portfolio_id = $1",
      [portfolio.rows[0].id]
    );

    res.json(assets.rows);
  } catch {
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/add-asset", authMiddleware, async (req, res) => {
  const { symbol, quantity } = req.body;

  try {
    const portfolio = await pool.query(
      "SELECT * FROM portfolios WHERE user_id = $1",
      [req.user.id]
    );

    const portfolioId = portfolio.rows[0].id;

    const existing = await pool.query(
      "SELECT * FROM assets WHERE portfolio_id = $1 AND symbol = $2",
      [portfolioId, symbol.toUpperCase()]
    );

    if (existing.rows.length > 0) {
      const updated = await pool.query(
        "UPDATE assets SET quantity = quantity + $1 WHERE id = $2 RETURNING *",
        [quantity, existing.rows[0].id]
      );
      return res.json({ message: "Asset updated", asset: updated.rows[0] });
    }

    const created = await pool.query(
      "INSERT INTO assets (portfolio_id, symbol, quantity) VALUES ($1, $2, $3) RETURNING *",
      [portfolioId, symbol.toUpperCase(), quantity]
    );

    res.json({ message: "Asset added", asset: created.rows[0] });
  } catch {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
