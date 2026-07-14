const express = require("express");
const router = express.Router();

const pool = require("../db");

// Obtener todas las órdenes
router.get("/", async (req, res) => {

    try {

        const orders = await pool.query(`

                SELECT

                o.id ,

                c.nombre_empresa,

                p.nombre AS producto,

                p.tamano,

                od.cantidad,

                o.estado_orden,

                o.fecha_orden

                FROM ordenes o

                INNER JOIN clientes c
                ON o.id_cliente=c.id

                INNER JOIN orden_detalles od
                ON o.id=od.id_orden

                INNER JOIN productos p
                ON od.id_producto=p.id

                WHERE o.estado_orden='Pendiente' or o.estado_orden='Procesando'

                ORDER BY o.fecha_orden DESC;

        `);

        res.json(orders.rows);

    } catch (err) {

        console.error(err);

        res.status(500).json({
            error: err.message
        });

    }

});

// Buscar cliente
router.get("/cliente/:texto", async (req, res) => {

    try {

        const texto = `%${req.params.texto}%`;

        const cliente = await pool.query(

            `
                SELECT *

                FROM clientes

                WHERE

                nombre_empresa ILIKE $1

                OR

                nit ILIKE $1

                ORDER BY nombre_empresa
            `,

            [texto]

        );

        res.json(cliente.rows);

    }

    catch(err){

        console.error(err);

        res.status(500).json({

            error:err.message

        });

    }

});
// Buscar una orden por ID

router.get("/order/:id", async (req, res) => {

    try {

        const id = req.params.id;

        const result = await pool.query(

            `
            SELECT

                o.id,
                o.fecha_orden,
                o.estado_orden,

                c.nombre_empresa,
                c.nit,

                p.nombre AS producto,
                p.tamano,
                od.cantidad

            FROM ordenes o

            INNER JOIN clientes c
                ON o.id_cliente=c.id

            INNER JOIN orden_detalles od
                ON o.id=od.id_orden

            INNER JOIN productos p
                ON od.id_producto=p.id

            WHERE o.id=$1
            `,

            [id]

        );

        res.json(result.rows);

    }

    catch(err){

        console.log(err);

        res.status(500).json({

            error:err.message

        });

    }

});
module.exports = router;