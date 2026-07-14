import React from "react";

function KPICard({ titulo, valor }) {

    return (

        <div className="kpi-card">

            <h3>{titulo}</h3>

            <h1>{valor}</h1>

        </div>

    );

}

export default KPICard;