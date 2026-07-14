const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/", async (req, res) => {

    try {

        // ===========================
        // INDICADORES GENERALES
        // ===========================

        const indicadores = await pool.query(`
            SELECT
                ROUND(AVG(oee_pct),2) AS oee,
                ROUND(AVG(disponibilidad_pct),2) AS disponibilidad,
                ROUND(AVG(rendimiento_pct),2) AS rendimiento
            FROM (
                SELECT DISTINCT ON (p.id_linea)
                    i.*
                FROM indicadores i
                INNER JOIN productos p
                    ON i.id_producto = p.id
                ORDER BY p.id_linea, i.id DESC
            ) t
        `);

        // ===========================
        // SOLICITUDES PENDIENTES
        // ===========================

        const solicitudes = await pool.query(`

                SELECT COUNT(*)::int AS total
                FROM ordenes
                WHERE estado_orden <> 'Completada'

        `);

        // ===========================
        // PRODUCTOS TERMINADOS
        // (GRÁFICA DE BARRAS)
        // ===========================

        const productos = await pool.query(`
            SELECT
                p.id,
                p.nombre,
                p.tamano,
                b.cantidad
            FROM bodega_producto b
            INNER JOIN productos p
                ON p.id = b.id_producto
            ORDER BY p.id
        `);

        // ===========================
        // INFORMACIÓN DE LAS LÍNEAS
        // ===========================

        const lineas = await pool.query(`
            SELECT DISTINCT ON (l.id)
                l.id,
                l.nombre,
                l.estado,
                p.nombre AS producto,
                p.tamano,
                i.oee_pct,
                i.procesadas
            FROM lineas l
            INNER JOIN productos p
                ON p.id_linea = l.id
            INNER JOIN indicadores i
                ON i.id_producto = p.id
            ORDER BY l.id, i.id DESC
        `);

        res.json({

            indicadores: indicadores.rows[0] || {
                oee: 0,
                disponibilidad: 0,
                rendimiento: 0
            },

            solicitudes: solicitudes.rows[0] || {
                total: 0
            },

            productos: productos.rows,

            lineas: lineas.rows

        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            error: err.message
        });

    }

});

module.exports = router;