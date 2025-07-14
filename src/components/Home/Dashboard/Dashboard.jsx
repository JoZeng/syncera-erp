// src/pages/Dashboard/Dashboard.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts"; // Importe os componentes de gráfico

import Aside from "../Layout/Aside";
import Header from "../Layout/Header";
import api from "../../../services/api";
import NamePromptModal from "../../Modals/NamePromptModal";

export default function Dashboard() {
  const [currentUser, setCurrentUser] = useState(null);
  const [showNamePromptModal, setShowNamePromptModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Dados de atividades recentes (agora com 10 para demonstrar paginação de 8 em 8)
  const [activities] = useState([
    {
      id: 1,
      activity:
        "Pedido #12345 Criado: Análise de desempenho do servidor e otimização de banco de dados para melhorar a latência.",
      user: "João Silva",
      email: "joao.silva.muito.longo.para.testar.o.overflow@example.com",
      date: "14/07/2025 10:00",
      status: "Concluído",
    },
    {
      id: 2,
      activity:
        "Fatura #9876 Paga: Processamento de pagamentos em lote e reconciliação de contas para o fechamento mensal.",
      user: "Maria Souza",
      email: "maria.souza@example.com",
      date: "13/07/2025 16:30",
      status: "Processando",
    },
    {
      id: 3,
      activity:
        "Novo Cliente Adicionado: Registro de dados do cliente no CRM e configuração de permissões de acesso.",
      user: "Ana Costa",
      email: "ana.c@example.com",
      date: "13/07/2025 11:45",
      status: "Concluído",
    },
    {
      id: 4,
      activity:
        "Alerta de Estoque Baixo: Verificação de nível de estoque de produtos críticos e geração de pedido de compra.",
      user: "Sistema",
      email: "sistema@example.com",
      date: "12/07/2025 09:15",
      status: "Atenção",
    },
    {
      id: 5,
      activity:
        "Produto 'X' Atualizado: Atualização de descrição e preço do produto no catálogo online.",
      user: "Pedro Almeida",
      email: "pedro.a@example.com",
      date: "11/07/2025 14:00",
      status: "Concluído",
    },
    {
      id: 6,
      activity:
        "Relatório de Vendas Gerado: Compilação e análise de dados de vendas trimestrais para insights.",
      user: "Carla Lima",
      email: "carla.l@example.com",
      date: "11/07/2025 08:30",
      status: "Concluído",
    },
    {
      id: 7,
      activity:
        "Suporte Técnico Solicitado: Abertura de ticket de suporte e atribuição para equipe técnica.",
      user: "Fernando Reis",
      email: "fernando.r@example.com",
      date: "10/07/2025 17:00",
      status: "Pendente",
    },
    {
      id: 8,
      activity:
        "Campanha de Marketing Lançada: Publicação de anúncios em redes sociais e monitoramento de desempenho.",
      user: "Gabriela Dias",
      email: "gabriela.d@example.com",
      date: "10/07/2025 09:00",
      status: "Concluído",
    },
    {
      id: 9,
      activity:
        "Item 'Y' Removido do Estoque: Atualização de inventário após baixa de produto danificado.",
      user: "Rafael Martins",
      email: "rafael.m@example.com",
      date: "09/07/2025 13:00",
      status: "Concluído",
    },
    {
      id: 10,
      activity:
        "Novo Usuário Cadastrado: Criação de conta de usuário e envio de credenciais de acesso.",
      user: "Patrícia Nunes",
      email: "patricia.n@example.com",
      date: "09/07/2025 10:00",
      status: "Concluído",
    },
  ]);

  // Dados para os gráficos
  const salesData = [
    { name: "Jan", vendas: 4000, custo: 2400 },
    { name: "Fev", vendas: 3000, custo: 1398 },
    { name: "Mar", vendas: 2000, custo: 9800 },
    { name: "Abr", vendas: 2780, custo: 3908 },
    { name: "Mai", vendas: 1890, custo: 4800 },
    { name: "Jun", vendas: 2390, custo: 3800 },
    { name: "Jul", vendas: 3490, custo: 4300 },
  ];

  const productCategoryData = [
    { name: "Eletrônicos", value: 400 },
    { name: "Periféricos", value: 300 },
    { name: "Acessórios", value: 200 },
    { name: "Software", value: 100 },
  ];

  const orderStatusData = [
    { name: "Concluídos", value: 65, color: "#82ca9d" },
    { name: "Pendentes", value: 20, color: "#ffc658" },
    { name: "Cancelados", value: 15, color: "#ff7300" },
  ];

  const PIE_COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"]; // Cores para o gráfico de pizza

  // Estados para paginação
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await api.get("/usuario");
        const userData = response.data;
        setCurrentUser(userData);

        if (!userData.nome || userData.nome.trim() === "") {
          setShowNamePromptModal(true);
        }
      } catch (error) {
        console.error("Erro ao buscar perfil do usuário:", error);
        if (error.response && error.response.status === 401) {
          handleLogout();
        }
      }
    };

    fetchUserProfile();
  }, []);

  const handleSaveName = async (name) => {
    setIsLoading(true);
    try {
      const response = await api.put("/usuario", { nome: name });
      setCurrentUser(response.data);
      setShowNamePromptModal(false);
      alert("Nome salvo com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar nome:", error);
      alert("Erro ao salvar o nome. Por favor, tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // Lógica da Paginação
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentActivities = activities.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(activities.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Aside handleLogout={handleLogout} />
      <main className="flex-1 p-6 sm:p-8 lg:p-8">
        <Header currentUser={currentUser} title={"Dashboard"} />

        {/* Indicadores Principais */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-10">
          <div className="bg-white rounded-xl shadow-lg p-6 flex items-center justify-between border border-gray-200">
            <div>
              <p className="text-gray-500 text-sm font-medium uppercase mb-1">
                Vendas do Mês
              </p>
              <h2 className="text-3xl font-bold text-green-600">
                R$ 15.200,00
              </h2>
            </div>
            <i className="fas fa-chart-line text-5xl text-green-400 opacity-70"></i>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 flex items-center justify-between border border-gray-200">
            <div>
              <p className="text-gray-500 text-sm font-medium uppercase mb-1">
                Novos Clientes
              </p>
              <h2 className="text-3xl font-bold text-blue-600">45</h2>
            </div>
            <i className="fas fa-user-plus text-5xl text-blue-400 opacity-70"></i>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 flex items-center justify-between border border-gray-200">
            <div>
              <p className="text-gray-500 text-sm font-medium uppercase mb-1">
                Produtos em Estoque
              </p>
              <h2 className="text-3xl font-bold text-yellow-600">1.230</h2>
            </div>
            <i className="fas fa-boxes text-5xl text-yellow-400 opacity-70"></i>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 flex items-center justify-between border border-gray-200">
            <div>
              <p className="text-gray-500 text-sm font-medium uppercase mb-1">
                Contas a Pagar
              </p>
              <h2 className="text-3xl font-bold text-red-600">R$ 3.500,00</h2>
            </div>
            <i className="fas fa-hand-holding-usd text-5xl text-red-400 opacity-70"></i>
          </div>
        </section>

        {/* Seção de Gráficos */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          {/* Gráfico de Linha: Vendas Mensais */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Vendas e Custo Mensal
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={salesData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="vendas"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                  name="Vendas (R$)"
                />
                <Line
                  type="monotone"
                  dataKey="custo"
                  stroke="#82ca9d"
                  name="Custo (R$)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Gráfico de Barras: Produtos por Categoria */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Produtos por Categoria
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={productCategoryData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" name="Quantidade" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Gráfico de Pizza: Status de Pedidos */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 lg:col-span-2">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Status dos Pedidos
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={orderStatusData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {orderStatusData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={PIE_COLORS[index % PIE_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Seção de Atividades Recentes com Paginação (existente) */}
        <section className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">
            Atividades Recentes
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-lg w-2/5"
                  >
                    Atividade
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6"
                  >
                    Usuário
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4"
                  >
                    E-mail
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12"
                  >
                    Data
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tr-lg w-[10%]"
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentActivities.map((activity) => (
                  <tr key={activity.id}>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 max-w-xs truncate">
                      {activity.activity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {activity.user}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                      {activity.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {activity.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          activity.status === "Concluído"
                            ? "bg-green-100 text-green-800"
                            : activity.status === "Processando"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {activity.status}
                      </span>
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
      <NamePromptModal
        isOpen={showNamePromptModal}
        onClose={() => setShowNamePromptModal(false)}
        onSaveName={handleSaveName}
        isLoading={isLoading}
      />
    </div>
  );
}
