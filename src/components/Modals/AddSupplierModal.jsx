// src/Modals/AddSupplierModal.jsx
import React, { useState, useEffect } from "react";

export default function AddSupplierModal({
  isOpen,
  onClose,
  onSaveSupplier,
  isLoading,
  supplierToEdit,
}) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [phone, setPhone] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [status, setStatus] = useState("Ativo"); // Padrão para "Ativo"

  // Preencher campos se for para edição
  useEffect(() => {
    if (isOpen) {
      if (supplierToEdit) {
        setName(supplierToEdit.name);
        setContact(supplierToEdit.contact);
        setPhone(supplierToEdit.phone);
        setCnpj(supplierToEdit.cnpj);
        setStatus(supplierToEdit.status);
      } else {
        // Resetar para novo fornecedor
        setName("");
        setContact("");
        setPhone("");
        setCnpj("");
        setStatus("Ativo");
      }
    }
  }, [isOpen, supplierToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !contact || !phone || !cnpj) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    const supplierData = {
      id: supplierToEdit ? supplierToEdit.id : null, // Se for edição, mantém o ID
      name,
      contact,
      phone,
      cnpj,
      status,
    };
    onSaveSupplier(supplierData);
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
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-semibold"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          {supplierToEdit ? "Editar Fornecedor" : "Adicionar Novo Fornecedor"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nome do Fornecedor */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Nome do Fornecedor
            </label>
            <input
              type="text"
              id="name"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Contato (e-mail) */}
          <div>
            <label
              htmlFor="contact"
              className="block text-sm font-medium text-gray-700"
            >
              Contato (E-mail)
            </label>
            <input
              type="email"
              id="contact"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              required
            />
          </div>

          {/* Telefone */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Telefone
            </label>
            <input
              type="text"
              id="phone"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          {/* CNPJ */}
          <div>
            <label
              htmlFor="cnpj"
              className="block text-sm font-medium text-gray-700"
            >
              CNPJ
            </label>
            <input
              type="text"
              id="cnpj"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              value={cnpj}
              onChange={(e) => setCnpj(e.target.value)}
              required
            />
          </div>

          {/* Status */}
          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700"
            >
              Status
            </label>
            <select
              id="status"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="Ativo">Ativo</option>
              <option value="Inativo">Inativo</option>
              <option value="Potencial">Potencial</option>
            </select>
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
              ) : supplierToEdit ? (
                "Atualizar Fornecedor"
              ) : (
                "Adicionar Fornecedor"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
