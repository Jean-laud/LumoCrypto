const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const pool = require("../../db");

router.get("/me", authMiddleware, (req, res) => {
  res.json({
    message: "Protected route access granted",
    user: req.user
  });
});

module.exports = router;
