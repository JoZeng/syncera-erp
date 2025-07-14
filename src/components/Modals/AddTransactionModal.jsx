// src/Modals/AddTransactionModal.jsx
import React, { useState, useEffect } from "react";

export default function AddTransactionModal({
  isOpen,
  onClose,
  onSaveTransaction,
  isLoading,
}) {
  const [type, setType] = useState("Receita"); // 'Receita' ou 'Despesa'
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  // Resetar estados quando o modal abre ou fecha
  useEffect(() => {
    if (isOpen) {
      setType("Receita");
      setDescription("");
      setAmount("");
      setCategory("");
      setDate(new Date().toISOString().slice(0, 10)); // Data atual padrão
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTransactionData = {
      type,
      description,
      amount: parseFloat(amount),
      category,
      date,
    };
    onSaveTransaction(newTransactionData);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      style={{
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(145, 154, 150, 0.3)",
        backdropFilter: "blur(5px)",
      }}
    >
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-semibold"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Adicionar Nova Transação
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Tipo de Transação */}
          <div>
            <label
              htmlFor="type"
              className="block text-sm font-medium text-gray-700"
            >
              Tipo
            </label>
            <select
              id="type"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
            >
              <option value="Receita">Receita</option>
              <option value="Despesa">Despesa</option>
            </select>
          </div>

          {/* Descrição */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Descrição
            </label>
            <input
              type="text"
              id="description"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          {/* Valor */}
          <div>
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-700"
            >
              Valor (R$)
            </label>
            <input
              type="number"
              id="amount"
              step="0.01"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          {/* Categoria */}
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Categoria
            </label>
            <input
              type="text"
              id="category"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>

          {/* Data */}
          <div>
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700"
            >
              Data
            </label>
            <input
              type="date"
              id="date"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          {/* Botões de Ação */}
          <div className="flex justify-end mt-6">
            <button
              type="button"
              onClick={onClose}
              className="mr-4 px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition duration-200 ease-in-out"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md shadow-md transition duration-200 ease-in-out flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-2"></i> Salvando...
                </>
              ) : (
                "Salvar Transação"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
