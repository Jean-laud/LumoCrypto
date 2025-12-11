const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "lumocrypto",
  password: "yoshicool37",
  port: 5432,
});

module.exports = pool;
