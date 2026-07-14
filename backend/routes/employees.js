const express = require("express");
const router = express.Router();

const pool = require("../db");

/*
GET

/api/employees?search=juan
*/

router.get("/", async (req, res) => {

    try {

        const search = req.query.search || "";

        const texto = `%${search}%`;

        const result = await pool.query(

            `
            SELECT

                e.id,
                e.nombre,
                e.foto_ruta,

                c.nombre AS cargo,

                d.nombre AS departamento,

                (
                    SELECT COUNT(*)
                    FROM reportes r
                    WHERE r.id_empleado = e.id
                ) AS reportes,

                h.hora_inicio,
                h.hora_fin,
                h.jornada

            FROM empleados e

            INNER JOIN cargos c
                ON e.id_cargo = c.id

            INNER JOIN departamentos d
                ON c.id_departamento = d.id

            LEFT JOIN horarios h
                ON h.id_empleado = e.id

            WHERE

                e.nombre ILIKE $1

                OR

                CAST(e.id AS TEXT) ILIKE $1

            ORDER BY e.nombre
            `,

            [texto]

        );

        res.json(result.rows);

    }

    catch (err) {

        console.log(err);

        res.status(500).json({

            error: err.message

        });

    }

});

module.exports = router;