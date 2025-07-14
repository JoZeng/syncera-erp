// src/layout/Aside.jsx
import { useNavigate, useLocation } from "react-router-dom";
import React from "react";

export default function Aside() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    // Opcional: Se você salva outros dados do usuário, remova-os também
    // localStorage.removeItem("user");
    navigate("/");
  };

  // Função auxiliar para determinar se o link está ativo
  const isActive = (path) => {
    return location.pathname === path;
  };

  // Classes padrão para links inativos
  const inactiveLinkClasses =
    "text-gray-300 hover:bg-gray-700 hover:text-white";
  // Classes para links ativos
  const activeLinkClasses = "bg-blue-600 text-white shadow-md";

  return (
    <aside className="w-64 bg-gray-800 text-white flex flex-col p-4 shadow-lg rounded-r-xl">
      <div className="text-2xl font-bold text-center mb-10 mt-2">
        SyncEra ERP
      </div>
      <nav className="flex-1">
        <ul>
          <li className="mb-3">
            <a
              href="/dashboard" // Rota para o Dashboard
              className={`flex items-center p-3 rounded-lg font-medium transition duration-200 ease-in-out ${
                isActive("/dashboard") ? activeLinkClasses : inactiveLinkClasses
              }`}
            >
              <i className="fas fa-home mr-3 text-xl"></i>
              Dashboard
            </a>
          </li>
          <li className="mb-3">
            <a
              href="/clientes" // Rota para Clientes
              className={`flex items-center p-3 rounded-lg font-medium transition duration-200 ease-in-out ${
                isActive("/clientes") ? activeLinkClasses : inactiveLinkClasses
              }`}
            >
              <i className="fas fa-users mr-3 text-xl"></i>
              Clientes
            </a>
          </li>
          <li className="mb-3">
            <a
              href="/produtos" // Rota para Produtos
              className={`flex items-center p-3 rounded-lg font-medium transition duration-200 ease-in-out ${
                isActive("/produtos") ? activeLinkClasses : inactiveLinkClasses
              }`}
            >
              <i className="fas fa-box-open mr-3 text-xl"></i>
              Produtos
            </a>
          </li>
          <li className="mb-3">
            <a
              href="/vendas" // Rota para Vendas
              className={`flex items-center p-3 rounded-lg font-medium transition duration-200 ease-in-out ${
                isActive("/vendas") ? activeLinkClasses : inactiveLinkClasses
              }`}
            >
              <i className="fas fa-shopping-cart mr-3 text-xl"></i>
              Vendas
            </a>
          </li>
          <li className="mb-3">
            <a
              href="/financeiro" // Rota para Financeiro
              className={`flex items-center p-3 rounded-lg font-medium transition duration-200 ease-in-out ${
                isActive("/financeiro")
                  ? activeLinkClasses
                  : inactiveLinkClasses
              }`}
            >
              <i className="fas fa-file-invoice-dollar mr-3 text-xl"></i>
              Financeiro
            </a>
          </li>
          <li className="mb-3">
            <a
              href="/fornecedores" // Rota para fornecedores
              className={`flex items-center p-3 rounded-lg font-medium transition duration-200 ease-in-out ${
                isActive("/fornecedores")
                  ? activeLinkClasses
                  : inactiveLinkClasses
              }`}
            >
              <i className="fas fa-warehouse mr-3 text-xl"></i>
              Fornecedores
            </a>
          </li>
        </ul>
      </nav>
      {/* Botão de Sair na parte inferior da barra lateral */}
      <div className="mt-auto">
        <button
          onClick={handleLogout}
          className="flex items-center p-3 rounded-lg text-red-300 hover:bg-gray-700 hover:text-red-400 transition duration-200 ease-in-out font-medium w-full text-left"
        >
          <i className="fas fa-sign-out-alt mr-3 text-xl"></i>
          Sair
        </button>
      </div>
    </aside>
  );
}
