import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {
    getSales,
    searchClient,
    getOrder
} from "../services/salesService";
import {useNavigate} from "react-router-dom";

function Sales() {

    const [orders, setOrders] = useState([]);

    const [search, setSearch] = useState("");

    const [clients, setClients] = useState([]);

    const [orderId, setOrderId] = useState("");

    const [order, setOrder] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {

        loadOrders();
    const intervalo = setInterval(() => {

        loadOrders();

    }, 200);

    return () => clearInterval(intervalo);


    }, []);

    const loadOrders = async () => {

        try {

            const data = await getSales();

            setOrders(data);

        } catch (err) {

            console.log(err);

        }

    };

    const buscarCliente = async () => {

        try {

            const data = await searchClient(search);

            setClients(data);

        } catch (err) {

            console.log(err);

        }

    };

    const buscarOrden = async () => {

        try {

            const data = await getOrder(orderId);

            setOrder(data);

        } catch (err) {

            console.log(err);

        }

    };

    return (

        <>

            <Navbar
                modulo="ERP"
                titulo="Ventas"
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

                    Órdenes de Venta Pendientes

                </h1>

                <table className="sales-table">

                    <thead>

                        <tr>

                            <th>ID</th>

                            <th>Cliente</th>

                            <th>Producto</th>

                            <th>Tamaño</th>

                            <th>Cantidad</th>

                            <th>Estado</th>

                            <th>Fecha</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            orders.map(order => (

                                <tr key={`${order.id}-${order.producto}`}>

                                    <td>{order.id}</td>

                                    <td>{order.nombre_empresa}</td>

                                    <td>{order.producto}</td>

                                    <td>{order.tamano}</td>

                                    <td>{order.cantidad}</td>

                                    <td>{order.estado_orden}</td>

                                    <td>

                                        {new Date(order.fecha_orden).toLocaleDateString()}

                                    </td>

                                </tr>

                            ))

                        }

                    </tbody>

                </table>

                <br />

                <h2>

                    Buscar Cliente

                </h2>

                <div className="search-box">

                    <input

                        type="text"

                        placeholder="Nombre de empresa o NIT"

                        value={search}

                        onChange={(e) => setSearch(e.target.value)}

                    />

                    <button

                        onClick={buscarCliente}

                    >

                        Buscar

                    </button>

                </div>

                {

                    clients.length > 0 &&

                    <div className="inventory-card">

                        <h2>

                            Clientes encontrados

                        </h2>

                        <table className="sales-table">

                            <thead>

                                <tr>

                                    <th>Empresa</th>

                                    <th>NIT</th>

                                </tr>

                            </thead>

                            <tbody>

                                {

                                    clients.map(cliente => (

                                        <tr key={cliente.id}>

                                            <td>

                                                {cliente.nombre_empresa}

                                            </td>

                                            <td>

                                                {cliente.nit}

                                            </td>

                                        </tr>

                                    ))

                                }

                            </tbody>

                        </table>

                    </div>

                }

                <br />

                <h2>

                    Buscar Orden / Factura

                </h2>

                <div className="search-box">

                    <input

                        type="number"

                        placeholder="Ingrese el ID de la orden"

                        value={orderId}

                        onChange={(e) => setOrderId(e.target.value)}

                    />

                    <button

                        onClick={buscarOrden}

                    >

                        Buscar

                    </button>

                </div>

                {

                    order.length > 0 &&

                    <div className="inventory-card">

                        <h2>

                            Orden #{order[0].id}

                        </h2>

                        <p>

                            <strong>Cliente:</strong> {order[0].nombre_empresa}

                        </p>

                        <p>

                            <strong>NIT:</strong> {order[0].nit}

                        </p>

                        <p>

                            <strong>Estado:</strong> {order[0].estado_orden}

                        </p>

                        <p>

                            <strong>Fecha:</strong>{" "}

                            {new Date(order[0].fecha_orden).toLocaleDateString()}

                        </p>

                        <br />

                        <table className="sales-table">

                            <thead>

                                <tr>

                                    <th>Producto</th>
                                    
                                    <th>Tamaño</th>

                                    <th>Cantidad</th>

                                </tr>

                            </thead>

                            <tbody>

                                {

                                    order.map((producto, index) => (

                                        <tr key={index}>

                                            <td>

                                                {producto.producto}

                                            </td>

                                            <td>

                                                {producto.tamano}

                                            </td>

                                            <td>

                                                {producto.cantidad}

                                            </td>

                                        </tr>

                                    ))

                                }

                            </tbody>

                        </table>

                    </div>

                }

            </div>

        </>

    );

}

export default Sales;