import axios from 'axios';

// 🔧 CONFIGURAÇÃO DA API
export const api = axios.create({
  baseURL: 'http://localhost:3333'
, 
  
  // Headers padrão
  headers: {
    'Content-Type': 'application/json',
  },
  
  // Timeout (30 segundos)
  timeout: 30000,
});

export function setAuthToken(token: string) {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

// 🛠️ INTERCEPTOR PARA LOGS (opcional - ajuda a debugar)
api.interceptors.request.use(
  (config) => {
    console.log(`🚀 Fazendo requisição: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ Erro na requisição:', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log(`✅ Resposta recebida: ${response.status} - ${response.config.url}`);
    return response;
  },
  (error) => {
    if (error.response) {
      console.error('❌ Erro na resposta:', error.response.status, error.response.data);
    } else if (error.request) {
      console.error('❌ Erro na requisição (sem resposta):', error.message);
    } else {
      console.error('❌ Erro:', error.message);
    }
    return Promise.reject(error);
  }
);

// 📡 EXEMPLOS DE COMO USAR (para você testar)
/*
// Buscar categorias
const categories = await api.get('/category');

// Buscar produtos de uma categoria
const products = await api.get('/category/product', {
  params: { category_id: '123' }
});

// Criar um pedido
const newOrder = await api.post('/order', {
  table_number: 5
});
*/