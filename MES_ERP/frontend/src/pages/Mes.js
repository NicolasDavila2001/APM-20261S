import React, { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import KPICard from "../components/KPICard";
import ProductionChart from "../components/ProductionChart";
import LineCard from "../components/LineCard";
import RequestPanel from "../components/RequestPanel";
import { getDashboard } from "../services/dashboardService";

function Dashboard() {

    const [dashboard, setDashboard] = useState(null);

    useEffect(() => {
        cargarDashboard();
    const intervalo = setInterval(() => {

        cargarDashboard();

    }, 100);

    return () => clearInterval(intervalo);

    }, []);

    const cargarDashboard = async () => {
        try {
            const data = await getDashboard();
            setDashboard(data);
        } catch (err) {
            console.log(err);
        }
    };

    if (!dashboard) {
        return <h2>Cargando...</h2>;
    }

    return (
        <div className="dashboard">

            <Navbar
                modulo="MES"
                titulo="Manufacturing Execution System"
                usuario="Operador"
            />

            <div className="content">

                <div className="kpi-container">

                    <KPICard
                        titulo="OEE General"
                        valor={`${dashboard.indicadores.oee}%`}
                    />

                    <KPICard
                        titulo="Rendimiento"
                        valor={`${dashboard.indicadores.rendimiento}%`}
                    />

                    <KPICard
                        titulo="Solicitudes"
                        valor={dashboard.solicitudes.total}
                    />

                    <KPICard
                        titulo="Disponibilidad"
                        valor={`${dashboard.indicadores.disponibilidad}%`}
                    />

                </div>

                <div className="dashboard-middle">

                    <ProductionChart
                        productos={dashboard.productos}
                    />

                </div>

                <div className="lines-container">

                    {dashboard.lineas.map(linea => (

                        <LineCard
                            key={linea.id}
                            nombre={`🏭 ${linea.nombre}`}
                            estado={linea.estado}
                            oee={`${linea.oee_pct}%`}
                            produccion={`${linea.procesadas} u`}
                            ruta={`/line${linea.id}`}
                        />

                    ))}

                </div>

                <RequestPanel />

            </div>

        </div>
    );
}

export default Dashboard;