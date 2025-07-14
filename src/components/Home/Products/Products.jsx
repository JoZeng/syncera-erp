// src/pages/Products/Products.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Aside from "../../Home/Layout/Aside"; // Ajuste o caminho se necessário
import Header from "../../Home/Layout/Header"; // Ajuste o caminho se necessário
import api from "../../../services/api"; // Certifique-se de que este caminho está correto
import AddProductModal from "../../Modals/AddProductModal"; // Importe o NOVO modal de produtos

export default function Products() {
  const [currentUser, setCurrentUser] = useState(null); // Para o Header
  const navigate = useNavigate();

  // Estados para o modal de produtos
  const [showAddProductModal, setShowAddProductModal] = useState(false);
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

  // Dados de produtos de exemplo (IDs únicos)
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Smartphone X",
      category: "Eletrônicos",
      price: 1200.0,
      stock: 150,
      status: "Disponível",
    },
    {
      id: 2,
      name: "Notebook Gamer Pro",
      category: "Eletrônicos",
      price: 5500.0,
      stock: 50,
      status: "Disponível",
    },
    {
      id: 3,
      name: "Fone de Ouvido Bluetooth",
      category: "Acessórios",
      price: 250.0,
      stock: 300,
      status: "Disponível",
    },
    {
      id: 4,
      name: "Teclado Mecânico RGB",
      category: "Periféricos",
      price: 400.0,
      stock: 80,
      status: "Disponível",
    },
    {
      id: 5,
      name: "Mouse Sem Fio Ergonômico",
      category: "Periféricos",
      price: 120.0,
      stock: 200,
      status: "Disponível",
    },
    {
      id: 6,
      name: "Webcam Full HD",
      category: "Acessórios",
      price: 180.0,
      stock: 120,
      status: "Indisponível",
    },
    {
      id: 7,
      name: 'Monitor Ultrawide 34"',
      category: "Monitores",
      price: 2800.0,
      stock: 30,
      status: "Disponível",
    },
    {
      id: 8,
      name: "Cadeira Gamer Confort",
      category: "Mobiliário",
      price: 950.0,
      stock: 70,
      status: "Disponível",
    },
    {
      id: 9,
      name: "Impressora Multifuncional",
      category: "Escritório",
      price: 600.0,
      stock: 90,
      status: "Disponível",
    },
    {
      id: 10,
      name: "SSD 1TB NVMe",
      category: "Armazenamento",
      price: 450.0,
      stock: 250,
      status: "Disponível",
    },
    {
      id: 11,
      name: "Placa de Vídeo RTX 3070",
      category: "Componentes",
      price: 3500.0,
      stock: 20,
      status: "Indisponível",
    },
  ]);

  // Estados para paginação
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  // Lógica da Paginação
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Função para abrir o modal de adicionar produto
  const handleAddProductClick = () => {
    setShowAddProductModal(true);
  };

  const handleCloseModal = () => {
    setShowAddProductModal(false);
  };

  // Função para salvar o novo produto (simulando uma API)
  const handleSaveProduct = async (newProductData) => {
    setIsSaving(true);
    try {
      // Simulação de requisição API
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simula delay da rede

      // Gerar um ID temporário para o novo produto
      const newId =
        products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;
      const productWithId = {
        ...newProductData,
        id: newId,
        status: "Disponível", // Status padrão para novo produto
      };

      setProducts((prevProducts) => [...prevProducts, productWithId]);
      alert("Produto adicionado com sucesso!");
      handleCloseModal(); // Fechar o modal após salvar
    } catch (error) {
      console.error("Erro ao salvar o produto:", error);
      alert("Erro ao salvar o produto. Por favor, tente novamente.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Aside handleLogout={handleLogout} />
      <main className="flex-1 p-6 sm:p-8 lg:p-10">
        <Header currentUser={currentUser} title={"Produtos"} />{" "}
        {/* Título "Produtos" */}
        <section className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800">
              Lista de Produtos
            </h3>
            <button
              onClick={handleAddProductClick}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-200 ease-in-out flex items-center"
            >
              <i className="fas fa-plus mr-2"></i> Adicionar Produto
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 table-fixed">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-lg w-1/5"
                  >
                    Nome
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/5"
                  >
                    Categoria
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6"
                  >
                    Preço
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6"
                  >
                    Estoque
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[10%]"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tr-lg w-[12%]"
                  >
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentProducts.map((product) => (
                  <tr key={product.id}>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 max-w-xs truncate">
                      {product.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                      {product.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 max-w-xs truncate">
                      R$ {product.price.toFixed(2).replace(".", ",")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 max-w-xs truncate">
                      {product.stock}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 max-w-xs truncate">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          product.status === "Disponível"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {product.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium flex items-center space-x-2">
                      <button
                        onClick={() => alert(`Editar produto: ${product.name}`)}
                        className="flex items-center px-3 py-1 border border-blue-500 rounded-md text-blue-600 hover:bg-blue-50 transition duration-200 ease-in-out"
                      >
                        <i className="fas fa-edit mr-1"></i>
                        Editar
                      </button>
                      <button
                        onClick={() =>
                          alert(`Excluir produto: ${product.name}`)
                        }
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

      {/* O Novo Modal de Adicionar Produto */}
      <AddProductModal
        isOpen={showAddProductModal}
        onClose={handleCloseModal}
        onSaveProduct={handleSaveProduct}
        isLoading={isSaving}
      />
    </div>
  );
}
