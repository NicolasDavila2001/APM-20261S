import axios from "axios";

const API = axios.create({
    baseURL: `http://${window.location.hostname}:3000/api`
});

export default API;