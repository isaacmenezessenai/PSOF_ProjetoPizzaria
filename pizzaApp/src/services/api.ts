import axios from "axios";

const api = axios.create({
    baseURL: "http://192.168.15.16:3333",
})

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL;

console.log("TESTE DE URL LIDA:", API_BASE_URL);

export { api }