import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getInventory } from "../services/inventoryService";
import {useNavigate} from "react-router-dom";

function Inventory() {

    const [inventory, setInventory] = useState({

        productos: [],
        insumos: [],
        herramientas: []

    });

    const navigate = useNavigate();

    useEffect(() => {

        loadInventory();

    const intervalo = setInterval(() => {

        loadInventory();

    }, 200);

    return () => clearInterval(intervalo);

    }, []);

    const loadInventory = async () => {

        try{

            const data = await getInventory();

            setInventory(data);

        }
        catch(err){

            console.log(err);

        }

    };

    return(

        <>

        <Navbar

            modulo="ERP"

            titulo="Inventario"

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

                Inventario General

            </h1>

            <div className="inventory-container">

                <div className="inventory-card">

                    <h2>📦 Productos Terminados</h2>

                    <table>

                        <thead>

                            <tr>

                                <th>Producto</th>
                                <th>Tamaño</th>
                                <th>Cantidad</th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                inventory.productos.map(producto=>(

                                    <tr key={producto.id}>

                                        <td>{producto.nombre}</td>
                                        <td>{producto.tamano}</td>
                                        <td>{producto.cantidad}</td>

                                    </tr>

                                ))

                            }

                        </tbody>

                    </table>

                </div>

                <div className="inventory-card">

                    <h2>🧪 Insumos</h2>

                    <table>

                        <thead>

                            <tr>

                                <th>Insumo</th>

                                <th>Cantidad</th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                inventory.insumos.map(insumo=>(

                                    <tr key={insumo.item_nombre}>

                                        <td>{insumo.item_nombre}</td>

                                        <td>{insumo.cantidad}</td>

                                    </tr>

                                ))

                            }

                        </tbody>

                    </table>

                </div>

                <div className="inventory-card">

                    <h2>🔧 Herramientas</h2>

                    <table>

                        <thead>

                            <tr>

                                <th>Herramienta</th>

                                <th>Cantidad</th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                inventory.herramientas.map(h=>(

                                    <tr key={h.item_nombre}>

                                        <td>{h.item_nombre}</td>

                                        <td>{h.cantidad}</td>

                                    </tr>

                                ))

                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

        </>

    )

}

export default Inventory;