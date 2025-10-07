import axios from "axios";

const api = axios.create({
<<<<<<< HEAD
    baseURL: "http://10.106.131.243:3333",
});
=======
    baseURL: "http://10.106.131.22:3333",
})
>>>>>>> 1d02d7d4f1ae51360b9f8aa8b7aaac2d17e6649f

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL;

console.log("TESTE DE URL LIDA:", API_BASE_URL);

export { api }