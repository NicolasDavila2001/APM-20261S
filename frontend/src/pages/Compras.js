import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import Navbar from "../components/Navbar";

import {

    getRequests,
    getAllRequests,
    getOrders,
    createOrder,
    approveRequest

} from "../services/purchaseService";

function Compras() {

    const [requests, setRequests] = useState([]);

    const [allRequests, setAllRequests] = useState([]);

    const [orders, setOrders] = useState([]);

    const [selected, setSelected] = useState("");

    const [producto, setProducto] = useState("");

    const [cantidadSolicitada, setCantidadSolicitada] = useState("");

    const [cantidadCompra, setCantidadCompra] = useState("");

    const [costo, setCosto] = useState("");

    const [factura, setFactura] = useState("");

    const navigate = useNavigate();

    useEffect(() => {

        loadData();
    const intervalo = setInterval(() => {

        loadData();

    }, 200);

    return () => clearInterval(intervalo);

    }, []);

    const loadData = async () => {

        try {

            const req = await getRequests();

            const all = await getAllRequests();

            const ord = await getOrders();

            setRequests(req);

            setAllRequests(all);

            setOrders(ord);

        }

        catch (err) {

            console.log(err);

        }

    };

    const seleccionar = (id) => {

        setSelected(id);

        const solicitud = requests.find(r => r.id === Number(id));

        if (solicitud) {

            setProducto(solicitud.item_nombre);

            setCantidadSolicitada(solicitud.cantidad);

        }

    };

    const registrar = async () => {

        if (

            selected === "" ||

            cantidadCompra === "" ||

            costo === "" ||

            factura === ""

        ) {

            alert("Complete todos los campos");

            return;

        }

        try {

            await createOrder({

                id_solicitud: selected,

                cantidad: Number(cantidadCompra),

                costo_total: Number(costo),

                numero_factura: factura

            });

            alert("Orden registrada correctamente.");

            setSelected("");

            setProducto("");

            setCantidadSolicitada("");

            setCantidadCompra("");

            setCosto("");

            setFactura("");

            loadData();

        }

        catch (err) {

            console.log(err);

        }

    };

const aprobar = async (id) => {

    try {

        await approveRequest(id);

        alert("Solicitud marcada como comprada.");

        setAllRequests(prev =>
            prev.map(request =>
                request.id === id
                    ? { ...request, estado: "comprado" }
                    : request
            )
        );

    }

    catch (err) {

        console.log(err);

    }

};

    return (

        <>

            <Navbar

                modulo="ERP"

                titulo="Aprovisionamiento"

                usuario="Administrador"

            />

            <div className="page">
                <button
                    className="back-button"
                    onClick={()=>navigate("/erp")}
                    >
                    ← Volver
                </button>

                <div className="section">

                    <h2>

                        Registrar Orden de Compra

                    </h2>

                    <div className="request-form">

                        <select

                            value={selected}

                            onChange={(e) => seleccionar(e.target.value)}

                        >

                            <option value="">

                                Seleccione una solicitud

                            </option>

                            {

                                requests.map(r => (

                                    <option

                                        key={r.id}

                                        value={r.id}

                                    >

                                        #{r.id} - {r.item_nombre}

                                    </option>

                                ))

                            }

                        </select>

                    </div>

                    <br />

                    <p>

                        <strong>Producto:</strong> {producto}

                    </p>

                    <p>

                        <strong>Cantidad Solicitada:</strong> {cantidadSolicitada}

                    </p>

                    <div className="request-form">

                        <input

                            type="number"

                            placeholder="Cantidad Comprada"

                            value={cantidadCompra}

                            onChange={(e) => setCantidadCompra(e.target.value)}

                        />

                        <input

                            type="number"

                            placeholder="Costo Total"

                            value={costo}

                            onChange={(e) => setCosto(e.target.value)}

                        />

                        <input

                            placeholder="Número de Factura"

                            value={factura}

                            onChange={(e) => setFactura(e.target.value)}

                        />

                        <button

                            onClick={registrar}

                        >

                            Registrar Compra

                        </button>

                    </div>

                </div>

                <div className="section">

                    <h2>

                        Órdenes de Compra

                    </h2>

                    <table className="data-table">

                        <thead>

                            <tr>

                                <th>Factura</th>

                                <th>Producto</th>

                                <th>Fecha</th>

                                <th>Cantidad</th>

                                <th>Valor</th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                orders.map(order => (

                                    <tr key={order.id}>

                                        <td>{order.numero_factura}</td>

                                        <td>{order.item_nombre}</td>

                                        <td>{order.fecha_solicitud}</td>

                                        <td>{order.cantidad}</td>

                                        <td>${order.costo_total}</td>

                                    </tr>

                                ))

                            }

                        </tbody>

                    </table>

                </div>
<div className="section">

    <h2> Solicitudes Pendientes</h2>

    <table className="data-table">

        <thead>

            <tr>

                <th>ID</th>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Fecha</th>
                <th>Estado</th>
                <th>Acción</th>

            </tr>

        </thead>

        <tbody>

        {

            allRequests.length > 0 ?

            allRequests.map(request => (

                <tr key={request.id}>

                    <td>{request.id}</td>

                    <td>{request.item_nombre}</td>

                    <td>{request.cantidad}</td>

                    <td>{request.fecha_solicitud}</td>

                    <td>

                        {

                            request.estado === "comprado"

                            ?

                            <span
                                style={{
                                    color:"#27ae60",
                                    fontWeight:"bold"
                                }}
                            >
                                Comprado
                            </span>

                            :

                            <span
                                style={{
                                    color:"#e67e22",
                                    fontWeight:"bold"
                                }}
                            >
                                Solicitado
                            </span>

                        }

                    </td>

                    <td>

                        {

                            request.estado === "solicitado"

                            ?

                            <button
                                className="approve-btn"
                                onClick={() => aprobar(request.id)}
                            >
                                Marcar Comprado
                            </button>

                            :

                            <span
                                style={{
                                    color:"#888",
                                    fontWeight:"bold"
                                }}
                            >
                                ✔
                            </span>

                        }

                    </td>

                </tr>

            ))

            :

            <tr>

                <td colSpan="6">

                    No existen solicitudes.

                </td>

            </tr>

        }

        </tbody>

    </table>

</div>
            </div>

        </>

    );

}

export default Compras;