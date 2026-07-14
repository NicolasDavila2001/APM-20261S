const express = require("express");
const router = express.Router();

const pool = require("../db");

// POST /api/login
router.post("/", async (req, res) => {

    try {

        const { username, password } = req.body;

        const result = await pool.query(
            "SELECT * FROM users WHERE username = $1 AND password = $2",
            [username, password]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({
                success: false,
                message: "Usuario o contraseña incorrectos"
            });
        }

        const user = result.rows[0];

        res.json({
            success: true,
            id: user.id,
            username: user.username,
            role: user.role
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: "Error del servidor"
        });

    }

});

module.exports = router;