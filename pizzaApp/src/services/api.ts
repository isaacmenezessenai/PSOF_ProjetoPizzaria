import axios from "axios";

const api = axios.create({
<<<<<<< HEAD
    baseURL: "http://10.106.131.72:3333",
=======
    baseURL: "http://10.106.131.27:3333",
>>>>>>> 7a9b6f44a2d9d018618f7ddfd9a79cdf160f09d5
})

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL;

console.log("TESTE DE URL LIDA:", API_BASE_URL);

export { api }