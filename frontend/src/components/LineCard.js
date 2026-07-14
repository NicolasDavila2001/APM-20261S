import React from "react";
import { useNavigate } from "react-router-dom";

function LineCard({ nombre, estado, oee, produccion, ruta }) {

    const navigate = useNavigate();

    return (

        <div className="line-card">

            <h2>{nombre}</h2>

            <p>

                <strong>Estado:</strong> {estado}

            </p>

            <p>

                <strong>OEE:</strong> {oee}

            </p>

            <p>

                <strong>Producción:</strong> {produccion}

            </p>

            <button
                className="line-button"
                onClick={() => navigate(ruta)}
            >
                Entrar
            </button>

        </div>

    );

}

export default LineCard;