const express = require("express");
const pool = require("../../db");
const authMiddleware = require("../middlewares/authMiddleware");
const { getPrices } = require("../services/coingecko");
const symbolMap = require("../utils/symbolMap");

const router = express.Router();

router.get("/assets", authMiddleware, async (req, res) => {
  try {
    const portfolio = await pool.query(
      "SELECT * FROM portfolios WHERE user_id = $1",
      [req.user.id]
    );

    if (portfolio.rows.length === 0) {
      return res.status(404).json({ message: "Portefeuille introuvable." });
    }

    const assetsResult = await pool.query(
      "SELECT * FROM assets WHERE portfolio_id = $1",
      [portfolio.rows[0].id]
    );

    const assets = assetsResult.rows;

    const coinIds = assets
      .map(a => symbolMap[a.symbol])
      .filter(Boolean);

    const prices = await getPrices(coinIds);

    const enrichedAssets = assets.map(asset => {
      const coinId = symbolMap[asset.symbol];
      const price = prices[coinId]?.eur || 0;

      return {
        ...asset,
        price,
        value: price * asset.quantity,
      };
    });

    res.json(enrichedAssets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur lors de la récupération du portefeuille." });
  }
});

router.post("/add-asset", authMiddleware, async (req, res) => {
  const { symbol, quantity } = req.body;

  if (!symbol || !quantity || quantity <= 0) {
    return res.status(400).json({ message: "Données invalides. Vérifiez le symbole et la quantité." });
  }

  try {
    const portfolio = await pool.query(
      "SELECT * FROM portfolios WHERE user_id = $1",
      [req.user.id]
    );

    if (portfolio.rows.length === 0) {
      return res.status(404).json({ message: "Portefeuille introuvable." });
    }

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

      return res.json({
        message: "Quantité mise à jour avec succès.",
        asset: updated.rows[0]
      });
    }

    const created = await pool.query(
      "INSERT INTO assets (portfolio_id, symbol, quantity) VALUES ($1, $2, $3) RETURNING *",
      [portfolioId, symbol.toUpperCase(), quantity]
    );

    res.json({
      message: "Asset ajouté avec succès.",
      asset: created.rows[0]
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur lors de l'ajout de l'asset." });
  }
});

router.delete("/assets/:id", authMiddleware, async (req, res) => {
  const assetId = req.params.id;

  try {
    const portfolio = await pool.query(
      "SELECT * FROM portfolios WHERE user_id = $1",
      [req.user.id]
    );

    if (portfolio.rows.length === 0) {
      return res.status(404).json({ message: "Portefeuille introuvable." });
    }

    const portfolioId = portfolio.rows[0].id;

    const asset = await pool.query(
      "SELECT * FROM assets WHERE id = $1 AND portfolio_id = $2",
      [assetId, portfolioId]
    );

    if (asset.rows.length === 0) {
      return res.status(404).json({ message: "Asset introuvable ou non autorisé." });
    }

    await pool.query("DELETE FROM assets WHERE id = $1", [assetId]);

    res.json({ message: "Asset supprimé avec succès." });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur lors de la suppression de l'asset." });
  }
});

router.post("/assets/remove", authMiddleware, async (req, res) => {
  const { assetId, quantity } = req.body;

  if (!quantity || quantity <= 0) {
    return res.status(400).json({ message: "Quantité invalide." });
  }

  try {
    const portfolio = await pool.query(
      "SELECT * FROM portfolios WHERE user_id = $1",
      [req.user.id]
    );

    if (portfolio.rows.length === 0) {
      return res.status(404).json({ message: "Portefeuille introuvable." });
    }

    const portfolioId = portfolio.rows[0].id;

    const asset = await pool.query(
      "SELECT * FROM assets WHERE id = $1 AND portfolio_id = $2",
      [assetId, portfolioId]
    );

    if (asset.rows.length === 0) {
      return res.status(404).json({ message: "Asset introuvable." });
    }

    const currentQty = asset.rows[0].quantity;

    if (quantity > currentQty) {
      return res.status(400).json({ message: "Quantité trop élevée." });
    }

    if (quantity === currentQty) {
      await pool.query("DELETE FROM assets WHERE id = $1", [assetId]);
      return res.json({ message: "Asset supprimé." });
    }

    const updated = await pool.query(
      "UPDATE assets SET quantity = quantity - $1 WHERE id = $2 RETURNING *",
      [quantity, assetId]
    );

    res.json({
      message: "Quantité réduite.",
      asset: updated.rows[0]
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur." });
  }
});

router.post("/assets/add", authMiddleware, async (req, res) => {
  const { assetId, quantity } = req.body;

  if (!quantity || quantity <= 0) {
    return res.status(400).json({ message: "Quantité invalide." });
  }

  try {
    const portfolio = await pool.query(
      "SELECT * FROM portfolios WHERE user_id = $1",
      [req.user.id]
    );

    if (portfolio.rows.length === 0) {
      return res.status(404).json({ message: "Portefeuille introuvable." });
    }

    const portfolioId = portfolio.rows[0].id;

    const asset = await pool.query(
      "SELECT * FROM assets WHERE id = $1 AND portfolio_id = $2",
      [assetId, portfolioId]
    );

    if (asset.rows.length === 0) {
      return res.status(404).json({ message: "Asset introuvable." });
    }

    const updated = await pool.query(
      "UPDATE assets SET quantity = quantity + $1 WHERE id = $2 RETURNING *",
      [quantity, assetId]
    );

    res.json({
      message: "Quantité augmentée.",
      asset: updated.rows[0]
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur." });
  }
});

module.exports = router;
