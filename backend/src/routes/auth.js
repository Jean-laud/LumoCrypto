const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../db");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    // vérifier si l'utilisateur existe déjà
    const checkUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (checkUser.rows.length > 0) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // hash du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // insertion en BDD
    const newUser = await pool.query(
      "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email",
      [email, hashedPassword]
    );

    res.status(201).json({
      message: "User created successfully",
      user: newUser.rows[0],
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // vérifier si l'utilisateur existe
    const user = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (user.rows.length === 0) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const validPassword = await bcrypt.compare(password, user.rows[0].password);

    if (!validPassword) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // création d’un token JWT
    const token = jwt.sign(
      { id: user.rows[0].id, email: user.rows[0].email },
      "secret_key_lumocrypto",  // On mettra plus tard dans un .env
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token: token,
      user: {
        id: user.rows[0].id,
        email: user.rows[0].email
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
