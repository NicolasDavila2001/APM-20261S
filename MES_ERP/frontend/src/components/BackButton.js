import React from "react";
import { useNavigate } from "react-router-dom";

function BackButton() {

  const navigate=useNavigate();

    const logout=()=>{

        localStorage.removeItem("user");

        navigate("/");

    }

    return(

        <button

            className="logout-button"

            onClick={logout}

        >

            Cerrar Sesión

        </button>

    )

}

export default BackButton;