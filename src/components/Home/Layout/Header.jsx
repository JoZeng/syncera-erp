import { useState, useEffect } from "react";
import api from "../../../services/api"; // Certifique-se de que este caminho está correto

export default function Header({ title }) {
  const [currentUser, setCurrentUser] = useState(null); // Estado para armazenar o usuário logado
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await api.get("/usuario"); // Endpoint para obter o perfil do usuário
        const userData = response.data;
        setCurrentUser(userData);

        // Verifica se o nome está vazio ou nulo
        if (!userData.nome || userData.nome.trim() === "") {
          setShowNamePromptModal(true);
        }
      } catch (error) {
        console.error("Erro ao buscar perfil do usuário:", error);
        // Se houver um erro 401 ou outro erro que indique problema de autenticação,
        // o interceptor do Axios em `services/api.js` já deve lidar com o redirecionamento.
        // Mas se você quiser um fallback aqui, pode adicionar:
        // if (error.response && error.response.status === 401) {
        //   handleLogout(); // Força o logout e redirecionamento
        // }
      }
    };

    fetchUserProfile();
  }, []); // Executa apenas uma vez ao montar o componente
  return (
    <header className="flex items-center justify-between mb-8 pb-4 border-b border-gray-300">
      <h1 className="text-4xl font-extrabold text-gray-900">{title}</h1>
      <div className="flex items-center">
        <span className="text-gray-700 text-lg font-medium mr-4">
          Olá, {currentUser?.nome ? currentUser.nome.split(" ")[0] : "Usuário"}!{" "}
          {/* Exibe o primeiro nome ou "Usuário" */}
        </span>
        <img
          className="h-12 w-12 rounded-full border-2 border-blue-500 shadow-md"
          src="https://placehold.co/100x100/A0B3D6/FFFFFF?text=U"
          alt="Avatar do Usuário"
        />
      </div>
    </header>
  );
}
