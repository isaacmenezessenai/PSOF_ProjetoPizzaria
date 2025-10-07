import axios from "axios";

const api = axios.create({
    baseURL: "http:// 10.216.170.76:3333",
})

export {api}