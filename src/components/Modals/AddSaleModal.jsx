// src/Modals/AddSaleModal.jsx
import React, { useState, useEffect } from "react";

export default function AddSaleModal({
  isOpen,
  onClose,
  onSaveSale,
  isLoading,
  clients,
  products,
}) {
  const [selectedClient, setSelectedClient] = useState("");
  const [saleItems, setSaleItems] = useState([
    { productId: "", quantity: 1, price: 0 },
  ]); // Itens da venda

  // Resetar estados quando o modal abre ou fecha
  useEffect(() => {
    if (isOpen) {
      setSelectedClient("");
      setSaleItems([{ productId: "", quantity: 1, price: 0 }]);
    }
  }, [isOpen]);

  const handleAddItem = () => {
    setSaleItems([...saleItems, { productId: "", quantity: 1, price: 0 }]);
  };

  const handleRemoveItem = (index) => {
    const newItems = saleItems.filter((_, i) => i !== index);
    setSaleItems(newItems);
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...saleItems];
    if (field === "productId") {
      const selectedProduct = products.find((p) => p.id === parseInt(value));
      newItems[index] = {
        ...newItems[index],
        productId: value,
        productName: selectedProduct ? selectedProduct.name : "",
        price: selectedProduct ? selectedProduct.price : 0,
      };
    } else if (field === "quantity") {
      newItems[index][field] = parseInt(value);
    } else {
      newItems[index][field] = value;
    }
    setSaleItems(newItems);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedClient) {
      alert("Por favor, selecione um cliente.");
      return;
    }

    if (
      saleItems.length === 0 ||
      saleItems.some((item) => !item.productId || item.quantity <= 0)
    ) {
      alert("Por favor, adicione pelo menos um item válido à venda.");
      return;
    }

    const clientName =
      clients.find((c) => c.id === parseInt(selectedClient))?.name ||
      "Cliente Desconhecido";

    const newSaleData = {
      clientId: parseInt(selectedClient),
      clientName: clientName,
      items: saleItems.map((item) => ({
        productId: parseInt(item.productId),
        productName: item.productName,
        quantity: item.quantity,
        price: item.price,
      })),
    };
    onSaveSale(newSaleData);
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
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-semibold"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Registrar Nova Venda
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Seleção de Cliente */}
          <div>
            <label
              htmlFor="client"
              className="block text-sm font-medium text-gray-700"
            >
              Cliente
            </label>
            <select
              id="client"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              value={selectedClient}
              onChange={(e) => setSelectedClient(e.target.value)}
              required
            >
              <option value="">Selecione um cliente</option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.name}
                </option>
              ))}
            </select>
          </div>

          {/* Itens da Venda */}
          <div className="space-y-3 border p-4 rounded-md bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-800">
              Itens da Venda
            </h3>
            {saleItems.map((item, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row items-center gap-3"
              >
                {/* Seleção de Produto */}
                <div className="flex-1 w-full">
                  <label htmlFor={`product-${index}`} className="sr-only">
                    Produto
                  </label>
                  <select
                    id={`product-${index}`}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                    value={item.productId}
                    onChange={(e) =>
                      handleItemChange(index, "productId", e.target.value)
                    }
                    required
                  >
                    <option value="">Selecione um produto</option>
                    {products.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.name} (R${" "}
                        {product.price.toFixed(2).replace(".", ",")}) - Estoque:{" "}
                        {product.stock}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Quantidade */}
                <div className="w-24">
                  <label htmlFor={`quantity-${index}`} className="sr-only">
                    Quantidade
                  </label>
                  <input
                    type="number"
                    id={`quantity-${index}`}
                    min="1"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                    value={item.quantity}
                    onChange={(e) =>
                      handleItemChange(index, "quantity", e.target.value)
                    }
                    required
                  />
                </div>

                {/* Botão de Remover Item */}
                {saleItems.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(index)}
                    className="p-2 text-red-600 hover:text-red-800"
                  >
                    <i className="fas fa-trash-alt"></i>
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddItem}
              className="mt-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 transition duration-200 ease-in-out"
            >
              <i className="fas fa-plus mr-2"></i> Adicionar Item
            </button>
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
                  <i className="fas fa-spinner fa-spin mr-2"></i> Registrando...
                </>
              ) : (
                "Registrar Venda"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
