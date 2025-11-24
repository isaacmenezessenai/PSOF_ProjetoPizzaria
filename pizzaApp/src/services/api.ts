import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // 

// 1. Criação da Instância Axios
const api = axios.create({
    baseURL: "http://192.168.1.103:3333",
})

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL;

console.log("TESTE DE URL LIDA:", API_BASE_URL);

export { api }