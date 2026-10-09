const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "akshatha",
    database: "disaster_relief"
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.log("Database connection failed:", err);
    } else {
        console.log("Connected to MySQL Database");
    }
});

// ========================================
// HOME ROUTE
// ========================================

app.get("/", (req, res) => {
    res.send("Disaster Relief Backend Running");
});

// ========================================
// RESOURCES APIs
// ========================================

// Get all resources
app.get("/resources", (req, res) => {

    const sql = "SELECT * FROM resources";

    db.query(sql, (err, result) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.json(result);
        }
    });
});

// Add new resource
app.post("/resources", (req, res) => {

    const { name, quantity, category } = req.body;

    const sql = `
        INSERT INTO resources(name, quantity, category)
        VALUES (?, ?, ?)
    `;

    db.query(sql, [name, quantity, category], (err, result) => {

        if (err) {
            res.status(500).json(err);
        } else {
            res.json({
                message: "Resource Added Successfully"
            });
        }
    });
});

// Delete resource
app.delete("/resources/:id", (req, res) => {

    const id = req.params.id;

    const sql = "DELETE FROM resources WHERE id = ?";

    db.query(sql, [id], (err, result) => {

        if (err) {
            res.status(500).json(err);
        } else {
            res.json({
                message: "Resource Deleted"
            });
        }
    });
});

// ========================================
// DONATIONS APIs
// ========================================

// Get all donations
app.get("/donations", (req, res) => {

    const sql = "SELECT * FROM donations";

    db.query(sql, (err, result) => {

        if (err) {
            res.status(500).json(err);
        } else {
            res.json(result);
        }
    });
});

// Add donation
app.post("/donations", (req, res) => {

    const { donor, amount } = req.body;

    const sql = `
        INSERT INTO donations(donor, amount)
        VALUES (?, ?)
    `;

    db.query(sql, [donor, amount], (err, result) => {

        if (err) {
            res.status(500).json(err);
        } else {
            res.json({
                message: "Donation Added"
            });
        }
    });
});

// Delete donation
app.delete("/donations/:id", (req, res) => {

    const id = req.params.id;

    const sql = "DELETE FROM donations WHERE id = ?";

    db.query(sql, [id], (err, result) => {

        if (err) {
            res.status(500).json(err);
        } else {
            res.json({
                message: "Donation Deleted"
            });
        }
    });
});

// ========================================
// CUSTOM SQL TERMINAL
// ========================================

app.post("/query", (req, res) => {

    const { query } = req.body;

    db.query(query, (err, result) => {

        if (err) {
            res.status(500).json(err);
        } else {
            res.json(result);
        }
    });
});

// ========================================
// START SERVER
// ========================================

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});