// src/Modals/AddProductModal.jsx
import React, { useState } from "react";

export default function AddProductModal({
  isOpen,
  onClose,
  onSaveProduct,
  isLoading,
}) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState(""); // Novo campo para produtos

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProductData = {
      name,
      category,
      price: parseFloat(price), // Converte para número
      stock: parseInt(stock), // Converte para número inteiro
      description,
    };
    onSaveProduct(newProductData);
    // Limpar formulário após o envio
    setName("");
    setCategory("");
    setPrice("");
    setStock("");
    setDescription("");
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
        background: "rgba(145, 154, 150, 0.3)", // Fundo semi-transparente
        backdropFilter: "blur(5px)", // Efeito de desfoque
      }}
    >
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6 relative">
        {/* Botão de Fechar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-semibold"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Adicionar Novo Produto
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* Nome do Produto */}
          <div>
            <label
              htmlFor="productName"
              className="block text-sm font-medium text-gray-700"
            >
              Nome do Produto
            </label>
            <input
              type="text"
              id="productName"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
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

          {/* Preço */}
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Preço (R$)
            </label>
            <input
              type="number"
              id="price"
              step="0.01" // Permite valores decimais
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          {/* Estoque */}
          <div>
            <label
              htmlFor="stock"
              className="block text-sm font-medium text-gray-700"
            >
              Estoque
            </label>
            <input
              type="number"
              id="stock"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              required
            />
          </div>

          {/* Descrição */}
          <div className="col-span-2">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Descrição
            </label>
            <textarea
              id="description"
              rows="3"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          {/* Botão de Salvar */}
          <div className="col-span-2 flex justify-end mt-6">
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
                "Salvar Produto"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
