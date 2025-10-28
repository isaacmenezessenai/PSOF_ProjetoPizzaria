import axios from "axios";

const api = axios.create({
    baseURL: "http://10.106.131.50:3333",
})

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL;

console.log("TESTE DE URL LIDA:", API_BASE_URL);

export { api }