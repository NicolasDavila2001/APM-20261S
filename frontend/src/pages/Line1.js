import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {useNavigate} from "react-router-dom";
import GanttChart from "../components/GanttChart";
import {
    getActual,
    getIndicadores,
    getOrdenes,
    getHistorial,
    getHorarios
} from "../services/line1Service";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

import "./Line.css";

function Line1() {

    const [actual, setActual] = useState({});

    const [indicadores, setIndicadores] = useState([]);

    const [ordenes, setOrdenes] = useState([]);

    const [historial, setHistorial] = useState([]);

    const [grafica, setGrafica] = useState("oee_pct");

    const [tituloGrafica, setTituloGrafica] = useState("OEE");

    const [horarios, setHorarios] = useState([]);

    const navigate=useNavigate();

    useEffect(() => {

        cargarTodo();

    const intervalo = setInterval(() => {

        cargarTodo();

    }, 200);

    return () => clearInterval(intervalo);

    }, []);



    const cargarTodo = async () => {

        try {

            const actualData = await getActual();

            const indicadoresData = await getIndicadores();

            const ordenesData = await getOrdenes();

            const historialData = await getHistorial();

            const horariosData = await getHorarios();

            setActual(actualData);

            setIndicadores(indicadoresData);

            setOrdenes(ordenesData);

            setHistorial(historialData);

            setHorarios(horariosData);

        }

        catch (err) {

            console.log(err);

        }

    };



    const cambiarGrafica = (campo, titulo) => {

        setGrafica(campo);

        setTituloGrafica(titulo);

    };



    return (

        <>

        <Navbar

            modulo="MES"

            titulo="Línea de Producción 1"

            usuario="Operador"

        />



        <div className="page">
            <button
            className="back-button"
            onClick={()=>navigate("/mes")}
            >

            ← Volver

            </button>

        <div className="cards-grid">



        <div

            className="indicator-card"

            onClick={() => cambiarGrafica("oee_pct","OEE")}

        >

            <h3>OEE</h3>

            <h1>{actual.oee_pct}%</h1>

        </div>



        <div

            className="indicator-card"

            onClick={() => cambiarGrafica("disponibilidad_pct","Disponibilidad")}

        >

            <h3>Disponibilidad</h3>

            <h1>{actual.disponibilidad_pct}%</h1>

        </div>



        <div

            className="indicator-card"

            onClick={() => cambiarGrafica("rendimiento_pct","Rendimiento")}

        >

            <h3>Rendimiento</h3>

            <h1>{actual.rendimiento_pct}%</h1>

        </div>



        <div

            className="indicator-card"

            onClick={() => cambiarGrafica("calidad_pct","Calidad")}

        >

            <h3>Calidad</h3>

            <h1>{actual.calidad_pct}%</h1>

        </div>



        <div

            className="indicator-card"

            onClick={() => cambiarGrafica("procesadas","Procesadas")}

        >

            <h3>Procesadas</h3>

            <h1>{actual.procesadas}</h1>

        </div>



        <div

            className="indicator-card"

            onClick={() => cambiarGrafica("rechazadas","Rechazadas")}

        >

            <h3>Rechazadas</h3>

            <h1>{actual.rechazadas}</h1>

        </div>



        </div>



        <div className="graph-card">

            <h2>

                Histórico de {tituloGrafica}

            </h2>



            <ResponsiveContainer

                width="100%"

                height={300}

            >

                <LineChart data={indicadores}>

                    {/* Líneas de la cuadrícula en un gris oscuro para que no brillen demasiado */}

                    <CartesianGrid strokeDasharray="3 3" stroke="#444"/>

                    

                    {/* Texto de los ejes en gris claro para que contraste con el fondo */}

                    <XAxis dataKey="hora" stroke="#bbbbbb" />

                    <YAxis stroke="#bbbbbb" />

                    

                    {/* Tooltip personalizado para encajar con el diseño oscuro y rojo */}

                    <Tooltip 

                        contentStyle={{ 

                            backgroundColor: '#2d2d2d', 

                            borderColor: '#e74c3c', 

                            color: '#f5f5f5',

                            borderRadius: '8px'

                        }} 

                    />

                    

                    {/* Aquí cambiamos el stroke del azul antiguo al rojo carmesí #e74c3c */}

                    <Line

                        type="monotone"

                        dataKey={grafica}

                        stroke="#e74c3c"

                        strokeWidth={3}

                        activeDot={{ r: 8, fill: '#e74c3c' }}

                    />

                </LineChart>

            </ResponsiveContainer>

        </div>



        <div className="section">

            <h2>

                Producción Actual

            </h2>

            <div className="production-grid">

                <div>

                    <strong>Producto</strong>

                    <p>{actual.nombre}</p>

                </div>

                <div>

                    <strong>Tamaño</strong>

                    <p>{actual.tamano}</p>

                </div>

                <div>

                    <strong>Procesadas</strong>

                    <p>{actual.procesadas}</p>

                </div>

                <div>

                    <strong>Rechazadas</strong>

                    <p>{actual.rechazadas}</p>

                </div>

                <div>

                    <strong>Tasa Rechazo</strong>

                    <p>{actual.tasa_rechazo_pct}%</p>

                </div>

            </div>

        </div>

        <div className="section">

            <h2>

                Órdenes de Producción

            </h2>

            <table className="data-table">

                <thead>

                    <tr>

                        <th>ID</th>

                        <th>Cliente</th>

                        <th>Producto</th>

                        <th>Tamaño</th>

                        <th>Cantidad</th>

                        <th>Estado</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        ordenes.length > 0 ?

                        ordenes.map((orden) => (

                            <tr key={orden.id}>

                                <td>{orden.id}</td>

                                <td>{orden.nombre_empresa}</td>

                                <td>{orden.nombre}</td>

                                <td>{orden.tamano}</td>

                                <td>{orden.cantidad}</td>

                                <td>{orden.estado_orden}</td>

                            </tr>

                        ))

                        :

                        <tr>

                            <td colSpan="6">

                                No existen órdenes para este producto.

                            </td>

                        </tr>

                    }

                </tbody>

            </table>

        </div>



        <div className="section">

            <h2>

                Historial de Eventos

            </h2>

            <table className="data-table">

                <thead>

                    <tr>

                        <th>Fecha</th>

                        <th>Hora</th>

                        <th>Cambio</th>

                        <th>Descripción</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        historial.length > 0 ?

                        historial.map((evento) => (

                            <tr key={evento.id_historial}>

                                <td>{evento.fecha}</td>

                                <td>{evento.hora}</td>

                                <td>{evento.cambio}</td>

                                <td>{evento.descripcion}</td>

                            </tr>

                        ))

                        :

                        <tr>

                            <td colSpan="4">

                                Sin registros.

                            </td>

                        </tr>

                    }

                </tbody>

            </table>

        </div>



        </div>
        <div className="section">

    <h2>

        Horarios del Personal

    </h2>

    <GanttChart

        horarios={horarios}

    />

</div>

        </>

    );

}

export default Line1;