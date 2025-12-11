const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1]; // format "Bearer token"

  if (!token) {
    return res.status(401).json({ message: "Invalid token format" });
  }

  jwt.verify(token, "secret_key_lumocrypto", (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid or expired token" });

    req.user = user;
    next();
  });
}

module.exports = authMiddleware;
