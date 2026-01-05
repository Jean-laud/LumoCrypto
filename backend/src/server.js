require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const portfolioRoutes = require("./routes/portfolio");
const pool = require("../db");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/portfolio", portfolioRoutes);


app.get("/", (req, res) => {
    res.json({ message: "LumoCrypto backend running"});
});

pool.query("SELECT NOW()")
  .then(() => console.log("Connected to PostgreSQL ✔"))
  .catch(err => console.error("PostgreSQL connection error:", err));

const PORT = 4000;
app.listen(PORT, () =>
console.log(`Backend running on port ${PORT}`));