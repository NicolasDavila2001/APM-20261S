import API from "./api";

export const getEmployees = async (search = "") => {

    const response = await API.get("/employees", {
        params: {
            search: search
        }
    });

    return response.data;

};