import API from "./api";

export const getActual = async () => {

    const response = await API.get("/linea3/actual");

    return response.data;

};

export const getIndicadores = async () => {

    const response = await API.get("/linea3/indicadores");

    return response.data;

};

export const getOrdenes = async () => {

    const response = await API.get("/linea3/ordenes");

    return response.data;

};

export const getHistorial = async () => {

    const response = await API.get("/linea3/historial");

    return response.data;

};
export const getHorarios = async () => {

    const response = await API.get("/linea3/horarios");

    return response.data;

};