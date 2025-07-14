// src/pages/Financial/Financial.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Line, Bar } from "react-chartjs-2"; // Importe os tipos de gráfico
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement, // Pode ser útil para gráficos de pizza/doughnut futuros
} from "chart.js";

import Aside from "../../Home/Layout/Aside";
import Header from "../../Home/Layout/Header";
import api from "../../../services/api";
import AddTransactionModal from "../../Modals/AddTransactionModal"; // Novo modal para transações

// Registrar os componentes do Chart.js que você vai usar
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function Financial() {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  const [showAddTransactionModal, setShowAddTransactionModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Dados financeiros de exemplo
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      type: "Receita",
      description: "Venda de Smartphone X",
      amount: 1200.0,
      date: "2025-06-01",
      category: "Vendas",
    },
    {
      id: 2,
      type: "Despesa",
      description: "Aluguel do escritório",
      amount: 1500.0,
      date: "2025-06-05",
      category: "Despesas Fixas",
    },
    {
      id: 3,
      type: "Receita",
      description: "Serviço de Consultoria",
      amount: 800.0,
      date: "2025-06-10",
      category: "Serviços",
    },
    {
      id: 4,
      type: "Despesa",
      description: "Compra de suprimentos",
      amount: 250.0,
      date: "2025-06-12",
      category: "Materiais",
    },
    {
      id: 5,
      type: "Receita",
      description: "Venda de Notebook Gamer",
      amount: 5500.0,
      date: "2025-06-15",
      category: "Vendas",
    },
    {
      id: 6,
      type: "Despesa",
      description: "Salários de funcionários",
      amount: 3000.0,
      date: "2025-06-20",
      category: "Despesas Fixas",
    },
    {
      id: 7,
      type: "Receita",
      description: "Reembolso de imposto",
      amount: 300.0,
      date: "2025-07-01",
      category: "Outros",
    },
    {
      id: 8,
      type: "Despesa",
      description: "Conta de luz",
      amount: 180.0,
      date: "2025-07-03",
      category: "Contas",
    },
    {
      id: 9,
      type: "Receita",
      description: "Venda de Fone de Ouvido",
      amount: 250.0,
      date: "2025-07-05",
      category: "Vendas",
    },
    {
      id: 10,
      type: "Despesa",
      description: "Assinatura de software",
      amount: 100.0,
      date: "2025-07-08",
      category: "Tecnologia",
    },
    {
      id: 11,
      type: "Receita",
      description: "Serviço de Manutenção",
      amount: 450.0,
      date: "2025-07-10",
      category: "Serviços",
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

  // Lógica de cálculo para o resumo financeiro
  const totalRevenue = transactions
    .filter((t) => t.type === "Receita")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "Despesa")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalRevenue - totalExpense;

  // Lógica para dados dos gráficos
  // Agrupar transações por mês (para Line Chart)
  const getMonthlyData = () => {
    const monthlySummary = {}; // { 'YYYY-MM': { receitas: 0, despesas: 0 } }

    transactions.forEach((t) => {
      const month = t.date.substring(0, 7); // Ex: "2025-06"
      if (!monthlySummary[month]) {
        monthlySummary[month] = { receitas: 0, despesas: 0 };
      }
      if (t.type === "Receita") {
        monthlySummary[month].receitas += t.amount;
      } else {
        monthlySummary[month].despesas += t.amount;
      }
    });

    const sortedMonths = Object.keys(monthlySummary).sort();
    const revenues = sortedMonths.map(
      (month) => monthlySummary[month].receitas
    );
    const expenses = sortedMonths.map(
      (month) => monthlySummary[month].despesas
    );

    return {
      labels: sortedMonths,
      revenues,
      expenses,
    };
  };

  const monthlyData = getMonthlyData();

  const lineChartData = {
    labels: monthlyData.labels,
    datasets: [
      {
        label: "Receitas",
        data: monthlyData.revenues,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.1,
        fill: false,
      },
      {
        label: "Despesas",
        data: monthlyData.expenses,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.1,
        fill: false,
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Receitas e Despesas Mensais",
      },
    },
  };

  // Agrupar despesas por categoria (para Bar Chart)
  const getExpenseByCategoryData = () => {
    const categoryExpenses = {};
    transactions
      .filter((t) => t.type === "Despesa")
      .forEach((t) => {
        if (!categoryExpenses[t.category]) {
          categoryExpenses[t.category] = 0;
        }
        categoryExpenses[t.category] += t.amount;
      });

    const labels = Object.keys(categoryExpenses);
    const data = Object.values(categoryExpenses);

    return { labels, data };
  };

  const expenseByCategoryData = getExpenseByCategoryData();

  const barChartData = {
    labels: expenseByCategoryData.labels,
    datasets: [
      {
        label: "Despesas por Categoria",
        data: expenseByCategoryData.data,
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(199, 199, 199, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(199, 199, 199, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Não precisamos de legenda para uma única barra
      },
      title: {
        display: true,
        text: "Despesas por Categoria",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // Paginação de transações (como nas outras páginas)
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTransactions = transactions.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(transactions.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Funções para o modal
  const handleAddTransactionClick = () => {
    setShowAddTransactionModal(true);
  };

  const handleCloseModal = () => {
    setShowAddTransactionModal(false);
  };

  const handleSaveTransaction = async (newTransactionData) => {
    setIsSaving(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newId =
        transactions.length > 0
          ? Math.max(...transactions.map((t) => t.id)) + 1
          : 1;
      const transactionWithId = {
        ...newTransactionData,
        id: newId,
        date: new Date().toISOString().slice(0, 10), // Data atual no formato YYYY-MM-DD
      };

      setTransactions((prevTransactions) => [
        ...prevTransactions,
        transactionWithId,
      ]);
      alert("Transação adicionada com sucesso!");
      handleCloseModal();
    } catch (error) {
      console.error("Erro ao salvar a transação:", error);
      alert("Erro ao salvar a transação. Por favor, tente novamente.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Aside handleLogout={handleLogout} />
      <main className="flex-1 p-6 sm:p-8 lg:p-10">
        <Header currentUser={currentUser} title={"Financeiro"} />

        {/* Resumo Financeiro */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 text-center">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Total de Receitas
            </h3>
            <p className="text-3xl font-bold text-green-600">
              R$ {totalRevenue.toFixed(2).replace(".", ",")}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 text-center">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Total de Despesas
            </h3>
            <p className="text-3xl font-bold text-red-600">
              R$ {totalExpense.toFixed(2).replace(".", ",")}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 text-center">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Saldo Atual
            </h3>
            <p
              className={`text-3xl font-bold ${
                balance >= 0 ? "text-blue-600" : "text-red-600"
              }`}
            >
              R$ {balance.toFixed(2).replace(".", ",")}
            </p>
          </div>
        </section>

        {/* Seção de Gráficos */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 flex flex-col justify-center items-center">
            <Line data={lineChartData} options={lineChartOptions} />
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 flex flex-col justify-center items-center">
            <Bar data={barChartData} options={barChartOptions} />
          </div>
        </section>

        {/* Lista de Transações (Tabela) */}
        <section className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800">
              Histórico de Transações
            </h3>
            <button
              onClick={handleAddTransactionClick}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-200 ease-in-out flex items-center"
            >
              <i className="fas fa-plus mr-2"></i> Adicionar Transação
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
                    Tipo
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[30%]"
                  >
                    Descrição
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[15%]"
                  >
                    Valor
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
                    Categoria
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
                {currentTransactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 max-w-xs truncate">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          transaction.type === "Receita"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {transaction.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                      {transaction.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 max-w-xs truncate">
                      R$ {transaction.amount.toFixed(2).replace(".", ",")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 max-w-xs truncate">
                      {transaction.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 max-w-xs truncate">
                      {transaction.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium flex items-center space-x-2">
                      <button
                        onClick={() =>
                          alert(`Editar transação: ${transaction.description}`)
                        }
                        className="flex items-center px-3 py-1 border border-blue-500 rounded-md text-blue-600 hover:bg-blue-50 transition duration-200 ease-in-out"
                      >
                        <i className="fas fa-edit mr-1"></i>
                        Editar
                      </button>
                      <button
                        onClick={() =>
                          alert(`Excluir transação: ${transaction.description}`)
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

      {/* O Novo Modal de Adicionar Transação */}
      <AddTransactionModal
        isOpen={showAddTransactionModal}
        onClose={handleCloseModal}
        onSaveTransaction={handleSaveTransaction}
        isLoading={isSaving}
      />
    </div>
  );
}
