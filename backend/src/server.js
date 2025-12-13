const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const portfolioRoutes = require("./routes/portfolio");
const pool = require("./db");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/portfolio", portfolioRoutes);


// Test route
app.get("/", (req, res) => {
    res.json({ message: "LumoCrypto backend running"});
});
// connection active = la bdd
pool.connect()
// promesse réussi
  .then(() => console.log("Connected to PostgreSQL ✔"))
// promesse échoué
  .catch(err => console.error("PostgreSQL connection error:", err));

const PORT = 4000;
app.listen(PORT, () =>
console.log(`Backend running on port ${PORT}`));