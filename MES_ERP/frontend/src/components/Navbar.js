import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar({ modulo, titulo, usuario }) {

    const navigate = useNavigate();

    // Cerrar sesión
    const logout = () => {

        // Si luego guardas más información puedes eliminarla aquí
        localStorage.removeItem("user");

        // Volver al login
        navigate("/");

    };

    // Volver al dashboard correspondiente
    const goHome = () => {

        if (modulo === "MES") {
            navigate("/mes");
        } else {
            navigate("/erp");
        }

    };

    return (

        <div className="navbar">

            <div
                className="navbar-left"
                onClick={goHome}
            >
                <h1>{modulo}</h1>
            </div>

            <div className="navbar-center">
                <h2>{titulo}</h2>
            </div>

            <div className="navbar-right">

                <span>👤 {usuario}</span>

                <button
                    className="logout-navbar"
                    onClick={logout}
                >
                    Cerrar sesión
                </button>

            </div>

        </div>

    );

}

export default Navbar;