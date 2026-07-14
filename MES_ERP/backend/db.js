const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "MES_ERP",
  password: "Cani2001.",
  port: 5432,
    options: "-c search_path=apm"
});

module.exports = pool;