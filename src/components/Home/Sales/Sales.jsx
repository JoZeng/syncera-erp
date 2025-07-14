// src/pages/Sales/Sales.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Aside from "../../Home/Layout/Aside"; // Ajuste o caminho se necessário
import Header from "../../Home/Layout/Header"; // Ajuste o caminho se necessário
import api from "../../../services/api"; // Certifique-se de que este caminho está correto
import AddSaleModal from "../../Modals/AddSaleModal"; // Importe o NOVO modal de vendas

export default function Sales() {
  const [currentUser, setCurrentUser] = useState(null); // Para o Header
  const navigate = useNavigate();

  // Estados para o modal de vendas
  const [showAddSaleModal, setShowAddSaleModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Dados de clientes e produtos para o modal de venda (simulados)
  const [clientsForModal, setClientsForModal] = useState([]);
  const [productsForModal, setProductsForModal] = useState([]);

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

    // Função para simular a busca de clientes e produtos (para o modal)
    const fetchAuxiliaryData = async () => {
      // Simule a busca de clientes e produtos, idealmente de uma API real
      const dummyClients = [
        { id: 1, name: "João Silva" },
        { id: 2, name: "Maria Souza" },
        { id: 3, name: "Pedro Costa" },
        { id: 4, name: "Ana Oliveira" },
        { id: 5, name: "Carlos Pereira" },
      ];
      const dummyProducts = [
        { id: 101, name: "Smartphone X", price: 1200.0, stock: 150 },
        { id: 102, name: "Notebook Gamer Pro", price: 5500.0, stock: 50 },
        { id: 103, name: "Fone de Ouvido Bluetooth", price: 250.0, stock: 300 },
        { id: 104, name: "Teclado Mecânico RGB", price: 400.0, stock: 80 },
        { id: 105, name: "Mouse Sem Fio Ergonômico", price: 120.0, stock: 200 },
        { id: 106, name: "Webcam Full HD", price: 180.0, stock: 120 },
      ];
      setClientsForModal(dummyClients);
      setProductsForModal(dummyProducts);
    };

    fetchUserProfile();
    fetchAuxiliaryData();
  }, []);

  // Função para lidar com o logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // Dados de vendas de exemplo
  const [sales, setSales] = useState([
    {
      id: 1,
      clientName: "João Silva",
      date: "01/07/2025",
      total: 1200.0,
      status: "Concluída",
      items: [
        {
          productId: 101,
          productName: "Smartphone X",
          quantity: 1,
          price: 1200.0,
        },
      ],
    },
    {
      id: 2,
      clientName: "Maria Souza",
      date: "02/07/2025",
      total: 700.0,
      status: "Pendente",
      items: [
        {
          productId: 103,
          productName: "Fone de Ouvido Bluetooth",
          quantity: 2,
          price: 250.0,
        },
        {
          productId: 105,
          productName: "Mouse Sem Fio Ergonômico",
          quantity: 1,
          price: 120.0,
        },
        {
          productId: 106,
          productName: "Webcam Full HD",
          quantity: 1,
          price: 180.0,
        },
      ],
    },
    {
      id: 3,
      clientName: "Pedro Costa",
      date: "05/07/2025",
      total: 5500.0,
      status: "Concluída",
      items: [
        {
          productId: 102,
          productName: "Notebook Gamer Pro",
          quantity: 1,
          price: 5500.0,
        },
      ],
    },
    {
      id: 4,
      clientName: "Ana Oliveira",
      date: "08/07/2025",
      total: 800.0,
      status: "Cancelada",
      items: [
        {
          productId: 104,
          productName: "Teclado Mecânico RGB",
          quantity: 2,
          price: 400.0,
        },
      ],
    },
    {
      id: 5,
      clientName: "Carlos Pereira",
      date: "10/07/2025",
      total: 360.0,
      status: "Concluída",
      items: [
        {
          productId: 106,
          productName: "Webcam Full HD",
          quantity: 2,
          price: 180.0,
        },
      ],
    },
  ]);

  // Estados para paginação
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  // Lógica da Paginação
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSales = sales.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(sales.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Função para abrir o modal de adicionar venda
  const handleAddSaleClick = () => {
    setShowAddSaleModal(true);
  };

  const handleCloseModal = () => {
    setShowAddSaleModal(false);
  };

  // Função para salvar a nova venda (simulando uma API)
  const handleSaveSale = async (newSaleData) => {
    setIsSaving(true);
    try {
      // Simulação de requisição API
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simula delay da rede

      // Calcular o total da venda
      const totalSale = newSaleData.items.reduce(
        (sum, item) => sum + item.quantity * item.price,
        0
      );

      // Gerar um ID temporário para a nova venda
      const newId =
        sales.length > 0 ? Math.max(...sales.map((s) => s.id)) + 1 : 1;
      const saleWithId = {
        ...newSaleData,
        id: newId,
        date: new Date().toLocaleDateString("pt-BR"), // Data atual
        total: totalSale,
        status: "Concluída", // Status padrão para nova venda
      };

      setSales((prevSales) => [...prevSales, saleWithId]);
      alert("Venda adicionada com sucesso!");
      handleCloseModal(); // Fechar o modal após salvar
    } catch (error) {
      console.error("Erro ao salvar a venda:", error);
      alert("Erro ao salvar a venda. Por favor, tente novamente.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Aside handleLogout={handleLogout} />
      <main className="flex-1 p-6 sm:p-8 lg:p-10">
        <Header currentUser={currentUser} title={"Vendas"} />{" "}
        {/* Título "Vendas" */}
        <section className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800">
              Lista de Vendas
            </h3>
            <button
              onClick={handleAddSaleClick}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-200 ease-in-out flex items-center"
            >
              <i className="fas fa-plus mr-2"></i> Registrar Venda
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 table-fixed">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-lg w-[15%]"
                  >
                    ID da Venda
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[20%]"
                  >
                    Cliente
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[15%]"
                  >
                    Data
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[15%]"
                  >
                    Total
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[15%]"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tr-lg w-[20%]"
                  >
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentSales.map((sale) => (
                  <tr key={sale.id}>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 max-w-xs truncate">
                      #{sale.id}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                      {sale.clientName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 max-w-xs truncate">
                      {sale.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 max-w-xs truncate">
                      R$ {sale.total.toFixed(2).replace(".", ",")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 max-w-xs truncate">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          sale.status === "Concluída"
                            ? "bg-green-100 text-green-800"
                            : sale.status === "Pendente"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {sale.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium flex items-center space-x-2">
                      <button
                        onClick={() => alert(`Visualizar venda: #${sale.id}`)}
                        className="flex items-center px-3 py-1 border border-indigo-500 rounded-md text-indigo-600 hover:bg-indigo-50 transition duration-200 ease-in-out"
                      >
                        <i className="fas fa-eye mr-1"></i>
                        Ver Detalhes
                      </button>
                      <button
                        onClick={() => alert(`Excluir venda: #${sale.id}`)}
                        className="flex items-center px-3 py-1 border border-red-500 rounded-md text-red-600 hover:bg-red-50 transition duration-200 ease-in-out"
                      >
                        <i className="fas fa-trash-alt mr-1"></i>
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

      {/* O Novo Modal de Adicionar Venda */}
      <AddSaleModal
        isOpen={showAddSaleModal}
        onClose={handleCloseModal}
        onSaveSale={handleSaveSale}
        isLoading={isSaving}
        clients={clientsForModal}
        products={productsForModal}
      />
    </div>
  );
}
