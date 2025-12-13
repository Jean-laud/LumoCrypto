const express = require("express");
const router = express.Router();
const pool = require("../db");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/assets", authMiddleware, async (req, res) => {
  try {
    // récupérer le portfolio de l'utilisateur
    const portfolio = await pool.query(
      "SELECT * FROM portfolios WHERE user_id = $1",
      [req.user.id]
    );

    const portfolioId = portfolio.rows[0].id;

    // récupérer les assets
    const assets = await pool.query(
      "SELECT * FROM assets WHERE portfolio_id = $1",
      [portfolioId]
    );

    res.json(assets.rows);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Ajouter ou mettre à jour un actif
router.post("/add-asset", authMiddleware, async (req, res) => {
  const { symbol, quantity } = req.body;

  try {
    // récupérer le portfolio de l'utilisateur
    const portfolio = await pool.query(
      "SELECT * FROM portfolios WHERE user_id = $1",
      [req.user.id]
    );

    const portfolioId = portfolio.rows[0].id;

    // Vérifier si l'actif existe déjà
    const existingAsset = await pool.query(
      "SELECT * FROM assets WHERE portfolio_id = $1 AND symbol = $2",
      [portfolioId, symbol.toUpperCase()]
    );

    if (existingAsset.rows.length > 0) {
      // Mettre à jour la quantité
      const updatedAsset = await pool.query(
        "UPDATE assets SET quantity = quantity + $1 WHERE portfolio_id = $2 AND symbol = $3 RETURNING *",
        [quantity, portfolioId, symbol.toUpperCase()]
      );

      return res.json({
        message: "Asset updated",
        asset: updatedAsset.rows[0]
      });
    }

    // Ajouter un nouvel actif
    const newAsset = await pool.query(
      "INSERT INTO assets (portfolio_id, symbol, quantity) VALUES ($1, $2, $3) RETURNING *",
      [portfolioId, symbol.toUpperCase(), quantity]
    );

    res.json({
      message: "Asset added",
      asset: newAsset.rows[0]
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
