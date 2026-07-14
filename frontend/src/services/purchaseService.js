import API from "./api";

/*
Solicitudes para el formulario
*/

export const getRequests = async () => {

    const response = await API.get("/purchase/requests");

    return response.data;

};

/*
Todas las solicitudes
*/

export const getAllRequests = async () => {

    const response = await API.get("/purchase/allrequests");

    return response.data;

};

/*
Órdenes de compra
*/

export const getOrders = async () => {

    const response = await API.get("/purchase/orders");

    return response.data;

};

/*
Registrar orden
*/

export const createOrder = async (order) => {

    const response = await API.post("/purchase", order);

    return response.data;

};

/*
Marcar como comprado
*/

export const approveRequest = async (id) => {

    const response = await API.put(`/purchase/approve/${id}`);

    return response.data;

};