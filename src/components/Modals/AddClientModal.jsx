// src/Modals/AddClientModal.jsx
import React, { useState } from "react";

export default function AddClientModal({
  isOpen,
  onClose,
  onSaveClient,
  isLoading,
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [complement, setComplement] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [city, setCity] = useState("");
  const [uf, setUf] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Você pode adicionar validação aqui antes de chamar onSaveClient
    const newClientData = {
      name,
      email,
      cpf,
      phone,
      address,
      complement,
      zipCode,
      neighborhood,
      city,
      uf,
    };
    onSaveClient(newClientData);
    // Limpar formulário após o envio (opcional, dependendo do onSaveClient)
    setName("");
    setEmail("");
    setCpf("");
    setPhone("");
    setAddress("");
    setComplement("");
    setZipCode("");
    setNeighborhood("");
    setCity("");
    setUf("");
  };

  if (!isOpen) {
    return null;
  }

  return (
    // Aplicando os estilos CSS fornecidos
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
        background: "rgba(145, 154, 150, 0.3)", // Cor de fundo semi-transparente
        backdropFilter: "blur(5px)", // Efeito de desfoque no fundo
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
          Adicionar Novo Cliente
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* Nome */}
          <div className="col-span-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Nome Completo
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

          {/* Email */}
          <div className="col-span-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              E-mail
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* CPF */}
          <div>
            <label
              htmlFor="cpf"
              className="block text-sm font-medium text-gray-700"
            >
              CPF
            </label>
            <input
              type="text"
              id="cpf"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              maxLength="14" // Ex: para formatar como 000.000.000-00
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
              maxLength="15" // Ex: para formatar como (99) 99999-9999
              required
            />
          </div>

          {/* Endereço */}
          <div className="col-span-2">
            {" "}
            {/* Ocupa as duas colunas */}
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Endereço
            </label>
            <input
              type="text"
              id="address"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          {/* Complemento */}
          <div className="col-span-2">
            {" "}
            {/* Ocupa as duas colunas */}
            <label
              htmlFor="complement"
              className="block text-sm font-medium text-gray-700"
            >
              Complemento
            </label>
            <input
              type="text"
              id="complement"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              value={complement}
              onChange={(e) => setComplement(e.target.value)}
            />
          </div>

          {/* CEP */}
          <div>
            <label
              htmlFor="zipCode"
              className="block text-sm font-medium text-gray-700"
            >
              CEP
            </label>
            <input
              type="text"
              id="zipCode"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              maxLength="9" // Ex: para formatar como 00000-000
              required
            />
          </div>

          {/* Bairro */}
          <div>
            <label
              htmlFor="neighborhood"
              className="block text-sm font-medium text-gray-700"
            >
              Bairro
            </label>
            <input
              type="text"
              id="neighborhood"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              value={neighborhood}
              onChange={(e) => setNeighborhood(e.target.value)}
              required
            />
          </div>

          {/* Cidade */}
          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700"
            >
              Cidade
            </label>
            <input
              type="text"
              id="city"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>

          {/* UF */}
          <div>
            <label
              htmlFor="uf"
              className="block text-sm font-medium text-gray-700"
            >
              UF
            </label>
            <input
              type="text"
              id="uf"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              value={uf}
              onChange={(e) => setUf(e.target.value)}
              maxLength="2"
              required
            />
          </div>

          {/* Botão de Salvar */}
          <div className="col-span-2 flex justify-center mt-6">
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
                "Salvar Cliente"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
