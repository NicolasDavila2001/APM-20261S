import React from "react";
import { useNavigate } from "react-router-dom";

function ModuleCard({ titulo, descripcion, ruta, disabled }) {

    const navigate = useNavigate();

    return (

        <div className="module-card">

            <h2>{titulo}</h2>

            <p>{descripcion}</p>

            {disabled ? (

                <button disabled>En desarrollo</button>

            ) : (

                <button onClick={() => navigate(ruta)}>

                    Entrar

                </button>

            )}

        </div>

    );

}

export default ModuleCard;