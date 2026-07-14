import React from "react";
import "./GanttChart.css";

function GanttChart({ horarios }) {

    const horas = [];

    for (let i = 6; i <= 22; i++) {
        horas.push(i);
    }

    const convertirHora = (hora) => {

        const [h, m] = hora.split(":");

        return Number(h) + Number(m) / 60;

    };

    return (

        <div className="gantt-container">

            <div className="gantt-header">

                <div className="gantt-empleado">
                    Empleado
                </div>

                <div className="gantt-horas">

                    {
                        horas.map((hora) => (

                            <div
                                key={hora}
                                className="gantt-hora"
                            >
                                {hora}:00
                            </div>

                        ))
                    }

                </div>

            </div>

            {

                horarios.map((empleado) => {

                    const inicio = convertirHora(empleado.hora_inicio);

                    const fin = convertirHora(empleado.hora_fin);

                    const left = ((inicio - 6) / 16) * 100;

                    const width = ((fin - inicio) / 16) * 100;

                    let color = "#d64535";

const jornada = empleado.jornada.toLowerCase();

if (jornada.includes("mañana")) {

    color = "#b33228";

}

else if (jornada.includes("tarde")) {

    color = "#d64535";

}

else if (jornada.includes("intermedio")) {

    color = "#e35d4d";

}

else if (jornada.includes("diurno")) {

    color = "#f06b5a";

}

else {

    color = "#9e2a22";

}

                    return (

                        <div
                            className="gantt-row"
                            key={empleado.id}
                        >

                            <div className="gantt-empleado">

                                <strong>{empleado.nombre}</strong>

                                <small>{empleado.cargo}</small>

                            </div>

                            <div className="gantt-linea">

                                {
                                    horas.map((hora) => (

                                        <div
                                            key={hora}
                                            className="gantt-grid"
                                        />

                                    ))
                                }

                                <div

                                    className="gantt-barra"
                                        title={`${empleado.nombre}
                                            ${empleado.hora_inicio} - ${empleado.hora_fin}`}

                                        style={{

                                            left: `${left}%`,

                                            width: `${width}%`,

                                            background: color

                                        }}

                                >

                                    {empleado.jornada}

                                </div>

                            </div>

                        </div>

                    );

                })

            }

        </div>

    );

}

export default GanttChart;