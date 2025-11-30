import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
    baseURL: "http://192.168.1.109:3333", 
});

api.interceptors.request.use(async (config) => {
    try {
        const token = await AsyncStorage.getItem('@ArtemisPizzaria:token');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    } catch (error) {
        console.log("Erro ao buscar token:", error);
    }

    return config;
});

export { api };