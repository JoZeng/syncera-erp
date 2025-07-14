// src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/", // Confirme que esta URL e porta estão corretas
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para adicionar o token JWT a cada requisição
api.interceptors.request.use(
  (config) => {
    // Tenta obter o token do localStorage
    const token = localStorage.getItem("token"); // Certifique-se que a chave 'token' é a mesma que você usa ao salvar

    // Se o token existir, adicione-o ao cabeçalho Authorization
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config; // Retorna a configuração da requisição modificada
  },
  (error) => {
    // Lida com erros na configuração da requisição
    return Promise.reject(error);
  }
);

// Opcional, mas altamente recomendado: Interceptor para lidar com respostas de erro 401 (Unauthorized)
// Isso ajuda a redirecionar o usuário para a tela de login se a sessão expirar ou for inválida
api.interceptors.response.use(
  (response) => response, // Se a resposta for bem-sucedida, apenas a retorna
  (error) => {
    // Se a resposta de erro tiver status 401 (Unauthorized)
    if (error.response && error.response.status === 401) {
      console.warn(
        "Sessão expirada ou não autorizada. Redirecionando para o login..."
      );
      localStorage.removeItem("token"); // Remove o token inválido do localStorage
      // Redireciona o usuário para a página inicial ou de login
      // Você pode usar 'window.location.href = "/";' ou 'window.location.replace("/");'
      // ou se estiver em um contexto React com useNavigate, fazer isso no componente que usa a API.
      // Para simplicidade aqui, usaremos window.location.href.
      window.location.href = "/"; // Redireciona para a raiz (assumindo que é sua tela de login)
    }
    return Promise.reject(error); // Rejeita a Promise com o erro original
  }
);

export default api;
