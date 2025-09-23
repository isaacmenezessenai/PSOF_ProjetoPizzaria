import axios from "axios";
const api = axios.create({
    baseURL: "http://172.25.62.21:3333",
});

export {api}