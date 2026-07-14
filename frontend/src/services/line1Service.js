import API from "./api";

export const getActual = async () => {

    const response = await API.get("/linea1/actual");

    return response.data;

};

export const getIndicadores = async () => {

    const response = await API.get("/linea1/indicadores");

    return response.data;

};

export const getOrdenes = async () => {

    const response = await API.get("/linea1/ordenes");

    return response.data;

};

export const getHistorial = async () => {

    const response = await API.get("/linea1/historial");

    return response.data;

};
export const getHorarios = async () => {

    const response = await API.get("/linea1/horarios");

    return response.data;

};