const express = require("express");
const router = express.Router();
const pool = require("../db");

router.post("/", async (req, res) => {
    try {

        const {
            id_producto,
            procesadas,
            rechazadas,
            tasa_rechazo_pct,
            disponibilidad_pct,
            rendimiento_pct,
            calidad_pct,
            oee_pct
        } = req.body;

        await pool.query(
            `INSERT INTO indicadores
            (
                id_producto,
                fecha,
                hora,
                procesadas,
                rechazadas,
                tasa_rechazo_pct,
                disponibilidad_pct,
                rendimiento_pct,
                calidad_pct,
                oee_pct
            )
            VALUES
            (
                $1,
                CURRENT_DATE,
                CURRENT_TIME,
                $2,$3,$4,$5,$6,$7,$8
            )`,
            [
                id_producto,
                procesadas,
                rechazadas,
                tasa_rechazo_pct,
                disponibilidad_pct,
                rendimiento_pct,
                calidad_pct,
                oee_pct
            ]
        );

        res.status(201).json({
            ok: true,
            mensaje: "Registro insertado"
        });

    } catch (err) {
        console.error(err);

        res.status(500).json({
            ok: false,
            error: err.message
        });
    }
});

module.exports = router;