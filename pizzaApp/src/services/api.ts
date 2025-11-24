import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // 

// 1. Criação da Instância Axios
const api = axios.create({
    baseURL: 'http://192.168.15.16:3333', 
    timeout: 10000, 
});


api.interceptors.request.use(async (config) => {
    try {
        // 2. Busca o token no armazenamento local
        const token = await AsyncStorage.getItem('@ArtemisPizzaria:token');

        // 3. Se o token existir, adiciona ele ao cabeçalho da requisição
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    } catch (error) {
        console.error("Erro ao carregar token do AsyncStorage no Interceptor:", error);
    }

    // 4. Continua o fluxo da requisição
    return config;
}, (error) => {
    return Promise.reject(error);
});

// 5. Exporta a instância configurada
export { api };