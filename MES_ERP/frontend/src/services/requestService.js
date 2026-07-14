import API from "./api";

export const getItems = async () => {

    const response = await API.get("/solicitudes/items");

    return response.data;

};

export const getRequests = async () => {

    const response = await API.get("/solicitudes");

    return response.data;

};

export const createRequest = async (request) => {

    const response = await API.post("/solicitudes", request);

    return response.data;

};

export const requestPurchase = async (id) => {

    const response = await API.put(`/solicitudes/${id}`);

    return response.data;

};