const express = require("express");
const router = express.Router();

const pool = require("../db");

/*=========================================
Solicitudes para el formulario
=========================================*/

router.get("/requests", async (req, res) => {

    try {

        const result = await pool.query(`

            SELECT

                s.id,
                s.id_item,
                b.item_nombre,
                b.tipo,
                s.cantidad,
                s.estado,
                s.fecha_solicitud

            FROM solicitudes s

            INNER JOIN bodega_insumos_herramientas b
                ON s.id_item = b.id

            WHERE s.estado='solicitado'

            ORDER BY s.fecha_solicitud DESC,
                     s.id DESC

        `);

        res.json(result.rows);

    }

    catch (err) {

        console.log(err);

        res.status(500).json({

            error: err.message

        });

    }

});


/*=========================================
Solicitudes pendientes (tabla)
=========================================*/

router.get("/allrequests", async (req, res) => {

    try {

        const result = await pool.query(`

            SELECT

                s.id,
                s.id_item,
                b.item_nombre,
                b.tipo,
                s.cantidad,
                s.estado,
                s.fecha_solicitud

            FROM solicitudes s

            INNER JOIN bodega_insumos_herramientas b
                ON s.id_item = b.id

            WHERE s.estado='solicitado'

            ORDER BY s.fecha_solicitud DESC,
                     s.id DESC

        `);

        res.json(result.rows);

    }

    catch (err) {

        console.log(err);

        res.status(500).json({

            error: err.message

        });

    }

});


/*=========================================
Órdenes de Compra
=========================================*/

router.get("/orders", async (req, res) => {

    try {

        const result = await pool.query(`

            SELECT

                oc.id,
                oc.numero_factura,
                oc.cantidad,
                oc.costo_total,
                oc.fecha_solicitud,
                b.item_nombre,
                b.tipo

            FROM orden_compra oc

            INNER JOIN solicitudes s
                ON oc.id_solicitud = s.id

            INNER JOIN bodega_insumos_herramientas b
                ON s.id_item = b.id

            ORDER BY oc.fecha_solicitud DESC,
                     oc.id DESC

        `);

        res.json(result.rows);

    }

    catch (err) {

        console.log(err);

        res.status(500).json({

            error: err.message

        });

    }

});


/*=========================================
Registrar Orden de Compra
=========================================*/

router.post("/", async (req, res) => {

    try {

        const {

            id_solicitud,
            cantidad,
            costo_total,
            numero_factura

        } = req.body;

        await pool.query(

            `

            INSERT INTO orden_compra(

                id_solicitud,
                cantidad,
                costo_total,
                numero_factura

            )

            VALUES($1,$2,$3,$4)

            `,

            [

                id_solicitud,
                cantidad,
                costo_total,
                numero_factura

            ]

        );

        res.json({

            message: "Orden registrada"

        });

    }

    catch (err) {

        console.log(err);

        res.status(500).json({

            error: err.message

        });

    }

});


/*=========================================
Marcar solicitud como comprada
Actualizar inventario
=========================================*/

router.put("/approve/:id", async (req, res) => {

    try {

        const id = req.params.id;

        const solicitud = await pool.query(

            `

            SELECT

                id_item,
                cantidad

            FROM solicitudes

            WHERE id=$1

            `,

            [id]

        );

        if (solicitud.rows.length === 0) {

            return res.status(404).json({

                error: "Solicitud no encontrada"

            });

        }

        await pool.query(

            `

            UPDATE solicitudes

            SET estado='comprado'

            WHERE id=$1

            `,

            [id]

        );

        await pool.query(

            `

            UPDATE bodega_insumos_herramientas

            SET cantidad = cantidad + $1

            WHERE id = $2

            `,

            [

                solicitud.rows[0].cantidad,
                solicitud.rows[0].id_item

            ]

        );

        res.json({

            message: "Solicitud marcada como comprada"

        });

    }

    catch (err) {

        console.log(err);

        res.status(500).json({

            error: err.message

        });

    }

});

module.exports = router;