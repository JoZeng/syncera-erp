// src/pages/PurchasesSuppliers/PurchasesSuppliers.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Aside from "../../Home/Layout/Aside";
import Header from "../../Home/Layout/Header";
import api from "../../../services/api";
import AddSupplierModal from "../../Modals/AddSupplierModal"; // NOVO modal para Fornecedores

export default function PurchasesSuppliers() {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  // Estados para o modal de adicionar/editar fornecedor
  const [showAddSupplierModal, setShowAddSupplierModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState(null); // Para editar um fornecedor existente

  // Dados de fornecedores de exemplo
  const [suppliers, setSuppliers] = useState([
    {
      id: 1,
      name: "Eletrônicos LTDA",
      contact: "joao@eletronicos.com.br",
      phone: "(11) 98765-4321",
      cnpj: "12.345.678/0001-90",
      status: "Ativo",
      lastPurchase: "2025-06-20",
    },
    {
      id: 2,
      name: "Distribuidora de Materiais",
      contact: "ana@distribuidora.com",
      phone: "(21) 91234-5678",
      cnpj: "98.765.432/0001-10",
      status: "Ativo",
      lastPurchase: "2025-07-01",
    },
    {
      id: 3,
      name: "Tecnologia Inovadora SA",
      contact: "pedro@inovadora.com.br",
      phone: "(31) 99876-1234",
      cnpj: "45.678.901/0001-22",
      status: "Inativo",
      lastPurchase: "2025-04-15",
    },
    {
      id: 4,
      name: "Componentes Mundiais",
      contact: "contato@componentes.com",
      phone: "(41) 97654-3210",
      cnpj: "23.456.789/0001-33",
      status: "Ativo",
      lastPurchase: "2025-07-05",
    },
    {
      id: 5,
      name: "Embalagens Express",
      contact: "vendas@embalagens.com.br",
      phone: "(81) 98765-1010",
      cnpj: "01.020.304/0001-44",
      status: "Ativo",
      lastPurchase: "2025-06-10",
    },
  ]);

  // Dados de Pedidos de Compra de exemplo
  const [purchaseOrders, setPurchaseOrders] = useState([
    {
      id: 1001,
      supplierName: "Eletrônicos LTDA",
      orderDate: "2025-06-15",
      totalAmount: 12500.0,
      status: "Concluído",
      items: [
        { name: "Smartphone X", qty: 10, unitPrice: 1000.0 },
        { name: "Fone Bluetooth", qty: 20, unitPrice: 125.0 },
      ],
    },
    {
      id: 1002,
      supplierName: "Distribuidora de Materiais",
      orderDate: "2025-06-25",
      totalAmount: 3500.0,
      status: "Pendente",
      items: [
        { name: "Papel A4", qty: 50, unitPrice: 50.0 },
        { name: "Caneta Azul", qty: 100, unitPrice: 10.0 },
      ],
    },
    {
      id: 1003,
      supplierName: "Componentes Mundiais",
      orderDate: "2025-07-03",
      totalAmount: 22000.0,
      status: "Em Andamento",
      items: [
        { name: "Placa Mãe Z", qty: 5, unitPrice: 2000.0 },
        { name: "Memória RAM", qty: 10, unitPrice: 1200.0 },
      ],
    },
    {
      id: 1004,
      supplierName: "Eletrônicos LTDA",
      orderDate: "2025-07-10",
      totalAmount: 750.0,
      status: "Concluído",
      items: [{ name: "Cabo HDMI", qty: 30, unitPrice: 25.0 }],
    },
  ]);

  // Função para buscar o perfil do usuário
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

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // Paginação para Fornecedores
  const [currentSupplierPage, setCurrentSupplierPage] = useState(1);
  const [suppliersPerPage] = useState(5);
  const indexOfLastSupplier = currentSupplierPage * suppliersPerPage;
  const indexOfFirstSupplier = indexOfLastSupplier - suppliersPerPage;
  const currentSuppliers = suppliers.slice(
    indexOfFirstSupplier,
    indexOfLastSupplier
  );
  const totalSupplierPages = Math.ceil(suppliers.length / suppliersPerPage);
  const paginateSuppliers = (pageNumber) => setCurrentSupplierPage(pageNumber);

  // Paginação para Pedidos de Compra
  const [currentOrderPage, setCurrentOrderPage] = useState(1);
  const [ordersPerPage] = useState(5);
  const indexOfLastOrder = currentOrderPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentPurchaseOrders = purchaseOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );
  const totalOrderPages = Math.ceil(purchaseOrders.length / ordersPerPage);
  const paginateOrders = (pageNumber) => setCurrentOrderPage(pageNumber);

  // Funções para o modal de adicionar/editar fornecedor
  const handleAddSupplierClick = () => {
    setEditingSupplier(null); // Garante que é um novo fornecedor
    setShowAddSupplierModal(true);
  };

  const handleEditSupplierClick = (supplier) => {
    setEditingSupplier(supplier);
    setShowAddSupplierModal(true);
  };

  const handleCloseModal = () => {
    setShowAddSupplierModal(false);
    setEditingSupplier(null); // Limpa o fornecedor em edição ao fechar
  };

  // Função para salvar o fornecedor (adicionar ou atualizar)
  const handleSaveSupplier = async (supplierData) => {
    setIsSaving(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (editingSupplier) {
        // Lógica de edição
        setSuppliers((prevSuppliers) =>
          prevSuppliers.map((supplier) =>
            supplier.id === supplierData.id
              ? {
                  ...supplierData,
                  lastPurchase: supplier.lastPurchase || "N/A",
                }
              : supplier
          )
        );
        alert("Fornecedor atualizado com sucesso!");
      } else {
        // Lógica de adição
        const newId =
          suppliers.length > 0
            ? Math.max(...suppliers.map((s) => s.id)) + 1
            : 1;
        const newSupplier = {
          ...supplierData,
          id: newId,
          lastPurchase: "N/A", // Novo fornecedor, sem última compra ainda
        };
        setSuppliers((prevSuppliers) => [...prevSuppliers, newSupplier]);
        alert("Fornecedor adicionado com sucesso!");
      }
      handleCloseModal();
    } catch (error) {
      console.error("Erro ao salvar o fornecedor:", error);
      alert("Erro ao salvar o fornecedor. Por favor, tente novamente.");
    } finally {
      setIsSaving(false);
    }
  };

  // Função para deletar um fornecedor (simulada)
  const handleDeleteSupplier = (id, name) => {
    if (
      window.confirm(`Tem certeza que deseja excluir o fornecedor "${name}"?`)
    ) {
      setSuppliers((prevSuppliers) =>
        prevSuppliers.filter((supplier) => supplier.id !== id)
      );
      alert(`Fornecedor "${name}" excluído com sucesso!`);
    }
  };

  // Simulação de ação de "Ver Detalhes" do Pedido de Compra
  const handleViewOrderDetails = (order) => {
    let details = `Detalhes do Pedido #${order.id}\n`;
    details += `Fornecedor: ${order.supplierName}\n`;
    details += `Data do Pedido: ${order.orderDate}\n`;
    details += `Valor Total: R$ ${order.totalAmount
      .toFixed(2)
      .replace(".", ",")}\n`;
    details += `Status: ${order.status}\n\n`;
    details += `Itens:\n`;
    order.items.forEach((item) => {
      details += `  - ${item.name} (${item.qty}x @ R$ ${item.unitPrice
        .toFixed(2)
        .replace(".", ",")})\n`;
    });
    alert(details);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Aside handleLogout={handleLogout} />
      <main className="flex-1 p-6 sm:p-8 lg:p-10">
        <Header currentUser={currentUser} title={"Compras e Fornecedores"} />

        {/* Seção de Fornecedores */}
        <section className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800">
              Gestão de Fornecedores
            </h3>
            <button
              onClick={handleAddSupplierClick}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-200 ease-in-out flex items-center"
            >
              <i className="fas fa-plus mr-2"></i> Adicionar Fornecedor
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 table-fixed">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-lg w-[20%]"
                  >
                    Nome
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[20%]"
                  >
                    Contato
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[15%]"
                  >
                    Telefone
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[15%]"
                  >
                    CNPJ
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[10%]"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[10%]"
                  >
                    Última Compra
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tr-lg w-[10%]"
                  >
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentSuppliers.map((supplier) => (
                  <tr key={supplier.id}>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 max-w-xs truncate">
                      {supplier.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                      {supplier.contact}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                      {supplier.phone}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                      {supplier.cnpj}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          supplier.status === "Ativo"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {supplier.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                      {supplier.lastPurchase}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium flex items-center space-x-2">
                      <button
                        onClick={() => handleEditSupplierClick(supplier)}
                        className="flex items-center px-3 py-1 border border-indigo-500 rounded-md text-indigo-600 hover:bg-indigo-50 transition duration-200 ease-in-out"
                      >
                        <i className="fas fa-edit mr-1"></i> Editar
                      </button>
                      <button
                        onClick={() =>
                          handleDeleteSupplier(supplier.id, supplier.name)
                        }
                        className="flex items-center px-3 py-1 border border-red-500 rounded-md text-red-600 hover:bg-red-50 transition duration-200 ease-in-out"
                      >
                        <i className="fas fa-trash-alt mr-1"></i> Excluir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Paginação Fornecedores */}
          <div className="flex justify-center mt-6">
            <nav
              className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
              aria-label="Pagination"
            >
              <button
                onClick={() => paginateSuppliers(currentSupplierPage - 1)}
                disabled={currentSupplierPage === 1}
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span className="sr-only">Previous</span>
                <i className="fas fa-chevron-left"></i>
              </button>
              {[...Array(totalSupplierPages).keys()].map((number) => (
                <button
                  key={number + 1}
                  onClick={() => paginateSuppliers(number + 1)}
                  className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium ${
                    currentSupplierPage === number + 1
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {number + 1}
                </button>
              ))}
              <button
                onClick={() => paginateSuppliers(currentSupplierPage + 1)}
                disabled={currentSupplierPage === totalSupplierPages}
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span className="sr-only">Next</span>
                <i className="fas fa-chevron-right"></i>
              </button>
            </nav>
          </div>
        </section>

        {/* Seção de Pedidos de Compra */}
        <section className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 mt-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800">
              Pedidos de Compra
            </h3>
            {/* Você pode adicionar um botão para "Criar Pedido" aqui no futuro */}
            <button
              onClick={() =>
                alert("Funcionalidade de 'Criar Pedido' será implementada.")
              }
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-200 ease-in-out flex items-center"
            >
              <i className="fas fa-file-invoice mr-2"></i> Criar Pedido
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 table-fixed">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-lg w-[10%]"
                  >
                    ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[25%]"
                  >
                    Fornecedor
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[15%]"
                  >
                    Data do Pedido
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[15%]"
                  >
                    Valor Total
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[10%]"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tr-lg w-[15%]"
                  >
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentPurchaseOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 max-w-xs truncate">
                      #{order.id}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                      {order.supplierName}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                      {order.orderDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 max-w-xs truncate">
                      R$ {order.totalAmount.toFixed(2).replace(".", ",")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          order.status === "Concluído"
                            ? "bg-green-100 text-green-800"
                            : order.status === "Pendente"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium flex items-center space-x-2">
                      <button
                        onClick={() => handleViewOrderDetails(order)}
                        className="flex items-center px-3 py-1 border border-blue-500 rounded-md text-blue-600 hover:bg-blue-50 transition duration-200 ease-in-out"
                      >
                        <i className="fas fa-eye mr-1"></i> Ver Detalhes
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Paginação Pedidos de Compra */}
          <div className="flex justify-center mt-6">
            <nav
              className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
              aria-label="Pagination"
            >
              <button
                onClick={() => paginateOrders(currentOrderPage - 1)}
                disabled={currentOrderPage === 1}
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span className="sr-only">Previous</span>
                <i className="fas fa-chevron-left"></i>
              </button>
              {[...Array(totalOrderPages).keys()].map((number) => (
                <button
                  key={number + 1}
                  onClick={() => paginateOrders(number + 1)}
                  className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium ${
                    currentOrderPage === number + 1
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {number + 1}
                </button>
              ))}
              <button
                onClick={() => paginateOrders(currentOrderPage + 1)}
                disabled={currentOrderPage === totalOrderPages}
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span className="sr-only">Next</span>
                <i className="fas fa-chevron-right"></i>
              </button>
            </nav>
          </div>
        </section>
      </main>

      {/* Modal de Adicionar/Editar Fornecedor */}
      <AddSupplierModal
        isOpen={showAddSupplierModal}
        onClose={handleCloseModal}
        onSaveSupplier={handleSaveSupplier}
        isLoading={isSaving}
        supplierToEdit={editingSupplier}
      />
    </div>
  );
}
