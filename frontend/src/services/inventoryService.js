import API from "./api";

export const getInventory = async () => {

    const response = await API.get("/inventory");

    return response.data;

};