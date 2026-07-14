const express = require("express");
const router = express.Router();

const pool = require("../db");


//==============================
// INDICADOR ACTUAL
//==============================

router.get("/actual", async (req, res) => {

    try {

        const result = await pool.query(

            `

            SELECT

                i.*,

                p.nombre,

                p.tamano

            FROM indicadores i

            INNER JOIN productos p

                ON i.id_producto = p.id

            WHERE p.id_linea = 2

            ORDER BY i.fecha DESC, i.hora DESC

            LIMIT 1

            `

        );

        res.json(result.rows[0]);

    }

    catch (err) {

        console.log(err);

        res.status(500).json(err);

    }

});


//==============================
// ULTIMOS 5 INDICADORES
//==============================

router.get("/indicadores", async (req, res) => {

    try {

        const result = await pool.query(

            `

            SELECT

                i.*

            FROM indicadores i

            INNER JOIN productos p

                ON i.id_producto = p.id

            WHERE p.id_linea = 2

            ORDER BY i.fecha DESC, i.hora DESC

            LIMIT 5

            `

        );

        res.json(result.rows.reverse());

    }

    catch (err) {

        console.log(err);

        res.status(500).json(err);

    }

});


//==============================
// ORDENES
//==============================

router.get("/ordenes", async (req, res) => {

    try {

        const producto = await pool.query(

            `

            SELECT

                i.id_producto

            FROM indicadores i

            INNER JOIN productos p

                ON i.id_producto = p.id

            WHERE p.id_linea = 2

            ORDER BY i.fecha DESC, i.hora DESC

            LIMIT 1

            `

        );

        if (producto.rows.length === 0) {

            return res.json([]);

        }

        const idProducto = producto.rows[0].id_producto;

        const result = await pool.query(

            `

            SELECT

                o.id,

                c.nombre_empresa,

                o.estado_orden,

                od.cantidad,

                p.nombre,

                p.tamano

            FROM ordenes o

            INNER JOIN clientes c

                ON o.id_cliente = c.id

            INNER JOIN orden_detalles od

                ON o.id = od.id_orden

            INNER JOIN productos p

                ON od.id_producto = p.id

            WHERE

                od.id_producto = $1

            AND

                (

                    o.estado_orden = 'Pendiente'

                    OR

                    o.estado_orden = 'Procesando'

                )

            `,

            [idProducto]

        );

        res.json(result.rows);

    }

    catch (err) {

        console.log(err);

        res.status(500).json(err);

    }

});


//==============================
// HISTORIAL
//==============================

router.get("/historial", async (req, res) => {

    try {

        const result = await pool.query(

            `

                SELECT *

                FROM historial

                WHERE id_linea = 2

                ORDER BY fecha DESC, hora DESC

            `

        );

        res.json(result.rows);

    }

    catch (err) {

        console.log(err);

        res.status(500).json(err);

    }

});
//==============================
// HORARIOS (GANTT)
//==============================

router.get("/horarios", async (req, res) => {

    try {

        const result = await pool.query(

            `

            SELECT

                e.id,

                e.nombre,

                c.nombre AS cargo,

                d.nombre AS departamento,

                h.hora_inicio,

                h.hora_fin,

                h.jornada

            FROM horarios h

            INNER JOIN empleados e

                ON h.id_empleado = e.id

            INNER JOIN cargos c

                ON e.id_cargo = c.id

            INNER JOIN departamentos d

                ON c.id_departamento = d.id

            WHERE h.id_linea = 2

            ORDER BY h.hora_inicio

            `

        );

        res.json(result.rows);

    }

    catch(err){

        console.log(err);

        res.status(500).json(err);

    }

});

module.exports = router;