
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import logo from "../assets/logo_chibcho.png";

function Login() {

    // Variable donde se guarda el usuario
    const [username, setUsername] = useState("");

    // Variable donde se guarda la contraseña
    const [password, setPassword] = useState("");

    // Para cambiar de página
    const navigate = useNavigate();


    // Esta función se ejecuta cuando se presiona el botón
    const handleLogin = async () => {

        try {

            const response = await API.post("/login", {

                username,
                password

            });


            console.log(response.data);


            if (response.data.role === "mes") {

                navigate("/mes");

            }

            else if (response.data.role === "erp") {

                navigate("/erp");

            }

            else {

                navigate("/home");

            }

        }

        catch (error) {

            console.log(error);
            alert("Usuario o contraseña incorrectos");

        }

    };


    return (

        <div className="login-container">

            <div className="login-card">

                <img
                    src={logo}
                    className="login-logo"
                    alt="Logo"
                />


                <h1 className="login-title">

                    Plataforma Industrial

                </h1>


                <p className="login-subtitle">

                    MES-ERP

                </p>


                <input

                    className="login-input"

                    placeholder="Usuario"

                    value={username}

                    onChange={(e) => setUsername(e.target.value)}

                />


                <input

                    className="login-input"

                    placeholder="Contraseña"

                    type="password"

                    value={password}

                    onChange={(e) => setPassword(e.target.value)}

                />


                <button 
                    className="login-button"
                    onClick={handleLogin}
                >

                    Ingresar

                </button>


                <div className="login-footer">

                    © Chibcho Sistemas 2026

                </div>


            </div>

        </div>

    );

}


export default Login;