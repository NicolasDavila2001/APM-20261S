import API from "./api";

export const getSales = async () => {

    const response = await API.get("/sales");

    return response.data;

};

export const searchClient = async (text) => {

    const response = await API.get(`/sales/cliente/${text}`);

    return response.data;

};

export const getOrder = async (id) => {

    const response = await API.get(`/sales/order/${id}`);

    return response.data;

};