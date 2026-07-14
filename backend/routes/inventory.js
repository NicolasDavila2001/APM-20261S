const express = require("express");
const router = express.Router();

const pool = require("../db");

// Obtener inventario completo
router.get("/", async (req, res) => {

    try {

        // Productos terminados
        const productos = await pool.query(`
            SELECT
                p.id,
                p.nombre,
                p.tamano,
                bp.cantidad
            FROM bodega_producto bp
            INNER JOIN productos p
                ON bp.id_producto = p.id
            ORDER BY p.nombre
        `);

        // Insumos
        const insumos = await pool.query(`
            SELECT
                item_nombre,
                cantidad
            FROM bodega_insumos_herramientas
            WHERE tipo='Insumo'
            ORDER BY item_nombre
        `);

        // Herramientas
        const herramientas = await pool.query(`
            SELECT
                item_nombre,
                cantidad
            FROM bodega_insumos_herramientas
            WHERE tipo='Herramienta'
            ORDER BY item_nombre
        `);

        res.json({

            productos: productos.rows,

            insumos: insumos.rows,

            herramientas: herramientas.rows

        });

    } catch (err) {

        console.error(err);

        res.status(500).json({

            error: err.message

        });

    }

});

module.exports = router;