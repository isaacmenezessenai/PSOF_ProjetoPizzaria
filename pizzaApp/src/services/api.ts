import axios from "axios";

const api = axios.create({
    baseURL: "http://10.106.131.22:3333",
})

export {api}