const express = require("express");
const cors = require("cors");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
    res.json({ message: "LumoCrypto backend running"});
});

const PORT = 4000;
app.listen(PORT, () =>
console.log(`Backend running on port ${PORT}`));