// src/pages/Clients/Clients.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Aside from "../../Home/Layout/Aside"; // Ajuste o caminho se necessário
import Header from "../../Home/Layout/Header"; // Ajuste o caminho se necessário
import api from "../../../services/api"; // Certifique-se de que este caminho está correto
import AddClientModal from "../../Modals/AddClientModal"; // Importe o novo modal

export default function Clients() {
  const [currentUser, setCurrentUser] = useState(null); // Para o Header
  const navigate = useNavigate();

  // Estados para o modal
  const [showAddClientModal, setShowAddClientModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Função para buscar o perfil do usuário (necessária para o Header)
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await api.get("/usuario");
        setCurrentUser(response.data);
      } catch (error) {
        console.error("Erro ao buscar perfil do usuário:", error);
        if (error.response && error.response.status === 401) {
          handleLogout();
        }
      }
    };

    fetchUserProfile();
  }, []);

  // Função para lidar com o logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // Dados de clientes de exemplo (IDs únicos)
  const [clients, setClients] = useState([
    // Mude para setClients para poder adicionar novos
    {
      id: 1,
      name: "João Silva",
      email: "joao.silva@example.com",
      phone: "(11) 98765-4321",
      status: "Ativo",
      lastPurchase: "10/07/2025",
    },
    {
      id: 2,
      name: "Maria Souza",
      email: "maria.souza.longo.nome.para.testar.overflow@example.com",
      phone: "(21) 91234-5678",
      status: "Inativo",
      lastPurchase: "05/06/2025",
    },
    {
      id: 3,
      name: "Pedro Costa",
      email: "pedro.costa@example.com",
      phone: "(31) 99876-1234",
      status: "Ativo",
      lastPurchase: "12/07/2025",
    },
    {
      id: 4,
      name: "Ana Oliveira",
      email: "ana.oliveira@example.com",
      phone: "(41) 97654-3210",
      status: "Ativo",
      lastPurchase: "01/07/2025",
    },
    {
      id: 5,
      name: "Carlos Pereira",
      email: "carlos.p@example.com",
      phone: "(51) 98765-1111",
      status: "Ativo",
      lastPurchase: "08/07/2025",
    },
    {
      id: 6,
      name: "Beatriz Santos",
      email: "beatriz.s@example.com",
      phone: "(61) 91234-2222",
      status: "Ativo",
      lastPurchase: "02/07/2025",
    },
    {
      id: 7,
      name: "Felipe Almeida",
      email: "felipe.a@example.com",
      phone: "(71) 99876-3333",
      status: "Inativo",
      lastPurchase: "20/06/2025",
    },
    {
      id: 8,
      name: "Larissa Gomes",
      email: "larissa.g@example.com",
      phone: "(81) 97654-4444",
      status: "Ativo",
      lastPurchase: "07/07/2025",
    },
    {
      id: 9,
      name: "Ricardo Martins",
      email: "ricardo.m@example.com",
      phone: "(91) 98765-5555",
      status: "Ativo",
      lastPurchase: "11/07/2025",
    },
    {
      id: 10,
      name: "Mariana Fernandes",
      email: "mariana.f@example.com",
      phone: "(11) 91111-2222",
      status: "Inativo",
      lastPurchase: "03/07/2025",
    },
    {
      id: 11,
      name: "Gustavo Rocha",
      email: "gustavo.r@example.com",
      phone: "(21) 93333-4444",
      status: "Ativo",
      lastPurchase: "09/07/2025",
    },
    {
      id: 12,
      name: "Camila Dias",
      email: "camila.d@example.com",
      phone: "(31) 95555-6666",
      status: "Ativo",
      lastPurchase: "04/07/2025",
    },
    {
      id: 13,
      name: "Lucas Ferreira",
      email: "lucas.f@example.com",
      phone: "(19) 97777-8888",
      status: "Ativo",
      lastPurchase: "05/07/2025",
    },
    {
      id: 14,
      name: "Sofia Pires",
      email: "sofia.p@example.com",
      phone: "(43) 98888-7777",
      status: "Inativo",
      lastPurchase: "15/06/2025",
    },
    {
      id: 15,
      name: "Bruno Costa",
      email: "bruno.c@example.com",
      phone: "(48) 96666-5555",
      status: "Ativo",
      lastPurchase: "06/07/2025",
    },
    {
      id: 16,
      name: "Laura Ramos",
      email: "laura.r@example.com",
      phone: "(85) 94444-3333",
      status: "Ativo",
      lastPurchase: "07/07/2025",
    },
    {
      id: 17,
      name: "Daniel Soares",
      email: "daniel.s@example.com",
      phone: "(71) 92222-1111",
      status: "Inativo",
      lastPurchase: "25/06/2025",
    },
  ]);

  // Estados para paginação
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8); // Mantido em 10, como no seu código

  // Lógica da Paginação
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentClients = clients.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(clients.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Função para abrir o modal de adicionar cliente
  const handleAddClientClick = () => {
    setShowAddClientModal(true);
  };

  const handleCloseModal = () => {
    setShowAddClientModal(false);
  };

  // Função para salvar o novo cliente (simulando uma API)
  const handleSaveClient = async (newClientData) => {
    setIsSaving(true);
    try {
      // Simulação de requisição API
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simula delay da rede

      // Gerar um ID temporário para o novo cliente (em um app real, o ID viria do backend)
      const newId =
        clients.length > 0 ? Math.max(...clients.map((c) => c.id)) + 1 : 1;
      const clientWithId = {
        ...newClientData,
        id: newId,
        status: "Ativo", // Status padrão para novo cliente
        lastPurchase: "N/A", // Ou a data atual, se aplicável
      };

      setClients((prevClients) => [...prevClients, clientWithId]);
      alert("Cliente adicionado com sucesso!");
      handleCloseModal(); // Fechar o modal após salvar
    } catch (error) {
      console.error("Erro ao salvar o cliente:", error);
      alert("Erro ao salvar o cliente. Por favor, tente novamente.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Aside handleLogout={handleLogout} />
      <main className="flex-1 p-6 sm:p-8 lg:p-10">
        <Header currentUser={currentUser} title={"Clientes"} />

        <section className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800">
              Lista de Clientes
            </h3>
            <button
              onClick={handleAddClientClick}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-200 ease-in-out flex items-center"
            >
              <i className="fas fa-plus mr-2"></i> Adicionar Cliente
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 table-fixed">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-lg w-1/5" /* Ex: ~20% */
                  >
                    Nome
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4" /* Ex: 25% */
                  >
                    E-mail
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6" /* Ex: ~16.6% */
                  >
                    Telefone
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6" /* Ex: ~16.6% */
                  >
                    Última Compra
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[10%]" /* Ex: 10% */
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tr-lg w-[12%]" /* Ex: 12% para Ações */
                  >
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentClients.map((client) => (
                  <tr key={client.id}>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 max-w-xs truncate">
                      {client.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                      {client.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 max-w-xs truncate">
                      {client.phone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 max-w-xs truncate">
                      {client.lastPurchase}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 max-w-xs truncate">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          client.status === "Ativo"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {client.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium flex items-center space-x-2">
                      {" "}
                      {/* Usando flex e space-x para espaçamento */}
                      {/* Botão de Editar */}
                      <button
                        onClick={() => alert(`Editar cliente: ${client.name}`)}
                        className="flex items-center px-3 py-1 border border-blue-500 rounded-md text-blue-600 hover:bg-blue-50 transition duration-200 ease-in-out"
                      >
                        Editar
                      </button>
                      {/* Botão de Excluir */}
                      <button
                        onClick={() => alert(`Excluir cliente: ${client.name}`)}
                        className="flex items-center px-3 py-1 border border-red-500 rounded-md text-red-600 hover:bg-red-50 transition duration-200 ease-in-out"
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Controles de Paginação */}
          <div className="flex justify-center mt-6">
            <nav
              className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
              aria-label="Pagination"
            >
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span className="sr-only">Previous</span>
                <i className="fas fa-chevron-left"></i>
              </button>

              {[...Array(totalPages).keys()].map((number) => (
                <button
                  key={number + 1}
                  onClick={() => paginate(number + 1)}
                  className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium ${
                    currentPage === number + 1
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {number + 1}
                </button>
              ))}

              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span className="sr-only">Next</span>
                <i className="fas fa-chevron-right"></i>
              </button>
            </nav>
          </div>
        </section>
      </main>

      {/* O Novo Modal de Adicionar Cliente */}
      <AddClientModal
        isOpen={showAddClientModal}
        onClose={handleCloseModal}
        onSaveClient={handleSaveClient}
        isLoading={isSaving}
      />
    </div>
  );
}
