const express = require("express");
const router = express.Router();
const pool = require("../db");

/*
=====================================
Obtener todos los insumos
=====================================
*/

router.get("/items", async (req, res) => {

    try {

        const result = await pool.query(`
            SELECT
                id,
                item_nombre,
                tipo,
                cantidad
            FROM bodega_insumos_herramientas
            ORDER BY item_nombre
        `);

        res.json(result.rows);

    } catch (err) {

        console.log(err);

        res.status(500).json({ error: err.message });

    }

});


/*
=====================================
Obtener Solicitudes
=====================================
*/

router.get("/", async (req, res) => {

    try {

        const result = await pool.query(`
            SELECT
                s.id,
                s.id_item,
                b.item_nombre,
                b.tipo,
                s.cantidad,
                s.estado,
                s.fecha_solicitud,
                b.cantidad AS existencia
            FROM solicitudes s
            INNER JOIN bodega_insumos_herramientas b
                ON s.id_item = b.id
            ORDER BY s.id DESC
        `);

        res.json(result.rows);

    } catch (err) {

        console.log(err);

        res.status(500).json({ error: err.message });

    }

});


/*
=====================================
Crear Solicitud
=====================================
*/

router.post("/", async (req, res) => {

    try {

        const {
            id_item,
            cantidad
        } = req.body;

        const existencia = await pool.query(`
            SELECT cantidad
            FROM bodega_insumos_herramientas
            WHERE id=$1
        `,[id_item]);

        let estado = "solicitado";

        if (
            existencia.rows.length > 0 &&
            existencia.rows[0].cantidad >= cantidad
        ) {
            estado = "existencia";
        }

        const result = await pool.query(`
            INSERT INTO solicitudes(
                id_item,
                cantidad,
                estado
            )
            VALUES($1,$2,$3)
            RETURNING *
        `,[
            id_item,
            cantidad,
            estado
        ]);

        res.json(result.rows[0]);

    } catch (err) {

        console.log(err);

        res.status(500).json({ error: err.message });

    }

});


/*
=====================================
Cambiar a Solicitado
=====================================
*/

router.put("/:id", async (req, res) => {

    try {

        await pool.query(`
            UPDATE solicitudes
            SET estado='solicitado'
            WHERE id=$1
        `,[req.params.id]);

        res.json({
            message:"Solicitud enviada"
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({ error: err.message });

    }

});

module.exports = router;