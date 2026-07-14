import React, { useEffect, useState } from "react";

import {
    getItems,
    getRequests,
    createRequest,
    requestPurchase
} from "../services/requestService";

function RequestPanel() {

    const [items, setItems] = useState([]);
    const [requests, setRequests] = useState([]);
    const [item, setItem] = useState("");
    const [quantity, setQuantity] = useState("");

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {

        try {

            const dataItems = await getItems();
            const dataRequests = await getRequests();

            setItems(dataItems);
            setRequests(dataRequests);

        } catch (err) {

            console.log(err);

        }

    };

    const create = async () => {

        if (item === "" || quantity === "") {

            alert("Complete todos los campos");
            return;

        }

        try {

            await createRequest({

                id_item: Number(item),
                cantidad: Number(quantity)

            });

            setItem("");
            setQuantity("");

            loadData();

        } catch (err) {

            console.log(err);

        }

    };

    const solicitar = async (id) => {

        try {

            await requestPurchase(id);
            loadData();

        } catch (err) {

            console.log(err);

        }

    };

    return (

        <div className="dashboard-card">

            <div className="section">

                <h2>Solicitudes de Materiales</h2>

                <div className="request-form">

                    <select
                        value={item}
                        onChange={(e) => setItem(e.target.value)}
                    >

                        <option value="">
                            Seleccione un insumo
                        </option>

                        {
                            items.map(i => (

                                <option
                                    key={i.id}
                                    value={i.id}
                                >
                                    {i.item_nombre}
                                </option>

                            ))
                        }

                    </select>

                    <input
                        type="number"
                        placeholder="Cantidad"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                    />

                    <button onClick={create}>
                        Crear Solicitud
                    </button>

                </div>

                <table className="data-table">

                    <thead>

                        <tr>

                            <th>ID</th>
                            <th>Insumo</th>
                            <th>Tipo</th>
                            <th>Cantidad</th>
                            <th>Existencia</th>
                            <th>Estado</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            requests.length > 0 ?

                                requests.map(r => (

                                    <tr key={r.id}>

                                        <td>{r.id}</td>
                                        <td>{r.item_nombre}</td>
                                        <td>{r.tipo}</td>
                                        <td>{r.cantidad}</td>
                                        <td>{r.existencia}</td>
                                        <td>{r.estado}</td>

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

    );

}

export default RequestPanel;