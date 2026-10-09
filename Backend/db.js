const mysql = require("mysql2");
require("dotenv").config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME || "myproject"
});

connection.connect((err) => {
  if (err) {
    console.error("❌ DB connection error:", err.message);
    process.exit(1);
  }
  console.log("✅ Connected to MySQL DB");
});

module.exports = connection;