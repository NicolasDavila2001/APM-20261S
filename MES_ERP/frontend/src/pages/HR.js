import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getEmployees } from "../services/employeeService";
import {useNavigate} from "react-router-dom";
    
function HR() {

    const [employees, setEmployees] = useState([]);

    const [search, setSearch] = useState("");

    const navigate = useNavigate();

    useEffect(() => {

        loadEmployees();

    }, []);

    const loadEmployees = async () => {

        try {

            const data = await getEmployees(search);

            setEmployees(data);

        } catch (err) {

            console.log(err);

        }

    };

    const buscarEmpleado = async () => {

        try {

            const data = await getEmployees(search);

            setEmployees(data);

        } catch (err) {

            console.log(err);

        }

    };

    return (

        <>

            <Navbar
                modulo="ERP"
                titulo="Recursos Humanos"
                usuario="Administrador"
            />

            <div className="page">
                <button
                    className="back-button"
                    onClick={()=>navigate("/erp")}
                    >
                    ← Volver
                </button>
                <h1 className="dashboard-title">

                    Gestión de Empleados

                </h1>

                <div className="search-box">

                    <input

                        type="text"

                        placeholder="Buscar por nombre o ID"

                        value={search}

                        onChange={(e) => setSearch(e.target.value)}

                    />

                    <button

                        onClick={buscarEmpleado}

                    >

                        Buscar

                    </button>

                </div>

                <br />

                {

                    employees.length > 0 ?

                    employees.map(employee => (

                        <div

                            className="employee-card"

                            key={employee.id}

                        >

                            <img

                                src={`http://localhost:3000${employee.foto_ruta}`}

                                alt={employee.nombre}

                            />

                            <div>

                                <h2>

                                    {employee.nombre}

                                </h2>

                                <p>

                                    <strong>ID:</strong> {employee.id}

                                </p>

                                <p>

                                    <strong>Cargo:</strong> {employee.cargo}

                                </p>

                                <p>

                                    <strong>Departamento:</strong> {employee.departamento}

                                </p>

                                <p>

                                    <strong>Reportes:</strong> {employee.reportes}

                                </p>

                                <p>

                                    <strong>Horario:</strong> {employee.hora_inicio} - {employee.hora_fin}

                                </p>

                                <p>

                                    <strong>Jornada:</strong> {employee.jornada}

                                </p>

                            </div>

                        </div>

                    ))

                    :

                    <h2>No se encontraron empleados.</h2>

                }

            </div>

        </>

    );

}

export default HR;